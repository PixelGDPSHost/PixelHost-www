"use client";
import { useEffect } from "react";
import good from "@/public/icons8-check-512.png";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
        <Image src={good} alt="Good" width="256" height="256" />
        <h1 className="text-4xl">Успешно</h1>
        <p>Оплата прошла успешно! Деньги зачислены на ваш баланс</p>
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
