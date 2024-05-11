import Image from "next/image";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {SCard} from "@/components/Components"

export default function Home() {
    return (
        <main className="dark text-foreground">
            <div className="font-normal items-center justify-center flex flex-col h-auto text-center">
                <h1 className="text-3xl mt-[60px]">Политика конфидициальности</h1>
                <h2 className="text-2xl mt-[10px]">1. Терминолгия</h2>
                <p>
                    1.1 Хостинг - сервис PixelHost предоставляющие услуги хостинга серверов Minecraft, GDPS, либо услуги хостинга Discord Ботов<br/>
                    1.2 Клиент - физическое или юридическое лицо, заключившее с Поставщиком услуг договор размещения собственного контента в сети Интернет<br/>
                    1.3 Игрок - конечный потребитель, прямо или косвенно использующий услуги хостинга.<br/>
                    1.4 Пользователь - Игрок либо клиент использующие услуги хостинга<br/>
                    1.5 Администрация - группа лиц отвечающая за порядок в сервисе. в т.ч и разработка сервиса<br/>
                    1.6 IP-адрес - уникальный сетевой адрес узла в компьютерной сети, через который Пользователь получает доступ на Хостинг.<br/>
                    1.7 Сайт - это совокупность связанных между собой веб-страниц, размещенных в сети Интернет по уникальному URL адресу “pixelhost.one” а также его субдоменах.<br/>
                </p>
                <h2 className="text-2xl mt-[10px]">2. Общие Положения</h2>
                <p>
                    2.1 Использование сайта PixelHost Пользователем означает согласие с настоящей Политикой конфиденциальности и условиями обработки персональных данных Пользователя.<br/>
                    2.2 В случае несогласия с условиями Политики конфиденциальности Пользователь должен прекратить использование услуг хостинга PixelHost.<br/>
                    2.3 Администрация не проверяет достоверность персональных данных, предоставляемых Пользователем.<br/>
                    2.4 Сервис вправе удалить учетную запись Пользователя в случае нарушения последним положений Соглашения.<br/>
                    2.5 Администрация вправе удалить учетную запись Пользователя в случае нарушения последним положений Соглашения.<br/>
                    2.6 Пользователь несет полную ответственность за свой аккаунт в случае передачи третьим лицам.<br/>
                    2.7 Пользователь несет ответственность за несанкционированные действия третьего лица как за свои собственные.<br/>
                    2.8 Пользователь обязан незамедлительно уведомить сервис о любом случае несанкционированного доступа к учетной записи Пользователя<br/>
                </p>
                <h2 className="text-2xl mt-[10px]">3. Предмет политики конфиденциальности</h2>
                <p>
                    3.1 Настоящая Политика конфиденциальности устанавливает обязательства Администрации по неразглашению и обеспечению режима защиты<br/>
                    конфиденциальности персональных данных, которые Пользователь предоставляет по запросу Администрации при регистрации на сайте PixelHost.<br/>
                    3.2 Мы собираем персональные данные, разрешённые к обработке в рамках настоящей Политики конфиденциальности, предоставляются Пользователем путём
                    заполнения форм регистрации на сайте PixelHost и включают в себя следующую информацию:<br/>
                    3.2.1. дискорд пользователя;<br/>
                    3.2.2. адрес электронной почты дискорд аккаунта (e-mail);<br/>
                    3.2.3. дискорд id аккаунта<br/>
                    3.2.4 IP адрес регистрации аккаунта.<br/>
                    3.3. Хостинг защищает Данные, которые автоматически передаются при посещении страниц: - IP адрес, информация из cookies, информация о браузере, время доступа<br/>
                    3.3.1. Отключение cookies может повлечь невозможность доступа к частям сайта , требующим авторизации.<br/>
                </p>
                <h2 className="text-2xl mt-[10px]">4. Цели сбора персональной информации пользователя</h2>
                <p>
                    4.1. Персональные данные Пользователя Администрация может использовать в целях:<br/>
                    4.1.1. Идентификации Пользователя, зарегистрированного на сайте PixelHost для его дальнейшей авторизации.<br/>
                    4.1.2. Предоставления Пользователю доступа к персонализированным данным сайта PixelHost.<br/>
                    4.1.3. Подтверждения достоверности и полноты персональных данных, предоставленных Пользователем.<br/>
                    4.1.4. Создания учетной записи для использования частей сайта PixelHost, если Пользователь дал согласие на создание учетной записи.<br/>
                    4.1.5. Уведомления Пользователя по электронной почте.<br/>
                    4.1.6. Предоставления Пользователю эффективной технической поддержки при возникновении проблем, связанных с использованием сайта PixelHost.<br/>
                </p>
                <h2 className="text-2xl mt-[10px]">5. Права и обязанности сторон</h2>
                <p>
                    5.1. Пользователь вправе:<br/>
                    5.1.1. Принимать свободное решение о предоставлении своих персональных данных, необходимых для использования сайта PixelHost, и давать согласие на их обработку.<br/>
                    5.1.2. Обновить, дополнить предоставленную информацию о персональных данных в случае изменения данной информации.<br/>
                    5.1.3. Пользователь имеет право на получение у Администрации информации, касающейся обработки его персональных данных, если такое право не ограничено в
                    соответствии с федеральными законами. Пользователь вправе требовать от Администрации уточнения его персональных данных, их
                    блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не
                    являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав.
                    Для этого достаточно уведомить Администрацию по указаному E-mail адресу.
                    5.2. Администрация обязана:<br/>
                    5.2.1. Использовать полученную информацию исключительно для целей, указанных в п. 4 настоящей Политики конфиденциальности.<br/>
                    5.2.2. Обеспечить хранение конфиденциальной информации в тайне, не разглашать без предварительного письменного разрешения Пользователя, а также не осуществлять
                    продажу, обмен, опубликование, либо разглашение иными возможными способами переданных персональных данных Пользователя.<br/>
                    5.2.3. Принимать меры предосторожности для защиты конфиденциальности персональных данных Пользователя согласно порядку,
                    обычно используемого для защиты такого рода информации в существующем деловом обороте.<br/>
                    5.2.4. Осуществить блокирование персональных данных, относящихся к соответствующему Пользователю, с момента обращения или запроса Пользователя, или его
                    законного представителя либо уполномоченного органа по защите прав субъектов персональных данных на период проверки, в случае выявления недостоверных
                    персональных данных или неправомерных действий.
                </p>
                <h2 className="text-2xl mt-[10px]">6. Ответственность сторон</h2>
                <p>
                    6.1 Администрация, не исполнившая свои обязательства, несёт ответственность за убытки, понесённые Пользователем в связи с неправомерным использованием
                    персональных данных, в соответствии с законодательством Российской Федерации<br/>
                    6.2. В случае утраты или разглашения Конфиденциальной информации Администрация не несёт ответственность, если данная конфиденциальная информация:<br/>
                    6.2.1. Стала публичным достоянием до её утраты или разглашения.<br/>
                    6.2.2. Была получена от третьей стороны до момента её получения Администрацией Ресурса.<br/>
                    6.2.3. Была разглашена с согласия Пользователя.<br/>
                    6.3. Пользователь несет полную ответственность за соблюдение требований законодательства РФ, в том числе законов о рекламе, о защите авторских и смежных прав,
                    об охране товарных знаков и знаков обслуживания, но не ограничиваясь перечисленным, включая полную ответственность за содержание и форму материалов.<br/>
                    6.4. Пользователь признает, что ответственность за любую информацию (в том числе, но не ограничиваясь: файлы с данными, тексты и т. д.), к которой он может иметь доступ
                    как к части сайта PixelHost, несет лицо, предоставившее такую информацию.<br/>
                    6.5. Пользователь соглашается, что информация, предоставленная ему как часть сайта PixelHost, может являться объектом интеллектуальной собственности,
                    права на который защищены и принадлежат другим Пользователям, партнерам или рекламодателям, которые размещают такую информацию на сайте PixelHost.<br/>
                    Пользователь не вправе вносить изменения, передавать в аренду, передавать на условиях займа, продавать, распространять или создавать производные работы на
                    основе такого Содержания (полностью или в части), за исключением случаев, когда такие действия были письменно прямо разрешены собственниками такого
                    Содержания в соответствии с условиями отдельного соглашения.<br/>
                    6.7. Администрация не несет ответственности перед Пользователем за любой убыток или ущерб, понесенный Пользователем в результате удаления, сбоя или
                    невозможности сохранения какого-либо Содержания и иных коммуникационных данных, содержащихся на сайте PixelHost или передаваемых через него.<br/>
                    6.8. Администрация не несет ответственности за любые прямые или косвенные убытки, произошедшие из-за: использования либо невозможности использования сайта,
                    либо отдельных сервисов; несанкционированного доступа к коммуникациям Пользователя; заявления или поведение любого третьего лица на сайте.<br/>
                    6.9. Администрация не несет ответственность за какую-либо информацию, размещенную пользователем на сайте PixelHost, включая, но не ограничиваясь: информацию,
                    защищенную авторским правом, без прямого согласия владельца авторского права.
                </p>
                <h2 className="text-2xl mt-[10px]">7. Дополнительные условия</h2>
                <p className="mb-[60px]">
                    7.1. Администрация вправе вносить изменения в настоящую Политику конфиденциальности без согласия Пользователя.<br/>
                    7.2. Новая Политика конфиденциальности вступает в силу с момента ее размещения на сайте PixelHost, если иное не предусмотрено новой редакцией Политики конфиденциальности.<br/>
                    7.3. Все предложения или вопросы касательно настоящей Политики конфиденциальности следует сообщать по адресу: contact@pixelhost.one<br/>
                    7.4. Действующая Политика конфиденциальности размещена на странице по адресу https://pixelhost.one/privacy
                </p>
            </div>
        </main>
    );
}
