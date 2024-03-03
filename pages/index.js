import Image from "next/image";
import effect from "../public/effect.svg";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";
import Link from "next/link";
import gd from "/public/gd.png"
import {ToastContainer, Slide, toast} from "react-toastify";
import mc from "/public/mc.png"
import ds from "/public/ds.png"
import NavigationBar1 from "@/component/Navbar";
export default function Home() {
    const soon = () => {
        toast('🚀 Скоро в 2024!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    }
  return (
      <main>
          <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
          />
          <NavigationBar1/>
          <h1 className="text-6xl mt-20 flex justify-center branding">PixelHost</h1>
          <center>
          <p className="text-xl mt-2 flex justify-center p-3">Хостинг по вашим любимым играм и не только😉</p>
          <div className="ph-games flex flex-wrap justify-center">
              <Card className="w-[320px] h-[175px] inline-block mr-3 optimize mt-3">

                  <CardHeader className="flex gap-3">
                      <Image src={gd} alt="sss" width={85}/>
                      <div className="flex flex-col">
                          <p className="text-md ">Geometry Dash</p>
                          <p>21 сервер • 38 уровней</p>

                      </div>
                  </CardHeader>
                  <CardBody><Button variant={"flat"} color={"primary"}>Подробнее ;)</Button></CardBody>

              </Card>
              <Card className="w-[320px] h-[175px] inline-block mr-3 optimize mt-3">

                  <CardHeader className="flex gap-3">
                      <Image src={mc} alt="sss" width={85}/>
                      <div className="flex flex-col">
                          <p className="text-md">Minecraft</p>
                          <p>0 сервер</p>

                      </div>
                  </CardHeader>
                  <CardBody><Button variant={"flat"} color={"default"} onClick={soon}>Скоро</Button></CardBody>

              </Card>
              <Card className="w-[320px] h-[175px] inline-block mr-3 optimize mt-3">

                  <CardHeader className="flex gap-3">
                      <Image src={ds} alt="sss" width={85}/>
                      <div className="flex flex-col">
                          <p className="text-md">Discord Бот</p>
                          <p>0 Ботов</p>

                      </div>
                  </CardHeader>
                  <CardBody><Button variant={"flat"} color={"default"} onClick={soon}>Скоро</Button></CardBody>

              </Card>
          </div>
          </center>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

      </main>
  );
}
