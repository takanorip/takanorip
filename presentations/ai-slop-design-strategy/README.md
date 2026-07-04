# AIスロップを避けるデザイン戦略 — 登壇資料

Kanmu, inc. Design Manager **takanorip** 向けの登壇スライド一式です。

[tahta](https://tahta.cagdas.io/) — Slidev 向けデザインシステムを採用しています。

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `slides.md` | Slidev + tahta 形式の本編スライド |
| `package.json` | Slidev CLI・tahta テーマ・スクリプト |
| `speaker-notes.md` | 登壇者ノート（時間配分・Q&A・デモ案） |
| `fingerprint-checklist.md` | 出荷前チェックリスト（配布用） |

## プレビュー（Slidev + tahta）

```bash
cd presentations/ai-slop-design-strategy
npm install
npm run dev
```

ブラウザで `http://localhost:3030` が開きます。

### バリアントの変更

`slides.md` 先頭の `themeConfig.variant` を変更すると、全体のビジュアルが切り替わります。

```yaml
themeConfig:
  variant: press   # editorial | brutalist | soft | minimal | paper | atelier | notebook | lagoon | boardroom | signal | muse | poster
```

[tahta ライブエクスプローラー](https://tahta.cagdas.io/) で全13バリアントを確認できます。

### ショートカット

| 操作 | キー |
|-----|------|
| 次のスライド | `→` / `Space` |
| 前のスライド | `←` |
| プレゼンターモード | `Alt+P` |
| 概要表示 | `O` |
| 全画面 | `F` |

## 品質チェック

```bash
npm run lint   # tahta-lint でスライド契約を検証
```

## エクスポート

```bash
# 静的サイト（dist/）
npm run build

# PDF（Playwright/Chromium が必要）
npm run export
```

## カスタマイズ

- **バリアント**: `slides.md` の `themeConfig.variant`
- **アクセント色**: `themeConfig.accent: '#c45c26'`
- **時間調整**: `speaker-notes.md` の時間配分を参照
- **レイアウト一覧**: `node_modules/slidev-theme-tahta/AGENTS.md`

## ライセンス

登壇・社内共有・改変は自由に行ってください。出典明記は任意です。
