import { icons } from 'lucide-react';
import type { IconItem } from '../types';

export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Icons', iconName: 'LayoutGrid' },
  { id: 'custom', name: 'My Custom SVGs', iconName: 'Sparkles' },
  { id: 'navigation', name: 'Navigation & Places', iconName: 'Compass' },
  { id: 'arrows', name: 'Arrows & Controls', iconName: 'MoveRight' },
  { id: 'commerce', name: 'Commerce & Money', iconName: 'ShoppingBag' },
  { id: 'media', name: 'Media & Audio', iconName: 'Play' },
  { id: 'system', name: 'System & Security', iconName: 'Shield' },
  { id: 'communication', name: 'Communication', iconName: 'Mail' },
  { id: 'devices', name: 'Devices & Hardware', iconName: 'Monitor' },
  { id: 'design', name: 'Design & Tools', iconName: 'Palette' },
  { id: 'general', name: 'General & Others', iconName: 'Shapes' },
];

function formatName(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function toKebabCase(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function inferCategory(name: string): string {
  const lower = name.toLowerCase();
  if (
    lower.includes('arrow') ||
    lower.includes('chevron') ||
    lower.includes('move') ||
    lower.includes('corner') ||
    lower.includes('rotate') ||
    lower.includes('redo') ||
    lower.includes('undo') ||
    lower.includes('refresh')
  ) {
    return 'arrows';
  }
  if (
    lower.includes('map') ||
    lower.includes('compass') ||
    lower.includes('pin') ||
    lower.includes('navigation') ||
    lower.includes('route') ||
    lower.includes('globe') ||
    lower.includes('home') ||
    lower.includes('menu') ||
    lower.includes('search') ||
    lower.includes('filter') ||
    lower.includes('location')
  ) {
    return 'navigation';
  }
  if (
    lower.includes('cart') ||
    lower.includes('bag') ||
    lower.includes('shop') ||
    lower.includes('dollar') ||
    lower.includes('credit') ||
    lower.includes('card') ||
    lower.includes('wallet') ||
    lower.includes('receipt') ||
    lower.includes('coin') ||
    lower.includes('tag') ||
    lower.includes('percent') ||
    lower.includes('bank') ||
    lower.includes('currency')
  ) {
    return 'commerce';
  }
  if (
    lower.includes('play') ||
    lower.includes('pause') ||
    lower.includes('music') ||
    lower.includes('audio') ||
    lower.includes('video') ||
    lower.includes('camera') ||
    lower.includes('mic') ||
    lower.includes('speaker') ||
    lower.includes('volume') ||
    lower.includes('radio') ||
    lower.includes('film') ||
    lower.includes('disc') ||
    lower.includes('podcast')
  ) {
    return 'media';
  }
  if (
    lower.includes('shield') ||
    lower.includes('lock') ||
    lower.includes('key') ||
    lower.includes('security') ||
    lower.includes('user') ||
    lower.includes('database') ||
    lower.includes('server') ||
    lower.includes('cpu') ||
    lower.includes('terminal') ||
    lower.includes('code') ||
    lower.includes('bug') ||
    lower.includes('settings') ||
    lower.includes('cloud') ||
    lower.includes('file') ||
    lower.includes('folder')
  ) {
    return 'system';
  }
  if (
    lower.includes('mail') ||
    lower.includes('message') ||
    lower.includes('phone') ||
    lower.includes('bell') ||
    lower.includes('send') ||
    lower.includes('at') ||
    lower.includes('chat') ||
    lower.includes('inbox') ||
    lower.includes('notification') ||
    lower.includes('share')
  ) {
    return 'communication';
  }
  if (
    lower.includes('monitor') ||
    lower.includes('smartphone') ||
    lower.includes('tablet') ||
    lower.includes('laptop') ||
    lower.includes('device') ||
    lower.includes('watch') ||
    lower.includes('wifi') ||
    lower.includes('bluetooth') ||
    lower.includes('battery') ||
    lower.includes('tv') ||
    lower.includes('printer') ||
    lower.includes('hard')
  ) {
    return 'devices';
  }
  if (
    lower.includes('palette') ||
    lower.includes('brush') ||
    lower.includes('pen') ||
    lower.includes('pencil') ||
    lower.includes('edit') ||
    lower.includes('crop') ||
    lower.includes('shapes') ||
    lower.includes('sparkle') ||
    lower.includes('wand') ||
    lower.includes('layout') ||
    lower.includes('layers') ||
    lower.includes('color') ||
    lower.includes('scissors')
  ) {
    return 'design';
  }
  return 'general';
}

// Automatically transform all 2,089+ Lucide icons into our catalog structure
export const ALL_LUCIDE_ICONS: IconItem[] = Object.keys(icons).map((componentName) => {
  const formatted = formatName(componentName);
  const words = formatted.toLowerCase().split(' ');
  const category = inferCategory(componentName);

  return {
    id: toKebabCase(componentName),
    name: formatted,
    componentName,
    category,
    tags: Array.from(new Set([componentName.toLowerCase(), ...words])),
  };
});
