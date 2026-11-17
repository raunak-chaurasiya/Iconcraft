import React from 'react';
import { Header } from './components/layout/Header';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { DropZone } from './components/canvas/DropZone';
import { IconGrid } from './components/canvas/IconGrid';
import { Toast } from './components/canvas/Toast';
import { IconTray } from './components/tray/IconTray';
import { CustomSvgModal } from './components/modal/CustomSvgModal';
import { useStudioStore } from './store/useStudioStore';

export const App: React.FC = () => {
  const { settings } = useStudioStore();

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans"
      style={
        {
          '--icon-stroke': `${settings.strokeWidth}px`,
          '--icon-size': `${settings.size}px`,
          '--icon-color': settings.color,
        } as React.CSSProperties
      }
    >
      {/* 1. Top Navigation */}
      <Header />

      {/* 2. Main 3-Pane Workstation */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Discovery & Collections */}
        <LeftSidebar />

        {/* Center: The Canvas & Dropzone */}
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-950/60 pb-28">
          <div className="max-w-7xl mx-auto space-y-4">
            <DropZone />
            <IconGrid />
          </div>
        </main>

        {/* Right: Live Customizer Panel */}
        <RightSidebar />
      </div>

      {/* 3. Floating Batch Icon Collection Tray */}
      <IconTray />

      {/* 4. Non-blocking Micro-Interaction Toast */}
      <Toast />

      {/* 5. Import Raw SVG Modal */}
      <CustomSvgModal />
    </div>
  );
};

export default App;
