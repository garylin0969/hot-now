# 🔥 Hot Now | 熱門話題一把抓

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
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
- **Reddit** - 熱門文章（全站、台灣相關、中國相關）
- **Komica(K島)** - 熱門文章

### 🔧 實用工具

- **自訂超連結** - 快速存取常用網站
- **深色模式** - 護眼閱讀體驗
- **響應式設計** - 跨裝置完美適配

## 🏗️ 技術架構

### 前端技術

- **框架**: Next.js 15 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4
- **UI 元件**: Shadcn UI
- **狀態管理**: Zustand
- **資料請求**: TanStack Query (React Query)
- **主題**: next-themes
- **圖示**: Lucide React

### 資料來源與快取策略

| 平台         | 資料來源         | 更新方式 | 快取時間 | 爬蟲頻率 |
| ------------ | ---------------- | -------- | -------- | -------- |
| **YouTube**  | Google Cloud API | ISR      | 30分鐘   | -        |
| **PTT**      | 爬蟲專案         | ISR      | 30分鐘   | 每10分鐘 |
| **BBC**      | 爬蟲專案         | ISR      | 30分鐘   | 每30分鐘 |
| **Google**   | 爬蟲專案         | ISR      | 30分鐘   | 每30分鐘 |
| **巴哈姆特** | 官方 API         | ISR      | 60分鐘   | -        |
| **Reddit**   | 爬蟲專案         | ISR      | 60分鐘   | 每30分鐘 |
| **Komica**   | 爬蟲專案         | ISR      | 30分鐘   | 每30分鐘 |

### 📡 API 配額資訊

#### YouTube Data API v3

- **每日配額**: 10,000 Queries
- **每分鐘配額**: 1,800,000 Queries
- **提供商**: Google Cloud Platform

#### 其他 API

- **巴哈姆特**: 使用官方 Get API
- **PTT/BBC/Google/Reddit/Komica**: 透過爬蟲專案提供

## 🚀 快速開始

### 環境需求

- Node.js 18+
- pnpm (推薦) 或 npm

### 安裝步驟

```bash
# 複製專案
git clone https://github.com/garylin0969/hot-now.git
cd hot-now

# 安裝依賴
pnpm install

# 設定環境變數
cp .env.example .env.local
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
│   ├── favicon/              # 網站圖標
│   └── image-not-found.png   # 預設圖片
├── src/
│   ├── services/            # API 相關
│   │   ├── bbc-api.ts       # BBC 新聞 API
│   │   ├── gamer-api.ts     # 巴哈姆特 API
│   │   ├── google-api.ts    # Google 趨勢 API
│   │   ├── komica-api.ts    # Komica API
│   │   ├── ptt-api.ts       # PTT API
│   │   ├── reddit-api.ts    # Reddit API
│   │   └── youtube-api.ts   # YouTube API
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首頁
│   │   ├── privacy/         # 隱私政策頁面
│   │   └── globals.css      # 全域樣式
│   ├── components/           # React 元件
│   │   ├── atoms/           # 原子元件
│   │   ├── molecules/       # 分子元件
│   │   ├── organisms/       # 有機體元件
│   │   └── ui/              # UI 元件庫
│   ├── hooks/               # 自定義 Hooks
│   ├── providers/           # Context Providers
│   ├── store/               # Zustand 狀態管理
│   ├── types/               # TypeScript 型別定義
│   └── utils/               # 工具函式
├── components.json          # shadcn/ui 設定
├── next.config.ts          # Next.js 設定
├── package.json            # 專案依賴
├── tailwind.config.ts      # Tailwind 設定
└── tsconfig.json           # TypeScript 設定
```

## 🎨 設計系統

### 元件架構

採用 Atomic Design 設計模式：

- **Atoms**: 基礎元件 (按鈕、輸入框等)
- **Molecules**: 組合元件 (卡片、表單等)
- **Organisms**: 複雜元件 (頁首、內容區塊等)

### 主題系統

- 支援明亮/深色主題
- 使用 CSS Variables 實現主題切換
- 遵循系統偏好設定

## 📱 功能說明

### 分頁導覽

- **YouTube**: 多類別影片瀏覽
- **PTT**: 24小時熱門文章
- **BBC**: 中文新聞最新資訊
- **Google**: 4小時內熱搜關鍵字
- **巴哈姆特**: 多板塊熱門話題
- **Reddit**: 多版塊熱門文章
- **Komica**: K島熱門討論

### 自訂超連結

- 新增/編輯/刪除個人常用網站
- 自動獲取網站 favicon
- 支援拖拽排序
- 本地儲存設定

## 🔧 開發指令

```bash
# 開發環境
pnpm dev

# 建構專案
pnpm build

# 啟動正式環境
pnpm start

# 程式碼檢查
pnpm lint

# 格式化程式碼
pnpm format

# 檢查格式
pnpm format:check
```

## 🌟 特色說明

### ISR (Incremental Static Regeneration)

為了避免 Vercel 流量被消耗過快，所有外部 API 都採用 ISR 策略：

- 在指定時間內提供快取內容
- 背景更新資料，確保內容新鮮度
- 大幅降低 API 請求頻率

### Reddit 特殊處理

Reddit API 會遇到 403 或 429 錯誤，因此改用爬蟲資料：

- 使用 ISR 策略，伺服器端獲取資料
- 60分鐘快取時間
- 避免 API 請求限制問題
- 原 axois、useQuery 邏輯先保留但未用到

### 爬蟲資料整合

部分平台（PTT、BBC、Google、Reddit、Komica）透過獨立的爬蟲專案提供資料：

- 避免直接爬取造成的不穩定
- 統一的資料格式
- 獨立的更新頻率控制
- 解決 API 限制問題

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

### 錯誤監控

- 內建錯誤邊界
- 優雅的錯誤處理
- 使用者友善的錯誤訊息

## 🔒 隱私政策

Hot Now 重視使用者隱私：

- 不收集個人識別資訊
- 僅使用 Google Analytics 進行匿名統計
- 所有自訂設定儲存在本地
- 詳細資訊請參考[隱私政策頁面](https://hotnow.garylin.dev/privacy)

## 🛠️ 開發工具

### 程式碼品質

- **ESLint**: 程式碼檢查
- **Prettier**: 程式碼格式化
- **TypeScript**: 型別安全

### 開發體驗

- **Turbopack**: 快速編譯
- **React DevTools**: 除錯工具
- **React Query DevTools**: 查詢狀態監控
