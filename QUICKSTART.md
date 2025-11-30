# Guide de démarrage rapide

## Étape 1 : Configurer Supabase (5 minutes)

### 1.1 Créer les tables

1. Allez sur [https://supabase.com](https://supabase.com) et connectez-vous
2. Ouvrez votre projet (celui avec l'URL `chsdotsfjibiublstyaui.supabase.co`)
3. Cliquez sur **SQL Editor** dans le menu de gauche
4. Cliquez sur **New Query**
5. Copiez-collez tout le contenu du fichier `supabase-schema.sql`
6. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter)

Vous devriez voir un message de succès indiquant que les tables ont été créées.

### 1.2 Vérifier que tout fonctionne

1. Cliquez sur **Table Editor** dans le menu
2. Vous devriez voir 3 tables :
   - `usages`
   - `stacks`
   - `group_points`

## Étape 2 : Déployer sur Vercel (5 minutes)

### Option A : Via l'interface Vercel (Recommandé)

1. Créez un repository GitHub pour ce projet
2. Allez sur [https://vercel.com](https://vercel.com)
3. Cliquez sur **New Project**
4. Importez votre repository GitHub
5. Configurez les **Environment Variables** :
   ```
   VITE_SUPABASE_URL=https://chsdotsfjibiublstyaui.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoc2RvdHNmamJpdWJsc3R5YXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1Mjk4NjYsImV4cCI6MjA4MDEwNTg2Nn0.GtaXZ2weDvKMlFSDTVDo-VunspGmSDjkcUwny8y4rSc
   VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoc2RvdHNmamJpdWJsc3R5YXVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyOTg2NiwiZXhwIjoyMDgwMTA1ODY2fQ.9nggNsXM95ScuEw5yOIbXd9khGiwZ3LC8RmjDfUhSdw
   ```
6. Cliquez sur **Deploy**
7. Attendez 2-3 minutes

Votre site est déployé ! 🎉

### Option B : Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Suivez les instructions et ajoutez les variables d'environnement quand demandé.

## Étape 3 : Tester le site

### 3.1 Accéder à l'admin

1. Allez sur `votre-url.vercel.app/admin`
2. Vous devriez voir la page d'administration

### 3.2 Importer des usages de test

Cliquez sur **Import Groupe 1** et collez ce JSON :

```json
[
  {
    "description": "Automatiser la rédaction des comptes-rendus de réunion",
    "category": "quick-win"
  },
  {
    "description": "Générer des présentations PowerPoint à partir de notes",
    "category": "quick-win"
  },
  {
    "description": "Assistant IA pour la recherche documentaire",
    "category": "structurant"
  },
  {
    "description": "Chatbot intelligent pour le support client",
    "category": "structurant"
  },
  {
    "description": "Plateforme IA prédictive pour anticiper les besoins clients",
    "category": "moonshot"
  }
]
```

Faites de même pour les groupes 2 et 3 (avec d'autres usages).

### 3.3 Tester en tant que participant

1. Ouvrez `votre-url.vercel.app`
2. Sélectionnez un groupe
3. Ajoutez des usages à votre stack (budget : 200 AI₿)
4. Validez votre stack

### 3.4 Présenter les stacks

1. Retournez sur `/admin/presentation`
2. Naviguez entre les stacks avec les boutons ← →

### 3.5 Voir le podium

1. Allez sur `/admin/podium`
2. Le classement s'affiche automatiquement selon les points calculés

## 🎯 URLs importantes

- **Accueil** : `votre-url.vercel.app/`
- **Admin** : `votre-url.vercel.app/admin`
- **Présentation** : `votre-url.vercel.app/admin/presentation`
- **Podium** : `votre-url.vercel.app/admin/podium`

## 🔧 Développement local

Si vous voulez tester en local avant de déployer :

```bash
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## ⚠️ Attention

- N'oubliez pas d'exécuter le script SQL dans Supabase AVANT de déployer
- Les clés API sont déjà configurées dans ce guide
- Pour un usage en production, créez un nouveau projet Supabase avec vos propres clés

## 🆘 Problèmes courants

### "Cannot find module '@supabase/supabase-js'"
→ Lancez `npm install` dans le dossier du projet

### Les usages ne s'affichent pas
→ Vérifiez que le script SQL a bien été exécuté dans Supabase

### Erreur CORS
→ Vérifiez que les variables d'environnement sont bien configurées sur Vercel

## 📞 Support

Si vous rencontrez un problème :
1. Vérifiez la console du navigateur (F12)
2. Assurez-vous que Supabase est bien configuré
3. Vérifiez les variables d'environnement sur Vercel

Bon atelier ! 🎉
