# Améliorations du projet Teetsh Progression

## 1. Choix techniques effectués et leurs justifications

### Framework et outils de base

- **React 19** : Version la plus récente avec le React Compiler pour l'optimisation automatique
- **TypeScript strict** : Type safety complète, essentielle pour un projet éducatif complexe
- **Vite 7** : Build tool moderne, très rapide en développement

### Routing et état

- **TanStack Router** : Router type-safe avec loaders intégrés, parfait pour le préchargement des données de progression
- **TanStack Query** : Gestion robuste du cache et des états de chargement pour les données API

### Styling et UI

- **Tailwind CSS 4.0** : Système de design utilitaire avec CSS variables pour la cohérence des couleurs de périodes
- **Pas de librairie de composants** : Contrôle total sur l'UI spécialisée des timelines éducatives

### Architecture des données

- **Transformation hiérarchique** : Conversion Matière → Domaine → Items vers timeline blocks
- **DOMPurify** : Sécurisation du contenu HTML éducatif venant du CMS
- **CSS custom properties** : `var(--color-blue-300)` pour la cohérence visuelle des périodes

### Testing

- **Playwright + Page Object Model** : Tests E2E robustes pour l'UI complexe de timeline
- **Vitest + Testing Library** : Tests unitaires rapides pour la logique de transformation
- **Mock API avec fixtures** : Données de test réalistes pour la stabilité

### Justifications des choix

1. **TanStack Stack** : Écosystème cohérent, type-safe, avec excellent support du cache
2. **Transformation de données côté client** : Permet une UI responsive sans surcharger l'API
3. **CSS variables pour couleurs** : Facilite la gestion dynamique des thèmes de périodes
4. **Architecture component-based** : Séparation claire Header/Table/Footer pour la maintenabilité

## 2. Limites et compromis identifiés

### Performance

- **Transformation côté client** : Toute la logique de conversion hiérarchique → timeline se fait dans le navigateur
- **Pas de virtualisation** : Avec 37+ périodes, le DOM devient lourd (mais reste acceptable pour l'usage éducatif)
- **Rechargement complet** : Pas de mise à jour incrémentale des données

### UX/UI

- **Scroll horizontal uniquement** : Pas de navigation par raccourcis clavier ou minimap
- **Responsive limité** : Optimisé pour desktop/tablet, mobile plus contraint
- **Pas de zoom/focus** : Impossible de se concentrer sur une période spécifique

### Architecture de données

- **Structure rigide** : Le modèle Matière→Domaine→Item→Période n'est pas extensible
- **Couleurs statiques** : Les couleurs de périodes sont fixes, pas de personnalisation
- **Pas de relations cross-domaines** : Les items ne peuvent pas référencer d'autres domaines

### Accessibilité

- **Navigation au clavier limitée** : Pas de support complet pour les utilisateurs sans souris
- **Contrastes non vérifiés** : Les couleurs automatiques peuvent poser des problèmes d'accessibilité
- **Screen readers** : Support basique mais perfectible pour la navigation dans la timeline

### Robustesse

- **Gestion d'erreur basique** : Pas de retry automatique ou de fallback
- **Offline non supporté** : Aucune stratégie de cache persistent
- **Validation de données limitée** : Assume que l'API retourne toujours des données valides

### Scalabilité

- **Une seule progression à la fois** : Pas de comparaison ou vue multi-progressions
- **Pas de pagination** : Toutes les données chargées d'un coup
- **Cache basique** : TanStack Query par défaut, pas de stratégie sophistiquée

## 3. Améliorations futures avec 2x plus de temps

### Performance et scalabilité

- **Virtualisation de la timeline** : React-window pour gérer 100+ périodes sans impact performance
- **Transformation côté serveur** : API qui retourne directement les timeline blocks optimisés
- **Streaming des données** : Chargement progressif des périodes par chunks
- **Worker threads** : Transformation de données dans un Web Worker pour éviter le blocage UI

### Expérience utilisateur avancée

- **Navigation par raccourcis** : J/K pour naviguer entre périodes, / pour recherche
- **Minimap de navigation** : Vue d'ensemble clickable de toute la timeline
- **Zoom et focus** : Zoom sur une période spécifique avec détails étendus
- **Mode comparaison** : Affichage côte-à-côte de plusieurs progressions
- **Filtres avancés** : Par matière, domaine, niveau de difficulté, tags

### Collaboration et personnalisation

- **Annotations collaboratives** : Commentaires et notes partagées sur les items
- **Thèmes personnalisables** : Palette de couleurs adaptable par utilisateur/école
- **Bookmarks et favoris** : Sauvegarde de vues spécifiques
- **Export avancé** : PDF, Excel, impression optimisée avec mise en page

### Accessibilité renforcée

- **Navigation clavier complète** : Tab, flèches, Escape pour toute l'interface
- **Mode haute lisibilité** : Contraste élevé, tailles de police adaptables
- **Support screen reader** : ARIA labels complets, descriptions contextuelles
- **Raccourcis vocaux** : Intégration speech-to-text pour navigation

### Architecture technique

- **State management sophistiqué** : Zustand ou Jotai pour état complexe multi-vues
- **Real-time sync** : WebSocket pour mises à jour live multi-utilisateurs
- **Progressive Web App** : Cache intelligent, mode offline, notifications
- **Micro-frontends** : Modules indépendants au fur a et à mesure des fonctionnalités

### Analytics et monitoring

- **Telemetry utilisateur** : Tracking des interactions pour amélioration UX
- **Performance monitoring** : Real User Monitoring avec Core Web Vitals
- **A/B testing** : Framework pour tester différentes approches UX
- **Error boundary avancé** : Récupération gracieuse avec retry et reporting

## 4. Modélisation DB et routes API pour la progression

### Modélisation base de données

```sql
-- Table principale des progressions
CREATE TABLE progressions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    short_description TEXT,
    level VARCHAR(50), -- CM1, CM2, etc.
    school_year_id UUID REFERENCES school_years(id),
    school_id UUID REFERENCES schools(id),
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'draft' -- draft, published, archived
);

-- Périodes de temps (semaines, mois)
CREATE TABLE periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    progression_id UUID REFERENCES progressions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- "Semaine 1", "Octobre"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    color VARCHAR(50) DEFAULT 'blue-200', -- Couleur CSS
    position INTEGER NOT NULL, -- Ordre d'affichage
    UNIQUE(progression_id, position)
);

-- Matières/disciplines
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    progression_id UUID REFERENCES progressions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- "Histoire et géographie"
    color VARCHAR(50) DEFAULT 'slate-300',
    position INTEGER NOT NULL,
    UNIQUE(progression_id, position)
);

-- Domaines dans une matière
CREATE TABLE domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- "Histoire", "Géographie"
    color VARCHAR(50) DEFAULT 'blue-300',
    position INTEGER NOT NULL,
    UNIQUE(subject_id, position)
);

-- Items/contenus pédagogiques
CREATE TABLE learning_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id UUID REFERENCES domains(id) ON DELETE CASCADE,
    period_id UUID REFERENCES periods(id) ON DELETE CASCADE,
    content TEXT NOT NULL, -- HTML sécurisé
    objectives JSONB, -- Objectifs pédagogiques structurés
    resources JSONB, -- Liens vers ressources
    difficulty_level INTEGER DEFAULT 1, -- 1-5
    estimated_duration INTEGER, -- en minutes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_learning_items_domain_period ON learning_items(domain_id, period_id);
CREATE INDEX idx_periods_progression_position ON periods(progression_id, position);
CREATE INDEX idx_subjects_progression_position ON subjects(progression_id, position);
```

### Routes API REST

```typescript
// GET /api/progressions/:id - Récupérer une progression complète
interface GetProgressionResponse {
  data: {
    id: string;
    name: string;
    shortDescription: string;
    level: string;
    schoolYear: SchoolYear;
    periods: Period[];
    subjects: Subject[];
  };
}

// GET /api/progressions/:id/timeline - Version optimisée pour timeline
interface GetTimelineResponse {
  data: {
    progression: ProgressionMetadata;
    timeline: {
      periods: Period[];
      blocks: TimelineBlock[]; // Pré-calculés côté serveur
    };
  };
}

// POST /api/progressions - Créer une progression
interface CreateProgressionRequest {
  name: string;
  shortDescription?: string;
  level: string;
  schoolYearId: string;
  templateId?: string; // Cloner depuis un template
}

// PUT /api/progressions/:id - Mettre à jour
interface UpdateProgressionRequest {
  name?: string;
  shortDescription?: string;
  status?: 'draft' | 'published' | 'archived';
}

// POST /api/progressions/:id/periods - Ajouter une période
interface CreatePeriodRequest {
  name: string;
  startDate: string;
  endDate: string;
  color?: string;
  position: number;
}

// POST /api/learning-items - Ajouter du contenu
interface CreateLearningItemRequest {
  domainId: string;
  periodId: string;
  content: string;
  objectives?: string[];
  resources?: Resource[];
  difficultyLevel?: number;
}

// GET /api/progressions/:id/export?format=pdf|xlsx
// Génération de documents exportables

// GET /api/progressions/search?q=histoire&level=CM1
// Recherche avec filtres
```

### Routes API GraphQL (alternative)

```graphql
type Query {
  progression(id: ID!): Progression
  progressions(
    level: String
    subject: String
    schoolId: ID
    limit: Int = 20
    offset: Int = 0
  ): [Progression!]!
}

type Mutation {
  createProgression(input: CreateProgressionInput!): Progression!
  updateProgression(id: ID!, input: UpdateProgressionInput!): Progression!
  addLearningItem(input: AddLearningItemInput!): LearningItem!
  duplicateProgression(id: ID!, name: String!): Progression!
}

type Progression {
  id: ID!
  name: String!
  shortDescription: String
  level: String!
  periods: [Period!]!
  subjects: [Subject!]!
  stats: ProgressionStats!
}

type ProgressionStats {
  totalItems: Int!
  completedPeriods: Int!
  averageDifficulty: Float!
  estimatedDuration: Int!
}
```

### Optimisations de performance

1. **Vue matérialisée** pour timeline pré-calculée
2. **Cache Redis** pour progressions fréquemment accédées
3. **Pagination** pour grandes progressions (100+ périodes)
4. **Compression** des responses JSON avec gzip
5. **CDN** pour assets statiques (couleurs, icônes)
