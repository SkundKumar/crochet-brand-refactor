"use client";

import { Image as IKImage, buildSrc } from "@imagekit/next";
import NextImage from "next/image";
import { ComponentProps, useState } from "react";

// Fallback added in case Next.js dev server hasn't been restarted
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT || "https://ik.imagekit.io/crux";

type CustomImageProps = Omit<ComponentProps<typeof IKImage>, "path" | "urlEndpoint"> & {
  src: string;
};

export default function Image({ src, alt, onLoad, ...props }: CustomImageProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  // If it's a product image, load it from ImageKit
  if (src && src.startsWith("/images/products/")) {
    return (
      <IKImage
        urlEndpoint={urlEndpoint}
        src={src}
        alt={alt || "Image"}
        {...props}
        loading="eager"
        style={showPlaceholder ? {
          backgroundImage: `url(${buildSrc({
            urlEndpoint: "https://ik.imagekit.io/crux",
            src: src,
            transformation: [
              // {}, // Any other transformation you want to apply
              {
                quality: 10,
                blur: 50,
              }
            ]
          })})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        } : {}}
        onLoad={(event) => {
          setShowPlaceholder(false);
          onLoad?.(event);
        }}

      />
    );
  }

  // Fallback for local assets like /placeholder.svg
  return <NextImage src={src} alt={alt || "Image"} {...props as any} />;
}
