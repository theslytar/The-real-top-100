import Image, { ImageProps } from "next/image";
import { useState } from "react";

/** <SafeImage>
 *  Renders the given src first; if it fails (404, etc.)
 *  it automatically swaps to /placeholder.png so you
 *  never see a broken-image icon.
 */
export default function SafeImage(props: ImageProps) {
  const [src, setSrc] = useState(props.src as string);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc("/placeholder.png")}
      unoptimized         // remove this line if you want Next.js optimisation
    />
  );
}
