# GitHub Copilot Instructions for BugHunter Saga

## 📋 Project Overview

**BugHunter Saga** is a gamified educational platform for teaching software testing and quality assurance concepts. The application uses a Duolingo-inspired UX to make learning engaging through XP, streaks, lingots (virtual currency), and competitive leaderboards.

### Technology Stack

**Frontend:**
- Next.js 14.2.11 (Pages Router) with React 18.3.1
- TypeScript (strict mode)
- Zustand 4.5.7 (state management with slice pattern)
- Tailwind CSS 3.4.11 (utility-first styling)
- dayjs for date/time handling

**Backend:**
- Spring Boot 3.4.11 with Java 17
- Hexagonal Architecture (Ports & Adapters)
- PostgreSQL with Flyway migrations
- Spring Security + JWT (stateless authentication)
- MapStruct 1.6.3 + Lombok for mapping
- SpringDoc OpenAPI for documentation

### Architecture Overview

**Frontend:** Pages → Components → Services (API) → Zustand Stores  
**Backend:** Controllers → Services → Domain Models → Repository Adapters → JPA Entities

Dependencies flow inward: Infrastructure → Application → Domain

---

## 🎯 Primary Objective

As an AI code generator for BugHunter Saga, your role is to:

1. **Analyze backend specifications** from `.results/openapi.yml` (OpenAPI contract)
2. **Generate or modify frontend React + TypeScript code** to integrate with backend endpoints
3. **Never modify backend code** unless explicitly requested
4. **Follow project architecture strictly** using `.results/2-file-categorization.json` as source of truth
5. **Generate clean, modular, responsive code** with Spanish text localization
6. **Explain every code change** with clear, concise descriptions

---

## 📋 Code Analysis Protocol (Evidence-Based Workflow)

### Core Principle: **NEVER ASSUME. ALWAYS VERIFY.**

Before ANY code generation or analysis:

### Step 1: Consult Project File Index

```bash
type .results\2-file-categorization.json
```

This file categorizes **ALL existing files** by architectural layer and purpose. It is your **single source of truth** for:
- ✅ File existence verification
- ✅ Exact file paths
- ✅ Architectural layer identification
- ✅ Related file discovery

**Available Categories:**

**Frontend:**
- `frontend-react-components` - UI components
- `frontend-lesson-components` - Lesson-specific components
- `frontend-learn-components` - Learn page components
- `frontend-pages` - Next.js pages
- `frontend-hooks` - Custom React hooks
- `frontend-state-management` - Zustand stores
- `frontend-services` - API integration layer
- `frontend-utils` - Utility functions
- `frontend-types` - TypeScript interfaces
- `frontend-styles` - CSS/styling files

**Backend:**
- `backend-controllers` - REST endpoints
- `backend-web-dtos` - Web layer DTOs
- `backend-web-mappers` - API mappers
- `backend-exception-handlers` - Error handlers
- `backend-application-services` - Business logic
- `backend-use-case-ports` - Use case interfaces
- `backend-use-case-results` - Result objects
- `backend-application-commands` - Command objects
- `backend-repository-ports` - Repository interfaces
- `backend-infrastructure-ports` - Infrastructure interfaces
- `backend-port-data-models` - Port data models
- `backend-domain-models` - Domain entities
- `backend-domain-exceptions` - Domain exceptions
- `backend-jpa-entities` - Database mappings
- `backend-jpa-repositories` - JPA repositories
- `backend-jpa-projections` - Database projections
- `backend-persistence-adapters` - Repository implementations
- `backend-persistence-mappers` - Persistence mappers
- `backend-security-adapters` - Security adapters
- `backend-security-config` - Security configuration
- `backend-infrastructure-config` - Infrastructure config

### Step 2: Read OpenAPI Contract

```bash
type .results\openapi.yml
```

Extract:
- Endpoint path and HTTP method
- Request schema (body, query params, path variables)
- Response schema (success and error cases)
- Authentication requirements
- Status codes

### Step 3: Identify Affected Frontend Files

Based on categorization, locate:
1. **Service layer** (`frontend-services`) - API call implementation
2. **Types** (`frontend-types` or inline) - TypeScript interfaces matching DTOs
3. **State management** (`frontend-state-management`) - Zustand store slices
4. **Components/Pages** (`frontend-pages`, `frontend-react-components`) - UI consuming data
5. **Hooks** (`frontend-hooks`) - Custom data fetching logic (if needed)

### Step 4: Read Existing Files

Once paths are confirmed from categorization, read files in architectural flow order:

```
Page/Component → Hook (if exists) → Service → Store → Types
```

### Step 5: Generate Code

Only after completing Steps 1-4, generate code following these rules:

**✅ REQUIRED:**
- Match TypeScript types exactly to OpenAPI schemas
- Use correct endpoint paths and HTTP methods from contract
- Include `Authorization: Bearer <token>` for protected endpoints
- Handle all documented status codes (200, 400, 401, 404, 500)
- Update **only frontend files** (services, types, stores, components)
- Translate all hardcoded text to Spanish
- Ensure full responsiveness (mobile-first with Tailwind `md:`, `lg:` breakpoints)
- Specify exact file paths using categorization

**❌ PROHIBITED:**
- Guessing file locations without checking categorization
- Reading backend source code (only read OpenAPI contract)
- Modifying backend files
- Assuming response structures
- Skipping error handling
- Using hardcoded values from OpenAPI examples
- Non-responsive UI code

---

## 🔄 Code Generation Workflow

### Input Types

You will receive:

1. **Feature Description:** Backend functionality to integrate (e.g., "User profile endpoint")
2. **Existing Frontend Code:** (Optional) Current implementation to modify
3. **OpenAPI Contract:** Always at `.results/openapi.yml`

### Generation Process

#### Phase 1: Analysis (Evidence Gathering)

1. **Check File Categorization:**
   ```bash
   type .results\2-file-categorization.json | findstr /i "feature-keyword"
   ```

2. **Read OpenAPI Contract:**
   ```bash
   type .results\openapi.yml | findstr /A "/api/feature-path"
   ```

3. **Identify Existing Files:**
   - Service: Check `frontend-services` category
   - Types: Check `frontend-types` category or inline definitions
   - Store: Check `frontend-state-management` category
   - Page/Component: Check `frontend-pages` or `frontend-react-components`

4. **Read Existing Files:**
   - Read each file identified in Step 3
   - Note current implementation patterns
   - Identify integration points

#### Phase 2: Code Generation

Generate code in this order:

**1. TypeScript Types** (`src/types/`)

```typescript
// filepath: src/types/featureName.ts
/**
 * 🔍 Explicación:
 * Interfaz que define la estructura de datos para [Feature Name]
 * basada en el esquema OpenAPI en .results/openapi.yml
 * Ruta del endpoint: [endpoint-path]
 */
export interface FeatureDTO {
  // Campos exactos del contrato OpenAPI
  fieldName: string; // Tipo del schema
}
```

**2. API Service** (`src/services/`)

```typescript
// filepath: src/services/featureService.ts
import { apiBase } from "~/utils/config";
import type { FeatureDTO } from "~/types/featureName";

/**
 * 🔍 Explicación:
 * Servicio que gestiona las llamadas HTTP al backend para [Feature Name]
 * Endpoint: [método HTTP] [ruta del endpoint]
 * Autenticación: [Sí/No - Bearer token]
 */

const createAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('bh_token') || ''}`,
});

export const getFeatureData = async (params?: Type): Promise<FeatureDTO> => {
  const response = await fetch(`${apiBase}/api/feature/path`, {
    method: 'GET',
    headers: createAuthHeaders(),
  });
  
  // Manejo de errores basado en códigos de estado del contrato
  if (response.status === 401) {
    throw new Error('No autorizado - token expirado');
  }
  
  if (response.status === 404) {
    throw new Error('Recurso no encontrado');
  }
  
  if (!response.ok) {
    throw new Error(`Error al obtener datos: ${response.statusText}`);
  }
  
  return response.json();
};
```

**3. Zustand Store Slice** (`src/stores/`)

```typescript
// filepath: src/stores/createFeatureSlice.ts
import type { BoundStateCreator } from "~/hooks/useBoundStore";
import type { FeatureDTO } from "~/types/featureName";

/**
 * 🔍 Explicación:
 * Slice de Zustand que gestiona el estado global de [Feature Name]
 * Integrado en el store principal via useBoundStore
 * Almacena: [descripción de qué datos guarda]
 */

export type FeatureSlice = {
  featureData: FeatureDTO | null;
  loading: boolean;
  error: string | null;
  setFeatureData: (data: FeatureDTO) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const createFeatureSlice: BoundStateCreator<FeatureSlice> = (set) => ({
  featureData: null,
  loading: false,
  error: null,
  setFeatureData: (data) => set(() => ({ featureData: data })),
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),
});
```

**4. Component/Page Integration**

```typescript
// filepath: src/pages/featureName.tsx o src/components/FeatureName.tsx
import { useEffect } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { getFeatureData } from "~/services/featureService";

/**
 * 🔍 Explicación:
 * [Componente/Página] que muestra [descripción de funcionalidad]
 * Consume datos del store Zustand mediante useBoundStore
 * Carga datos al montar llamando a getFeatureData() del servicio
 * 
 * Flujo de datos:
 * 1. useEffect ejecuta getFeatureData() al montar
 * 2. Resultado se guarda en Zustand store
 * 3. Componente reactiva con datos actualizados
 */

export default function FeaturePage() {
  const { featureData, loading, error } = useBoundStore((x) => ({
    featureData: x.featureData,
    loading: x.loading,
    error: x.error,
  }));

  useEffect(() => {
    const loadData = async () => {
      useBoundStore.getState().setLoading(true);
      useBoundStore.getState().setError(null);
      
      try {
        const data = await getFeatureData();
        useBoundStore.getState().setFeatureData(data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
        useBoundStore.getState().setError(errorMsg);
      } finally {
        useBoundStore.getState().setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!featureData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* UI totalmente responsive con Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Contenido aquí */}
      </div>
    </div>
  );
}
```

#### Phase 3: Response Structure

Always format responses as:

```markdown
## 🔍 Análisis Previo

**Archivos Consultados:**
- `.results/2-file-categorization.json` (índice del proyecto)
- `.results/openapi.yml` (contrato de API)

**Archivos Existentes Identificados:**
1. `[ruta-exacta]` (categoría: `[categoría]`) - [Estado: Existe/No existe]
2. `[ruta-exacta]` (categoría: `[categoría]`) - [Estado: Existe/No existe]

**Endpoint del Contrato:**
- Ruta: `[método] /api/path`
- Autenticación: [Sí/No]
- Request: `[schema]`
- Response: `[schema]`
- Códigos de estado: `[200, 400, 401, 404, 500]`

---

## 💻 Código Generado

### 1. Tipos TypeScript

````typescript
// filepath: src/types/featureName.ts
[código aquí]