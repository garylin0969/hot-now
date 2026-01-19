/**
 * @fileoverview 網站全域常數設定
 * 包含社交連結、外部資源連結與基本配置。
 */
import { FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa';

/** 網站 Logo 圖片路徑 */
export const LOGO_IMAGE_PATH = '/favicons/favicon-32x32.png';

/** 公告欄訊息設定 */
export const NOTICE_BAR_CONFIG = {
    MESSAGE: '點我至 Chrome Extension 商店',
    LINK: 'https://chromewebstore.google.com/detail/hot-now%EF%BD%9C%E7%86%B1%E9%96%80%E8%A9%B1%E9%A1%8C%E4%B8%80%E6%8A%8A%E6%8A%93/pcgkeopgenagbemoagdogljeapjhapch',
} as const;

/** 社交連結列表定義 */
export const SOCIAL_LINKS = [
    {
        href: 'https://www.google.com',
        target: '_blank',
        icon: FaGoogle,
        label: 'Google',
    },
    {
        href: 'https://www.linkedin.com/in/garylin0969',
        target: '_blank',
        icon: FaLinkedin,
        label: 'LinkedIn',
    },
    {
        href: 'https://github.com/garylin0969',
        target: '_blank',
        icon: FaGithub,
        label: 'GitHub',
    },
] as const;
