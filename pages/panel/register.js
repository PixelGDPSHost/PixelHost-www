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
import Turnstile from "react-turnstile";

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = React.useState("");
  const [uname, setUName] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [turnstile_token, setTurnstile_token] = React.useState();

  const router = useRouter();

  const gotoReset = () => {
    router.push("/panel/resetpass");
  };
  const gotoLog = () => {
    router.push("/panel/login");
  };

  const doReg = async () => {
    try {
      const formData = new FormData();
      formData.append("mail", email);
      formData.append("uname", uname);
      formData.append("name", name);
      formData.append("passwd", password);
      formData.append("CF_TURNSTILE", turnstile_token);

      const resp = await axios.post(
        "https://api.bytenode.cc/v1/reg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (resp.status === 200) {
        const respdata = resp.data;
        const respcookie = respdata.session.cookie;

        if (respcookie === null) {
          return;
        }

        Cookies.set(
          "PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA",
          { respcookie },
          { expires: 30, sameSite: "strict" },
        );
        toast.success("Вы успешно вошли!");
        router.push("/panel");
      }
    } catch (e) {
      toast.error(
        "Что-то пошло не так, Проверьте правильность пароля и юзернейма",
      );
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
          type="email"
          label="Почта"
          variant="bordered"
          placeholder="user@bytenode.cc"
          defaultValue=""
          onClear={() => console.log("input cleared")}
          className="w-full mb-[11px]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          isClearable
          type="text"
          label="Имя"
          variant="bordered"
          placeholder="Влад"
          defaultValue=""
          onClear={() => console.log("input cleared")}
          className="w-full mb-[11px]"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          isClearable
          type="name"
          label="Юзернейм"
          variant="bordered"
          placeholder="user123123"
          defaultValue=""
          onClear={() => console.log("input cleared")}
          className="w-full mb-[11px]"
          onChange={(e) => setUName(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          type={isVisible ? "text" : "password"}
          className="w-full mb-[11px]"
        />
        <center>
          <Turnstile
            className="mt-5"
            sitekey={"0x4AAAAAAAfTVYopjzxQMTNP"}
            onVerify={(token) => setTurnstile_token(token)}
          />
        </center>

        <div className="flexop mb-[11px]">
          <Button
            color="primary"
            className="w-optimize mb-optimize"
            onClick={gotoLog}
          >
            Вход
          </Button>
          <Button
            color="primary"
            className="w-optimize w-full ml-optimize"
            onClick={doReg}
          >
            Зарегистрировать
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
