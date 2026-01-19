/**
 * @fileoverview 快捷方式相關型別定義
 */

/** 快捷方式的資料介面 */
export interface Shortcut {
    /** 唯一標識符 */
    id: string;
    /** 目標 URL */
    url: string;
    /** 顯示標題 */
    title: string;
}
