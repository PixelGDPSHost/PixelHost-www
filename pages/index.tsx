import Image from "next/image";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Footer, SCard, TDCard } from "@/components/Components";
import * as React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="dark text-foreground prekolbg">
      <div className="skid">
        <center>
          <h1 className="text-5xl font-semibold pixelhostbig">ByteNode</h1>
          <p className="font-light text-2xl">
            ByteNode не откроется.
          </p>
        </center>
      </div>
    </main>
  );
}
