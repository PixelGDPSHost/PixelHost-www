import Image from "next/image";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {SCard} from "@/components/Components"

export default function Home() {
  return (
    <main className="dark text-foreground">
      <div className="skid">
        <center>
            <h1 className="text-5xl font-semibold pixelhostbig">PixelHost</h1>
            <p className="font-light text-2xl">
                Лучший хостинг GDPS и Minecraft серверов с защитой от DDoS
            </p>
        </center>
      </div>
        <center>
            <h1 className="text-4xl font-semibold">Тарифы:</h1>
            <div className="flex w-full flex-col justify-center items-center mt-5">
                <Tabs aria-label="Options">
                    <Tab key="gdps" title="GDPS">
                        <Card>
                            <CardBody>
                                Скоро, 20.06.2024
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="minecraft" title="Minecraft">
                        <Card>
                            <CardBody>
                                Скоро, 10.11.2024
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="discord" title="Discord">
                        <Card>
                            <CardBody>
                                Скоро, 20.06.2024
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </center>
        <h1 className="text-4xl font-semibold mt-10 ml-10 mb-[78.2px]">Почему вы должны выбрать нас?</h1>
        <div className="flex">
            <div>
                <SCard title="DDoS Защита" lower="Все сервера находятся под профессиональной защитой от DDoS на уровнях L3 - L4 и L7" iconimg="Shield.png"></SCard>
                <SCard title="Ядро PixelCore" lower="Наше собственное ядро GDPS, поддерживает 2.2, гибкая настройка, своя музыка - и не только" iconimg="Geometry%20Dash.png"></SCard>
                <SCard title="Быстрая техподдержка" lower="Мы всегда готовы помочь нашим клиентам в любых трудностях при настройке сервера" iconimg="Ask%20Question.png"></SCard>
            </div>
            <div className="flex flex-col">
                <SCard title="Высокий Uptime" lower="Все наши сервера работают 24/7 круглые сутки с айптаймом 99.98%" iconimg="Server%20clocks%20and%20database.png"></SCard>
                <SCard title="Простая панель" lower="В нашей удобной и функциональной панели удобная настройка сундуков, ролей, музыки, и т.д." iconimg="Dashboard%20Layout.png"></SCard>
                <SCard title="Цена - качество" lower="Качественный хостинг за небольшую цену предоставляет удобную панель, большой функционал, и тому подобное" iconimg="Banknotes.png"></SCard>
            </div>
        </div>
    </main>
  );
}
