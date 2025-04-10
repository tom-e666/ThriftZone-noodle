"use client"

import React, {useState} from "react"

import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import Image from 'next/image'
import Link from "next/link";

export default function ProductPage() {
  const [loadedProduct]=useState<ProductInfo[]>(mockProducts);

  return (
      <div style={container}>
        {loadedProduct.map((product, i) => (
            <Card key={i} i={i} product={product} />
        ))}
      </div>
  )
}
function Card({product,i}:{product:ProductInfo,i:number}) {
  const background = `linear-gradient(306deg, ${hue(product.hueA)}, ${hue(product.hueB)})`;

  return (
      <motion.div
          className={`card-container-${i}`}
          style={cardContainer}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.8 }}
      >
        <motion.div

            style={{ ...splash, background }}
            variants={{
              offscreen: {
                clipPath: `path("M 0 383.5 C 0 372.454 8.995 365.101 20 363.5 L 580 279.5 C 590.085 278.033 600 288.454 600 299.5 L 620 530 C 620 541.046 611.046 550 600 550 L 20 550 C 8.954 550 0 541.046 0 530 Z")`,

              },
              onscreen: {
                clipPath: `path("M 0 350 C 0 340 10 330 20 330 L 580 330 C 590 330 600 340 600 350 L 600 530 C 600 541.046 591.046 550 580 550 L 20 550 C 8.954 550 0 541.046 0 530 Z")`,
                transition: {
                  type: "spring",
                  bounce: 0.4,
                  duration: 0.8,
                },
              },
            }}
        />
        <Link href={`/products/${product.id}`}>
        <motion.div
            style={card}
            variants={cardVariants}
            className="card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
        >
          <Image
          src={product.img}
          alt={product.name}
          width={200}
          height={100}/>
          <br/>
          <p className="font-bold text-3xl text-gray-700 ">{product.name}</p>
          <p className="font-light  text-gray-700">{product.shortDescription}</p>
        </motion.div>
        </Link>
      </motion.div>
  );
}
const cardVariants: Variants = {
  offscreen: {
    y: 300,

  },
  onscreen: {
    y: 50,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  margin: "100px auto",
  maxWidth: 600,
  paddingBottom: 150,
  width: "100%",
  display: "flex",          // Enable flexbox
  flexDirection: "column",  // Stack children vertically
  gap: "80px",
}
const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  marginBottom: -200,
}

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 383.5 C 0 372.454 8.995 365.101 20 363.5 L 580 279.5 C 590.085 278.033 600 288.454 600 299.5 L 620 530 C 620 541.046 611.046 550 600 550 L 20 550 C 8.954 550 0 541.046 0 530 Z")`, // Adjusted clip path for larger splash
  paddingBottom:10,
}

const card: React.CSSProperties = {
  fontSize: 14,
  width: 400,
  height: 500,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: 24,
  background: "#f5f5f5",
  boxShadow:
      "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "center",
}

/**
 * ==============   Data   ================
 */
const colors=[
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
]
interface ProductInfo{
  id:string;
  name: string;
  img: string;
  star: number;
  shortDescription: string;
  hueA: number;
  hueB: number;
}
const mockData= [
  {id:"ABCDEF",name:"Asus",star: 4.5, shortDescription:"RTX 4060", img:"/next.svg"},
  {id:"ABCDEF",name:"Asus",star: 4.5, shortDescription:"RTX 4060", img:"/next.svg"},
  {id:"ABCDEF",name:"Asus",star: 4.5, shortDescription:"RTX 4060" ,img:"/next.svg"},
  {id:"ABCDEF",name:"Asus",star: 4.5, shortDescription:"RTX 4060", img:"/next.svg"}
]
const mockProducts=mockData.map((row,index)=>{
  const i= index % colors.length;
      return {...row,hueA:colors[i][1],hueB:colors[i][2]} as ProductInfo;
}

)

