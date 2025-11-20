# Restricción de avance por nota

Se añadió la lógica para que una lección solo se considere "completada" y permita avanzar a la siguiente actividad si la nota del estudiante es mayor a 70.

Resumen de cambios realizados:

- `src/stores/createLessonStore.ts`

  - Nuevo campo `lessonScoresByModule: Record<string, Record<number, number>>`.
  - `markLessonAsCompleted(moduleCode, lessonId, score?)` ahora guarda la nota (si no se pasa, asume 100 para compatibilidad).
  - `isLessonCompleted` y `getCompletedLessons` consideran una lección aprobada solo si `score > 70`.

- `src/pages/lesson.tsx`
  - En el flujo `LessonComplete`, se calcula la nota como porcentaje de aciertos: `Math.round((correct / total) * 100)`.
  - Se llama a `markLessonAsCompleted(currentModule.code, lessonId, score)` para guardar la nota en el store.

Notas de implementación:

- Cambio retrocompatible: si el backend o llamadas previas usan `markLessonAsCompleted` sin score, la función guardará `100` para mantener el comportamiento anterior.
- El bloqueo de avance se calcula en `src/pages/learn.tsx` usando `getCompletedLessons(moduleCode)` que ahora solo incluye las lecciones con score > 70.

Estado actual:

- Lógica funcional implementada y conectada en frontend.
- Quedan advertencias de lint/TypeScript en varios archivos del proyecto (imports/vars sin usar y reglas de promesas) que NO afectan la lógica de la restricción de nota, pero se recomienda limpiar para que la compilación `next build` pase sin errores.

Siguientes pasos recomendados:

1. Limpiar errores de lint restantes (quitar imports/vars no usados, arreglar promesas no esperadas y añadir tipos donde hay `any`).
2. (Opcional) Hacer que el backend envíe y almacene las notas por lección en la API para sincronizar con el store.

### Contrato esperado del backend

La petición que envía el frontend para marcar la lección como completada es:

POST /api/progress/lesson

Body JSON esperado:

{
"lessonId": number,
"correctAnswerCount": number,
"incorrectAnswerCount": number,
"score": number, // entero 0-100 (opcional en v1, recomendado)
"timeTakenMs": number,
"isPractice": boolean
}

Respuesta esperada (HTTP 200):
{
"xpEarned": number,
"lingotsEarned": number,
"newTotalLingots": number,
"newStreak": number
}

Si el backend no retorna `score` o no soporta esta propiedad, el frontend seguirá guardando la nota localmente en el store; sin embargo recomendamos que el backend almacene y retorne la nota para mantener la progresión sincronizada entre dispositivos.

Fecha: 16 de noviembre de 2025
Autor: Equipo Frontend
