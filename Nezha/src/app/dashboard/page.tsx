'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    appointmentsToday: 12,
    patientsTotal: 1240,
    revenueMonth: '14,500'
  });

  return (
    <div className="animate-fade-in">
      <h1 className={styles.sectionTitle} style={{ marginBottom: '24px' }}>Vue d'ensemble</h1>

      {/* Grid de Statistiques */}
      <div className={styles.cardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Rendez-vous du jour</span>
            <div className={styles.iconWrapper}>
              {/* Icon Calendar */}
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          </div>
          <div className={styles.statValue}>{stats.appointmentsToday}</div>
          <div className={styles.statFooter}>+2 par rapport à hier</div>
        </div>

        <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Patients Enregistrés</span>
              <div className={styles.iconWrapper} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-secondary)' }}>
                {/* Icon Users */}
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
            </div>
            <div className={styles.statValue}>{stats.patientsTotal}</div>
            <div className={styles.statFooter}>+15 ce mois-ci</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Revenus (Relevé mensuel)</span>
            <div className={styles.iconWrapper} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          <div className={styles.statValue}>{stats.revenueMonth} €</div>
          <div className={styles.statFooter}>Facturation à jour</div>
        </div>
      </div>

      {/* Liste Récente */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Prochains Rendez-vous (Aujourd'hui)</h2>
        <div className={styles.recentList}>
          {/* Exemple statique pour UI */}
          {[
            { nom: 'Jean Dupont', heure: '09:00 - Consultation Générale', status: 'Programme' },
            { nom: 'Marie Claire', heure: '09:30 - Suivi de Traitement', status: 'En salle d\'attente' },
            { nom: 'Ahmed Mansouri', heure: '10:00 - Renouvellement Ordonnance', status: 'Programme' },
          ].map((rdv, idx) => (
            <div key={idx} className={styles.listItem}>
              <div className={styles.itemLeft}>
                <span className={styles.itemName}>{rdv.nom}</span>
                <span className={styles.itemDesc}>{rdv.heure}</span>
              </div>
              <span className={styles.statusBadge}>{rdv.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
