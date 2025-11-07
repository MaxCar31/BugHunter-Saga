# 🧠 Instrucciones del Modelo Code Generator — Integración Frontend (React + TypeScript)

## 1. 🎯 Objetivo General

El modelo tiene como propósito **analizar las especificaciones de las funcionalidades implementadas en el backend** (según el `contract.yml` en formato OpenAPI) y **generar o modificar el código del frontend React + TypeScript** para conectarlo correctamente con los endpoints definidos, sin alterar la lógica del backend existente.

El modelo debe:
- Implementar el código necesario para que el frontend consuma los endpoints del backend.
- Respetar la estructura existente del proyecto frontend.
- Realizar solo los cambios estrictamente necesarios.
- Traducir cualquier texto hardcodeado en inglés al español.
- Explicar de forma clara y concisa el objetivo y funcionamiento del código generado.
- Si se genera nuevo código, **debe ser limpio, refactorizado y modular** (nunca todo en un solo archivo o clase).
- Indicar **dónde exactamente** dentro de la arquitectura existente del frontend se debe agregar el código nuevo.

---

## 2. ⚙️ Entradas Esperadas

El modelo recibe tres tipos de entradas:

1. **Feature Backend (principal):**  
   Descripción de la funcionalidad implementada (lógica, inputs, outputs esperados, endpoints).  
   ⚠️ *El usuario solo proporcionará esta entrada en cada prompt.*  
   El modelo debe, con base en ella:
   - Identificar los endpoints correspondientes en `contract.yml`.
   - Analizar qué partes del frontend deben modificarse.
   - Generar el código actualizado o nuevo según corresponda.

2. **Código Existente del Frontend:**  
   Si el usuario lo proporciona, se debe analizar para decidir qué partes modificar o extender.

3. **Contrato `contract.yml`:**  
   Archivo OpenAPI que especifica las rutas, métodos HTTP, parámetros, request bodies y responses del backend.

---

## 3. 🔁 Flujo del Proceso de Generación

### Paso 1: Análisis del Feature
- Analiza la descripción del *feature backend* recibido.  
- Identifica qué endpoints del `contract.yml` están asociados a esa funcionalidad.  
- Determina qué partes del frontend deben ser modificadas o extendidas (por ejemplo: servicios API, hooks, componentes o contextos).

### Paso 2: Análisis del Código Existente
- Si el usuario proporciona fragmentos de código, revísalos para detectar las clases, componentes o hooks donde debe integrarse la nueva funcionalidad.  
- Evita alteraciones estructurales importantes: **solo modificar o agregar lo necesario**.

### Paso 3: Implementación del Código
- Implementa las llamadas HTTP al backend usando `fetch`, `axios` o el cliente API del proyecto (según exista).  
- Tipar correctamente las respuestas y requests en TypeScript basándote en el contrato OpenAPI.  
- Implementar o actualizar componentes o servicios necesarios para consumir los endpoints.  
- Si existen textos hardcodeados en inglés, traducirlos a español.

### Paso 4: Explicación del Código
- Al final de cada bloque de código propuesto, incluir una **explicación concisa**:
  - Qué hace el código.
  - En qué parte del frontend se integra.
  - Qué objetivo cumple dentro de la funcionalidad.

---

## 4. 🧩 Reglas de Generación de Código

1. **No modificar el backend.**  
   El backend ya está finalizado. Todos los cambios se aplican solo en el frontend.

2. **Usar la arquitectura React + TypeScript existente.**  
   - Respetar carpetas como `src/services`, `src/hooks`, `src/components`, `src/pages`, `src/types`.  
   - Reutilizar tipados existentes.  
   - Si se crean nuevos tipos, definirlos en `src/types`.

3. **Consumo del Backend:**
   - Implementar las llamadas según el contrato OpenAPI (path, método HTTP, request/response).  
   - La URL base del backend debe apuntar al puerto `8081`, pero **no debe estar quemada** en el código.  
     Se debe configurar mediante una variable de entorno, por ejemplo:
     ```ts
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';
     ```
   - Ejemplo de llamada estándar con Axios:
     ```ts
     import axios from 'axios';
     import { UserRequest, UserResponse } from '../types/user';

     const api = axios.create({
       baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081',
     });

     export async function createUser(data: UserRequest): Promise<UserResponse> {
       const response = await api.post('/api/users', data);
       return response.data;
     }
     ```
   - Todas las llamadas deben ser **tipadas** y manejar errores.

4. **Control de errores y validaciones:**
   - Incluir manejo de errores básicos (`try/catch` o `onError` en hooks).  
   - Mostrar mensajes al usuario traducidos al español.

5. **Traducción de texto:**
   - Cambiar texto hardcodeado en inglés a español.
   - Ejemplo:
     ```tsx
     // Antes
     <p>Loading data...</p>
     // Después
     <p>Cargando datos...</p>
     ```

6. **Código limpio, refactorizado y modular (obligatorio):**
   - Si el modelo genera nuevo código, **debe ser limpio, refactorizado y dividido por responsabilidad**.  
   - **No todo debe ir en una sola clase, componente o archivo.**
   - Aplicar el principio de **una responsabilidad por módulo (SRP)**.
   - Dividir adecuadamente entre:
     - `services`: manejo de peticiones HTTP o lógica de negocio.
     - `hooks`: manejo de estado y lógica reutilizable.
     - `components`: presentación y renderizado.
     - `types`: definiciones de tipado global.
   - Si el código resultante crece en complejidad, el modelo debe **sugerir una refactorización automática**, creando nuevos módulos o funciones reutilizables.
   - Cada nuevo archivo o módulo debe indicar **exactamente dónde se ubica dentro de la arquitectura existente del proyecto**.

     Ejemplo:
     - Nuevo servicio API → `src/services/userService.ts`
     - Nuevo hook → `src/hooks/useUserData.ts`
     - Nuevo componente UI → `src/components/users/UserList.tsx`
     - Nuevos tipos → `src/types/user.ts`

7. **Explicación obligatoria del código:**
   - Después de cada bloque de código generado, incluir un texto breve:
     ```
     🔍 Explicación:
     Este hook `useUserData` obtiene los datos del usuario activo llamando al endpoint `/api/users/{id}`.
     Se usa dentro del componente `UserProfile` para mostrar la información actualizada.
     ```

---

## 5. 🧱 Estructura Recomendada del Proyecto Frontend

La estructura recomendada (y que debe respetarse o ampliarse de forma coherente) es la siguiente:

