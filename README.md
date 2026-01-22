# 🔥 Hot Now | 熱門話題一把抓

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-部署-000000?style=flat-square&logo=vercel)](https://vercel.com/)

Hot Now 是一個整合各大平台熱門內容的資訊聚合網站，讓你一站式瀏覽各種熱門話題，隨時掌握最新趨勢。

## 🌐 網站連結

- **官方網站**: [https://hotnow.garylin.dev](https://hotnow.garylin.dev)
- **Chrome 擴充功能**: [Chrome Web Store](https://chromewebstore.google.com/detail/hot-now%EF%BD%9C%E7%86%B1%E9%96%80%E8%A9%B1%E9%A1%8C%E4%B8%80%E6%8A%8A%E6%8A%93/pcgkeopgenagbemoagdogljeapjhapch)
- **Vercel 部署**: [https://vercel.com/garylin0969s-projects/garylin0969-hot-now](https://vercel.com/garylin0969s-projects/garylin0969-hot-now)
- **爬蟲專案**: [https://github.com/garylin0969/trend-scraper](https://github.com/garylin0969/trend-scraper)

## 🔌 Chrome 擴充功能

Hot Now 已在 Chrome Web Store 上架！每次開啟新分頁，都能立即瀏覽最熱門的網路討論話題：

- **一鍵瀏覽**: 開啟新分頁即可查看熱門話題
- **無需登入**: 不需要帳號即可使用
- **隱私保護**: 不收集個人身份資訊
- **使用分析**: 僅使用 Google Analytics 進行匿名使用行為分析

## ✨ 功能特色

### 📊 多平台整合

- **YouTube** - 發燒影片（最新、遊戲、音樂、電影）
- **PTT** - 24小時熱門文章
- **BBC** - 中文新聞（最新資訊、國際新聞）
- **Google** - 熱搜榜（過去4小時）
- **巴哈姆特** - 熱門話題（全站、遊戲、動漫、生活）
- **Komica(K島)** - 熱門文章

### 🔧 實用工具

- **自訂超連結** - 快速存取常用網站
- **深色模式** - 護眼閱讀體驗
- **響應式設計** - 跨裝置完美適配

## 🏗️ 技術架構

本專案採用最新的前端技術棧，專注於極致的載入效能與開發體驗：

### 核心技術

- **框架**: Next.js 16 (App Router)
- **核心庫**: React 19 (啟用 React Compiler)
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4
- **UI 元件**: Shadcn UI
- **狀態管理**: Zustand (用於客戶端狀態如 Shortcuts)
- **資料獲取**: Server Components + Native Fetch + Next.js Cache
- **主題**: next-themes
- **圖示**: Lucide React / React Icons

### 架構設計

- **Server Components**: 95% 以上的內容使用伺服器端渲染，減少 Client Bundle 大小。
- **Streaming (Suspense)**: 實作串流加載與 Skeleton 骨架屏，讓 UI 立即響應，內容逐步顯示。
- **Atomic Design**: 嚴謹的原子設計元件架構。

### 💡 技術決策說明

- **YouTube API 移除 `googleapis` 套件**: 由於 `googleapis` 會觸發 Node.js 的 `DeprecationWarning: zlib.bytesRead is deprecated` (DEP0108) 警告，為保持開發環境日誌整潔並減少不必要的依賴，目前已移除該套件，並針對 YouTube 相關功能改用原生 `fetch` 手動實作 API 呼叫。

### 資料來源與快取策略

專案利用 Next.js 16 的 `'use cache'` 指令與自定義 `cacheLife` 設定，實作了高效的元件級快取機制：

| 平台         | 資料來源         | 快取機制    | 快取策略 (Profile) | 爬蟲頻率 |
| ------------ | ---------------- | ----------- | ------------------ | -------- |
| **YouTube**  | Google Cloud API | `use cache` | `halfHour`         | -        |
| **PTT**      | 爬蟲專案         | `use cache` | `halfHour`         | 每10分鐘 |
| **BBC**      | 爬蟲專案         | `use cache` | `halfHour`         | 每30分鐘 |
| **Google**   | 爬蟲專案         | `use cache` | `halfHour`         | 每30分鐘 |
| **巴哈姆特** | 官方 API         | `use cache` | `hours`            | -        |
| **Komica**   | 爬蟲專案         | `use cache` | `halfHour`         | 每30分鐘 |

### 📡 API 配額資訊

#### YouTube Data API v3

- **每日配額**: 10,000 Queries
- **每分鐘配額**: 1,800,000 Queries
- **提供商**: Google Cloud Platform

#### 其他 API

- **巴哈姆特**: 使用官方 Get API
- **PTT/BBC/Google/Komica**: 透過 [Trend Scraper](https://github.com/garylin0969/trend-scraper) 爬蟲專案提供 JSON 靜態檔。

## 🚀 快速開始

### 環境需求

- Node.js 20+ (配合 Next.js 16)
- pnpm (推薦) 或 npm

### 安裝步驟

```bash
# 複製專案
git clone https://github.com/garylin0969/hot-now.git
cd hot-now

# 安裝依賴
pnpm install

# 設定環境變數
cp .env.local
# 編輯 .env.local 填入必要的 API 金鑰

# 啟動開發伺服器
pnpm dev
```

### 環境變數設定

```env
# YouTube API
NEXT_PRIVATE_YOUTUBE_API_KEY=your_youtube_api_key

# 爬蟲專案資料來源
NEXT_PUBLIC_GITHUB_REPO_URL=https://garylin0969.github.io/trend-scraper/data
```

## 📁 專案結構

```
hot-now/
├── public/                    # 靜態資源
├── src/
│   ├── app/                   # Next.js App Router (Server Components)
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首頁 (整合 Suspense 與 Tabs)
│   │   └── ...
│   ├── components/            # React 元件 (Atomic Design)
│   │   ├── atoms/             # 原子 (BaseImage, Button...)
│   │   ├── molecules/         # 分子 (ArticleCard, Shortcuts...)
│   │   ├── organisms/         # 有機體 (GamerContent, Header, Footer...)
│   │   └── ui/                # Shadcn UI 基礎元件
│   ├── constants/             # 常數定義
│   ├── hooks/                 # 自定義 Hooks
│   ├── providers/             # Context Providers
│   ├── services/              # API 服務層 (Fetch & 快取邏輯)
│   ├── store/                 # Zustand 狀態管理
│   ├── types/                 # TypeScript 型別定義
│   └── utils/                 # 工具函式
├── next.config.ts             # Next.js 設定 (Cache Profiles)
└── ...
```

## 🌟 特色說明

### 元件級快取 (Component-level Caching)

為了避免 Vercel 流量被消耗過快，並解決 API Rate Limit 問題，本專案大量採用 Next.js 16 的現代化快取策略：

- **`use cache` 指令**: 針對個別內容元件進行快取，而非整個頁面。
- **`cacheLife` Profiles**: 在 `next.config.ts` 中自定義 `halfHour` 等快取生命週期，平衡內容新鮮度與效能。
- **Streaming & Suspense**: 配合串流載入，讓使用者能立即看到頁面框架，個別內容區塊在完成快取讀取或 API 請求後自動出現。

## 🚀 部署資訊

### Vercel 部署

- **平台**: Vercel
- **域名**: 透過 GoDaddy 購買，使用 subdomain 設定
- **自動部署**: 推送到 main 分支自動觸發
- **環境變數**: 在 Vercel 控制台設定

## 📊 監控與分析

### Google Analytics

- **追蹤 ID**: G-F0MRGZ2J39
- **資料保護**: 遵循隱私政策
- **匿名化**: 不收集個人識別資訊

## 🔒 隱私政策

Hot Now 重視使用者隱私：

- 不收集個人識別資訊
- 僅使用 Google Analytics 進行匿名統計
- 所有自訂設定 (如快捷方式) 僅儲存在本地瀏覽器
- 詳細資訊請參考[隱私政策頁面](https://hotnow.garylin.dev/privacy)

## 🛠️ 開發工具

- **Turbopack**: 使用 Next.js 內建的 Rust 構建工具，提供極速的開發體驗。
- **ESLint / Prettier**: 確保程式碼品質與風格一致。
