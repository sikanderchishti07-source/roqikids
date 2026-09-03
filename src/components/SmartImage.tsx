import { useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "../lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
};

/** Image with shimmer skeleton while loading, soft fade-in, and a graceful fallback. */
export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      {!loaded && !failed && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-secondary text-primary/70">
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <BookOpen className="size-8" aria-hidden="true" />
            <span className="text-xs font-bold">{alt}</span>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}
    </div>
  );
}
