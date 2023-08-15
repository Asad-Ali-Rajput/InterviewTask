import React from "react";

interface ItemProps {
    children: any;
    heading: string;
    handlemodal: any;
  }

const Modal: React.FC<ItemProps> = ({children, heading, handlemodal}) => {
    return (
        <div className="w-[400px] bg-white rounded-lg">
            <div className="w-full h-50px text-white bg-gradient-to-r from-[#57BC90] via-[#004B40] to-[#004B40] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5">
                <button type="button" className="text-white flex justify-end w-full" onClick={handlemodal}>X</button>
                <h1 className=" text-center ">{heading}</h1>
            </div>
                <div className="p-4">
                    {children}
                </div>
        </div>
    )
}

export default Modal;