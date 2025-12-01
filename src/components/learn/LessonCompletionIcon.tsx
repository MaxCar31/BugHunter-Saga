import {
  LessonCompletionSvg0,
  LessonCompletionSvg1,
  LessonCompletionSvg2,
  LessonCompletionSvg3,
} from "~/components/icons/lessons";

type TileStatus = "LOCKED" | "ACTIVE" | "COMPLETE";

interface LessonCompletionIconProps {
  lessonsCompleted: number;
  status: TileStatus;
  style?: React.HTMLAttributes<SVGElement>["style"];
}

/**
 * Componente que muestra el progreso de lecciones completadas
 * Renderiza diferentes SVGs según el número de lecciones completadas (módulo 4)
 */
export const LessonCompletionIcon: React.FC<LessonCompletionIconProps> = ({
  lessonsCompleted,
  status,
  style = {},
}) => {
  if (status !== "ACTIVE") {
    return null;
  }

  switch (lessonsCompleted % 4) {
    case 0:
      return <LessonCompletionSvg0 style={style} />;
    case 1:
      return <LessonCompletionSvg1 style={style} />;
    case 2:
      return <LessonCompletionSvg2 style={style} />;
    case 3:
      return <LessonCompletionSvg3 style={style} />;
    default:
      return null;
  }
};
