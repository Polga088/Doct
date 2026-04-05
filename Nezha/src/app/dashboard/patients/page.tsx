'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, User, MoreHorizontal, FileText, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nom: '', prenom: '', tel: '', date_naissance: ''
  });

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/patients${search ? `?search=${search}` : ''}`);
      if (!res.ok) throw new Error('Query failed');
      const data = await res.json();
      setPatients(data);
    } catch (e) {
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Save Failed');
      fetchPatients(); 
      toast.success("Dossier patient créé avec succès !");
      setIsModalOpen(false);
      setFormData({ nom: '', prenom: '', tel: '', date_naissance: '' });
    } catch (e) {
      toast.error("Erreur de Base de Données.");
    }
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Dossiers Médicaux</h1>
      </div>

      <div className="bg-white border border-slate-200/60 shadow-premium rounded-xl flex flex-col overflow-hidden">
        
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/80">
          <h2 className="text-lg font-bold text-slate-800">Liste des patients</h2>
          <p className="text-sm text-slate-500">Gérez l'ensemble de votre base de dossiers médicaux.</p>
        </div>

        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <div className="relative w-full max-w-md flex items-center">
            <Search className="absolute left-3 text-slate-400" size={18} />
            <Input 
              placeholder="Rechercher par nom..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-b from-blue-500 to-blue-600 hover:brightness-95 hover:shadow-md text-white border border-blue-600/20 transition-all">
                <Plus size={18} /> Nouveau Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nouveau Patient</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Nom de famille</label>
                   <Input required value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})}/>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Prénom</label>
                   <Input required value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})}/>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Téléphone</label>
                   <Input type="tel" required value={formData.tel} onChange={e => setFormData({...formData, tel: e.target.value})}/>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Date de naissance</label>
                   <Input type="date" required value={formData.date_naissance} onChange={e => setFormData({...formData, date_naissance: e.target.value})}/>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Créer le dossier</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[300px] text-xs font-bold uppercase tracking-wider text-slate-500">Patient</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:table-cell">Téléphone</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">Date de Naissance</TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-slate-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center h-24">Chargement Shadcn...</TableCell></TableRow>
            ) : patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 text-base">Aucun patient enregistré</p>
                      <p className="text-sm text-slate-400 mt-1">Créez votre premier dossier médical en cliquant sur "Nouveau Patient".</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              patients.map((p) => (
                <TableRow key={p.id} className="hover:bg-slate-50/50 cursor-pointer">
                  <TableCell className="font-medium" onClick={() => router.push(`/dashboard/patients/${p.id}`)}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-blue-50 text-blue-600">
                         <AvatarFallback className="font-semibold text-xs border border-blue-100">{p.prenom[0]}{p.nom[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-semibold">{p.prenom} <span className="uppercase">{p.nom}</span></span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 hidden sm:table-cell" onClick={() => router.push(`/dashboard/patients/${p.id}`)}>{p.tel}</TableCell>
                  <TableCell className="text-slate-600 hidden md:table-cell" onClick={() => router.push(`/dashboard/patients/${p.id}`)}>{new Date(p.date_naissance).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/patients/${p.id}`)}>
                          <FileText className="mr-2 h-4 w-4" /> Voir Dossier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
