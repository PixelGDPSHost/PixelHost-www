import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import pezda from "@/public/DashboardLayout.png";
import pezda1 from "@/public/Server.png";
import pezda2 from "@/public/MoneyBag.png";
import pezda3 from "@/public/User.png";

export default function MyComponent() {
  const router = useRouter();

  const gotoMain = () => {
    router.push("/panel");
  };

  const gotoSrvs = () => {
    router.push("/panel/servers");
  };

  return (
    <main className="bgnigga min-h-screen flex">
      <div className="w-[60px] min-h-[100px] bg-[#1D1B2A] p-[12.5px] flex flex-col items-center borderr8">
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
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[341px] h-[231px] bg-black borderr7 flex items-center justify-center text-center p-5">
          <p>Привет, возможно вместо этого текста тут что-то будет</p>
        </div>
      </div>
    </main>
  );
}
