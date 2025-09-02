import Image, { StaticImageData } from "next/image";

const HeadIcons = ({
  src,
  altName,
}: {
  src: StaticImageData;
  altName: string;
}) => {
  return (
    <>
      <Image src={src} alt={altName} />
    </>
  );
};

export default HeadIcons;
