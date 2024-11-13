"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorMessage() {
  let params = useSearchParams();
  let error = params.get("error");

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