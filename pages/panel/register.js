"use client"
import {Input} from "@nextui-org/react";
import React from "react";
import {EyeSlashFilledIcon} from "@/components/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/EyeFilledIcon";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/router";
import {Bounce, toast} from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie'

export default function Home() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = React.useState("");
    const [uname, setUName] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const router = useRouter();

    const gotoReset = () => {
        router.push("/panel/resetpass")
    }
    const gotoLog = () => {
        router.push("/panel/login")
    }

    const doReg = () => {
        try {
            const resp = axios.post("https://api.pixelhost.one/v1/register", {
                mail: email,
                uname: uname,
                name: name,
                passwd: password,
            }).catch(function (error) {
                toast.error("Что-то пошло не так, Проверьте ли правильный пароль и юзернейм")
            })

            if (resp.status === 200) {
                const respdata = resp.data;
                const respcookie = respdata.cookie;

                if (respcookie === null) {
                    return;
                }

                Cookies.set('PIXEL_AUTH_DO_NOT_TOUCH_THIS_NIGGA', {respcookie}, { expires: 30, sameSite: 'strict' })
                toast.success("Вы успешно вошли!")
                router.push("/panel")
            }
        } catch (e) {
            toast.error("Что-то пошло не так, Проверьте ли правильный пароль и юзернейм")
        }
    }

    if (Cookies.get("PIXEL_AUTH_DO_NOT_TOUCH") !== undefined) {
        router.push("/panel")
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
                    placeholder="user@pixelhost.one"
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
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    type={isVisible ? "text" : "password"}
                    className="w-full mb-[11px]"
                />
                    <div className="flexop mb-[11px]">
                            <Button color="primary" className="w-optimize mb-optimize" onClick={gotoLog}>
                                Вход
                            </Button>
                            <Button color="primary" className="w-optimize w-full ml-optimize" onClick={doReg}>
                                Зарегистрировать
                            </Button>
                    </div>
                <center><p className="text-blue-600 cursor-pointer" onClick={gotoReset}>Забыл Пароль</p></center>
            </div>
        </main>
    );
}
