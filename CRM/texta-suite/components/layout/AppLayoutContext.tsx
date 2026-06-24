"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AppLayoutContextType {
  inspectorOpen: boolean;
  setInspectorOpen: (isOpen: boolean) => void;
  toggleInspector: () => void;
  commandOpen: boolean;
  setCommandOpen: (isOpen: boolean) => void;
  inspectorData: any; // Simulated context payload data
  setInspectorData: (data: any) => void;
}

const AppLayoutContext = createContext<AppLayoutContextType | undefined>(undefined);

export function AppLayoutProvider({ children }: { children: ReactNode }) {
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [inspectorData, setInspectorData] = useState<any>(null);

  const toggleInspector = () => setInspectorOpen((prev) => !prev);

  return (
    <AppLayoutContext.Provider value={{ 
      inspectorOpen, 
      setInspectorOpen, 
      toggleInspector, 
      commandOpen, 
      setCommandOpen, 
      inspectorData, 
      setInspectorData 
    }}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export function useAppLayout() {
  const context = useContext(AppLayoutContext);
  if (context === undefined) {
    throw new Error("useAppLayout must be used within an AppLayoutProvider");
  }
  return context;
}
