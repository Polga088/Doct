'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  HeartPulse,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
      });

      const ct = res.headers.get('content-type') ?? '';
      if (!ct.includes('application/json')) {
        throw new Error(
          'Réponse serveur invalide (attendu JSON). Exécutez `npx prisma generate` puis redémarrez.'
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Identifiants invalides');
      }

      toast.success('Connexion réussie ! Redirection...');

      const role = data.user.role;
      const target =
        role === 'ADMIN'
          ? '/dashboard/admin'
          : role === 'DOCTOR'
            ? '/dashboard/doctor'
            : role === 'ASSISTANT'
              ? '/dashboard/assistant'
              : '/dashboard';

      window.location.href = target;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Connexion impossible');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clinical-shell relative flex min-h-screen">
      {/* Panneau latéral branding — desktop */}
      <aside className="relative hidden w-[46%] max-w-xl flex-col justify-between overflow-hidden lg:flex xl:max-w-2xl">
        <div className="absolute inset-0 clinical-gradient" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 flex flex-col gap-8 p-10 xl:p-14">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-medical-blue backdrop-blur-sm ring-1 ring-white/20">
              <HeartPulse size={28} strokeWidth={2} aria-hidden />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-white">Nezha Medical</p>
              <p className="text-sm font-medium text-blue-100/80">Plateforme clinique premium</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-display-md text-white">
              Gestion clinique
              <br />
              <span className="text-blue-200">précise &amp; sécurisée</span>
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-blue-100/75">
              Dossiers patients, agenda, consultations et facturation — un environnement
              professionnel conçu pour les équipes médicales.
            </p>
          </div>

          <div className="mt-4 grid gap-4">
            {[
              { icon: Stethoscope, label: 'Consultations en temps réel', desc: 'File d\'attente & statuts live' },
              { icon: Users, label: 'Dossiers patients centralisés', desc: 'Historique clinique complet' },
              { icon: Activity, label: 'Pilotage cabinet', desc: 'KPI, revenus & analytics' },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-blue-100/65">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 p-10 text-xs text-blue-200/50 xl:p-14">
          © {new Date().getFullYear()} Nezha Medical — Données de santé protégées
        </p>
      </aside>

      {/* Panneau formulaire */}
      <main className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
        </div>

        <div className="fade-in-up z-10 w-full max-w-[440px]">
          {/* Branding mobile */}
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl clinical-gradient text-white shadow-medical-blue">
              <HeartPulse size={30} strokeWidth={2} aria-hidden />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Nezha Medical</h1>
            <p className="mt-1 text-sm text-slate-500">Espace personnel sécurisé</p>
          </div>

          <div className="clinical-panel p-7 sm:p-9">
            <div className="mb-7 hidden lg:block">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Connexion</h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Accédez à votre espace professionnel
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Adresse email
                </Label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden
                  />
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="marie@clinique.com"
                    className="clinical-input h-12 pl-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Mot de passe
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                  >
                    Oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden
                  />
                  <Input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="clinical-input h-12 pl-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="clinical-button h-12 w-full rounded-xl text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Authentification…
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-900/[0.04]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
              <p className="text-xs leading-relaxed text-slate-500">
                Accès réservé au personnel habilité. Les comptes sont créés par
                l&apos;administration du cabinet — aucune inscription publique.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400 lg:hidden">
            © {new Date().getFullYear()} Nezha Medical — Plateforme clinique sécurisée
          </p>
        </div>
      </main>
    </div>
  );
}
