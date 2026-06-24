"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopNavBar from "@/components/layout/TopNavBar";
import NeuralInspector from "@/components/layout/NeuralInspector";
import { useAppLayout } from "@/components/layout/AppLayoutContext";
import { CommandCenter } from "@/components/search/CommandCenter";

export default function AppLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { inspectorOpen, toggleInspector, setInspectorOpen } = useAppLayout();

  return (
    <div className="bg-surface" style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <CommandCenter />
      {/* ── Top Navigation (fixed, 64px tall) ── */}
      <TopNavBar
        onToggleInspector={toggleInspector}
        inspectorOpen={inspectorOpen}
      />

      {/* ── Body row below top nav ── */}
      <div style={{ display: "flex", flex: 1, marginTop: "64px", overflow: "hidden", position: "relative" }}>
        {/* ── Double Level Sidebar (fixed width 80+240=320px) ── */}
        <Sidebar />

        {/* ── Main Canvas (12 columns grid) ── */}
        <div 
          className="flex-1 grid grid-cols-12 h-full transition-all duration-500 ease-out" 
          style={{ marginLeft: "320px" }}
        >
          {/* Main Content (Cols 1 to 9 if inspector open, else 1 to 12) */}
          <main
            className={`${inspectorOpen ? "col-span-9" : "col-span-12"} h-full overflow-y-auto transition-all duration-500 ease-out`}
          >
            {children}
          </main>

          {/* Neural Inspector (Cols 10 to 12) */}
          <div className={`${inspectorOpen ? "col-span-3 border-l border-surface-container-low/30" : "hidden w-0"} h-full transition-all duration-500`}>
            <NeuralInspector
              isOpen={inspectorOpen}
              onClose={() => setInspectorOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
