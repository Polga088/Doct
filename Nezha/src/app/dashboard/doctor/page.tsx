import { Users, CheckCircle, Clock, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DoctorDashboard() {
  return (
    <div className="space-y-8 animate-fade-in relative max-w-7xl">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ma Journée</h1>
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Clock size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">RDV du jour</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Users size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Nouveaux Patients</p>
              <p className="text-2xl font-bold text-slate-800">3</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><CheckCircle size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Consultations Terminées</p>
              <p className="text-2xl font-bold text-slate-800">4</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PROCHAIN PATIENT */}
        <div className="lg:col-span-2 space-y-4">
           <h2 className="text-lg font-bold text-slate-800">Prochain Patient</h2>
           <Card>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                <Avatar className="h-16 w-16 bg-slate-100 text-slate-400 shrink-0">
                   <AvatarFallback className="text-xl font-bold">MD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                    <p className="font-bold text-slate-800 text-xl tracking-tight">Martin DUPONT</p>
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">En salle d'attente</Badge>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">10:30 • Motif: Consultation de suivi</p>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 h-10 px-5">Démarrer la consultation</Button>
                    <Button variant="outline" className="h-10 px-5 gap-2"><FileText size={16}/> Ouvrir le dossier médical</Button>
                  </div>
                </div>
              </CardContent>
           </Card>
        </div>

        {/* APERCU AGENDA */}
        <div className="space-y-4">
           <h2 className="text-lg font-bold text-slate-800">Aperçu de l'Agenda</h2>
           <Card>
              <CardContent className="p-6 space-y-5">
                 
                 <div className="flex gap-4 items-center">
                    <div className="w-12 text-center">
                      <span className="text-sm font-bold text-blue-600">10:30</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-blue-50 border border-blue-100 border-l-4 border-l-blue-600">
                      <p className="font-bold text-sm text-slate-800">M. Dupont</p>
                      <p className="text-xs text-slate-500">Suivi</p>
                    </div>
                 </div>

                 <div className="flex gap-4 items-center">
                    <div className="w-12 text-center">
                      <span className="text-sm font-bold text-slate-400">11:00</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="font-bold text-sm text-slate-800">Lucie Bernard</p>
                      <p className="text-xs text-slate-500">Urgence relative</p>
                    </div>
                 </div>

                 <div className="flex gap-4 items-center opacity-50">
                    <div className="w-12 text-center">
                      <span className="text-sm font-bold text-slate-400">11:30</span>
                    </div>
                    <div className="flex-1 p-3">
                      <p className="font-medium text-sm text-slate-500 italic">Plateau Administratif</p>
                    </div>
                 </div>

              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
