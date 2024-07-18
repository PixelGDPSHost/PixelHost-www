import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cd from "@/public/CheckDollar.png";
import sm from "@/public/SplitMoney.png";
import { SRVCard, SideBar } from "@/components/Components";
import { Button } from "@nextui-org/react";
import { Card, CardHeader } from "@nextui-org/react";

export default function MyComponent() {
  const router = useRouter();

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
        <div className="flex justify-center text-center content-center items-center self-center mt-[106.96px]">
          <p className="mr-3">1488 Рублей</p>
          <Button color="primary">Пополнить</Button>
        </div>
        <div className="bg-black w-[400px] mt-5 p-[10px] borderr7">
          <h1 className="text-[1.3rem] font-bold text-center">История</h1>

          <Card className="max-w-[400px] mt-5">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src={cd}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">Пополнение | 1999 рублей</p>
                <p className="text-small text-default-500">20.08.2024 12:52</p>
              </div>
            </CardHeader>
          </Card>
          <Card className="max-w-[400px] mt-5">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src={sm}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">PixelDash - Ascend | - 79 рублей</p>
                <p className="text-small text-default-500">20.08.2024 12:52</p>
              </div>
            </CardHeader>
          </Card>
          <Card className="max-w-[400px] mt-5">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src={sm}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">ByteNode BOT - Byte | - 49 рублей</p>
                <p className="text-small text-default-500">25.07.2024 12:52</p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}
