/**
 * Client-Side SVG Normalizer Engine
 * Sanitizes arbitrary SVGs, strips malicious tags/scripts,
 * standardizes viewBox to 0 0 24 24, and maps colors to currentColor.
 */

export interface NormalizedSvgResult {
  success: boolean;
  cleanSvg: string;
  innerMarkup: string;
  error?: string;
}

export function normalizeSvg(rawSvgString: string): NormalizedSvgResult {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvgString, 'image/svg+xml');
    
    // Check for parse error
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return {
        success: false,
        cleanSvg: '',
        innerMarkup: '',
        error: 'Invalid SVG format or corrupted XML markup.',
      };
    }

    const svgElement = doc.querySelector('svg');
    if (!svgElement) {
      return {
        success: false,
        cleanSvg: '',
        innerMarkup: '',
        error: 'No root <svg> element found.',
      };
    }

    // 1. Strip dangerous and unnecessary elements
    const forbiddenTags = ['script', 'style', 'foreignObject', 'iframe', 'object', 'metadata'];
    forbiddenTags.forEach(tag => {
      svgElement.querySelectorAll(tag).forEach(el => el.remove());
    });

    // 2. Remove inline event handlers & unwanted attributes (onclick, onload, inkscape, etc.)
    const allElements = [svgElement, ...Array.from(svgElement.querySelectorAll('*'))];
    allElements.forEach(el => {
      const attrs = Array.from(el.attributes);
      attrs.forEach(attr => {
        const name = attr.name.toLowerCase();
        if (name.startsWith('on') || name.startsWith('inkscape:') || name.startsWith('sodipodi:') || name === 'data-name') {
          el.removeAttribute(attr.name);
        }
      });
    });

    // 3. Handle viewBox and dimensions
    let viewBox = svgElement.getAttribute('viewBox');
    const width = svgElement.getAttribute('width');
    const height = svgElement.getAttribute('height');

    if (!viewBox && width && height) {
      const w = parseFloat(width.replace(/[^0-9.]/g, '')) || 24;
      const h = parseFloat(height.replace(/[^0-9.]/g, '')) || 24;
      viewBox = `0 0 ${w} ${h}`;
    }

    if (!viewBox) {
      viewBox = '0 0 24 24';
    }

    // Set standard normalized attributes on root svg
    svgElement.removeAttribute('width');
    svgElement.removeAttribute('height');
    svgElement.setAttribute('viewBox', viewBox);
    svgElement.setAttribute('fill', 'none');
    svgElement.setAttribute('stroke', 'currentColor');
    svgElement.setAttribute('stroke-width', '2');
    svgElement.setAttribute('stroke-linecap', 'round');
    svgElement.setAttribute('stroke-linejoin', 'round');

    // 4. Normalize stroke/fill on child elements
    const drawableElements = svgElement.querySelectorAll('path, circle, rect, line, polyline, polygon');
    drawableElements.forEach(el => {
      // If stroke is hardcoded to black/color, map it to currentColor
      const stroke = el.getAttribute('stroke');
      if (stroke && stroke !== 'none') {
        el.setAttribute('stroke', 'currentColor');
      }

      // If fill is black or hardcoded, adjust appropriately
      const fill = el.getAttribute('fill');
      if (fill && fill !== 'none' && fill !== 'currentColor') {
        // If it's a stroke icon, typically fill="none"
        el.setAttribute('fill', 'none');
      }
    });

    const serializer = new XMLSerializer();
    const cleanSvg = serializer.serializeToString(svgElement);
    const innerMarkup = svgElement.innerHTML;

    return {
      success: true,
      cleanSvg,
      innerMarkup,
    };
  } catch (err) {
    return {
      success: false,
      cleanSvg: '',
      innerMarkup: '',
      error: (err as Error).message || 'Failed to parse and normalize SVG.',
    };
  }
}
