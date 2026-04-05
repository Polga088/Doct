# PRIMER.md — État Présent du Projet
> Snapshot de l'état actuel. Mettre à jour après chaque session de travail.

**Dernière mise à jour :** 2026-04-05

---

## ✅ Infrastructure Active

| Service | État | Détail |
|---|---|---|
| Serveur Next.js | 🟢 `npm run dev` | Port **3001** (`localhost:3001`) |
| PostgreSQL | 🟢 Connecté | DB `clinique_medicale` sur `localhost:5432` |
| Prisma | 🟢 Synchro | `npx prisma db push` → schéma en sync |
| Middleware RBAC | 🟢 Actif | `Nezha/middleware.ts` (racine) |
| Seed | 🟢 OK | 3 comptes sans données fantômes |

---

## 🔨 Tâche En Cours

**Problème résolu :** Erreur `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
- **Cause :** `doctor_id: 'mock-doc'` → PostgreSQL Foreign Key violation → Next.js envoie HTML d'erreur
- **Fix :** Nouvelle route `/api/auth/me` + lecture du vrai `currentUserId` dans l'agenda

**Prochain test à valider :**
- [ ] Se connecter avec `doctor@clinique.com`
- [ ] Ouvrir l'Agenda → cliquer sur un créneau
- [ ] Créer un RDV avec un patient → vérifier qu'il apparaît dans le calendrier
- [ ] Tester la déconnexion (icône → dans la sidebar)

---

## 🏗️ Architecture des Dashboards

```
/login
  → ADMIN    → /dashboard/admin
  → DOCTOR   → /dashboard/doctor
  → ASSISTANT → /dashboard/assistant

Partagé (tous rôles) :
  /dashboard/agenda
  /dashboard/patients
```

---

## ⚠️ Points de Vigilance Actuels

1. **Warning Next.js 16** : `"middleware" file convention is deprecated. Please use "proxy" instead.`
   → Behaviour fonctionnel mais le fichier devrait s'appeler `proxy.ts`. À migrer si Next.js force la transition.

2. **Linting `date-fns`** : Des avertissements d'import `fr` de `date-fns/locale/fr` peuvent apparaître.
   → Sans impact runtime, mais à nettoyer.

3. **hydration warning** supprimé grâce à la suppression de `ThemeProvider`.

---

## 📦 Composants Shadcn Installés

`table` · `dropdown-menu` · `dialog` · `sheet` · `button` · `input` · `badge` · `card` · `sonner` · `avatar` · `select` · `label`

Chemin : `src/components/ui/`
Config : `components.json` → alias `@/lib/utils` (corrigé depuis `@/src/lib/utils`)
