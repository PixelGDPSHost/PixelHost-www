import * as React from "react";
import { SideBar, BBar } from "@/components/Components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

  return (
    <main className="relative dark prekolbg1 min-h-screen-nav max-h-screen-nav">
      <div className="content flex flex-col items-center min-h-screen-nav max-h-screen-nav">
        <SideBar />
        <div className="w-[341px] h-[231px] bg-black borderr7 flex items-center justify-center text-center p-5">
          <p>Привет, возможно вместо этого текста тут что-то будет</p>
        </div>
      </div>
      <BBar></BBar>
    </main>
  );
}
