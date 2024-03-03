import user from "../public/user.png"
import Image from "next/image";
import {useState} from "react";

export default function NavigationBar1(){
    const [AccountDrop, setAccountDrop] = useState(0)
    const drop_accountbox = () => {
        if (AccountDrop === 0){

        }
    }
    return (
        <div>
            <nav className="ph-navbar">
                <div className="ph-nav-content flex justify-between items-center">
                    <div>
                        <img
                            src="https://images-ext-2.discordapp.net/external/OKZ1VIJ0gx8nAkB2gn-MXHyltMnWMThP2pe0wztYABY/https/cdn.pixelhost.one/pixelhost.png?format=webp&quality=lossless"
                            width={32}
                        />
                    </div>
                    <div className="account" onClick={drop_accountbox}>
                        <Image src={user} className="account-ico inline-block" width={32}/>
                        <div className="mr-15 inline-block">
                            <p className=" ">Аккаунт</p>
                        </div>
                    </div>
                </div>
            </nav>
            <div align="right" className="accountbox">asdasdasd</div>
        </div>

    )
}
