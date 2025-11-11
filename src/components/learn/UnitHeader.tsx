import Link from "next/link";
import { GuidebookSvg } from "~/components/Svgs";

interface UnitHeaderProps {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
  moduleCode: string;
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
}) => {
  return (
    <article
      className={`max-w-2xl text-white sm:rounded-xl shadow-lg ${backgroundColor}`}
    >
      <header className="flex items-center justify-between gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Unidad {unitNumber}</h2>
          <p className="text-xl opacity-90">{description}</p>
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
