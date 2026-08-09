# GA4 / Search Console 連携手順

## 現状（2026-08-09 時点）

| 項目 | 状態 |
|---|---|
| GA4 測定 ID | **`G-3S3JEC00N4` 設定済み**。全40ページに反映済み |
| Search Console | **対応済み**。`guidetech.jp` のドメインプロパティを DNS TXT で認証 |
| `gscToken` | **空のままでよい**。ドメインプロパティ認証なので meta タグ不要 |
| 旧・壊れたタグ | `gtag/js?id={{GA4_ID}}` は全ページから除去済み |

DNS は **Netlify DNS**（`dns1〜4.p05.nsone.net`）で管理。TXT の追加・確認は
Netlify → Domains → guidetech.jp → DNS records から。

**デプロイ後にまだ残っている作業は「4. デプロイ後にやること」を参照。**

以下は再設定・引き継ぎ用の記録。

---

## 1. GA4 プロパティを作る（完了済み）

1. https://analytics.google.com/ にログイン
2. 管理（左下の歯車）→ **作成** → **プロパティ**
3. プロパティ名: `guidetech.jp`
   - レポートのタイムゾーン: 日本
   - 通貨: 日本円（レポート用。売上計上はしないので何でも可）
4. ビジネス情報 → 利用目的は「見込み顧客の獲得」あたりを選択
5. **データストリーム** → **ウェブ** を選択
   - ウェブサイトの URL: `https://guidetech.jp`
   - ストリーム名: `guidetech.jp`
6. 作成後に表示される **測定 ID**（`G-` で始まる 10〜12 桁）をコピー

> 拡張計測機能（スクロール、離脱クリック、サイト内検索）は既定でオンのまま推奨。

---

## 2. Search Console のプロパティを作る（完了済み）

https://search.google.com/search-console で **プロパティを追加**。2 方式ある。

### 推奨: ドメインプロパティ（DNS 認証）
- 入力: `guidetech.jp`
- 表示される TXT レコードを DNS に追加（お名前.com / Cloudflare / Netlify DNS など、
  guidetech.jp のネームサーバーを管理している側）
- 利点: www 有無・http/https・サブドメインを全部まとめて計測できる
- この方式なら **サイト側のコード変更は不要**

### 代替: URL プレフィックス（HTML タグ認証）
- 入力: `https://guidetech.jp`
- 「HTML タグ」を選び、表示される
  `<meta name="google-site-verification" content="XXXXXXXX">` の
  **content の値だけ**（タグ全体ではない）をコピー
- 下の手順 3 で `gscToken` に貼る

---

## 3. サイトに反映する（完了済み。ID を変える時はここ）

`scripts/site-config.mjs` を編集:

```js
export const ga4Id = "G-3S3JEC00N4";   // 設定済み
export const gscToken = "";             // DNS 認証のため空のままでよい
```

反映:

```bash
node scripts/apply-analytics.mjs
```

対象は `japan-partner/` 配下の全 HTML と、ルートの
`index.html` / `company.html` / `contact.html` / `works.html` / `thanks.html`。
何度実行しても結果は同じ（冪等）。デザイン検討用の
`*-proposal.html` `*-sample.html` `design-directions.html` は意図的に対象外。

コミットして Netlify にデプロイすれば計測開始。

### GTM を使いたい場合
`gtmId` に `GTM-XXXXXXX` を設定すると、gtag の代わりに GTM スニペットが出力される
（GA4 は GTM 側で設定）。`ga4Id` と両方入れた場合は GTM が優先される。

---

## 4. デプロイ後にやること

1. **反映確認**: `curl -s https://guidetech.jp/japan-partner/en/blog/ | grep gtag`
   で測定 ID が出れば OK。GA4 の「リアルタイム」でも自分のアクセスが見えるはず。
2. **サイトマップ送信**: Search Console → サイトマップ → `sitemap.xml` を送信
   （`https://guidetech.jp/sitemap.xml`、現在 32 URL）
3. **新記事のインデックス登録をリクエスト**: Search Console の URL 検査に
   新しい 5 本の記事 URL を入れて「インデックス登録をリクエスト」。
   放置より数日〜数週間早い。
4. **GA4 と Search Console を紐づける**: GA4 → 管理 → サービス間のリンク設定 →
   Search Console のリンク。これをやると GA4 側で検索クエリが見られる。
5. **キーイベント（旧コンバージョン）を設定**: GA4 → 管理 → イベント →
   `page_view` のうち `/japan-partner/en/thanks.html` を対象にしたカスタムイベントを作り、
   キーイベントとしてマーク。問い合わせ完了を計測できる。

---

## 5. 見るべき指標

記事は検索の受け皿なので、最初の 3 か月は次の 3 つだけ見ればよい。

| 指標 | どこで見る | 意味 |
|---|---|---|
| 記事ページの表示回数 / 平均掲載順位 | Search Console → 検索結果 → ページ | 記事が拾われ始めたか |
| 記事 → `/supplier-sourcing.html` または `/contact.html` の遷移 | GA4 → エンゲージメント → 経路データ探索 | 導線が機能しているか |
| `thanks.html` 到達数 | GA4 キーイベント | 実際の問い合わせ |

掲載順位が 20 位前後で止まる記事は、内容不足ではなく内部リンク不足であることが多い。
その場合はサービスページと他記事からの被リンクを増やす。
