"use client";

import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cd from "@/public/CheckDollar.png";
import sm from "@/public/SplitMoney.png";
import { SRVCard, SideBar, AvatarinProfile } from "@/components/Components";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Card, CardHeader } from "@nextui-org/react";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const gotoMain = () => {
    router.push("/panel");
  };

  const gotoSrvs = () => {
    router.push("/panel/servers");
  };

  return (
    <main className="relative dark prekolbg1">
      <SideBar></SideBar>
      <div className="flex flex-col justify-center content-center items-center">
        <div className="bg-black min-w-[330px] max-w-[330px] mt-[106.96px] p-[10px] rounded-t-large rounded-b-large text-center">
          <h1 className="text-[1.3rem] font-bold">Настройки</h1>
          <p className="mt-3 flex items-center content-center justify-center">
            Аккаунт: <AvatarinProfile className="nonavflex" />
            kidumka
          </p>
          <div className="flex flex-col">
            <Button color="primary" className="mt-3">
              Изменить Пароль
            </Button>
            <Button color="primary" className="mt-3">
              Включить 2FA
            </Button>
            <Button color="primary" className="mt-3">
              Изменить Фото профиля
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
