# The Wild Oasis

[🇬🇧 English](./README.md) | 🇫🇷 Français

Dashboard de gestion hôtelière à usage interne — réservations, check-in/check-out, cabines et clients — développé avec React, React Query et Supabase.

## Démo en ligne

**[wild-oasis-maroon7-slideshow9.netlify.app](https://wild-oasis-maroon7-slideshow9.netlify.app)** — déployé automatiquement depuis `main` via Netlify (CI/CD à chaque push).

C'est un outil interne à un seul établissement : tout utilisateur connecté voit et peut modifier les mêmes données partagées (réservations, cabines, clients), et l'inscription publique sur le projet est désactivée par choix de sécurité (voir [Sécurité](#sécurité)). Il n'y a donc pas de compte de démo en libre-service — contactez-moi et je vous transmets des identifiants. Coordonnées disponibles sur [dan0203.github.io](https://dan0203.github.io).

Le compte étant partagé, les données que vous voyez ont pu être ajoutées, modifiées ou supprimées par quelqu'un d'autre ayant testé la démo avant vous — si quelque chose semble étrange, c'est probablement la raison, pas un bug.

## Captures d'écran

![Dashboard](./screenshots/dashboard.png)

<table>
<tr>
<td><img src="./screenshots/bookings.png" alt="Liste des réservations" /></td>
<td><img src="./screenshots/cabins.png" alt="Gestion des cabines" /></td>
</tr>
<tr>
<td align="center"><sub>Réservations — filtres, tri, check-in/check-out</sub></td>
<td align="center"><sub>Cabines — CRUD avec upload d'image et remises</sub></td>
</tr>
</table>

<details>
<summary>Mode sombre</summary>
<img src="./screenshots/dashboard-dark.png" alt="Dashboard en mode sombre" />
</details>

## Fonctionnalités

- **Dashboard** — indicateurs clés (réservations, ventes, check-ins, taux d'occupation), répartition des durées de séjour, graphique des ventes sur une période sélectionnable
- **Réservations** — liste avec filtres par statut et tri, vue détaillée, flux de check-in et check-out
- **Cabines** — CRUD avec upload d'image, capacité et remises
- **Utilisateurs** — gestion des comptes du personnel (accès restreint, voir [Sécurité](#sécurité))
- **Paramètres** — règles de réservation (nuits min/max, nombre max d'invités, prix du petit-déjeuner)
- Mode sombre

## Stack technique

React (Vite) · React Query · Supabase (Postgres, Auth, Storage) · react-hook-form · styled-components · recharts

## Lancer le projet en local

**Prérequis :** Node 18+ et un projet Supabase.

```bash
git clone https://github.com/dan0203/wild-oasis.git
cd wild-oasis
npm install
```

Créer un fichier `.env` à la racine du projet (voir `.env.example`) :

```
VITE_SUPABASE_URL=url-de-votre-projet-supabase
VITE_SUPABASE_KEY=votre-cle-anon-supabase
```

```bash
npm run dev
```

Les variables doivent être préfixées par `VITE_` — c'est une exigence de Vite pour les exposer au code client. La clé anon/publishable est faite pour être publique dans le bundle client ; le vrai contrôle d'accès repose sur les règles Row Level Security de Supabase, pas sur le secret de la clé (voir ci-dessous).

## Sécurité

- **Row Level Security (RLS)** restreint toutes les lectures/écritures sur `bookings`, `cabins`, `guests` et `settings` au rôle `authenticated`. C'est le bon modèle pour un outil interne à un seul établissement, où n'importe quel membre du personnel connecté doit voir l'ensemble des données — contrairement à une app multi-tenant où chaque utilisateur ne voit que ses propres données.
- **L'inscription publique est désactivée** sur le projet Supabase. Le rôle `authenticated` seul n'est pas une vraie barrière tant que l'inscription reste ouverte : `supabase.auth.signUp()` est un endpoint public, appelable directement (par exemple en `curl`), indépendamment de ce que le `ProtectedRoute` de l'app React cache dans l'interface — une protection de route côté client n'empêche pas un appel direct à l'API. Ce point a été identifié, corrigé, puis vérifié par deux méthodes indépendantes : un appel direct à `POST /auth/v1/signup` renvoie désormais `422 signup_disabled`, et le formulaire "Create user" de l'app renvoie la même erreur une fois connecté. Les nouveaux comptes du personnel sont pour l'instant ajoutés manuellement depuis le dashboard Supabase — le formulaire de l'app reste volontairement visible plutôt que supprimé, puisque cet échec est la barrière de sécurité qui fonctionne comme prévu, pas un bug.

## Workflow Git

65 commits développés par branches de fonctionnalité (`feature/auth`, `feature/dashboard`, `feature/bookings-table`, `feature/api-filter-sort-pagination`, `feature/dark-mode`, `fix/error-handling`, …), fusionnées dans `main`.

## À propos de ce projet

Développé comme projet capstone de *The Ultimate React Course 2025* (Jonas Schmedtmann).

## Licence

[MIT](./LICENSE)
