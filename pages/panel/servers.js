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
  const [servers, setServers] = useState({
    gdps_servers: [],
    discord_bots: [],
  });

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

            // Fetching server data
            const serverResponse = await axios.post(
              "https://api.bytenode.cc/v1/user/buyed",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            );
            setServers(serverResponse.data);
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
          {servers.gdps_servers.map((server) => (
            <SRVCard
              key={server.id}
              title={server.name}
              oplachen={server.payed}
              status={server.status}
              type="gdps"
            ></SRVCard>
          ))}
          {servers.discord_bots.map((bot) => (
            <SRVCard
              key={bot.id}
              title={bot.name}
              oplachen={bot.payed}
              status={bot.status}
              type="discord"
            ></SRVCard>
          ))}
        </div>
      </div>
    </main>
  );
}
