# AIスロップを避けるデザイン戦略 — 登壇資料

Kanmu, inc. Design Manager **takanorip** 向けの登壇スライド一式です。
[Slidev](https://sli.dev/) で作成しています。

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `slides.md` | Slidev形式の本編スライド（全30枚） |
| `styles/index.css` | 独自テーマのグローバルスタイル |
| `index.html` | フォント（Instrument Serif / IBM Plex Sans JP / IBM Plex Mono）の読み込み |
| `speaker-notes.md` | 登壇者ノート（時間配分・Q&A・デモ案） |
| `fingerprint-checklist.md` | 出荷前チェックリスト（配布用） |

## セットアップ

Node.js >= 20.12 が必要です。

```bash
npm install
```

## スライドのプレビュー

```bash
# 開発サーバー（ホットリロード）: http://localhost:3030/
npm run dev

# 静的サイトとしてビルド（dist/ に出力）
npm run build

# PDF / PNG / PPTX へエクスポート（playwright-chromium が必要）
npm install -D playwright-chromium
npm run export
```

- **プレゼンターモード**: `http://localhost:3030/presenter/`
- **一覧（オーバービュー）**: `http://localhost:3030/overview/`

## カスタマイズ

- **テーマ・配色**: `styles/index.css`（Instrument Serif + IBM Plex Sans JP、`.lead` / `.invert` / `.accent` クラスで背景色を切り替え）
- **フォント**: `index.html` の Google Fonts 読み込み
- **各スライドのレイアウト**: `slides.md` 各スライド先頭のフロントマター（`layout` / `class`）
- **時間調整**: `speaker-notes.md` の時間配分を参照

## ライセンス

登壇・社内共有・改変は自由に行ってください。出典明記は任意です。
