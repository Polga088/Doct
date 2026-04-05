'use client';

import { useState, useRef, use } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileText, CreditCard, Plus, Trash2, X, Download } from 'lucide-react';
import styles from './patient.module.css';

export default function PatientPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState('histo');
  const [notes, setNotes] = useState('Consultation initiale : Patient présente des symptômes de toux sèche depuis 3 jours. Pas de fièvre.');
  
  // Modals state
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  
  // Forms state
  const [medicines, setMedicines] = useState([{ nom: '', posologie: '', duree: '' }]);
  const [invoiceData, setInvoiceData] = useState({ montant: '50', methode: 'Carte' });
  const [documents, setDocuments] = useState<any[]>([]);

  // Refs for PDF rendering
  const prescriptionRef = useRef<HTMLDivElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Mock patient data
  const patient = {
    id: resolvedParams.id,
    nom: 'Dupont',
    prenom: 'Jean',
    date_naissance: '1980-05-12',
    tel: '06 12 34 56 78',
    allergies: 'Pénicilline',
    antecedents: 'Hypertension',
    groupe_sanguin: 'O+'
  };

  const addMedicineRow = () => {
    setMedicines([...medicines, { nom: '', posologie: '', duree: '' }]);
  };

  const updateMedicine = (index: number, field: string, value: string) => {
    const updated = [...medicines];
    (updated[index] as any)[field] = value;
    setMedicines(updated);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const generatePDF = async (elementRef: React.RefObject<HTMLDivElement | null>, nomFichier: string) => {
    if (!elementRef.current) return;
    
    // On rend brièvement le noeud si caché
    const element = elementRef.current;
    element.style.left = '0';
    element.style.top = '0';
    element.style.zIndex = '-1';
    
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${nomFichier}_${patient.nom}.pdf`);
    } catch (e) {
      console.error("Erreur PDF:", e);
    } finally {
      element.style.left = '-9999px';
      element.style.top = '-9999px';
    }
  };

  const handleSavePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePDF(prescriptionRef, 'Ordonnance');
    setDocuments([...documents, { type: 'Ordonnance', date: new Date().toLocaleDateString() }]);
    setIsPrescriptionModalOpen(false);
  };

  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePDF(invoiceRef, 'Facture');
    setDocuments([...documents, { type: 'Facture', date: new Date().toLocaleDateString(), montant: invoiceData.montant }]);
    setIsInvoiceModalOpen(false);
  };

  return (
    <div className={`animate-fade-in ${styles.container}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.patientName}>
            {patient.prenom} {patient.nom}
          </h1>
          <div className={styles.patientDetails}>
            <span className={styles.detailBadge}>🎂 {patient.date_naissance}</span>
            <span className={styles.detailBadge}>🩸 {patient.groupe_sanguin}</span>
            <span className={styles.detailBadge} style={{color: '#ef4444', borderColor: '#fca5a5'}}>⚠️ {patient.allergies}</span>
            <span className={styles.detailBadge}>📞 {patient.tel}</span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'histo' ? styles.tabActive : ''}`} onClick={() => setActiveTab('histo')}>
          Historique
        </button>
        <button className={`${styles.tab} ${activeTab === 'consult' ? styles.tabActive : ''}`} onClick={() => setActiveTab('consult')}>
          Consultation (Médecin)
        </button>
        <button className={`${styles.tab} ${activeTab === 'docs' ? styles.tabActive : ''}`} onClick={() => setActiveTab('docs')}>
          Documents
        </button>
      </div>

      {activeTab === 'histo' && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Derniers Rendez-vous</h2>
          <div className={styles.historyList}>
             <div className={styles.historyItem}>
                <div>
                   <div style={{ fontWeight: '600', marginBottom: 4 }}>12 Octobre 2026 - 10:30</div>
                   <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Motif: Renouvellement Ord. - <span style={{color: 'var(--accent-secondary)'}}>Terminé</span></div>
                </div>
                <button className={styles.btn} onClick={() => setIsInvoiceModalOpen(true)}>
                  <CreditCard size={18}/> Facturer
                </button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'consult' && (
        <div className={styles.card}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2 className={styles.cardTitle}>Dossier Médical (Privé)</h2>
            <button className={styles.btnPrimary} onClick={() => setIsPrescriptionModalOpen(true)}>
              <FileText size={18}/> Créer une ordonnance
            </button>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Notes accessibles uniquement avec le profil Docteur.
          </p>
          <textarea 
            className={styles.textarea} 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Saisissez notes, observations cliniques et diagnostic ici..."
          />
          <button className={styles.btn} style={{ marginTop: '16px' }}>Enregistrer</button>
        </div>
      )}

      {activeTab === 'docs' && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Documents Générés</h2>
          <div className={styles.historyList}>
             {documents.length === 0 ? (
               <p style={{color: 'var(--text-secondary)'}}>Aucun document généré pour le moment.</p>
             ) : (
               documents.map((doc, idx) => (
                 <div key={idx} className={styles.historyItem}>
                    <div>
                       <div style={{ fontWeight: '600', marginBottom: 4 }}>{doc.type}</div>
                       <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Date: {doc.date} {doc.montant && ` - ${doc.montant} €`}</div>
                    </div>
                    <button className={styles.btn}>
                      <Download size={18}/> {doc.type}
                    </button>
                 </div>
               ))
             )}
          </div>
        </div>
      )}

      {/* MODAL PRESCRIPTION */}
      {isPrescriptionModalOpen && (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                 <h2 className={styles.modalTitle}>Nouvelle Ordonnance</h2>
                 <button className={styles.btn} style={{border:'none'}} onClick={() => setIsPrescriptionModalOpen(false)}>
                    <X size={24} />
                 </button>
              </div>

              <form onSubmit={handleSavePrescription}>
                <div className={styles.medList}>
                  {medicines.map((med, index) => (
                    <div key={index} className={styles.medItem}>
                      <input placeholder="Médicament (ex: Doliprane 1000)" required className={styles.input} value={med.nom} onChange={e => updateMedicine(index, 'nom', e.target.value)} />
                      <input placeholder="Posologie (ex: 1/jour)" required className={styles.input} value={med.posologie} onChange={e => updateMedicine(index, 'posologie', e.target.value)} />
                      <input placeholder="Durée (ex: 5j)" required className={styles.input} value={med.duree} onChange={e => updateMedicine(index, 'duree', e.target.value)} />
                      <button type="button" onClick={() => removeMedicine(index)} className={styles.btnDanger} style={{padding: '10px'}}><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addMedicineRow} className={styles.btn} style={{marginBottom: 24}}>
                  <Plus size={18}/> Ajouter un traitement
                </button>

                <div style={{display:'flex', justifyContent:'flex-end', gap:12}}>
                  <button type="button" className={styles.btn} onClick={() => setIsPrescriptionModalOpen(false)}>Annuler</button>
                  <button type="submit" className={styles.btnPrimary}>Générer PDF</button>
                </div>
              </form>
            </div>
        </div>
      )}

      {/* MODAL FACTURATION */}
      {isInvoiceModalOpen && (
        <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{maxWidth: 400}}>
              <div className={styles.modalHeader}>
                 <h2 className={styles.modalTitle}>Facturer la consultation</h2>
                 <button className={styles.btn} style={{border:'none'}} onClick={() => setIsInvoiceModalOpen(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSaveInvoice}>
                <div style={{marginBottom: 16}}>
                  <label style={{display:'block', marginBottom:8, fontSize:13, fontWeight:600}}>Montant (€)</label>
                  <input type="number" required className={styles.input} value={invoiceData.montant} onChange={e => setInvoiceData({...invoiceData, montant: e.target.value})}/>
                </div>
                <div style={{marginBottom: 24}}>
                  <label style={{display:'block', marginBottom:8, fontSize:13, fontWeight:600}}>Méthode de paiement</label>
                  <select className={styles.input} value={invoiceData.methode} onChange={e => setInvoiceData({...invoiceData, methode: e.target.value})}>
                    <option>Carte</option>
                    <option>Espèces</option>
                    <option>Chèque</option>
                    <option>Tiers payant</option>
                  </select>
                </div>

                <div style={{display:'flex', justifyContent:'flex-end', gap:12}}>
                  <button type="button" className={styles.btn} onClick={() => setIsInvoiceModalOpen(false)}>Annuler</button>
                  <button type="submit" className={styles.btnPrimary}>Facturer et PDF</button>
                </div>
              </form>
            </div>
        </div>
      )}

      {/* PDFs INVISIBLES POUR HTML2CANVAS */}
      <div className={styles.pdfTemplateWrapper} ref={prescriptionRef}>
        <div className={styles.pdfHeader}>
          <div>
            <h1 className={styles.pdfLogo}>Nezha Medical</h1>
            <p>123 Avenue de la Santé, 75000 Paris</p>
            <p>Tél : 01 23 45 67 89</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{fontSize: 24, margin: '0 0 10px 0'}}>ORDONNANCE</h2>
            <p style={{fontSize: 14}}>Date : {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div style={{ margin: '40px 0', fontSize: '16px' }}>
          <p><strong>Patient(e) :</strong> {patient.prenom} {patient.nom}</p>
          <p><strong>Date de Naissance :</strong> {patient.date_naissance}</p>
        </div>

        <div style={{ minHeight: '400px' }}>
           <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '30px'}}>
             <thead>
               <tr style={{borderBottom: '2px solid #ccc', textAlign: 'left'}}>
                 <th style={{padding: '10px 0'}}>Prescription</th>
                 <th style={{padding: '10px 0'}}>Posologie</th>
                 <th style={{padding: '10px 0'}}>Durée</th>
               </tr>
             </thead>
             <tbody>
                {medicines.map((m, i) => (
                  <tr key={i} style={{borderBottom: '1px solid #eee'}}>
                    <td style={{padding: '15px 0', fontSize: '16px'}}>{m.nom}</td>
                    <td style={{padding: '15px 0', fontSize: '16px'}}>{m.posologie}</td>
                    <td style={{padding: '15px 0', fontSize: '16px'}}>{m.duree}</td>
                  </tr>
                ))}
             </tbody>
           </table>
        </div>

        <div style={{ marginTop: '50px', textAlign: 'right' }}>
           <p style={{marginBottom: '10px'}}>Le Médecin</p>
           <div style={{ width: '200px', height: '100px', border: '1px solid #ddd', marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>Signature</div>
        </div>
      </div>

      <div className={styles.pdfTemplateWrapper} ref={invoiceRef}>
        <div className={styles.pdfHeader}>
          <div>
            <h1 className={styles.pdfLogo}>Nezha Medical</h1>
            <p>123 Avenue de la Santé, 75000 Paris</p>
            <p>Tél : 01 23 45 67 89</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{fontSize: 24, margin: '0 0 10px 0'}}>FACTURE</h2>
            <p style={{fontSize: 14}}>N° FAC-{Date.now().toString().slice(-6)}</p>
            <p style={{fontSize: 14}}>Date : {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '40px 0', fontSize: '16px' }}>
          <div>
            <p style={{margin: '0 0 5px 0', color: '#666'}}>Facturé à :</p>
            <p style={{margin: 0, fontWeight: 'bold'}}>{patient.prenom} {patient.nom}</p>
          </div>
          <div style={{textAlign: 'right'}}>
            <p style={{margin: '0 0 5px 0', color: '#666'}}>Paiement :</p>
            <p style={{margin: 0, fontWeight: 'bold'}}>{invoiceData.methode}</p>
          </div>
        </div>

        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '50px'}}>
             <thead>
               <tr style={{borderBottom: '2px solid #ccc', textAlign: 'left', background: '#f8fafc'}}>
                 <th style={{padding: '15px'}}>Désignation</th>
                 <th style={{padding: '15px', textAlign: 'right'}}>Montant</th>
               </tr>
             </thead>
             <tbody>
                <tr style={{borderBottom: '1px solid #eee'}}>
                    <td style={{padding: '20px 15px', fontSize: '16px'}}>Consultation Médicale ({new Date().toLocaleDateString()})</td>
                    <td style={{padding: '20px 15px', fontSize: '16px', textAlign: 'right'}}>{parseFloat(invoiceData.montant).toFixed(2)} €</td>
                </tr>
             </tbody>
        </table>

         <div style={{ marginTop: '50px', borderTop: '2px solid #3b82f6', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
             <div style={{width: '300px'}}>
                 <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold'}}>
                     <span>TOTAL TTC</span>
                     <span>{parseFloat(invoiceData.montant).toFixed(2)} €</span>
                 </div>
                 <p style={{fontSize: '12px', color: '#666', textAlign: 'right', marginTop: '10px'}}>Montant réglé. TVA 0% (Prestation médicale)</p>
             </div>
         </div>
      </div>

    </div>
  );
}
