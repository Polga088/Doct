import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartPulse, ArrowRight, ShieldCheck, Activity, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HEADER / NAV */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
             <HeartPulse size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Nezha Medical</span>
        </div>
        <div>
          <Link href="/login">
            <Button variant="ghost" className="font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              Espace Professionnel
            </Button>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center mt-20 mb-24">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
           </span>
           Plateforme en ligne V2.0
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          La gestion de cabinet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">simplifiée.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mb-10 leading-relaxed">
          Nezha Medical regroupe votre agenda, vos dossiers patients et l'ensemble de votre suivi médical dans une interface épurée, sécurisée et ultra-rapide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <Button size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 rounded-2xl gap-2 w-full sm:w-auto">
              Accéder à mon espace <ArrowRight size={20} />
            </Button>
          </Link>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left border-t border-slate-100 pt-16">
           <div className="space-y-4">
              <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Dossiers Médicaux</h3>
              <p className="text-slate-500">Un accès instantané à l'historique de vos patients, avec une recherche foudroyante.</p>
           </div>
           
           <div className="space-y-4">
              <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 border border-slate-100">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Gestion Collaborative</h3>
              <p className="text-slate-500">Des espaces séparés et optimisés pour le praticien, le secrétariat et l'administrateur.</p>
           </div>

           <div className="space-y-4">
              <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Sécurité Maximale</h3>
              <p className="text-slate-500">Vos données de santé sont sécurisées, chiffrées et conformes aux meilleures pratiques (HDS).</p>
           </div>
        </div>
      </main>

    </div>
  );
}
