# Atelier d'Idéation IA - Plateforme Interactive

Plateforme web interactive pour animer des ateliers d'idéation de cas d'usage IA avec système de gamification et de vote.

## 🎯 Fonctionnalités

### Pour les participants
- **Sélection de groupe** : Les participants choisissent leur groupe (Consultants Junior, Senior, ou Managers)
- **Construction de stack IA** : Sélection d'usages IA selon un budget de 200 AIBitcoins
- **3 catégories d'usages** :
  - Quick Wins (10 AI₿)
  - Structurants (20 AI₿)
  - Moonshots (50 AI₿)
- **Validation de stack** : Les groupes valident leur sélection finale

### Pour l'administrateur
- **Import JSON** : Import massif d'usages par groupe via format JSON
- **Gestion CRUD** : Création, modification et suppression d'usages
- **Présentation des stacks** : Affichage plein écran des stacks validées
- **Podium final** : Classement automatique des groupes selon les points

### Système de points
Les groupes gagnent des points selon la formule :
**Prix de l'usage × Nombre de groupes qui l'ont sélectionné**

## 🚀 Déploiement sur Vercel

### 1. Configuration de Supabase

Avant de déployer, vous devez configurer votre base de données Supabase :

1. Connectez-vous à [Supabase](https://supabase.com)
2. Allez dans **SQL Editor**
3. Copiez et exécutez le contenu du fichier `supabase-schema.sql`

### 2. Déploiement

#### Option A : Déploiement via GitHub (Recommandé)

1. Pushez votre code sur GitHub :
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <votre-repo-github>
git push -u origin main
```

2. Allez sur [Vercel](https://vercel.com) et cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement :
   - `VITE_SUPABASE_URL` : Votre URL Supabase
   - `VITE_SUPABASE_ANON_KEY` : Votre clé anon Supabase
   - `VITE_SUPABASE_SERVICE_ROLE_KEY` : Votre clé service role Supabase
5. Cliquez sur "Deploy"

#### Option B : Déploiement via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Suivez les instructions et ajoutez vos variables d'environnement quand demandé.

### 3. Variables d'environnement sur Vercel

Dans les paramètres du projet Vercel :
- Allez dans **Settings** > **Environment Variables**
- Ajoutez :
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_SUPABASE_SERVICE_ROLE_KEY`

## 💻 Développement local

### Installation

```bash
npm install
```

### Configuration

1. Copiez `.env.example` vers `.env`
2. Remplissez vos clés Supabase
3. Exécutez le script SQL dans Supabase

### Lancement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Build

```bash
npm run build
```

## 📚 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── UsageCard.tsx   # Carte d'usage
│   ├── StackBanner.tsx # Bannière de stack
│   ├── UsageEditor.tsx # Éditeur d'usage
│   └── JsonImporter.tsx # Importeur JSON
├── pages/              # Pages principales
│   ├── GroupSelection.tsx    # Sélection de groupe
│   ├── Workspace.tsx        # Page utilisateur
│   ├── Admin.tsx           # Administration
│   ├── StackPresentation.tsx # Présentation stacks
│   └── Podium.tsx          # Podium final
├── lib/
│   └── supabase.ts     # Configuration Supabase & types
├── App.tsx             # Router principal
└── main.tsx            # Point d'entrée
```

## 🎨 Style Neo-Brutaliste

Le projet utilise un style neo-brutaliste avec :
- Couleurs vives (rose, bleu, jaune, vert)
- Bordures noires épaisses (4px)
- Ombres portées (box-shadow brutal)
- Typographie Space Grotesk
- Animations subtiles

## 📋 Routes

- `/` - Sélection de groupe
- `/workspace` - Page de travail (utilisateurs)
- `/admin` - Interface d'administration
- `/admin/presentation` - Présentation des stacks
- `/admin/podium` - Podium final

## 🔑 Format JSON pour l'import

```json
[
  {
    "description": "Automatiser la génération de rapports",
    "category": "quick-win"
  },
  {
    "description": "Créer un assistant IA pour les réunions",
    "category": "structurant"
  },
  {
    "description": "Développer une IA prédictive complète",
    "category": "moonshot"
  }
]
```

Catégories autorisées : `quick-win`, `structurant`, `moonshot`

## 🎮 Déroulement d'un atelier

1. **Préparation** : L'admin importe les usages via JSON ou les crée manuellement
2. **Phase 1** : Les participants se connectent et sélectionnent leur groupe
3. **Phase 2** : Chaque groupe construit sa stack IA (budget : 200 AI₿)
4. **Phase 3** : Les groupes valident leur stack
5. **Phase 4** : L'admin présente chaque stack au grand écran
6. **Phase 5** : Révélation du podium et des points gagnés

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript + Vite
- **Styling** : TailwindCSS
- **Base de données** : Supabase (PostgreSQL)
- **Routing** : React Router v6
- **Déploiement** : Vercel
- **Font** : Space Grotesk (Google Fonts)

## 📝 Support

Pour toute question ou problème :
1. Vérifiez que les variables d'environnement sont correctement configurées
2. Assurez-vous que le schéma SQL a été exécuté dans Supabase
3. Consultez la console du navigateur pour les erreurs

## 🎉 Bon atelier !
