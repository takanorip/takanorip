# AIスロップを避けるデザイン戦略 — 登壇資料

Kanmu, inc. Design Manager **takanorip** 向けの登壇スライド一式です。

**Slidev** 形式（Markdown + frontmatter）で記述されています。

テーマは自作の **「墨と朱（Sumi & Shu）」**。判断基準は `DESIGN.md` に言語化してあります（この資料の主張を、資料自身で実践するため）。

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `slides.md` | Slidev 形式の本編スライド（34枚） |
| `DESIGN.md` | このスライド自身のデザイン仕様（判断基準） |
| `styles/index.css` | カスタムテーマ「墨と朱」 |
| `public/ai-slop-example.html` | 「AIスロップなUI」を意図的に再現した展示用LP |
| `public/ai-slop-example.png` | 上記のスクリーンショット（スライドで使用） |
| `package.json` | Slidev CLI とスクリプト |
| `speaker-notes.md` | 登壇者ノート |
| `fingerprint-checklist.md` | 出荷前チェックリスト |

## スロップ例のデモ

`public/ai-slop-example.html` は、スロップの指紋（Inter / 紫グラデ / ガラスカード / 3等分カード / 絵文字アイコン / 抽象コピー / 低コントラストCTA）に加え、告知バー・バッジ・浮遊カード・カウントダウン・ロゴ帯・料金表・通知トースト・チャット・Cookieバナーまで詰め込んだ反面教師の展示物です。

- Slidev 起動中: http://localhost:3030/ai-slop-example.html で動くデモを開ける
- ファイル単体でもブラウザで開ける（依存なしの1ファイルHTML）

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

- **デザインの判断基準**: まず `DESIGN.md` を読む・更新する
- **テーマ実装**: `styles/index.css` を編集
- **スライドの役割クラス**: 通常（墨）/ `class: chapter`（生成り・章区切り）/ `class: accent`（朱・主張）
- **フォント・トランジション**: `slides.md` 先頭の front matter
- **時間調整**: `speaker-notes.md`

## ライセンス

登壇・社内共有・改変は自由に行ってください。
