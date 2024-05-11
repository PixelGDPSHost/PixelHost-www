import React from 'react';

export const SCard = ({title, lower, iconimg}) => {
    const niconimg = "https://cdn.pixelhost.one/" + iconimg
    return (
        <div className="flex items-center ml-10 mb-[43.72px] font-medium">
            <div className="w-[80px] h-[79.48px] bg-[#171D29] mr-[25px] justify-center items-center flex rounded-[15px]">
                <img src={niconimg} className="w-[45px] h-[44.71px]"/>
            </div>
            <div>
                <h1 className="text-[20px] mb-[18px]">{title}</h1>
                <p className="max-w-[364px] text-[14px]">{lower}</p>
            </div>
        </div>
    );
}