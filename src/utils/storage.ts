/**
 * 🔍 Explicación:
 * Módulo centralizado para acceso al storage.
 * 
 * ✅ Usa sessionStorage en lugar de localStorage
 * ✅ Los datos se limpian automáticamente al cerrar el navegador
 * ✅ Previene persistencia entre sesiones diferentes
 * ✅ Fácil de cambiar en el futuro (un solo lugar)
 * 
 * Uso:
 * - storage.getItem('key') - Obtener valor
 * - storage.setItem('key', 'value') - Guardar valor
 * - storage.removeItem('key') - Eliminar valor
 */

// Usar sessionStorage para que los datos se limpien al cerrar el navegador
const storage = typeof window !== 'undefined' ? sessionStorage : null;

export const storageHelper = {
    getItem: (key: string): string | null => {
        if (!storage) return null;
        return storage.getItem(key);
    },

    setItem: (key: string, value: string): void => {
        if (!storage) return;
        storage.setItem(key, value);
    },

    removeItem: (key: string): void => {
        if (!storage) return;
        storage.removeItem(key);
    },

    clear: (): void => {
        if (!storage) return;
        storage.clear();
    },
};
