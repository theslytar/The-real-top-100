import Image, { ImageProps } from "next/image";
import { useState } from "react";

/** <SafeImage> shows the normal src until it fails,
 *  then switches to /placeholder.png so nothing breaks. */
export default function SafeImage(props: ImageProps) {
  const [src, setSrc] = useState(props.src as string);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc("/placeholder.png")}
      // remove “unoptimized” if you want Next's built-in optimizer
      unoptimized
    />
  );
}
