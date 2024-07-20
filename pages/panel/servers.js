import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pezda4 from "@/public/Add.png";
import pezda5 from "@/public/Rectangle 186.png";
import { SRVCard, SideBar } from "@/components/Components";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function MyComponent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authCookie = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
      if (authCookie) {
        try {
          const formData = new FormData();
          formData.append("cookie", authCookie);

          const response = await axios.post(
            "https://api.bytenode.cc/v1/user",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          const { data } = response;
          if (
            data.user &&
            data.user.id &&
            data.user.mail &&
            data.user.uname &&
            data.user.name &&
            data.user.avatar
          ) {
            setIsAuthenticated(true);
            if (router.pathname === "/panel/login") {
              router.push("/panel");
            }
          } else {
            if (
              router.pathname.startsWith("/panel") &&
              router.pathname !== "/panel/login"
            ) {
              router.push("/panel/login");
            }
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          if (
            router.pathname.startsWith("/panel") &&
            router.pathname !== "/panel/login"
          ) {
            router.push("/panel/login");
          }
        }
      } else {
        router.push("/panel/login");
      }
    };

    checkAuth();
  }, [router]);

  const gotoMain = () => {
    router.push("/panel");
  };

  const gotoSrvs = () => {
    router.push("/panel/servers");
  };

  return (
    <main className="relative dark prekolbg1">
      <SideBar></SideBar>
      <div className="srvs flex text-center justify-center content-center items-center flex-col">
        <div className="flex items-center mb-[40px] mt-[106.96px]">
          <p className="text-[1.2rem] font-bold">Мои сервера</p>
          <Image
            src={pezda4}
            alt="add"
            width="30"
            height="30"
            className="w-[30px] h-[30px] ml-[10px] cursor-pointer"
          />
        </div>
        <div className="flexo gap-4">
          <SRVCard
            title="фуфля"
            oplachen="14.11.2024"
            status="Посхалко джокер 1488"
          ></SRVCard>
          <SRVCard
            title="PixelMine"
            oplachen="10.11.2024"
            status="Устанавливается"
            type="mc"
          ></SRVCard>
          <SRVCard
            title="PixelDash"
            oplachen="20.08.2024"
            status="Установлен"
            type="gdps"
          ></SRVCard>
          <SRVCard
            title="ByteNode BOT"
            oplachen="25.07.2024"
            status="Установлен"
            type="discord"
          ></SRVCard>
        </div>
      </div>
    </main>
  );
}
