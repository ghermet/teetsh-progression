# UML Chart - Database & API Modelization

## Database Entity Relationship Diagram

```mermaid
erDiagram
    PROGRESSIONS {
        uuid id PK "Primary Key"
        string name "Progression name"
        text short_description "Brief description"
        string level "Educational level (CM1, CM2, etc.)"
        uuid school_year_id FK "Reference to school year"
        uuid school_id FK "Reference to school"
        uuid user_id FK "Reference to user"
        timestamptz created_at "Creation timestamp"
        timestamptz updated_at "Last update timestamp"
        string status "draft, published, archived"
    }

    PERIODS {
        uuid id PK "Primary Key"
        uuid progression_id FK "Reference to progression"
        string name "Period name (Semaine 1, Octobre)"
        date start_date "Period start date"
        date end_date "Period end date"
        string color "CSS color identifier"
        integer position "Display order"
    }

    SUBJECTS {
        uuid id PK "Primary Key"
        uuid progression_id FK "Reference to progression"
        string name "Subject name (Histoire et géographie)"
        string color "CSS color identifier"
        integer position "Display order"
    }

    DOMAINS {
        uuid id PK "Primary Key"
        uuid subject_id FK "Reference to subject"
        string name "Domain name (Histoire, Géographie)"
        string color "CSS color identifier"
        integer position "Display order"
    }

    LEARNING_ITEMS {
        uuid id PK "Primary Key"
        uuid domain_id FK "Reference to domain"
        uuid period_id FK "Reference to period"
        text content "HTML educational content"
        jsonb objectives "Structured learning objectives"
        jsonb resources "Links to educational resources"
        integer difficulty_level "1-5 difficulty scale"
        integer estimated_duration "Duration in minutes"
        timestamptz created_at "Creation timestamp"
        timestamptz updated_at "Last update timestamp"
    }

    SCHOOL_YEARS {
        uuid id PK "Primary Key"
        string name "Year name"
        date start_date "Academic year start"
        date end_date "Academic year end"
    }

    SCHOOLS {
        uuid id PK "Primary Key"
        string name "School name"
        string address "School address"
        string city "City"
        string postal_code "Postal code"
    }

    USERS {
        uuid id PK "Primary Key"
        string email "User email"
        string first_name "First name"
        string last_name "Last name"
        string role "teacher, admin, etc."
    }

    %% Relationships
    PROGRESSIONS ||--o{ PERIODS : "has many"
    PROGRESSIONS ||--o{ SUBJECTS : "contains"
    PROGRESSIONS }o--|| SCHOOL_YEARS : "belongs to"
    PROGRESSIONS }o--|| SCHOOLS : "belongs to"
    PROGRESSIONS }o--|| USERS : "created by"

    SUBJECTS ||--o{ DOMAINS : "divided into"
    DOMAINS ||--o{ LEARNING_ITEMS : "contains"
    PERIODS ||--o{ LEARNING_ITEMS : "scheduled in"
```

## API Class Diagram

```mermaid
classDiagram
    class Api {
        -string #authToken
        +string baseURL
        +ProgrammationsApi programmations
        +constructor(authToken: string)
        +validateToken(): boolean
    }

    class ProgrammationsApi {
        +string baseURL
        -string #authToken
        +constructor(baseURL: string, authToken: string)
        +findOne(id: string, init?: RequestInit): Promise~ProgressionResponse~
        +findMany(filters?: ProgressionFilters): Promise~ProgressionListResponse~
        +create(data: CreateProgressionRequest): Promise~ProgressionResponse~
        +update(id: string, data: UpdateProgressionRequest): Promise~ProgressionResponse~
        +delete(id: string): Promise~void~
    }

    class ProgressionResponse {
        +ProgressionData data
        +Record~string, unknown~ meta
    }

    class ProgressionData {
        +number id
        +string name
        +string shortDescription
        +string date
        +string userId
        +number nbOfUseLanding
        +number nbOfUseInApp
        +string schoolyearId
        +string schoolId
        +string programmationId
        +Periode[] periodes
        +Matiere[] matieres
        +number columnWidth
        +string fontSize
        +string view
        +boolean invertedRowCol
        +string niveau
        +string createdAt
        +string updatedAt
        +string publishedAt
        +string slug
        +string documentId
    }

    class Periode {
        +string id
        +string name
        +string color
        +string endDate
        +number position
        +string startDate
        +string programmationId
    }

    class Matiere {
        +string id
        +string name
        +string color
        +number position
        +string programmationId
        +Domaine[] domaines
    }

    class Domaine {
        +string id
        +string name
        +string color
        +string matiereId
        +Item[] items
    }

    class Item {
        +string id
        +string value
        +number y
        +string domaineId
        +string periodeId
        +unknown[] attachments
    }

    %% Relationships
    Api --> ProgrammationsApi : "contains"
    ProgrammationsApi --> ProgressionResponse : "returns"
    ProgressionResponse --> ProgressionData : "contains"
    ProgressionData --> Periode : "has many"
    ProgressionData --> Matiere : "has many"
    Matiere --> Domaine : "contains"
    Domaine --> Item : "contains"
```

## API Endpoint Flow Diagram

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Api
    participant P as ProgrammationsApi
    participant S as Strapi CMS
    participant DB as Database

    Note over C,DB: Get Progression Flow

    C->>A: new Api(authToken)
    A->>A: Validate token
    A->>P: new ProgrammationsApi(baseURL, token)

    C->>P: findOne(progressionId)
    P->>S: GET /api/programmations/{id}
    S->>DB: SELECT progression with relations
    DB-->>S: Progression data + periods + subjects + domains + items
    S-->>P: ProgressionResponse JSON
    P->>P: Parse and validate response
    P-->>C: ProgressionResponse object

    Note over C,DB: Create Progression Flow

    C->>P: create(progressionData)
    P->>S: POST /api/progressions
    S->>DB: INSERT progression
    DB-->>S: Created progression
    S-->>P: ProgressionResponse JSON
    P-->>C: Created progression object

    Note over C,DB: Update Progression Flow

    C->>P: update(id, updateData)
    P->>S: PUT /api/progressions/{id}
    S->>DB: UPDATE progression
    DB-->>S: Updated progression
    S-->>P: ProgressionResponse JSON
    P-->>C: Updated progression object
```

## Data Transformation Flow

```mermaid
flowchart TD
    A[Raw API Response] --> B[ProgressionResponse]
    B --> C[ProgressionData]
    C --> D[Extract Periods]
    C --> E[Extract Subjects]

    E --> F[Extract Domains]
    F --> G[Extract Items]

    D --> H[Timeline Structure]
    G --> H

    H --> I[ProgressionView Component]
    I --> J[ProgressionTable Rendering]

    subgraph "Component Layer"
        I --> K[ProgressionHeader]
        I --> L[ProgressionTable]
        I --> M[ProgressionFooter]
    end

    subgraph "Data Processing"
        N[Sort by Position] --> O[Group by Domain]
        O --> P[Position by Period]
        P --> Q[Timeline Blocks]
    end

    H --> N
    Q --> J
```

## Database Indexes and Performance

```mermaid
graph TB
    subgraph "Performance Optimizations"
        A[Primary Indexes]
        B[Foreign Key Indexes]
        C[Composite Indexes]
        D[Search Indexes]
    end

    A --> A1["progressions(id)"]
    A --> A2["periods(id)"]
    A --> A3["subjects(id)"]
    A --> A4["domains(id)"]
    A --> A5["learning_items(id)"]

    B --> B1["periods(progression_id)"]
    B --> B2["subjects(progression_id)"]
    B --> B3["domains(subject_id)"]
    B --> B4["learning_items(domain_id)"]
    B --> B5["learning_items(period_id)"]

    C --> C1["learning_items(domain_id, period_id)"]
    C --> C2["periods(progression_id, position)"]
    C --> C3["subjects(progression_id, position)"]

    D --> D1["progressions(name) GIN"]
    D --> D2["learning_items(content) GIN"]
    D --> D3["progressions(level, status)"]
```

## API Response Caching Strategy

```mermaid
graph LR
    subgraph "Cache Layers"
        A[Browser Cache]
        B[CDN Cache]
        C[API Gateway Cache]
        D[Redis Cache]
        E[Database Query Cache]
    end

    F[Client Request] --> A
    A --> B
    B --> C
    C --> D
    D --> E
    E --> G[Database]

    H[Cache Invalidation] --> D
    H --> C
    H --> B

    subgraph "TTL Settings"
        I["Static Data: 24h"]
        J["Progression Data: 1h"]
        K["User Data: 15min"]
    end
```

## Scalability Considerations

### Horizontal Scaling Points

- **API Server**: Load balancer + multiple instances
- **Database**: Read replicas for queries, master for writes
- **Cache**: Redis Cluster for distributed caching
- **CDN**: Static assets and API responses
- **File Storage**: Separate service for attachments

### Performance Metrics

- **API Response Time**: < 200ms for cached data
- **Database Query Time**: < 50ms for progression queries
- **Concurrent Users**: 1000+ simultaneous users
- **Data Throughput**: 10K+ progressions, 100K+ learning items
