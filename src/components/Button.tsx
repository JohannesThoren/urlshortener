"use client";
import { ReactNode } from "react";

export default function Button({
    callback,
    className,
    children,
}: {
    callback: () => Promise<void>;
    className?: string;
    children?: ReactNode;
}) {
    return (
        <button className={className} onClick={() => callback()}>
            {children}
        </button>
    );
}
