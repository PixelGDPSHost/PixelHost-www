"use client";
import { Input, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import Turnstile from "react-turnstile";
import { Footer } from "@/components/Components";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [uname, setUName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>(
    undefined,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
      if (token) {
        const formData = new FormData();
        formData.append("cookie", token);

        try {
          const response = await axios.post(
            "https://api.bytenode.cc/user",
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
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      }
    };

    // Only run on the client side
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/panel");
    }
  }, [isAuthenticated, router]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const doReg = async () => {
    try {
      const formData = new FormData();
      formData.append("mail", email);
      formData.append("uname", uname);
      formData.append("name", name);
      formData.append("passwd", password);
      formData.append("CF_TURNSTILE", turnstileToken || "");

      const resp = await axios.post("https://api.bytenode.cc/reg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.status === 200) {
        const respdata = resp.data;
        const respcookie = respdata.session.cookie;

        if (respcookie) {
          Cookies.set("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA", respcookie, {
            expires: 30,
            sameSite: "strict",
          });
          toast.success("Вы успешно вошли!");
          router.push("/panel");
        } else {
          toast.error("Ошибка авторизации.");
        }
      }
    } catch (e) {
      toast.error(
        "Что-то пошло не так. Проверьте правильность пароля и юзернейма.",
      );
    }
  };

  return (
    <main className="dark prekolbg text-foreground">
      <div className="h-[100vh]"></div>
      <div className="stupidcenter logindiv">
        <Input
          isClearable
          type="email"
          label="Почта"
          variant="bordered"
          placeholder="user@bytenode.cc"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-[11px]"
        />
        <Input
          isClearable
          type="text"
          label="Имя"
          variant="bordered"
          placeholder="Влад"
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-[11px]"
        />
        <Input
          isClearable
          type="text"
          label="Юзернейм"
          variant="bordered"
          placeholder="user123123"
          onChange={(e) => setUName(e.target.value)}
          className="w-full mb-[11px]"
        />
        <Input
          label="Пароль"
          variant="bordered"
          placeholder="**************"
          type={isVisible ? "text" : "password"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-[11px]"
        />
        <center>
          <Turnstile
            className="mt-5"
            sitekey="0x4AAAAAAAfTVYopjzxQMTNP"
            onVerify={(token) => setTurnstileToken(token)}
          />
        </center>

        <div className="flex gap-2 mb-[11px]">
          <Button color="primary" className="w-full" onClick={doReg}>
            Зарегистрировать
          </Button>
          <Button
            color="primary"
            className="mb-2 w-full"
            onClick={() => router.push("/panel/login")}
          >
            Вход
          </Button>
        </div>
        <center>
          <p
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/panel/resetpass")}
          >
            Забыл Пароль
          </p>
        </center>
      </div>
      <Footer />
    </main>
  );
}
