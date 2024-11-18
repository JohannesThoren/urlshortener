"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function Dialog({
    children,
    button,
}: {
    children: React.ReactNode;
    button: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => {
                    setOpen(true);
                }}
            >
                {button}
            </div>
            {open && (
                <div
                    id="backdrop"
                    className="fixed z-50 inset-0 bg-black/10 backdrop-blur grid place-items-center"
                >
                    <div className="flex flex-col w-[95dvw] h-[95dvh] md:w-[70%] md:h-fit lg:w-[40%]">
                        <button
                            className="p-1 dark:bg-stone-800 rounded-md bg-stone-200 my-2 w-fit ml-auto text-2xl"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <MdClose />
                        </button>
                        <div
                            className="w-full h-full overflow-y-auto dark:bg-stone-800 rounded-md bg-stone-200 p-5 "
                            onSubmit={() => {
                                setOpen(false);
                            }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
