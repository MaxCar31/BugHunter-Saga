import dayjs from "dayjs";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type UserSlice = {
  name: string;
  username: string;
  email: string;
  joinedAt: dayjs.Dayjs;
  loggedIn: boolean;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setJoinedAt: (joinedAt: dayjs.Dayjs) => void;
  logIn: () => void;
  logOut: () => void;
};

// Cargar estado de usuario desde sessionStorage
const getInitialUserState = () => {
  if (typeof window === "undefined") {
    return {
      name: "",
      username: "",
      email: "",
      joinedAt: dayjs(),
      loggedIn: false,
    };
  }

  const token = sessionStorage.getItem("bh_token");
  const name = sessionStorage.getItem("bh_name") || "";
  const username = sessionStorage.getItem("bh_username") || "";
  const email = sessionStorage.getItem("bh_email") || "";
  const joinedAtStr = sessionStorage.getItem("bh_joinedAt");

  return {
    name,
    username,
    email,
    joinedAt: joinedAtStr ? dayjs(joinedAtStr) : dayjs(),
    loggedIn: !!token,
  };
};

export const createUserSlice: BoundStateCreator<UserSlice> = (set) => ({
  ...getInitialUserState(),
  setName: (name: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bh_name", name);
    }
    set(() => ({ name }));
  },
  setUsername: (username: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bh_username", username);
    }
    set(() => ({ username }));
  },
  setEmail: (email: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bh_email", email);
    }
    set(() => ({ email }));
  },
  setJoinedAt: (joinedAt: dayjs.Dayjs) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bh_joinedAt", joinedAt.toISOString());
    }
    set(() => ({ joinedAt }));
  },
  logIn: () => {
    set(() => ({ loggedIn: true }));
  },
  logOut: () => {
    // Limpiar todo el sessionStorage al hacer logout
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("bh_token");
      sessionStorage.removeItem("bh_name");
      sessionStorage.removeItem("bh_username");
      sessionStorage.removeItem("bh_email");
      sessionStorage.removeItem("bh_joinedAt");
      sessionStorage.removeItem("bh_lingots");
      sessionStorage.removeItem("bh_module");
    }
    set(() => ({
      loggedIn: false,
      name: "",
      username: "",
      email: "",
      joinedAt: dayjs(),
    }));
  },
});
