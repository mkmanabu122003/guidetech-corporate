// Generates the English "Sourcing from Japan" article set and rebuilds the
// blog index and sitemap.
//
//   node scripts/generate-sourcing-articles.mjs
//
// These articles target buyer-intent searches for sourcing physical products
// from Japan (matcha, TCG, J-beauty, confectionery) and funnel to
// /japan-partner/en/supplier-sourcing.html and the contact form.
//
// Existing articles under japan-partner/en/blog/ and the Spanish tree are not
// touched; this script only writes the files it owns, plus blog/index.html and
// sitemap.xml.

import fs from "node:fs";
import path from "node:path";
import { site, serviceName, today, analyticsBlock } from "./site-config.mjs";

const root = process.cwd();
const OUT_DIR = "japan-partner/en/blog";

/* ------------------------------------------------------------------ *
 * Content
 * ------------------------------------------------------------------ */

const posts = [
  {
    slug: "how-to-find-japanese-suppliers",
    seoTitle: "How to Find Japanese Suppliers",
    seoDescription: "The five sourcing channels that work in Japan, why most wholesale routes are closed to foreign buyers, and how to verify a company before you pay.",
    kw: "how to find japanese suppliers",
    title: "How to Find Japanese Suppliers: A Practical Guide for Overseas Buyers",
    description:
      "How to find Japanese suppliers and manufacturers from overseas: the five channels that actually work, why most wholesale routes are closed to foreign buyers, and how to verify a company before you pay.",
    lead:
      "Sourcing from Japan does not work the way sourcing from China works. There is no single dominant marketplace where you filter by minimum order quantity and message a thousand factories. Most Japanese manufacturers have no English website, no export desk, and little interest in a first email that opens with a price demand. The suppliers exist, and many of them will export. The path to them simply runs through channels that are close to invisible from outside the country.",
    sections: [
      {
        h: "Why Japanese sourcing feels closed from the outside",
        blocks: [
          ["p", "There are three structural reasons, and none of them is that Japanese companies dislike foreign business."],
          ["ul", [
            "<strong>Domestic demand has historically been enough.</strong> For a great many mid-sized Japanese makers, export is an optional side activity rather than a growth strategy. There is no export department because no one has needed one.",
            "<strong>Distribution runs through layers.</strong> Goods move through wholesalers (<em>tonya</em>) and general trading companies (<em>shosha</em>) rather than direct factory sales. The maker you found may be contractually unable to sell to you even if they want to.",
            "<strong>Trust precedes terms.</strong> An unknown overseas company asking for a quotation in English reads as risk, not opportunity. The commercial conversation starts after the credibility conversation, not before it."
          ]],
          ["p", "The practical implication is that your effort goes into being introduced and qualified, not into comparison-shopping. Buyers who treat Japan like a supplier database get silence and conclude the market is closed. It is not closed. It is sequenced differently."]
        ]
      },
      {
        h: "The five channels that actually work",
        blocks: [
          ["table", {
            head: ["Channel", "What it is", "Best for", "The catch"],
            rows: [
              ["Trading companies (商社)", "Export-capable intermediaries that hold supplier relationships and handle documentation", "First orders, mixed categories, buyers with no Japanese entity", "Margin is added, and they may decline to name the actual maker"],
              ["Wholesalers (問屋)", "Layered B2B distributors serving Japanese retail", "Branded consumer goods in volume", "Almost always require a Japanese corporate account"],
              ["Trade shows", "FOODEX JAPAN, Beautyworld Japan, Tokyo International Gift Show, Interior Lifestyle Tokyo and sector equivalents", "Discovering makers and comparing many of them in a few days", "You need to be physically in Japan, and to follow up in Japanese"],
              ["Public bodies and associations", "JETRO, prefectural export desks, industry associations", "Verified lists of companies that are already export-minded", "Lists are a starting point, not a shortlist"],
              ["Direct outreach", "Contact form or email to the maker, in Japanese", "Niche, craft and specialist products with no distributor", "Low reply rate without a credible introduction"]
            ]
          }],
          ["p", "Most successful sourcing programmes use two or three of these at once: a trade show or association list to build a candidate set, direct outreach to qualify, and a trading company or Japan-side partner to actually transact."]
        ]
      },
      {
        h: "The Japanese-entity wall",
        blocks: [
          ["p", "The routes that look easiest from a search engine — domestic wholesale platforms, distributor accounts, some direct maker sales — are the ones most likely to be closed to a company with no presence in Japan. What gets asked for is consistent:"],
          ["ul", [
            "A registered Japanese company and its corporate number. Some wholesalers additionally require two or more years of trading history.",
            "A Japanese delivery address, and frequently a Japanese bank account for settlement.",
            "A wholesale account application and credit review before the first order ships.",
            "Category licences where they apply: an antiques dealer licence for anything secondhand, an alcohol sales licence for sake and spirits, food business registration for certain food handling."
          ]],
          ["p", "There are two lawful ways past this wall. Buy from a Japanese company that is already set up to export, which is the trading-company route. Or work with a Japan-side partner who holds the account, buys domestically, and acts as exporter of record on your behalf."],
          ["note", "Tax point that catches almost everyone: goods bought inside Japan carry consumption tax. Exports are zero-rated, but the exemption belongs to the exporter, who must be a registered taxable business in Japan and retain export permits and supporting evidence for seven years. If you buy domestically and forward the parcel yourself, you will generally pay that tax and never recover it."]
        ]
      },
      {
        h: "How to verify a Japanese supplier before you pay",
        blocks: [
          ["p", "The common failure in Japan sourcing is not outright fraud. It is paying a fourth intermediary at first-tier prices, or ordering from a company whose real capacity is a fraction of what the quotation implies. Both are avoidable with public records."],
          ["ul", [
            "<strong>Corporate number register.</strong> The National Tax Agency publishes a free, searchable register of corporate numbers, registered names and addresses. A company that cannot produce a corporate number is not a registered Japanese corporation.",
            "<strong>Commercial register extract.</strong> Available from the Legal Affairs Bureau, this shows incorporation date, stated capital, directors and the history of changes. Anyone in Japan can request one for any company.",
            "<strong>Credit reports.</strong> Teikoku Databank and Tokyo Shoko Research are the two standard Japanese credit agencies. A report costs money and answers the solvency question properly.",
            "<strong>Certifications, by number.</strong> JAS, ISO, HACCP, FSSC 22000 and organic schemes all have issuing bodies and certificate numbers. Ask for the number and the scope, not a logo pasted into a PDF.",
            "<strong>Someone physically present.</strong> A visit, or a proxy visit, confirms that the registered address is a factory rather than a serviced office, and that the people on the call are the people running the line."
          ]],
          ["sample", {
            title: "Supplier verification checklist",
            rows: [
              ["Identity", "Corporate number, registered name and address match", "Public register"],
              ["Standing", "Incorporation date, capital, directors, credit report", "Registry / agency"],
              ["Capability", "Certificates by number, capacity, export experience", "Documented"],
              ["Reality", "Site visit or proxy visit, photographs, people met", "Confirmed"]
            ]
          }]
        ]
      },
      {
        h: "How to write a first inquiry that gets answered",
        blocks: [
          ["ul", [
            "Write in Japanese. Machine translation is acceptable if it is checked; an English-only inquiry is frequently filed as spam.",
            "Lead with who you are: company name, country, what you sell, through which channels, and how long you have been trading.",
            "Be concrete about volume and timing, and be honest when it is small. A credible small number beats a vague large one.",
            "Ask directly whether they export and whether export is handled by a trading company. If it is, ask for the introduction.",
            "Do not open with a request for the lowest possible price. It signals that you are shopping, not building.",
            "Expect a slower reply than you are used to. Silence after one email is normal, and a polite follow-up a week later is not considered rude."
          ]],
          ["p", "The structure below has a much higher reply rate than a bare request for a quotation, because it answers the questions the recipient is actually asking themselves."],
          ["sample", {
            title: "Inquiry structure that gets replies",
            rows: [
              ["Opening", "Who you are, and how you found them", "Credibility"],
              ["Context", "Your market, channel and trading history", "Reassurance"],
              ["Request", "Specific product, indicative volume, timeline", "Clarity"],
              ["Question", "Do you export, or who handles export for you", "Actionable"],
              ["Close", "A short call or a paid sample as the next step", "Low commitment"]
            ]
          }]
        ]
      },
      {
        h: "What a realistic first order looks like",
        blocks: [
          ["ul", [
            "Minimum order quantities are set per SKU and are rarely negotiable on a first order.",
            "Samples are usually paid for, including shipping. Treat a refusal to sell samples as a finding.",
            "Most Japanese makers quote ex works or free on board a Japanese port. Arranging the forwarder, the consolidation and the destination clearance is your side of the line.",
            "Export documentation means a commercial invoice, a packing list, and a certificate of origin where a trade agreement makes it worth having.",
            "First orders are typically paid in advance by bank transfer. Letters of credit are uncommon at small values, and open account terms are earned over time, not requested up front."
          ]],
          ["p", "On timing, plan a quarter rather than a fortnight. Two to six weeks to reach a credible shortlist, four to eight weeks through samples and agreement, then a production and shipping window that depends entirely on the category. Buyers who compress this stage are the ones who end up with a supplier they never verified."]
        ]
      }
    ],
    cta: {
      heading: "Need someone in Japan doing this for you?",
      body: "GuideTech is a Tokyo-based operating partner. We research and shortlist Japanese suppliers, make first contact in Japanese, verify the company against public records, and coordinate the relationship on your behalf.",
      href: "/japan-partner/en/supplier-sourcing",
      text: "See how supplier sourcing works"
    },
    faq: [
      ["Can I buy directly from a Japanese manufacturer without a Japanese company?", "Sometimes. Makers that already export usually can sell to an overseas buyer directly. Makers that sell only into domestic distribution usually cannot, regardless of how much you want to order. In that case the route is a trading company or a Japan-side partner acting as exporter of record."],
      ["Do Japanese suppliers speak English?", "Export-oriented companies often manage written English well. Assume Japanese for first contact and for anything commercially important, and treat English capability as a bonus rather than a requirement you can filter on."],
      ["Is there an Alibaba for Japan?", "Not in the same sense. Domestic B2B wholesale platforms exist and are large, but they are built for Japanese retailers: a Japanese business account and a domestic delivery address are typically required, and listings are in Japanese."],
      ["How long does Japanese supplier sourcing take?", "Plan on a quarter from starting research to a first shipment for a straightforward category, and longer where licensing, certification or custom manufacturing is involved."]
    ],
    related: ["how-to-verify-a-japanese-company", "how-to-find-matcha-supplier-japan", "japanese-pokemon-card-wholesale-guide", "japanese-skincare-cosmetics-sourcing-guide", "japanese-snacks-confectionery-wholesale-guide", "japanese-kitchen-knives-wholesale-sourcing", "japanese-trade-shows-sourcing-guide"]
  },

  {
    slug: "how-to-find-matcha-supplier-japan",
    seoTitle: "How to Find a Matcha Supplier in Japan",
    seoDescription: "Growing regions, the four supplier types, what ceremonial grade really means, the tencha shortage, and the certificates to demand before ordering.",
    kw: "matcha supplier japan",
    title: "How to Find a Matcha Supplier in Japan",
    description:
      "How to find and verify a matcha supplier in Japan: growing regions, the four supplier types, what ceremonial grade actually means, the tencha shortage, certificates to demand, and realistic MOQs.",
    lead:
      "Matcha is currently the most requested Japanese sourcing category, and it is also the one where overseas buyers get burned most often. Demand has grown for five consecutive years against a raw material whose supply cannot expand quickly. That gap has produced allocation, steep price escalation, and a widening tier of resellers who present themselves as Japanese producers.",
    sections: [
      {
        h: "Know what you are actually buying",
        blocks: [
          ["p", "Matcha is made from tencha: tea leaves shaded for several weeks before harvest, steamed, dried without rolling, then stripped of stems and veins and milled into powder. Almost every quality variable is fixed before milling — cultivar, length of shading, harvest timing, and how thoroughly the stems and veins were removed. The mill determines particle size and texture, not the underlying quality."],
          ["note", "\"Ceremonial grade\" is not a legal standard and not a Japanese industry standard. It is a Western marketing term with no certifying body and no defined threshold for anything. A supplier who sells you on the grade name rather than on harvest, cultivar and origin is selling you a label."],
          ["p", "Ask instead for the things that can be verified: growing region and ideally the farm, cultivar, crop year, whether it is first flush, the shading period in days, whether it is stone-milled or ball-milled, particle size, and a colour measurement. A supplier who can answer all of these is doing the work. A supplier who answers \"Japan, premium quality\" is a trader who has not asked their own supplier."]
        ]
      },
      {
        h: "Where matcha comes from, and what each origin means",
        blocks: [
          ["table", {
            head: ["Region", "Reputation", "Practical note for buyers"],
            rows: [
              ["Uji, Kyoto", "The highest prestige and the strongest origin story", "First-flush tencha yields fell sharply across the 2024–2025 seasons and auction prices rose steeply. Allocation is tight and pricing is the highest in the market."],
              ["Nishio, Aichi", "Long-established matcha specialisation", "A common and reliable source for mid-tier and volume grades."],
              ["Kagoshima", "Modern, scaled, fast-growing production", "Now a mainstream source for volume and organic matcha, and increasingly used to fill gaps left by Uji."],
              ["Shizuoka", "Japan's largest tea-producing prefecture overall", "Deep processing and blending infrastructure rather than a matcha-specific origin claim."],
              ["Yame, Fukuoka", "Premium region, known for gyokuro", "Small volumes, high quality, limited export capacity."]
            ]
          }],
          ["p", "A sourcing strategy that experienced buyers have converged on: reserve Uji for the premium SKUs where the origin is genuinely part of the product story and the price can carry it, and default to Kagoshima or Nishio for latte, culinary and ingredient tiers where the milk, sugar or batter will hide the nuance you paid for."]
        ]
      },
      {
        h: "The supply reality you are buying into",
        blocks: [
          ["ul", [
            "Tencha supply cannot be increased on demand. The bushes and the shading infrastructure take years to bring into full production, and only a limited number of growers do it well.",
            "Heat and irregular rainfall hit recent shading seasons, and top-grade Uji yields fell substantially.",
            "Auction prices for premium tencha have risen dramatically rather than incrementally.",
            "Established buyers hold the allocation. New accounts are served last, and in a shortage that means served little or not at all."
          ]],
          ["note", "Red flag worth memorising: an unfamiliar supplier offering large volumes of premium first-flush matcha at short notice and below prevailing market price is describing a product the supply chain does not currently have. Assume blending, a later harvest, non-Japanese origin, or stock that does not exist, until documentation proves otherwise."]
        ]
      },
      {
        h: "Four types of matcha supplier — pick the right one",
        blocks: [
          ["table", {
            head: ["Type", "What they do", "Right for you if", "Watch for"],
            rows: [
              ["Tea farm or producer", "Grows and processes its own leaf", "You want traceability and a farm story at modest volume", "Narrow grade range and often no export documentation capability"],
              ["Tea wholesaler or processor", "Blends and mills to a specification", "You need lot-to-lot consistency more than a single-origin claim", "Origin becomes \"blended\" — ask in writing what is in the blend and from where"],
              ["Exporter or trading company", "Handles export, documentation and consolidation", "You have no Japanese entity and want one counterparty", "Added margin, and they may decline to name the producer"],
              ["Private-label packer", "Fills your tins, sachets or pouches", "You are launching a branded product", "Packaging and tooling minimums sit on top of the tea minimum"]
            ]
          }],
          ["p", "These are not mutually exclusive, and the mistake is assuming the cheapest quotation and the most traceable product can come from the same counterparty. They usually cannot."]
        ]
      },
      {
        h: "Verification: what to demand before the first order",
        blocks: [
          ["ul", [
            "<strong>Origin evidence</strong> traceable to region and, where the price implies it, the farm — stated with crop year and harvest.",
            "<strong>Residual pesticide testing</strong> against the standard of your destination market. EU maximum residue limits are stricter than Japanese limits for several active substances, and this is a common and expensive surprise at the border.",
            "<strong>Radioactivity testing</strong> where your market or your customers require it.",
            "<strong>Organic certification with the certificate number and scope</strong>, plus a Transaction Certificate covering your specific lot for JAS, USDA NOP or EU organic. An organic claim without a lot-level Transaction Certificate is not verifiable and is not defensible to your own customers.",
            "<strong>A full specification sheet</strong>: particle size, colour value, moisture, and any catechin or amino acid figures if you intend to make claims from them.",
            "<strong>Retained samples from the actual production lot</strong> rather than a showcase sample prepared for buyers."
          ]],
          ["p", "The sample discipline that prevents most disputes is three-step: buy a paid sample, then place a small first lot, then verify that the lot matches the sample before committing to volume. Buyers who skip the middle step are the ones who later discover that the sample and the shipment were never from the same tea."]
        ]
      },
      {
        h: "Price, minimum order quantity, and what drives cost",
        blocks: [
          ["p", "Published 2026 figures put direct-from-Japan Uji ceremonial-tier wholesale in the region of USD 250–500 per kilogram at minimums of roughly 10–25 kg, with volume and culinary tiers materially lower. Reported ranges vary widely between sources and are moving quickly in the current market, so treat any published figure as a reference point to negotiate against rather than a quotation."],
          ["ul", [
            "Harvest timing and shading duration, which set the raw material cost before anything else happens",
            "Region, which is partly quality and partly brand",
            "Milling method — a traditional stone mill produces on the order of tens of grams per hour, which is why genuinely stone-milled matcha cannot be cheap at volume",
            "Organic certification and the testing regime attached to it",
            "Packaging format, and whether nitrogen flushing and light-barrier materials are included",
            "Export handling, documentation and cold or controlled storage"
          ]],
          ["note", "If a quotation is priced per tin rather than per kilogram, convert it to per kilogram before comparing anything. Tin sizes are not standard, and the difference between a 30 g and a 40 g tin is frequently where a quotation stops being competitive."]
        ]
      },
      {
        h: "The mistakes that cost the most",
        blocks: [
          ["ul", [
            "Buying a ceremonial tier for a latte programme, and paying a large premium for characteristics that milk and sugar remove.",
            "Committing to a year of volume before seeing lot-to-lot consistency across at least two production lots.",
            "Skipping test certificates, then meeting your destination market's residue limits at customs rather than at the desk.",
            "Paying in full up front to a company whose corporate number you never checked.",
            "Assuming a Japanese company name means Japanese-grown leaf. Ask where the tea was grown, and get the answer in writing."
          ]]
        ]
      }
    ],
    cta: {
      heading: "Want a verified matcha shortlist instead of a search results page?",
      body: "GuideTech works from Tokyo. We identify candidate producers and wholesalers, make contact in Japanese, request specifications and certificates, check the company against Japanese public records, and hand you a shortlist with the trade-offs written down.",
      href: "/japan-partner/en/contact",
      text: "Talk to us about matcha sourcing"
    },
    faq: [
      ["Can I buy matcha directly from a Japanese farm?", "Some farms export and are set up for it. Most are not: small producers rarely have the documentation capacity or the volume to serve an overseas trade buyer, so a wholesaler, exporter or Japan-side agent usually sits in between."],
      ["What minimum order quantity should I expect?", "It varies enormously by tier. Specialists may sell high grades from a few kilograms, while volume and ingredient tiers commonly start at 25–100 kg or more. Private label adds separate packaging minimums on top."],
      ["Is ceremonial grade meaningless?", "As a regulated term, yes — no body defines or certifies it. As industry shorthand for first-flush, stone-milled, drinking-grade matcha it is usable, but only when the supplier can support it with harvest, cultivar and origin."],
      ["How do I confirm the matcha is really grown in Japan?", "Ask for origin documentation and crop year in writing, and use organic Transaction Certificates where they apply, because those are issued against specific lots and can be checked with the certifying body."]
    ],
    related: ["how-to-find-japanese-suppliers", "how-to-verify-a-japanese-company", "japanese-snacks-confectionery-wholesale-guide", "japanese-trade-shows-sourcing-guide"]
  },

  {
    slug: "japanese-pokemon-card-wholesale-guide",
    seoTitle: "Japanese Trading Card Wholesale Explained",
    seoDescription: "Why overseas buyers cannot open a Japanese TCG wholesale account, what distributors require, how allocation works, and the lawful routes in.",
    kw: "japanese pokemon card wholesale distributors",
    title: "Japanese Trading Card Wholesale: How Japanese Distribution Actually Works",
    description:
      "Why overseas buyers cannot open a Japanese TCG wholesale account, what Japanese distributors require, how allocation works, and the lawful routes into Japanese-language sealed product.",
    lead:
      "Searches for Japanese trading card wholesale distributors are among the highest-intent sourcing queries aimed at Japan, and among the most misunderstood. Buyers arrive expecting a distributor list and a price sheet. What they meet is a domestic distribution system that was never designed for them, wrapped in a resale layer that is very good at looking like the real thing.",
    sections: [
      {
        h: "There is no overseas wholesale channel",
        blocks: [
          ["p", "Japanese-language trading card product is manufactured and distributed for the Japanese domestic market. It reaches shops through Japanese wholesalers serving Japanese retail — hobby, toy, book and convenience channels — not through an export desk taking orders from abroad. When you find a company that says it can wholesale Japanese sealed product to you internationally, you have found a reseller somewhere down that chain rather than a source."],
          ["p", "That reseller may be entirely legitimate and genuinely useful. The point is to price them as what they are, and to stop looking for a tier that does not exist."]
        ]
      },
      {
        h: "The layers, and where margin and allocation are decided",
        blocks: [
          ["flow", ["Publisher / licensor", "Primary wholesaler", "Secondary wholesaler", "Retailer", "Export reseller"]],
          ["p", "Each layer adds margin, and — more importantly — each layer is where allocation of scarce product is decided. By the time a case reaches a company willing to sell it to an overseas buyer, it has usually passed through at least three sets of hands, each of which had a commercial reason to keep the good product and pass on the rest."]
        ]
      },
      {
        h: "What a Japanese wholesaler asks for before opening an account",
        blocks: [
          ["ul", [
            "A registered Japanese company. Some wholesalers additionally require two or more years of trading history before they will review an application at all.",
            "A Japanese business address and a Japanese bank account.",
            "Wholesale membership registration followed by a credit and trading review.",
            "An antiques dealer licence where secondhand goods are involved — which covers singles and any previously owned sealed product. Dealing in used goods as a business without it is an offence under the Secondhand Articles Dealer Act, carrying up to three years' imprisonment or a fine of up to one million yen.",
            "Frequently, evidence of a real sales channel: a physical shop, a registered online storefront, or demonstrable turnover."
          ]],
          ["p", "None of these are things an overseas buyer can negotiate away by email, and a wholesaler that waives them for a stranger is telling you something about how it operates."]
        ]
      },
      {
        h: "Allocation, not ordering",
        blocks: [
          ["p", "For sought-after sets you do not place an order for a quantity. You receive an allocation. That allocation follows account history, total purchasing across the wholesaler's whole catalogue including slow-moving lines, payment record, and relationship. A brand-new account is at the bottom of that list whether it is Japanese or foreign."],
          ["note", "This is why an offer of guaranteed sealed cases of a hot set, in any quantity, at or near Japanese retail price, is close to a working definition of a scam. The people who hold that allocation have better things to do with it than cold-email overseas buyers."]
        ]
      },
      {
        h: "The routes that actually exist",
        blocks: [
          ["table", {
            head: ["Route", "How it works", "Realistic for", "Limits"],
            rows: [
              ["Japanese export wholesaler", "A Japanese company holds the domestic accounts and sells to overseas trade buyers", "Most overseas buyers, as a starting point", "Margin above domestic wholesale, and still constrained by allocation"],
              ["Japan-side agent or importer of record", "A partner in Japan purchases, consolidates, and handles export documentation and tax treatment", "Buyers who want control, continuity and volume", "Requires a trusted partner and a clear written agreement"],
              ["Your own Japanese entity", "You incorporate in Japan and apply for accounts directly", "Long-horizon operations with real capital", "Registration, accounting, licensing, and years of history before meaningful allocation"],
              ["Retail and marketplace buying", "Buying at Japanese retail or on domestic marketplaces through a proxy", "Small volumes, singles, and market testing", "No wholesale margin, and consumption tax is usually unrecoverable"]
            ]
          }]
        ]
      },
      {
        h: "Tax, customs, and the paperwork nobody mentions",
        blocks: [
          ["ul", [
            "Goods purchased inside Japan include consumption tax. Exports are zero-rated, but the exemption belongs to the registered exporter, who must retain export permits and supporting evidence for seven years. If your supplier is not exporting as a business, that tax is a cost you will not get back.",
            "Your own market's import duty and tax apply on arrival, and both classification and declared value matter more in this category than most buyers expect.",
            "Counterfeit and resealed product is a real risk here. Customs seizure is your loss, not your supplier's, unless your contract says otherwise.",
            "Put the basics in writing before the first payment: who is exporter of record, what happens on short or damaged shipments, and what evidence of authenticity and provenance you receive with each lot."
          ]]
        ]
      },
      {
        h: "Red flags",
        blocks: [
          ["ul", [
            "No corporate number, and no registered address you can check against the public register.",
            "Prices below Japanese domestic retail for product that is under allocation.",
            "Claims of being an official or direct distributor, unsupported by any documentation.",
            "First orders payable only by irreversible methods, in full, up front.",
            "Product photographs that appear elsewhere online.",
            "Pressure to decide immediately because an allocation window is supposedly closing."
          ]]
        ]
      }
    ],
    cta: {
      heading: "Want someone in Japan to check the counterparty first?",
      body: "GuideTech verifies Japanese companies against public registers, makes contact in Japanese, establishes what a supplier can actually allocate, and coordinates the relationship from Tokyo. That is usually cheaper than one bad first order.",
      href: "/japan-partner/en/contact",
      text: "Ask us to verify a Japanese supplier"
    },
    faq: [
      ["Can I open an account with a Japanese wholesaler from overseas?", "Generally not. Wholesale accounts are built around a registered Japanese company, a Japanese address and bank account, and a credit review. The practical routes are a Japanese export wholesaler, a Japan-side partner acting for you, or incorporating in Japan yourself."],
      ["Do I need an antiques dealer licence?", "If you deal in secondhand goods as a business in Japan — which includes singles and previously owned sealed product — then yes, that licence is required, and trading without it is a criminal offence. If you only buy new sealed product from a wholesaler and export it, it does not apply to you, but it may well apply to your Japanese counterparty."],
      ["Why is everything sold out?", "Because popular sets are allocated rather than freely ordered. Supply is committed to established accounts long before it reaches anyone approaching the market cold."],
      ["Is buying at Japanese retail and exporting viable?", "At small scale it can be, for testing or for singles. It does not scale: there is no wholesale margin, consumption tax is usually unrecoverable, and retail purchase limits on popular product are common."]
    ],
    related: ["how-to-verify-a-japanese-company", "how-to-find-japanese-suppliers", "japanese-snacks-confectionery-wholesale-guide"]
  },

  {
    slug: "japanese-skincare-cosmetics-sourcing-guide",
    seoTitle: "Japanese Skincare Sourcing: Wholesale vs OEM",
    seoDescription: "Authorised wholesale, the risks of parallel import, and OEM private label in Japan: licences, minimums, lead times and destination compliance.",
    kw: "japanese skincare wholesale suppliers",
    title: "Japanese Skincare and Cosmetics Sourcing: Wholesale vs OEM",
    description:
      "How to source Japanese skincare: authorised wholesale, the risks of parallel import, and OEM private-label manufacturing in Japan — licences, MOQs, lead times and destination-market compliance.",
    lead:
      "Japanese skincare is one of the strongest sourcing categories for overseas buyers, and one where three quite different businesses get discussed as if they were the same thing. Reselling existing Japanese brands, importing them outside the brand's own channel, and manufacturing your own product in Japan have different economics, different risks and almost nothing in common operationally.",
    sections: [
      {
        h: "Three different businesses, routinely confused",
        blocks: [
          ["table", {
            head: ["Route", "What you are buying", "Control over product", "Entry requirement"],
            rows: [
              ["Authorised wholesale", "Existing Japanese brands, to resell", "None", "A distributor agreement and an agreed territory"],
              ["Parallel or grey import", "The same goods, outside the brand's channel", "None", "Easy to start, hard to sustain"],
              ["OEM or private label", "Manufacturing under your own brand", "Full", "Formula, minimums, testing and market registration"]
            ]
          }],
          ["p", "Most buyers who ask for wholesale actually want the third one, and most who ask for OEM have underestimated what it costs to get there. Deciding which business you are in is the first useful step."]
        ]
      },
      {
        h: "Why brands restrict overseas wholesale",
        blocks: [
          ["p", "A Japanese brand that declines your wholesale request is usually not being difficult. It is protecting territory agreements with existing distributors, price and presentation consistency, marketplace listings that get gated when unauthorised sellers appear, and a customer support obligation it cannot discharge in a market it does not serve."],
          ["p", "Expect to be asked which markets you sell into, through which channels, and whether you sell on marketplaces. An answer of \"everywhere, mainly through marketplaces\" is the fastest way to a polite refusal."],
          ["note", "Parallel importing is often lawful, but it is structurally fragile: no warranty support, no marketing assets, listings that can be gated at any time, and no protection at all on the day the brand appoints an exclusive distributor in your market. It is a way to test demand, not a foundation to build on."]
        ]
      },
      {
        h: "OEM and private label in Japan",
        blocks: [
          ["p", "Manufacturing cosmetics in Japan is a licensed activity under the Act on Securing Quality, Efficacy and Safety of Products Including Pharmaceuticals and Medical Devices. The factory needs a manufacturing licence, and the entity that places the product on the Japanese market needs a marketing authorisation. For an overseas brand the practical consequence is usually favourable: if you buy finished goods from a licensed Japanese OEM and export them, the Japanese licensing obligations sit with the manufacturer and the authorisation holder rather than with you. That changes if goods are ever returned into Japan."],
          ["ul", [
            "Minimum order quantities commonly fall in the 1,000–3,000 unit range per SKU, with some specialists going lower at a materially higher unit price.",
            "Lead times of roughly six to twelve months from brief to first shipment are normal once stability testing and packaging tooling are included.",
            "Stock formulas are fast and cheap but not exclusive to you. Custom formulas are slow and expensive, and whether they are actually yours depends entirely on the contract.",
            "Packaging is frequently the critical path rather than the formulation. Japanese packaging quality is a genuine selling point and a genuine lead-time problem.",
            "Settle in writing who owns the formula, what exclusivity applies and for how long, and what happens to the specification if a raw material is discontinued."
          ]]
        ]
      },
      {
        h: "Made in Japan does not mean import-ready",
        blocks: [
          ["p", "The compliance that governs your product is your destination market's, not Japan's. A manufacturer that is fully compliant in Japan may be unable to give you the documentation your own regulator requires."],
          ["ul", [
            "<strong>EU and UK</strong>: product notification, a Responsible Person established in the region, a complete Product Information File, and a safety assessment by a qualified assessor.",
            "<strong>United States</strong>: facility registration and product listing obligations introduced under the Modernization of Cosmetics Regulation Act, alongside existing labelling rules.",
            "<strong>Ingredients</strong>: some UV filters and other actives permitted in Japan are restricted or unapproved elsewhere, and the reverse is also true. Reformulation after tooling is the expensive version of finding this out.",
            "<strong>Labelling</strong>: Japanese-only labelling is not acceptable in most markets. INCI naming, claims rules and language requirements are your responsibility, not the manufacturer's."
          ]],
          ["note", "Ask the OEM at the first meeting whether they can supply an INCI list, a safety data sheet, allergen and heavy metals data, stability and challenge test results, and a dossier suitable for a European safety report. Some can, comfortably. Many domestic-focused manufacturers cannot, and discovering that after packaging tooling has been paid for is one of the more expensive mistakes in this category."]
        ]
      },
      {
        h: "Verification and cost structure",
        blocks: [
          ["ul", [
            "Confirm the manufacturing licence and, where relevant, the marketing authorisation — by number, not by assertion.",
            "Ask which brands they currently produce for. They may not name them, but the shape of the answer is informative.",
            "Establish whether they have exported before, and to which regulatory regions.",
            "Budget separately for formulation, stability and compatibility testing, packaging tooling, first production, destination registration and the safety assessment. Buyers who budget only for unit cost are typically out by a wide margin.",
            "Check the company against the Japanese corporate register and, for a meaningful order, a credit report."
          ]]
        ]
      }
    ],
    cta: {
      heading: "Sourcing J-beauty, or building a brand in Japan?",
      body: "GuideTech works from Tokyo across both routes: approaching brands for authorised wholesale in Japanese, and identifying and qualifying OEM manufacturers against your regulatory requirements rather than only your price target.",
      href: "/japan-partner/en/supplier-sourcing",
      text: "See how supplier sourcing works"
    },
    faq: [
      ["Can I get wholesale pricing on Japanese skincare brands?", "Sometimes, but authorised wholesale normally requires a distributor conversation, a defined territory and channel commitments. Brands with existing distributors in your market will usually decline."],
      ["Do I need a Japanese licence to make my own brand in Japan?", "Generally not, if you buy finished goods from a licensed Japanese manufacturer and export them. The Japanese licensing obligations sit with the manufacturer and the marketing authorisation holder. Your obligations are in your destination market."],
      ["What minimum order quantity should I expect for OEM?", "Commonly 1,000–3,000 units per SKU, though this varies widely by format and by manufacturer. Packaging minimums are often the binding constraint rather than the formulation."],
      ["How long does a private-label project take?", "Roughly six to twelve months from brief to first shipment once stability testing and packaging are included. Compressing that usually means using a stock formula and stock packaging."]
    ],
    related: ["how-to-find-japanese-suppliers", "how-to-verify-a-japanese-company", "japanese-trade-shows-sourcing-guide"]
  },

  {
    slug: "japanese-snacks-confectionery-wholesale-guide",
    seoTitle: "Japanese Snack and Confectionery Wholesale",
    seoDescription: "Japan's distribution layers, the shelf-life mathematics that catches new importers, and the allergen and additive rules your market will apply.",
    kw: "japanese candy wholesale suppliers",
    title: "Japanese Snacks and Confectionery Wholesale: A Sourcing Guide",
    description:
      "How to source Japanese snacks and confectionery at wholesale: the domestic distribution layers, shelf-life mathematics, allergen and additive compliance, and building an assortment that actually repeats.",
    lead:
      "Japanese snacks look like an easy category. The products are inexpensive, instantly recognisable and sell themselves on novelty. The difficulty is entirely operational: the distribution layer is closed to overseas buyers, the shelf life is short relative to sea freight, and the labelling that is perfectly legal in Japan is not legal in your market.",
    sections: [
      {
        h: "Where the products actually come from",
        blocks: [
          ["ul", [
            "<strong>Major manufacturers</strong> sell through layered domestic wholesalers rather than to overseas buyers. Direct accounts exist but are reserved for large domestic customers.",
            "<strong>Regional and local makers</strong> produce the items that give an assortment its character. Many have never exported and have no English documentation at all.",
            "<strong>OEM and private-label producers</strong> will make your own brand, and are frequently the better route if you intend to build something repeatable rather than resell novelty."
          ]],
          ["p", "The domestic wholesale platforms that would solve this instantly are built for Japanese retailers, and generally require a Japanese business account and a domestic delivery address. This is the single most common dead end for buyers in this category."]
        ]
      },
      {
        h: "Shelf life is the whole business",
        blocks: [
          ["p", "Japanese snacks frequently carry short best-before dates by international standards — a matter of months from production for many items, and considerably less for chocolate and anything fresh. Sea freight to Europe or North America takes weeks door to door, and customs clearance adds more. Then your own warehousing and retail sell-through consume what is left."],
          ["ul", [
            "Ask for the production date, not only the expiry date. They are different questions and only one of them tells you what you are buying.",
            "Specify a minimum remaining shelf life on arrival in the purchase agreement. A common commercial term is two thirds or seventy-five per cent of total life remaining at delivery.",
            "Model the timeline before you order: production, consolidation, sailing, clearance, your warehouse, your channel. If the arithmetic does not leave a sellable window, the price does not matter.",
            "Air freight rescues specific high-value lines. It does not rescue a general assortment."
          ]],
          ["note", "This is where most first-time importers in this category lose money. Not on price, and not on a bad supplier — on stock that arrives with too little life left to sell through."]
        ]
      },
      {
        h: "Labelling and compliance for your market",
        blocks: [
          ["ul", [
            "<strong>Allergen frameworks differ.</strong> Japan mandates its own specific list; the European Union requires fourteen declared allergens and the United States requires nine. A Japanese label will not satisfy either.",
            "<strong>Labels are in Japanese.</strong> You need a compliant destination-language label with correct ingredient, allergen, additive and nutrition declarations, which means obtaining full specifications from the manufacturer rather than translating the pack.",
            "<strong>Additives and colourings diverge.</strong> Some permitted in Japan are not permitted in the EU or the US. This is a product-selection question, not a paperwork question.",
            "<strong>Animal-derived ingredients attract extra controls.</strong> Products containing meat or dairy face additional import restrictions in many markets, and gelatine in a sweet is enough to trigger them."
          ]],
          ["p", "Get the full specification sheet for every SKU before you commit to an assortment, not after. Dropping three lines from a pallet because the additives are not approved is much cheaper at the planning stage."]
        ]
      },
      {
        h: "Temperature, seasonality and breakage",
        blocks: [
          ["ul", [
            "Chocolate and coated products need temperature control through a Japanese summer, and the summer is long and humid.",
            "Seasonal and limited-edition flavours are produced once. If it sells, you frequently cannot reorder it, which makes them poor anchors for a range.",
            "Individually wrapped items survive the journey far better than boxed items, which arrive crushed at a rate that surprises new importers.",
            "Consolidation matters: this category is many SKUs in small quantities, which is precisely the shape of order a consolidator earns their fee on."
          ]]
        ]
      },
      {
        h: "Building an assortment that sells rather than one that impresses",
        blocks: [
          ["p", "The recurring mistake is buying what is exciting in Japan instead of what your channel will reorder. Novelty drives the first order and almost never the second. A durable range is usually a small core of recognisable items that repeat, surrounded by a rotating margin of seasonal product that creates a reason to look again."],
          ["p", "That structure also fixes the shelf-life problem, because the core lines are the ones worth negotiating production dates and remaining-life terms on."]
        ]
      }
    ],
    cta: {
      heading: "Need a Japan-side buyer for a mixed assortment?",
      body: "GuideTech sources from Tokyo: identifying makers and wholesalers, negotiating in Japanese, collecting full specification sheets for compliance review, and consolidating many small SKUs into one shipment.",
      href: "/japan-partner/en/contact",
      text: "Talk to us about food and snack sourcing"
    },
    faq: [
      ["Can I use Japanese wholesale platforms from overseas?", "Generally not. They are built for Japanese retailers and typically require a Japanese business account and a domestic delivery address. A Japan-side buyer or a trading company is the usual route."],
      ["What shelf life should I insist on?", "Specify remaining life on arrival rather than total life. Two thirds or seventy-five per cent of total shelf life remaining at delivery is a common and defensible commercial term."],
      ["Do I need to relabel Japanese snacks?", "In almost every market, yes. Allergen, ingredient, additive and nutrition declarations must comply with your destination rules in the destination language, which requires full specifications from the manufacturer."],
      ["Is it cheaper to buy from a Japanese exporter or to source direct?", "Direct is cheaper per unit and considerably more expensive in coordination, compliance and consolidation. For a mixed assortment of many SKUs, an exporter or a Japan-side buyer is often the lower total cost."]
    ],
    related: ["how-to-find-japanese-suppliers", "how-to-verify-a-japanese-company", "japanese-trade-shows-sourcing-guide"]
  },

  {
    slug: "how-to-verify-a-japanese-company",
    seoTitle: "How to Verify a Japanese Company",
    seoDescription: "Check a Japanese supplier with public records: the free corporate register, the commercial register extract, credit reports and safe payment terms.",
    kw: "verify japanese supplier",
    title: "How to Verify a Japanese Company Before You Pay",
    description:
      "Check a Japanese supplier using public records: the free corporate number register, the commercial register extract, credit reports, and the payment structure that protects you when verification runs out.",
    lead:
      "Almost every bad outcome in Japanese sourcing traces back to the same omission. The buyer verified the product and never verified the counterparty. Japan happens to be unusually good for this kind of due diligence: company identity is a matter of public record, the registers are cheap, and anyone may request an extract for any company. The obstacle is not access. It is that the records are in Japanese and most overseas buyers do not know they exist.",
    sections: [
      {
        h: "What you can check for free in ten minutes",
        blocks: [
          ["p", "The National Tax Agency publishes a free, searchable register of every corporation in Japan — roughly 4.5 million of them. It gives the three basic facts: registered company name, registered head office address, and the 13-digit corporate number. It also records changes and closures, so a company that has moved, renamed itself or been dissolved shows that history."],
          ["ul", [
            "If the counterparty cannot give you a corporate number, they are not a registered Japanese corporation. That is not automatically disqualifying — sole proprietorships are legal and common — but it changes the risk profile and it should be a conscious decision rather than a surprise.",
            "Check that the registered name matches the name on the quotation, exactly. Trading names and registered names differ more often than you would expect.",
            "Check that the registered address matches the address on their documents and website.",
            "Check the invoice registration number if they give you one. Registered invoice issuers are published by the same agency, and the number is the corporate number prefixed with a T."
          ]],
          ["note", "A name or address mismatch between the quotation, the website and the register is the single cheapest red flag to find and the most frequently ignored. It costs nothing to check and it catches both impersonation and the more common case of an intermediary presenting a maker's identity as their own."]
        ]
      },
      {
        h: "The commercial register extract",
        blocks: [
          ["p", "The free register gives identity. The commercial register extract gives substance. In Japan this is the certificate of registered matters, obtainable from the Legal Affairs Bureau over the counter or by post for a few hundred yen per copy, or viewed online through the registry information service for less. Anyone may request the extract for any company. You do not need the company's permission and they are not told."],
          ["p", "What to actually read when you get one:"],
          ["table", {
            head: ["Field", "What it tells you", "What should make you pause"],
            rows: [
              ["Incorporation date", "How long the company has existed", "Incorporated recently, but quoting on a large order with confidence"],
              ["Stated capital", "The capital formally committed", "Capital that is trivial relative to the order you are placing"],
              ["Directors", "Who is legally responsible", "Frequent turnover, or a single director who is also the sole contact"],
              ["Business purposes", "The activities the company is registered to conduct", "The thing they are selling you is not among them"],
              ["Change history", "Renames, relocations, capital changes", "Repeated name or address changes over a short period"]
            ]
          }],
          ["p", "None of these is proof of anything on its own. Read together they tell you whether you are dealing with an established operating business or a shell that was assembled recently, and that distinction is usually the one that matters."]
        ]
      },
      {
        h: "Credit reports, and when they are worth it",
        blocks: [
          ["p", "Teikoku Databank and Tokyo Shoko Research are the two standard Japanese commercial credit agencies. A report is paid and is written in Japanese, and it goes well beyond the registers: a credit score, estimated turnover, payment behaviour, principal banks, main customers and suppliers, and often a narrative assessment from an analyst who has spoken to the company."],
          ["p", "The economics are simple. A report costs a fraction of one bad shipment. If the order value is meaningful, or if you are about to make the supplier a dependency rather than a transaction, buy the report. Below that threshold the free registers plus a sample order carry the risk adequately."]
        ]
      },
      {
        h: "Signals that cost nothing",
        blocks: [
          ["ul", [
            "<strong>The address, on a map.</strong> Street view will tell you in seconds whether the registered head office is a factory, an office building, or a residential apartment. Virtual offices and rental mailboxes are legal and common, and they are also what you would expect to see if the company is a one-person intermediary rather than a maker.",
            "<strong>The phone number.</strong> A landline in the prefecture where the company claims to operate is a mild positive signal. A mobile number as the only contact for a company claiming factory capacity is a mild negative one.",
            "<strong>Domain age.</strong> A registration date from last quarter under a website claiming decades of history is worth a question.",
            "<strong>The Official Gazette.</strong> Bankruptcy filings, civil rehabilitation and corporate reorganisation notices are published there, and they are searchable.",
            "<strong>What they will put in writing.</strong> A supplier who answers specific questions about origin, capacity and certification by email, in writing, is behaving differently from one who keeps the answers verbal."
          ]]
        ]
      },
      {
        h: "What verification cannot tell you",
        blocks: [
          ["p", "It is worth being precise about the limits, because buyers routinely over-read a clean register. The registers establish that a company exists, who runs it, and roughly how solid it is. They say nothing at all about whether it can actually produce what it quoted, whether it holds allocation of a scarce product, whether its quality is consistent between lots, or whether it will ship on time."],
          ["p", "Those questions are answered by three things only: a paid sample, a small first order that you inspect against the sample, and someone physically present at the site. Verification tells you whether it is safe to start. It does not tell you whether it is worth continuing."]
        ]
      },
      {
        h: "Scale the effort to the order",
        blocks: [
          ["table", {
            head: ["Order size", "Minimum verification", "Payment structure"],
            rows: [
              ["Sample / trial", "Corporate number register, address on a map", "Pay in full; the amount is the cost of the information"],
              ["First commercial order", "Register plus commercial register extract", "Deposit and balance, balance against shipping documents"],
              ["Recurring supply", "Add a credit report", "Negotiated terms, with the first few orders still split"],
              ["Dependency or exclusivity", "Credit report plus a site visit or proxy visit", "Contract, defined remedies, and a second qualified source"]
            ]
          }]
        ]
      },
      {
        h: "Payment structure is the protection verification cannot give you",
        blocks: [
          ["ul", [
            "<strong>Pay the registered corporate account, and check the account name against the register.</strong> A request to pay a personal account, an account in a different name, or an account in a third country is the point at which the conversation should stop. This single check prevents most supplier-impersonation fraud.",
            "Avoid paying one hundred per cent in advance on a first commercial order. A deposit with the balance released against shipping documents is normal and is not an insult to ask for.",
            "Treat a change of bank details mid-transaction as fraud until proven otherwise, and confirm it by phone on a number you already had, never on a number in the email requesting the change.",
            "Above a threshold that suits your balance sheet, use a letter of credit or an escrow arrangement, and accept the cost as insurance rather than overhead."
          ]]
        ]
      }
    ],
    cta: {
      heading: "Want the checks run for you, in Japanese?",
      body: "GuideTech runs supplier verification from Tokyo: corporate number and register checks, commercial register extracts, credit reports where the order justifies one, and a physical or proxy visit to confirm that the address is what the documents claim.",
      href: "/japan-partner/en/contact",
      text: "Ask us to verify a Japanese supplier"
    },
    faq: [
      ["Can I search the Japanese corporate register in English?", "The National Tax Agency's corporate number site offers an English interface for basic searches. The commercial register extracts and credit reports are issued in Japanese only, so they usually need someone who reads Japanese to be useful."],
      ["Can I obtain a commercial register extract from overseas?", "The counter, postal and online routes are all built for people in Japan, and the online service in particular expects a Japanese payment method. In practice an overseas buyer uses a Japan-side agent or a licensed administrative or judicial scrivener to obtain it."],
      ["What if my supplier is a sole proprietor rather than a company?", "Sole proprietors are not in the corporate register, so the identity check shifts to the invoice registration number, any licences the category requires, references from other buyers, and a smaller first order. It is not a reason to walk away, but it is a reason to keep the exposure small for longer."],
      ["How much should verification cost?", "Free for the identity check, a few hundred yen for a register extract, and a meaningful but not large amount for a credit report. Set the spend against the order value: the point at which verification feels expensive is usually the point at which you have not priced the downside correctly."]
    ],
    related: ["how-to-find-japanese-suppliers", "japanese-pokemon-card-wholesale-guide", "how-to-find-matcha-supplier-japan"]
  },

  {
    slug: "japanese-kitchen-knives-wholesale-sourcing",
    seoTitle: "Japanese Kitchen Knives Wholesale Guide",
    seoDescription: "The four production regions, forged versus stamped, the steel families, realistic minimums, and the export rules that catch new importers.",
    kw: "japanese kitchen knives wholesale",
    title: "Japanese Kitchen Knives Wholesale: A Sourcing Guide",
    description:
      "Where Japanese kitchen knives are actually made, what forged versus stamped and each steel family mean commercially, realistic MOQs and lead times, OEM options, and the export rules that catch new importers.",
    lead:
      "Japanese knives are an unusually good category for a small importer. The product is high value for its shipping weight, the customer researches before buying, and the origin story is genuine rather than manufactured. The difficulty is that the word Japanese is doing an enormous amount of work in most listings, and the gap between a mass-produced stainless blade and a hand-forged single-bevel from a three-craftsman workshop is larger than any photograph will show you.",
    sections: [
      {
        h: "Four regions, four different businesses",
        blocks: [
          ["table", {
            head: ["Region", "Character", "Best for", "Commercial note"],
            rows: [
              ["Seki, Gifu", "Industrialised, vertically integrated, export-experienced", "Stainless production runs, OEM, consistent volume", "Commonly cited as the source of the large majority of Japan's blade output, and the region most likely to have handled export before"],
              ["Sakai, Osaka", "Hand-forged, traditionally single-bevel, professional chef market", "Premium and specialist SKUs", "Work is split between a forger, a sharpener and a handle maker, so lead times are long and are not compressible"],
              ["Tsubame-Sanjo, Niigata", "Traditional technique combined with automated precision", "Knives alongside tableware and tools", "Useful when you want a broader kitchenware range from one region"],
              ["Echizen, Fukui", "Laminated construction, thin grinds, small workshops", "Enthusiast and specialist SKUs", "Small capacity; treat availability as the constraint"]
            ]
          }],
          ["p", "Choosing the region is really choosing a business model. Seki is a manufacturing relationship. Sakai is closer to commissioning craft, with the scheduling consequences that implies."]
        ]
      },
      {
        h: "Forged versus stamped, and why the price gap is real",
        blocks: [
          ["p", "A stamped blade is cut from sheet steel and ground. A forged blade is shaped under force, which lets the maker vary thickness along the blade and through the spine. The difference shows up in balance, in how the blade behaves through dense food, and in how much material there is to sharpen away over a decade of use."],
          ["p", "Commercially, the mistake runs in both directions. Importers sell stamped blades with forged-blade language and lose the customers who know the difference. Others buy hand-forged inventory for a market that wanted a dishwasher-safe knife under a modest price point and sit on it. Decide which customer you are serving before you choose the maker, not after."]
        ]
      },
      {
        h: "Steel: what your customer is actually buying",
        blocks: [
          ["table", {
            head: ["Steel family", "Character", "Maintenance", "Fits"],
            rows: [
              ["Molybdenum stainless", "Forgiving, affordable, widely produced", "Low", "Home cooks, gifts, volume SKUs"],
              ["VG-10", "Harder stainless, good edge retention, very common in exports", "Low to moderate", "The mainstream premium position"],
              ["Damascus-clad", "A core steel with patterned cladding", "Follows the core steel", "Visual appeal; the pattern is cosmetic, not performance"],
              ["Shirogami / Aogami carbon", "Takes and holds a very fine edge", "High — it will rust if left wet", "Enthusiasts and professionals"],
              ["Aogami Super", "Among the hardest traditional options, roughly 65–67 HRC", "High, and chips if misused", "Specialist SKUs with an informed buyer"]
            ]
          }],
          ["note", "The commercial trap in this category is carbon steel sold to a general audience. It performs beautifully and it rusts if it is left wet, and a home cook who was not told that will return it and describe it as defective. If your channel is mainstream retail, the maintenance requirement belongs in the listing, not in the small print."]
        ]
      },
      {
        h: "Single bevel, double bevel, and handedness",
        blocks: [
          ["p", "Traditional Japanese knives are frequently ground on one side only. That geometry is what a sushi chef wants and it is not what a Western home kitchen expects. It also has a consequence most importers meet after their first order: a single-bevel knife is handed. The standard product is ground for right-handed use, and left-handed versions are a separate item with a longer lead time and a higher price, because they are made to order rather than pulled from stock."],
          ["p", "Double-bevel shapes — gyuto, santoku, petty, nakiri — are the practical core of a range aimed at a general market, with single-bevel yanagiba and deba as specialist additions rather than the foundation."]
        ]
      },
      {
        h: "MOQ and lead time",
        blocks: [
          ["ul", [
            "Branded or OEM production runs commonly start in the range of a hundred to several hundred units per SKU, though the spread across suppliers is very wide and some will work in far smaller quantities at a higher unit price.",
            "Stock items from an export-experienced Seki supplier can move quickly. Hand-forged Sakai work moves at the speed of three separate craftsmen and is quoted in months.",
            "Handle materials and packaging frequently set the lead time rather than the blade.",
            "Seasonal demand is real. Quoting in the autumn for December delivery is late in this category."
          ]]
        ]
      },
      {
        h: "OEM, engraving and private label",
        blocks: [
          ["p", "Knives take branding well, and the cost curve is steep in places that are not obvious. Laser engraving a logo onto a stainless blade is inexpensive and fast. A custom blade profile, a custom handle shape, or a bolster change means new tooling and a different conversation entirely. Packaging sits in between and is where a range starts to look like a brand rather than a resale."],
          ["p", "Settle the ownership questions in writing before tooling: who owns the profile, whether the maker may sell the same shape to others, and what happens if a steel or a handle material is discontinued mid-range."]
        ]
      },
      {
        h: "Export and destination-market rules",
        blocks: [
          ["ul", [
            "Knives are a restricted category in a number of markets. Age-verified sale requirements, restrictions on particular blade shapes, and courier policies that refuse blades outright are all common, and they vary by country and sometimes by carrier rather than by law.",
            "Confirm your own market's rules before you commit to inventory, not after it arrives. This is one of the few categories where a shipment can be legal to export and problematic to sell.",
            "Describe the goods accurately on customs paperwork. Kitchen cutlery is a straightforward classification; vague descriptions on a blade shipment invite inspection.",
            "Ask where the blade was forged, ground and finished, and get the answer in writing. Japanese steel is not the same claim as made in Japan, and the distinction is exactly what your customer is paying the premium for."
          ]]
        ]
      }
    ],
    cta: {
      heading: "Want introductions to makers rather than to resellers?",
      body: "GuideTech contacts Japanese blade makers and wholesalers in Japanese, establishes what they can actually produce and at what minimum, verifies the company against public records, and coordinates samples and the first order from Tokyo.",
      href: "/japan-partner/en/supplier-sourcing",
      text: "See how supplier sourcing works"
    },
    faq: [
      ["Can I buy Japanese knives wholesale without a Japanese company?", "Yes, more easily than in most categories, because Seki in particular has long-standing export experience. Smaller traditional workshops are a different matter and usually need an exporter or a Japan-side agent in between."],
      ["What minimum order should I expect?", "Branded runs commonly start in the hundreds per SKU, but the range across suppliers is very wide and some will sell far smaller quantities at a higher unit price. Treat any single published figure as a starting point."],
      ["Is VG-10 a Japanese steel?", "It is a Japanese-developed stainless steel and it is very widely used in knives made for export. Its presence tells you about the blade material, not about where the knife was forged and finished."],
      ["Should I start with carbon or stainless?", "Stainless, unless your channel is specifically enthusiasts or professionals. Carbon steel performs better in skilled hands and generates returns and complaints in general retail."]
    ],
    related: ["how-to-find-japanese-suppliers", "how-to-verify-a-japanese-company", "japanese-trade-shows-sourcing-guide"]
  },

  {
    slug: "japanese-trade-shows-sourcing-guide",
    seoTitle: "Sourcing at Japanese Trade Shows",
    seoDescription: "Which Japanese trade shows matter by category, how to build a target list, why follow-up decides the outcome, and how proxy attendance works.",
    kw: "japan trade show",
    title: "Sourcing at Japanese Trade Shows, With or Without Flying",
    description:
      "Which Japanese trade shows matter by category, how to prepare a target list, what actually happens at a booth, why follow-up is where most deals die, and how proxy attendance works when you cannot travel.",
    lead:
      "Trade shows are the highest-yield sourcing channel in Japan, and the reason is structural. Every other route requires you to solve the introduction problem: persuading a company that has never heard of you to reply to a stranger. At a trade show that problem is inverted. The exhibitor paid for a booth specifically to meet buyers they do not yet know, and for three days they want to talk to you.",
    sections: [
      {
        h: "The shows that matter, by category",
        blocks: [
          ["table", {
            head: ["Show", "Category", "When", "Note"],
            rows: [
              ["FOODEX JAPAN", "Food and beverage", "March, Tokyo Big Sight", "The largest food trade show in the region; the 2027 edition runs 9–12 March and the organisers report around ten thousand buyers from more than thirty countries"],
              ["Beautyworld Japan", "Beauty, cosmetics, wellness", "May, Tokyo Big Sight", "The 2027 edition runs 17–19 May; the main meeting point for J-beauty manufacturers and OEM houses"],
              ["LIFESTYLE Week", "Gift, homeware, tableware, beauty", "June, Tokyo", "The 2027 edition runs 9–11 June; organisers report that a large majority of attendees hold purchasing authority"],
              ["Tokyo International Gift Show", "Gift and consumer goods", "February and September", "Runs twice a year and is the broadest net for consumer products"]
            ]
          }],
          ["note", "Dates and venues move, and some shows have merged or rebranded in recent years. Confirm on the organiser's own site before booking anything, and register as a buyer well in advance — on-the-day registration is slower and some halls restrict it."]
        ]
      },
      {
        h: "Preparation is most of the result",
        blocks: [
          ["ul", [
            "<strong>Download the exhibitor list weeks ahead</strong> and build a target list of twenty to thirty booths. Not two hundred. A show floor is large enough that an unplanned walk produces catalogues rather than conversations.",
            "<strong>Pre-register as a buyer.</strong> It is free, it saves an hour at the door, and on some shows it is what gets you into the business-matching programme.",
            "<strong>Prepare a one-page company profile in Japanese.</strong> Who you are, what you sell, through which channels, in which markets, and how long you have been trading. This is the document that converts a booth conversation into a follow-up.",
            "<strong>Bring far more business cards than you think you need.</strong> Running out mid-show is a genuinely common and entirely avoidable failure.",
            "<strong>Book an interpreter early</strong> if you need one. Show weeks clear the market, and the good ones are gone months ahead."
          ]]
        ]
      },
      {
        h: "What actually happens at a booth",
        blocks: [
          ["p", "Expect five to ten minutes. The person in front of you may be the owner, a salesperson, or someone helping out for the day, and which one it is changes what the conversation can achieve. Your job in those minutes is not to negotiate. It is to establish whether there is a fit and to leave with a specific next step."],
          ["sample", {
            title: "What to leave each booth with",
            rows: [
              ["Materials", "Catalogue and price list if offered", "Collect"],
              ["Contact", "Business card of the person you actually spoke to", "Essential"],
              ["Facts", "Do they export, minimum order, lead time", "Ask"],
              ["Next step", "Sample, quotation, or a call after the show", "Agree"]
            ]
          }],
          ["p", "Ask whether they export and who handles it. That one question sorts your list into companies you can transact with and companies that will need a trading company or an agent in between, and it is much faster to ask in person than to discover over three weeks of email."]
        ]
      },
      {
        h: "The follow-up is where most deals die",
        blocks: [
          ["p", "This is the part worth being blunt about. The most common outcome of an overseas buyer attending a Japanese trade show is nothing at all, and the cause is almost never the quality of the conversations. It is that the follow-up went out three weeks later, in English, to a generic address, with no reference to the conversation."],
          ["ul", [
            "Follow up within about three business days, while the exhibitor still remembers the show and before their own backlog closes over.",
            "Write in Japanese, to the person whose card you have, and name the booth and what you discussed.",
            "Attach the one-page profile and ask for one specific thing — a quotation, a sample, or a call.",
            "Expect to follow up twice. A single unanswered email is not a rejection in this market."
          ]]
        ]
      },
      {
        h: "If you cannot fly",
        blocks: [
          ["p", "Proxy attendance is an established way to work these shows without the trip. A Japan-side representative walks the floor with your target list, asks your qualifying questions in Japanese, collects catalogues, price lists and cards, photographs products and displays, and reports back with a shortlist and a recommended next action for each booth."],
          ["p", "The economics usually favour it for a first look at a category. Flights, a week of hotels in Tokyo during show season, and an interpreter add up quickly, and the return on a first exploratory visit is information rather than orders. Sending someone who already speaks the language and can start the follow-up the same week converts more of that information into actual conversations."],
          ["ul", [
            "Give the representative a written target list and the three or four questions that decide fit for you.",
            "Ask for photographs of the product and of the booth, not only catalogue scans.",
            "Have them start the Japanese follow-up while the show is still running.",
            "Treat the output as a qualified shortlist, then decide whether the second visit is worth making in person."
          ]]
        ]
      }
    ],
    cta: {
      heading: "Want someone walking the show floor for you?",
      body: "GuideTech attends Japanese trade shows on behalf of overseas buyers: target list preparation, booth conversations in Japanese, product photography, and same-week follow-up that turns a catalogue pile into a shortlist.",
      href: "/japan-partner/en/contact",
      text: "Talk to us about trade show sourcing"
    },
    faq: [
      ["Do I need to be a registered company to attend as a buyer?", "Most shows are trade-only and ask for evidence that you are in the business — a company name, a website, sometimes a business card or a business registration. Pre-registration is where this is checked, which is another reason not to leave it to the day."],
      ["Will exhibitors speak English?", "At the large international shows, some will, particularly those already exporting. Many will not, and the ones who do not are frequently the smaller makers who are most worth finding. Plan for Japanese."],
      ["Is it worth attending if I am not ready to order?", "Yes, if you treat it as research rather than procurement. Understanding what a category actually looks like, what it costs and who makes it is worth the trip on its own — but say so honestly at the booth rather than implying an order that is not coming."],
      ["How far ahead should I plan?", "Two to three months for registration, target list, interpreter and accommodation. Tokyo hotel pricing during major show weeks rewards booking early by a wide margin."]
    ],
    related: ["how-to-find-japanese-suppliers", "how-to-verify-a-japanese-company", "japanese-kitchen-knives-wholesale-sourcing"]
  }
];

/* Existing articles, kept in the index. These files are not regenerated here. */
const legacyPosts = [
  {
    slug: "japanese-translation-services-pricing-guide",
    kw: "japanese translation services price",
    title: "Japanese Translation Services Price Guide for Software Teams",
    description: "A practical guide to Japanese translation services price ranges, localization costs, and when software teams should budget beyond word rates."
  },
  {
    slug: "software-localization-japan-guide",
    kw: "software localization japan",
    title: "Software Localization Japan Guide for AI and SaaS Companies",
    description: "A practical software localization Japan guide covering UI, honorific tone, local formats, LINE, payments, invoices, support, and launch readiness."
  },
  {
    slug: "japanese-translation-agency-vs-localization-partner",
    kw: "japanese translation agency",
    title: "Japanese Translation Agency vs Localization Partner",
    description: "How a Japanese translation agency differs from a localization partner for AI and SaaS companies launching in Japan."
  },
  {
    slug: "doing-business-in-japan-for-software-companies",
    kw: "doing business in japan",
    title: "Doing Business in Japan for Software Companies",
    description: "A first-90-days guide to doing business in Japan for overseas AI and SaaS companies without a local office."
  }
];

/* ------------------------------------------------------------------ *
 * Rendering
 * ------------------------------------------------------------------ */

const bySlug = new Map(posts.map((p) => [p.slug, p]));

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Strips inline markup so a string is safe inside JSON-LD or an attribute. */
function plain(html) {
  return String(html).replace(/<[^>]+>/g, "");
}

function json(data) {
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function write(file, html) {
  const full = path.join(root, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  console.log(`wrote ${file}`);
}

function head({ title, description, canonical, schemas, ogType = "website", ogImage = "/assets/japan-partner/images/og-default.webp" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${site}${canonical}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${site}${canonical}">
  <meta property="og:image" content="${site}${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
${analyticsBlock()}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/japan-partner/style.css">
  <link rel="alternate" type="application/rss+xml" title="GuideTech Japan sourcing guides" href="/japan-partner/en/blog/feed.xml">
${schemas.map((s) => `<script type="application/ld+json">${json(s)}</script>`).join("\n")}
</head>`;
}

function header(current) {
  return `<body>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/japan-partner/en/"><strong>${serviceName}</strong><span>by GuideTech</span></a>
    <div class="lang-switch"><a class="current" href="/japan-partner/en/">EN</a><a class="" href="/japan-partner/es/">ES</a></div>
    <button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle>☰</button>
    <nav class="nav" data-nav>
      <div class="nav-item"><a class="" href="/japan-partner/en/launch-partner">Services</a><div class="dropdown"><a href="/japan-partner/en/launch-partner">Launch Partner</a><a href="/japan-partner/en/supplier-sourcing">Supplier Sourcing</a><a href="/japan-partner/en/localization">Localization</a></div></div>
      <a class="" href="/japan-partner/en/pricing">Pricing</a>
      <a class="" href="/japan-partner/en/work">Work</a>
      <a class="${current === "blog" ? "current" : ""}" href="/japan-partner/en/blog/">Guides</a>
      <a class="" href="/japan-partner/en/about">About</a>
      <a class="header-cta" href="/japan-partner/en/contact">Contact</a>
    </nav>
  </div>
</header>`;
}

const footer = `<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div><h2>${serviceName}</h2><p>Your local partner in Japan for supplier sourcing, localization, and operations. Operated by <a href="https://guidetech.jp">GuideTech</a> in Tokyo, Shibuya.</p></div>
      <div><h3>Services</h3><div class="footer-links"><a href="/japan-partner/en/launch-partner">Japan Launch Partner</a><a href="/japan-partner/en/supplier-sourcing">Supplier Sourcing</a><a href="/japan-partner/en/localization">Software Localization</a><a href="/japan-partner/en/pricing">Pricing</a></div></div>
      <div><h3>Company</h3><div class="footer-links"><a href="/japan-partner/en/work">Work</a><a href="/japan-partner/en/about">About</a><a href="/japan-partner/en/contact">Contact</a></div></div>
      <div><h3>Languages</h3><div class="footer-links"><a href="/japan-partner/en/">English</a><a href="/japan-partner/es/">Español</a></div></div>
    </div>
    <div class="footer-bottom">Operated by GuideTech. © 2026 GuideTech Inc.</div>
  </div>
</footer>
<script src="/assets/japan-partner/script.js"></script>
</body>
</html>`;

function renderBlock(block) {
  const [kind, value] = block;
  switch (kind) {
    case "p":
      return `<p>${value}</p>`;
    case "ul":
      return `<ul class="check-list">${value.map((li) => `<li>${li}</li>`).join("")}</ul>`;
    case "note":
      return `<p class="note">${value}</p>`;
    case "table":
      return `<div class="table-wrap"><table><thead><tr>${value.head
        .map((h) => `<th>${h}</th>`)
        .join("")}</tr></thead><tbody>${value.rows
        .map((row) => `<tr>${row.map((cell, i) => (i === 0 ? `<td><strong>${cell}</strong></td>` : `<td>${cell}</td>`)).join("")}</tr>`)
        .join("")}</tbody></table></div>`;
    case "sample":
      return `<div class="sample-doc"><div class="sample-doc-head"><span>${value.title}</span><span>Checklist</span></div>${value.rows
        .map((row) => `<div class="sample-row"><strong>${row[0]}</strong><span>${row[1]}</span><span class="status">${row[2]}</span></div>`)
        .join("")}</div>`;
    case "flow":
      return `<div class="diagram flow">${value.map((step) => `<div class="flow-step"><strong>${step}</strong></div>`).join("")}</div>`;
    default:
      throw new Error(`Unknown block type: ${kind}`);
  }
}

/** Organization entity, repeated on every page so AI and search engines can
 *  resolve "GuideTech Japan Partner" to a single, consistent operator. */
function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site}/#organization`,
    name: "GuideTech",
    alternateName: serviceName,
    url: site,
    description:
      "Tokyo-based local operating partner for overseas companies working with Japan: supplier sourcing and verification, localization, Japanese-language communication and reporting to headquarters.",
    areaServed: { "@type": "Country", name: "Japan" },
    knowsLanguage: ["ja", "en", "es"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shibuya-ku",
      addressRegion: "Tokyo",
      addressCountry: "JP"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${site}/japan-partner/en/contact`,
      availableLanguage: ["English", "Japanese", "Spanish"]
    }
  };
}

/** Thumbnail path for a post. Legacy posts keep their original cover art. */
function thumb(slug) {
  const legacy = {
    "japanese-translation-services-pricing-guide": "blog-pricing.webp",
    "software-localization-japan-guide": "blog-localization.webp",
    "japanese-translation-agency-vs-localization-partner": "blog-agency-vs-partner.webp",
    "doing-business-in-japan-for-software-companies": "blog-doing-business.webp"
  };
  return legacy[slug]
    ? `/assets/japan-partner/images/${legacy[slug]}`
    : `/assets/japan-partner/images/blog/${slug}.webp`;
}

function articleSchemas(post, url) {
  return [
    // The Organization entity is repeated on every page rather than only on the
    // index, so the @id references below always resolve on the page itself.
    organization(),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      image: `${site}${thumb(post.slug)}`,
      author: { "@id": `${site}/#organization` },
      publisher: { "@id": `${site}/#organization` },
      isAccessibleForFree: true,
      inLanguage: "en",
      datePublished: today,
      dateModified: today,
      mainEntityOfPage: `${site}${url}`
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: plain(a) }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site}/japan-partner/en/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${site}${url}` }
      ]
    }
  ];
}

function renderArticle(post) {
  const url = `/${OUT_DIR}/${post.slug}`; // canonical is extensionless; the file itself stays .html
  const sections = post.sections
    .map((section, i) => `<h2 id="section-${i + 1}">${section.h}</h2>${section.blocks.map(renderBlock).join("")}`)
    .join("");

  const cta = `<div class="article-cta"><h3>${post.cta.heading}</h3><p>${post.cta.body}</p><p><a class="button" href="${post.cta.href}">${post.cta.text}</a></p></div>`;

  const faq = `<h2 id="faq">Frequently asked questions</h2><div class="faq">${post.faq
    .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
    .join("")}</div>`;

  const related = post.related.length
    ? `<h2>Related guides</h2><ul class="check-list">${post.related
        .map((slug) => {
          const target = bySlug.get(slug);
          return `<li><a href="/${OUT_DIR}/${slug}">${target.title}</a></li>`;
        })
        .join("")}</ul>`
    : "";

  const toc = `<aside class="toc"><strong>In this guide</strong>${post.sections
    .map((section, i) => `<a href="#section-${i + 1}">${section.h}</a>`)
    .join("")}<a href="#faq">Frequently asked questions</a><a href="${post.cta.href}">${post.cta.text}</a></aside>`;

  const cover = `<figure class="article-cover"><img src="${thumb(post.slug)}" alt="${esc(post.title)}" width="1200" height="675" fetchpriority="high"></figure>`;

  const body = `<section class="section alt"><div class="wrap article-layout"><article class="article"><p class="eyebrow">${post.kw}</p><h1>${post.title}</h1><p class="article-meta">By ${serviceName} · Updated ${today}</p>${cover}<p>${post.lead}</p>${sections}${cta}${faq}${related}</article>${toc}</div></section>`;

  return `${head({
    title: `${post.seoTitle || post.title} | GuideTech`,
    description: post.seoDescription || post.description,
    canonical: url,
    ogType: "article",
    ogImage: thumb(post.slug),
    schemas: articleSchemas(post, url)
  })}
${header("blog")}
${body}
${footer}`;
}

/* ------------------------------------------------------------------ *
 * Write article pages
 * ------------------------------------------------------------------ */

for (const post of posts) {
  write(`${OUT_DIR}/${post.slug}.html`, renderArticle(post));
}

/* ------------------------------------------------------------------ *
 * Blog index
 * ------------------------------------------------------------------ */

function cardsFor(list) {
  return `<div class="grid two">${list
    .map(
      (post) =>
        `<article class="card"><a class="card-thumb" href="/${OUT_DIR}/${post.slug}"><img src="${thumb(post.slug)}" alt="${esc(post.title)}" width="1200" height="675" loading="lazy"></a><p class="eyebrow">${post.kw}</p><h3><a href="/${OUT_DIR}/${post.slug}">${post.title}</a></h3><p>${post.description}</p></article>`
    )
    .join("")}</div>`;
}

const indexTitle = "Japan Sourcing and Market Entry Guides";
const indexSeoTitle = "Japan Sourcing Guides";
const indexDescription =
  "Practical guides from Tokyo on finding and verifying Japanese suppliers, and on sourcing matcha, trading cards, skincare and confectionery from Japan.";

write(
  `${OUT_DIR}/index.html`,
  `${head({
    title: `${indexSeoTitle} | GuideTech Japan Partner`,
    description: indexDescription,
    canonical: `/${OUT_DIR}/`,
    ogImage: thumb("how-to-find-japanese-suppliers"),
    schemas: [
      organization(),
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site}/${OUT_DIR}/` }
        ]
      }
    ]
  })}
${header("blog")}
<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><p class="eyebrow">${serviceName}</p><h1>${indexTitle}</h1><p>Practical, specific guides written from Tokyo for people who need something done in Japan: finding suppliers, verifying who they are, and operating once the relationship exists.</p></div><aside class="hero-panel"><strong>Written for</strong><ul><li>Buyers sourcing products from Japan</li><li>Brands manufacturing in Japan</li><li>Software teams entering the Japanese market</li></ul></aside></div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>Sourcing from Japan</h2><p>Finding, verifying and buying from Japanese suppliers when you have no entity and no Japanese-speaking team.</p></div>${cardsFor(
    posts
  )}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Selling and operating in Japan</h2><p>Localization, pricing and the first ninety days for overseas software companies entering the Japanese market.</p></div>${cardsFor(
    legacyPosts
  )}</div></section>
${footer}`
);

/* ------------------------------------------------------------------ *
 * Sitemap
 * ------------------------------------------------------------------ */

const staticUrls = [
  "/japan-partner/",
  "/japan-partner/en/",
  "/japan-partner/en/localization",
  "/japan-partner/en/supplier-sourcing",
  "/japan-partner/en/launch-partner",
  "/japan-partner/en/pricing",
  "/japan-partner/en/work",
  "/japan-partner/en/about",
  "/japan-partner/en/contact",
  "/japan-partner/en/blog/",
  "/japan-partner/es/",
  "/japan-partner/es/localization",
  "/japan-partner/es/supplier-sourcing",
  "/japan-partner/es/launch-partner",
  "/japan-partner/es/pricing",
  "/japan-partner/es/work",
  "/japan-partner/es/about",
  "/japan-partner/es/contact",
  "/japan-partner/es/blog/"
];

const esPostSlugs = [
  "traduccion-japones-servicios-precios",
  "localizacion-software-japon",
  "agencia-traduccion-japones-vs-partner-localizacion",
  "hacer-negocios-en-japon-empresas-software"
];

const sitemapUrls = [
  ...staticUrls,
  ...posts.map((p) => `/${OUT_DIR}/${p.slug}`),
  ...legacyPosts.map((p) => `/${OUT_DIR}/${p.slug}`),
  ...esPostSlugs.map((slug) => `/japan-partner/es/blog/${slug}`)
];

/* ------------------------------------------------------------------ *
 * RSS feed
 * ------------------------------------------------------------------ */

const feedItems = [...posts, ...legacyPosts];
write(
  `${OUT_DIR}/feed.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${indexTitle} | ${serviceName}</title>
    <link>${site}/${OUT_DIR}/</link>
    <description>${indexDescription}</description>
    <language>en</language>
    <atom:link href="${site}/${OUT_DIR}/feed.xml" rel="self" type="application/rss+xml" />
${feedItems
  .map(
    (post) => `    <item>
      <title>${esc(post.seoTitle || post.title)}</title>
      <link>${site}/${OUT_DIR}/${post.slug}</link>
      <guid isPermaLink="true">${site}/${OUT_DIR}/${post.slug}</guid>
      <description>${esc(post.seoDescription || post.description)}</description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`
);

/* ------------------------------------------------------------------ *
 * .html -> extensionless redirects
 *
 * Netlify serves /foo from foo.html natively, so both forms return 200 unless
 * we redirect. The trailing "!" forces the rule to shadow the real file.
 * ------------------------------------------------------------------ */

const htmlPages = [
  ...sitemapUrls.filter((u) => !u.endsWith("/")),
  "/japan-partner/en/thanks",
  "/japan-partner/es/thanks"
];
const indexPages = [
  "/japan-partner/",
  "/japan-partner/en/",
  "/japan-partner/es/",
  "/japan-partner/en/blog/",
  "/japan-partner/es/blog/"
];
write(
  "_redirects",
  `# Generated by scripts/generate-sourcing-articles.mjs - do not edit by hand.
# Canonical URLs are extensionless. These 301s retire the .html form.
${indexPages.map((u) => `${u}index.html${" ".repeat(Math.max(1, 58 - (u + "index.html").length))}${u}  301!`).join("\n")}
${htmlPages.map((u) => `${u}.html${" ".repeat(Math.max(1, 58 - (u + ".html").length))}${u}  301!`).join("\n")}
`
);

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${site}${url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`
);

console.log(`\n${posts.length} article(s), 1 index, 1 sitemap written.`);
