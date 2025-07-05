# 🔥 Hot Now | 熱門話題一把抓

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-部署-000000?style=flat-square&logo=vercel)](https://vercel.com/)

Hot Now 是一個整合各大平台熱門內容的資訊聚合網站，讓你一站式瀏覽各種熱門話題，隨時掌握最新趨勢。

## 🌐 網站連結

- **官方網站**: [https://hotnow.garylin.dev](https://hotnow.garylin.dev)
- **Vercel 部署**: [https://vercel.com/garylin0969s-projects/garylin0969-hot-now](https://vercel.com/garylin0969s-projects/garylin0969-hot-now)
- **爬蟲專案**: [https://github.com/garylin0969/trend-scraper](https://github.com/garylin0969/trend-scraper)

## ✨ 功能特色

### 📊 多平台整合

- **YouTube** - 發燒影片（最新、遊戲、音樂、電影）
- **PTT** - 24小時熱門文章
- **Google** - 熱搜榜（過去4小時）
- **巴哈姆特** - 熱門話題（全站、遊戲、動漫、生活）
- **Reddit** - 熱門文章（全站、台灣相關、中國相關）
- **Komica(K島)** - 熱門文章

### 🔧 實用工具

- **自訂超連結** - 快速存取常用網站
- **深色模式** - 護眼閱讀體驗
- **響應式設計** - 跨裝置完美適配
- **PWA 支援** - 可安裝到手機/桌面，支援離線瀏覽
- **Chrome 插件整合** - 新分頁直接顯示熱門內容

## 🏗️ 技術架構

### 前端技術棧

- **框架**: Next.js 15 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4
- **UI 元件**: Radix UI
- **狀態管理**: Zustand
- **資料請求**: TanStack Query (React Query)
- **主題**: next-themes
- **圖示**: Lucide React
- **PWA**: Next.js 15 官方 PWA 指南實現
- **Service Worker**: 手動實現，配合 ISR 時間優化

### 🔄 PWA 快取策略

基於 Next.js 15 官方 PWA 指南，手動實現 Service Worker，配合 ISR 時間優化：

| 平台/資源    | ISR 時間 | SW 快取時間 | 策略                 | 說明                       |
| ------------ | -------- | ----------- | -------------------- | -------------------------- |
| **PTT**      | 5分鐘    | 4分鐘       | StaleWhileRevalidate | 提前1分鐘，避免請求衝突    |
| **Google**   | 30分鐘   | 25分鐘      | StaleWhileRevalidate | 提前5分鐘，智慧背景更新    |
| **YouTube**  | 30分鐘   | 25分鐘      | StaleWhileRevalidate | 提前5分鐘，配合 API 配額   |
| **Gamer**    | 60分鐘   | 50分鐘      | StaleWhileRevalidate | 提前10分鐘，減少伺服器壓力 |
| **Reddit**   | 60分鐘   | 50分鐘      | StaleWhileRevalidate | 提前10分鐘，保持資料新鮮   |
| **Komica**   | 30分鐘   | 25分鐘      | StaleWhileRevalidate | 提前5分鐘，平衡更新頻率    |
| **靜態資源** | -        | 永久        | CacheFirst           | CSS、JS、圖片等長期快取    |

### 🔌 Chrome 插件整合

Hot Now 提供 Chrome 插件，將網站設為新分頁頁面，完美解決 iframe 空白問題：

- **消除空白閃爍** - 透過 Service Worker 立即載入快取內容
- **瞬間載入體驗** - 從 2-3 秒減少到 0.5 秒內
- **智慧背景更新** - 配合 ISR 策略，保持資料最新
- **多層快取機制** - Service Worker + ISR 雙重保障
- **離線支援** - 網路不穩時仍可瀏覽快取內容
- **流量節省** - 減少不必要的 API 請求

### 資料來源與快取策略

| 平台         | 資料來源         | 更新方式 | 快取時間 | 爬蟲頻率 |
| ------------ | ---------------- | -------- | -------- | -------- |
| **YouTube**  | Google Cloud API | ISR      | 30分鐘   | -        |
| **PTT**      | 爬蟲專案         | ISR      | 5分鐘    | 每10分鐘 |
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
- **PTT/Google/Reddit/Komica**: 透過爬蟲專案提供

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
│   ├── sw.js                 # Service Worker（手動實現）
│   └── image-not-found.png   # 預設圖片
├── src/
│   ├── api/                  # API 相關
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

### 爬蟲資料整合

部分平台（PTT、Google、Reddit、Komica）透過獨立的爬蟲專案提供資料：

- 避免直接爬取造成的不穩定
- 統一的資料格式
- 獨立的更新頻率控制
- 解決 API 限制問題

### PWA + Chrome 插件優化

為了解決 Chrome 插件 iframe 載入時的空白問題，實施了 PWA 優化策略：

#### 🎯 解決的問題

- **iframe 瞬間空白** - Chrome 插件載入網站時的白屏問題
- **重複請求** - 避免每次開新分頁都重新請求 API
- **載入延遲** - 減少網路請求時間

#### ⚡ 優化效果

- **載入時間** - 從 2-3 秒減少到 0.5 秒內
- **使用者體驗** - 消除空白閃爍，流暢載入
- **流量節省** - 減少 Vercel 和 API 服務商的請求量
- **離線可用** - 即使網路不穩也能正常瀏覽

#### 🔧 技術實現

1. **基於 Next.js 15 官方 PWA 指南** - 移除 next-pwa，使用原生 Web API
2. **手動 Service Worker** - 精確控制快取策略和時間
3. **配合 ISR 優化** - Service Worker 快取時間略短於 ISR，避免衝突
4. **智慧 TTL 管理** - 自動檢查快取過期時間，精準背景更新
5. **解決 Turbopack 兼容** - 完全消除 webpack 配置衝突警告
6. **安全性標頭** - 遵循 Next.js 官方 PWA 指南

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

- **Turbopack**: 快速編譯（已解決 PWA 兼容性問題）
- **React DevTools**: 除錯工具
- **React Query DevTools**: 查詢狀態監控
- **Service Worker DevTools**: 快取策略除錯與監控

## 🛠️ 問題解決歷程

### PWA 實現演進

**原始方案（next-pwa）**：

- 使用 `next-pwa` 套件自動生成 Service Worker
- 遇到 Next.js 15 + Turbopack 兼容性問題
- 開發環境出現 Service Worker 404 錯誤

**最終方案（Next.js 15 官方）**：

- 基於 [Next.js 15 官方 PWA 指南](https://nextjs.org/docs/app/guides/progressive-web-apps)
- 手動實現 Service Worker，完全控制快取策略
- 配合 ISR 時間優化，避免請求衝突
- 解決所有兼容性問題，提供更好的效能

### Chrome 插件優化

**問題**：iframe 載入網站時出現瞬間空白
**解決**：Service Worker + ISR 雙重快取機制
**效果**：載入時間從 2-3 秒減少到 0.5 秒內
