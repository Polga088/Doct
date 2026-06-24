"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useAppLayout } from "@/components/layout/AppLayoutContext";
import { fetcher } from "@/lib/fetcher";

export function CommandCenter() {
  const { commandOpen: open, setCommandOpen: setOpen, setInspectorOpen, setInspectorData } = useAppLayout();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ projects: any[]; tasks: any[]; users: any[] }>({
    projects: [],
    tasks: [],
    users: [],
  });
  const router = useRouter();

  // Listen for Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  // Search effect
  useEffect(() => {
    if (query.length < 2) {
      setResults({ projects: [], tasks: [], users: [] });
      return;
    }

    const search = async () => {
      const data = await fetcher(`/api/search?q=${query}`);
      setResults(data);
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const runCommand = (action: () => void) => {
    setOpen(false);
    action();
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 pointer-events-none"
    >
      <div 
        className="fixed inset-0 bg-surface/20 backdrop-blur-sm pointer-events-auto" 
        onClick={() => setOpen(false)}
      />
      
      <Command 
        shouldFilter={false}
        className="
          w-full max-w-[600px] 
          bg-white/70 backdrop-blur-xl 
          rounded-2xl shadow-glow-cyan 
          overflow-hidden pointer-events-auto
          relative border-0
        "
      >
        <div className="flex items-center px-4 py-3 border-0">
          <span className="material-symbols-outlined text-primary-fixed mr-3">search</span>
          <Command.Input 
            autoFocus
            placeholder="Search nodes, flows, data..." 
            value={query}
            onValueChange={setQuery}
            className="w-full bg-transparent border-0 outline-none font-body text-on-surface placeholder-on-surface-variant/50 h-10 text-lg"
          />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2 pb-4">
          <Command.Empty className="p-8 text-center text-on-surface-variant font-body text-sm">
            No synapses found for "{query}"
          </Command.Empty>

          {results.projects.length > 0 && (
            <Command.Group heading="Projects" className="px-2 py-3">
              <div className="text-[10px] font-headline font-bold uppercase tracking-widest text-primary-fixed mb-2 ml-2">Projects</div>
              {results.projects.map((p) => (
                <Command.Item 
                  key={p.id}
                  onSelect={() => runCommand(() => router.push("/flows"))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors group"
                >
                  <span className="material-symbols-outlined text-secondary opacity-70 group-hover:opacity-100">folder_open</span>
                  <span className="font-body text-sm font-medium">{p.name}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {results.tasks.length > 0 && (
            <Command.Group heading="Flow Tasks" className="px-2 py-3">
              <div className="text-[10px] font-headline font-bold uppercase tracking-widest text-secondary mb-2 ml-2">Flow Tasks</div>
              {results.tasks.map((t) => (
                <Command.Item 
                  key={t.id}
                  onSelect={() => runCommand(() => {
                    router.push("/flows");
                    setInspectorData({ type: "task_node", payload: t });
                    setInspectorOpen(true);
                  })}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors group"
                >
                  <span className="material-symbols-outlined text-primary opacity-70 group-hover:opacity-100">rebase_edit</span>
                  <div className="flex flex-col">
                    <span className="font-body text-sm font-medium">{t.title}</span>
                    <span className="text-[10px] text-on-surface-variant/70 uppercase font-label">{t.project?.name}</span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {results.users.length > 0 && (
            <Command.Group heading="Collaborators" className="px-2 py-3">
              <div className="text-[10px] font-headline font-bold uppercase tracking-widest text-green-600 mb-2 ml-2">Collaborators</div>
              {results.users.map((u) => (
                <Command.Item 
                  key={u.id}
                  onSelect={() => runCommand(() => router.push("/channels/engineering-sync"))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors group"
                >
                   <div className={`w-6 h-6 rounded-full ${u.avatarColor} flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
                    {u.avatarInitials}
                  </div>
                  <span className="font-body text-sm font-medium">{u.name}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {/* Static Navigation Shortcuts */}
          <Command.Group heading="Navigation" className="px-2 py-3 mt-2 border-t border-surface-container">
            <div className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant/50 mb-2 ml-2">Quick Navigation</div>
            <Command.Item onSelect={() => runCommand(() => router.push("/dashboard"))} className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-sm opacity-50">dashboard</span>
              <span className="font-body text-sm text-on-surface/70">Go to Dashboard</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push("/flows"))} className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-sm opacity-50">account_tree</span>
              <span className="font-body text-sm text-on-surface/70">Open System Flows</span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="px-4 py-2 bg-surface-container-lowest/50 border-t border-surface-container flex items-center justify-between text-[10px] text-on-surface-variant font-label uppercase tracking-tighter">
          <div className="flex gap-4">
            <span><kbd className="bg-surface p-1 rounded font-sans pr-1.5 ml-0.5">↑↓</kbd> Navigate</span>
            <span><kbd className="bg-surface p-1 rounded font-sans pr-1.5 ml-0.5">↵</kbd> Select</span>
          </div>
          <span>Esc to close</span>
        </div>
      </Command>
    </div>
  );
}
