# japan-partner/en/ SEO コンテンツ計画

作成: 2026-08-09

## 需要調査の方法と結果

Upwork / Freelancer.com は Cloudflare のボット対策で案件一覧を機械的に取得できなかったため、
**Google サジェスト（実際に検索されている語の一次データ）** を主軸に、
検索結果とマーケットプレイスのプロフィール情報を補助として使った。

サジェストは「実際に人が打ち込んだクエリ」の集計なので、
案件掲示板より母数が大きく、SEO 記事の需要根拠としてはむしろ適切。

### 抽出された実需要クラスタ（英語圏 → 日本）

| クラスタ | 根拠になったサジェスト | 強さ |
|---|---|---|
| **抹茶** | `matcha supplier japan` / `matcha wholesale supplier japan` / `buy wholesale matcha from japan` / `private label japanese matcha` / `japanese supplier for matcha` | ◎ 最大 |
| **トレカ卸** | `how to find japanese pokemon supplier` / `japanese pokemon card wholesale distributors usa` / `japanese distributor for pokemon`（"japanese distributor for" の第1サジェスト） | ◎ |
| **日本製スキンケア / 化粧品OEM** | `japanese skincare wholesale suppliers` / `oem cosmetic manufacturer japan` / `private label japanese skincare` | ○ |
| **和菓子・スナック卸** | `japanese candy wholesale suppliers` / `japanese confectionery wholesale` / `japanese food products wholesale` | ○ |
| **サプライヤー探索一般** | `how to find japanese suppliers` / `how to find japanese manufacturers` / `how to find a distributor in japan` | ○ ハブ |
| **包丁・刃物・工芸** | `japanese kitchen knives wholesale` / `japanese knife blanks wholesale` | △ |
| **アパレルOEM** | `how to find japanese clothing manufacturers` / `private label japan bag` | △ |
| **酒・ウイスキー** | `japanese whiskey wholesale` / `japanese sake import` | △（免許が絡み難度高） |
| **市場参入コンサル（既存路線）** | `japan market entry consulting` / `japan market entry strategy` / `japan market entry support` | ○ |

**共通する構造的インサイト**（＝記事の芯であり、そのまま GuideTech の売り文句になる）:
検索者が本当に詰まっているのは「業者リスト」ではなく、

1. 日本の卸・メーカーは**法人格・国内住所・国内銀行口座・与信審査**を要求する
2. 日本語でないと**そもそも返信が来ない**
3. **相手が実在し支払能力があるか**を海外から検証できない

この 3 つはどれも「日本側に人がいれば解決する」問題。記事 → 相談の動線が自然に成立する。

---

## 公開済み（8本・2026-08-09 デプロイ済み）

すべて `/japan-partner/en/blog/` 配下。`scripts/generate-sourcing-articles.mjs` で生成。

### 第1バッチ

| # | slug | 主要KW | 役割 | 語数 |
|---|---|---|---|---|
| 1 | `how-to-find-japanese-suppliers` | how to find japanese suppliers | **ハブ記事**。他7本へ内部リンク | 1,573 |
| 2 | `how-to-find-matcha-supplier-japan` | matcha supplier japan | 最大需要 | 1,484 |
| 3 | `japanese-pokemon-card-wholesale-guide` | japanese pokemon card wholesale distributors | 競合が薄い | 1,132 |
| 4 | `japanese-skincare-cosmetics-sourcing-guide` | japanese skincare wholesale suppliers | 単価が高い | 1,070 |
| 5 | `japanese-snacks-confectionery-wholesale-guide` | japanese candy wholesale suppliers | 反復購入 | 942 |

### 第2バッチ

| # | slug | 主要KW | 役割 | 語数 |
|---|---|---|---|---|
| 6 | `how-to-verify-a-japanese-company` | verify japanese supplier | **検証ハブ**。全カテゴリ記事から被リンク | 1,482 |
| 7 | `japanese-kitchen-knives-wholesale-sourcing` | japanese kitchen knives wholesale | 高単価・高粗利 | 1,229 |
| 8 | `japanese-trade-shows-sourcing-guide` | japan trade show | 代理出展という明確なサービス需要 | 1,143 |

各記事の構成: 導入 → 5〜7セクション（比較表 / チェックリスト付き）→ CTA ボックス
→ FAQ（FAQPage 構造化データ付き）→ 関連記事。目次は sticky サイドバー。

**内部リンク設計**: ハブ記事(#1)が全7本へ発リンク。検証記事(#6)は全カテゴリ記事から
被リンクを受ける第2のハブ。カテゴリ記事どうしは横に2〜3本ずつ接続。

導線: 記事 → `/supplier-sourcing.html`（ガイド8枚のカード掲載）または `/contact.html`。
問い合わせ種別に `Supplier sourcing / product sourcing` と `Supplier verification` を追加済み。

---

## 第3バッチ候補（優先度順）

| 優先 | タイトル案 | 主要KW |
|---|---|---|
| 1 | Japanese Apparel and Bag OEM: Private Label Sourcing | japanese clothing manufacturers / private label japan bag |
| 2 | Importing Sake and Japanese Whisky: Licences and Reality | japanese whiskey wholesale / sake import |
| 3 | Japan Market Entry for SaaS: What the First 90 Days Cost | japan market entry consulting |
| 4 | Japanese Ceramics and Homeware Wholesale | japanese ceramics wholesale |
| 5 | Shipping from Japan: Incoterms, Consolidation and Customs | shipping from japan to usa / import from japan |

**目安ペース**: 月2本。1本ずつ順位を確認してから次を出すほうが内部リンク設計を調整しやすい。
第1・第2バッチの掲載順位が Search Console に出るまで 4〜8週間かかるので、
それを見てから第3バッチのテーマを最終決定するのが合理的。

---

## 既知の課題（未対応・要判断）

1. **既存4記事の重複コンテンツ**
   `japanese-translation-services-pricing-guide` など旧4記事は、
   同一の6段落が各記事の全セクションに繰り返し挿入されている（1記事あたり同じ文が5回、
   4記事×5回＝各段落が計20回サイト内に出現）。
   これは検索評価上かなり不利。旧ジェネレータ `generate-japan-partner-pages.mjs` の
   `support` 配列が原因。**書き直しを推奨**。
   （なお同スクリプトは本番の内容より古く、実行すると en/index.html などが巻き戻るため
   現状そのままでは再実行してはいけない。）

2. **記事のカバー画像がない**
   第1バッチは意図的に画像なし。既存の画像は SaaS 文脈のもので、
   抹茶・トレカ記事に流用すると内容と乖離する。
   OG 画像は共通の `og-default.webp` を使用中。カテゴリ別の画像を用意すると
   ブログ一覧とSNS共有の見栄えが上がる。

3. **スペイン語版がない**
   第1バッチは英語のみ。ES 版を作る場合は hreflang の相互参照も必要。
   物販ソーシングの検索需要はスペイン語圏でも存在するが、英語より小さい。

4. **`work.html` に実績がない**
   ソーシング記事から来た読者は「日本で誰が何をやったか」を見に行く。
   匿名でよいので、ソーシング系の実績記述を追加すると転換率が上がる。

5. **価格ページが placeholder のまま**
   `{{PRICE_TRANSLATION}}` 等が本番に出ている。記事流入が増える前に埋めるべき。

6. **EU 向け Cookie 同意バナーが未実装**
   GA4（`G-3S3JEC00N4`）を全ページに導入済み。ES ページと英語ページで EU 訪問者を
   想定している以上、GDPR / ePrivacy 上は事前同意が必要。実装は未着手。
