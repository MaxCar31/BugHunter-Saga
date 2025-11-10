# 📖 Ejemplos de Uso - Fase 5: Gestión de Perfil

Este documento proporciona ejemplos prácticos de cómo usar las funcionalidades implementadas en la Fase 5.

---

## 🎯 Tabla de Contenidos

1. [Obtener Perfil del Usuario](#1-obtener-perfil-del-usuario)
2. [Actualizar Cuenta](#2-actualizar-cuenta)
3. [Actualizar Configuraciones](#3-actualizar-configuraciones)
4. [Manejo de Errores](#4-manejo-de-errores)
5. [Integración con Zustand](#5-integración-con-zustand)

---

## 1. Obtener Perfil del Usuario

### Ejemplo Básico

```tsx
import { getUserProfile } from "~/services/userService";
import { useBoundStore } from "~/hooks/useBoundStore";
import dayjs from "dayjs";

function ProfileComponent() {
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile();
        
        // Actualizar el store
        useBoundStore.setState({
          name: profile.name,
          username: profile.username,
          email: profile.email,
          joinedAt: dayjs(profile.joinedAt),
          lingots: profile.lingots,
          goalXp: profile.dailyXpGoal as 1 | 10 | 20 | 30 | 50,
          soundEffects: profile.soundEffectsEnabled,
        });
        
        console.log("Perfil cargado:", profile);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    
    loadProfile();
  }, []);
}
```

### Ejemplo con Estado de Carga

```tsx
function ProfileComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfileDTO | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getUserProfile();
        setProfile(data);
        
        // Actualizar store...
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfile();
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return null;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>@{profile.username}</p>
      <p>{profile.email}</p>
    </div>
  );
}
```

---

## 2. Actualizar Cuenta

### Ejemplo: Actualizar Nombre y Username

```tsx
import { updateUserAccount } from "~/services/userService";
import { useBoundStore } from "~/hooks/useBoundStore";

function AccountSettingsComponent() {
  const name = useBoundStore((x) => x.name);
  const username = useBoundStore((x) => x.username);
  const setName = useBoundStore((x) => x.setName);
  const setUsername = useBoundStore((x) => x.setUsername);
  
  const [localName, setLocalName] = useState(name);
  const [localUsername, setLocalUsername] = useState(username);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const updated = await updateUserAccount({
        name: localName,
        username: localUsername,
      });
      
      // Actualizar el store global
      setName(updated.name);
      setUsername(updated.username);
      
      alert("¡Cambios guardados!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        disabled={isLoading}
      />
      <input 
        value={localUsername}
        onChange={(e) => setLocalUsername(e.target.value)}
        disabled={isLoading}
      />
      <button 
        onClick={handleSave}
        disabled={isLoading || (name === localName && username === localUsername)}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </div>
  );
}
```

### Ejemplo: Solo Actualizar Username

```tsx
async function updateOnlyUsername(newUsername: string) {
  try {
    const updated = await updateUserAccount({
      username: newUsername,
      // No enviamos 'name', solo se actualiza username
    });
    
    console.log("Username actualizado a:", updated.username);
    return updated;
  } catch (error) {
    console.error("Error al actualizar username:", error);
    throw error;
  }
}
```

---

## 3. Actualizar Configuraciones

### Ejemplo: Cambiar Meta Diaria de XP

```tsx
import { updateUserSettings } from "~/services/userService";

function DailyGoalComponent() {
  const [selectedGoal, setSelectedGoal] = useState<1 | 10 | 20 | 30 | 50>(10);

  const handleSave = async () => {
    try {
      const updated = await updateUserSettings({
        dailyXpGoal: selectedGoal,
      });
      
      // Actualizar store
      useBoundStore.setState({
        goalXp: updated.dailyXpGoal as 1 | 10 | 20 | 30 | 50,
      });
      
      console.log("Meta actualizada a:", updated.dailyXpGoal);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <select value={selectedGoal} onChange={(e) => setSelectedGoal(Number(e.target.value) as any)}>
        <option value={1}>Basic (1 XP)</option>
        <option value={10}>Casual (10 XP)</option>
        <option value={20}>Regular (20 XP)</option>
        <option value={30}>Serious (30 XP)</option>
        <option value={50}>Intense (50 XP)</option>
      </select>
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}
```

### Ejemplo: Activar/Desactivar Sonidos

```tsx
function SoundSettingsComponent() {
  const [soundEffects, setSoundEffects] = useState(true);

  const handleToggle = async () => {
    const newValue = !soundEffects;
    
    try {
      const updated = await updateUserSettings({
        soundEffectsEnabled: newValue,
      });
      
      setSoundEffects(updated.soundEffectsEnabled);
      
      // Actualizar store
      useBoundStore.setState({
        soundEffects: updated.soundEffectsEnabled,
      });
      
      console.log("Sonidos:", updated.soundEffectsEnabled ? "ON" : "OFF");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <label>
        <input 
          type="checkbox"
          checked={soundEffects}
          onChange={handleToggle}
        />
        Sound Effects
      </label>
    </div>
  );
}
```

### Ejemplo: Actualizar Múltiples Configuraciones

```tsx
async function updateAllSettings() {
  try {
    const updated = await updateUserSettings({
      dailyXpGoal: 30,
      soundEffectsEnabled: true,
      speakingExercises: false,
      listeningExercises: true,
    });
    
    // Actualizar todo el store de una vez
    useBoundStore.setState({
      goalXp: updated.dailyXpGoal as 1 | 10 | 20 | 30 | 50,
      soundEffects: updated.soundEffectsEnabled,
      // speakingExercises y listeningExercises se actualizan aparte
    });
    
    console.log("Todas las configuraciones actualizadas");
  } catch (error) {
    console.error("Error:", error);
  }
}
```

---

## 4. Manejo de Errores

### Ejemplo: Capturar Error de Username Duplicado

```tsx
async function handleUpdateUsername(newUsername: string) {
  try {
    await updateUserAccount({ username: newUsername });
    alert("Username actualizado exitosamente");
  } catch (error) {
    if (error.message.includes("already taken")) {
      alert("Este username ya está en uso. Por favor elige otro.");
    } else if (error.message.includes("autenticado")) {
      alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
      // Redirigir a login
      router.push("/");
    } else {
      alert("Error inesperado: " + error.message);
    }
  }
}
```

### Ejemplo: Reintentar en Caso de Error

```tsx
async function updateWithRetry(maxRetries = 3) {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const updated = await updateUserAccount({
        name: "Nuevo Nombre",
      });
      
      console.log("Actualizado en el intento", attempt + 1);
      return updated;
    } catch (error) {
      attempt++;
      
      if (attempt >= maxRetries) {
        console.error("Falló después de", maxRetries, "intentos");
        throw error;
      }
      
      console.log("Reintentando...", attempt);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1s
    }
  }
}
```

---

## 5. Integración con Zustand

### Ejemplo: Sincronizar Todo el Perfil con el Store

```tsx
import { getUserProfile } from "~/services/userService";
import { useBoundStore } from "~/hooks/useBoundStore";
import dayjs from "dayjs";

async function syncProfileWithStore() {
  try {
    const profile = await getUserProfile();
    
    // Actualizar todo el store de una vez
    useBoundStore.setState({
      // User data
      name: profile.name,
      username: profile.username,
      email: profile.email,
      joinedAt: dayjs(profile.joinedAt),
      loggedIn: true,
      
      // Gamification data
      lingots: profile.lingots,
      goalXp: profile.dailyXpGoal as 1 | 10 | 20 | 30 | 50,
      
      // Settings
      soundEffects: profile.soundEffectsEnabled,
    });
    
    console.log("Store sincronizado con el perfil del servidor");
  } catch (error) {
    console.error("Error sincronizando:", error);
  }
}
```

### Ejemplo: Hook Personalizado para Gestión de Perfil

```tsx
import { useState, useEffect } from "react";
import { getUserProfile, updateUserAccount } from "~/services/userService";
import { useBoundStore } from "~/hooks/useBoundStore";

function useUserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const name = useBoundStore((x) => x.name);
  const username = useBoundStore((x) => x.username);
  const email = useBoundStore((x) => x.email);
  
  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const profile = await getUserProfile();
      
      useBoundStore.setState({
        name: profile.name,
        username: profile.username,
        email: profile.email,
        // ... más campos
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (data: { name?: string; username?: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updated = await updateUserAccount(data);
      
      useBoundStore.setState({
        name: updated.name,
        username: updated.username,
      });
      
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    // Data
    name,
    username,
    email,
    
    // State
    isLoading,
    error,
    
    // Actions
    loadProfile,
    updateProfile,
  };
}

// Uso:
function MyComponent() {
  const { name, username, isLoading, loadProfile, updateProfile } = useUserProfile();
  
  useEffect(() => {
    loadProfile();
  }, []);
  
  const handleUpdate = () => {
    updateProfile({ name: "Nuevo Nombre" });
  };
  
  return <div>{name}</div>;
}
```

---

## 🔧 Tips y Mejores Prácticas

### 1. Siempre Validar Antes de Enviar

```tsx
function validateUsername(username: string): boolean {
  if (username.length < 3) {
    alert("Username debe tener al menos 3 caracteres");
    return false;
  }
  
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
    alert("Username solo puede contener letras, números, puntos, guiones y guiones bajos");
    return false;
  }
  
  return true;
}

async function safeUpdateUsername(newUsername: string) {
  if (!validateUsername(newUsername)) return;
  
  try {
    await updateUserAccount({ username: newUsername });
  } catch (error) {
    console.error(error);
  }
}
```

### 2. Usar Estados de Carga

```tsx
function FormWithLoading() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <button 
      onClick={handleSave}
      disabled={isLoading}
    >
      {isLoading ? "Guardando..." : "Guardar"}
    </button>
  );
}
```

### 3. Mostrar Feedback al Usuario

```tsx
function FormWithFeedback() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleSave = async () => {
    try {
      await updateUserAccount({ name: "Nuevo" });
      setSuccessMessage("¡Guardado exitosamente!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };
  
  return (
    <div>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}
```

---

## 📝 Notas Finales

- Siempre maneja errores con `try/catch`
- Muestra estados de carga al usuario
- Valida datos antes de enviarlos al servidor
- Sincroniza el store de Zustand después de cada operación exitosa
- Usa TypeScript para aprovechar el tipado fuerte

---

**¿Necesitas más ejemplos?** Consulta el código fuente en:
- `src/services/userService.ts`
- `src/pages/settings/account.tsx`
- `src/pages/settings/coach.tsx`
- `src/pages/settings/sound.tsx`
