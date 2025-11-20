import type { ModuleWithTypedUI } from "~/types/module";

export const ModuleIcon = ({
  module,
  width = 82,
}: {
  module: ModuleWithTypedUI | null;
  width?: number;
}) => {
  const getModuleIcon = (moduleCode: string) => {
    const height = Math.round((width * 66) / 82); // Maintain 82:66 aspect ratio

    switch (moduleCode) {
      case "moduleA":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/ModuloA.png"
            alt="Module A"
            width={width}
            height={height}
            style={{ borderRadius: "8px" }}
          />
        );
      case "moduleB":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/ModuloB.png"
            alt="Module B"
            width={width}
            height={height}
            style={{ borderRadius: "8px" }}
          />
        );
      case "moduleC":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/ModuloC.png"
            alt="Module C"
            width={width}
            height={height}
            style={{ borderRadius: "8px" }}
          />
        );
      default:
        return (
          <svg width={width} viewBox="0 0 82 66" fill="none">
            <rect width="82" height="66" rx="8" fill="#999" />
            <text
              x="41"
              y="40"
              textAnchor="middle"
              fill="white"
              fontSize="24"
              fontWeight="bold"
            >
              ?
            </text>
          </svg>
        );
    }
  };

  if (!module) {
    const height = Math.round((width * 66) / 82);
    return (
      <svg width={width} viewBox="0 0 82 66" fill="none">
        <rect width="82" height="66" rx="8" fill="#999" />
        <text
          x="41"
          y="40"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
        >
          ?
        </text>
      </svg>
    );
  }

  return getModuleIcon(module.code);
};