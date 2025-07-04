'use client';

import { ImgHTMLAttributes, SyntheticEvent } from 'react';

interface NativeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
}

const NativeImage = ({ src, alt, className = '', loading = 'lazy', ...props }: NativeImageProps) => {
    const imgSrc = src || '/image-not-found.png';

    const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = '/image-not-found.png';
    };

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imgSrc} alt={alt} className={className} loading={loading} onError={handleError} {...props} />;
};

export default NativeImage;
