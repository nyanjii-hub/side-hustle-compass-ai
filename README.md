# 副業コンパスAI

副業を「診断」するのではなく、あなたの行動特性・強みを言語化して、向いている副業と最初の一歩を提案するWebアプリです。

## サービスURL

（デプロイ後に追記）

---

## このサービスでわかること

10〜15問の選択式質問に答えるだけで、以下が提示されます。

1. **あなたの行動特性** — 自分でも気づいていない特徴・強みを言語化
2. **向いている働き方タイプ** — 5タイプから最も合うものを判定・説明
3. **おすすめ副業ランキング** — 理由付きで上位3〜5件を提示
4. **おすすめしない副業と理由**
5. **今日やること** — 具体的なアクション1つ
6. **7日間ロードマップ** — 最初の1週間の行動計画

---

## 特徴

- **登録不要・完全無料** で使えます
- **営業不要・在宅・初心者向け** の副業のみを対象にしています
- 「何から始めればいいかわからない」人が、その日のうちに動けることを目指しています
- スマートフォンから利用できます

---

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS |
| デプロイ | Vercel |
| 将来的に | Anthropic Claude API |

---

## 開発環境の起動

```bash
npm install
npm run dev
```

http://localhost:3000 で起動します。

---

## 設計ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [PROJECT.md](PROJECT.md) | プロジェクト概要・目的・フェーズ計画 |
| [TODO.md](TODO.md) | MVP実装タスク一覧 |
| [docs/requirements.md](docs/requirements.md) | 要件定義 |
| [docs/screen-design.md](docs/screen-design.md) | 画面設計 |
| [docs/diagnosis-logic.md](docs/diagnosis-logic.md) | 診断ロジック（タグ+プロファイル方式） |
| [docs/questions.md](docs/questions.md) | 質問一覧・タグマッピング |
| [docs/side-hustles.md](docs/side-hustles.md) | 副業データ一覧 |
