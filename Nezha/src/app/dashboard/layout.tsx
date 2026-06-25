'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Menu } from 'lucide-react';

import { ChatPanel } from '@/components/chat/ChatPanel';
import { PaymentPendingListener } from '@/components/assistant/PaymentPendingListener';
import { DoctorAssistantSignalListener } from '@/components/doctor/DoctorAssistantSignalListener';
import { NotificationBell } from '@/components/dashboard/NotificationBell';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'same-origin' }).then((r) => {
    if (!r.ok) throw new Error();
    return r.json();
  });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { data: me } = useSWR<{ nom?: string; role?: string }>(
    '/api/auth/me',
    fetcher,
    { revalidateOnFocus: true }
  );

  const roleUpper = me ? String(me.role ?? '').toUpperCase() : '';
  const user = me
    ? { nom: me.nom ?? 'Utilisateur', role: String(me.role ?? '') }
    : null;

  const staffBillingAlerts = roleUpper === 'ASSISTANT' || roleUpper === 'ADMIN';

  return (
    <div className="clinical-shell flex min-h-screen">
      {/* Sidebar desktop */}
      <div className="sticky top-0 z-30 hidden h-[100dvh] shrink-0 flex-col p-3 lg:flex lg:w-[272px] xl:w-[288px]">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl shadow-medical-xl ring-1 ring-slate-900/10">
          <Sidebar />
        </div>
      </div>

      {/* Sidebar mobile */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[min(300px,88vw)] border-0 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      {staffBillingAlerts ? <PaymentPendingListener /> : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="clinical-topbar">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Nezha Medical
              </p>
              <p className="text-sm font-semibold text-slate-700">Espace professionnel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 py-1.5 pl-4 pr-1.5 ring-1 ring-slate-900/[0.05]">
              <div className="hidden flex-col items-end leading-tight sm:flex">
                <span className="text-sm font-semibold text-slate-800">{user?.nom}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {user?.role}
                </span>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-medical-blue-sm">
                {(user?.nom ?? 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="clinical-content-well">
          <div className="clinical-main-panel animate-fade-in">
            {children}
          </div>
        </div>
      </div>

      <ChatPanel />
      <DoctorAssistantSignalListener />
    </div>
  );
}
