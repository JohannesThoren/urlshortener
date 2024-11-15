import { ReactNode } from "react";

import Button from "@/components/Button";


export default function EditButton({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) {
    async function callback() {
   
    }

    return (
        <Button callback={callback} className={className}>
            {children}
        </Button>
    );
}
