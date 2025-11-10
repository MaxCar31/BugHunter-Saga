/**
 * Utilidades para calcular posiciones de tiles en la UI
 * Maneja el zigzag pattern de las lecciones
 */

// Patrones de posición horizontal para los tiles
const tileLeftClassNames = [
    "left-0",
    "left-[-45px]",
    "left-[-70px]",
    "left-[-45px]",
    "left-0",
    "left-[45px]",
    "left-[70px]",
    "left-[45px]",
] as const;

export type TileLeftClassName = (typeof tileLeftClassNames)[number];

/**
 * Calcula la clase CSS de posición horizontal para un tile
 * Crea un patrón zigzag que alterna entre unidades pares e impares
 */
export const getTileLeftClassName = ({
    index,
    unitNumber,
    tilesLength,
}: {
    index: number;
    unitNumber: number;
    tilesLength: number;
}): TileLeftClassName => {
    if (index >= tilesLength - 1) {
        return "left-0";
    }

    const classNames =
        unitNumber % 2 === 1
            ? tileLeftClassNames
            : [...tileLeftClassNames.slice(4), ...tileLeftClassNames.slice(0, 4)];

    return classNames[index % classNames.length] ?? "left-0";
};

// Offsets para los tooltips de los tiles
const tileTooltipLeftOffsets = [140, 95, 70, 95, 140, 185, 210, 185] as const;

export type TileTooltipLeftOffset = (typeof tileTooltipLeftOffsets)[number];

/**
 * Calcula el offset horizontal para el tooltip de un tile
 * Asegura que el tooltip esté centrado sobre el tile en el patrón zigzag
 */
export const getTileTooltipLeftOffset = ({
    index,
    unitNumber,
    tilesLength,
}: {
    index: number;
    unitNumber: number;
    tilesLength: number;
}): TileTooltipLeftOffset => {
    if (index >= tilesLength - 1) {
        return 140;
    }

    const offsets =
        unitNumber % 2 === 1
            ? tileTooltipLeftOffsets
            : [
                ...tileTooltipLeftOffsets.slice(4),
                ...tileTooltipLeftOffsets.slice(0, 4),
            ];

    return offsets[index % offsets.length] ?? 140;
};
