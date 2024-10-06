"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="back-button text-white text-2xl font-bold p-2 transition-transform duration-200 hover:scale-150"
    >
      ﹤
    </button>
  );
}
