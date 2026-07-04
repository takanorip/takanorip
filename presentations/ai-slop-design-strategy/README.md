# AIスロップを避けるデザイン戦略 — 登壇資料

Kanmu, inc. Design Manager **takanorip** 向けの登壇スライド一式です。

**Slidev** 形式（Markdown + frontmatter）で記述されています。

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `slides.md` | Slidev 形式の本編スライド（35枚） |
| `styles/index.css` | カスタムテーマ |
| `package.json` | Slidev CLI とスクリプト |
| `speaker-notes.md` | 登壇者ノート |
| `fingerprint-checklist.md` | 出荷前チェックリスト |

## プレビュー

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

## Slidev 形式について

各スライドは `---` で区切り、frontmatter でレイアウトを指定します。

```markdown
---
layout: two-cols
---

# 左カラム

::right::

# 右カラム
```

利用可能なレイアウト: `cover` / `center` / `two-cols` / `default` など（[Slidev ドキュメント](https://sli.dev/guide/)）

## エクスポート

```bash
npm run build   # 静的サイト（dist/）
npm run export  # PDF
```

## カスタマイズ

- **テーマ**: `styles/index.css` を編集
- **フォント・トランジション**: `slides.md` 先頭の front matter
- **時間調整**: `speaker-notes.md`

## ライセンス

登壇・社内共有・改変は自由に行ってください。
