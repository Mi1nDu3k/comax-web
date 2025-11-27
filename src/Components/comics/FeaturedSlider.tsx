'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ComicBasic } from '@/Data/homeMock';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ComicCard from '@/Components/comics/ComicCard';
import Autoplay from 'embla-carousel-autoplay';

interface FeaturedSliderProps {
  comics: ComicBasic[];
}

export default function FeaturedSlider({ comics }: FeaturedSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start', 
      slidesToScroll: 1 
    }, 
    [
      Autoplay({ delay: 4000, stopOnInteraction: false }) 
    ]
  );

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group"> 
      {/* Thêm class group để xử lý hiển thị nút khi hover nếu muốn */}

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex -ml-4">
          {comics.map((comic) => (
            <div 
              key={comic.id} 
              className="embla__slide flex-none min-w-0 pl-4"
              style={{ flex: '0 0 20%' }}
            >
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>
      </div>
      {/* Các nút điều hướng */}
 <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none">
        
        <button
          className="embla__button embla__button--prev bg-black/60 hover:bg-blue-600 p-2 rounded-full pointer-events-auto transition text-white"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="embla__button embla__button--next bg-black/60 hover:bg-blue-600 p-2 rounded-full pointer-events-auto transition text-white"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
     
      </div>
    </div>
  );
}