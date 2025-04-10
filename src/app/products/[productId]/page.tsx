'use client'
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface ProductDetails {
    name: string;
    stock: number;
    price: number;
    description: string;
    productId: string;
    optionType: string;
    options?: string[];
}

export default function ProductDetailPage() {
    const router = useRouter();
    const { productId } = router.query; // Destructure for cleaner access
    const [productDetails, setProductDetails] = useState<ProductDetails | undefined>();
    const [imageList, setImageList] = useState<Photo[]>([]); // Updated type

    useEffect(() => {
        if (!productId) return; // Wait until productId is available

        async function fetcher() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos/?albumId=1');
                const data = await response.json();
                setImageList(data);

                setProductDetails({
                    name: "Laptop PC gaming",
                    stock: 10,
                    price: 100000,
                    description: "A simple product",
                    productId: productId as string,
                    optionType: "single",
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetcher();
    }, [productId]);

    if (!productDetails) return <div>Loading...</div>; // Add loading state

    return (
        <>
            <div className="pt-4 w-full h-full flex flex-col-2 gap-8 justify-center items-center">
                <div className="flex flex-col bg-red-400 rounded-2xl w-48 h-96 justify-center items-center">
                    <p id="title" className="bg-gray-400 rounded-2xl font-sans">{productDetails.name}</p>
                    <Carousel>
                        <CarouselContent>
                            {imageList?.map((photo, i) => (
                                <CarouselItem key={photo.id}>
                                    <Image
                                        src={photo.url}
                                        alt={`Image #${i}`}
                                        width={200}
                                        height={200}
                                        priority={i === 0} // Optional: improve loading of first image
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className="flex flex-col bg-red-400 rounded-2xl w-48 h-96">
                    <div id="description" className="p-4 w-full h-fit font-light text-gray-700">
                        {productDetails.description}
                    </div>
                    <Button>Buy now</Button>
                    <Button>Add to cart</Button>
                </div>
            </div>
            <ScrollProgressBar />
        </>
    );
}