"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold">Welcome to ThriftZone</h1>
            <p className="mt-4 text-lg text-gray-600">
                Buy & sell second-hand items easily!
            </p>
            <Button
                className="mt-6 bg-emerald-500 hover:bg-emerald-400"
                variant="default"
                onClick={() => router.push("/products")}
            >
                Start Shopping
            </Button>
        </main>
    );
}