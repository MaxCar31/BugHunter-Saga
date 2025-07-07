import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";

type BottomBarItem = {
  name: Tab;
  href: string;
  icon: JSX.Element;
};

export type Tab = "Aprender" | "Tienda" | "Perfil" | "Clasificaciones";

export const useBottomBarItems = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);

  const bottomBarItems: BottomBarItem[] = [
    {
      name: "Aprender",
      href: "/learn",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="h-[50px] w-[50px]"
        >
          <path
            d="M6 4C6 2.89543 6.89543 2 8 2H24C25.1046 2 26 2.89543 26 4V28C26 29.1046 25.1046 30 24 30H8C6.89543 30 6 29.1046 6 28V4Z"
            fill="#4F46E5"
          />
          <path
            d="M9 6H23V8H9V6Z"
            fill="white"
          />
          <path
            d="M9 10H23V12H9V10Z"
            fill="white"
          />
          <path
            d="M9 14H20V16H9V14Z"
            fill="white"
          />
          <path
            d="M9 18H18V20H9V18Z"
            fill="white"
          />
          <path
            d="M9 22H21V24H9V22Z"
            fill="white"
          />
          <path
            d="M4 6C4 4.89543 4.89543 4 6 4V28C4.89543 28 4 27.1046 4 26V6Z"
            fill="#312E81"
          />
        </svg>
      ),
    },
    // {
    //   name: "Tienda",
    //   href: "/shop",
    //   icon: (
    //     <svg
    //       width="46"
    //       height="46"
    //       viewBox="0 0 46 46"
    //       fill="none"
    //       className="h-[50px] w-[50px]"
    //     >
    //       <path
    //         d="M40 36V17H6V36C6 38.2091 7.73969 40 9.88571 40H36.1143C38.2603 40 40 38.2091 40 36Z"
    //         fill="#A56644"
    //       />
    //       <path d="M4 10C4 7.79086 5.79086 6 8 6H17V17H4V10Z" fill="#EA2B2B" />
    //       <path
    //         d="M4 17H17V17.5C17 21.0899 14.0899 24 10.5 24C6.91015 24 4 21.0899 4 17.5V17Z"
    //         fill="#FF4945"
    //       />
    //       <path
    //         d="M17 17H29V17.5C29 21.0899 26.3137 24 23 24C19.6863 24 17 21.0899 17 17.5V17Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M29 17H42V17.5C42 21.0899 39.0899 24 35.5 24C31.9101 24 29 21.0899 29 17.5V17Z"
    //         fill="#FF4945"
    //       />
    //       <path d="M17 6H29V17H17V6Z" fill="#D0D0D0" />
    //       <path
    //         d="M29 6H38C40.2091 6 42 7.79086 42 10V17H29V6Z"
    //         fill="#EA2B2B"
    //       />
    //       <path
    //         d="M11 30C11 28.8954 11.8954 28 13 28H18C19.1046 28 20 28.8954 20 30V40H11V30Z"
    //         fill="#B9E8FF"
    //       />
    //       <path
    //         d="M24 30C24 28.8954 24.8954 28 26 28H34C35.1046 28 36 28.8954 36 30V34C36 35.1046 35.1046 36 34 36H26C24.8954 36 24 35.1046 24 34V30Z"
    //         fill="#B9E8FF"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Perfil",
      href: loggedIn ? "/profile" : "/learn?sign-up",
      icon: (
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          className="h-[50px] w-[50px]"
        >
          <circle
            cx="23"
            cy="14"
            r="8"
            fill="#6B7280"
          />
          <path
            d="M7 38C7 30.268 13.268 24 21 24H25C32.732 24 39 30.268 39 38V40C39 41.1046 38.1046 42 37 42H9C7.89543 42 7 41.1046 7 40V38Z"
            fill="#6B7280"
          />
        </svg>
      ),
    },
  ];

  // if (loggedIn) {
  //   bottomBarItems.splice(1, 0, {
  //     name: "Clasificaciones",
  //     href: "/leaderboard",
  //     icon: (
  //       <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
  //         <path
  //           d="M7 9.5C7 7.84314 8.34315 6.5 10 6.5H36C37.6569 6.5 39 7.84315 39 9.5V23.5C39 32.3366 31.8366 39.5 23 39.5C14.1634 39.5 7 32.3366 7 23.5V9.5Z"
  //           fill="#FEC701"
  //         />
  //         <path
  //           opacity="0.3"
  //           d="M39.0001 13.3455V9.5C39.0001 7.84315 37.657 6.5 36.0001 6.5H31.5706L8.30957 29.8497C9.68623 33.0304 12.0656 35.6759 15.0491 37.3877L39.0001 13.3455Z"
  //           fill="white"
  //         />
  //       </svg>
  //     ),
  //   });
  // }

  return bottomBarItems;
};

export const BottomBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const bottomBarItems = useBottomBarItems();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t-2 border-[#e5e5e5] bg-white md:hidden">
      <ul className="flex h-[88px]">
        {bottomBarItems.map((item) => {
          return (
            <li
              key={item.href}
              className="flex flex-1 items-center justify-center"
            >
              <Link
                href={item.href}
                className={
                  item.name === selectedTab
                    ? "rounded-xl border-2 border-[#84d8ff] bg-[#ddf4ff] px-2 py-1"
                    : "px-2 py-1"
                }
              >
                {item.icon}
                <span className="sr-only">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
