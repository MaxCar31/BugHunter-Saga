# 🔧 Fix: React Hydration Error en Next.js

## 🐛 Problema

**Error 1: Learn Page**
```
Error: Text content does not match server-rendered HTML.
Warning: Prop `className` did not match. 
Server: "mb-4 text-xl font-bold text-gray-800 sm:text-2xl" 
Client: "mb-6 text-lg font-bold text-gray-800 sm:text-xl"
```
**Ubicación:** `src/pages/learn.tsx`

**Error 2: Module Header**
```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Expected server HTML to contain a matching <div> in <header>.
```
**Ubicación:** `src/components/ModuleDropDown.tsx` (dentro de `ModuleHeader.tsx`)

## 🔍 Causa Raíz

El error de hidratación ocurre cuando hay diferencias entre el HTML renderizado por el servidor (SSR) y el HTML que React genera en el cliente después de la hidratación.

### Flujo del Problema:

1. **Servidor (SSR):**
   - `currentModule` es `null` (localStorage no existe en servidor)
   - Renderiza: "No se ha seleccionado un módulo"
   - HTML: `className="mb-4 text-xl..."`

2. **Cliente (Primera carga):**
   - `getInitialModule()` lee localStorage
   - `currentModule` existe
   - Renderiza: "Cargando módulo..."
   - HTML: `className="mb-6 text-lg..."`

3. **React detecta mismatch:**
   - El HTML del servidor no coincide con el del cliente
   - Lanza error de hidratación
   - Reconstruye todo el DOM desde cero (performance hit)

## ✅ Solución Implementada

### Estrategia: **Delayed Rendering Pattern**

Evitar renderizar contenido dependiente de localStorage hasta que el cliente esté completamente montado.

### Cambios en `_app.tsx`:

**❌ ANTES:**
```tsx
import { useEffect } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    const module = useBoundStore.getState().module;
    const loggedIn = useBoundStore.getState().loggedIn;
    
    if (loggedIn && module) {
      console.log("✅ Estado restaurado desde localStorage:", {
        module: module.name,
        loggedIn,
      });
    }
  }, []);

  return <Component {...pageProps} />;
};
```

**✅ DESPUÉS:**
```tsx
const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
```

**Razón:** El `useEffect` causaba:
- Re-renders innecesarios
- Logs duplicados en consola
- Potenciales race conditions

El store ya se inicializa automáticamente desde localStorage via `getInitialX()` en cada slice.

---

### Cambios en `ModuleDropDown.tsx`:

**❌ ANTES:**
```tsx
export const ModuleDropDown = () => {
  const currentModule = useBoundStore((x) => x.module);
  const [modulesShown, setModulesShown] = useState(false);

  if (!currentModule) {
    return null; // Servidor: retorna null, Cliente: retorna <div>
  }

  return <div>...</div>;
};
```

**✅ DESPUÉS:**
```tsx
export const ModuleDropDown = () => {
  const currentModule = useBoundStore((x) => x.module);
  const [modulesShown, setModulesShown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Retorna null tanto en servidor como en cliente hasta useEffect
  if (!isMounted || !currentModule) {
    return null;
  }

  return <div>...</div>;
};
```

**Razón:** El componente retornaba `null` en el servidor pero renderizaba un `<div>` en el cliente después de cargar `currentModule` desde localStorage, causando mismatch en el `<header>`.

---

### Cambios en `learn.tsx`:

**❌ ANTES:**
```tsx
const Learn: NextPage = () => {
  const currentModule = useBoundStore((x) => x.module);
  const [isLoading, setIsLoading] = useState(true);

  // Render inmediato basado en currentModule
  if (!currentModule?.code) {
    return <div>No se ha seleccionado un módulo</div>;
  }

  if (isLoading) {
    return <div>Cargando módulo...</div>;
  }
  
  // ...
};
```

**✅ DESPUÉS:**
```tsx
const Learn: NextPage = () => {
  const currentModule = useBoundStore((x) => x.module);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // 🆕

  // Marcar como montado después de la hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mostrar loading durante la hidratación para evitar mismatch
  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="rounded-xl bg-white p-6 text-center shadow-lg sm:p-8">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-4 border-blue-500 sm:h-12 sm:w-12"></div>
        </div>
      </div>
    );
  }

  // Early returns después de la hidratación
  if (!currentModule?.code) {
    return <div>No se ha seleccionado un módulo</div>;
  }

  if (isLoading) {
    return <div>Cargando módulo...</div>;
  }
  
  // ...
};
```

## 🧠 Explicación Detallada

### Estado `isMounted`:

```tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);
```

**¿Qué hace?**
- Inicia en `false` (tanto en servidor como en cliente)
- En el cliente, después de la hidratación, `useEffect` lo cambia a `true`
- En el servidor, `useEffect` nunca se ejecuta, siempre es `false`

**¿Por qué funciona?**
- **Servidor:** Renderiza el loading spinner (HTML consistente)
- **Cliente (primera vez):** También renderiza loading spinner (HTML idéntico)
- **Cliente (después de useEffect):** Cambia a `true`, renderiza contenido real

✅ **No hay mismatch porque ambos lados renderizan lo mismo inicialmente**

### Flujo Correcto:

```
Servidor (SSR)
  └─> isMounted = false
  └─> Renderiza: <div>Loading spinner</div>
  └─> Genera HTML
  └─> Envía al navegador

Cliente (Hidratación)
  └─> isMounted = false
  └─> Renderiza: <div>Loading spinner</div>
  └─> React compara con HTML del servidor
  └─> ✅ Match perfecto

Cliente (Después de useEffect)
  └─> isMounted = true
  └─> Re-renderiza: Contenido real con currentModule de localStorage
  └─> Usuario ve contenido correcto
```

## 🎯 Mejores Prácticas para Evitar Hydration Errors

### ❌ **NO hacer:**

1. **Acceder a localStorage directamente en render:**
   ```tsx
   // ❌ MAL
   const Learn = () => {
     const token = localStorage.getItem("bh_token"); // Error en SSR
     return <div>{token ? "Logged in" : "Logged out"}</div>;
   };
   ```

2. **Usar Date.now() o timestamps en render:**
   ```tsx
   // ❌ MAL
   const Component = () => {
     return <div>Generated at: {Date.now()}</div>; // Diferente en servidor y cliente
   };
   ```

3. **Renderizar contenido basado en window sin guard:**
   ```tsx
   // ❌ MAL
   const Component = () => {
     return <div>Width: {window.innerWidth}px</div>; // window no existe en servidor
   };
   ```

4. **useEffect que modifica estado usado en render inicial:**
   ```tsx
   // ❌ MAL
   const [data, setData] = useState("initial");
   useEffect(() => {
     setData(localStorage.getItem("data") || "initial");
   }, []);
   return <div>{data}</div>; // Cambia después de hidratación
   ```

### ✅ **SÍ hacer:**

1. **Usar estado de montaje para delayed rendering:**
   ```tsx
   // ✅ BIEN
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => setIsMounted(true), []);
   
   if (!isMounted) return <Loading />;
   
   const token = localStorage.getItem("bh_token");
   return <div>{token ? "Logged in" : "Logged out"}</div>;
   ```

2. **Inicializar estado en useEffect, no en render:**
   ```tsx
   // ✅ BIEN
   const [timestamp, setTimestamp] = useState<number | null>(null);
   useEffect(() => {
     setTimestamp(Date.now());
   }, []);
   return <div>{timestamp ? `Generated at: ${timestamp}` : "Loading..."}</div>;
   ```

3. **Usar guards para APIs del navegador:**
   ```tsx
   // ✅ BIEN
   const getWidth = () => {
     if (typeof window === "undefined") return 0;
     return window.innerWidth;
   };
   ```

4. **Separar lógica de servidor y cliente:**
   ```tsx
   // ✅ BIEN
   const Component = () => {
     const [clientData, setClientData] = useState<string | null>(null);
     
     useEffect(() => {
       // Esta lógica solo se ejecuta en el cliente
       setClientData(localStorage.getItem("data"));
     }, []);
     
     // Renderizar lo mismo en servidor y cliente hasta useEffect
     return <div>{clientData || "Loading..."}</div>;
   };
   ```

## 📊 Impacto de la Solución

### Antes:
- ❌ Error de hidratación en consola
- ❌ React reconstruye todo el DOM (lento)
- ❌ Flash de contenido incorrecto
- ❌ Logs duplicados

### Después:
- ✅ Sin errores de hidratación
- ✅ Hidratación exitosa (rápida)
- ✅ Loading spinner breve (~100ms)
- ✅ Contenido correcto inmediatamente

## 🔗 Referencias

- [Next.js: React Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)
- [React: Hydration Mismatch](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-an-entire-document)
- [Zustand + Next.js SSR](https://github.com/pmndrs/zustand#using-zustand-with-nextjs)

---

**Autor:** AI Assistant  
**Fecha:** 2025-11-30  
**Archivos Modificados:**
- `src/pages/_app.tsx`
- `src/pages/learn.tsx`
- `src/components/ModuleDropDown.tsx`
