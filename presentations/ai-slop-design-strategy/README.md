# AIスロップを避けるデザイン戦略 — 登壇資料

Kanmu, inc. Design Manager **takanorip** 向けの登壇スライド一式です。

## ファイル構成

| ファイル | 内容 |
|---------|------|
| `slides.md` | Marp形式の本編スライド（全35枚） |
| `speaker-notes.md` | 登壇者ノート（時間配分・Q&A・デモ案） |
| `fingerprint-checklist.md` | 出荷前チェックリスト（配布用） |

## スライドのプレビュー

[Marp](https://marp.app/) を使います。

### VS Code / Cursor

1. 拡張機能 **Marp for VS Code** をインストール
2. `slides.md` を開く
3. 右上のプレビューアイコン、または `Marp: Open Preview` コマンド

### CLI

```bash
npm install -g @marp-team/marp-cli

# HTML
marp slides.md -o slides.html

# PDF（Chrome/Chromium が必要）
marp slides.md --pdf -o slides.pdf

# PowerPoint
marp slides.md --pptx -o slides.pptx
```

## カスタマイズ

- **テーマ**: `slides.md` 先頭の `style:` ブロックで定義（Instrument Serif + IBM Plex Sans JP）
- **フッター・著者名**: YAML front matter の `footer` を編集
- **時間調整**: `speaker-notes.md` の時間配分を参照

## ライセンス

登壇・社内共有・改変は自由に行ってください。出典明記は任意です。
