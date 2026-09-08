"use client";

import { useEffect, useRef } from "react";

const VideoPopup = ({ isVideoOpen, setIsVideoOpen, videoId = "bgMEvrd2E" }: any) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const safeVideoId = /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : "";

  useEffect(() => {
    if (!isVideoOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false);
      if (event.key === "Tab") {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, iframe") || []);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isVideoOpen, setIsVideoOpen]);

  if (!isVideoOpen || !safeVideoId) return null;

  return (
    <div ref={dialogRef} className="modal-video" role="dialog" aria-modal="true" aria-labelledby="property-video-title">
      <div className="modal-video-body">
        <div className="modal-video-inner">
          <div className="modal-video-movie-wrap">
            <h2 id="property-video-title" className="visually-hidden">Property video</h2>
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube-nocookie.com/embed/${safeVideoId}?autoplay=1&rel=0`}
              title="DG Property video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <button ref={closeButtonRef} type="button" className="modal-video-close-btn" aria-label="Close property video" onClick={() => setIsVideoOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
