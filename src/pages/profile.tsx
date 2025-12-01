import type { NextPage } from "next";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { BronzeLeagueSvg } from "~/components/icons/league";
import { EditPencilSvg, SettingsGearSvg } from "~/components/icons/ui";
import { LightningProgressSvg, GemSvg } from "~/components/icons/gamification";
import { ProfileTimeJoinedSvg } from "~/components/icons/profile";
import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserProfile } from "~/services/userService";
import dayjs from "dayjs";

const Profile: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Feature 1: Cargar el perfil del usuario al montar el componente
  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
      return;
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const profile = await getUserProfile();

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

      } catch (err) {
        console.error("Error loading profile:", err);
        setError(err instanceof Error ? err.message : "Error al cargar el perfil");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
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
          <ProfileStatsSection />
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Perfil" />
    </div>
  );
};

export default Profile;

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

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
        {username.charAt(0).toUpperCase()}
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
    </section>
  );
};

const ProfileStatsSection = () => {
  const lingots = useBoundStore((x) => x.lingots);
  const totalXp = 125;
  const league = "Bronze";

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Statistics</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <LightningProgressSvg size={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{totalXp}</span>
            <span className="text-sm text-gray-400 md:text-base">Total XP</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <BronzeLeagueSvg width={25} height={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{league}</span>
            <span className="text-sm text-gray-400 md:text-base">
              Current league
            </span>
          </div>
        </div>
        <div className="col-span-2 flex gap-3 rounded-2xl border-2 border-[#f2a445] bg-[#fff7e6] p-3 md:gap-4 md:px-6 md:py-5">
          <GemSvg />
          <div className="flex flex-col justify-center gap-0.5">
            <span className="text-2xl font-bold text-[#f2a445] md:text-3xl">{lingots}</span>
            <span className="text-sm font-medium text-gray-600 md:text-base">Puntos QA</span>
          </div>
        </div>
      </div>
    </section>
  );
};
