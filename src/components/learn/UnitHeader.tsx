import Link from "next/link";
import { GuidebookSvg } from "~/components/icons/lessons";

interface UnitHeaderProps {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
  moduleCode: string;
  // Nuevas props opcionales para mostrar progreso dentro de la unidad
  completedCount?: number;
  totalCount?: number;
}

/**
 * Componente que renderiza el encabezado de cada unidad
 * Incluye el número, descripción y botón de guía
 */
export const UnitHeader: React.FC<UnitHeaderProps> = ({
  unitNumber,
  description,
  backgroundColor,
  borderColor,
  moduleCode,
  completedCount = 0,
  totalCount = 0,
}) => {
  const percentage = totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;

  return (
    <article
      className={`w-full text-white sm:rounded-xl shadow-lg ${backgroundColor}`}
    >
      <header className="flex items-center justify-between gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Unidad {unitNumber}</h2>
          <p className="text-xl opacity-90">{description}</p>
          {/* Barra de progreso por unidad */}
          <div className="mt-2 w-full max-w-lg">
            <div className="flex items-center justify-between gap-3">
              <div className="h-3 w-full grow rounded-full bg-white bg-opacity-20">
                <div
                  className="h-3 rounded-full bg-white"
                  style={{ width: `${percentage}%` }}
                  aria-hidden
                />
              </div>
              <div className="ml-3 text-sm font-bold">
                {percentage}%
              </div>
            </div>
            <div className="mt-1 text-xs opacity-90">{completedCount} / {totalCount} completadas</div>
          </div>
        </div>
        <Link
          href={`/guidebook/${moduleCode}/${unitNumber}`}
          className={`flex items-center gap-3 rounded-2xl border-2 border-b-4 p-3 transition hover:bg-white hover:bg-opacity-20 text-white ${borderColor}`}
        >
          <GuidebookSvg />
          <span className="sr-only font-bold uppercase lg:not-sr-only">
            Guía
          </span>
        </Link>
      </header>
    </article>
  );
};
