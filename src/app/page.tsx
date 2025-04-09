import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">Welcome to ThriftZone</h1>
      <p className="mt-4 text-lg text-gray-600">
        Buy & sell second-hand items easily!
      </p>
        <Link href="/products" >
      <Button
        className="mt-6 bg-emerald-500 hover:bg-emerald-400"
        variant="default"
      >
        Start Shopping
      </Button>
        </Link>
    </main>
  );
}
