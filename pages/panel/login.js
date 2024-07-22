"use client";
import { Input, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { useRouter } from "next/router";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Footer } from "@/components/Components";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA");
      if (token) {
        const formData = new FormData();
        formData.append("cookie", token);

        try {
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

  const gotoReset = () => {
    router.push("/panel/resetpass");
  };

  const gotoReg = () => {
    router.push("/panel/register");
  };

  const doLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("uname", email);
      formData.append("passwd", password);

      const response = await axios.post(
        "https://api.bytenode.cc/v1/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        const respdata = response.data;
        const respcookie = respdata.session.cookie;

        if (respcookie === null) {
          toast.error("Не удалось получить cookie");
          return;
        }

        Cookies.set("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA", respcookie, {
          expires: 30,
          sameSite: "strict",
        });
        toast.success("Вы успешно вошли!");
        router.push("/panel");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Неправильный юзернейм или пароль");
      } else {
        toast.error("Что-то пошло не так. Попробуйте еще раз позже");
      }
    }
  };

  // Render nothing or a loader while checking authentication
  if (typeof window !== "undefined" && isAuthenticated) {
    return null;
  }

  return (
    <main className="dark prekolbg text-foreground">
      <div className="h-[100vh]"></div>
      <div className="stupidcenter logindiv">
        <Input
          isClearable
          type="username"
          label="Юзернейм"
          variant="bordered"
          placeholder="TumGov"
          defaultValue=""
          onClear={() => console.log("input cleared")}
          className="w-full mb-[11px]"
          onChange={(e) => setEmail(e.target.value)}
          autocomplete="off"
        />
        <Input
          label="Пароль"
          variant="bordered"
          placeholder="**************"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          autocomplete="off"
          type={isVisible ? "text" : "password"}
          className="w-full mb-[11px]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flexop mb-[11px]">
          <Button color="primary" className="w-optimize" onClick={gotoReg}>
            Регистрация
          </Button>
          <Button
            color="primary"
            className="w-optimize ml-optimize"
            onClick={doLogin}
          >
            Войти в аккаунт
          </Button>
        </div>
        <center>
          <p className="text-blue-600 cursor-pointer" onClick={gotoReset}>
            Забыл Пароль
          </p>
        </center>
      </div>
      <Footer />
    </main>
  );
}
