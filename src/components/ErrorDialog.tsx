"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ErrorDialog() {
    let params = useSearchParams();
    let error = params.get("error");
    const [open, setOpen] = useState(error != null);

    return (
        <>
            {open && (
                <div
                    id="backdrop"
                    className="fixed z-50 inset-0 bg-black/10 backdrop-blur grid place-items-center"
                >
                    <div className="flex flex-col">
                        <button
                            className="py-1 px-2 dark:bg-stone-800 rounded-md bg-stone-200 my-2 w-fit ml-auto"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Close
                        </button>
                        <p>{error}</p>
                    </div>
                </div>
            )}
        </>
    );
}
