import * as React from "react";
import { Footer, SideBar } from "@/components/Components";

export default function MyComponent() {
  return (
    <main className="min-h-screen flex prekolbg1">
      <SideBar></SideBar>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[341px] h-[231px] bg-black borderr7 flex items-center justify-center text-center p-5">
          <p>Привет, возможно вместо этого текста тут что-то будет</p>
        </div>
      </div>
    </main>
  );
}
