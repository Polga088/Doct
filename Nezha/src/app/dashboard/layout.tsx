'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.css';

// SVG Icons
const Icons = {
  Home: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Calendar: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Users: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  LogOut: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ nom: string; role: string } | null>(null);

  useEffect(() => {
    // Dans une app réelle, on fetcherait /api/auth/me, ici on simule.
    // Mais on peut vérifier la présence du cookie auth_token.
    // L'API va renvoyer 401 si le token est expiré, donc les requêtes échoueront.
    setUser({ nom: 'Staff', role: 'Connecté' }); // Simulation
  }, []);

  const handleLogout = async () => {
    // Idéalement on appelle un endpoint /api/auth/logout pour supprimer le cookie
    // Puis on redirige vers /login
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/login');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Nezha Medical</div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
            <Icons.Home /> Accueil
          </Link>
          <Link href="/dashboard/agenda" className={`${styles.navItem} ${pathname === '/dashboard/agenda' ? styles.active : ''}`}>
            <Icons.Calendar /> Agenda & RDV
          </Link>
          <Link href="/dashboard/patients" className={`${styles.navItem} ${pathname === '/dashboard/patients' ? styles.active : ''}`}>
            <Icons.Users /> Patients
          </Link>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <Icons.LogOut /> Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user?.nom}</span>
              <span className={styles.userRole}>{user?.role}</span>
            </div>
            <div className={styles.avatar}>
              {user?.nom.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
