import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AssistantDashboard() {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Espace Accueil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="shadow-premium border-slate-200/60 flex flex-col justify-center items-center p-12 text-center bg-blue-50/50">
            <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-6">
              <CalendarPlus size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Planifier Maintentant</h2>
            <p className="text-slate-500 mb-8 max-w-xs">Accédez à l'agenda général pour insérer une nouvelle prise de rendez-vous ou traiter une urgence.</p>
            <Link href="/dashboard/agenda">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-md">
                Nouveau RDV Médical
              </Button>
            </Link>
         </Card>

         <Card className="shadow-premium border-slate-200/60">
            <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users size={18} className="text-slate-500"/> Récemment enregistrés
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                 <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 border border-slate-200 bg-white">
                         <AvatarFallback className="font-bold text-slate-600">JP</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-bold text-sm text-slate-800">Jean PIERRE</p>
                         <p className="text-xs text-slate-500">Ajouté il y a 10 min</p>
                       </div>
                    </div>
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 border border-slate-200 bg-white">
                         <AvatarFallback className="font-bold text-slate-600">ML</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-bold text-sm text-slate-800">Marie LAURE</p>
                         <p className="text-xs text-slate-500">Ajoutée il y a 1 heure</p>
                       </div>
                    </div>
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 border border-slate-200 bg-white">
                         <AvatarFallback className="font-bold text-slate-600">SD</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-bold text-sm text-slate-800">Sophie DUBOIS</p>
                         <p className="text-xs text-slate-500">Ajoutée hier</p>
                       </div>
                    </div>
                 </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
