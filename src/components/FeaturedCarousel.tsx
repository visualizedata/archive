import React, { useCallback, useEffect, useState, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { ProjectData } from '@/content.config';

interface FeaturedCarouselProps {
  highlightedIds: string[];
  allProjects: ProjectData[];
}

export default function FeaturedCarousel({ highlightedIds, allProjects }: FeaturedCarouselProps) {
  const base = import.meta.env.BASE_URL;

  // Filter projects to only show highlighted ones
  const featuredProjects = highlightedIds
    .map(id => allProjects.find(p => p.id === id))
    .filter((p): p is ProjectData => p !== undefined);

  // Create autoplay plugin instance
  const autoplayPlugin = useMemo(() => Autoplay({ delay: 5000, stopOnInteraction: false }), []);

  // Initialize Embla with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30 // Smooth 30ms transition
    },
    [autoplayPlugin]
  );

  // Dots functionality
  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      // Stop autoplay
      autoplayPlugin.stop();

      // Scroll to the index
      emblaApi.scrollTo(index);

      // Restart autoplay after 10 seconds
      setTimeout(() => {
        autoplayPlugin.play();
      }, 10000);
    },
    [emblaApi, autoplayPlugin]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (featuredProjects.length === 0) return null;

  return (
    <div className="w-full mb-8">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="flex-[0_0_100%] min-w-0"
              style={{ aspectRatio: '21/9' }}
            >
              <a
                href={`${base}/projects/${project.id}`}
                className="block w-full h-full cursor-pointer"
              >
                <img
                  src={`${base}/images/${project.image[0]}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Dot controls */}
      {featuredProjects.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 border border-black/20 ${
                index === selectedIndex
                  ? 'bg-black w-8'
                  : 'bg-neutral-400 hover:bg-neutral-600 w-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
