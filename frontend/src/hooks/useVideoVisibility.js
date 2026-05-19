import { useEffect, useRef } from 'react';

/**
 * Hook to detect video visibility in viewport and manage autoplay
 * Uses Intersection Observer API for optimal performance
 */
export const useVideoVisibility = () => {
  const videoRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          // Video is in viewport - play it
          video.play().catch(error => {
            console.log('Autoplay prevented or error:', error);
          });
        } else {
          // Video is not in viewport - pause it
          video.pause();
          // Reset video to beginning for smooth re-entry
          video.currentTime = 0;
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
      }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return videoRef;
};
