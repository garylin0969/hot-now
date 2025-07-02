import React from 'react';

interface NativeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
}

const NativeImage = ({ src, alt, className = '', loading = 'lazy', ...props }: NativeImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} loading={loading} {...props} />;
};

export default NativeImage;
