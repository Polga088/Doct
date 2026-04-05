import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, CreditCard, Activity, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in max-w-7xl">
      <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Vue d'ensemble Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-premium border-slate-200/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Revenus Mensuels</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">45,231.89 €</div>
            <p className="text-xs text-blue-600 font-medium flex items-center mt-1"><ArrowUpRight size={14}/> +20.1% vs le mois dernier</p>
          </CardContent>
        </Card>

        <Card className="shadow-premium border-slate-200/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Patients (DME)</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+2,350</div>
            <p className="text-xs text-blue-600 font-medium flex items-center mt-1"><ArrowUpRight size={14}/> +180 nouveaux ce mois</p>
          </CardContent>
        </Card>

        <Card className="shadow-premium border-slate-200/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Activité Système</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">Stable (100% Uptime)</div>
            <p className="text-xs text-slate-500 mt-1">Dernière sauvegarde: il y a 10 minutes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
