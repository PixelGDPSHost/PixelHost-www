import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pezda4 from "@/public/Add.png";
import pezda5 from "@/public/Rectangle 186.png";
import { SRVCard, SideBar } from "@/components/Components";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface Server {
  id: string;
  name: string;
  payed: boolean;
  status: string;
}

interface ServersData {
  gdps_servers: Server[];
  discord_bots: Server[];
}

export default function MyComponent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [servers, setServers] = useState<ServersData>({
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
    <main className="relative dark prekolbg1 min-h-screen-nav max-h-screen-nav">
      <SideBar />
      <div className="content flex flex-col items-center min-h-screen-nav max-h-screen-nav">
        <div className="flex items-center mb-[40px]">
          <p className="text-[1.2rem] font-bold">Мои сервера</p>
          <Image
            src={pezda4}
            alt="add"
            width={30}
            height={30}
            className="w-[30px] h-[30px] ml-[10px] cursor-pointer"
          />
        </div>
        <div className="flexo gap-4">
          {servers.gdps_servers.map((server) => (
            <SRVCard
              key={server.id}
              title={server.name}
              oplachen={server.payed.toString()} // Convert boolean to string
              status={server.status}
              type="gdps"
            />
          ))}
          {servers.discord_bots.map((bot) => (
            <SRVCard
              key={bot.id}
              title={bot.name}
              oplachen={bot.payed.toString()} // Convert boolean to string
              status={bot.status}
              type="discord"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
