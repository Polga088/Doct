import { ReactNode } from 'react';
import { CalendarDays, Users, Package } from 'lucide-react';
import Link from 'next/link';

export default function AssistantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <div className="w-72 bg-white p-8 flex flex-col gap-10 z-10 border-r border-slate-100">
        <div className="text-2xl font-bold text-slate-800 tracking-tight">
          Pôle <span className="text-blue-600">Accueil</span>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link href="/dashboard/assistant" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700">
            <div className="p-2 bg-blue-50 rounded-full text-blue-600"><Package size={20} /></div>
            Accueil Rapide
          </Link>
          <Link href="/dashboard/agenda" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700">
            <div className="p-2 bg-blue-50 rounded-full text-blue-600"><CalendarDays size={20} /></div>
            Agenda Général
          </Link>
          <Link href="/dashboard/patients" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700">
            <div className="p-2 bg-blue-50 rounded-full text-blue-600"><Users size={20} /></div>
            Base Patients
          </Link>
        </nav>

        {/* DÉCONNEXION : lien HTML natif, aucun JS requis */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">AC</div>
              <div>
                <p className="text-sm font-bold text-slate-800">Secrétariat</p>
                <p className="text-xs text-slate-500">Connectée</p>
              </div>
            </div>
            <a
              href="/login"
              onClick={() => { document.cookie = 'auth_token=; Max-Age=0; path=/;'; }}
              title="Déconnexion"
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-10 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
