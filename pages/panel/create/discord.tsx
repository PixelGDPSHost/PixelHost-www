import * as React from "react";
import { SideBar, BBar } from "@/components/Components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {Spinner} from "@nextui-org/spinner";
import { Bounce, toast } from "react-toastify";
import good from "@/public/icons8-cancel-512.png";
import Image from "next/image";

export default function CreateDiscord() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { plan, name } = router.query;

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

  if (name == null || name == "" || plan == null || plan == "") {
    return (
      <main className="relative dark prekolbg1 min-h-screen-nav max-h-screen-nav">
          <div className="content flex flex-col items-center min-h-screen-nav max-h-screen-nav">
              <Image src={good} alt="Bad" width="256" height="256" />
              <h1 className="text-xl">Вы не указали имя или тариф!</h1>
          </div>
      </main>
    )
  }
    return (
        <main className="relative dark prekolbg1 min-h-screen-nav max-h-screen-nav">
            <div className="content flex flex-col items-center min-h-screen-nav max-h-screen-nav">
                <Spinner size="lg"/>
                <h1 className="text-xl">Подождите, создаем бота с тарифом {plan} и названием {name}</h1>
            </div>
        </main>
    )
}