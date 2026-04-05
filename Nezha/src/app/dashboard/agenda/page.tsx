'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { toast } from "sonner";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './calendar-override.css';

const localizer = dateFnsLocalizer({
  format, parse, getDay,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  locales: { 'fr': fr },
});
const DnDCalendar = withDragAndDrop(Calendar);

export default function AgendaV2Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  // Open Sheet instead of full screen modal
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCreatePatientMode, setIsCreatePatientMode] = useState(false);
  
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [motif, setMotif] = useState('');
  const [newPat, setNewPat] = useState({ nom: '', prenom: '', tel: '', date_naissance: '' });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
    fetchPatientsList();
    // Récupérer l'ID de l'utilisateur connecté
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(d => { if(d?.id) setCurrentUserId(d.id); });
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setEvents(data.map((a: any) => ({
          id: a.id,
          title: `${a.patient.nom} - ${a.motif}`,
          start: new Date(a.date_heure),
          end: new Date(new Date(a.date_heure).getTime() + 30 * 60000), 
        })));
      }
    } catch (e) { }
  };

  const fetchPatientsList = async () => {
    try {
      const res = await fetch('/api/patients');
      if(res.ok) setPatients(await res.json());
    } catch (e) {}
  };

  const onEventDrop = useCallback(async ({ event, start, end }: any) => {
      const old = [...events];
      setEvents(events.map(ev => ev.id === event.id ? { ...ev, start, end } : ev));
      try {
        const res = await fetch(`/api/appointments/${event.id}`, {
          method: 'PUT', body: JSON.stringify({ date_heure: start.toISOString() }),
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error();
        toast.success("Rendez-vous déplacé !");
      } catch (e) {
        setEvents(old);
        toast.error("Impossible de décaler en Base de Données.");
      }
  }, [events]);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo);
    setIsSheetOpen(true);
  };

  const submitRDV = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || (!selectedPatientId && !isCreatePatientMode)) return;

    try {
        const payload: any = { date_heure: selectedSlot.start.toISOString(), motif, doctor_id: currentUserId };
        if (isCreatePatientMode) payload.new_patient = newPat;
        else payload.patient_id = selectedPatientId;

        const res = await fetch('/api/appointments', {
            method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error();
        
        toast.success("Rendez-vous planifié avec succès !");
        setIsSheetOpen(false);
        setIsCreatePatientMode(false);
        fetchAppointments(); 
        if(isCreatePatientMode) fetchPatientsList();
    } catch (e) {
        toast.error("Erreur PostgreSQL");
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)] animate-fade-in relative z-0">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agenda Praticien</h1>

      <Card className="flex-grow p-6">
        <DnDCalendar
          localizer={localizer}
          events={events}
          onEventDrop={onEventDrop}
          onSelectSlot={handleSelectSlot}
          selectable resizable={false}
          defaultView="week"
          style={{ height: '100%' }}
        />
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="bg-white overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Planifier un Créneau</SheetTitle>
            <SheetDescription>
              {selectedSlot && format(selectedSlot.start, "EEEE d MMMM yyyy à HH:mm", {locale: fr})}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={submitRDV} className="mt-8 space-y-6">
            <div className="space-y-4">
              {!isCreatePatientMode ? (
                <>
                  <div className="space-y-2">
                    <Label>Associer un Patient Existant</Label>
                    <Select onValueChange={setSelectedPatientId}>
                      <SelectTrigger><SelectValue placeholder="-- Rechercher dans le DME --" /></SelectTrigger>
                      <SelectContent>
                        {patients.map(p => <SelectItem key={p.id} value={p.id}>{p.nom.toUpperCase()} {p.prenom}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <span className="text-xs text-slate-400">Ou</span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setIsCreatePatientMode(true)}>
                    Nouveau Patient
                  </Button>
                </>
              ) : (
                <Card className="p-4 space-y-4 bg-slate-50/50 border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-slate-800">Création Fiche</span>
                    <Button type="button" variant="ghost" className="h-8 text-xs text-red-600" onClick={() => setIsCreatePatientMode(false)}>Annuler</Button>
                  </div>
                  <div className="space-y-2"><Label>Nom</Label><Input required onChange={e => setNewPat({...newPat, nom: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Prénom</Label><Input required onChange={e => setNewPat({...newPat, prenom: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Téléphone</Label><Input required onChange={e => setNewPat({...newPat, tel: e.target.value})} /></div>
                  <div className="space-y-2"><Label>Date de Naissance</Label><Input type="date" required onChange={e => setNewPat({...newPat, date_naissance: e.target.value})} /></div>
                </Card>
              )}
            </div>

            <div className="space-y-2">
              <Label>Motif de Consultation</Label>
              <Input required placeholder="Ex: Suivi, Urgence..." value={motif} onChange={e => setMotif(e.target.value)} />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Valider le Rendez-Vous</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
