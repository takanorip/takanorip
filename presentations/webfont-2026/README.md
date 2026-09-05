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

| トークン | 値 |
|---------|---|
| 背景 | `#001319` |
| キーカラー | `#0064ca` |
| アクセント | `#fdc400` |
| 書体 | [LINE Seed JP](https://fonts.google.com/specimen/LINE+Seed+JP)（Google Fonts） |

構成のリズムは [ABEMAの進化（CADC2024）](https://speakerdeck.com/cyberagentdevelopers/abema-ui-improve) を参考にしている。ブランドは使っていない。

## 構成

1. 導入と印刷史
2. 配信の仕組み
3. CLS回避
4. フォントの選び方（UDの誤解、著作権）
5. バリアブルフォント
6. CSS Fonts Level 4
7. Incremental Font Transfer
8. 持ち帰り3点
