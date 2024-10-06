"use client";

import { useState } from "react";

export default function Redirect({ url }: { url: string }) {
    const [count, setCount] = useState(1);
    const count_max = 5;

    setInterval(() => {
        setCount(count + 1);
        if (count == count_max) {
            window.location.replace(url.toString());
        }
    }, 1000);

    return (
        <div>
            <h1>Redirecting to {url}</h1>
            <p>in {count_max + 1 - count} seconds</p>
        </div>
    );
}
