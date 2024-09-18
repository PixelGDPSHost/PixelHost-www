"use client";
import { useEffect } from "react";
import good from "@/public/icons8-cancel-512.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkCookie();
  }, []);

  const gotoLogin = () => {
    router.push("/panel/login");
  };

  const checkCookie = () => {
    if (Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA") === undefined) {
      gotoLogin();
    }
  };

  return (
    <main className="dark text-foreground h-[100vh]">
      <center className="stupidcenter">
        <Image src={good} alt="Bad" width="256" height="256" />
        <h1 className="text-4xl">Отмена</h1>
        <p>Оплата была отменена.</p>
        <Button
          color="primary"
          className="mt-2"
          onClick={() => router.push("/panel/")}
        >
          Назад в панель
        </Button>
      </center>
    </main>
  );
}
