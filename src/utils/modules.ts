export type Module = (typeof modules)[number];

const modules = [
  {
    name: "Módulo A – Equivalencia",
    shortName: "Equivalencia",
    description: "Partición de Equivalencia y Valores Límite",
    viewBox: "0 0 82 66", // Icono personalizado para QA
    code: "mod-a",
    color: "#58cc02", // Verde para módulo A
    backgroundColor: "bg-[#58cc02]",
    textColor: "text-[#58cc02]",
    borderColor: "border-[#46a302]",
  },
  {
    name: "Módulo B – Decisión", 
    shortName: "Decisión",
    description: "Tablas de Decisión",
    viewBox: "0 66 82 66",
    code: "mod-b",
    color: "#ce82ff", // Morado para módulo B
    backgroundColor: "bg-[#ce82ff]",
    textColor: "text-[#ce82ff]", 
    borderColor: "border-[#a568cc]",
  },
  {
    name: "Módulo C – Sentencia",
    shortName: "Sentencia", 
    description: "Pruebas de Sentencia",
    viewBox: "0 132 82 66",
    code: "mod-c",
    color: "#00cd9c", // Azul verdoso para módulo C
    backgroundColor: "bg-[#00cd9c]",
    textColor: "text-[#00cd9c]",
    borderColor: "border-[#00a47d]",
  },
] as const;

export default modules;
