"use client";

import * as React from "react";
import { useRouter } from "next/router";
import { SRVCard, SideBar, AvatarinProfile } from "@/components/Components";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyComponent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

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
            setUsername(data.user.uname);
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const authCookie = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
    const formData = new FormData();
    formData.append("cookie", authCookie!);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://api.bytenode.cc/v1/user/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        toast.success("Фото профиля успешно изменено!");
      } else {
        toast.error("Не удалось изменить фото профиля.");
      }
    } catch (error) {
      toast.error("Не удалось изменить фото профиля.");
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  return (
    <main className="relative dark prekolbg1">
      <SideBar />
      <div className="flex flex-col justify-center content-center items-center">
        <div className="bg-black min-w-[330px] max-w-[330px] mt-[106.96px] p-[10px] rounded-t-large rounded-b-large text-center">
          <h1 className="text-[1.3rem] font-bold">Настройки</h1>
          <div className="flex text-center items-center justify-center content-center mt-3">
            <p>Аккаунт:</p>
            <AvatarinProfile />
            <p>{username}</p>
          </div>
          <div className="flex flex-col">
            <Button color="primary" className="mt-3">
              Изменить Пароль
            </Button>
            <Button color="primary" className="mt-3">
              Включить 2FA
            </Button>
            <Button color="primary" className="mt-3" onClick={triggerFileInput}>
              Изменить Фото профиля
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
