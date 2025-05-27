// image: "/images/products/westvleteren-12.jpg"image: "/images/products/westvleteren-12.jpg";


import Image from "next/image";
import { useState } from "react";

interface ConsistentImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

// Normalize style object to ensure consistent rendering between server and client
const normalizeStyle = (style: React.CSSProperties): React.CSSProperties => {
  return {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    objectFit: undefined,
    objectPosition: undefined,
    color: "transparent",
  };
};

export default function ConsistentImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
  sizes,
  width,
  height,
}: ConsistentImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const imageSrc = imageError ? "/placeholder.svg" : src || "/placeholder.svg";

  if (fill) {
    return (
      <>
        {/*
          IMPORTANT: When using <ConsistentImage fill />, the parent container MUST have an explicit height (e.g., h-64, min-h-[200px], or aspect-[4/3])
          or the image will not display on large screens. This is a Next.js <Image fill /> requirement.
          See: https://nextjs.org/docs/pages/api-reference/components/image#fill-true

          Optionally, you can add a runtime warning in development mode:
          if (process.env.NODE_ENV === 'development' && fill) {
            // You could check parent height here and warn if missing (not trivial in React)
          }
        */}
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className={className}
          priority={priority}
          sizes={sizes || "100vw"}
          style={normalizeStyle({})}
          onError={handleError}
          quality={85}
        />
      </>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={handleError}
      quality={85}
    />
  );
}
