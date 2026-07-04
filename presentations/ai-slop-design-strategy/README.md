# AIスロップを避けるデザイン戦略 — 登壇資料

Kanmu, inc. Design Manager **takanorip** 向けの登壇スライド一式です。

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `slides.md` | Slidev形式の本編スライド（35枚） |
| `styles/index.css` | カスタムテーマ（Instrument Serif + IBM Plex Sans JP） |
| `package.json` | Slidev 依存関係とスクリプト |
| `speaker-notes.md` | 登壇者ノート（時間配分・Q&A・デモ案） |
| `fingerprint-checklist.md` | 出荷前チェックリスト（配布用） |

## プレビュー（Slidev）

```bash
cd presentations/ai-slop-design-strategy
npm install
npm run dev
```

ブラウザで `http://localhost:3030` が開きます。

### ショートカット

| 操作 | キー |
|-----|------|
| 次のスライド | `→` / `Space` |
| 前のスライド | `←` |
| プレゼンターモード | `Alt+P` |
| 概要表示 | `O` |
| 全画面 | `F` |

## エクスポート

```bash
# 静的サイト（dist/）
npm run build

# PDF（Playwright/Chromium が必要）
npm run export
```

## カスタマイズ

- **テーマ**: `styles/index.css` を編集
- **著者・タイトル**: `slides.md` 先頭の front matter を編集
- **時間調整**: `speaker-notes.md` の時間配分を参照

## ライセンス

登壇・社内共有・改変は自由に行ってください。出典明記は任意です。
