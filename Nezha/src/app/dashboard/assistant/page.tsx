import Link from 'next/link';
import { CalendarPlus, Headphones } from 'lucide-react';

import { QueueManager } from '@/components/assistant/QueueManager';
import { RecentlyRegistered } from '@/components/dashboard/RecentlyRegistered';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardSection } from '@/components/ui/dashboard-section';
import { Button } from '@/components/ui/button';

export default function AssistantDashboard() {
  return (
    <div className="animate-fade-in space-y-10 pb-8">
      <PageHeader
        icon={Headphones}
        eyebrow="Accueil"
        title="Espace Accueil"
        description="Gérez la file d'attente, les arrivées patients et les nouveaux rendez-vous."
        actions={
          <Link href="/dashboard/agenda">
            <Button size="lg" className="gap-2">
              <CalendarPlus className="h-4 w-4" />
              Nouveau RDV
            </Button>
          </Link>
        }
      />

      <QueueManager />

      <DashboardSection
        title="Actions rapides"
        description="Raccourcis pour les tâches courantes de l'accueil"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="clinical-card clinical-card-hover flex flex-col items-center justify-center p-10 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-medical-blue">
              <CalendarPlus className="h-8 w-8" strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
              Planifier un rendez-vous
            </h2>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-slate-500">
              Accédez à l&apos;agenda pour une nouvelle prise de rendez-vous ou une urgence.
            </p>
            <Link href="/dashboard/agenda">
              <Button size="lg" className="h-12 px-8">
                Ouvrir l&apos;agenda
              </Button>
            </Link>
          </div>

          <RecentlyRegistered limit={8} />
        </div>
      </DashboardSection>
    </div>
  );
}
