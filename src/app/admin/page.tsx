import { validate_session } from "@/lib/auth";

export default function Page() {
    validate_session()
    
    return null;
}
