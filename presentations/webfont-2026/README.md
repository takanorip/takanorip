# 今さら理解するウェブフォント2026

フロントエンドカンファレンス関西2026（レギュラー30分）向け Slidev 資料。

登壇: **takanorip** / Kanmu, inc. Design Manager

## 動かし方

```bash
cd presentations/webfont-2026
npm install
npm run dev
```

ブラウザで `http://localhost:3030` を開く。

- 矢印キー / スペースで進む
- `o` で概要（グリッド）
- バリアブル・`font-palette`・`size-adjust` のスライドはその場で操作できる

## デザイン

| トークン | 値 | 使いどころ |
|---------|---|-----------|
| 背景 | `#ffffff` | 全ページ共通の紙面 |
| インク | `#001319` | 見出しと本文 |
| キーカラー | `#0064ca` | キッカー、章番号、コード、罫線の点 |
| アクセント | `#fdc400` | 蛍光ペン風のマーカー（`.marker`） |
| 書体 | [LINE Seed JP](https://fonts.google.com/specimen/LINE+Seed+JP)（Google Fonts） | 見出し・本文とも |

白基調・左揃え・上下の罫線・広い行間という紙面の作りは [デザインシステムの力（Spindle）](https://speakerdeck.com/spindle/the-power-of-design-system) を参考にしている。ブランドは使っていない。

上下の罫線とラベルは `global-top.vue` が全ページに描画する（表紙のみ非表示）。

## 構成

1. 導入と印刷史
2. 配信の仕組み
3. CLS回避
4. フォントの選び方（UDの誤解、著作権）
5. バリアブルフォント
6. CSS Fonts Level 4
7. Incremental Font Transfer
8. 持ち帰り3点
