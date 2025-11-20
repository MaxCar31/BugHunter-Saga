/**
 * Tipos para módulos educativos
 */

// ==================== MODULE ====================

/**
 * Configuración UI del módulo
 */
export interface ModuleUIConfig {
    backgroundColor: string;
    color: string;
    borderColor?: string;
    icon: string;
    textColor?: string;
}

/**
 * Estructura de un módulo educativo (Response de GET /api/content/modules)
 */
export interface Module {
    id: number;
    code: string;
    name: string;
    shortName: string;
    description: string;
    uiConfig: ModuleUIConfig;
    viewBox?: string; // Para compatibilidad con Flag.tsx
}

/**
 * Módulo con configuración UI tipada para Tailwind
 */
export interface ModuleWithTypedUI extends Omit<Module, 'uiConfig'> {
    uiConfig: {
        backgroundColor: `bg-${string}`;
        color: string;
        borderColor: `border-${string}`;
        icon: string;
        textColor: `text-${string}`;
    };
}
