import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pezda from "@/public/DashboardLayout.png";
import pezda1 from "@/public/Server.png";
import pezda2 from "@/public/MoneyBag.png";
import pezda3 from "@/public/User.png";
import pezda4 from "@/public/Add.png";
import pezda5 from "@/public/Rectangle 186.png";
import { SRVCard } from "@/components/Components";

export default function MyComponent() {
  const router = useRouter();

  const gotoMain = () => {
    router.push("/panel");
  };

  const gotoSrvs = () => {
    router.push("/panel/servers");
  };

  return (
    <main className="bgnigga relative dark">
      <div className="w-[60px] h-full bg-[#1D1B2A] p-[12.5px] flex flex-col items-center borderr8 absolute left-0 top-0">
        <div
          className="w-[35px] h-[35px] bg-[#110F16] mt-[60px] borderr8 flex items-center justify-center cursor-pointer"
          onClick={gotoMain}
        >
          <Image src={pezda} alt="DashboardLayout" />
        </div>
        <div
          className="w-[35px] h-[35px] bg-[#110F16] mt-[15px] borderr8 flex items-center justify-center cursor-pointer"
          onClick={gotoSrvs}
        >
          <Image src={pezda1} alt="DashboardLayout" />
        </div>
        <div className="w-[35px] h-[35px] bg-[#110F16] mt-[15px] borderr8 flex items-center justify-center cursor-pointer">
          <Image src={pezda2} alt="DashboardLayout" />
        </div>
        <div className="w-[35px] h-[35px] bg-[#110F16] mt-[15px] borderr8 flex items-center justify-center cursor-pointer">
          <Image src={pezda3} alt="DashboardLayout" />
        </div>
      </div>
      <div className="srvs">
        <div className="flex items-center mb-[40px] mt-[106.96px]">
          <p className="text-[1.2rem] font-bold">Мои сервера</p>
          <Image
            src={pezda4}
            alt="add"
            width="30"
            height="30"
            className="w-[30px] h-[30px] ml-[10px] cursor-pointer"
          />
        </div>
        <div className="flexo gap-4">
          <SRVCard
            title="фуфля"
            oplachen="14.11.2024"
            status="Посхалко джокер 1488"
          ></SRVCard>
          <SRVCard
            title="PixelMine"
            oplachen="10.11.2024"
            status="Устанавливается"
            type="mc"
          ></SRVCard>
          <SRVCard
            title="PixelDash"
            oplachen="20.08.2024"
            status="Установлен"
            type="gdps"
          ></SRVCard>
          <SRVCard
            title="ByteNode BOT"
            oplachen="25.07.2024"
            status="Установлен"
            type="discord"
          ></SRVCard>
        </div>
      </div>
    </main>
  );
}
