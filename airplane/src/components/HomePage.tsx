"use client";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <section className="w-full h-[80vh] relative">
        <Image
          alt="airplane"
          className="w-full h-full object-cover -z-1 max-h-[100vh]"
          width={"100vw"}
          src="/plane.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent w-screen h-screen" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-50 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              SKY AIR
            </h1>
            <p className="max-w-md text-lg md:text-xl">
              Sky Air
              為您提供快速便捷的機票訂購服務，讓您的旅程從此變得輕鬆無憂。
            </p>
            <Button
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-50"
              onClick={() => {
                router.push("/service");
              }}
            >
              立即訂票
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
