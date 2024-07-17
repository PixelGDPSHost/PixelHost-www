"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

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

  if (Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA") !== undefined) {
    router.push("/panel");
  }

  return (
    <main className="dark text-foreground">
      <div className="h-[100vh]"></div>
      <div className="stupidcenter logindiv">
        <Input
          isClearable
          type="name"
          label="Юзернейм"
          variant="bordered"
          placeholder="TumGov"
          defaultValue=""
          onClear={() => console.log("input cleared")}
          className="w-full mb-[11px]"
          onChange={(e) => setEmail(e.target.value)}
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
    </main>
  );
}
