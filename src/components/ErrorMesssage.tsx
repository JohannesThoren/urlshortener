"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorMessage() {
    const params = useSearchParams();
    const error = params.get("error");

    return (
        <>
            {error != undefined && (
                <div>
                    <p className="text-red-500">{error}</p>
                </div>
            )}
        </>
    );
}
