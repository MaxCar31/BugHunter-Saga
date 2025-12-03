import type { NextPage } from "next";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { BronzeLeagueSvg } from "~/components/icons/league";
import { EditPencilSvg, SettingsGearSvg } from "~/components/icons/ui";
import { LightningProgressSvg, GemSvg, FireSvg, EmptyFireSvg, BadgeTestMasterSvg, BadgeBugHunterSvg, BadgeQualityInspectorSvg, BadgeTestingGuruSvg, BadgeUnstoppableTesterSvg } from "~/components/icons/gamification";
import { ProfileTimeJoinedSvg, QATesterRobotSvg } from "~/components/icons/profile";
import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserProfile, getUserStats } from "~/services/userService";
import type { UserStatsDTO, BadgeDTO } from "~/types/user";
import dayjs from "dayjs";

const Profile: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStatsDTO | null>(null);
  const [badges, setBadges] = useState<BadgeDTO[]>([]);

  // Feature 1: Cargar el perfil y estadísticas del usuario al montar el componente
  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
      return;
    }

    const loadProfileAndStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Cargar perfil y estadísticas en paralelo
        const [profile, stats] = await Promise.all([
          getUserProfile(),
          getUserStats(),
        ]);

        // Actualizar el store con los datos del perfil
        useBoundStore.setState({
          name: profile.name,
          username: profile.username,
          email: profile.email,
          joinedAt: dayjs(profile.joinedAt),
          lingots: profile.lingots,
          goalXp: profile.dailyXpGoal as 1 | 10 | 20 | 30 | 50,
          soundEffects: profile.soundEffectsEnabled,
        });

        // Guardar estadísticas y badges en el estado local
        setUserStats(stats);
        setBadges(profile.badges || []);

      } catch (err) {
        console.error("Error loading profile:", err);
        setError(err instanceof Error ? err.message : "Error al cargar el perfil");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfileAndStats();
  }, [loggedIn, router]);

  if (isLoading) {
    return (
      <div>
        <ProfileTopBar />
        <LeftBar selectedTab="Perfil" />
        <div className="flex justify-center items-center pt-20 min-h-screen">
          <div className="text-gray-500">Cargando perfil...</div>
        </div>
        <BottomBar selectedTab="Perfil" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ProfileTopBar />
        <LeftBar selectedTab="Perfil" />
        <div className="flex justify-center items-center pt-20 min-h-screen">
          <div className="text-red-500">{error}</div>
        </div>
        <BottomBar selectedTab="Perfil" />
      </div>
    );
  }

  return (
    <div>
      <ProfileTopBar />
      <LeftBar selectedTab="Perfil" />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection />
          {userStats && <ProfileStatsSection stats={userStats} />}
          <ProfileBadgesSection badges={badges} />
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Perfil" />
    </div>
  );
};

const ProfileTopBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <div className="invisible" aria-hidden={true}>
        <SettingsGearSvg />
      </div>
      <span className="text-gray-400">Profile</span>
      <Link href="/settings/account">
        <SettingsGearSvg />
        <span className="sr-only">Settings</span>
      </Link>
    </div>
  );
};

const ProfileTopSection = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const name = useBoundStore((x) => x.name);
  const username = useBoundStore((x) => x.username);
  const joinedAt = useBoundStore((x) => x.joinedAt).format("MMMM YYYY");

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  // Función para generar color consistente basado en el username
  const getAvatarColor = (username: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-teal-500',
      'bg-indigo-500',
    ];

    const charCode = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = charCode % colors.length;

    return colors[index] ?? 'bg-gray-500';
  };

  const avatarColor = getAvatarColor(username);

  return (
    <section className="flex flex-col gap-5 border-b-2 border-gray-200 pb-8">
      <div className="flex flex-row-reverse md:flex-row md:gap-8">
        {/* Avatar: QA Testing Robot */}
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full ${avatarColor} border-4 border-white shadow-lg md:h-44 md:w-44`}
          title={`QA Tester Bot - ${username}`}
        >
          <QATesterRobotSvg />
        </div>
        <div className="flex grow flex-col justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <div className="text-sm text-gray-400">{username}</div>
            </div>
            <div className="flex items-center gap-3">
              <ProfileTimeJoinedSvg />
              <span className="text-gray-500">{`Joined ${joinedAt}`}</span>
            </div>

          </div>
        </div>
        <Link
          href="/settings/account"
          className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
        >
          <EditPencilSvg />
          Edit profile
        </Link>
      </div>
    </section>
  );
};

const ProfileBadgesSection = ({ badges }: { badges: BadgeDTO[] }) => {
  // Mapear itemCode de badges a componente SVG
  const getBadgeSvg = (itemCode: string) => {
    switch (itemCode) {
      case "badge-test-master":
        return <BadgeTestMasterSvg />;
      case "badge-quality-inspector":
        return <BadgeQualityInspectorSvg />;
      case "badge-testing-guru":
        return <BadgeTestingGuruSvg />;
      case "badge-unstoppable-tester":
        return <BadgeUnstoppableTesterSvg />;
      case "badge-bug-hunter":
        return <BadgeBugHunterSvg />;
      default:
        return <span className="text-4xl">🏅</span>;
    }
  };

  return (
    <section className="flex flex-col gap-3">
      {/* Contenedor principal */}
      <div className="rounded-2xl bg-white border-2 border-gray-200">
        {/* Header del contenedor */}
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Badges</h2>
        </div>

        {/* Lista de badges con altura fija y scroll */}
        {badges.length > 0 ? (
          <div className="flex flex-col max-h-[400px] overflow-y-auto">
            {badges.map((badge, index) => (
              <div
                key={badge.itemCode}
                className={`flex items-center p-4 ${index !== badges.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
              >
                {/* Icono del badge SVG 80x80 */}
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
                  {getBadgeSvg(badge.itemCode)}
                </div>

                {/* Información del badge */}
                <div className="flex-1 flex items-start justify-between px-4 min-w-0">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900">{badge.name}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-8 text-center">
            <span className="text-4xl">🏅</span>
            <p className="text-sm font-semibold text-gray-600">No tienes badges todavía</p>
            <p className="text-xs text-gray-500">Completa lecciones para desbloquear badges</p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProfileStatsSection = ({ stats }: { stats: UserStatsDTO }) => {
  // Determinar la liga basándose en el ranking (si existe)
  const getLeagueName = (rank: number | null): string => {
    if (rank === null) return "Sin Liga";
    if (rank <= 10) return "Bronze";
    if (rank <= 50) return "Silver";
    return "Gold";
  };

  const league = getLeagueName(stats.leagueRank);

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Estadísticas</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <LightningProgressSvg size={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{stats.totalXp}</span>
            <span className="text-sm text-gray-400 md:text-base">Total XP</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <div className="flex items-center justify-center w-[35px]">
            {stats.currentStreak > 0 ? <FireSvg /> : <EmptyFireSvg />}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">{stats.currentStreak}</span>
            <span className="text-sm text-gray-400 md:text-base">Racha (días)</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <BronzeLeagueSvg width={25} height={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{league}</span>
            <span className="text-sm text-gray-400 md:text-base">
              Liga actual
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <div className="flex items-center justify-center w-[35px]">
            <GemSvg />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold">{stats.totalLingots}</span>
            <span className="text-sm text-gray-400 md:text-base">Puntos QA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
