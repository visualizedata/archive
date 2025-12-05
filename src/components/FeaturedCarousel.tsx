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

  // Track window width for responsive animation
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <>
      <div className="w-full mb-2 relative">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="flex-[0_0_100%] min-w-0"
                style={{ aspectRatio: '20/9' }}
              >
                <a
                  href={`${base}/projects/${project.id}`}
                  className="block w-full h-full cursor-pointer"
                >
                  <img
                    src={project.image[0].includes('http')
                      ? project.image[0]
                      : `${base}/images/${project.image[0]}`
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Dot controls - positioned on top of images */}
        {featuredProjects.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? 'bg-white w-4'
                  : 'bg-white/60 hover:bg-white/80 w-1.5'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dynamic title display - separate from carousel with vertical animation */}
      {featuredProjects.length > 0 && (
        <div className="mt-2 h-12 md:h-6 overflow-hidden px-0">
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateY(-${selectedIndex * (isMobile ? 48 : 24)}px)`
            }}
          >
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="h-12 md:h-6 flex items-start md:items-center text-left">
                <h3 className="text-sm md:text-base font-sans font-bold leading-tight">
                  {project.title} <span className="font-normal">by {project.author.join(', ')}</span>
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
