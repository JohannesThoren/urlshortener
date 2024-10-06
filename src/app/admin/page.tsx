import { validate_session } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function () {
    validate_session()
    
    return null;
}
