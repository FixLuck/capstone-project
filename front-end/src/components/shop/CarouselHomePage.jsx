import React from 'react'
import { Card, CardContent } from '../ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import Autoplay from 'embla-carousel-autoplay'


let carouselImages = [
  "carousel-1.jpg",
  "carousel-2.jpg",
  "carousel-3.jpg",
  "carousel-4.jpg",
  "carousel-5.jpg",
]

export default function CarouselHomePage() {
  return (
    <Carousel plugins={[Autoplay({
      delay: 2000
    })]}>
      <CarouselContent>
        {carouselImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                    <img className='mx-auto h-[600px] w-full object-contain' src={`/carousel-images/${image}`} alt=""/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
