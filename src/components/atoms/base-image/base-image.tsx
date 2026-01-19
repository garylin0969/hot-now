/**
 * @fileoverview 增強版 Next.js Image 元件
 */
import Image, { ImageProps } from 'next/image';

/** 預設圖片路徑 */
const DEFAULT_IMAGE_NOT_FOUND = '/image-not-found.png';

/**
 * 封裝的 Image 元件
 * 提供預設的 fallback 圖片路徑，並預設關閉優化 (適用於靜態導出或外部圖源)。
 *
 * @param props - Next.js Image 元件屬性
 * @returns 渲染後的 Image 元件
 */
const BaseImage = ({ src, alt, unoptimized = true, ...props }: ImageProps) => {
    const imgSrc = src || DEFAULT_IMAGE_NOT_FOUND;

    return <Image src={imgSrc} alt={alt} unoptimized={unoptimized} {...props} />;
};

export default BaseImage;
