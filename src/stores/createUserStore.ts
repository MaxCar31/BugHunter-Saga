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

// Cargar estado de usuario desde localStorage
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

  const token = localStorage.getItem("bh_token");
  const name = localStorage.getItem("bh_name") || "";
  const username = localStorage.getItem("bh_username") || "";
  const email = localStorage.getItem("bh_email") || "";
  const joinedAtStr = localStorage.getItem("bh_joinedAt");

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
      localStorage.setItem("bh_name", name);
    }
    set(() => ({ name }));
  },
  setUsername: (username: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bh_username", username);
    }
    set(() => ({ username }));
  },
  setEmail: (email: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bh_email", email);
    }
    set(() => ({ email }));
  },
  setJoinedAt: (joinedAt: dayjs.Dayjs) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bh_joinedAt", joinedAt.toISOString());
    }
    set(() => ({ joinedAt }));
  },
  logIn: () => {
    set(() => ({ loggedIn: true }));
  },
  logOut: () => {
    // Limpiar todo el localStorage al hacer logout
    if (typeof window !== "undefined") {
      localStorage.removeItem("bh_token");
      localStorage.removeItem("bh_name");
      localStorage.removeItem("bh_username");
      localStorage.removeItem("bh_email");
      localStorage.removeItem("bh_joinedAt");
      localStorage.removeItem("bh_lingots");
      localStorage.removeItem("bh_module");
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
