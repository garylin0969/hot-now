import Image, { ImageProps } from 'next/image';

const DEFAULT_IMAGE_NOT_FOUND = '/image-not-found.png';

const NextImage = ({ src, unoptimized = true, ...props }: ImageProps) => {
    const imgSrc = src || DEFAULT_IMAGE_NOT_FOUND;

    return <Image src={imgSrc} unoptimized={unoptimized} {...props} />;
};

export default NextImage;
