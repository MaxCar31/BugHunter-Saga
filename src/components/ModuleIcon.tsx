import type { Module } from "~/utils/modules";

export const ModuleIcon = ({
  module,
  width = 82,
}: {
  module: Module;
  width?: number;
}) => {
  const getModuleIcon = (moduleCode: string) => {
    switch (moduleCode) {
      case "mod-a":
        return (
          <svg width={width} viewBox="0 0 82 66" fill="none">
            <rect width="82" height="66" rx="8" fill="#58cc02"/>
            <text x="41" y="40" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">A</text>
            <text x="41" y="56" textAnchor="middle" fill="white" fontSize="8">EQ</text>
          </svg>
        );
      case "mod-b":
        return (
          <svg width={width} viewBox="0 0 82 66" fill="none">
            <rect width="82" height="66" rx="8" fill="#ce82ff"/>
            <text x="41" y="40" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">B</text>
            <text x="41" y="56" textAnchor="middle" fill="white" fontSize="8">DT</text>
          </svg>
        );
      case "mod-c":
        return (
          <svg width={width} viewBox="0 0 82 66" fill="none">
            <rect width="82" height="66" rx="8" fill="#00cd9c"/>
            <text x="41" y="40" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">C</text>
            <text x="41" y="56" textAnchor="middle" fill="white" fontSize="8">ST</text>
          </svg>
        );
      default:
        return (
          <svg width={width} viewBox="0 0 82 66" fill="none">
            <rect width="82" height="66" rx="8" fill="#999"/>
            <text x="41" y="40" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">?</text>
          </svg>
        );
    }
  };

  return getModuleIcon(module.code);
};
