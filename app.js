/**
 * BAR ANTIGRAVITY - Cocktail Simulator Logic
 */

// ==========================================================================
// 1. COCKTAIL DATABASE (Strictly real classic/IBA standard recipes)
// ==========================================================================
const cocktailDatabase = {
  // --- GIN BASE ---
  "gin+tonic": {
    name: "ジントニック",
    enName: "Gin & Tonic",
    abv: 10,
    taste: ["さっぱり", "爽快", "ほろ苦い"],
    description: "ジンの持つボタニカルの豊かな香りと、トニックウォーターのさわやかな苦味・甘味・炭酸が絶妙に調和した、世界中で愛される大定番ロングカクテル。",
    color: "rgba(232, 245, 233, 0.35)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "トニックウォーター", amount: "適量 (約 120 ml)" },
      { name: "ライムカット", amount: "1個" }
    ],
    method: [
      "グラスに大きめの氷を満たし、冷やしたジンを注ぎます。",
      "バースプーンでジンと氷を軽くかき混ぜて冷やします。",
      "冷えたトニックウォーターを氷に当てないように優しく注ぎます。",
      "炭酸が抜けないよう、マドラーで底から氷を持ち上げるように軽く1回混ぜます。",
      "ライムを絞り、そのままグラスに入れます。"
    ]
  },
  "gin+ginger": {
    name: "ジン・バック",
    enName: "Gin Buck",
    abv: 10,
    taste: ["スパイシー", "甘酸っぱい", "爽快"],
    description: "ジンにレモンを加え、ジンジャーエールで割った超定番カクテル。「バック(Buck)」とは雄鹿のことで、キックのある力強い飲み口を意味します。",
    color: "rgba(245, 222, 179, 0.65)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "フレッシュ・レモン果汁", amount: "10 ml" },
      { name: "ジンジャーエール", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "氷を入れたタンブラーグラスにジンとレモン果汁を注ぎ、軽くステアします。",
      "冷えたジンジャーエールを静かに注ぎます。",
      "マドラーで底から氷を持ち上げるように軽く1回混ぜ、レモンを飾ります。"
    ]
  },
  "gin+soda": {
    name: "ジン・リッキー",
    enName: "Gin Rickey",
    abv: 10,
    taste: ["極めてドライ", "すっきり", "爽快"],
    description: "ジンにライムを絞り、ソーダで割った非常にドライなカクテル。砂糖や甘味を一切加えないため、ジンのシャープな風味とライムのフレッシュな酸味がそのまま楽しめます。",
    color: "rgba(240, 245, 245, 0.3)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量 (約 120 ml)" },
      { name: "フレッシュ・ライム", amount: "1/2 個" }
    ],
    method: [
      "グラスの底にライム1/2個を絞り、皮ごとそのまま入れます。",
      "氷をたっぷり満たし、ジンを注ぎます。",
      "冷えたソーダをゆっくりと注ぎ入れ、軽く1回ステアします。"
    ]
  },
  "gin+orange": {
    name: "オレンジ・ブロッサム",
    enName: "Orange Blossom",
    abv: 12,
    taste: ["甘酸っぱい", "フルーティー", "ジューシー"],
    description: "ジンのすっきりとしたハーブの風味に、オレンジジュースの柑橘系の爽やかな甘みが重なり合ったカクテル。禁酒法時代にジンの強い香りを隠すためにオレンジジュースを混ぜたのが始まりと言われています。",
    color: "rgba(255, 167, 38, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "40 ml" },
      { name: "オレンジジュース", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と材料（ジン、オレンジジュース）を入れます。",
      "しっかりとシェイクして液体を冷やし、空気を含ませます。",
      "冷やしたカクテルグラス（氷なし）に注ぎ入れます。"
    ]
  },
  "gin+lime": {
    name: "ギムレット",
    enName: "Gimlet",
    abv: 28,
    taste: ["強い", "シャープ", "スッキリ"],
    description: "ジンベースのショートカクテルを代表する名作。「ギムレット(錐)」の名の通り、突き刺すような鋭い味わいと爽快なキレが特徴です。",
    color: "rgba(224, 242, 241, 0.35)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "ライムジュース", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷とジン、ライムジュースを入れます。",
      "しっかりとシェイクしてカクテルグラスに注ぎます。"
    ]
  },
  "gin+absinthe+whiskey": {
    name: "アースクェイク",
    enName: "Earthquake",
    abv: 33,
    taste: ["極めて強い", "ハーバル", "辛口"],
    description: "その名の通り「地震」のような衝撃を受ける、アルコール度数が極めて高いカクテル。ジンのシャープさにウイスキーのコク、そしてアブサンの強烈なアニス香が渦巻く、魔性の一杯です。",
    color: "rgba(205, 170, 105, 0.6)",
    hasBubbles: false,
    garnish: null,
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "20 ml" },
      { name: "ウイスキー", amount: "20 ml" },
      { name: "アブサン", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷とすべての材料を入れ、しっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "gin+mint+pineapple": {
    name: "アラウンド・ザ・ワールド",
    enName: "Around the World",
    abv: 15,
    taste: ["爽快", "ミント風味", "甘酸っぱい"],
    description: "「世界一周」という壮大な名を持つクラシックカクテル。パイナップルのトロピカルな甘酸っぱさに、ペパーミントの鮮烈な清涼感が加わり、淡い緑色の美しいグラデーションを生み出します。",
    color: "rgba(129, 199, 132, 0.75)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "40 ml" },
      { name: "ペパーミントリキュール", amount: "10 ml" },
      { name: "パイナップルジュース", amount: "10 ml" }
    ],
    method: [
      "材料をすべて氷とともにシェイカーに入れ、よくシェイクします。",
      "冷やしたカクテルグラスに注ぎ入れます。"
    ]
  },
  "gin+lemon+soda+sugar": {
    name: "ジン・フィズ",
    enName: "Gin Fizz",
    abv: 14,
    taste: ["甘酸っぱい", "爽快", "きめ細かい泡"],
    description: "シェイクしたジンとレモン、シロップにソーダを注いだ「フィズ」スタイルの元祖であり代表格。IBA公認のクラシックで、きめ細かな泡とレモンの香りが心地よい万人向けの一杯です。",
    color: "rgba(250, 250, 235, 0.42)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "フレッシュ・レモン果汁", amount: "30 ml" },
      { name: "シュガーシロップ", amount: "10 ml" },
      { name: "ソーダ (炭酸水)", amount: "約 80 ml" }
    ],
    method: [
      "シェイカーにジン、レモン果汁、シロップ、氷を入れてしっかりシェイクします。",
      "氷を入れたタンブラーに注ぎ、冷えたソーダで満たして軽く1回ステアします。",
      "レモンスライスを飾ります。"
    ]
  },
  "gin+soda+tonic": {
    name: "ジン・ソニック",
    enName: "Gin Sonic",
    abv: 9,
    taste: ["ドライ", "さっぱり", "爽快"],
    description: "トニックウォーターの持つ特有のビターな甘みと、ソーダの持つキレ味を1:1で割った、食事に合わせやすい現代的な人気ジンカクテル。",
    color: "rgba(235, 245, 240, 0.3)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "トニックウォーター", amount: "60 ml" },
      { name: "ソーダ (炭酸水)", amount: "60 ml" },
      { name: "ライムカット", amount: "1個" }
    ],
    method: [
      "グラスに氷を入れ、ジンを注いで冷やします。",
      "トニックウォーターとソーダを同量、静かに注ぎ入れます。",
      "炭酸が抜けないよう優しく1回だけステアし、ライムを添えます。"
    ]
  },
  "gin+milk": {
    name: "ジン・ミルク・パンチ",
    enName: "Gin Milk Punch",
    abv: 9,
    taste: ["クリーミー", "まろやか", "芳醇"],
    description: "ジンを牛乳で割り、少しの甘みとナツメグのスパイシーな香りで仕上げる伝統的カクテル。牛乳のコクによってジンの香りがマイルドに引き立てられます。",
    color: "rgba(245, 245, 240, 0.95)",
    hasBubbles: false,
    garnish: null,
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "牛乳 (ミルク)", amount: "120 ml" },
      { name: "シュガーシロップ", amount: "1 tsp" }
    ],
    method: [
      "シェイカーにジン, 牛乳, シロップと氷を入れます。",
      "しっかりとシェイクして冷やし、カクテルグラスに注ぎます。"
    ]
  },

  // --- VODKA BASE ---
  "vodka+tonic": {
    name: "ウォッカトニック",
    enName: "Vodka & Tonic",
    abv: 10,
    taste: ["すっきり", "クリーン", "爽快"],
    description: "クセのないクリアなウォッカをトニックウォーターで割ることで、トニック特有の爽快な香りと苦味をストレートに味わえるカクテル。",
    color: "rgba(245, 245, 245, 0.35)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "トニックウォーター", amount: "適量" },
      { name: "ライムカット", amount: "1個" }
    ],
    method: [
      "氷を入れたグラスにウォッカを注ぎ、軽くステアします。",
      "冷えたトニックウォーターを優しく注ぎ入れます。",
      "炭酸が逃げないように静かに1回かき混ぜ、ライムを絞り入れます。"
    ]
  },
  "vodka+ginger": {
    name: "モスコミュール",
    enName: "Moscow Mule",
    abv: 10,
    taste: ["スパイシー", "爽快", "キレがある"],
    description: "「モスクワのラバ（強情者）」という意味を持つ世界的有名カクテル。ウォッカのクリアな喉ごしにライムの酸味、ジンジャーエールの辛みが爽快です。",
    color: "rgba(230, 200, 160, 0.65)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "ジンジャーエール (ジンジャービア)", amount: "120 ml" },
      { name: "ライムジュース", amount: "10 ml" }
    ],
    method: [
      "氷を入れたグラスにウォッカとライム果汁を注ぎ、軽くステアします。",
      "冷えたジンジャーエールを静かに満たし、優しくステアしてライムを飾ります。"
    ]
  },
  "vodka+soda": {
    name: "ウォッカ・リッキー",
    enName: "Vodka Rickey",
    abv: 10,
    taste: ["極めてクリーン", "さっぱり", "糖質ゼロ"],
    description: "ウォッカを炭酸水だけで割り、新鮮なライムやレモンの酸味を直接きかせた極めてドライなカクテル。",
    color: "rgba(240, 240, 240, 0.3)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量" },
      { name: "カットレモン", amount: "1個" }
    ],
    method: [
      "グラスに氷を入れ、ウォッカを注ぎます。",
      "冷えた炭酸水を静かに注ぎ、レモンを軽く絞り入れ、優しく1回混ぜます。"
    ]
  },
  "vodka+orange": {
    name: "スクリュードライバー",
    enName: "Screwdriver",
    abv: 12,
    taste: ["フルーティー", "まろやか", "飲みやすい"],
    description: "オレンジ果汁のフレッシュな甘さが引き立つ、まろやかな世界的名作。かつて労働者がねじ回し(スクリュードライバー)で混ぜたことから命名されました。",
    color: "rgba(255, 183, 77, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "オレンジジュース", amount: "適量" }
    ],
    method: [
      "グラスに氷を入れ、ウォッカを注ぎます。",
      "冷えたオレンジジュースでグラスを満たし、よくステアします。"
    ]
  },
  "vodka+grapefruit": {
    name: "ブルドッグ",
    enName: "Bulldog",
    abv: 11,
    taste: ["さっぱり", "フルーティー", "ほろ苦い"],
    description: "ウォッカをグレープフルーツジュースで割った、シンプルでさっぱりとしたカクテル。ソルティドッグの塩なしバージョン（テールレス・ドッグとも呼ばれます）です。",
    color: "rgba(255, 245, 157, 0.75)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "グレープフルーツジュース", amount: "適量" }
    ],
    method: [
      "グラスに氷を満たし、ウォッカを注ぎます。",
      "グレープフルーツジュースで満たし、よくステアします。"
    ]
  },
  "vodka+grapefruit+salt": {
    name: "ソルティ・ドッグ",
    enName: "Salty Dog",
    abv: 13,
    taste: ["さっぱり", "塩気と酸味", "フルーティー"],
    description: "グラスのフチに塩を飾る「スノースタイル」が特徴のカクテル。グレープフルーツのさっぱりした酸味と苦味に塩気が絡み、絶妙な味わいを生み出します。",
    color: "rgba(255, 249, 196, 0.75)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    summer: true,
    saltRim: true,
    ingredients: [
      { name: "ウォッカ", amount: "40 ml" },
      { name: "グレープフルーツジュース", amount: "適量" },
      { name: "塩 (スノースタイル用)", amount: "適量" }
    ],
    method: [
      "グラスのフチを濡らし、塩をまぶします（スノースタイル）。",
      "グラスに氷を入れ、ウォッカを注いでグレープフルーツジュースで満たします。",
      "塩を落とさないように静かにステアします。"
    ]
  },
  "vodka+tomato": {
    name: "ブラッディ・メアリー",
    enName: "Bloody Mary",
    abv: 12,
    taste: ["濃厚", "塩・スパイシー", "まろやか"],
    description: "「血まみれのメアリー」という名を持つトマトベースのカクテル。トマトジュースのまろやかなコクがウォッカのアルコール感と馴染み、お好みでレモンや塩を加えて楽しむユニークな味わいです。",
    color: "rgba(211, 47, 47, 0.9)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "トマトジュース", amount: "90 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "ウスターソース・タバスコ・塩等", amount: "2〜3ダッシュ" }
    ],
    method: [
      "氷を入れたグラスにウォッカを注ぎ、冷えたトマトジュースでグラスを満たします。",
      "全体がしっかり馴染むまでよくかき混ぜ、レモンを添えます。"
    ]
  },
  "vodka+coffee": {
    name: "ブラック・ルシアン",
    enName: "Black Russian",
    abv: 25,
    taste: ["極甘", "濃厚", "香ばしい"],
    description: "ウォッカのクリアな力強さと、コーヒーリキュールの甘く芳醇な香りが結びついた、世界的に有名なIBA公認カクテル。ロックグラスで氷とともに楽しむ、食後の定番です。",
    color: "rgba(78, 52, 46, 0.85)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ウォッカ", amount: "50 ml" },
      { name: "コーヒーリキュール", amount: "20 ml" }
    ],
    method: [
      "氷を入れたロックグラスにウォッカとコーヒーリキュールを注ぎます。",
      "材料が完全に馴染むまでしっかりとステアします。"
    ]
  },
  "vodka+curacao+lime": {
    name: "カミカゼ",
    enName: "Kamikaze",
    abv: 26,
    taste: ["強い", "シャープ", "すっきり"],
    description: "「神風」の名が冠された、鋭くダイナミックな辛口ショートカクテル。ホワイトキュラソーの甘みとライムの酸味が爽やかに調和した定番の一杯です。",
    color: "rgba(224, 242, 241, 0.4)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    ingredients: [
      { name: "ウォッカ", amount: "40 ml" },
      { name: "ホワイトキュラソー", amount: "10 ml" },
      { name: "ライムジュース", amount: "10 ml" }
    ],
    method: [
      "シェイカーに氷とすべての材料を入れてシェイクします。",
      "冷やしたカクテルグラス（氷なし）に注ぎます。"
    ]
  },
  "vodka+coffee+cream": {
    name: "ホワイト・ルシアン",
    enName: "White Russian",
    abv: 18,
    taste: ["クリーミー", "甘口", "香ばしい"],
    description: "ブラック・ルシアンに生クリームを浮かべた、デザート感覚のカクテル。映画『ビッグ・リボウスキ』の主人公が愛飲したことでも有名で、コーヒーの香ばしさとクリームのコクがとろけ合います。",
    color: "linear-gradient(to top, rgba(78, 52, 46, 0.9) 0%, rgba(240, 230, 215, 0.92) 75%)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "40 ml" },
      { name: "コーヒーリキュール", amount: "20 ml" },
      { name: "生クリーム", amount: "20 ml" }
    ],
    method: [
      "氷を入れたロックグラスにウォッカとコーヒーリキュールを注ぎ、ステアします。",
      "生クリームを表面に静かに浮かべます。混ぜながらいただきます。"
    ]
  },
  "vodka+soda+tonic": {
    name: "ウォッカ・ソニック",
    enName: "Vodka Sonic",
    abv: 9,
    taste: ["すっきり", "クリーン", "ドライ"],
    description: "ウォッカをソーダとトニックウォーターで同量割りにしたカクテル。トニックの香りを残しつつ、糖分をカットしたドライなソニックです。",
    color: "rgba(240, 242, 245, 0.25)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "トニックウォーター", amount: "60 ml" },
      { name: "ソーダ (炭酸水)", amount: "60 ml" }
    ],
    method: [
      "氷入りグラスにウォッカを注ぎ、トニックとソーダを注ぎ込み、優しくステアします。"
    ]
  },

  // --- RUM BASE ---
  "rum+tonic": {
    name: "ラムトニック",
    enName: "Rum & Tonic",
    abv: 10,
    taste: ["甘やか", "フルーティー", "爽快"],
    description: "ホワイト・ラムをトニックウォーターで割った一杯。ラムのサトウキビ由来の甘い芳香と、トニックウォーターのさっぱりとしたビター炭酸が見事なコントラストを描きます。",
    color: "rgba(241, 248, 233, 0.35)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "トニックウォーター", amount: "適量 (約 120 ml)" },
      { name: "ライムカット", amount: "1個" }
    ],
    method: [
      "グラスに氷を入れ、ホワイト・ラムを注いで軽く混ぜて冷やします。",
      "トニックウォーターを静かに注ぎ、軽く1回転ステアします。"
    ]
  },
  "rum+cola": {
    name: "キューバリブレ",
    enName: "Cuba Libre",
    abv: 9,
    taste: ["爽快", "コクのある甘み", "ライムの酸味"],
    description: "1902年、キューバの独立を記念して叫ばれた「キューバの自由万歳」に由来するカクテル。ラムのコク、コーラのスパイシーさ、ライムの酸味が完全に一体化します。",
    color: "rgba(78, 52, 46, 0.9)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    isIBA: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "50 ml" },
      { name: "コーラ", amount: "120 ml" },
      { name: "フレッシュ・ライム果汁", amount: "10 ml" }
    ],
    method: [
      "グラスに氷を入れ、ラムとライムジュースを注ぎ軽くかき混ぜます。",
      "冷えたコーラをごく静かに注ぎ満たし、軽く1回ステアします。"
    ]
  },
  "rum+lime+mint+soda": {
    name: "モヒート",
    enName: "Mojito",
    abv: 8,
    taste: ["ハーバル", "爽快極まりない", "さっぱり"],
    description: "ホワイト・ラムに大量のフレッシュミントとライム、砂糖を加え、クラッシュアイスを敷き詰めてソーダで満たした世界的超有名カクテル。",
    color: "rgba(220, 240, 220, 0.45)",
    hasBubbles: true,
    garnish: "mint",
    ice: "crushed",
    summer: true,
    isIBA: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "フレッシュ・ライム果汁", amount: "20 ml" },
      { name: "ミントの葉", amount: "6枚" },
      { name: "砂糖", amount: "2 tsp" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "グラスの底にミント、砂糖、ライム果汁を入れ、マドラーで優しく潰します。",
      "クラッシュアイスを山盛りに入れ、ラムとソーダを注ぎ底からしっかりかき混ぜます。",
      "ミントの穂先を飾ります。"
    ]
  },
  "rum+soda": {
    name: "ラム・ソーダ",
    enName: "Rum & Soda",
    abv: 10,
    taste: ["ドライ", "さっぱり", "ラム香"],
    description: "ホワイト・ラムを炭酸水だけで割った、糖分を加えないシンプルで爽快な一杯。サトウキビ由来のほのかな甘い香りがソーダの泡とともに立ち上がります。ライムを絞れば「ラム・リッキー」スタイルに。",
    color: "rgba(245, 248, 242, 0.28)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量 (約 120 ml)" },
      { name: "ライムカット", amount: "1個" }
    ],
    method: [
      "氷を満たしたグラスにラムを注ぎ、軽くステアして冷やします。",
      "冷えたソーダを静かに注ぎ、底から軽く1回ステアしてライムを添えます。"
    ]
  },
  "rum+grapefruit+tonic": {
    name: "ソル・クバーノ",
    enName: "Sol Cubano",
    abv: 8,
    taste: ["ほろ苦い", "フルーティー", "爽快"],
    description: "「キューバの太陽」という名を持つ、日本生まれのトロピカルカクテル。グレープフルーツの酸味と苦味に、トニックウォーターの甘苦さが重なる、夏にぴったりの一杯です。",
    color: "rgba(255, 246, 190, 0.55)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "グレープフルーツジュース", amount: "60 ml" },
      { name: "トニックウォーター", amount: "適量" }
    ],
    method: [
      "氷を満たしたグラスにラムとグレープフルーツジュースを注ぎ、ステアします。",
      "冷えたトニックウォーターを静かに満たし、軽く1回混ぜてライムを飾ります。"
    ]
  },
  "rum+ginger+lemon+sugar": {
    name: "ボストン・クーラー",
    enName: "Boston Cooler",
    abv: 9,
    taste: ["甘酸っぱい", "スパイシー", "爽快"],
    description: "レモンの酸味とシロップの甘み、ジンジャーエールの辛みがホワイト・ラムを軽やかに包む、クーラースタイルの代表的クラシックカクテル。",
    color: "rgba(242, 220, 170, 0.5)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "フレッシュ・レモン果汁", amount: "20 ml" },
      { name: "シュガーシロップ", amount: "1 tsp" },
      { name: "ジンジャーエール", amount: "適量" }
    ],
    method: [
      "シェイカーにラム、レモン果汁、シロップ、氷を入れてシェイクします。",
      "氷を入れたグラスに注ぎ、冷えたジンジャーエールで満たして軽くステアし、レモンスライスを飾ります。"
    ]
  },
  "rum+lime": {
    name: "ダイキリ",
    enName: "Daiquiri",
    abv: 22,
    taste: ["シャープ", "甘酸っぱい", "すっきり"],
    description: "ラムをベースにした、世界で最も人気のあるIBA公認クラシックカクテルのひとつ。ライムの爽やかな酸味とシロップの甘みがラムを絶妙に引き立てます。",
    color: "rgba(235, 245, 230, 0.35)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "60 ml" },
      { name: "ライムジュース", amount: "20 ml" },
      { name: "シュガーシロップ", amount: "2 tsp" }
    ],
    method: [
      "シェイカーに氷と材料を入れ、よくシェイクします。",
      "冷やしたカクテルグラス（氷なし）に注ぎ入れます。"
    ]
  },
  "rum+curacao+lemon": {
    name: "XYZ",
    enName: "X.Y.Z.",
    abv: 26,
    taste: ["強い", "甘酸っぱい", "フルーティー"],
    description: "アルファベットの最後である「XYZ」は「これ以上のものは無い」「究極の一杯」を意味します。ラムの甘い香りにキュラソーの華やかさ、レモンの酸味が調和したショートカクテルです。",
    color: "rgba(240, 245, 240, 0.35)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    ingredients: [
      { name: "ホワイト・ラム", amount: "30 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
      { name: "レモンジュース", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れて強くシェイクします。",
      "カクテルグラス（氷なし）に注ぎます。"
    ]
  },
  "rum+curacao+orange": {
    name: "エル・プレジデンテ",
    enName: "El Presidente",
    abv: 22,
    taste: ["芳醇", "フルーティー", "やや甘口"],
    description: "「大統領」という名を持つ、キューバ発祥のクラシックカクテル。ラムのふくよかさにキュラソーの甘味とオレンジジュースが加わり、深く上品な味わいを生み出します。",
    color: "rgba(255, 110, 64, 0.8)",
    hasBubbles: false,
    garnish: "orange",
    ice: "none",
    ingredients: [
      { name: "ホワイト・ラム", amount: "40 ml" },
      { name: "ホワイトキュラソー", amount: "10 ml" },
      { name: "オレンジジュース", amount: "10 ml" }
    ],
    method: [
      "氷と一緒に材料をステアまたはシェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "rum+soda+tonic": {
    name: "ラム・ソニック",
    enName: "Rum Sonic",
    abv: 9,
    taste: ["甘やか", "ドライ", "爽快"],
    description: "ホワイトラムの甘く芳醇な風味に、トニックウォーターのほろ苦さとソーダのドライ感を1:1で注いだ、さっぱり爽快なロングカクテル。",
    color: "rgba(240, 248, 240, 0.25)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "トニックウォーター", amount: "60 ml" },
      { name: "ソーダ (炭酸水)", amount: "60 ml" }
    ],
    method: [
      "氷入りグラスにラムを注ぎ、トニックとソーダを同量注ぎ、軽くステアします。"
    ]
  },

  // --- TEQUILA BASE ---
  "tequila+tonic": {
    name: "テコニック",
    enName: "Tequonic",
    abv: 10,
    taste: ["爽快", "アガベの香り", "ほろ苦い"],
    description: "テキーラをトニックウォーターで割った、非常に爽やかで個性際立つカクテル。アガベの香りがトニックの酸味と苦味によって引き立てられます。",
    color: "rgba(249, 251, 231, 0.35)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "テキーラ", amount: "45 ml" },
      { name: "トニックウォーター", amount: "適量" },
      { name: "ライムカット", amount: "1個" }
    ],
    method: [
      "氷を入れたグラスにテキーラを注ぎ、トニックウォーターを静かに注ぎ入れます。",
      "炭酸を維持するために優しく1回だけステアし、ライムを添えます。"
    ]
  },
  "tequila+cola": {
    name: "メキシコーラ",
    enName: "Mexicola",
    abv: 9,
    taste: ["スパイシー", "爽快", "エキゾチック"],
    description: "テキーラをコーラで割った、エキゾチックなハイボールカクテル。レモンの酸味が全体をすっきりと整え、コーラのスパイシーさを際立たせます。",
    color: "rgba(62, 39, 35, 0.9)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "テキーラ", amount: "45 ml" },
      { name: "レモン果汁", amount: "10 ml" },
      { name: "コーラ", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにテキーラとレモン果汁を注ぎ、軽くステアします。",
      "冷えたコーラをゆっくり満たします。レモンを添えて完成です。"
    ]
  },
  "tequila+orange": {
    name: "テキーラ・サンライズ",
    enName: "Tequila Sunrise",
    abv: 12,
    taste: ["フルーティー", "濃厚", "グラデーション"],
    description: "メキシコの美しい朝焼け（サンライズ）をグラスの中に表現した、視覚的にも美しい傑作カクテル。オレンジジュースの黄と、底に沈む赤いグレナデンのグラデーションが美しい一杯です。",
    color: "linear-gradient(to top, rgba(230, 74, 25, 0.95) 0%, rgba(255, 183, 77, 0.9) 70%)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "テキーラ", amount: "45 ml" },
      { name: "オレンジジュース", amount: "90 ml" },
      { name: "グレナデンシロップ", amount: "15 ml" }
    ],
    method: [
      "氷を入れたグラスにテキーラとオレンジジュースを注ぎ、ステアします。",
      "グレナデンシロップを底に静かに沈め（混ぜない）、オレンジを飾ります。"
    ]
  },
  "tequila+soda": {
    name: "テキーラ・ソーダ",
    enName: "Tequila & Soda",
    abv: 10,
    taste: ["ドライ", "爽快", "アガベ風味"],
    description: "テキーラを炭酸水（ソーダ）だけで割った、糖質ゼロで極めてドライな一杯。ライムを絞ることで、テキーラ特有のボタニカル感と爽やかなキレが楽しめます。",
    color: "rgba(240, 245, 240, 0.25)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "テキーラ", amount: "45 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにテキーラを注ぎ、ソーダをゆっくりと注ぎ入れ、軽く1ステアしてライムを添えます。"
    ]
  },
  "tequila+curacao+lime": {
    name: "マルガリータ",
    enName: "Margarita",
    abv: 26,
    taste: ["強い", "塩気と酸味", "さっぱり"],
    description: "テキーラをベースにした、世界で最も人気のあるIBA公認クラシックショートカクテル。キュラソーのオレンジの甘味とライムの酸味、グラスの縁の塩が完璧に調和します。",
    color: "rgba(224, 242, 241, 0.35)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    saltRim: true,
    isIBA: true,
    ingredients: [
      { name: "テキーラ", amount: "50 ml" },
      { name: "ホワイトキュラソー", amount: "20 ml" },
      { name: "ライムジュース", amount: "15 ml" },
      { name: "塩 (スノースタイル用)", amount: "適量" }
    ],
    method: [
      "カクテルグラスのフチを濡らし、塩をまぶします（スノースタイル）。",
      "氷を入れたシェイカーに材料を注ぎ、よくシェイクしてグラスに注ぎます。"
    ]
  },
  "tequila+curacao+lime+salt": {
    name: "マルガリータ",
    enName: "Margarita (Standard)",
    abv: 26,
    taste: ["強い", "塩気と酸味", "さっぱり"],
    description: "テキーラをベースにした、世界で最も人気のあるIBA公認クラシックショートカクテル。キュラソーのオレンジの甘味とライムの酸味、グラスのフチの塩が完璧に調和します。",
    color: "rgba(224, 242, 241, 0.35)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    summer: true,
    saltRim: true,
    isIBA: true,
    ingredients: [
      { name: "テキーラ", amount: "50 ml" },
      { name: "ホワイトキュラソー", amount: "20 ml" },
      { name: "ライムジュース", amount: "15 ml" },
      { name: "塩 (スノースタイル用)", amount: "適量" }
    ],
    method: [
      "カクテルグラスのフチを濡らし、塩をまぶします（スノースタイル）。",
      "氷を入れたシェイカーに材料を注ぎ、よくシェイクしてグラスに注ぎます。"
    ]
  },
  "tequila+lime+pineapple": {
    name: "マタドール",
    enName: "Matador",
    abv: 12,
    taste: ["トロピカル", "フルーティー", "甘口"],
    description: "闘牛の「闘牛士」の名を持つカクテル。パイナップルの濃厚な甘みと、ライムの酸味がテキーラの特有の風味をまろやかに包み込み、非常に口当たりの良いテイストに仕上がっています。",
    color: "rgba(255, 235, 59, 0.75)",
    hasBubbles: false,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "テキーラ", amount: "30 ml" },
      { name: "パイナップルジュース", amount: "45 ml" },
      { name: "ライムジュース", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、しっかりとシェイクします。",
      "氷を満たしたグラスに注ぎ入れます。"
    ]
  },
  "tequila+cassis+ginger+lime": {
    name: "エル・ディアブロ",
    enName: "El Diablo",
    abv: 14,
    taste: ["甘酸っぱい", "スパイシー", "爽快"],
    description: "「悪魔」という妖艶な名を持つメキシコ発祥の傑作カクテル。カシスの濃厚な甘酸っぱさとライム、ジンジャーエールのピリッとした辛みが合わさった非常に飲みやすい一杯です。",
    color: "rgba(136, 14, 79, 0.8)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "テキーラ", amount: "40 ml" },
      { name: "カシスリキュール", amount: "10 ml" },
      { name: "ライムジュース", amount: "10 ml" },
      { name: "ジンジャーエール", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにテキーラ、カシス、ライムジュースを注ぎ、ステアします。",
      "冷えたジンジャーエールを静かに注ぎ、軽く混ぜてライムを添えます。"
    ]
  },
  "tequila+grapefruit+soda": {
    name: "パローマ",
    enName: "Paloma",
    abv: 8,
    taste: ["ほろ苦い", "さっぱり", "爽快"],
    description: "メキシコで最も日常的に飲まれているとされる、IBA公認カクテル。テキーラをグレープフルーツとソーダで割った、軽やかでほろ苦い喉ごしが魅力。塩をひとつまみ加えるのも定番です。",
    color: "rgba(255, 244, 180, 0.5)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    isIBA: true,
    ingredients: [
      { name: "テキーラ", amount: "45 ml" },
      { name: "グレープフルーツジュース", amount: "60 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量" },
      { name: "ライムカット", amount: "1個" }
    ],
    method: [
      "氷を満たしたグラスにテキーラとグレープフルーツジュースを注ぎ、ステアします。",
      "冷えたソーダを静かに満たし、軽く1回混ぜてライムを絞り入れます。"
    ]
  },
  "tequila+soda+tonic": {
    name: "テキーラ・ソニック",
    enName: "Tequila Sonic",
    abv: 9,
    taste: ["爽快", "すっきり", "ほろ苦い"],
    description: "テキーラを炭酸水とトニックウォーターで同量割りにした、クリアなカクテル。アガベの風味とトニックの苦味がキレ良く楽しめます。",
    color: "rgba(240, 248, 240, 0.25)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    ingredients: [
      { name: "テキーラ", amount: "45 ml" },
      { name: "トニックウォーター", amount: "60 ml" },
      { name: "ソーダ (炭酸水)", amount: "60 ml" }
    ],
    method: [
      "氷を満たしたグラスにテキーラを注ぎ、トニックとソーダを満たし、軽くステアしてライムを添えます。"
    ]
  },

  // --- WHISKEY BASE ---
  "whiskey+soda": {
    name: "ハイボール",
    enName: "Whiskey Highball",
    abv: 8,
    taste: ["スモーキー", "ドライ", "爽快"],
    description: "ウイスキーを炭酸水で割った、非常にシンプルで味わい深い一杯。ウイスキー本来の樽香やコクが炭酸によって爽やかに立ち上がります。",
    color: "rgba(224, 185, 120, 0.4)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ウイスキー", amount: "40 ml" },
      { name: "ソーダ (炭酸水)", amount: "120 ml" }
    ],
    method: [
      "グラスに氷をたっぷり入れ、ウイスキーを注いでステアし冷やします。",
      "冷えたソーダをゆっくり注ぎ、マドラーで底から軽く1回ステアします。"
    ]
  },
  "whiskey+cola": {
    name: "ジャック・コーク",
    enName: "Jack & Coke",
    abv: 9,
    taste: ["甘口", "スモーキー", "バニラ香"],
    description: "テネシーウイスキーの甘くスモーキーな樽香と、コーラのスパイシーな風味が合わさった定番ロングカクテル。レモンを添えるのが定番です。",
    color: "rgba(62, 39, 35, 0.92)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ウイスキー", amount: "45 ml" },
      { name: "コーラ", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにウイスキーを注ぎ、冷えたコーラを静かに満たし、底から軽く1回ステアします。"
    ]
  },
  "whiskey+ginger": {
    name: "ウイスキー・バック",
    enName: "Whiskey Buck",
    abv: 9,
    taste: ["スパイシー", "芳醇", "爽快"],
    description: "ウイスキーにレモンの酸味を加え、ジンジャーエールで割った一杯。ジンジャーの持つピリッとした辛みと樽のコクが非常に良く合います。",
    color: "rgba(224, 185, 110, 0.55)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ウイスキー", amount: "45 ml" },
      { name: "レモン果汁", amount: "10 ml" },
      { name: "ジンジャーエール", amount: "適量" }
    ],
    method: [
      "氷入りグラスにウイスキーとレモン果汁を注ぎステアします。",
      "冷えたジンジャーエールを満たして軽く混ぜます。"
    ]
  },

  // --- BRANDY BASE ---
  "brandy+cola": {
    name: "フレンチ・コーク",
    enName: "French Coke",
    abv: 10,
    taste: ["芳醇", "甘口", "重厚"],
    description: "コニャックやブランデーの芳醇な風味と、コーラの甘みが合わさった贅沢な一杯。樽由来の華やかなバニラ香がコーラのカラメル香とブレンドし、重厚なコークハイになります。",
    color: "rgba(78, 52, 46, 0.9)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ブランデー", amount: "45 ml" },
      { name: "コーラ", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにブランデーを注ぎ、コーラを静かに注ぎ満たし、軽く混ぜてレモンを添えます。"
    ]
  },
  "brandy+soda": {
    name: "フレンチ・ハイボール",
    enName: "French Highball",
    abv: 9,
    taste: ["フルーティー", "華やか", "ドライ"],
    description: "ブランデーを炭酸水（ソーダ）だけで割った、爽快で優雅なハイボール。ブランデーのブドウ由来の果実香が炭酸の泡とともに弾け、すっきり楽しめます。",
    color: "rgba(215, 140, 70, 0.35)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ブランデー", amount: "40 ml" },
      { name: "ソーダ (炭酸水)", amount: "120 ml" }
    ],
    method: [
      "氷入りグラスにブランデーを注いで冷やします。",
      "冷えたソーダをゆっくりと満たし、底から氷を持ち上げるように軽く混ぜます。"
    ]
  },
  "brandy+curacao+lemon": {
    name: "サイドカー",
    enName: "Sidecar",
    abv: 26,
    taste: ["強い", "甘酸っぱい", "芳醇"],
    description: "ブランデーベースを代表するIBA公認クラシックショートカクテル。ブランデーの豊かなコク、ホワイトキュラソーのオレンジの甘味、レモンの酸味が三位一体となった最高峰のカクテルです。",
    color: "rgba(235, 160, 60, 0.65)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ブランデー (コニャック)", amount: "50 ml" },
      { name: "ホワイトキュラソー", amount: "20 ml" },
      { name: "レモンジュース", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、しっかりとシェイクします。",
      "冷やしたカクテルグラス（氷なし）に注ぎます。"
    ]
  },
  "brandy+ginger": {
    name: "ホーセズ・ネック",
    enName: "Horse's Neck",
    abv: 11,
    taste: ["芳醇", "スパイシー", "レモンのアロマ"],
    description: "「馬の首」という名を持つ伝統的なカクテル。螺旋状に剥いたレモンの皮をグラスに飾り、ブランデーの芳醇なブドウの香りとジンジャーの辛みが調和します。",
    color: "rgba(215, 130, 60, 0.55)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ブランデー", amount: "45 ml" },
      { name: "ジンジャーエール", amount: "適量" },
      { name: "レモンの皮 (螺旋状)", amount: "1個分" }
    ],
    method: [
      "らせん状に剥いたレモンの皮をグラスに入れ、端をフチに掛けます。",
      "氷を詰めてブランデーを注ぎ、冷えたジンジャーエールで満たして軽くステアします。"
    ]
  },

  // --- PEACH BASE ---
  "peach+orange": {
    name: "ファジーネーブル",
    enName: "Fuzzy Navel",
    abv: 5,
    taste: ["とろける甘さ", "フルーティー", "低アルコール"],
    description: "ピーチリキュールとオレンジジュースを掛け合わせた大人気カクテル。ピーチの濃厚な甘みとオレンジのすっきりした酸味がマッチし、非常に飲みやすいのが魅力です。",
    color: "rgba(255, 179, 64, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    ingredients: [
      { name: "ピーチリキュール", amount: "45 ml" },
      { name: "オレンジジュース", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "氷を満たしたグラスにピーチリキュールを注ぎます。",
      "オレンジジュースを満たし、底からしっかりとステアして混ぜ合わせ、オレンジを飾ります。"
    ]
  },
  "peach+soda": {
    name: "ピーチ・フィズ",
    enName: "Peach Fizz",
    abv: 5,
    taste: ["軽快", "みずみずしい甘口", "爽快"],
    description: "ピーチリキュールをシンプルにソーダで割った一杯。桃のみずみずしく華やかな甘さが炭酸の泡に乗って優しく香り、すっきり軽快に飲めます。",
    color: "rgba(255, 235, 230, 0.4)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "ピーチリキュール", amount: "45 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "氷を満たしたグラスにリキュールを注ぎ、冷えたソーダを満たして底から優しく1回ステアします。レモンを添えます。"
    ]
  },
  "peach+oolong": {
    name: "レゲエ・パンチ",
    enName: "Reggae Punch",
    abv: 5,
    taste: ["すっきり甘い", "お茶の香ばしさ", "低アルコール"],
    description: "ピーチリキュールをウーロン茶で割った、仙台発祥の大人気カクテル。「ピーチ・ウーロン」とも呼ばれます。桃の甘い香りとウーロン茶のすっきりした渋みで、驚くほど飲みやすい一杯です。",
    color: "rgba(196, 138, 70, 0.55)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "ピーチリキュール", amount: "45 ml" },
      { name: "ウーロン茶", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "氷を満たしたグラスにピーチリキュールを注ぎます。",
      "ウーロン茶で満たし、底からしっかりとステアします。"
    ]
  },
  "peach+milk": {
    name: "ピーチ・ミルク",
    enName: "Peach & Milk",
    abv: 5,
    taste: ["クリーミー", "とろける甘口", "まるで桃デザート"],
    description: "ピーチリキュールと牛乳を合わせた、とろけるような甘口カクテル。ピーチの芳醇な果実香とミルクのコクが混ざり合い、濃厚なデザート感を生み出します。",
    color: "rgba(255, 245, 240, 0.95)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "ピーチリキュール", amount: "45 ml" },
      { name: "牛乳 (ミルク)", amount: "120 ml" }
    ],
    method: [
      "氷を満たしたロックグラスにピーチリキュールと牛乳を注ぎ、きれいな乳白色になるまでしっかりとかき混ぜます。"
    ]
  },

  // --- CASSIS BASE ---
  "cassis+orange": {
    name: "カシス・オレンジ",
    enName: "Cassis & Orange",
    abv: 5,
    taste: ["フルーティー", "甘酸っぱい", "グラデーション"],
    description: "カシスリキュールにオレンジジュースをそっと注ぐ大人気カクテル。カシスの濃厚なベリーの甘酸っぱさとオレンジの酸味が調和し、美しい2層グラデーションを作ります。",
    color: "linear-gradient(to top, rgba(136, 14, 79, 0.9) 0%, rgba(255, 167, 38, 0.85) 80%)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    ingredients: [
      { name: "カシスリキュール", amount: "45 ml" },
      { name: "オレンジジュース", amount: "適量" }
    ],
    method: [
      "グラスに氷をたっぷり入れ、まずカシスリキュールを注ぎます。",
      "冷えたオレンジジュースを、氷に当てながら非常にゆっくりと注ぎ入れることで、美しい2層グラデーションを作ります。"
    ]
  },
  "cassis+soda": {
    name: "カシス・ソーダ",
    enName: "Cassis Soda",
    abv: 5,
    taste: ["さっぱり甘酸っぱい", "爽快", "定番"],
    description: "カシスの甘酸っぱい果実味を、炭酸水（ソーダ）ですっきりと割った定番カクテル。甘さを抑えてさわやかに仕上がります。",
    color: "rgba(136, 14, 79, 0.75)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "カシスリキュール", amount: "45 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "氷を満たしたグラスにカシスを注ぎ、冷えたソーダを満たして、底からしっかりステアします。レモンを添えます。"
    ]
  },
  "cassis+milk": {
    name: "カシス・ミルク",
    enName: "Cassis & Milk",
    abv: 5,
    taste: ["まろやか", "とろみ", "極甘"],
    description: "カシスリキュールを牛乳で割ったカクテル。カシスに含まれるわずかな有機酸と牛乳のタンパク質が反応し、飲むと驚くほどトロリとした口当たりになり、デザート感覚で頂けます。",
    color: "rgba(240, 190, 210, 0.95)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "カシスリキュール", amount: "45 ml" },
      { name: "牛乳 (ミルク)", amount: "120 ml" }
    ],
    method: [
      "グラスに氷をたっぷり入れ、カシスリキュールを注ぎます。",
      "冷えた牛乳を注ぎ入れ、きれいなピンク色になるまでよくかき混ぜます。"
    ]
  },
  "cassis+cola": {
    name: "カシス・コーク",
    enName: "Cassis & Coke",
    abv: 5,
    taste: ["スパイシー", "極甘", "爽快"],
    description: "カシスリキュールにコーラを注いだ、濃厚な甘みと爽快な炭酸が楽しめるカクテル。レモンをしっかりと絞ることで、引き締まったプロの味になります。",
    color: "rgba(100, 15, 30, 0.9)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "カシスリキュール", amount: "30 ml" },
      { name: "フレッシュ・レモン果汁", amount: "10 ml" },
      { name: "コーラ", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにカシスリキュールとレモン果汁を注ぎ、ステアします。",
      "冷えたコーラを静かに注ぎ、軽くステアしてレモンスライスを飾ります。"
    ]
  },
  "cassis+ginger": {
    name: "カシス・ジンジャー",
    enName: "Cassis Ginger",
    abv: 6,
    taste: ["甘酸っぱい", "スパイシー", "すっきり"],
    description: "カシスリキュールをジンジャーエールで割った、居酒屋でもバーでも定番の一杯。ベリーの上品な甘酸っぱさにジンジャーのピリッとした辛みが重なり、甘すぎず飲み飽きしません。",
    color: "rgba(180, 25, 45, 0.8)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "カシスリキュール", amount: "30 ml" },
      { name: "フレッシュ・レモン果汁", amount: "10 ml" },
      { name: "ジンジャーエール", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにカシスとレモン果汁を注ぎ、軽くステアします。",
      "冷えたジンジャーエールを静かに満たし、軽く1回混ぜ、レモンを飾ります。"
    ]
  },
  "cassis+oolong": {
    name: "カシス・ウーロン",
    enName: "Cassis & Oolong",
    abv: 5,
    taste: ["甘酸っぱい", "すっきり", "食事に合う"],
    description: "カシスリキュールをウーロン茶で割った、日本の居酒屋定番カクテル。ベリーの甘酸っぱさをウーロン茶の渋みが引き締め、油ものの食事とも相性抜群。甘いお酒が苦手な人にも好まれます。",
    color: "rgba(150, 60, 60, 0.6)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "カシスリキュール", amount: "45 ml" },
      { name: "ウーロン茶", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "氷を満たしたグラスにカシスリキュールを注ぎます。",
      "ウーロン茶で満たし、底からしっかりとステアします。"
    ]
  },
  "cassis+soda+tonic": {
    name: "カシス・ソニック",
    enName: "Cassis Sonic",
    abv: 5,
    taste: ["甘酸っぱい", "爽快", "さっぱり"],
    description: "カシスリキュールの濃厚な甘酸っぱさを、トニックの甘苦炭酸とソーダで軽快に割ったソニック。非常にすっきりと頂ける大人向けカシスソーダ。",
    color: "rgba(186, 24, 76, 0.65)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "カシスリキュール", amount: "45 ml" },
      { name: "トニックウォーター", amount: "60 ml" },
      { name: "ソーダ (炭酸水)", amount: "60 ml" }
    ],
    method: [
      "氷入りグラスにカシスを注ぎ、トニックとソーダを注いで底からしっかりステアします。"
    ]
  },

  // --- COFFEE BASE ---
  "coffee+milk": {
    name: "カルーア・ミルク",
    enName: "Kahlua & Milk",
    abv: 6,
    taste: ["クリーミー", "極甘", "大人気デザート"],
    description: "言わずと知れたカクテル界の極甘レジェンド。下にコーヒーリキュール、上に牛乳をそっと浮かべた2層スタイルが特徴的で、混ぜて飲むと濃厚なコーヒー牛乳味になります。",
    color: "linear-gradient(to top, rgba(78, 52, 46, 0.95) 0%, rgba(255, 255, 255, 0.9) 70%)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "コーヒーリキュール (カルーア)", amount: "45 ml" },
      { name: "牛乳 (ミルク)", amount: "120 ml" }
    ],
    method: [
      "グラスに氷を満たし、まずコーヒーリキュールを注ぎます。",
      "牛乳を氷に当てながら非常にゆっくりと注ぎ入れ、美しい2層スタイルに仕上げます。"
    ]
  },
  "coffee+soda": {
    name: "カルーア・ソーダ",
    enName: "Kahlua Soda",
    abv: 6,
    taste: ["さっぱり", "ほろ苦い", "ライトコーヒー"],
    description: "コーヒーリキュールをソーダだけで割ることで、甘さを抑えたクリアなコーヒーカクテル。すっきりとした香ばしさが喉を潤します。",
    color: "rgba(100, 70, 50, 0.75)",
    hasBubbles: true,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "コーヒーリキュール", amount: "45 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "グラスに氷を詰め、コーヒーリキュールを注ぎます。",
      "冷えた炭酸水を優しく注ぎ、底に沈んだリキュールを浮かせるように静かにステアします。"
    ]
  },
  "coffee+cola": {
    name: "カルーア・コーク",
    enName: "Kahlua & Cola",
    abv: 5,
    taste: ["スパイシー", "極甘", "爽快"],
    description: "コーヒーリキュールをコーラで割った、非常にスウィートで爽快な炭酸ドリンク。カラメルとコーヒー豆のロースト香が結びつき、コーラ単体よりも深みが出ます。",
    color: "rgba(50, 30, 20, 0.92)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "コーヒーリキュール", amount: "30 ml" },
      { name: "レモン果汁", amount: "10 ml" },
      { name: "コーラ", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにコーヒーリキュールとレモン果汁を注ぎ、ステアします。",
      "冷えたコーラをごく静かに注ぎ満たし、軽く1回ステアしてレモンを飾ります。"
    ]
  },
  "coffee+tonic": {
    name: "コーヒー・トニック",
    enName: "Coffee & Tonic",
    abv: 6,
    taste: ["香ばしい", "ビター＆スイート", "大人向け"],
    description: "コーヒーリキュールにトニックウォーターを合わせた、近年人気のトレンドカクテル。コーヒーの深く香ばしい焙煎香とトニック特有の苦味がシンクロします。",
    color: "rgba(80, 50, 30, 0.8)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "コーヒーリキュール", amount: "30 ml" },
      { name: "トニックウォーター", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにコーヒーリキュールを注ぎます。",
      "冷えたトニックウォーターをゆっくりと注ぎ入れ、軽くステアしてレモンを飾ります。"
    ]
  },
  "gin+dry_vermouth+olive": {
    name: "ドライ・マティーニ",
    enName: "Dry Martini",
    abv: 32,
    taste: ["非常にドライ", "シャープ", "ハーブ香"],
    description: "「カクテルの王様」と呼ばれる至高の一杯。ジンとドライ・ベルモットの鋭いキレに、オリーブの塩気が絶妙なアクセントを与えます。",
    color: "rgba(245, 245, 220, 0.4)",
    hasBubbles: false,
    garnish: "olive",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "60 ml" },
      { name: "ドライ・ベルモット", amount: "10 ml" },
      { name: "オリーブ", amount: "1個" }
    ],
    method: [
      "ミキシンググラスに氷とジン、ベルモットを入れ、ステアします。",
      "冷やしたカクテルグラスに注ぎ、オリーブを飾ります。"
    ]
  },
  "gin+campari+sweet_vermouth": {
    name: "ネグローニ",
    enName: "Negroni",
    abv: 24,
    taste: ["ビター＆スイート", "薬草香", "深い苦味"],
    description: "イタリアのネグローニ伯爵が愛飲したアペリティフ（食前酒）。カンパリの苦味とベルモットの甘味、ジンの香りが複雑に絡み合う傑作。",
    color: "rgba(211, 47, 47, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "30 ml" },
      { name: "カンパリ", amount: "30 ml" },
      { name: "スイート・ベルモット", amount: "30 ml" }
    ],
    method: [
      "氷を入れたロックグラスに材料をすべて注ぎ、軽くステアします。",
      "オレンジピールまたはオレンジスライスを飾ります。"
    ]
  },
  "gin+lemon+maraschino_liq": {
    name: "アビエイション",
    enName: "Aviation",
    abv: 26,
    taste: ["甘酸っぱい", "チェリー香", "フローラル"],
    description: "「飛行」を意味するカクテル。マラスキーノのチェリー風味とレモンの酸味がジンに美しく調和するクラシックカクテル。",
    color: "rgba(230, 230, 250, 0.5)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "マラスキーノ・リキュール", amount: "15 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "クレーム・ド・バイオレット", amount: "1 tsp" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "brandy+cacao+cream": {
    name: "アレキサンダー",
    enName: "Alexander",
    abv: 15,
    taste: ["甘口", "クリーミー", "デザート感覚"],
    description: "ブランデーの芳醇な香りにカカオと生クリームが溶け合う、濃厚でリッチなデザートカクテル。",
    color: "rgba(215, 204, 200, 0.95)",
    hasBubbles: false,
    garnish: "nutmeg",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ブランデー", amount: "30 ml" },
      { name: "クレーム・ド・カカオ", amount: "30 ml" },
      { name: "生クリーム", amount: "30 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、強くシェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "whiskey+bitters+maraschino_cherry+sweet_vermouth": {
    name: "マンハッタン",
    enName: "Manhattan",
    abv: 32,
    taste: ["芳醇", "ビター＆スイート", "スパイシー"],
    description: "「カクテルの女王」と称される名作。ウイスキーの力強さにスイートベルモットの甘味とビターズの香りが合わさる都会的な一杯。",
    color: "rgba(183, 28, 28, 0.8)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ライ・ウイスキー (またはバーボン)", amount: "50 ml" },
      { name: "スイート・ベルモット", amount: "20 ml" },
      { name: "アンゴスチュラ・ビターズ", amount: "1ダッシュ" },
      { name: "マラスキーノ・チェリー", amount: "1個" }
    ],
    method: [
      "ミキシンググラスに氷と材料を入れ、ステアします。",
      "冷やしたカクテルグラスに注ぎ、チェリーを飾ります。"
    ]
  },
  "whiskey+bitters+sugar": {
    name: "オールド・ファッションド",
    enName: "Old Fashioned",
    abv: 30,
    taste: ["ウイスキー本来の味", "ほんのり甘い", "芳醇"],
    description: "世界で最も注文されるクラシックカクテルの一つ。ウイスキーの風味をそのままに、砂糖とビターズで優しく引き立てた歴史ある一杯。",
    color: "rgba(230, 81, 0, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "バーボン・ウイスキー", amount: "45 ml" },
      { name: "角砂糖", amount: "1個" },
      { name: "アンゴスチュラ・ビターズ", amount: "2ダッシュ" },
      { name: "少量の水またはソーダ", amount: "適量" }
    ],
    method: [
      "ロックグラスに角砂糖を入れ、ビターズと水を落として潰します。",
      "氷を入れ、ウイスキーを注いでステアします。"
    ]
  },
  "whiskey+campari+sweet_vermouth": {
    name: "ブールヴァルディエ",
    enName: "Boulevardier",
    abv: 26,
    taste: ["ビター＆スイート", "濃厚", "複雑"],
    description: "「ネグローニ」のジンをウイスキーに置き換えたカクテル。ウイスキーの樽香とカンパリの苦味が織りなす濃厚で芳醇な大人の味。",
    color: "rgba(198, 40, 40, 0.9)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "バーボン・ウイスキー", amount: "45 ml" },
      { name: "カンパリ", amount: "30 ml" },
      { name: "スイート・ベルモット", amount: "30 ml" }
    ],
    method: [
      "氷を入れたロックグラスに材料を注ぎ、ステアします。",
      "オレンジピールを飾ります。"
    ]
  },
  "whiskey+lemon+sugar": {
    name: "ウイスキー・サワー",
    enName: "Whiskey Sour",
    abv: 18,
    taste: ["甘酸っぱい", "さっぱり", "フルーティー"],
    description: "ウイスキーにレモンの酸味と砂糖の甘味を加えた、シンプルかつ完成されたサワースタイルの代名詞。",
    color: "rgba(249, 168, 37, 0.7)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "バーボン・ウイスキー", amount: "45 ml" },
      { name: "レモンジュース", amount: "25 ml" },
      { name: "シロップ", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と材料を入れ、しっかりとシェイクします。",
      "冷やしたグラスに注ぎます（好みで氷を入れても良い）。"
    ]
  },
  "rum+lime+sugar": {
    name: "ダイキリ",
    enName: "Daiquiri",
    abv: 22,
    taste: ["甘酸っぱい", "爽快", "キレがある"],
    description: "ラムベースのショートカクテルの最高傑作。ラムの甘い香りにライムの酸味が鋭く効いた、ヘミングウェイも愛した名作。",
    color: "rgba(241, 248, 233, 0.4)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "60 ml" },
      { name: "ライムジュース", amount: "20 ml" },
      { name: "シロップ", amount: "2 tsp" }
    ],
    method: [
      "シェイカーに氷と材料を入れ、シェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "rum+grenadine+lime": {
    name: "バカルディ",
    enName: "Bacardi",
    abv: 22,
    taste: ["フルーティー", "甘酸っぱい", "華やか"],
    description: "バカルディ社のラムを指定して作られるカクテル。グレナデンシロップの赤い色合いとほのかなザクロの風味が特徴。",
    color: "rgba(229, 57, 53, 0.8)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "none",
    ingredients: [
      { name: "バカルディ・ホワイト・ラム", amount: "45 ml" },
      { name: "ライムジュース", amount: "20 ml" },
      { name: "グレナデンシロップ", amount: "10 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、強くシェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "rum+brandy+curacao+lemon": {
    name: "ビトウィーン・ザ・シーツ",
    enName: "Between the Sheets",
    abv: 30,
    taste: ["強い", "甘酸っぱい", "芳醇"],
    description: "「シーツの間」という名を持つセクシーなカクテル。ブランデーとラムという2つの強いお酒が織りなす、パンチがありつつも華やかな味わい。",
    color: "rgba(255, 204, 128, 0.7)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "30 ml" },
      { name: "ブランデー (コニャック)", amount: "30 ml" },
      { name: "ホワイトキュラソー", amount: "30 ml" },
      { name: "レモンジュース", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "vodka+ginger+lime": {
    name: "モスコミュール",
    enName: "Moscow Mule",
    abv: 12,
    taste: ["スパイシー", "爽快", "キレがある"],
    description: "「モスクワのラバ（キックが強い）」という意味。ウォッカのクセのなさにジンジャーエールの辛みとライムの酸味が映える、定番中の定番。",
    color: "rgba(244, 208, 63, 0.5)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    isIBA: true,
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "ジンジャーエール (ジンジャービア)", amount: "120 ml" },
      { name: "ライムジュース", amount: "10 ml" }
    ],
    method: [
      "氷を入れた銅製マグカップまたはグラスにウォッカとライムジュースを注ぎます。",
      "ジンジャーエールを満たし、軽くステアします。"
    ]
  },
  "vodka+lemon+tomato": {
    name: "ブラッディ・メアリー",
    enName: "Bloody Mary",
    abv: 10,
    taste: ["塩辛い", "スパイシー", "旨味"],
    description: "トマトジュースの旨味とウォッカを合わせた、「飲むサラダ」とも呼ばれるカクテル。タバスコやウスターソースなどで好みの味にアレンジできます。",
    color: "rgba(211, 47, 47, 0.95)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "トマトジュース", amount: "90 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "スパイス (タバスコ・塩コショウ等)", amount: "少々" }
    ],
    method: [
      "氷を入れたグラスに材料をすべて注ぎ、ステアします。",
      "レモンやセロリスティックなどを飾ります。"
    ]
  },
  "vodka+coffee+espresso": {
    name: "エスプレッソ・マティーニ",
    enName: "Espresso Martini",
    abv: 20,
    taste: ["コーヒーの苦味", "甘い", "濃厚"],
    description: "現代のクラシックとも言える、ロンドンのバーテンダーが考案したカクテル。エスプレッソの濃厚な香りとクリーミーな泡が特徴です。",
    color: "rgba(46, 31, 25, 0.95)",
    hasBubbles: false,
    garnish: "coffee_bean",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ウォッカ", amount: "50 ml" },
      { name: "コーヒーリキュール", amount: "30 ml" },
      { name: "エスプレッソ (冷ましたもの)", amount: "1ショット" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、強い力でしっかりとシェイクし泡立てます。",
      "冷やしたカクテルグラスに注ぎ、コーヒー豆を3粒飾ります。"
    ]
  },
  "gin+curacao+lemon": {
    name: "ホワイト・レディ",
    enName: "White Lady",
    abv: 26,
    taste: ["甘酸っぱい", "スッキリ", "華やか"],
    description: "「白い貴婦人」の名を持つ、美しく気品あるショートカクテル。ジンの香りにキュラソーの甘味、レモンの酸味が完璧なバランスを保っています。",
    color: "rgba(250, 250, 250, 0.8)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "40 ml" },
      { name: "ホワイトキュラソー", amount: "30 ml" },
      { name: "レモンジュース", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },

  // --- SUMMER CLASSICS (ブルーキュラソー & トロピカル) ---
  "vodka+blue_curacao+lemon": {
    name: "ブルー・ラグーン",
    enName: "Blue Lagoon",
    abv: 20,
    taste: ["甘酸っぱい", "爽快", "フルーティー"],
    description: "「青い珊瑚礁」の名を持つ、夏のカクテルの代名詞。ブルーキュラソーの透明感のある青とレモンの酸味が、南国の海をそのままグラスに映し出したような一杯です。",
    color: "rgba(2, 136, 209, 0.75)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "ウォッカ", amount: "30 ml" },
      { name: "ブルーキュラソー", amount: "20 ml" },
      { name: "レモンジュース", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "氷を入れたグラスに注ぎます。",
      "レモンスライスを飾ります。"
    ]
  },
  "rum+blue_curacao+lemon+pineapple": {
    name: "ブルー・ハワイ",
    enName: "Blue Hawaii",
    abv: 12,
    taste: ["トロピカル", "甘酸っぱい", "ジューシー"],
    description: "1957年にハワイのバーテンダーが考案したトロピカルカクテルの王様。パイナップルの甘さとラムの香りに、ブルーキュラソーが常夏の海と空の色を添えます。",
    color: "rgba(38, 166, 214, 0.7)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "crushed",
    summer: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "30 ml" },
      { name: "ブルーキュラソー", amount: "15 ml" },
      { name: "パイナップルジュース", amount: "30 ml" },
      { name: "レモンジュース", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "クラッシュアイスを詰めた大きめのグラスに注ぎます。",
      "パイナップルとマラスキーノ・チェリーを飾ります。"
    ]
  },
  "tequila+blue_curacao+lime+salt": {
    name: "ブルー・マルガリータ",
    enName: "Blue Margarita",
    abv: 24,
    taste: ["甘酸っぱい", "塩辛い", "キレがある"],
    description: "定番マルガリータのホワイトキュラソーをブルーキュラソーに替えた夏の装い。スノースタイルの白い縁取りが、深い青のコントラストをより鮮やかに見せてくれます。",
    color: "rgba(3, 155, 205, 0.8)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    summer: true,
    saltRim: true,
    ingredients: [
      { name: "テキーラ", amount: "30 ml" },
      { name: "ブルーキュラソー", amount: "15 ml" },
      { name: "ライムジュース", amount: "15 ml" },
      { name: "食塩 (スノースタイル用)", amount: "適量" }
    ],
    method: [
      "カクテルグラスの縁をライムで湿らせ、塩をつけてスノースタイルにします。",
      "シェイカーに氷とテキーラ、ブルーキュラソー、ライムジュースを入れシェイクします。",
      "塩を落とさないよう、静かにグラスへ注ぎます。",
      "ライムを飾ります。"
    ]
  },
  "peach+blue_curacao+grapefruit": {
    name: "チャイナ・ブルー",
    enName: "China Blue",
    abv: 8,
    taste: ["フルーティー", "さっぱり", "ほろ苦い"],
    description: "日本で生まれ、世界に広まった人気カクテル。ライチのような甘い香りのピーチリキュールに、グレープフルーツのほろ苦さが重なり、澄んだブルーへとグラデーションします。",
    color: "rgba(77, 182, 200, 0.7)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "ピーチリキュール", amount: "20 ml" },
      { name: "ブルーキュラソー", amount: "10 ml" },
      { name: "グレープフルーツジュース", amount: "60 ml" }
    ],
    method: [
      "氷を入れたグラスにピーチリキュールとグレープフルーツジュースを注ぎ、ステアします。",
      "ブルーキュラソーを静かに沈めるように加えます。",
      "レモンスライスを飾ります。"
    ]
  },
  "gin+blue_curacao+lemon": {
    name: "ブルー・レディ",
    enName: "Blue Lady",
    abv: 20,
    taste: ["甘酸っぱい", "華やか", "まろやか"],
    description: "名門カクテル「ホワイト・レディ」を青く染めたバリエーション。卵白を加えてシェイクすることで、青い液体の上に白く繊細な泡の層が生まれます。",
    color: "rgba(41, 121, 190, 0.85)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    summer: true,
    ingredients: [
      { name: "ブルーキュラソー", amount: "30 ml" },
      { name: "ドライ・ジン", amount: "15 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "卵白", amount: "1個分" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れます。",
      "卵白が十分に泡立つよう、強めに長くシェイクします。",
      "冷やしたカクテルグラスに注ぎ、レモンピールを飾ります。"
    ]
  },
  "rum+coconut+pineapple": {
    name: "ピニャ・コラーダ",
    enName: "Pina Colada",
    abv: 9,
    taste: ["まろやか", "トロピカル", "甘い"],
    description: "プエルトリコ生まれの国民的カクテルで、名前は「裏ごしパイナップル」の意味。ココナッツのコクとパイナップルの酸味が溶け合う、濃厚でクリーミーな一杯です。",
    color: "rgba(250, 243, 224, 0.92)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "crushed",
    summer: true,
    isIBA: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "30 ml" },
      { name: "ココナッツミルク", amount: "30 ml" },
      { name: "パイナップルジュース", amount: "90 ml" }
    ],
    method: [
      "シェイカー（またはブレンダー）に氷と全ての材料を入れます。",
      "全体が滑らかになるまでしっかりとシェイクします。",
      "クラッシュアイスを詰めたグラスに注ぎ、パイナップルとチェリーを飾ります。"
    ]
  },
  "whiskey+mint+sugar": {
    name: "ミント・ジュレップ",
    enName: "Mint Julep",
    abv: 30,
    taste: ["清涼感", "甘い", "力強い"],
    description: "ケンタッキーダービーの公式ドリンクとして知られる、アメリカ南部の夏の定番。クラッシュアイスで冷やしたグラスから立ちのぼるミントの香りが暑さを忘れさせます。",
    color: "rgba(196, 160, 90, 0.6)",
    hasBubbles: false,
    garnish: "mint",
    ice: "crushed",
    summer: true,
    isIBA: true,
    ingredients: [
      { name: "バーボン・ウイスキー", amount: "60 ml" },
      { name: "ミントの葉", amount: "8〜10 枚" },
      { name: "砂糖 (またはシロップ)", amount: "2 tsp" },
      { name: "水", amount: "少量" }
    ],
    method: [
      "グラスにミントの葉、砂糖、少量の水を入れ、香りが立つよう軽くつぶします。",
      "クラッシュアイスをグラスの半分まで詰め、バーボンを注ぎます。",
      "グラスの外側が白く霜で覆われるまでステアします。",
      "クラッシュアイスを山盛りに足し、ミントの束を高く飾ります。"
    ]
  },

  // --- CRANBERRY FAMILY ---
  "vodka+cranberry+curacao+lime": {
    name: "コスモポリタン",
    enName: "Cosmopolitan",
    abv: 24,
    taste: ["甘酸っぱい", "華やか", "ドライ"],
    description: "90年代のニューヨークで一世を風靡し、今なお愛され続けるモダンクラシック。クランベリーのルビー色と、ライムとキュラソーが描く輪郭の美しさで知られます。",
    color: "rgba(199, 43, 74, 0.85)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "ウォッカ (シトロン)", amount: "40 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
      { name: "クランベリージュース", amount: "30 ml" },
      { name: "ライムジュース", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、しっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎます。",
      "ライムを飾ります。"
    ]
  },
  "vodka+cranberry+grapefruit": {
    name: "シーブリーズ",
    enName: "Sea Breeze",
    abv: 10,
    taste: ["さっぱり", "ほろ苦い", "フルーティー"],
    description: "「海風」の名の通り、クランベリーの酸味とグレープフルーツのほろ苦さが涼やかに抜けていく一杯。夏の午後にふさわしい、軽やかなロングドリンクです。",
    color: "rgba(214, 74, 74, 0.75)",
    hasBubbles: false,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "ウォッカ", amount: "30 ml" },
      { name: "クランベリージュース", amount: "60 ml" },
      { name: "グレープフルーツジュース", amount: "60 ml" }
    ],
    method: [
      "氷を詰めたタンブラーにウォッカを注ぎます。",
      "クランベリージュースとグレープフルーツジュースを加えます。",
      "軽くステアし、ライムを飾ります。"
    ]
  },
  "vodka+cranberry": {
    name: "ケープ・コッダー",
    enName: "Cape Codder",
    abv: 12,
    taste: ["さっぱり", "甘酸っぱい", "すっきり"],
    description: "クランベリーの名産地であるアメリカ・ケープコッド岬にちなんだ、シンプルきわまりない一杯。材料は2つだけですが、それゆえにクランベリーの酸味が素直に立ちます。",
    color: "rgba(190, 33, 55, 0.85)",
    hasBubbles: false,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "クランベリージュース", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "氷を詰めたタンブラーにウォッカを注ぎます。",
      "冷えたクランベリージュースで満たし、軽くステアします。",
      "ライムを絞って飾ります。"
    ]
  },
  "vodka+cranberry+orange": {
    name: "マドラス",
    enName: "Madras",
    abv: 10,
    taste: ["フルーティー", "甘酸っぱい", "ジューシー"],
    description: "クランベリーにオレンジを重ねた、二層のグラデーションが美しいロングドリンク。インドの古都マドラスで織られる鮮やかな更紗の色合いが名前の由来です。",
    color: "rgba(206, 68, 47, 0.8)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "クランベリージュース", amount: "90 ml" },
      { name: "オレンジジュース", amount: "30 ml" }
    ],
    method: [
      "氷を詰めたタンブラーにウォッカとクランベリージュースを注ぎ、ステアします。",
      "オレンジジュースを静かに注ぎ、層を作ります。",
      "オレンジスライスを飾ります。"
    ]
  },
  "vodka+cranberry+orange+peach": {
    name: "セックス・オン・ザ・ビーチ",
    enName: "Sex on the Beach",
    abv: 12,
    taste: ["フルーティー", "甘い", "トロピカル"],
    description: "80年代のフロリダで生まれ、映画『カクテル』で一躍有名になった一杯。ピーチの甘い香りとクランベリーの酸味が溶け合う、名前もろとも夏そのもののカクテルです。",
    color: "rgba(224, 92, 76, 0.8)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "ウォッカ", amount: "40 ml" },
      { name: "ピーチリキュール", amount: "20 ml" },
      { name: "クランベリージュース", amount: "40 ml" },
      { name: "オレンジジュース", amount: "40 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "クラッシュアイスまたは氷を詰めたグラスに注ぎます。",
      "オレンジスライスを飾ります。"
    ]
  },

  // --- TROPICAL & SUMMER STANDARDS ---
  "rum+blue_curacao+lime": {
    name: "スカイダイビング",
    enName: "Sky Diving",
    abv: 25,
    taste: ["爽快", "甘酸っぱい", "キレがある"],
    description: "1967年、全日本バーテンダー協会のコンクールで最優秀賞に輝いた日本生まれのクラシック。抜けるような青空に飛び込む瞬間を、ブルーキュラソーの青で表現しています。",
    color: "rgba(20, 132, 200, 0.85)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    summer: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "30 ml" },
      { name: "ブルーキュラソー", amount: "20 ml" },
      { name: "ライムジュース", amount: "10 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "vodka+coconut+pineapple": {
    name: "チチ",
    enName: "Chi Chi",
    abv: 9,
    taste: ["まろやか", "トロピカル", "甘い"],
    description: "ピニャ・コラーダのラムをウォッカに替えた、より軽やかな姉妹分。ハワイの言葉で「粋な」「おしゃれな」を意味し、クセのないウォッカがココナッツの風味を素直に通します。",
    color: "rgba(250, 245, 230, 0.92)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "crushed",
    summer: true,
    ingredients: [
      { name: "ウォッカ", amount: "30 ml" },
      { name: "ココナッツミルク", amount: "45 ml" },
      { name: "パイナップルジュース", amount: "80 ml" }
    ],
    method: [
      "シェイカー（またはブレンダー）に氷と全ての材料を入れます。",
      "全体が滑らかになるまでしっかりとシェイクします。",
      "クラッシュアイスを詰めたグラスに注ぎ、パイナップルとチェリーを飾ります。"
    ]
  },
  "rum+grenadine+maraschino_liq+pineapple": {
    name: "メアリー・ピックフォード",
    enName: "Mary Pickford",
    abv: 18,
    taste: ["フルーティー", "甘い", "華やか"],
    description: "禁酒法時代のキューバで、サイレント映画の大スターに捧げられた一杯。パイナップルの果実味にマラスキーノの気品ある香りが重なり、淡い珊瑚色に仕上がります。",
    color: "rgba(233, 128, 118, 0.82)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "none",
    summer: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "パイナップルジュース", amount: "45 ml" },
      { name: "グレナデンシロップ", amount: "1 tsp" },
      { name: "マラスキーノ", amount: "1 tsp" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、しっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎます。",
      "マラスキーノ・チェリーを沈めます。"
    ]
  },
  "rum+grenadine+lemon+orange+pineapple": {
    name: "プランターズ・パンチ",
    enName: "Planter's Punch",
    abv: 15,
    taste: ["フルーティー", "甘酸っぱい", "芳醇"],
    description: "カリブの農園主（プランター）たちが暑さをしのぐために飲んだとされる、トロピカルカクテルの原点。ダークラムの深いコクを、たっぷりの果汁が受け止めます。",
    color: "rgba(226, 108, 48, 0.82)",
    hasBubbles: false,
    garnish: "orange",
    ice: "crushed",
    summer: true,
    ingredients: [
      { name: "ダーク・ラム", amount: "45 ml" },
      { name: "オレンジジュース", amount: "30 ml" },
      { name: "パイナップルジュース", amount: "30 ml" },
      { name: "レモンジュース", amount: "20 ml" },
      { name: "グレナデンシロップ", amount: "1 tsp" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "クラッシュアイスを詰めた大きめのグラスに注ぎます。",
      "オレンジとチェリーを飾ります。"
    ]
  },
  "gin+curacao+pineapple": {
    name: "ハワイアン",
    enName: "Hawaiian",
    abv: 24,
    taste: ["フルーティー", "甘酸っぱい", "華やか"],
    description: "南国の名を冠しながら、実際はきりりと冷えたショートカクテル。ジンのボタニカルにパイナップルの甘酸っぱさが乗り、キュラソーが全体を一本の線でまとめます。",
    color: "rgba(240, 219, 138, 0.8)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "none",
    summer: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "40 ml" },
      { name: "パイナップルジュース", amount: "15 ml" },
      { name: "ホワイトキュラソー", amount: "1 tsp" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、シェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },

  // --- THE STANDARD BOOK ---
  // The drinks a bar is expected to know. Specs follow the IBA where one
  // exists and the earliest reliable printing otherwise.
  "gin+champagne+lemon+sugar": {
    name: "フレンチ75",
    enName: "French 75",
    abv: 16,
    taste: ["爽快", "甘酸っぱい", "華やか"],
    description: "第一次大戦下のパリ「ハリーズ・ニューヨーク・バー」で生まれ、当時のフランス軍75mm砲の衝撃になぞらえて名付けられた一杯。ジンのサワーをシャンパンで伸ばすため、軽やかに見えて芯が強く残ります。",
    color: "rgba(246, 232, 178, 0.6)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "30 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "シュガーシロップ", amount: "1 tsp" },
      { name: "シャンパン (辛口)", amount: "適量" }
    ],
    method: [
      "シェイカーに氷、ジン、レモンジュース、シロップを入れてシェイクします。",
      "冷やしたフルートグラスに注ぎます。",
      "よく冷えたシャンパンで静かに満たし、レモンピールを飾ります。"
    ]
  },
  "gin+chartreuse+lime+maraschino_liq": {
    name: "ラスト・ワード",
    enName: "Last Word",
    abv: 26,
    taste: ["ハーバル", "甘酸っぱい", "複雑"],
    description: "禁酒法前のデトロイト・アスレチック・クラブで供され、半世紀忘れられた後に再発見された等量カクテル。シャルトリューズの薬草香とマラスキーノの核の甘みが、ライムの酸で一本にまとまります。",
    color: "rgba(198, 214, 140, 0.7)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "22 ml" },
      { name: "シャルトリューズ・ヴェール", amount: "22 ml" },
      { name: "マラスキーノ・リキュール", amount: "22 ml" },
      { name: "ライムジュース", amount: "22 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を等量ずつ入れます。",
      "しっかりとシェイクし、冷やしたカクテルグラスに注ぎます。",
      "ライムを飾ります。"
    ]
  },
  "gin+absinthe+curacao+dry_vermouth+lemon": {
    name: "コープス・リヴァイヴァー No.2",
    enName: "Corpse Reviver No.2",
    abv: 24,
    taste: ["爽快", "甘酸っぱい", "ハーバル"],
    description: "「死者をも蘇らせる」迎え酒として1930年の『サヴォイ・カクテルブック』に載った一杯。同書は「四杯続けて飲めば再び死ぬ」と釘を刺しています。アブサンはグラスに回して香りだけを残します。",
    color: "rgba(238, 240, 205, 0.6)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "22 ml" },
      { name: "ホワイトキュラソー", amount: "22 ml" },
      { name: "ドライ・ベルモット", amount: "22 ml" },
      { name: "レモンジュース", amount: "22 ml" },
      { name: "アブサン", amount: "グラスに回す分" }
    ],
    method: [
      "冷やしたカクテルグラスにアブサンを少量入れ、内側に回してから余りを捨てます。",
      "シェイカーに氷と残りの材料を入れ、しっかりシェイクします。",
      "用意したグラスに注ぎ、レモンピールを飾ります。"
    ]
  },
  "gin+egg_white+lemon+raspberry": {
    name: "クローバー・クラブ",
    enName: "Clover Club",
    abv: 18,
    taste: ["まろやか", "甘酸っぱい", "ベリー"],
    description: "20世紀初頭フィラデルフィアの紳士クラブの名を冠した、淡紅色のサワー。卵白を硬くシェイクして立てた泡が、ラズベリーの酸味をやわらかく包みます。",
    color: "rgba(228, 132, 148, 0.82)",
    hasBubbles: false,
    garnish: null,
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "クレーム・ド・フランボワーズ (ラズベリー)", amount: "15 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "卵白", amount: "1 個分" }
    ],
    method: [
      "シェイカーに氷なしで全材料を入れ、まず氷を入れずに強く振って卵白を立てます。",
      "氷を加え、もう一度しっかりとシェイクして冷やします。",
      "冷やしたカクテルグラスに漉しながら注ぎます。"
    ]
  },
  "gin+egg_white+grenadine": {
    name: "ピンク・レディ",
    enName: "Pink Lady",
    abv: 20,
    taste: ["まろやか", "甘口", "華やか"],
    description: "1912年ロンドンで上演された同名の舞台の主演女優に捧げられた一杯。名の通りの淡い桜色と、卵白の生むベルベットのような口当たりが身上です。",
    color: "rgba(240, 150, 160, 0.85)",
    hasBubbles: false,
    garnish: null,
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "45 ml" },
      { name: "グレナデンシロップ", amount: "15 ml" },
      { name: "卵白", amount: "1 個分" }
    ],
    method: [
      "シェイカーに氷なしで材料を入れ、強く振って卵白を立てます。",
      "氷を加えて、さらにしっかりとシェイクします。",
      "冷やしたカクテルグラスに漉しながら注ぎます。"
    ]
  },
  "gin+honey+lemon": {
    name: "ビーズ・ニーズ",
    enName: "Bee's Knees",
    abv: 22,
    taste: ["まろやか", "甘酸っぱい", "蜂蜜の香り"],
    description: "禁酒法時代、質の悪いジンの匂いを蜂蜜とレモンで覆うために生まれたと伝わります。名前は当時の俗語で「最高のもの」。今では隠すもののない良いジンでこそ映える一杯です。",
    color: "rgba(240, 216, 140, 0.7)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "60 ml" },
      { name: "ハニーシロップ (蜂蜜:水 = 1:1)", amount: "20 ml" },
      { name: "レモンジュース", amount: "20 ml" }
    ],
    method: [
      "蜂蜜は同量のぬるま湯で溶いてシロップにしておきます。",
      "シェイカーに氷と全材料を入れ、しっかりシェイクします。",
      "冷やしたカクテルグラスに注ぎ、レモンピールを飾ります。"
    ]
  },
  "gin+lime+mint+sugar": {
    name: "サウスサイド",
    enName: "Southside",
    abv: 22,
    taste: ["清涼感", "甘酸っぱい", "ハーバル"],
    description: "シカゴ南部の密造酒業者が荒いジンを飲みやすくするために考えたとも、ロングアイランドの同名クラブの定番だったとも言われる一杯。モヒートをジンで、ショートに仕立てた姿です。",
    color: "rgba(214, 232, 196, 0.6)",
    hasBubbles: false,
    garnish: "mint",
    ice: "none",
    summer: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "60 ml" },
      { name: "ライムジュース", amount: "22 ml" },
      { name: "シュガーシロップ", amount: "15 ml" },
      { name: "ミントの葉", amount: "6 〜 8 枚" }
    ],
    method: [
      "シェイカーにミントとシュガーシロップを入れ、軽く押して香りを移します。",
      "氷、ジン、ライムジュースを加えてしっかりシェイクします。",
      "冷やしたカクテルグラスに漉しながら注ぎ、ミントを飾ります。"
    ]
  },
  "gin+lemon+raspberry+sugar": {
    name: "ブランブル",
    enName: "Bramble",
    abv: 20,
    taste: ["甘酸っぱい", "ベリー", "さっぱり"],
    description: "1980年代ロンドンのバー「フレッズ・クラブ」でディック・ブラッドセルが創作した、現代の古典。クラッシュアイスの上からクレーム・ド・ミュール（黒すぐり色のブラックベリー・リキュール）を垂らし、茨（ブランブル）の名の通りの筋を描かせます。",
    color: "rgba(190, 60, 96, 0.75)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "crushed",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "50 ml" },
      { name: "レモンジュース", amount: "25 ml" },
      { name: "シュガーシロップ", amount: "10 ml" },
      { name: "クレーム・ド・ミュール (ブラックベリー)", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷、ジン、レモン、シロップを入れてシェイクします。",
      "クラッシュアイスを詰めたロックグラスに注ぎます。",
      "上からフランボワーズ・リキュールを静かに垂らし、模様を描かせます。"
    ]
  },
  "gin+benedictine+bitters+cherry_brandy+curacao+grenadine+lime+pineapple": {
    name: "シンガポール・スリング",
    enName: "Singapore Sling",
    abv: 12,
    taste: ["フルーティー", "甘酸っぱい", "複雑"],
    description: "1915年頃、シンガポールのラッフルズ・ホテル「ロング・バー」で生まれた南国の名作。当時、淑女が人前で酒を飲みにくかった時代に、果実飲料に見えるよう仕立てられたと伝わります。",
    color: "rgba(226, 92, 92, 0.78)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "cube",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "ドライ・ジン", amount: "30 ml" },
      { name: "チェリーブランデー", amount: "15 ml" },
      { name: "ベネディクティン", amount: "7.5 ml" },
      { name: "ホワイトキュラソー", amount: "7.5 ml" },
      { name: "パイナップルジュース", amount: "120 ml" },
      { name: "ライムジュース", amount: "15 ml" },
      { name: "グレナデンシロップ", amount: "10 ml" },
      { name: "アンゴスチュラ・ビターズ", amount: "1 dash" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れます。",
      "しっかりとシェイクします。",
      "氷を入れた背の高いグラスに注ぎ、パイナップルとチェリーを飾ります。"
    ]
  },
  "vodka+galliano+orange": {
    name: "ハーヴェイ・ウォールバンガー",
    enName: "Harvey Wallbanger",
    abv: 11,
    taste: ["フルーティー", "甘口", "バニラ香"],
    description: "1970年代アメリカで一世を風靡した一杯。負けたサーファーのハーヴェイが飲みすぎて壁にぶつかりながら帰った、という作り話とともに広まりました。ガリアーノのバニラとアニスが最後に香ります。",
    color: "rgba(250, 176, 50, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "オレンジジュース", amount: "90 ml" },
      { name: "ガリアーノ", amount: "15 ml" }
    ],
    method: [
      "氷を入れた背の高いグラスにウォッカとオレンジジュースを注ぎ、ステアします。",
      "ガリアーノを静かに浮かべます。",
      "オレンジを飾ります。"
    ]
  },
  "vodka+cola+curacao+gin+lemon+rum+sugar+tequila": {
    name: "ロング・アイランド・アイス・ティー",
    enName: "Long Island Iced Tea",
    abv: 22,
    taste: ["強い", "甘酸っぱい", "紅茶のような色"],
    description: "紅茶は一滴も入らないのに紅茶の色と風味に見える、禁酒法時代の偽装に由来すると言われる一杯。白いスピリッツを4種も重ねながら、レモンとコーラで涼しい顔にまとまってしまうのが恐ろしいところです。",
    color: "rgba(150, 96, 52, 0.85)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "ウォッカ", amount: "15 ml" },
      { name: "ドライ・ジン", amount: "15 ml" },
      { name: "ホワイト・ラム", amount: "15 ml" },
      { name: "テキーラ", amount: "15 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
      { name: "レモンジュース", amount: "25 ml" },
      { name: "シュガーシロップ", amount: "1 tsp" },
      { name: "コーラ", amount: "適量" }
    ],
    method: [
      "氷を満たした背の高いグラスに、コーラ以外の材料を全て注ぎます。",
      "軽くステアして冷やします。",
      "コーラで満たし、底から一度だけ持ち上げるように混ぜ、レモンを飾ります。"
    ]
  },
  "vodka+amaretto": {
    name: "ゴッドマザー",
    enName: "Godmother",
    abv: 30,
    taste: ["甘口", "杏仁の香り", "まろやか"],
    description: "スコッチで作るゴッドファーザーを、ウォッカに置き換えた姉妹分。アマレットの杏仁のような甘い香りだけが立ち、酒の角は驚くほど丸くなります。",
    color: "rgba(178, 120, 70, 0.6)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "アマレット", amount: "15 ml" }
    ],
    method: [
      "氷を入れたロックグラスに材料を注ぎます。",
      "軽くステアします。"
    ]
  },

  "rum+curacao+lime+orgeat": {
    name: "マイタイ",
    enName: "Mai Tai",
    abv: 24,
    taste: ["フルーティー", "甘酸っぱい", "芳醇"],
    description: "1944年カリフォルニアのトレーダー・ヴィックが創作し、供された客が「マイタイ・ロア・アエ（最高だ）」と叫んだことから名がついたとされます。ホワイトとダークを半々に重ねるのが要で、オルジェーのアーモンド香がダークラムの樽感と結び付きます。",
    color: "rgba(226, 150, 74, 0.82)",
    hasBubbles: false,
    garnish: "lime",
    ice: "crushed",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "ホワイト・ラム", amount: "30 ml" },
      { name: "ダーク・ラム", amount: "30 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
      { name: "オルジェー・シロップ", amount: "15 ml" },
      { name: "ライムジュース", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れ、しっかりシェイクします。",
      "クラッシュアイスを詰めたグラスに注ぎます。",
      "絞ったライムの殻とミントを飾ります。"
    ]
  },
  "rum+ginger+lime": {
    name: "ダーク・アンド・ストーミー",
    enName: "Dark 'n' Stormy",
    abv: 10,
    taste: ["スパイシー", "コクのある甘み", "爽快"],
    description: "バミューダの国民的一杯で、ダークラムがジンジャービアの上に落とす影を「嵐雲」に見立てた名前。混ぜずに層のまま供し、飲み手が崩していくのが作法です。",
    color: "rgba(150, 96, 44, 0.8)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "ダーク・ラム", amount: "60 ml" },
      { name: "ジンジャービア (またはジンジャーエール)", amount: "100 ml" },
      { name: "ライムジュース", amount: "10 ml" }
    ],
    method: [
      "氷を満たしたグラスにジンジャービアとライムジュースを注ぎます。",
      "ダークラムを静かに浮かべ、層を作ります。",
      "混ぜずに、ライムを添えて供します。"
    ]
  },
  "whiskey+absinthe+peychaud+sugar": {
    name: "サゼラック",
    enName: "Sazerac",
    abv: 30,
    taste: ["芳醇", "アニス香", "ほんのり甘い"],
    description: "ニューオーリンズが生んだアメリカ最古級のカクテルで、同市の公式カクテルにも指定されています。アブサンはグラスに香りを移すためだけに使い、ペイショーズ・ビターズの薬草感が土台を作ります。",
    color: "rgba(196, 128, 56, 0.75)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ライ・ウイスキー", amount: "50 ml" },
      { name: "角砂糖 (またはシロップ)", amount: "1 個" },
      { name: "ペイショーズ・ビターズ", amount: "3 dash" },
      { name: "アブサン", amount: "グラスに回す分" }
    ],
    method: [
      "冷やしたロックグラスにアブサンを入れて内側に回し、余りを捨てます。",
      "別のグラスで角砂糖にビターズを含ませ、潰してウイスキーと混ぜます。",
      "氷を加えてステアし、よく冷えたら用意したグラスに氷なしで注ぎます。",
      "レモンピールの香りを絞りかけます。"
    ]
  },
  "whiskey+benedictine+bitters+brandy+sweet_vermouth": {
    name: "ヴュー・カレ",
    enName: "Vieux Carré",
    abv: 28,
    taste: ["芳醇", "ビター＆スイート", "複雑"],
    description: "ニューオーリンズのホテル・モンテレオーネにある回転バーで1930年代に生まれ、フレンチ・クオーターの旧称「ヴュー・カレ（古い四角形）」を名に持ちます。ライとコニャックを半々に据える構成が独特です。",
    color: "rgba(168, 96, 48, 0.8)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "cube",
    ingredients: [
      { name: "ライ・ウイスキー", amount: "30 ml" },
      { name: "コニャック", amount: "30 ml" },
      { name: "スイート・ベルモット", amount: "30 ml" },
      { name: "ベネディクティン", amount: "1 tsp" },
      { name: "アンゴスチュラ・ビターズ", amount: "2 dash" }
    ],
    method: [
      "ミキシンググラスに氷と全ての材料を入れます。",
      "十分に冷えるまでステアします。",
      "氷を入れたロックグラスに注ぎ、チェリーとレモンピールを飾ります。"
    ]
  },
  "whiskey+drambuie": {
    name: "ラスティ・ネイル",
    enName: "Rusty Nail",
    abv: 33,
    taste: ["甘口", "スモーキー", "蜂蜜の香り"],
    description: "スコッチに、スコッチと蜂蜜とハーブから作るドランブイを合わせただけの二材料。「錆びた釘」という無骨な名に反して、蜂蜜とピートが溶け合う滑らかな食後酒です。",
    color: "rgba(190, 130, 50, 0.72)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "スコッチ・ウイスキー", amount: "45 ml" },
      { name: "ドランブイ", amount: "20 ml" }
    ],
    method: [
      "氷を入れたロックグラスに材料を注ぎます。",
      "軽くステアします。",
      "レモンピールの香りを絞りかけます。"
    ]
  },
  "whiskey+amaretto": {
    name: "ゴッドファーザー",
    enName: "Godfather",
    abv: 33,
    taste: ["甘口", "杏仁の香り", "スモーキー"],
    description: "1972年の同名映画の公開に合わせて広まったとされる、スコッチとアマレットだけの一杯。アマレットの杏仁の甘さがスコッチの煙をやわらげ、食後にゆっくり傾けるのに向きます。",
    color: "rgba(180, 116, 58, 0.7)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "スコッチ・ウイスキー", amount: "45 ml" },
      { name: "アマレット", amount: "15 ml" }
    ],
    method: [
      "氷を入れたロックグラスに材料を注ぎます。",
      "軽くステアします。"
    ]
  },
  "whiskey+honey+lemon": {
    name: "ペニシリン",
    enName: "Penicillin",
    abv: 22,
    taste: ["スモーキー", "甘酸っぱい", "生姜の香り"],
    description: "2005年ニューヨークのサム・ロスが創作した現代の古典。蜂蜜と生姜とレモンという風邪の民間薬の組み合わせに、アイラの煙を最後に浮かべます。名前はその処方箋めいた構成から。",
    color: "rgba(214, 166, 74, 0.75)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "cube",
    isIBA: true,
    ingredients: [
      { name: "ブレンデッド・スコッチ", amount: "60 ml" },
      { name: "ハニーシロップ (生姜を漬けたもの)", amount: "22 ml" },
      { name: "レモンジュース", amount: "22 ml" },
      { name: "アイラ・モルト (フロート用)", amount: "1 tsp" }
    ],
    method: [
      "蜂蜜シロップに薄切りの生姜を漬け込んでおきます。",
      "シェイカーに氷、スコッチ、シロップ、レモンを入れてシェイクします。",
      "氷を入れたロックグラスに注ぎ、アイラ・モルトを静かに浮かべます。"
    ]
  },
  "brandy+creme_de_menthe": {
    name: "スティンガー",
    enName: "Stinger",
    abv: 32,
    taste: ["清涼感", "甘口", "芳醇"],
    description: "「針を刺す」の名の通り、ブランデーの芳醇さの後にミントが鋭く抜けていく食後の定番。20世紀初頭のニューヨーク社交界で愛され、映画にもたびたび登場しました。",
    color: "rgba(198, 214, 190, 0.55)",
    hasBubbles: false,
    garnish: "mint",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ブランデー", amount: "45 ml" },
      { name: "クレーム・ド・ミント (ホワイト)", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷と材料を入れ、しっかりシェイクします。",
      "冷やしたカクテルグラスに注ぎます。",
      "ミントを飾ります。"
    ]
  },
  "brandy+bitters+chartreuse+lemon": {
    name: "シャンゼリゼ",
    enName: "Champs-Élysées",
    abv: 26,
    taste: ["ハーバル", "甘酸っぱい", "芳醇"],
    description: "パリの大通りの名を冠した、サイドカーのキュラソーをシャルトリューズに置き換えた姿。修道院の薬草酒がコニャックの樽香と重なり、一段と深いところに落ち着きます。",
    color: "rgba(206, 190, 110, 0.72)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    ingredients: [
      { name: "コニャック", amount: "45 ml" },
      { name: "シャルトリューズ・ヴェール", amount: "15 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "アンゴスチュラ・ビターズ", amount: "1 dash" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れます。",
      "しっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎ、レモンピールを飾ります。"
    ]
  },
  "champagne+cassis": {
    name: "キール・ロワイヤル",
    enName: "Kir Royal",
    abv: 12,
    taste: ["フルーティー", "甘酸っぱい", "華やか"],
    description: "白ワインで作るキールを、シャンパンに格上げした「王室風」。ディジョン市長フェリックス・キールが地元のカシスとワインを広めるために供したのが始まりです。",
    color: "rgba(180, 60, 110, 0.7)",
    hasBubbles: true,
    garnish: null,
    ice: "none",
    ingredients: [
      { name: "クレーム・ド・カシス", amount: "10 ml" },
      { name: "シャンパン (辛口)", amount: "適量" }
    ],
    method: [
      "冷やしたフルートグラスにカシスを注ぎます。",
      "よく冷えたシャンパンで静かに満たします。",
      "泡を潰さないよう、必要なら一度だけ軽く混ぜます。"
    ]
  },
  "champagne+orange": {
    name: "ミモザ",
    enName: "Mimosa",
    abv: 8,
    taste: ["フルーティー", "爽快", "軽やか"],
    description: "1925年パリのリッツ・ホテルで生まれ、黄色い花のミモザに色を見立てて名付けられました。「シャンパンとオレンジ」というだけの構成ゆえ、両方をよく冷やすことが全てです。",
    color: "rgba(250, 190, 80, 0.7)",
    hasBubbles: true,
    garnish: "orange",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "シャンパン (辛口)", amount: "60 ml" },
      { name: "オレンジジュース", amount: "60 ml" }
    ],
    method: [
      "冷やしたフルートグラスにオレンジジュースを注ぎます。",
      "よく冷えたシャンパンを等量、静かに注ぎます。",
      "泡が落ち着くのを待ってから供します。"
    ]
  },
  "champagne+peach": {
    name: "ベリーニ",
    enName: "Bellini",
    abv: 8,
    taste: ["フルーティー", "みずみずしい甘口", "軽やか"],
    description: "1948年ヴェネツィアのハリーズ・バーで生まれ、画家ベリーニの絵に見た桃色から名付けられました。本来は白桃のピューレを使い、プロセッコで伸ばします。",
    color: "rgba(250, 190, 170, 0.75)",
    hasBubbles: true,
    garnish: null,
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "白桃のピューレ (またはピーチリキュール)", amount: "50 ml" },
      { name: "プロセッコ / シャンパン", amount: "100 ml" }
    ],
    method: [
      "冷やしたフルートグラスに白桃のピューレを入れます。",
      "よく冷えたプロセッコを静かに注ぎます。",
      "バースプーンで底から一度だけ持ち上げるように混ぜます。"
    ]
  },
  "champagne+aperol+soda": {
    name: "アペロール・スプリッツ",
    enName: "Aperol Spritz",
    abv: 8,
    taste: ["ほろ苦い", "さっぱり", "爽快"],
    description: "北イタリアの夕暮れの定番。3・2・1（プロセッコ3、アペロール2、ソーダ1）の比率が公式に定められており、食前の一杯として世界中に広まりました。",
    color: "rgba(240, 120, 40, 0.72)",
    hasBubbles: true,
    garnish: "orange",
    ice: "cube",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "プロセッコ", amount: "90 ml" },
      { name: "アペロール", amount: "60 ml" },
      { name: "ソーダ (炭酸水)", amount: "30 ml" }
    ],
    method: [
      "氷を満たした大きめのワイングラスにプロセッコを注ぎます。",
      "アペロールを加え、最後にソーダを少量落とします。",
      "軽く一度だけ混ぜ、オレンジスライスを飾ります。"
    ]
  },
  "champagne+absinthe": {
    name: "デス・イン・ジ・アフタヌーン",
    enName: "Death in the Afternoon",
    abv: 18,
    taste: ["アニス香", "ドライ", "爽快"],
    description: "ヘミングウェイが1935年の著名人カクテル集に寄せた自作。同名の闘牛論から名を取り、本人は「これを3〜5杯、ゆっくり飲むこと」と書き添えました。注ぐと乳白色に濁ります。",
    color: "rgba(226, 236, 214, 0.62)",
    hasBubbles: true,
    garnish: null,
    ice: "none",
    ingredients: [
      { name: "アブサン", amount: "30 ml" },
      { name: "シャンパン (辛口)", amount: "適量" }
    ],
    method: [
      "冷やしたフルートグラスにアブサンを注ぎます。",
      "よく冷えたシャンパンを、乳白色に濁るまで静かに注ぎます。"
    ]
  },
  "white_wine+cassis": {
    name: "キール",
    enName: "Kir",
    abv: 11,
    taste: ["フルーティー", "甘酸っぱい", "さっぱり"],
    description: "ブルゴーニュ・ディジョンの市長キール氏が、地元の辛口白ワインとカシスを広めるために公式行事で供した一杯。食前酒として世界に定着しました。",
    color: "rgba(186, 78, 118, 0.65)",
    hasBubbles: false,
    garnish: null,
    ice: "none",
    ingredients: [
      { name: "辛口白ワイン", amount: "90 ml" },
      { name: "クレーム・ド・カシス", amount: "10 ml" }
    ],
    method: [
      "冷やしたワイングラスにカシスを注ぎます。",
      "よく冷えた白ワインで満たします。",
      "軽くステアします。"
    ]
  },
  "white_wine+soda": {
    name: "スプリッツァー",
    enName: "Spritzer",
    abv: 7,
    taste: ["さっぱり", "軽やか", "爽快"],
    description: "白ワインをソーダで割っただけの、ヨーロッパで最も飲まれている食前酒のひとつ。度数が下がり喉の渇きを癒すため、暑い時期の昼から夕方にかけて選ばれます。",
    color: "rgba(238, 234, 202, 0.45)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "辛口白ワイン", amount: "90 ml" },
      { name: "ソーダ (炭酸水)", amount: "60 ml" }
    ],
    method: [
      "氷を入れたワイングラスに冷えた白ワインを注ぎます。",
      "ソーダを静かに加えます。",
      "軽く一度だけ混ぜ、レモンを飾ります。"
    ]
  },
  "white_wine+ginger+lime": {
    name: "オペレーター",
    enName: "Operator",
    abv: 8,
    taste: ["さっぱり", "スパイシー", "甘酸っぱい"],
    description: "1970年代のアメリカでオフィス勤めの女性たちに好まれたことから名がついたとされる、白ワインのジンジャーエール割り。ライムがワインの酸を引き締めます。",
    color: "rgba(240, 226, 170, 0.55)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "辛口白ワイン", amount: "60 ml" },
      { name: "ジンジャーエール", amount: "60 ml" },
      { name: "ライムジュース", amount: "10 ml" }
    ],
    method: [
      "氷を入れたグラスに白ワインとライムジュースを注ぎます。",
      "冷えたジンジャーエールで満たします。",
      "軽く一度だけ混ぜ、ライムを飾ります。"
    ]
  },
  "pisco+bitters+egg_white+lemon+sugar": {
    name: "ピスコ・サワー",
    enName: "Pisco Sour",
    abv: 20,
    taste: ["甘酸っぱい", "まろやか", "フルーティー"],
    description: "ペルーとチリが起源を争う、ぶどうの蒸留酒ピスコのサワー。卵白の泡の上にビターズを数滴落とし、その模様ごと供するのが決まりです。ペルーでは2月の第一土曜が「ピスコ・サワーの日」。",
    color: "rgba(246, 240, 214, 0.8)",
    hasBubbles: false,
    garnish: null,
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "ピスコ", amount: "60 ml" },
      { name: "レモン (またはライム) ジュース", amount: "30 ml" },
      { name: "シュガーシロップ", amount: "20 ml" },
      { name: "卵白", amount: "1 個分" },
      { name: "アンゴスチュラ・ビターズ", amount: "3 dash" }
    ],
    method: [
      "シェイカーに氷なしでピスコ、レモン、シロップ、卵白を入れ、強く振って泡立てます。",
      "氷を加えてもう一度しっかりシェイクします。",
      "グラスに漉しながら注ぎ、泡が落ち着いてからビターズを数滴落とします。"
    ]
  },
  "cachaca+lime+sugar": {
    name: "カイピリーニャ",
    enName: "Caipirinha",
    abv: 22,
    taste: ["甘酸っぱい", "さっぱり", "力強い"],
    description: "ブラジルの国民的カクテルで、名は「田舎の娘」の意。さとうきびの搾り汁から直接造るカシャッサに、ライムを皮ごと潰して砂糖を合わせます。グラスの中で組み立てるのが作法です。",
    color: "rgba(214, 232, 190, 0.6)",
    hasBubbles: false,
    garnish: "lime",
    ice: "crushed",
    isIBA: true,
    summer: true,
    ingredients: [
      { name: "カシャッサ", amount: "60 ml" },
      { name: "ライム", amount: "1 個 (くし形に)" },
      { name: "グラニュー糖", amount: "2 tsp" }
    ],
    method: [
      "ロックグラスにくし形のライムと砂糖を入れます。",
      "ペストルで潰し、果汁と皮の油分を出します。",
      "クラッシュアイスを詰めてカシャッサを注ぎ、よく混ぜます。"
    ]
  },
  "apple_brandy+grenadine+lime": {
    name: "ジャック・ローズ",
    enName: "Jack Rose",
    abv: 21,
    taste: ["フルーティー", "甘酸っぱい", "芳醇"],
    description: "りんごの蒸留酒アップルジャックを使う、20世紀初頭アメリカの古典。ヘミングウェイの『日はまた昇る』にも登場します。グレナデンの薔薇色から名がついたという説が有力です。",
    color: "rgba(226, 106, 96, 0.8)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    ingredients: [
      { name: "カルヴァドス / アップルジャック", amount: "45 ml" },
      { name: "ライムジュース", amount: "15 ml" },
      { name: "グレナデンシロップ", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れます。",
      "しっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎます。"
    ]
  },
  "apple_brandy+benedictine+curacao+lemon": {
    name: "ハネムーン",
    enName: "Honeymoon",
    abv: 22,
    taste: ["フルーティー", "甘酸っぱい", "ハーバル"],
    description: "禁酒法時代のニューヨーク近郊、ブライトン・ビーチのレストランで供されたと伝わる一杯。りんごの蒸留酒に修道院の薬草酒を合わせ、レモンで締めます。",
    color: "rgba(226, 172, 96, 0.75)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    ingredients: [
      { name: "カルヴァドス", amount: "30 ml" },
      { name: "ベネディクティン", amount: "15 ml" },
      { name: "ホワイトキュラソー", amount: "2 dash" },
      { name: "レモンジュース", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れます。",
      "しっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎ、レモンピールを飾ります。"
    ]
  },
  "cacao+cream+creme_de_menthe": {
    name: "グラスホッパー",
    enName: "Grasshopper",
    abv: 15,
    taste: ["クリーミー", "甘口", "清涼感"],
    description: "1918年ニューオーリンズのタジャック・バーが考案コンテストに出した一杯。「ばった」の名の通りの淡い緑と、ミントとカカオと生クリームが作るデザートそのものの味わいです。",
    color: "rgba(178, 226, 190, 0.9)",
    hasBubbles: false,
    garnish: "mint",
    ice: "none",
    isIBA: true,
    ingredients: [
      { name: "クレーム・ド・ミント (グリーン)", amount: "20 ml" },
      { name: "クレーム・ド・カカオ (ホワイト)", amount: "20 ml" },
      { name: "生クリーム", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と全ての材料を等量ずつ入れます。",
      "クリームが完全に混ざるまで、しっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎ、ミントを飾ります。"
    ]
  },
  "cacao+cream": {
    name: "エンジェルス・キッス",
    enName: "Angel's Kiss",
    abv: 16,
    taste: ["極甘", "クリーミー", "デザート感覚"],
    description: "リキュールの上に生クリームを静かに重ねる、二層のプース・カフェ。天使の口づけの名の通り、頂に載せたチェリーが顔のように見える姿で供されます。",
    color: "rgba(150, 112, 96, 0.9)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "none",
    ingredients: [
      { name: "クレーム・ド・カカオ (ブラウン)", amount: "30 ml" },
      { name: "生クリーム", amount: "15 ml" }
    ],
    method: [
      "リキュールグラスにクレーム・ド・カカオを注ぎます。",
      "バースプーンの背を伝わせ、生クリームを静かに重ねます。",
      "混ざらないよう、そっとチェリーを飾ります。"
    ]
  },

  // --- NON-ALCOHOLIC (MOCKTAIL) ---
  // Keyed on a non-alcoholic base exactly like every other drink, so the
  // build view, My Bar and the archive all reach them by the same route.
  // Nothing here needs a flag: the base decides whether a drink is a mocktail.
  "ginger+grenadine+maraschino_cherry": {
    name: "シャーリー・テンプル",
    enName: "Shirley Temple",
    abv: 0,
    taste: ["甘い", "フルーティー", "爽快"],
    description: "1930年代の子役スター、シャーリー・テンプルのために作られたと伝わるノンアルコールカクテルの代名詞。ジンジャーエールの辛口な炭酸をグレナデンシロップの甘みが包み、深紅からゴールドへのグラデーションが美しい一杯です。",
    color: "rgba(226, 96, 72, 0.72)",
    hasBubbles: true,
    garnish: "cherry",
    ice: "cube",
    ingredients: [
      { name: "グレナデンシロップ", amount: "15 ml" },
      { name: "ジンジャーエール", amount: "適量 (約 120 ml)" },
      { name: "マラスキーノ・チェリー", amount: "1 個" }
    ],
    method: [
      "氷を満たしたタンブラーグラスにグレナデンシロップを注ぎます。",
      "冷えたジンジャーエールを氷に当てないよう静かに注ぎます。",
      "底に沈んだシロップを混ぜすぎないよう、軽く1回だけステアします。",
      "マラスキーノ・チェリーを飾ります。"
    ]
  },
  "ginger+lime+sugar": {
    name: "サラトガ・クーラー",
    enName: "Saratoga Cooler",
    abv: 0,
    taste: ["さっぱり", "甘酸っぱい", "爽快"],
    description: "アメリカの避暑地サラトガ・スプリングスの名を持つ、ノンアルコールの定番クーラー。ライムの酸味とジンジャーエールのスパイス感が重なり、食事の前後どちらにも合う端正な味わいです。",
    color: "rgba(233, 214, 160, 0.58)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "フレッシュ・ライム果汁", amount: "20 ml" },
      { name: "シュガーシロップ", amount: "1 tsp" },
      { name: "ジンジャーエール", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "氷を入れたタンブラーグラスにライム果汁とシュガーシロップを入れ、軽くステアします。",
      "冷えたジンジャーエールを静かに注ぎます。",
      "炭酸を逃さないよう底から1回だけ持ち上げるように混ぜ、ライムを飾ります。"
    ]
  },
  "orange+lemon+pineapple": {
    name: "シンデレラ",
    enName: "Cinderella",
    abv: 0,
    taste: ["フルーティー", "甘酸っぱい", "ジューシー"],
    description: "3種の果汁を等量で合わせただけの、ノンアルコールカクテルの最高峰。シェイクして空気を含ませることで角が取れ、ただのミックスジュースとは別物のまろやかな口当たりになります。",
    color: "rgba(252, 176, 64, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "none",
    summer: true,
    ingredients: [
      { name: "オレンジジュース", amount: "20 ml" },
      { name: "レモンジュース", amount: "20 ml" },
      { name: "パイナップルジュース", amount: "20 ml" }
    ],
    method: [
      "シェイカーに氷と全ての果汁を入れます。",
      "十分に冷えるまでしっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎ、オレンジを飾ります。"
    ]
  },
  "orange+bitters+lemon+sugar": {
    name: "フロリダ",
    enName: "Florida",
    abv: 0,
    taste: ["甘酸っぱい", "フレッシュ", "ほろ苦い"],
    description: "禁酒法時代のアメリカで、フロリダ州産の柑橘を讃えて生まれたノンアルコールカクテル。オレンジの甘みをレモンが引き締め、ビターズがひと匙分の複雑さを与えます。仕上げのビターズにはごく微量のアルコールが含まれるため、完全に避けたい場合は省いてください。",
    color: "rgba(250, 160, 52, 0.85)",
    hasBubbles: false,
    garnish: "orange",
    ice: "none",
    summer: true,
    ingredients: [
      { name: "オレンジジュース", amount: "40 ml" },
      { name: "レモンジュース", amount: "20 ml" },
      { name: "砂糖 (またはシュガーシロップ)", amount: "1 tsp" },
      { name: "アンゴスチュラ・ビターズ", amount: "1 dash" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れます。",
      "砂糖が溶けきるまでしっかりとシェイクします。",
      "冷やしたカクテルグラスに注ぎ、オレンジを飾ります。"
    ]
  },
  "orange+egg_yolk+grenadine+lemon": {
    name: "プッシーフット",
    enName: "Pussyfoot",
    abv: 0,
    taste: ["まろやか", "濃厚", "フルーティー"],
    description: "「忍び足」を意味する名は、禁酒法を推進した運動家ジョンソンのあだ名に由来します。卵黄を加えて硬くシェイクすることで、果汁がクリームのようになめらかにまとまる、飲みごたえのある一杯です。",
    color: "rgba(248, 150, 60, 0.9)",
    hasBubbles: false,
    garnish: "orange",
    ice: "none",
    ingredients: [
      { name: "オレンジジュース", amount: "45 ml" },
      { name: "レモンジュース", amount: "15 ml" },
      { name: "グレナデンシロップ", amount: "1 tsp" },
      { name: "卵黄", amount: "1 個分" }
    ],
    method: [
      "シェイカーに氷と全ての材料を入れます。",
      "卵黄が完全に乳化するまで、通常より長く強くシェイクします。",
      "大きめのグラスに注ぎ、オレンジを飾ります。"
    ]
  },
  "soda+lime+mint+sugar": {
    name: "ヴァージン・モヒート",
    enName: "Virgin Mojito",
    abv: 0,
    taste: ["清涼感", "さっぱり", "ハーバル"],
    description: "モヒートからラムだけを抜いた、真夏の定番ノンアルコール。ミントを潰さずに押し当てて香りだけを移すのがコツで、青臭さの出ない澄んだ清涼感に仕上がります。",
    color: "rgba(198, 228, 190, 0.5)",
    hasBubbles: true,
    garnish: "mint",
    ice: "crushed",
    summer: true,
    ingredients: [
      { name: "フレッシュ・ライム", amount: "1/2 個" },
      { name: "ミントの葉", amount: "10 〜 15 枚" },
      { name: "砂糖 (またはシュガーシロップ)", amount: "2 tsp" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "グラスにライムを絞り入れ、砂糖とミントの葉を加えます。",
      "ミントを潰さないよう、ペストルで数回そっと押し当てて香りを移します。",
      "クラッシュアイスをグラスいっぱいに詰めます。",
      "冷えたソーダを注ぎ、底から軽く持ち上げるように混ぜてミントを飾ります。"
    ]
  },
  "soda+lemon+sugar": {
    name: "レモネード",
    enName: "Lemonade",
    abv: 0,
    taste: ["さっぱり", "甘酸っぱい", "爽快"],
    description: "17世紀のパリで売り歩かれた記録が残る、最も古い清涼飲料のひとつ。生のレモンと砂糖とソーダだけという構成ゆえに、果汁の鮮度がそのまま味に出ます。",
    color: "rgba(250, 240, 180, 0.52)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "フレッシュ・レモン果汁", amount: "30 ml" },
      { name: "砂糖 (またはシュガーシロップ)", amount: "2 tsp" },
      { name: "ソーダ (炭酸水)", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "グラスにレモン果汁と砂糖を入れ、砂糖が溶けるまでよく混ぜます。",
      "氷を満たし、冷えたソーダを静かに注ぎます。",
      "軽く1回ステアし、レモンスライスを飾ります。"
    ]
  },
  "tomato+lemon": {
    name: "ヴァージン・メアリー",
    enName: "Virgin Mary",
    abv: 0,
    taste: ["旨味", "スパイシー", "さっぱり"],
    description: "ブラッディ・メアリーからウォッカを抜いた一杯で、「ブラッディ・シェイム（血まみれの恥）」という洒落た別名でも呼ばれます。塩と胡椒、タバスコの量で自分好みに詰められる、食事に寄り添うノンアルコールです。",
    color: "rgba(198, 46, 42, 0.9)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "cube",
    ingredients: [
      { name: "トマトジュース", amount: "適量 (約 120 ml)" },
      { name: "フレッシュ・レモン果汁", amount: "10 ml" },
      { name: "塩・黒胡椒", amount: "各少々" },
      { name: "タバスコ / ウスターソース", amount: "お好みで" }
    ],
    method: [
      "氷を入れたタンブラーグラスにレモン果汁を注ぎます。",
      "よく冷やしたトマトジュースを満たします。",
      "塩、黒胡椒、お好みでタバスコを加えてステアし、レモンを添えます。"
    ]
  },
  "pineapple+coconut": {
    name: "ヴァージン・ピニャコラーダ",
    enName: "Virgin Piña Colada",
    abv: 0,
    taste: ["甘い", "濃厚", "トロピカル"],
    description: "プエルトリコ生まれの「ピニャコラーダ（漉したパイナップル）」からラムを抜いた、南国そのものの一杯。ココナッツミルクの脂質がパイナップルの酸をまろやかに包みます。",
    color: "rgba(250, 240, 214, 0.92)",
    hasBubbles: false,
    garnish: "cherry",
    ice: "crushed",
    summer: true,
    ingredients: [
      { name: "パイナップルジュース", amount: "80 ml" },
      { name: "ココナッツミルク", amount: "30 ml" }
    ],
    method: [
      "シェイカー（またはブレンダー）にクラッシュアイスと材料を入れます。",
      "しっかりとシェイクし、全体が白く一体になるまで混ぜます。",
      "クラッシュアイスを詰めた大きめのグラスに注ぎ、チェリーを飾ります。"
    ]
  },
  "grapefruit+grenadine+lime+soda": {
    name: "サマー・ディライト",
    enName: "Summer Delight",
    abv: 0,
    taste: ["さっぱり", "甘酸っぱい", "爽快"],
    description: "グレープフルーツのほろ苦さにライムの酸味を重ね、ソーダで軽やかに伸ばした夏向きのノンアルコール。グレナデンをほんの少し沈めることで、淡いサンセットの色合いが生まれます。",
    color: "rgba(244, 150, 120, 0.62)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "グレープフルーツジュース", amount: "45 ml" },
      { name: "フレッシュ・ライム果汁", amount: "15 ml" },
      { name: "グレナデンシロップ", amount: "1 tsp" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにグレープフルーツジュースとライム果汁を注ぎ、ステアします。",
      "グレナデンシロップを静かに沈めます。",
      "冷えたソーダで満たし、混ぜすぎないようにしてライムを飾ります。"
    ]
  },
  "cranberry+grapefruit": {
    name: "ヴァージン・シーブリーズ",
    enName: "Virgin Sea Breeze",
    abv: 0,
    taste: ["さっぱり", "甘酸っぱい", "フルーティー"],
    description: "シーブリーズ（海風）からウォッカを抜いた、二つの果汁だけで成立する一杯。クランベリーの渋みとグレープフルーツの苦みが合わさり、糖分の割に後口が驚くほど乾いています。",
    color: "rgba(206, 60, 70, 0.82)",
    hasBubbles: false,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "クランベリージュース", amount: "60 ml" },
      { name: "グレープフルーツジュース", amount: "60 ml" }
    ],
    method: [
      "氷を満たしたタンブラーグラスに両方の果汁を注ぎます。",
      "全体が均一になるまで軽くステアします。",
      "ライムを飾ります。"
    ]
  },
  "ginger+lime": {
    name: "ヴァージン・モスコミュール",
    enName: "Virgin Moscow Mule",
    abv: 0,
    taste: ["スパイシー", "さっぱり", "爽快"],
    description: "モスコミュールからウォッカを抜いた一杯。もともとこのカクテルの正体はジンジャーとライムの取り合わせなので、酒がなくても味の骨格はほとんど変わりません。銅マグで供せばなお冷えます。",
    color: "rgba(238, 214, 150, 0.55)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "フレッシュ・ライム果汁", amount: "15 ml" },
      { name: "ジンジャービア (またはジンジャーエール)", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "氷を満たしたマグまたはタンブラーにライム果汁を注ぎます。",
      "冷えたジンジャービアで満たします。",
      "底から一度だけ持ち上げるように混ぜ、ライムを飾ります。"
    ]
  },
  "grapefruit+soda+sugar": {
    name: "グレープフルーツ・スカッシュ",
    enName: "Grapefruit Squash",
    abv: 0,
    taste: ["ほろ苦い", "さっぱり", "爽快"],
    description: "搾りたてのグレープフルーツを、ごく少量の砂糖とソーダだけで立ち上げた一杯。苦味を殺さない程度に甘みを足すのがこつで、食前にも食事中にも寄り添います。",
    color: "rgba(246, 232, 160, 0.6)",
    hasBubbles: true,
    garnish: "lime",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "グレープフルーツ果汁", amount: "60 ml" },
      { name: "シュガーシロップ", amount: "1 tsp" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "氷を入れたグラスにグレープフルーツ果汁とシロップを注ぎ、軽く混ぜます。",
      "冷えたソーダで静かに満たします。",
      "一度だけ混ぜ、ライムを飾ります。"
    ]
  },
  "soda+honey+lemon": {
    name: "ハニー・レモン・ソーダ",
    enName: "Honey Lemon Soda",
    abv: 0,
    taste: ["まろやか", "甘酸っぱい", "爽快"],
    description: "蜂蜜をぬるま湯で溶いてから合わせるのが唯一のこつで、冷たい液体に直接落とすと底に沈んだまま溶けません。砂糖のレモネードより丸く、喉にやさしい後口になります。",
    color: "rgba(244, 226, 160, 0.55)",
    hasBubbles: true,
    garnish: "lemon",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "ハニーシロップ (蜂蜜:湯 = 1:1)", amount: "20 ml" },
      { name: "フレッシュ・レモン果汁", amount: "25 ml" },
      { name: "ソーダ (炭酸水)", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "蜂蜜は同量のぬるま湯で溶いてシロップにしておきます。",
      "氷を入れたグラスにシロップとレモン果汁を注ぎ、よく混ぜます。",
      "冷えたソーダで満たし、一度だけ混ぜてレモンを飾ります。"
    ]
  },
  "orange+grenadine+pineapple+soda": {
    name: "フルーツ・パンチ",
    enName: "Fruit Punch",
    abv: 0,
    taste: ["フルーティー", "甘い", "爽快"],
    description: "サンスクリット語で「5」を意味する「パンチ」が語源の、パーティーの定番。果汁とシロップを合わせてソーダで割るだけで、人数分をまとめて用意できるのが本来の魅力です。",
    color: "rgba(246, 130, 80, 0.8)",
    hasBubbles: true,
    garnish: "orange",
    ice: "cube",
    summer: true,
    ingredients: [
      { name: "オレンジジュース", amount: "45 ml" },
      { name: "パイナップルジュース", amount: "45 ml" },
      { name: "グレナデンシロップ", amount: "1 tsp" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "氷を入れた大きめのグラスに果汁とグレナデンシロップを注ぎ、ステアします。",
      "冷えたソーダを静かに加えます。",
      "軽く1回混ぜ、オレンジを飾ります。"
    ]
  }
};

// Base spirit default tints (when only base is selected)
const baseTints = {
  gin: "rgba(224, 242, 241, 0.15)",     // Clear with a tiny greenish/blue tint
  vodka: "rgba(255, 255, 255, 0.15)",   // Clear translucent white
  rum: "rgba(255, 248, 220, 0.22)",     // Clear with warm sugarcane gold tint
  tequila: "rgba(244, 255, 220, 0.18)",  // Clear with a faint agave green tint
  whiskey: "rgba(212, 143, 56, 0.4)",    // Rich amber color
  brandy: "rgba(189, 93, 30, 0.45)",     // Deep cognac copper color
  peach: "rgba(255, 240, 220, 0.25)",    // Pale warm peach tint
  cassis: "rgba(136, 14, 79, 0.6)",      // Rich violet/ruby syrup color
  coffee: "rgba(78, 52, 46, 0.7)",       // Rich dark coffee syrup color

  // Wine, grape spirits and the two liqueurs that carry a drink by
  // themselves. A bar that stocks these can pour most of the standard book.
  champagne: "rgba(247, 231, 190, 0.45)",  // Pale straw, fine bead
  white_wine: "rgba(240, 234, 200, 0.4)",  // Dry white
  pisco: "rgba(250, 250, 245, 0.2)",       // Clear grape brandy
  cachaca: "rgba(250, 248, 235, 0.2)",     // Clear cane spirit
  apple_brandy: "rgba(205, 133, 63, 0.45)",// Calvados amber
  cacao: "rgba(121, 85, 72, 0.8)",         // Crème de cacao

  // Non-alcoholic bases. These ids are shared with mixerDefinitions on
  // purpose — a carton of orange juice is one bottle on the shelf whether it
  // is carrying the drink or joining it.
  ginger: "rgba(244, 208, 63, 0.5)",     // Pale ginger ale gold
  orange: "rgba(255, 167, 38, 0.8)",     // Orange juice
  soda: "rgba(224, 242, 241, 0.3)",      // Plain soda water
  tomato: "rgba(211, 47, 47, 0.9)",      // Tomato juice
  pineapple: "rgba(255, 235, 59, 0.7)",  // Pineapple juice
  grapefruit: "rgba(255, 245, 157, 0.7)",// Grapefruit juice
  cranberry: "rgba(178, 24, 44, 0.82)"   // Cranberry juice
};

// All available 15 mixers information for dynamic rendering
const mixerDefinitions = {
  tonic: { name: "トニックウォーター", en: "TONIC WATER", icon: "TW", color: "rgba(224, 247, 250, 0.4)" },
  orange: { name: "オレンジジュース", en: "ORANGE JUICE", icon: "OJ", color: "rgba(255, 167, 38, 0.8)" },
  cola: { name: "コーラ", en: "COLA", icon: "CL", color: "rgba(62, 39, 35, 0.9)" },
  ginger: { name: "ジンジャーエール", en: "GINGER ALE", icon: "GA", color: "rgba(244, 208, 63, 0.5)" },
  soda: { name: "ソーダ (炭酸水)", en: "SODA WATER", icon: "SW", color: "rgba(224, 242, 241, 0.3)" },
  milk: { name: "牛乳", en: "MILK", icon: "MK", color: "rgba(255, 255, 255, 0.95)" },
  curacao: { name: "ホワイトキュラソー", en: "TRIPLE SEC", icon: "TS", color: "rgba(255, 255, 255, 0.3)" },
  blue_curacao: { name: "ブルーキュラソー", en: "BLUE CURACAO", icon: "BC", color: "rgba(2, 136, 209, 0.75)" },
  coconut: { name: "ココナッツミルク", en: "COCONUT MILK", icon: "CN", color: "rgba(252, 248, 235, 0.95)" },
  lime: { name: "ライムジュース", en: "LIME JUICE", icon: "LI", color: "rgba(197, 225, 165, 0.5)" },
  grapefruit: { name: "グレープフルーツ", en: "GRAPEFRUIT JUICE", icon: "GF", color: "rgba(255, 245, 157, 0.7)" },
  cranberry: { name: "クランベリージュース", en: "CRANBERRY JUICE", icon: "CB", color: "rgba(178, 24, 44, 0.82)" },
  salt: { name: "食塩 (スノースタイル用)", en: "SALT RIM", icon: "SL", color: "rgba(255, 255, 255, 0.9)" },
  pineapple: { name: "パイナップル", en: "PINEAPPLE JUICE", icon: "PJ", color: "rgba(255, 235, 59, 0.7)" },
  tomato: { name: "トマトジュース", en: "TOMATO JUICE", icon: "TJ", color: "rgba(211, 47, 47, 0.9)" },
  mint: { name: "ミント", en: "MINT", icon: "MT", color: "rgba(76, 175, 80, 0.7)" },
  oolong: { name: "ウーロン茶", en: "OOLONG TEA", icon: "OT", color: "rgba(150, 90, 40, 0.55)" },
  absinthe: { name: "アブサン", en: "ABSINTHE", icon: "AB", color: "rgba(129, 199, 132, 0.6)" },
  whiskey: { name: "ウイスキー (ブレンド用)", en: "WHISKEY MIX", icon: "WH", color: "rgba(212, 143, 56, 0.6)" },
  dry_vermouth: { name: "ドライ・ベルモット", en: "DRY VERMOUTH", icon: "DV", color: "rgba(238, 232, 170, 0.4)" },
  sweet_vermouth: { name: "スイート・ベルモット", en: "SWEET VERMOUTH", icon: "SV", color: "rgba(139, 0, 0, 0.8)" },
  campari: { name: "カンパリ", en: "CAMPARI", icon: "CP", color: "rgba(213, 0, 0, 0.85)" },
  bitters: { name: "アンゴスチュラ・ビターズ", en: "BITTERS", icon: "BT", color: "rgba(93, 64, 55, 0.9)" },
  olive: { name: "オリーブ", en: "OLIVE", icon: "OL", color: "rgba(158, 157, 36, 0.9)" },
  lemon: { name: "レモンジュース", en: "LEMON JUICE", icon: "LE", color: "rgba(255, 235, 59, 0.5)" },
  grenadine: { name: "グレナデンシロップ", en: "GRENADINE", icon: "GR", color: "rgba(229, 57, 53, 0.9)" },
  cream: { name: "生クリーム", en: "FRESH CREAM", icon: "CR", color: "rgba(255, 255, 255, 0.95)" },
  cacao: { name: "クレーム・ド・カカオ", en: "CACAO LIQUEUR", icon: "CC", color: "rgba(121, 85, 72, 0.8)" },
  coffee: { name: "コーヒーリキュール", en: "COFFEE LIQUEUR", icon: "KL", color: "rgba(62, 39, 35, 0.9)" },
  cassis: { name: "カシスリキュール", en: "CASSIS LIQUEUR", icon: "CA", color: "rgba(136, 14, 79, 0.8)" },
  peach: { name: "ピーチリキュール", en: "PEACH LIQUEUR", icon: "PC", color: "rgba(255, 183, 156, 0.75)" },
  espresso: { name: "エスプレッソ", en: "ESPRESSO", icon: "ES", color: "rgba(33, 33, 33, 0.95)" },
  maraschino_liq: { name: "マラスキーノ", en: "MARASCHINO LIQUEUR", icon: "ML", color: "rgba(255, 255, 255, 0.1)" },
  maraschino_cherry: { name: "マラスキーノ・チェリー", en: "MARASCHINO CHERRY", icon: "MC", color: "rgba(213, 0, 0, 0.9)" },
  sugar: { name: "砂糖 / シロップ", en: "SUGAR", icon: "SG", color: "rgba(255, 255, 255, 0.3)" },
  brandy: { name: "ブランデー (ブレンド用)", en: "BRANDY MIX", icon: "BR", color: "rgba(189, 93, 30, 0.6)" },
  egg_yolk: { name: "卵黄", en: "EGG YOLK", icon: "EY", color: "rgba(255, 193, 7, 0.9)" },

  // The back bar a standard book actually calls for.
  champagne: { name: "シャンパン / スパークリング", en: "CHAMPAGNE", icon: "CH", color: "rgba(247, 231, 190, 0.5)" },
  white_wine: { name: "白ワイン (辛口)", en: "DRY WHITE WINE", icon: "WW", color: "rgba(240, 234, 200, 0.45)" },
  aperol: { name: "アペロール", en: "APEROL", icon: "AP", color: "rgba(240, 96, 20, 0.8)" },
  amaretto: { name: "アマレット", en: "AMARETTO", icon: "AM", color: "rgba(150, 75, 30, 0.75)" },
  chartreuse: { name: "シャルトリューズ・ヴェール", en: "GREEN CHARTREUSE", icon: "CT", color: "rgba(150, 190, 40, 0.75)" },
  benedictine: { name: "ベネディクティン", en: "BENEDICTINE", icon: "BN", color: "rgba(196, 140, 50, 0.7)" },
  drambuie: { name: "ドランブイ", en: "DRAMBUIE", icon: "DR", color: "rgba(190, 130, 45, 0.75)" },
  // Left uncoloured on the shelf on purpose: a Stinger wants the white and a
  // Grasshopper the green, and they are the same bottle in every way that
  // matters to a shelf. Each recipe says which it wants.
  creme_de_menthe: { name: "クレーム・ド・ミント", en: "CREME DE MENTHE", icon: "CM", color: "rgba(60, 190, 130, 0.8)" },
  egg_white: { name: "卵白", en: "EGG WHITE", icon: "EW", color: "rgba(255, 255, 255, 0.55)" },
  // One berry slot on the shelf. A Bramble wants mûre (blackberry) and a
  // Clover Club framboise (raspberry); each recipe names its own.
  raspberry: { name: "ベリーのリキュール", en: "BERRY LIQUEUR", icon: "RB", color: "rgba(180, 30, 70, 0.8)" },
  peychaud: { name: "ペイショーズ・ビターズ", en: "PEYCHAUD'S BITTERS", icon: "PB", color: "rgba(190, 40, 40, 0.85)" },
  honey: { name: "ハニーシロップ", en: "HONEY SYRUP", icon: "HN", color: "rgba(230, 180, 60, 0.7)" },
  orgeat: { name: "オルジェー・シロップ", en: "ORGEAT", icon: "OG", color: "rgba(250, 240, 220, 0.8)" },
  cherry_brandy: { name: "チェリーブランデー", en: "CHERRY BRANDY", icon: "CY", color: "rgba(170, 30, 50, 0.8)" },
  galliano: { name: "ガリアーノ", en: "GALLIANO", icon: "GL", color: "rgba(240, 200, 60, 0.8)" },
  gin: { name: "ジン (ブレンド用)", en: "GIN MIX", icon: "GI", color: "rgba(224, 242, 241, 0.3)" },
  rum: { name: "ラム (ブレンド用)", en: "RUM MIX", icon: "RU", color: "rgba(255, 248, 220, 0.35)" },
  tequila: { name: "テキーラ (ブレンド用)", en: "TEQUILA MIX", icon: "TE", color: "rgba(244, 255, 220, 0.3)" }
};

// ==========================================================================
// 1b. COCKTAIL / MOCKTAIL
// Whether a drink contains alcohol is not a label anyone has to remember to
// attach — it is already written in the recipe key. A drink is a mocktail
// when it is built on a non-alcoholic base and nothing alcoholic is mixed
// into it. Deriving it means a new recipe can never be filed under the wrong
// heading by omission.
// ==========================================================================
const NON_ALCOHOLIC_BASES = new Set([
  'ginger', 'orange', 'soda', 'tomato', 'pineapple', 'grapefruit', 'cranberry'
]);

const SPIRIT_BASES = Object.keys(baseTints).filter(b => !NON_ALCOHOLIC_BASES.has(b));

/**
 * Mixers that would put alcohol back into a drink built on a soft base.
 * Angostura bitters is deliberately absent: a dash is roughly a fifth of a
 * millilitre, and the classics that use it that way — Florida above — are
 * catalogued as non-alcoholic everywhere. The recipe says so in its own text.
 */
const ALCOHOLIC_MIXERS = new Set([
  'curacao', 'blue_curacao', 'absinthe', 'whiskey', 'brandy', 'cassis',
  'peach', 'coffee', 'cacao', 'campari', 'dry_vermouth', 'sweet_vermouth',
  'maraschino_liq',
  'champagne', 'white_wine', 'aperol', 'amaretto', 'chartreuse', 'benedictine',
  'drambuie', 'creme_de_menthe', 'raspberry', 'cherry_brandy', 'galliano',
  'gin', 'rum', 'tequila',
  // Peychaud's is left out for the same reason as Angostura: a dash is a
  // fifth of a millilitre, and the drinks that use it that way are
  // catalogued as non-alcoholic everywhere.
]);

function isMocktailKey(key) {
  const parts = key.split('+');
  return NON_ALCOHOLIC_BASES.has(parts[0])
      && !parts.slice(1).some(m => ALCOHOLIC_MIXERS.has(m));
}

// ==========================================================================
// 2. APPLICATION STATE
// ==========================================================================
const state = {
  currentMode: 'build',  // 'build' | 'dictionary' | 'mybar' | 'menu'
  drinkType: 'all',      // 'all' | 'cocktail' | 'mocktail' — cuts across every mode

  // Guest mode. menuShelf is the host's shelf, decoded out of the URL; it is
  // never mixed into myBarIngredients, so reading someone's menu does not
  // overwrite your own shelf.
  menuCode: null,
  menuShelf: null,
  galleryFilter: 'all',  // 'all' | 'iba' | base spirit key
  showResult: false,     // True when the user explicitly opens an extensible recipe
  selectedBase: null,    // 'gin' | 'vodka' | 'rum' | ...
  selectedMixers: [],    // Array of selected mixers
  selectedIce: 'cube',   // 'cube' | 'crushed' | 'none'
  myBarIngredients: new Set(), // Set of selected ingredients for My Bar mode
  
  // Canvas Animation properties
  animLevel: 0,          // Current height level of liquid (0 to 1)
  targetLevel: 0,        // Target height level (e.g. 0.35 or 0.88)
  currentColor: [255, 255, 255, 0], // Current RGBA color components
  targetColor: [255, 255, 255, 0], // Target RGBA color components
  wavePhase: 0,
  bubbles: [],
  saltRim: false,

  // Pour choreography for the large preview glass
  pourKey: null,
  pourProgress: 0,
  lastResultKey: null
};

// Pour timeline: 0→1 fills the glass, 1→POUR_END lets the surface settle.
const POUR_END = 1.55;

// ==========================================================================
// 2b. PERSISTENCE
// The bottle shelf is the one thing worth remembering between visits — it is
// tedious to re-tick thirty ingredients, especially on a phone. Everything
// else is cheap to re-derive, so nothing else is stored.
// ==========================================================================
const MY_BAR_STORAGE_KEY = 'antigravity.mybar.v1';
const DRINK_TYPE_STORAGE_KEY = 'antigravity.drinktype.v1';

/**
 * Someone who does not drink should not have to say so on every visit, so the
 * cocktail/mocktail choice is remembered alongside the shelf.
 */
function readStoredDrinkType() {
  let stored;
  try {
    stored = localStorage.getItem(DRINK_TYPE_STORAGE_KEY);
  } catch {
    return 'all';
  }
  return ['all', 'cocktail', 'mocktail'].includes(stored) ? stored : 'all';
}

function saveDrinkType() {
  try {
    localStorage.setItem(DRINK_TYPE_STORAGE_KEY, state.drinkType);
  } catch {
    // Storage unavailable — the choice just will not survive a reload.
  }
}

// ==========================================================================
// 2d. THE SHELF, WRITTEN INTO A LINK
// A guest's phone has no shelf on it, so a menu has to carry the host's in
// its own URL: one bit per ingredient, packed six to a character. Forty-one
// ingredients come to seven characters, short enough to stay readable and to
// survive being pasted into a chat app.
//
// THE ORDER OF THIS LIST IS PART OF EVERY LINK EVER HANDED OUT. A new
// ingredient goes on the END. Reordering or removing an entry silently
// repoints every menu someone is still holding at a different shelf.
// ==========================================================================
const SHELF_VOCABULARY = [
  'gin', 'vodka', 'rum', 'tequila',
  'whiskey', 'brandy', 'peach', 'cassis',
  'coffee', 'ginger', 'orange', 'soda',
  'tomato', 'pineapple', 'grapefruit', 'cranberry',
  'tonic', 'cola', 'milk', 'curacao',
  'blue_curacao', 'coconut', 'lime', 'salt',
  'mint', 'oolong', 'absinthe', 'dry_vermouth',
  'sweet_vermouth', 'campari', 'bitters', 'olive',
  'lemon', 'grenadine', 'cream', 'cacao',
  'espresso', 'maraschino_liq', 'maraschino_cherry', 'sugar',
  'egg_yolk',
  // Appended 2026-07-28. Never reorder anything above this line.
  'champagne', 'white_wine', 'pisco', 'cachaca',
  'apple_brandy', 'aperol', 'amaretto', 'chartreuse',
  'benedictine', 'drambuie', 'creme_de_menthe', 'egg_white',
  'raspberry', 'peychaud', 'honey', 'orgeat',
  'cherry_brandy', 'galliano',
];

// URL-safe base64 alphabet: nothing here needs escaping in a fragment.
const SHELF_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const SHELF_BITS_PER_CHAR = 6;

/** An ingredient absent from the list would quietly vanish from every menu. */
(function auditShelfVocabulary() {
  const known = new Set(SHELF_VOCABULARY);
  const missing = [...Object.keys(baseTints), ...Object.keys(mixerDefinitions)]
    .filter(id => !known.has(id));
  if (missing.length) {
    console.warn(
      `[shelf] ${missing.join(', ')} missing from SHELF_VOCABULARY — ` +
      'append them to the END of the list, never in the middle.'
    );
  }
})();

function encodeShelf(ids) {
  let code = '';
  for (let i = 0; i < SHELF_VOCABULARY.length; i += SHELF_BITS_PER_CHAR) {
    let chunk = 0;
    for (let b = 0; b < SHELF_BITS_PER_CHAR; b++) {
      if (ids.has(SHELF_VOCABULARY[i + b])) chunk |= 1 << b;
    }
    code += SHELF_ALPHABET[chunk];
  }
  return code;
}

/** Returns null for anything that is not a shelf, so a typo shows a 404 view
 *  rather than an empty menu the guest would read as "nothing to drink". */
function decodeShelf(code) {
  if (!code) return null;
  const ids = new Set();
  for (let c = 0; c < code.length; c++) {
    const chunk = SHELF_ALPHABET.indexOf(code[c]);
    if (chunk < 0) return null;
    for (let b = 0; b < SHELF_BITS_PER_CHAR; b++) {
      // A longer code than this build understands — a link made after another
      // ingredient was appended — simply drops the bits it has no name for.
      const id = SHELF_VOCABULARY[c * SHELF_BITS_PER_CHAR + b];
      if (id && (chunk & (1 << b))) ids.add(id);
    }
  }
  return ids;
}

/** Private browsing and blocked storage both throw; neither is worth an error. */
function readStoredShelf() {
  let raw;
  try {
    raw = localStorage.getItem(MY_BAR_STORAGE_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  // Drop anything the app no longer knows about, so a renamed or removed
  // ingredient cannot resurrect itself as an unmatchable entry. Checked with
  // hasOwnProperty rather than a plain lookup: "__proto__" and "constructor"
  // are truthy on any object literal and would otherwise sail through.
  const known = (obj, id) => Object.prototype.hasOwnProperty.call(obj, id);
  return parsed.filter(id =>
    typeof id === 'string' && (known(baseTints, id) || known(mixerDefinitions, id))
  );
}

function saveShelf() {
  try {
    localStorage.setItem(
      MY_BAR_STORAGE_KEY,
      JSON.stringify([...state.myBarIngredients])
    );
  } catch {
    // Storage full or unavailable — the shelf just will not persist.
  }
}

// Pre-generate positions for crushed ice shards so they remain steady
const crushedIceData = [];
for (let i = 0; i < 38; i++) {
  crushedIceData.push({
    xRel: Math.random() * 0.7 + 0.15, // Relative X (0.15 to 0.85)
    yRel: Math.random() * 0.75 + 0.05, // Relative Y (0.05 to 0.80)
    size: Math.random() * 5 + 7,       // Size (7px to 12px)
    rot: Math.random() * Math.PI * 2,  // Random rotation
    wiggleSpeed: Math.random() * 0.02 + 0.01,
    wigglePhase: Math.random() * 10
  });
}

// Pre-generate positions for stacked cube ice
const cubeIceData = [
  { xRel: 0.5, yRel: 0.20, rot: 0.15, size: 48 }, // Top
  { xRel: 0.46, yRel: 0.45, rot: -0.1, size: 52 }, // Middle
  { xRel: 0.52, yRel: 0.70, rot: 0.05, size: 50 }  // Bottom
];

// ==========================================================================
// 3. DOM ELEMENTS
// ==========================================================================
const DOM = {
  // Cocktail / mocktail switch
  drinkTypeSwitch: document.getElementById('drink-type-switch'),
  baseGroupSpirits: document.getElementById('base-group-spirits'),
  baseGroupSoft: document.getElementById('base-group-soft'),
  myBarBaseCategory: document.getElementById('mybar-base-category'),
  resultTag: document.getElementById('result-tag'),
  mocktailBadgeResult: document.getElementById('mocktail-badge-result'),

  // Guest menu
  courseNav: document.getElementById('course-nav'),
  omakaseBtn: document.getElementById('btn-omakase'),
  menuMasthead: document.getElementById('menu-masthead'),
  menuNote: document.getElementById('menu-note'),
  shareMenuBtn: document.getElementById('btn-share-menu'),
  shareMenuStatus: document.getElementById('menu-share-status'),

  // Tabs
  tabBuild: document.getElementById('tab-build'),
  tabDictionary: document.getElementById('tab-dictionary'),
  tabMyBar: document.getElementById('tab-mybar'),
  viewBuild: document.getElementById('view-build'),
  viewDictionary: document.getElementById('view-dictionary'),
  viewMyBar: document.getElementById('view-mybar'),
  
  // Right Column View wrappers
  controlsCard: document.getElementById('controls-card'),
  
  // Build Mode selectors
  baseBtns: document.querySelectorAll('.base-btn'),
  mixerContainer: document.getElementById('mixer-container'),
  resetBtn: document.getElementById('btn-reset'),
  viewRecipeBtn: document.getElementById('btn-view-recipe'),
  backToBuildBtn: document.getElementById('btn-back-to-build'),
  
  // Dictionary Mode Gallery
  gallerySearch: document.getElementById('gallery-search'),
  galleryGrid: document.getElementById('gallery-grid'),
  galleryFilters: document.getElementById('gallery-filters'),
  
  // My Bar Mode
  myBarBaseContainer: document.getElementById('mybar-base-container'),
  myBarMixerContainer: document.getElementById('mybar-mixer-container'),
  myBarResultCount: document.getElementById('mybar-result-count'),
  myBarGalleryGrid: document.getElementById('mybar-gallery-grid'),
  myBarTipsList: document.getElementById('mybar-tips-list'),
  
  // Starter Set
  starterSetAccordion: document.getElementById('starter-set-accordion'),
  starterSetToggle: document.getElementById('starter-set-toggle'),
  starterSetDesc: document.getElementById('starter-set-desc'),
  starterSetItems: document.getElementById('starter-set-items'),
  starterGalleryGrid: document.getElementById('starter-gallery-grid'),
  
  // Visualizer Canvas & Overlays
  canvas: document.getElementById('cocktail-canvas'),
  recipeCanvas: document.getElementById('recipe-canvas'),
  garnishLayer: document.getElementById('garnish-layer'),
  statusIndicator: document.getElementById('status-indicator'),
  stageNumber: document.getElementById('stage-number'),
  glass: document.getElementById('cocktail-glass'),
  glassDisplayArea: document.getElementById('glass-display-area'),
  simulatorLayout: document.querySelector('.simulator-layout'),
  visualizerCard: document.querySelector('.visualizer-card'),
  headerBar: document.getElementById('site-header-bar'),
  tabIndicator: document.getElementById('tab-indicator'),
  
  // Results panel
  resultPanel: document.getElementById('result-panel'),
  cocktailName: document.getElementById('cocktail-name'),
  cocktailEnName: document.getElementById('cocktail-en-name'),
  abvFill: document.getElementById('abv-fill'),
  abvValue: document.getElementById('abv-value'),
  tasteBadges: document.getElementById('taste-badges'),
  cocktailDesc: document.getElementById('cocktail-description'),
  ingredientsUl: document.getElementById('ingredients-ul'),
  methodOl: document.getElementById('method-ol'),
  iceStyleDisplay: document.getElementById('ice-style-display')
};

const ctx = DOM.canvas.getContext('2d');

// ==========================================================================
// 4. CANVAS ANIMATION ENGINE
// ==========================================================================

function parseRGBA(str) {
  const stops = [...str.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g)];
  if (stops.length === 0) return [255, 255, 255, 0.2];

  // A gradient carries several stops; average them so the drink still reports
  // one representative colour instead of a hardcoded fallback.
  const sum = stops.reduce((acc, m) => [
    acc[0] + parseInt(m[1]),
    acc[1] + parseInt(m[2]),
    acc[2] + parseInt(m[3]),
    acc[3] + (m[4] !== undefined ? parseFloat(m[4]) : 1)
  ], [0, 0, 0, 0]);

  return [
    Math.round(sum[0] / stops.length),
    Math.round(sum[1] / stops.length),
    Math.round(sum[2] / stops.length),
    sum[3] / stops.length
  ];
}

/**
 * The drink's colour, lifted toward a light that reads on a near-black panel.
 * Very pale spirits would otherwise glow pure white and wash the room out.
 */
function toAmbientRGB(rgba) {
  const [r255, g255, b255] = rgba;
  const max = Math.max(r255, g255, b255);
  const min = Math.min(r255, g255, b255);

  // Effectively colourless (clear spirits, cream drinks): keep the house
  // brass rather than lighting the room with grey.
  if (max - min < 18) return [199, 164, 99];

  const r = r255 / 255, g = g255 / 255, b = b255 / 255;
  const mx = max / 255, mn = min / 255;
  const d = mx - mn;

  let hue;
  if (mx === r) hue = ((g - b) / d) % 6;
  else if (mx === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  hue = (hue * 60 + 360) % 360;

  // Saturation is driven by chroma, not by HSL saturation: a pale lavender
  // Aviation has a high HSL figure purely because it is light, and would come
  // back as vivid blue. Chroma matches what the eye actually reads.
  const sat = Math.min(Math.max((max - min) / 255 * 1.55, 0.3), 0.62);
  const targetL = 0.56;

  const c = (1 - Math.abs(2 * targetL - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = targetL - c / 2;

  let out;
  if (hue < 60) out = [c, x, 0];
  else if (hue < 120) out = [x, c, 0];
  else if (hue < 180) out = [0, c, x];
  else if (hue < 240) out = [0, x, c];
  else if (hue < 300) out = [x, 0, c];
  else out = [c, 0, x];

  return out.map(v => Math.round((v + m) * 255));
}

function applyAmbientTint(rgba) {
  const [r, g, b] = toAmbientRGB(rgba);
  document.documentElement.style.setProperty('--drink-rgb', `${r}, ${g}, ${b}`);
}

/** Drop back to the house brass defined on :root. */
function resetAmbientTint() {
  document.documentElement.style.removeProperty('--drink-rgb');
}

function calculateCurrentBlendColor() {
  if (!state.selectedBase) {
    return [255, 255, 255, 0];
  }
  
  const key = [state.selectedBase, ...[...state.selectedMixers].sort()].join('+');
  const cocktail = cocktailDatabase[key];
  if (cocktail && !cocktail.color.includes('linear-gradient')) {
    return parseRGBA(cocktail.color);
  }

  const baseColorStr = baseTints[state.selectedBase];
  const list = [parseRGBA(baseColorStr)];
  
  state.selectedMixers.forEach(m => {
    const def = mixerDefinitions[m];
    if (def) {
      list.push(parseRGBA(def.color));
    }
  });
  
  let r = 0, g = 0, b = 0, a = 0;
  list.forEach(c => {
    r += c[0];
    g += c[1];
    b += c[2];
    a += c[3];
  });
  
  const count = list.length;
  return [
    Math.round(r / count),
    Math.round(g / count),
    Math.round(b / count),
    a / count
  ];
}

function updateBubbles(currentY) {
  if (!state.selectedBase) {
    state.bubbles = [];
    return;
  }
  
  const h = DOM.canvas.height;
  const w = DOM.canvas.width;
  
  let carbonated = false;
  const carbonMixers = ['tonic', 'cola', 'ginger', 'soda'];
  
  const key = [state.selectedBase, ...[...state.selectedMixers].sort()].join('+');
  const cocktail = cocktailDatabase[key];
  if (cocktail && cocktail.hasBubbles) {
    carbonated = true;
  } else if (!cocktail) {
    carbonated = state.selectedMixers.some(m => carbonMixers.includes(m));
  }
  
  if (!carbonated) {
    state.bubbles = [];
    return;
  }
  
  if (Math.random() < 0.25 && state.animLevel > 0.05) {
    state.bubbles.push({
      x: Math.random() * (w - 30) + 15,
      y: h - 10,
      size: Math.random() * 2 + 1.2,
      speed: Math.random() * 1.5 + 0.8,
      wobbleSpeed: Math.random() * 0.08 + 0.04,
      wobblePhase: Math.random() * 10
    });
  }
  
  state.bubbles = state.bubbles.filter(b => {
    b.y -= b.speed;
    b.x += Math.sin(b.y * b.wobbleSpeed + b.wobblePhase) * 0.3;
    
    const surfaceY = currentY + Math.sin(b.x * 0.05 + state.wavePhase) * 4;
    return b.y > surfaceY;
  });
}

function drawCocktail(timestamp) {
  // Queue the next frame before drawing anything. If the draw below ever
  // throws, the chain must not die — and because a dead chain leaves a stale
  // frame id behind, startPreviewLoop() would refuse to revive it, freezing
  // the glass for the rest of the session.
  previewFrameId = requestAnimationFrame(drawCocktail);

  const w = DOM.canvas.width;
  const h = DOM.canvas.height;

  // Named recipes share the exact same glass renderer as the archive cards.
  const previewKey = [state.selectedBase, ...[...state.selectedMixers].sort()].join('+');
  const previewCocktail = cocktailDatabase[previewKey];
  if (previewCocktail) {
    state.wavePhase += 0.04;

    // Landing on a new recipe replays the pour from an empty glass.
    if (previewKey !== state.pourKey) {
      state.pourKey = previewKey;
      state.pourProgress = 0;
    }
    state.pourProgress = Math.min(state.pourProgress + 0.021, POUR_END);

    drawGalleryPhoto(DOM.recipeCanvas, previewCocktail, {
      phase: state.wavePhase,
      mainPreview: true,
      pour: state.pourProgress
    });
    return;
  }
  state.pourKey = null;

  const recipeCtx = DOM.recipeCanvas.getContext('2d');
  recipeCtx.clearRect(0, 0, DOM.recipeCanvas.width, DOM.recipeCanvas.height);
  ctx.clearRect(0, 0, w, h);
  
  state.animLevel += (state.targetLevel - state.animLevel) * 0.08;
  if (Math.abs(state.targetLevel - state.animLevel) < 0.001) {
    state.animLevel = state.targetLevel;
  }
  
  for (let i = 0; i < 4; i++) {
    state.currentColor[i] += (state.targetColor[i] - state.currentColor[i]) * 0.08;
  }
  
  state.wavePhase += 0.04;
  
  const minLiquidY = 220;
  const maxLiquidY = 25;
  const currentY = minLiquidY - state.animLevel * (minLiquidY - maxLiquidY);
  
  updateBubbles(currentY);
  
  if (state.animLevel > 0.01) {
    ctx.save();
    
    const key = [state.selectedBase, ...[...state.selectedMixers].sort()].join('+');
    const cocktail = cocktailDatabase[key];
    
    let fillStyle = `rgba(${Math.round(state.currentColor[0])}, ${Math.round(state.currentColor[1])}, ${Math.round(state.currentColor[2])}, ${state.currentColor[3]})`;
    
    if (cocktail && cocktail.color.includes('linear-gradient')) {
      const grad = ctx.createLinearGradient(0, h, 0, currentY);
      if (cocktail.name === "テキーラ・サンライズ") {
        grad.addColorStop(0, 'rgba(230, 74, 25, 0.95)');
        grad.addColorStop(0.35, 'rgba(230, 74, 25, 0.95)');
        grad.addColorStop(0.85, 'rgba(255, 183, 77, 0.9)');
      } else if (cocktail.name === "カシス・オレンジ") {
        grad.addColorStop(0, 'rgba(136, 14, 79, 0.95)');
        grad.addColorStop(0.35, 'rgba(136, 14, 79, 0.85)');
        grad.addColorStop(0.8, 'rgba(255, 167, 38, 0.85)');
      } else if (cocktail.name === "カルーア・ミルク") {
        grad.addColorStop(0, 'rgba(78, 52, 46, 0.95)');
        grad.addColorStop(0.35, 'rgba(78, 52, 46, 0.85)');
        grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.9)');
      } else {
        grad.addColorStop(0, 'rgba(215, 110, 50, 0.85)');
        grad.addColorStop(1, 'rgba(255, 183, 77, 0.7)');
      }
      fillStyle = grad;
    }
    
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x++) {
      const wave = Math.sin(x * 0.04 + state.wavePhase) * 3 * (state.animLevel > 0.1 ? 1 : state.animLevel * 10);
      ctx.lineTo(x, currentY + wave);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    
    ctx.restore();
  }
  
  if (state.bubbles.length > 0) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    state.bubbles.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }
  
  if (state.animLevel > 0.05 && state.selectedIce !== 'none') {
    ctx.save();
    
    if (state.selectedIce === 'cube') {
      cubeIceData.forEach((cube, index) => {
        const iceX = w * cube.xRel;
        const floatOffset = Math.sin(state.wavePhase * 0.8 + index) * 3;
        const iceY = currentY + (h - currentY) * cube.yRel + floatOffset;
        
        ctx.save();
        ctx.translate(iceX, iceY);
        ctx.rotate(cube.rot + Math.sin(state.wavePhase * 0.3 + index) * 0.03);
        
        ctx.beginPath();
        ctx.roundRect(-cube.size / 2, -cube.size / 2, cube.size, cube.size, 10);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-cube.size / 2 + 3, -cube.size / 2 + 3, cube.size - 6, cube.size - 6, 7);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(-cube.size / 3, -cube.size / 3);
        ctx.lineTo(cube.size / 3, cube.size / 3);
        ctx.stroke();
        
        ctx.restore();
      });
      
    } else if (state.selectedIce === 'crushed') {
      crushedIceData.forEach((shard) => {
        const shardX = w * shard.xRel;
        const floatOffset = Math.sin(state.wavePhase * 1.5 + shard.wigglePhase) * 1.5;
        const shardY = currentY + (h - currentY) * shard.yRel + floatOffset;
        
        if (shardY < currentY + 5) return;
        
        ctx.save();
        ctx.translate(shardX, shardY);
        ctx.rotate(shard.rot + Math.sin(state.wavePhase * 0.5 + shard.wigglePhase) * 0.08);
        
        ctx.beginPath();
        const r = shard.size / 2;
        ctx.moveTo(0, -r);
        ctx.lineTo(r * 0.8, -r * 0.2);
        ctx.lineTo(r * 0.5, r * 0.8);
        ctx.lineTo(-r * 0.8, r * 0.4);
        ctx.closePath();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fill();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.stroke();
        
        ctx.restore();
      });
    }
    
    ctx.restore();
  }
  
  if (state.saltRim && state.animLevel > 0.1) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    const rimY = 20;
    const rimWidth = 130;
    const rimStartX = 25;
    
    for (let x = rimStartX; x <= rimStartX + rimWidth; x += 1.5) {
      if (Math.random() < 0.75) {
        const offset = (Math.random() - 0.5) * 4;
        ctx.beginPath();
        ctx.arc(x, rimY + offset, Math.random() * 0.8 + 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

/**
 * The live preview is a 60fps canvas, but the archive gallery hides the whole
 * visualizer card. Park the loop whenever the glass is off screen so scrolling
 * and hovering a long grid of cards gets the frame budget instead.
 */
let previewFrameId = null;

function startPreviewLoop() {
  if (previewFrameId === null) previewFrameId = requestAnimationFrame(drawCocktail);
}

function stopPreviewLoop() {
  if (previewFrameId !== null) {
    cancelAnimationFrame(previewFrameId);
    previewFrameId = null;
  }
}

startPreviewLoop();

// ==========================================================================
// 5. GUEST DETAILS & GARNISH DRAWING (HTML/DOM WRAPPERS)
// ==========================================================================

function renderGarnish(type) {
  DOM.garnishLayer.innerHTML = '';
  if (!type) return;

  let svgContent = '';
  if (type === 'lime') {
    svgContent = `
      <svg class="garnish-item lime-garnish" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="#388e3c" stroke="#2e7d32" stroke-width="4"/>
        <circle cx="50" cy="50" r="38" fill="#81c784"/>
        <path d="M 50 12 L 50 88 M 12 50 L 88 50 M 23 23 L 77 77 M 23 77 L 77 23" stroke="#e8f5e9" stroke-width="1.5"/>
        <path d="M 50 12 Q 45 30 50 50 Q 55 30 50 12" fill="#4caf50"/>
        <path d="M 50 88 Q 45 70 50 50 Q 55 70 50 88" fill="#4caf50"/>
        <path d="M 12 50 Q 30 45 50 50 Q 30 55 12 50" fill="#4caf50"/>
        <path d="M 88 50 Q 70 45 50 50 Q 70 55 88 50" fill="#4caf50"/>
        <circle cx="50" cy="50" r="10" fill="#c8e6c9"/>
        <line x1="50" y1="50" x2="50" y2="96" stroke="#12131a" stroke-width="5"/>
      </svg>
    `;
  } else if (type === 'lemon') {
    svgContent = `
      <svg class="garnish-item lemon-garnish" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="#fbc02d" stroke="#f57f17" stroke-width="4"/>
        <circle cx="50" cy="50" r="38" fill="#fff59d"/>
        <path d="M 50 12 L 50 88 M 12 50 L 88 50 M 23 23 L 77 77 M 23 77 L 77 23" stroke="#fffde7" stroke-width="1.5"/>
        <path d="M 50 12 Q 45 30 50 50 Q 55 30 50 12" fill="#fdd835"/>
        <path d="M 50 88 Q 45 70 50 50 Q 55 70 50 88" fill="#fdd835"/>
        <path d="M 12 50 Q 30 45 50 50 Q 30 55 12 50" fill="#fdd835"/>
        <path d="M 88 50 Q 70 45 50 50 Q 70 55 88 50" fill="#fdd835"/>
        <circle cx="50" cy="50" r="10" fill="#fffde7"/>
        <line x1="50" y1="50" x2="50" y2="96" stroke="#12131a" stroke-width="5"/>
      </svg>
    `;
  } else if (type === 'orange') {
    svgContent = `
      <svg class="garnish-item orange-garnish" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="#e65100" stroke="#d84315" stroke-width="4"/>
        <circle cx="50" cy="50" r="38" fill="#ffcc80"/>
        <path d="M 50 12 L 50 88 M 12 50 L 88 50 M 23 23 L 77 77 M 23 77 L 77 23" stroke="#fff3e0" stroke-width="1.5"/>
        <path d="M 50 12 Q 45 30 50 50 Q 55 30 50 12" fill="#ff9800"/>
        <path d="M 50 88 Q 45 70 50 50 Q 55 70 50 88" fill="#ff9800"/>
        <path d="M 12 50 Q 30 45 50 50 Q 30 55 12 50" fill="#ff9800"/>
        <path d="M 88 50 Q 70 45 50 50 Q 70 55 88 50" fill="#ff9800"/>
        <circle cx="50" cy="50" r="10" fill="#ffe0b2"/>
        <line x1="50" y1="50" x2="50" y2="96" stroke="#12131a" stroke-width="5"/>
      </svg>
    `;
  }
  DOM.garnishLayer.innerHTML = svgContent;
}

// ==========================================================================
// 6. STATE CONTROLLERS & RENDERERS
// ==========================================================================

// Scan database and render only compatible mixers for the chosen base spirit
function renderMixerButtons() {
  DOM.mixerContainer.innerHTML = '';
  const base = state.selectedBase;
  if (!base) {
    DOM.mixerContainer.innerHTML = '<p class="status-indicator">ベーススピリッツを選択すると割材を選べます。</p>';
    return;
  }
  
  // Find compatible mixers
  const availableMixers = new Set();
  Object.keys(cocktailDatabase).forEach(key => {
    const parts = key.split('+');
    if (parts[0] === base) {
      parts.slice(1).forEach(m => availableMixers.add(m));
    }
  });
  
  // Create button for each active mixer
  Array.from(availableMixers).forEach(mKey => {
    const def = mixerDefinitions[mKey];
    if (!def) return;
    
    const btn = document.createElement('button');
    btn.className = 'select-btn mixer-btn';
    btn.dataset.mixer = mKey;
    // Namespaced away from the base buttons: several ingredients are both a
    // base and a mixer — brandy, whiskey, gin — so `btn-brandy` existed twice
    // in the document the moment you picked rum. Nothing reads these ids; the
    // collision was simply invalid.
    btn.id = `mixer-${mKey}`;
    const mixerColor = parseRGBA(def.color);
    btn.style.setProperty('--ingredient-rgb', `${mixerColor[0]}, ${mixerColor[1]}, ${mixerColor[2]}`);
    
    if (state.selectedMixers.includes(mKey)) {
      btn.classList.add('active');
    }
    
    btn.innerHTML = `
      <span class="btn-icon" aria-hidden="true">${def.icon}</span>
      <div class="btn-label-group">
        <span class="btn-jp">${def.name}</span>
        <span class="btn-en">${def.en}</span>
      </div>
    `;
    
    btn.addEventListener('click', () => {
      toggleMixer(mKey);
    });
    
    DOM.mixerContainer.appendChild(btn);
  });
  
  updateMixerButtonsAvailability();
}

// Mixers that turn a base into a named drink on their own, and so are worth
// pointing at even though they lead nowhere further.
const SPECIAL_SINGLE_MIXERS = new Set(['orange', 'ginger', 'soda', 'salt', 'curacao']);

// Strictly enable/disable compatible mixers based on current selection path
function updateMixerButtonsAvailability() {
  const base = state.selectedBase;
  if (!base) return;
  
  const buttons = DOM.mixerContainer.querySelectorAll('.mixer-btn');
  buttons.forEach(btn => {
    const mKey = btn.dataset.mixer;
    
    // Check if selecting this mixer leads to any valid cocktail in database
    const temp = [...state.selectedMixers];
    if (!temp.includes(mKey)) {
      temp.push(mKey);
    }
    
    const isValid = Object.keys(cocktailDatabase).some(key => {
      const parts = key.split('+');
      if (parts[0] !== base) return false;
      return temp.every(m => parts.includes(m));
    });
    
    btn.disabled = !isValid;
    
    // Set active style
    if (state.selectedMixers.includes(mKey)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    btn.setAttribute('aria-pressed', String(state.selectedMixers.includes(mKey)));
    
    // Glow logic
    btn.classList.remove('glow-yellow', 'glow-green', 'is-available');
    if (isValid && !state.selectedMixers.includes(mKey)) {
      btn.classList.add('is-available');
      let canBeMultiMixer = false;
      let canBeSingleMixerIrregular = false;
      
      Object.entries(cocktailDatabase).forEach(([key, cocktail]) => {
        const parts = key.split('+');
        if (parts[0] !== base) return;
        if (!temp.every(m => parts.includes(m))) return;
        
        const numMixers = parts.length - 1;
        if (numMixers >= 2) {
          canBeMultiMixer = true;
        } else if (numMixers === 1 && SPECIAL_SINGLE_MIXERS.has(parts[1])) {
          // Glow yellow for specialized single mixers. Matched against the
          // mixer itself rather than the whole key: now that a drink can be
          // built on orange juice or soda, a substring test on the key lights
          // up every button on the board.
          canBeSingleMixerIrregular = true;
        }
      });
      
      if (canBeMultiMixer) {
        btn.classList.add('glow-green');
      } else if (canBeSingleMixerIrregular) {
        btn.classList.add('glow-yellow');
      }
    }
  });
}

function toggleMixer(mixerKey) {
  state.showResult = false;
  const index = state.selectedMixers.indexOf(mixerKey);
  
  if (index > -1) {
    state.selectedMixers.splice(index, 1);
  } else {
    const temp = [...state.selectedMixers, mixerKey];
    const base = state.selectedBase;
    
    const isValid = Object.keys(cocktailDatabase).some(key => {
      const parts = key.split('+');
      if (parts[0] !== base) return false;
      return temp.every(m => parts.includes(m));
    });
    
    if (isValid) {
      state.selectedMixers.push(mixerKey);
    }
  }
  
  // The ice is the recipe's to decide, never the builder's. There used to be
  // a picker for it, which did nothing that survived: the moment the mixers
  // named a real drink, this line overwrote whatever had been chosen. A
  // control whose answer is always discarded is worse than no control.
  const key = [state.selectedBase, ...[...state.selectedMixers].sort()].join('+');
  const cocktail = cocktailDatabase[key];
  state.selectedIce = cocktail ? cocktail.ice : 'cube';

  updateUI();
}

// Base key to Japanese name lookup
const baseNameMap = {
  gin: 'ジン', vodka: 'ウォッカ', rum: 'ラム', tequila: 'テキーラ',
  whiskey: 'ウイスキー', brandy: 'ブランデー', peach: 'ピーチ',
  cassis: 'カシス', coffee: 'コーヒー',
  champagne: 'シャンパン', white_wine: '白ワイン', pisco: 'ピスコ',
  cachaca: 'カシャッサ', apple_brandy: 'カルヴァドス', cacao: 'カカオ',
  ginger: 'ジンジャーエール', orange: 'オレンジ', soda: 'ソーダ',
  tomato: 'トマト', pineapple: 'パイナップル', grapefruit: 'グレープフルーツ',
  cranberry: 'クランベリー'
};

// Base key to icon lookup
const baseIconMap = {
  gin: 'GI', vodka: 'VO', rum: 'RU', tequila: 'TE',
  whiskey: 'WH', brandy: 'BR', peach: 'PE',
  cassis: 'CA', coffee: 'CO',
  champagne: 'CH', white_wine: 'WW', pisco: 'PS',
  cachaca: 'CQ', apple_brandy: 'CV', cacao: 'CC',
  ginger: 'GA', orange: 'OJ', soda: 'SW', tomato: 'TJ',
  pineapple: 'PJ', grapefruit: 'GF', cranberry: 'CB'
};

/**
 * Return only a garnish that is visibly served on the glass.
 * Citrus juice, a squeezed wedge, or a peel must not become a full wheel by inference.
 */
function getEffectiveGarnish(cocktail) {
  if (!cocktail) return null;
  const garnish = cocktail.garnish;
  if (!['lime', 'lemon', 'orange'].includes(garnish)) return garnish || null;

  const methodText = (cocktail.method || []).join(' ');
  const isPeelOnly = /(ピール|レモンの皮)/.test(methodText) && !/スライス/.test(methodText);
  if (isPeelOnly) return null;

  const isVisiblyServed = /(飾|添え|皮ごと|そのままグラスに入れ)/.test(methodText);
  return isVisiblyServed ? garnish : null;
}

/**
 * Draw a garnish slice (lime, lemon, or orange) onto a 2D canvas context.
 */
function drawGarnishOnCanvas(ctx, garnish, topL, topR, glassTop) {
  if (!garnish) return;

  const centerX = (topL + topR) / 2;

  // --- Non-citrus garnishes -----------------------------------------------
  if (garnish === 'cherry') {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 3;
    const cx = topR - 4;
    const cy = glassTop + 5;
    // Stem
    ctx.strokeStyle = '#6d4c41';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 6);
    ctx.quadraticCurveTo(cx + 5, cy - 15, cx + 2, cy - 19);
    ctx.stroke();
    // Fruit
    const cherryGrad = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, 6.5);
    cherryGrad.addColorStop(0, '#c0413f');
    cherryGrad.addColorStop(0.6, '#96201f');
    cherryGrad.addColorStop(1, '#5d0f10');
    ctx.fillStyle = cherryGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,.34)';
    ctx.beginPath();
    ctx.ellipse(cx - 2, cy - 2.4, 1.7, 1.1, -0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (garnish === 'olive') {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 3;
    const ox = centerX + 6;
    const oy = glassTop + 9;
    // Cocktail pick
    ctx.strokeStyle = 'rgba(235, 224, 200, .9)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(ox - 14, oy - 15);
    ctx.lineTo(ox + 5, oy + 3);
    ctx.stroke();
    ctx.fillStyle = 'rgba(235, 224, 200, .9)';
    ctx.beginPath();
    ctx.arc(ox - 14, oy - 15, 1.8, 0, Math.PI * 2);
    ctx.fill();
    // Olive body
    const oliveGrad = ctx.createRadialGradient(ox - 2, oy - 2, 1, ox, oy, 8);
    oliveGrad.addColorStop(0, '#9ccc65');
    oliveGrad.addColorStop(0.65, '#689f38');
    oliveGrad.addColorStop(1, '#33691e');
    ctx.fillStyle = oliveGrad;
    ctx.beginPath();
    ctx.ellipse(ox, oy, 7, 5.6, 0.35, 0, Math.PI * 2);
    ctx.fill();
    // Pimento
    ctx.fillStyle = '#d84315';
    ctx.beginPath();
    ctx.arc(ox + 3.2, oy + 1.4, 2.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (garnish === 'mint') {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 3;
    const mx = topR - 10;
    const my = glassTop + 2;
    const leaf = (lx, ly, rot, len) => {
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rot);
      const leafGrad = ctx.createLinearGradient(0, 0, 0, -len);
      leafGrad.addColorStop(0, '#2e7d32');
      leafGrad.addColorStop(1, '#66bb6a');
      ctx.fillStyle = leafGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-len * 0.42, -len * 0.5, 0, -len);
      ctx.quadraticCurveTo(len * 0.42, -len * 0.5, 0, 0);
      ctx.fill();
      ctx.strokeStyle = 'rgba(200, 230, 201, .5)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -len * 0.12);
      ctx.lineTo(0, -len * 0.88);
      ctx.stroke();
      ctx.restore();
    };
    leaf(mx, my, -0.55, 15);
    leaf(mx + 2, my, 0.5, 14);
    leaf(mx + 1, my - 1, -0.05, 17);
    leaf(mx - 5, my + 1, -0.95, 11);
    leaf(mx + 7, my + 1, 0.9, 11);
    ctx.restore();
    return;
  }

  if (garnish === 'coffee_bean') {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 2;
    const positions = [[centerX - 7, glassTop + 9, 0.5], [centerX + 6, glassTop + 8, -0.4], [centerX, glassTop + 13, 0.1]];
    positions.forEach(([bx, by, rot]) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(rot);
      const beanGrad = ctx.createRadialGradient(-1, -1, 0.5, 0, 0, 5);
      beanGrad.addColorStop(0, '#8d6e63');
      beanGrad.addColorStop(1, '#3e2723');
      ctx.fillStyle = beanGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 4.6, 3.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(62, 39, 35, .9)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(-3.4, 0);
      ctx.quadraticCurveTo(0, 1.4, 3.4, 0);
      ctx.stroke();
      ctx.restore();
    });
    ctx.restore();
    return;
  }

  if (garnish === 'nutmeg') {
    ctx.save();
    ctx.fillStyle = 'rgba(109, 76, 65, .8)';
    for (let i = 0; i < 26; i++) {
      const nx = centerX + (Math.sin(i * 12.9898) * 43758.5453 % 1) * (topR - topL) * 0.32;
      const ny = glassTop + 7 + (Math.sin(i * 78.233) * 12543.123 % 1) * 5;
      ctx.beginPath();
      ctx.arc(nx, ny, Math.abs(Math.sin(i * 3.7)) * 0.7 + 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (garnish !== 'lime' && garnish !== 'lemon' && garnish !== 'orange') return;

  ctx.save();
  
  let gx, gy;
  const gr = 13; // Radius of garnish wheel
  
  if (garnish === 'lemon') {
    gx = topL;
    gy = glassTop;
  } else if (garnish === 'lime') {
    gx = topR;
    gy = glassTop;
  } else { // orange
    gx = topR + 2;
    gy = glassTop + 8;
  }

  // Set drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;

  // Colours are deliberately knocked back from true fruit tones: at thumbnail
  // size a fully saturated wheel reads as a sticker pasted onto the photo.
  let outerColor, innerColor, segmentColor, lineColor;
  if (garnish === 'lime') {
    outerColor = '#2a5730';
    innerColor = '#93b088';
    segmentColor = '#7ba072';
    lineColor = '#ccd8c4';
  } else if (garnish === 'lemon') {
    outerColor = '#b07d24';
    innerColor = '#dcc17c';
    segmentColor = '#e3d596';
    lineColor = '#e9e3cd';
  } else { // orange
    outerColor = '#a34620';
    innerColor = '#dcac73';
    segmentColor = '#d29a52';
    lineColor = '#ecdcc3';
  }

  // 1. Draw outer peel
  ctx.beginPath();
  ctx.arc(gx, gy, gr, 0, Math.PI * 2);
  ctx.fillStyle = outerColor;
  ctx.fill();

  // 2. Draw inner peel white ring
  ctx.beginPath();
  ctx.arc(gx, gy, gr - 1.5, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();

  // 3. Draw inner pulp circle
  ctx.beginPath();
  ctx.arc(gx, gy, gr - 2.5, 0, Math.PI * 2);
  ctx.fillStyle = innerColor;
  ctx.fill();

  // 4. Draw pulp segments
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    ctx.fillStyle = segmentColor;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.arc(gx, gy, gr - 3.5, angle + 0.08, angle + Math.PI / 4 - 0.08);
    ctx.closePath();
    ctx.fill();
  }

  // 5. Draw segment dividers
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + Math.cos(angle) * (gr - 2.5), gy + Math.sin(angle) * (gr - 2.5));
    ctx.stroke();
  }

  // 6. Draw central core
  ctx.beginPath();
  ctx.arc(gx, gy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();

  ctx.restore();
}

/**
 * Render the gallery grid with cocktail cards. Accepts optional search query.
 */
function getGalleryGlassType(cocktail) {
  if (cocktail.ice === 'none') return 'stemmed';
  if (cocktail.ice === 'crushed') return 'julep';
  if (cocktail.abv >= 20 || !cocktail.hasBubbles) return 'rocks';
  return 'highball';
}

function getGalleryLiquidStyle(ctx, cocktail, top, bottom) {
  if (cocktail.color.includes('linear-gradient')) {
    const gradient = ctx.createLinearGradient(0, bottom, 0, top);
    if (cocktail.name === 'テキーラ・サンライズ') {
      gradient.addColorStop(0, 'rgba(170, 28, 18, .96)');
      gradient.addColorStop(.38, 'rgba(226, 76, 22, .94)');
      gradient.addColorStop(1, 'rgba(245, 169, 48, .88)');
    } else if (cocktail.name === 'カシス・オレンジ') {
      gradient.addColorStop(0, 'rgba(91, 8, 49, .96)');
      gradient.addColorStop(.42, 'rgba(137, 22, 79, .9)');
      gradient.addColorStop(1, 'rgba(242, 145, 34, .88)');
    } else {
      gradient.addColorStop(0, 'rgba(66, 38, 28, .96)');
      gradient.addColorStop(.52, 'rgba(160, 98, 63, .9)');
      gradient.addColorStop(1, 'rgba(244, 234, 214, .86)');
    }
    return gradient;
  }
  return cocktail.color;
}

function drawGalleryPhoto(canvas, cocktail, animState = null) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const type = getGalleryGlassType(cocktail);
  const phase = animState?.phase || 0;
  const isMainPreview = Boolean(animState?.mainPreview);
  ctx.clearRect(0, 0, w, h);

  // Contact shadow on the generated walnut counter.
  const shadowY = h * (isMainPreview ? .91 : .84);
  const shadow = ctx.createRadialGradient(w / 2, shadowY, 2, w / 2, shadowY, w * .38);
  shadow.addColorStop(0, 'rgba(0,0,0,.72)');
  shadow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(w / 2, shadowY, w * .36, h * .055, 0, 0, Math.PI * 2);
  ctx.fill();

  let top = h * .17;
  let bottom = h * .81;
  let leftTop = w * .29;
  let rightTop = w * .71;
  let leftBottom = w * .34;
  let rightBottom = w * .66;

  if (isMainPreview) {
    top = h * .08;
    bottom = h * .89;
    leftTop = w * .15;
    rightTop = w * .85;
    leftBottom = w * .24;
    rightBottom = w * .76;
  }

  if (type === 'rocks') {
    top = h * (isMainPreview ? .22 : .35);
    bottom = h * (isMainPreview ? .88 : .81);
    leftTop = w * (isMainPreview ? .1 : .23);
    rightTop = w * (isMainPreview ? .9 : .77);
    leftBottom = w * (isMainPreview ? .18 : .28);
    rightBottom = w * (isMainPreview ? .82 : .72);
  } else if (type === 'julep') {
    top = h * (isMainPreview ? .12 : .24);
    bottom = h * (isMainPreview ? .89 : .81);
    leftTop = w * (isMainPreview ? .14 : .25);
    rightTop = w * (isMainPreview ? .86 : .75);
    leftBottom = w * (isMainPreview ? .23 : .32);
    rightBottom = w * (isMainPreview ? .77 : .68);
  } else if (type === 'stemmed') {
    top = h * (isMainPreview ? .08 : .2);
    bottom = h * (isMainPreview ? .55 : .58);
    leftTop = w * (isMainPreview ? .06 : .18);
    rightTop = w * (isMainPreview ? .94 : .82);
    leftBottom = w * .47;
    rightBottom = w * .53;
  }

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(leftTop, top);
  ctx.lineTo(rightTop, top);
  ctx.lineTo(rightBottom, bottom);
  ctx.lineTo(leftBottom, bottom);
  ctx.closePath();
  ctx.clip();

  const restTop = type === 'stemmed' ? top + h * .07 : top + (bottom - top) * .18;

  // Pour timeline. Cards render at rest (fill = 1); only the big preview pours.
  const pour = animState?.pour;
  const pouring = typeof pour === 'number';
  const fillRaw = pouring ? Math.min(pour, 1) : 1;
  const fill = 1 - Math.pow(1 - fillRaw, 3);
  const settle = pouring ? Math.max(0, Math.min((pour - 1) / (POUR_END - 1), 1)) : 1;
  const liquidTop = bottom - (bottom - restTop) * fill;

  const liquidStyle = getGalleryLiquidStyle(ctx, cocktail, liquidTop, bottom);
  ctx.fillStyle = liquidStyle;
  ctx.fillRect(leftTop, liquidTop, rightTop - leftTop, bottom - liquidTop);

  // Falling stream, plus the disturbance it makes where it lands.
  if (fill < 1) {
    const streamX = w / 2 + Math.sin(phase * 2.6) * 1.1;
    const streamW = w * .022;
    ctx.save();
    ctx.globalAlpha = .85;
    ctx.fillStyle = liquidStyle;
    ctx.fillRect(streamX - streamW / 2, top, streamW, liquidTop - top);
    ctx.fillStyle = 'rgba(255,255,255,.22)';
    ctx.fillRect(streamX - streamW / 2, top, streamW * .35, liquidTop - top);
    ctx.strokeStyle = 'rgba(255,255,255,.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(streamX, liquidTop, streamW * 1.6 + Math.abs(Math.sin(phase * 5)) * 4, 2.2, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Rings spreading out once the glass is full.
  if (fill >= 1 && settle < 1) {
    ctx.save();
    for (let i = 0; i < 2; i++) {
      const p = Math.min(settle + i * .28, 1);
      if (p <= 0 || p >= 1) continue;
      ctx.globalAlpha = (1 - p) * .5;
      ctx.strokeStyle = 'rgba(255,255,255,.75)';
      ctx.lineWidth = 1.1 - p * .6;
      ctx.beginPath();
      ctx.ellipse(w / 2, liquidTop, (rightTop - leftTop) * .5 * p, 3.4 * p, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Meniscus: the bright lip of liquid where it meets the glass.
  ctx.save();
  ctx.globalAlpha = .5 + settle * .35;
  ctx.strokeStyle = 'rgba(255,255,255,.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(w / 2, liquidTop, (rightTop - leftTop) * .49, 2.6, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  const glow = ctx.createLinearGradient(leftTop, 0, rightTop, 0);
  glow.addColorStop(0, 'rgba(255,255,255,.04)');
  glow.addColorStop(.18, 'rgba(255,255,255,.2)');
  glow.addColorStop(.3, 'rgba(255,255,255,.035)');
  glow.addColorStop(.76, 'rgba(255,255,255,.02)');
  glow.addColorStop(.94, 'rgba(255,255,255,.16)');
  glow.addColorStop(1, 'rgba(255,255,255,.03)');
  ctx.fillStyle = glow;
  ctx.fillRect(leftTop, top, rightTop - leftTop, bottom - top);

  // Ice and carbonation only read once there is enough liquid to hold them.
  const contentsAlpha = Math.max(0, (fill - .45) / .55);

  if (cocktail.ice !== 'none' && contentsAlpha > 0) {
    ctx.globalAlpha = contentsAlpha;
    const cubes = cocktail.ice === 'crushed' ? 15 : 3;
    for (let i = 0; i < cubes; i++) {
      const baseSize = cocktail.ice === 'crushed' ? 5 + (i % 3) * 2 : 20 + i * 2;
      const size = baseSize * (isMainPreview ? 1.22 : 1);
      const xRange = (rightBottom - leftBottom) * .72;
      const x = w / 2 - xRange / 2 + ((i * 31) % Math.max(xRange, 1));
      const y = liquidTop + 11 + ((i * 23) % Math.max(bottom - liquidTop - size - 8, 1));
      ctx.save();
      ctx.translate(x, y + Math.sin(phase + i) * .7);
      ctx.rotate((i % 2 ? -.14 : .1) + Math.sin(phase * .25 + i) * .02);
      ctx.fillStyle = 'rgba(230,240,238,.13)';
      ctx.strokeStyle = 'rgba(245,248,244,.4)';
      ctx.lineWidth = .8;
      ctx.beginPath();
      ctx.roundRect(-size / 2, -size / 2, size, size, cocktail.ice === 'crushed' ? 1 : 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  if (cocktail.hasBubbles && contentsAlpha > 0) {
    ctx.globalAlpha = contentsAlpha;
    ctx.fillStyle = 'rgba(255,255,255,.45)';
    for (let i = 0; i < 13; i++) {
      const x = w * (.36 + ((i * 17) % 31) / 100);
      const travel = Math.max(bottom - liquidTop - 10, 1);
      const y = bottom - 7 - ((i * 19 + phase * 8) % travel);
      ctx.beginPath();
      ctx.arc(x, y, .65 + (i % 3) * .35, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // Glass edges, rim and physically plausible specular reflections.
  ctx.strokeStyle = 'rgba(235,240,236,.5)';
  ctx.lineWidth = 1.15;
  ctx.beginPath();
  ctx.moveTo(leftTop, top);
  ctx.lineTo(leftBottom, bottom);
  ctx.lineTo(rightBottom, bottom);
  ctx.lineTo(rightTop, top);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,.68)';
  ctx.lineWidth = .8;
  ctx.beginPath();
  ctx.ellipse(w / 2, top, (rightTop - leftTop) / 2, 2.1, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Snow-style salt rim (Margarita, Salty Dog ...)
  if (cocktail.saltRim) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    const rimRx = (rightTop - leftTop) / 2;
    for (let a = 0; a < Math.PI * 2; a += 0.055) {
      const jitter = ((Math.sin(a * 91.7) * 43758.5453) % 1) * 2.4;
      const sx = w / 2 + Math.cos(a) * rimRx;
      const sy = top + Math.sin(a) * 2.1 + jitter - 1.2;
      const sr = Math.abs(Math.sin(a * 57.3)) * 0.75 + 0.35;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  ctx.strokeStyle = 'rgba(255,255,255,.22)';
  ctx.beginPath();
  ctx.moveTo(leftTop + 5, top + 9);
  ctx.lineTo(leftBottom + 5, bottom - 9);
  ctx.stroke();

  if (type === 'stemmed') {
    ctx.strokeStyle = 'rgba(245,245,238,.52)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, bottom);
    ctx.lineTo(w / 2, h * .81);
    ctx.moveTo(w * .34, h * .82);
    ctx.quadraticCurveTo(w / 2, h * .79, w * .66, h * .82);
    ctx.stroke();
  } else {
    ctx.fillStyle = 'rgba(255,255,255,.08)';
    ctx.fillRect(leftBottom + 2, bottom - 3, rightBottom - leftBottom - 4, 3);
  }

  // The garnish is placed last, after the pour has settled.
  const garnish = getEffectiveGarnish(cocktail);
  if (garnish) {
    const drop = pouring ? settle : 1;
    if (drop > 0) {
      ctx.save();
      ctx.globalAlpha = drop;
      ctx.translate(0, (1 - drop) * -14);
      drawGarnishOnCanvas(ctx, garnish, leftTop, rightTop, top);
      ctx.restore();
    }
  }
}

// Gallery thumbnails use the same renderer for still and hover states.
function drawMiniThumbnail(canvas, cocktail, baseKey, animState) {
  drawGalleryPhoto(canvas, cocktail, animState);
}

/**
 * Compact ingredient list shown under My Bar / starter-set cards.
 * Row height is fixed; the grid's --recipe-rows variable pads every card
 * to the same number of rows so all cards share an identical height.
 */
function buildRecipeBlock(data) {
  const recipeDiv = document.createElement('div');
  recipeDiv.className = 'gallery-card-recipe';
  const ul = document.createElement('ul');
  data.ingredients.forEach(ing => {
    const li = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.className = 'recipe-ing-name';
    nameSpan.textContent = ing.name;
    const amountSpan = document.createElement('span');
    amountSpan.className = 'recipe-ing-amount';
    amountSpan.textContent = ing.amount.replace(/ /g, '');
    li.appendChild(nameSpan);
    li.appendChild(amountSpan);
    ul.appendChild(li);
  });
  recipeDiv.appendChild(ul);
  return recipeDiv;
}

function drawMiniThumbnailAnimated(canvas, cocktail, baseKey, animState) {
  drawGalleryPhoto(canvas, cocktail, animState);
}

/**
 * The single badge a card carries in its top-left corner. A drink is never
 * both IBA-official and alcohol-free, so one slot is enough — and one slot
 * means the corner can never stack two labels on top of each other.
 */
function appendCardBadge(card, data) {
  // Two labels, one shown at a time by CSS: at three columns a phone card is
  // barely a hundred pixels wide, and "ALCOHOL FREE" spanned well over half
  // of it — a badge that big stops being a note and becomes the card.
  const badge = document.createElement('span');
  if (isIBACocktail(data)) {
    badge.className = 'iba-badge';
    badge.title = 'IBA Official Cocktail';
    badge.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
      + '<span class="badge-long">IBA OFFICIAL</span><span class="badge-short">IBA</span>';
  } else if (isMocktail(data)) {
    badge.className = 'mocktail-badge';
    badge.title = 'ノンアルコールカクテル';
    badge.innerHTML = '<span class="badge-long">ALCOHOL FREE</span><span class="badge-short">ノンアル</span>';
  } else {
    return;
  }
  card.appendChild(badge);
}

/** "約12%" for a cocktail; a mocktail says what it is instead of "約0%". */
const abvTagLabel = (data) => (data.abv === 0 ? 'ノンアル' : `約${data.abv}%`);

/** Give a card its own ambient colour so hover glows match the drink. */
function tintCard(card, data) {
  const [r, g, b] = toAmbientRGB(parseRGBA(data.color));
  card.style.setProperty('--drink-rgb', `${r}, ${g}, ${b}`);
}

function cancelCardAnimations(container = document) {
  container.querySelectorAll('.gallery-card').forEach(card => {
    if (card._hoverDelay) {
      clearTimeout(card._hoverDelay);
      card._hoverDelay = null;
    }
    if (card._animId) {
      cancelAnimationFrame(card._animId);
      card._animId = null;
    }
  });
}

/* --------------------------------------------------------------------------
   Thumbnail scheduling
   A grid can hold every cocktail in the archive, and each thumbnail is a full
   canvas paint. Drawing them all the moment a tab opens (or on every search
   keystroke) blocks the main thread for hundreds of milliseconds, so a card
   paints only once it is near the viewport, and hover motion is capped well
   below the display refresh rate.
   ------------------------------------------------------------------------ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER_FRAME_MS = 1000 / 30;
const HOVER_SETTLE_MS = 90;
const IDLE_THUMB_CHUNK = 6;

const whenIdle = window.requestIdleCallback
  ? (fn) => window.requestIdleCallback(fn, { timeout: 1200 })
  : (fn) => setTimeout(fn, 60);

// Canvases waiting for their first paint, keyed for both the observer and the
// idle backfill so neither one can paint the same card twice.
const pendingThumbs = new Set();
let idleThumbScheduled = false;

function paintThumb(canvas) {
  if (!pendingThumbs.delete(canvas)) return;
  if (thumbObserver) thumbObserver.unobserve(canvas);
  // A rebuilt grid leaves its old canvases queued; drop them undrawn.
  if (canvas.isConnected) canvas._drawStill();
}

/**
 * Anything the observer has not reached yet is filled in during idle time, in
 * small chunks. Scrolling still gets priority; this only guarantees that a
 * thumbnail eventually appears even if intersections never fire.
 */
function scheduleIdleThumbs() {
  if (idleThumbScheduled || pendingThumbs.size === 0) return;
  idleThumbScheduled = true;
  whenIdle(() => {
    idleThumbScheduled = false;
    let budget = IDLE_THUMB_CHUNK;
    for (const canvas of [...pendingThumbs]) {
      // Detached canvases cost nothing to clear, so they don't spend budget.
      if (!canvas.isConnected) { paintThumb(canvas); continue; }
      if (budget-- <= 0) break;
      paintThumb(canvas);
    }
    scheduleIdleThumbs();
  });
}

const thumbObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) paintThumb(entry.target);
      });
    }, { rootMargin: '320px 0px' })
  : null;

/**
 * Wire a card's canvas up to lazy first paint plus its hover animation.
 * Replaces the per-card duplication the three grids used to carry.
 */
function attachThumb(card, canvas, data, baseKey) {
  canvas._drawStill = () => drawMiniThumbnail(canvas, data, baseKey);

  if (thumbObserver) {
    pendingThumbs.add(canvas);
    thumbObserver.observe(canvas);
    scheduleIdleThumbs();
  } else {
    canvas._drawStill();
  }

  if (prefersReducedMotion) return;

  const animState = { phase: 0, bubbles: [], crushedIce: [] };

  // Sweeping the cursor across the grid used to start and tear down a redraw
  // loop for every card it passed over, stealing frames from the glow the user
  // is actually looking at. The drink only starts moving once the pointer
  // settles; lighting up stays immediate, and is pure CSS.
  card.addEventListener('mouseenter', () => {
    if (card._animId || card._hoverDelay) return;
    card._hoverDelay = setTimeout(() => {
      card._hoverDelay = null;
      let last = 0;
      const tick = (now) => {
        if (now - last >= HOVER_FRAME_MS) {
          last = now;
          animState.phase += 0.12;
          drawMiniThumbnailAnimated(canvas, data, baseKey, animState);
        }
        card._animId = requestAnimationFrame(tick);
      };
      card._animId = requestAnimationFrame(tick);
    }, HOVER_SETTLE_MS);
  });

  card.addEventListener('mouseleave', () => {
    if (card._hoverDelay) {
      clearTimeout(card._hoverDelay);
      card._hoverDelay = null;
    }
    if (card._animId) {
      cancelAnimationFrame(card._animId);
      card._animId = null;
      canvas._drawStill();
    }
  });
}

/**
 * Stagger card entrances, but only when the grid was rebuilt by a deliberate
 * action. Re-animating on every search keystroke would strobe.
 */
function applyStagger(grid, animate) {
  grid.classList.remove('is-staggered');
  if (!animate) return;
  void grid.offsetWidth; // restart the animation
  grid.classList.add('is-staggered');
}

/**
 * One entry per drink, in display order, marked with whether the given shelf
 * can pour it. Every count and every grid in the app is derived from this one
 * function — the switch used to keep its own tally over the whole database
 * and cheerfully told a guest "103" above a menu of 71.
 */
function buildDrinkList(shelf = state.menuShelf) {
  const seen = new Map();
  const list = [];

  Object.entries(cocktailDatabase).forEach(([key, data]) => {
    const baseKey = key.split('+')[0];
    const baseJp = baseNameMap[baseKey] || baseKey;
    const pourable = !shelf || key.split('+').every(part => shelf.has(part));

    // Margarita exists with and without a salt rim, moscow mule with and
    // without lime. On a menu the variant that matters is the one the host
    // can actually pour, so a pourable variant displaces a kept one that is
    // not — otherwise whichever happened to be declared first would decide,
    // and a guest would be offered a drink that cannot be made.
    if (seen.has(data.name)) {
      const kept = list[seen.get(data.name)];
      if (pourable && !kept.pourable) Object.assign(kept, { key, baseKey, baseJp, pourable });
      return;
    }
    seen.set(data.name, list.length);
    list.push({ key, data, baseKey, baseJp, pourable });
  });

  return list.sort((a, b) => a.data.name.localeCompare(b.data.name, 'ja'));
}

/**
 * Everything one drink can be searched by, lowercased and joined once.
 *
 * Names and the base were all it matched, which answers "where is the
 * Negroni" and nothing else. The question actually asked across a bar is
 * "what can you make with chartreuse" — so the ingredient list, the mixer
 * ids, the taste words and the glass are all in here too. Cached on the
 * recipe, because a fast typist re-filters the whole book on every keystroke.
 */
function searchHaystack(item) {
  if (item.data._haystack) return item.data._haystack;
  const parts = item.key.split('+');
  // Glassware is deliberately absent. It looked like a free extra field to
  // index, but "カクテルグラス" made a search for カクテル return 41 drinks
  // and "グラス" returned 73 — noise drowning the names someone was typing.
  const words = [
    item.data.name, item.data.enName, item.baseJp, item.baseKey,
    ...item.data.taste,
    ...item.data.ingredients.map(i => i.name),
    ...parts,
    ...parts.map(p => mixerDefinitions[p]?.name || baseNameMap[p] || ''),
    ...parts.map(p => mixerDefinitions[p]?.en || ''),
  ];
  return (item.data._haystack = words.join(' ').toLowerCase());
}

function renderGallery(query, animate = false) {
  cancelCardAnimations(DOM.galleryGrid);
  DOM.galleryGrid.innerHTML = '';
  DOM.galleryGrid.classList.remove('is-coursed');
  // Only a coursed menu earns the jump bar; renderCourseNav brings it back.
  DOM.courseNav.classList.add('hidden');
  const q = (query || '').trim().toLowerCase();

  const shelf = state.menuShelf;
  const list = buildDrinkList(shelf);

  // Filter by the active chip, then by search query (name, english name, base).
  // A chip is either one of the data-driven predicates or a base spirit key.
  const predicate = galleryPredicates[state.galleryFilter];
  const filtered = list.filter(item => {
    if (!item.pourable) return false;
    if (!matchesDrinkType(item.data)) return false;
    if (predicate) {
      if (!predicate(item.data)) return false;
    } else if (item.baseKey !== state.galleryFilter) {
      return false;
    }
    if (!q) return true;
    return searchHaystack(item).includes(q);
  });
  
  if (filtered.length === 0) {
    const what = state.drinkType === 'mocktail' ? 'モクテル'
               : state.drinkType === 'cocktail' ? 'カクテル'
               : 'ドリンク';
    DOM.galleryGrid.innerHTML = shelf
      ? `<div class="gallery-empty">今夜お出しできる${what}はありませんでした。</div>`
      : `<div class="gallery-empty">該当する${what}が見つかりませんでした。</div>`;
    return;
  }
  
  // A menu reads as courses, the way a printed one does, so the guest is told
  // when to drink each thing instead of having to filter for it. The archive
  // stays a flat grid: it is a place to look things up, not to be served.
  if (state.currentMode === 'menu') {
    renderMenuCourses(filtered, animate);
    return;
  }

  applyStagger(DOM.galleryGrid, animate);

  // Build off-document so the grid only reflows once, not once per card.
  const fragment = document.createDocumentFragment();
  filtered.forEach((item, index) => fragment.appendChild(createGalleryCard(item, index)));
  DOM.galleryGrid.appendChild(fragment);
}

const COURSES = [
  { id: 'aperitif', label: 'はじめの一杯', en: 'TO BEGIN', note: '食前に。乾いた口をひらく、軽くて切れのあるもの。' },
  { id: 'anytime',  label: '食事とともに', en: 'THROUGH THE NIGHT', note: '通して飲めるもの。迷ったらこのあたりから。' },
  { id: 'digestif', label: '〆の一杯',     en: 'TO CLOSE', note: '食後に。甘いもの、濃いもの、ゆっくり飲むもの。' },
];

/* --------------------------------------------------------------------------
   Course jump bar
   A 49-drink menu runs eight screens on a phone, which put 〆の一杯 six
   screens down — far enough that most guests would never learn it existed.
   The bar pins under the masthead and puts every course one tap away.
   -------------------------------------------------------------------------- */

/**
 * Where the page must sit for a course heading to clear the pinned chrome.
 *
 * The clearance is the section's own CSS scroll-margin-top, so the masthead
 * height, the bar height and the breathing room are declared once, in the
 * stylesheet, beside the rules that create them. Adding them up in JS meant
 * a hard-coded 66px that drifted from what the CSS actually did, and left
 * the first course clearing the bar by eleven pixels.
 */
function courseScrollTarget(section) {
  const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  const top = section.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, Math.round(top - margin));
}

function syncCourseNav() {
  if (DOM.courseNav.classList.contains('hidden')) return;
  const buttons = [...DOM.courseNav.querySelectorAll('.course-nav-btn')];
  if (!buttons.length) return;

  // The active course is the last one whose heading has reached the bar.
  let active = 0;
  buttons.forEach((btn, i) => {
    const section = document.getElementById(btn.dataset.course);
    if (section && courseScrollTarget(section) <= window.scrollY + 2) active = i;
  });
  buttons.forEach((btn, i) => btn.classList.toggle('active', i === active));
}

function renderCourseNav(sections) {
  DOM.courseNav.innerHTML = '';
  // One course is not a set of courses, and needs no way to move between them.
  if (sections.length < 2) {
    DOM.courseNav.classList.add('hidden');
    return;
  }

  sections.forEach(({ id, label, count }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'course-nav-btn';
    btn.dataset.course = id;
    btn.innerHTML = `${label}<small>${count}</small>`;
    btn.addEventListener('click', () => {
      const section = document.getElementById(id);
      if (section) window.scrollTo({ top: courseScrollTarget(section) });
    });
    DOM.courseNav.appendChild(btn);
  });

  DOM.courseNav.classList.remove('hidden');
  syncCourseNav();
}

function renderMenuCourses(filtered, animate) {
  DOM.galleryGrid.classList.add('is-coursed');
  const fragment = document.createDocumentFragment();
  const built = [];

  COURSES.forEach(course => {
    const items = filtered.filter(item => serveOf(item.data) === course.id);
    if (items.length === 0) return;   // an empty course is not a course

    const section = document.createElement('section');
    section.className = 'menu-course';
    section.id = `course-${course.id}`;
    built.push({ id: section.id, label: course.label, count: items.length });

    const heading = document.createElement('div');
    heading.className = 'menu-course-heading';
    heading.innerHTML =
      `<span>${course.en}</span><h2>${course.label}<small>${items.length}杯</small></h2>` +
      `<p>${course.note}</p>`;
    section.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    items.forEach((item, index) => grid.appendChild(createGalleryCard(item, index)));
    applyStagger(grid, animate);
    section.appendChild(grid);

    fragment.appendChild(section);
  });

  DOM.galleryGrid.appendChild(fragment);
  renderCourseNav(built);   // after insertion: the bar measures real sections
}

/** One archive/menu card. Shared so the two layouts cannot drift apart. */
function createGalleryCard({ key, data, baseKey, baseJp }, index) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'gallery-card';
  card.dataset.key = key;
  card.style.setProperty('--i', index);
  tintCard(card, data);

  appendCardBadge(card, data);

  const thumbDiv = document.createElement('div');
  thumbDiv.className = 'gallery-card-thumb';
  const thumbCanvas = document.createElement('canvas');
  thumbCanvas.width = 180;
  thumbCanvas.height = 230;
  // A painting of the drink, next to the drink's name. Announcing it would
  // only make a screen reader say the same thing twice.
  thumbCanvas.setAttribute('aria-hidden', 'true');
  thumbDiv.appendChild(thumbCanvas);

  const infoDiv = document.createElement('div');
  infoDiv.className = 'gallery-card-info';

  const nameEl = document.createElement('div');
  nameEl.className = 'gallery-card-name';
  nameEl.textContent = data.name;

  const enEl = document.createElement('div');
  enEl.className = 'gallery-card-en';
  enEl.textContent = data.enName;

  // The base name is wrapped rather than left as bare text so that the
  // three-column phone layout can drop it and keep the two-letter icon.
  const tagEl = document.createElement('div');
  tagEl.className = 'gallery-card-tag';
  const icon = baseIconMap[baseKey] || '🍹';
  tagEl.innerHTML = `<span class="gallery-card-tag-icon" aria-hidden="true">${icon}</span>`
    + `<span class="gallery-card-base">${baseJp}ベース</span>`
    + `<span class="gallery-card-abv">${abvTagLabel(data)}</span>`;

  infoDiv.appendChild(nameEl);
  infoDiv.appendChild(enEl);
  infoDiv.appendChild(tagEl);

  card.appendChild(thumbDiv);
  card.appendChild(infoDiv);
  card.addEventListener('click', () => openRecipe(key));

  attachThumb(card, thumbCanvas, data, baseKey);
  return card;
}

/** Tick the ABV up from zero so the number lands with the bar. */
function countUpABV(el, target, animate) {
  if (el._numAnim) cancelAnimationFrame(el._numAnim);
  // Counting up to zero is a strange little animation, and "約 0%" reads like
  // a rounding error rather than a promise. Say it plainly instead.
  el.classList.toggle('is-alcohol-free', target === 0);
  if (target === 0) {
    el.textContent = 'ALCOHOL FREE';
    return;
  }
  if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = `約 ${target}%`;
    return;
  }

  const started = performance.now();
  const duration = 850;
  const tick = (now) => {
    // rAF hands back the frame's start time, which can precede the call that
    // scheduled it; clamped, or the first tick renders a negative percentage.
    const p = Math.min(Math.max((now - started) / duration, 0), 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `約 ${Math.round(target * eased)}%`;
    if (p < 1) el._numAnim = requestAnimationFrame(tick);
  };
  el._numAnim = requestAnimationFrame(tick);
}

/**
 * Collection membership is resolved by drink name, not by recipe key.
 * Several cocktails exist under more than one key — margarita with and without
 * a salt rim, moscow mule with and without lime — while the gallery shows one
 * card per name. A flag set on the variant that loses the de-duplication would
 * otherwise vanish from its collection without a trace.
 */
/**
 * When in the evening a drink belongs.
 *
 * This is the oldest classification in bartending and it is not derivable
 * from the recipe: an aperitif is dry, bitter or sparkling because it is
 * meant to sharpen an appetite, and a digestif is sweet, rich or
 * spirit-forward because it is meant to close the night. Both can be 26%,
 * both can be shaken, and no field in the data tells them apart. So they are
 * named, from the conventional placings — the Martini and the Negroni before
 * dinner, the Alexander and the Black Russian after, XYZ because the name is
 * the whole joke, Between the Sheets because it is a nightcap by definition.
 *
 * Anything not named here is served at any point, which is most of the list:
 * highballs, sours and the tropical drinks belong wherever they are wanted.
 */
const SERVE_ORDER = {
  aperitif: [
    'ジントニック', 'ジン・リッキー', 'オレンジ・ブロッサム', 'ギムレット',
    'アラウンド・ザ・ワールド', 'ジン・ソニック', 'ウォッカトニック',
    'ウォッカ・リッキー', 'ブルドッグ', 'ソルティ・ドッグ', 'ブラッディ・メアリー',
    'ウォッカ・ソニック', 'ソル・クバーノ', 'ダイキリ', 'エル・プレジデンテ',
    'テコニック', 'テキーラ・ソーダ', 'マルガリータ', 'テキーラ・ソニック',
    'ドライ・マティーニ', 'ネグローニ', 'アビエイション', 'ブールヴァルディエ',
    'バカルディ', 'ホワイト・レディ', 'ブルー・マルガリータ',
    'サラトガ・クーラー', 'シンデレラ', 'フロリダ', 'ヴァージン・メアリー',
    'フレンチ75', 'コープス・リヴァイヴァー No.2', 'クローバー・クラブ',
    'サウスサイド', 'キール・ロワイヤル', 'ミモザ', 'ベリーニ',
    'アペロール・スプリッツ', 'キール', 'スプリッツァー', 'ピスコ・サワー',
    'ジャック・ローズ', 'グレープフルーツ・スカッシュ',
  ],
  digestif: [
    'アースクェイク', 'ジン・ミルク・パンチ', 'ブラック・ルシアン',
    'ホワイト・ルシアン', 'XYZ', 'サイドカー', 'ピーチ・ミルク', 'カシス・ミルク',
    'カルーア・ミルク', 'カルーア・ソーダ', 'カルーア・コーク', 'コーヒー・トニック',
    'アレキサンダー', 'マンハッタン', 'オールド・ファッションド',
    'ビトウィーン・ザ・シーツ', 'エスプレッソ・マティーニ',
    'プッシーフット', 'ヴァージン・ピニャコラーダ',
    'ゴッドマザー', 'サゼラック', 'ヴュー・カレ', 'ラスティ・ネイル',
    'ゴッドファーザー', 'スティンガー', 'シャンゼリゼ',
    'グラスホッパー', 'エンジェルス・キッス',
  ],
};

/**
 * Season is a judgement too, and a looser one — a drink may suit more than
 * one. Summer was already carried on the recipes themselves; the other three
 * are named here. Spring runs floral and pale, autumn turns to whisky and
 * brandy, winter to cream, coffee and the drinks you sip slowly.
 */
const SEASONS = {
  spring: [
    'オレンジ・ブロッサム', 'アビエイション', 'ファジーネーブル', 'ピーチ・フィズ',
    'ピーチ・ミルク', 'バカルディ', 'ホワイト・レディ', 'カシス・オレンジ',
    'カシス・ソーダ', 'シャーリー・テンプル', 'ジン・フィズ', 'シンデレラ',
    'フレンチ75', 'クローバー・クラブ', 'ピンク・レディ', 'ビーズ・ニーズ',
    'キール・ロワイヤル', 'ミモザ', 'ベリーニ', 'キール',
  ],
  autumn: [
    'ウイスキー・サワー', 'オールド・ファッションド', 'マンハッタン',
    'ブールヴァルディエ', 'サイドカー', 'ホーセズ・ネック', 'フレンチ・ハイボール',
    'フレンチ・コーク', 'ウイスキー・バック', 'ジャック・コーク', 'ネグローニ',
    'ボストン・クーラー', 'レゲエ・パンチ', 'カシス・ウーロン', 'エル・ディアブロ',
    'サゼラック', 'ヴュー・カレ', 'ペニシリン', 'シャンゼリゼ',
    'ジャック・ローズ', 'ハネムーン',
  ],
  winter: [
    'アレキサンダー', 'ブラック・ルシアン', 'ホワイト・ルシアン', 'カルーア・ミルク',
    'カルーア・コーク', 'エスプレッソ・マティーニ', 'ジン・ミルク・パンチ',
    'ビトウィーン・ザ・シーツ', 'XYZ', 'アースクェイク', 'ドライ・マティーニ',
    'オールド・ファッションド', 'カシス・ミルク', 'プッシーフット',
    'ヴァージン・メアリー', 'コーヒー・トニック',
    'サゼラック', 'ヴュー・カレ', 'ラスティ・ネイル', 'ゴッドファーザー',
    'ゴッドマザー', 'スティンガー', 'グラスホッパー', 'エンジェルス・キッス',
    'ペニシリン',
  ],
};

const collectionsByName = (() => {
  const summer = new Set();
  const iba = new Set();
  const mocktail = new Set();
  Object.entries(cocktailDatabase).forEach(([key, c]) => {
    if (c.summer) summer.add(c.name);
    if (c.isIBA) iba.add(c.name);
    if (isMocktailKey(key)) mocktail.add(c.name);
  });
  return {
    summer, iba, mocktail,
    aperitif: new Set(SERVE_ORDER.aperitif),
    digestif: new Set(SERVE_ORDER.digestif),
    spring: new Set(SEASONS.spring),
    autumn: new Set(SEASONS.autumn),
    winter: new Set(SEASONS.winter),
  };
})();

/** A drink named in a list that no longer exists would silently disappear. */
(function auditCuratedLists() {
  const names = new Set(Object.values(cocktailDatabase).map(c => c.name));
  const stray = [...Object.entries(SERVE_ORDER), ...Object.entries(SEASONS)]
    .flatMap(([label, list]) => list.filter(n => !names.has(n)).map(n => `${label}:${n}`));
  if (stray.length) console.warn(`[curation] unknown drink names — ${stray.join(', ')}`);
})();

/** 'aperitif' | 'anytime' | 'digestif' */
function serveOf(data) {
  if (collectionsByName.aperitif.has(data.name)) return 'aperitif';
  if (collectionsByName.digestif.has(data.name)) return 'digestif';
  return 'anytime';
}

/**
 * Glassware.
 *
 * Most of it follows from how the drink is iced — no ice means a stemmed
 * glass, crushed means something you can pack, cubes mean a tumbler — and
 * that derivation is right for the great majority. It is wrong in exactly
 * the places tradition overrules physics: sparkling drinks want a flute
 * whatever their ice, a Moscow Mule wants copper, a Sazerac is served in a
 * chilled rocks glass with no ice in it at all. Those are named.
 */
const GLASS_NAMES = {
  cocktail: 'カクテルグラス',
  rocks: 'ロックグラス',
  highball: 'タンブラー',
  collins: 'コリンズグラス',
  flute: 'フルートグラス',
  wine: 'ワイングラス',
  mug: '銅マグ',
  hurricane: 'ハリケーングラス',
  julep: 'ジュレップカップ',
  liqueur: 'リキュールグラス',
};

const GLASS_BY_NAME = {
  'フレンチ75': 'flute', 'キール・ロワイヤル': 'flute', 'ミモザ': 'flute',
  'ベリーニ': 'flute', 'デス・イン・ジ・アフタヌーン': 'flute',
  'キール': 'wine', 'スプリッツァー': 'wine', 'オペレーター': 'wine',
  'アペロール・スプリッツ': 'wine',
  // The copper mug belongs to the Mule and its alcohol-free twin. A Dark 'n'
  // Stormy is a highball and always was.
  'モスコミュール': 'mug', 'ヴァージン・モスコミュール': 'mug',
  'ピニャ・コラーダ': 'hurricane', 'チチ': 'hurricane', 'ブルー・ハワイ': 'hurricane',
  'ヴァージン・ピニャコラーダ': 'hurricane', 'プランターズ・パンチ': 'hurricane',
  'ピーチ・フィズ': 'collins', 'ボストン・クーラー': 'collins',
  'レモネード': 'collins', 'シンガポール・スリング': 'collins',
  'エンジェルス・キッス': 'liqueur',
  'サゼラック': 'rocks', 'オールド・ファッションド': 'rocks', 'ネグローニ': 'rocks',
  'ブールヴァルディエ': 'rocks', 'ミント・ジュレップ': 'julep',
  // Crushed ice does not mean a julep cup, and a drink under 20% is not
  // always a highball. These are built in, and served from, a rocks glass —
  // as each of their own methods already said.
  'カイピリーニャ': 'rocks', 'ブランブル': 'rocks', 'マイタイ': 'rocks',
  'ホワイト・ルシアン': 'rocks', 'ピーチ・ミルク': 'rocks',
};

function glassOf(data) {
  const named = GLASS_BY_NAME[data.name];
  if (named) return named;
  if (data.ice === 'none') return 'cocktail';
  if (data.ice === 'crushed') return 'julep';
  if (data.abv >= 20) return 'rocks';
  return 'highball';
}

const glassLabel = (data) => GLASS_NAMES[glassOf(data)] || GLASS_NAMES.highball;

/** Northern-hemisphere meteorological seasons, which is what Tokyo uses. */
function currentSeason(month = new Date().getMonth() + 1) {
  if (month <= 2 || month === 12) return 'winter';
  if (month <= 5) return 'spring';
  if (month <= 8) return 'summer';
  return 'autumn';
}

const isIBACocktail = (data) => collectionsByName.iba.has(data.name);
const isMocktail = (data) => collectionsByName.mocktail.has(data.name);

/** Does this drink belong under the currently selected half of the index? */
function matchesDrinkType(data, drinkType = state.drinkType) {
  if (drinkType === 'all') return true;
  return isMocktail(data) === (drinkType === 'mocktail');
}

/**
 * How many drinks sit on each side of the switch — of the ones actually on
 * offer. On a menu that means the host's shelf, not the whole archive.
 */
function countsByDrinkType() {
  const counts = { all: 0, cocktail: 0, mocktail: 0 };
  buildDrinkList().forEach(item => {
    if (!item.pourable) return;
    counts.all++;
    counts[isMocktail(item.data) ? 'mocktail' : 'cocktail']++;
  });
  return counts;
}

// ==========================================================================
// 2c. ROUTING
// The view lives in location.hash so a drink can be linked to directly, and
// so the browser's back button steps back through the app instead of leaving
// it — which on a phone is the difference between "back to the list" and
// "goodbye". Slugs come from the English name, which is what a person would
// expect to see in a shared URL.
// ==========================================================================
const routeKeyBySlug = new Map();
const routeSlugByName = new Map();

Object.entries(cocktailDatabase).forEach(([key, data]) => {
  if (routeSlugByName.has(data.name)) return;   // one route per drink, like the gallery
  const base = data.enName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  let slug = base || 'cocktail';
  for (let n = 2; routeKeyBySlug.has(slug); n++) slug = `${base}-${n}`;
  routeKeyBySlug.set(slug, key);
  routeSlugByName.set(data.name, slug);
});

// While a route is being applied the view is following the URL, so it must not
// turn around and write the URL back.
let applyingRoute = false;

// A bare URL and '#/' are the same view; compare them in one form so the
// first tap back to the build tab does not push a redundant entry.
const normalizedHash = () => location.hash || '#/';

function openRecipeSlug() {
  if (!state.showResult) return null;
  const key = [state.selectedBase, ...[...state.selectedMixers].sort()].join('+');
  const data = cocktailDatabase[key];
  return data ? routeSlugByName.get(data.name) || null : null;
}

function currentRoute() {
  // A guest reading a menu stays inside it, recipes included, so the back
  // button returns to the menu rather than dropping them into the builder.
  if (state.menuCode) {
    const slug = openRecipeSlug();
    return slug
      ? `#/menu/${state.menuCode}/recipe/${slug}`
      : `#/menu/${state.menuCode}`;
  }
  const slug = openRecipeSlug();
  if (slug) return `#/recipe/${slug}`;
  if (state.currentMode === 'dictionary') return '#/archive';
  if (state.currentMode === 'mybar') return '#/mybar';
  return '#/';
}

/** Push a history entry whenever the view genuinely changes identity. */
function syncRoute() {
  if (applyingRoute) return;
  const desired = currentRoute();
  if (normalizedHash() === desired) return;
  // Intermediate build states all collapse to '#/', so fiddling with mixers
  // does not litter the history.
  history.pushState(null, '', desired);
}

function applyRoute() {
  // The view already matches the URL. Browsers disagree about which events a
  // fragment navigation fires — WebKit leans on hashchange, Chromium raises
  // popstate as well — so both are listened for and the redundant one lands
  // here and stops.
  if (normalizedHash() === currentRoute()) return;

  applyingRoute = true;
  try {
    const hash = normalizedHash();

    // Only '#/…' is ours. A plain fragment — the skip link, a find-on-page
    // anchor, anything a browser might put there — is an in-page jump and
    // must not be read as navigation. Treating one as an unknown route sent
    // it to the bottom of the chain and called setMode('build'), which threw
    // a guest out of the menu they had been given and cleared the code, with
    // no way back but the original link.
    if (!hash.startsWith('#/')) return;

    const menu = hash.match(/^#\/menu\/([A-Za-z0-9\-_]+)(?:\/recipe\/(.+))?$/);
    if (menu) {
      const shelf = decodeShelf(menu[1]);
      if (shelf) {
        enterMenuMode(menu[1], shelf);
        if (menu[2]) {
          const key = routeKeyBySlug.get(decodeURIComponent(menu[2]));
          if (key) openRecipe(key);
        }
        return;
      }
    }
    // Any other address leaves the menu behind — including a bad menu code,
    // which lands in the ordinary index rather than on a blank page.
    if (state.menuCode) exitMenuMode();

    const recipe = hash.match(/^#\/recipe\/(.+)$/);
    if (recipe) {
      const key = routeKeyBySlug.get(decodeURIComponent(recipe[1]));
      if (key) {
        // Land in the archive so "一覧へ戻る" has a list to return to.
        setMode('dictionary');
        openRecipe(key);
        return;
      }
    }
    if (hash === '#/archive') setMode('dictionary');
    else if (hash === '#/mybar') setMode('mybar');
    else setMode('build');
  } finally {
    applyingRoute = false;
  }
}

/** Select a recipe by key and show it. The one way into the result panel. */
function openRecipe(key) {
  const cocktail = cocktailDatabase[key];
  if (!cocktail) return false;

  // A shared link points at one drink, and it has to open. If the switch is
  // parked on the other half of the index, widen rather than refuse: the
  // visitor asked for this drink by name.
  if (!matchesDrinkType(cocktail)) {
    state.drinkType = 'all';
    saveDrinkType();
    applyDrinkTypeChrome();
    initGalleryFilters();
  }

  const parts = key.split('+');
  state.selectedBase = parts[0];
  state.selectedMixers = parts.slice(1);
  state.selectedIce = cocktail.ice;
  state.showResult = true;
  updateUI();
  return true;
}

/**
 * Filters that read the data the cards already carry, rather than needing a
 * field of their own. `summer` is the exception: what belongs in a seasonal
 * collection is a judgement call, so it is tagged by hand in the database.
 */
const galleryPredicates = {
  all: () => true,
  iba: (data) => isIBACocktail(data),
  light: (data) => data.abv <= 10,
  strong: (data) => data.abv >= 25,
  refreshing: (data) => data.taste.some(t => /さっぱり|爽快|すっきり|清涼感/.test(t)),

  aperitif: (data) => serveOf(data) === 'aperitif',
  anytime: (data) => serveOf(data) === 'anytime',
  digestif: (data) => serveOf(data) === 'digestif',

  spring: (data) => collectionsByName.spring.has(data.name),
  summer: (data) => collectionsByName.summer.has(data.name),
  autumn: (data) => collectionsByName.autumn.has(data.name),
  winter: (data) => collectionsByName.winter.has(data.name),
};

/**
 * Which base chips belong under the current half of the index, in the order
 * the base pickers use — spirits first, soft bases after.
 */
function basesForDrinkType(drinkType = state.drinkType) {
  if (drinkType === 'cocktail') return SPIRIT_BASES;
  if (drinkType === 'mocktail') return [...NON_ALCOHOLIC_BASES];
  return [...SPIRIT_BASES, ...NON_ALCOHOLIC_BASES];
}

// Build the filter chips shown above the archive gallery
const SEASON_LABELS = { spring: '春', summer: '夏', autumn: '秋', winter: '冬' };

/**
 * The chips, in labelled rows.
 *
 * They used to be one flat wrap, which was fine at fifteen and would be a
 * wall at twenty-six. Grouping them under headings costs a line of text per
 * row and makes the whole set scannable: you look at "季節" when you want a
 * season, and never read the other twenty chips at all.
 */
function galleryFilterGroups() {
  const groups = [{ label: null, chips: [{ id: 'all', label: 'すべて' }] }];

  // Serve order is the menu's own structure, so guests get it as headings
  // rather than as chips; the archive is a lookup tool and takes the chips.
  if (state.currentMode !== 'menu') {
    groups.push({
      label: 'いつ飲む',
      chips: [
        { id: 'aperitif', label: 'はじめに' },
        { id: 'anytime', label: '食事とともに' },
        { id: 'digestif', label: '〆に' },
      ],
    });
  }

  const now = currentSeason();
  groups.push({
    label: '季節',
    chips: Object.keys(SEASON_LABELS).map(s => ({
      id: s,
      label: s === now ? `${SEASON_LABELS[s]}（今）` : SEASON_LABELS[s],
    })),
  });

  // Strength and IBA say nothing about a shelf of drinks that are all 0%.
  const taste = [{ id: 'refreshing', label: 'さっぱり' }];
  if (state.drinkType !== 'mocktail') {
    taste.push(
      { id: 'light', label: '低アルコール' },
      { id: 'strong', label: '強め' },
      { id: 'iba', label: '★ IBA公認' },
    );
  }
  groups.push({ label: '好み', chips: taste });

  // On a menu, a chip that filters down to nothing is worse than no chip:
  // it reads as "we're out of gin" when it only means the host never had any.
  let bases = basesForDrinkType();
  if (state.menuShelf) {
    const stocked = new Set();
    buildDrinkList().forEach(item => {
      if (item.pourable && matchesDrinkType(item.data)) stocked.add(item.baseKey);
    });
    bases = bases.filter(b => stocked.has(b));
  }
  if (bases.length) {
    groups.push({ label: 'ベース', chips: bases.map(b => ({ id: b, label: baseNameMap[b] })) });
  }

  return groups;
}

function initGalleryFilters() {
  if (!DOM.galleryFilters) return;
  const groups = galleryFilterGroups();

  // The chip that was active may have just been filtered out from under us.
  const available = groups.flatMap(g => g.chips.map(c => c.id));
  if (!available.includes(state.galleryFilter)) state.galleryFilter = 'all';

  const select = (id) => {
    state.galleryFilter = id;
    DOM.galleryFilters.querySelectorAll('.gallery-filter-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.filter === id);
    });
    renderGallery(state.currentMode === 'menu' ? '' : DOM.gallerySearch.value, true);
    if (state.currentMode === 'menu') renderMenuMasthead();
  };

  DOM.galleryFilters.innerHTML = '';
  groups.forEach(group => {
    const row = document.createElement('div');
    row.className = 'gallery-filter-group';
    if (group.label) {
      const label = document.createElement('span');
      label.className = 'gallery-filter-label';
      label.textContent = group.label;
      row.appendChild(label);
    }
    group.chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-filter-chip' + (state.galleryFilter === chip.id ? ' active' : '');
      btn.dataset.filter = chip.id;
      btn.textContent = chip.label;
      btn.addEventListener('click', () => select(chip.id));
      row.appendChild(btn);
    });
    DOM.galleryFilters.appendChild(row);
  });
}

// ==========================================================================
// 6b. COCKTAIL / MOCKTAIL SWITCH
// The one control that sits above the three tabs, because it cuts across all
// of them: it decides what this index is about tonight. Every list in the app
// reads state.drinkType, so the switch itself only has to re-render whichever
// view happens to be open.
// ==========================================================================

/** Is this base on offer under the current half of the index? */
const baseAllowedForDrinkType = (base) =>
  state.drinkType === 'all' ||
  NON_ALCOHOLIC_BASES.has(base) === (state.drinkType === 'mocktail');

/**
 * Everything the switch changes about the frame of the app, as opposed to the
 * lists inside it: which segment is lit, which base picker is offered, and
 * the house accent colour (driven off the attribute, in CSS).
 */
function applyDrinkTypeChrome() {
  document.documentElement.dataset.drinkType = state.drinkType;

  if (DOM.drinkTypeSwitch) {
    DOM.drinkTypeSwitch.dataset.active = state.drinkType;
    DOM.drinkTypeSwitch.querySelectorAll('.drink-type-btn').forEach(btn => {
      const on = btn.dataset.drinkType === state.drinkType;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  DOM.baseGroupSpirits.classList.toggle('hidden', state.drinkType === 'mocktail');
  DOM.baseGroupSoft.classList.toggle('hidden', state.drinkType === 'cocktail');
  // Nothing on the spirit shelf can contribute to a mocktail, so the whole
  // section goes away rather than sitting there greyed out. The ticks survive.
  DOM.myBarBaseCategory.classList.toggle('hidden', state.drinkType === 'mocktail');
}

function setDrinkType(type) {
  if (state.drinkType === type) return;
  state.drinkType = type;
  saveDrinkType();
  applyDrinkTypeChrome();

  // Re-render whichever view is open. The archive rebuilds its chips too,
  // since half of them only apply to one side.
  if (state.currentMode === 'menu') {
    initGalleryFilters();
    renderGallery('', true);
    renderMenuMasthead();
  } else if (state.currentMode === 'dictionary') {
    initGalleryFilters();
    renderGallery(DOM.gallerySearch.value, true);
  } else if (state.currentMode === 'mybar') {
    updateMyBarResults();
    if (starterSetBuilt) calculateStarterSet();
  }

  // A build in progress on a base that has just left the room cannot stay.
  if (state.selectedBase && !baseAllowedForDrinkType(state.selectedBase)) {
    resetGlass();
  } else {
    updateUI();
  }
}

/** Re-tally the switch. Called whenever what is on offer changes. */
function refreshDrinkTypeCounts() {
  if (!DOM.drinkTypeSwitch) return;
  const counts = countsByDrinkType();
  DOM.drinkTypeSwitch.querySelectorAll('.dt-count').forEach(el => {
    el.textContent = counts[el.dataset.count];
  });
}

function initDrinkTypeSwitch() {
  if (!DOM.drinkTypeSwitch) return;

  refreshDrinkTypeCounts();
  DOM.drinkTypeSwitch.querySelectorAll('.drink-type-btn').forEach(btn => {
    btn.addEventListener('click', () => setDrinkType(btn.dataset.drinkType));
  });

  state.drinkType = readStoredDrinkType();
  applyDrinkTypeChrome();
}

// Sync State with UI and layout views
function updateUI() {
  const { selectedBase, selectedMixers, selectedIce } = state;
  DOM.simulatorLayout.dataset.mode = state.currentMode;
  if (DOM.stageNumber) {
    const labels = { build: '01 / BUILD', dictionary: '02 / ARCHIVE', mybar: '03 / MY BAR', menu: 'TONIGHT' };
    DOM.stageNumber.textContent = labels[state.currentMode] || '01 / BUILD';
  }
  DOM.viewRecipeBtn.classList.add('hidden');
  
  // Sync Base Buttons active
  DOM.baseBtns.forEach(btn => {
    if (btn.dataset.base === selectedBase) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    btn.setAttribute('aria-pressed', String(btn.dataset.base === selectedBase));
  });
  
  // Render mixers
  renderMixerButtons();
  
  // Check matching cocktail
  const key = [selectedBase, ...[...selectedMixers].sort()].join('+');
  const cocktail = cocktailDatabase[key];
  DOM.glass.classList.toggle('archive-glass', Boolean(cocktail));
  const hasRecipeExtension = !!cocktail && Object.keys(cocktailDatabase).some(candidateKey => {
    const parts = candidateKey.split('+');
    if (parts[0] !== selectedBase) return false;
    const candidateMixers = parts.slice(1);
    return candidateMixers.length > selectedMixers.length
      && selectedMixers.every(mixer => candidateMixers.includes(mixer));
  });
  
  if (!selectedBase && selectedMixers.length === 0) {
    // 6.1 NOTHING SELECTED
    state.targetLevel = 0;
    state.targetColor = [255, 255, 255, 0];
    state.saltRim = false;
    renderGarnish(null);
    resetAmbientTint();

    DOM.statusIndicator.textContent = state.drinkType === 'mocktail'
      ? "ベースとなる割り材を選択してください"
      : "ベースとなるお酒を選択してください";
    DOM.statusIndicator.classList.remove('ready');
    
    // UI Panels: Show controls, Hide results
    DOM.controlsCard.classList.remove('hidden');
    DOM.resultPanel.classList.add('hidden');
    DOM.simulatorLayout.classList.remove('completed');
    
  } else if (selectedBase && selectedMixers.length === 0) {
    // 6.2 BASE SPIRIT ONLY
    state.targetLevel = 0.35;
    const baseColorStr = baseTints[selectedBase];
    state.targetColor = parseRGBA(baseColorStr);
    state.saltRim = false;
    renderGarnish(null);
    applyAmbientTint(state.targetColor);


    // Read from the lookup, not the button: soft bases share their id with a
    // mixer button, so getElementById would be picking between duplicates.
    const baseJp = baseNameMap[selectedBase] || selectedBase;
    DOM.statusIndicator.textContent = `${baseJp}を選択中。＋の付いた割り材を選んでください。`;
    DOM.statusIndicator.classList.remove('ready');
    
    DOM.controlsCard.classList.remove('hidden');
    DOM.resultPanel.classList.add('hidden');
    DOM.simulatorLayout.classList.remove('completed');
    
  } else if (selectedBase && selectedMixers.length > 0 && cocktail) {
    // 6.3 COCKTAIL COMPLETED
    state.targetLevel = 0.88;
    state.targetColor = calculateCurrentBlendColor();
    state.saltRim = !!cocktail.saltRim;
    renderGarnish(getEffectiveGarnish(cocktail));
    applyAmbientTint(parseRGBA(cocktail.color));
    
    DOM.statusIndicator.textContent = hasRecipeExtension && !state.showResult
      ? `${cocktail.name}が作れます。レシピを見るか、素材を追加してください。`
      : `完成：${cocktail.name}`;
    DOM.statusIndicator.classList.add('ready');
    
    // Populate Completed Recipe UI
    const ibaBadgeResult = document.getElementById('iba-badge-result');
    if (ibaBadgeResult) {
      if (isIBACocktail(cocktail)) ibaBadgeResult.classList.remove('hidden');
      else ibaBadgeResult.classList.add('hidden');
    }
    const alcoholFree = isMocktail(cocktail);
    DOM.mocktailBadgeResult.classList.toggle('hidden', !alcoholFree);
    DOM.resultTag.textContent = alcoholFree ? 'YOUR MOCKTAIL' : 'YOUR COCKTAIL';

    DOM.cocktailName.textContent = cocktail.name;
    DOM.cocktailEnName.textContent = cocktail.enName;
    countUpABV(DOM.abvValue, cocktail.abv, key !== state.lastResultKey);
    state.lastResultKey = key;
    DOM.abvFill.style.width = `${Math.min((cocktail.abv / 40) * 100, 100)}%`;
    
    let iceText = '氷なし';
    if (selectedIce === 'cube') iceText = 'キューブアイス';
    else if (selectedIce === 'crushed') iceText = 'クラッシュアイス';
    // What it is served in comes before what is in it: a bartender reaches
    // for the glass first.
    DOM.iceStyleDisplay.textContent = `${glassLabel(cocktail)} ・ ${iceText}`;
    
    DOM.tasteBadges.innerHTML = '';
    // When to drink it comes first, because it is the thing the taste words
    // are evidence for — dry and bitter because it opens a meal, sweet and
    // heavy because it closes one.
    const course = COURSES.find(c => c.id === serveOf(cocktail));
    if (course) {
      const span = document.createElement('span');
      span.className = 'badge badge-course';
      span.textContent = course.label;
      DOM.tasteBadges.appendChild(span);
    }
    cocktail.taste.forEach(t => {
      const span = document.createElement('span');
      span.className = 'badge';
      span.textContent = t;
      DOM.tasteBadges.appendChild(span);
    });
    
    DOM.cocktailDesc.textContent = cocktail.description;
    
    DOM.ingredientsUl.innerHTML = '';
    cocktail.ingredients.forEach(ing => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="ing-name">${ing.name}</span><span class="ing-amount">${ing.amount}</span>`;
      DOM.ingredientsUl.appendChild(li);
    });
    
    DOM.methodOl.innerHTML = '';
    cocktail.method.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      DOM.methodOl.appendChild(li);
    });
    
    if (hasRecipeExtension && !state.showResult) {
      // A valid recipe may still lead to a multi-ingredient recipe.
      DOM.viewRecipeBtn.classList.remove('hidden');
      DOM.controlsCard.classList.remove('hidden');
      DOM.resultPanel.classList.add('hidden');
      DOM.simulatorLayout.classList.remove('completed');
      return;
    }

    // UI Panels transition: Hide controls, Show result in the right column
    DOM.simulatorLayout.dataset.mode = 'result';
    if (DOM.stageNumber) DOM.stageNumber.textContent = '04 / RECIPE';
    DOM.controlsCard.classList.add('hidden');
    DOM.resultPanel.classList.remove('hidden');
    
    // Reset scroll position of the details panel to the top
    DOM.resultPanel.scrollTop = 0;
    
    // Toggle completed layout and smooth scroll to visualizer
    const wasCompleted = DOM.simulatorLayout.classList.contains('completed');
    DOM.simulatorLayout.classList.add('completed');
    
    if (!wasCompleted) {
      setTimeout(() => {
        DOM.visualizerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    
  } else {
    // 6.4 INTERMEDIATE BUILD
    state.targetLevel = 0.35 + (selectedMixers.length * 0.15);
    state.targetColor = calculateCurrentBlendColor();
    state.saltRim = false;
    renderGarnish(null);
    applyAmbientTint(state.targetColor);


    DOM.statusIndicator.textContent = "カスタムビルド中... 別の材料を加えるか、氷を調整してください。";
    DOM.statusIndicator.classList.remove('ready');
    
    DOM.controlsCard.classList.remove('hidden');
    DOM.resultPanel.classList.add('hidden');
    DOM.simulatorLayout.classList.remove('completed');
  }

  // Decided here, and only here. The archive is the one layout that hides the
  // visualizer, and every path through the app ends up in updateUI — including
  // clicking a gallery card, which reaches a finished recipe without going
  // through setMode. Parking the loop in setMode alone left the preview frozen
  // and the glass blank on exactly that route.
  if (['dictionary', 'menu'].includes(DOM.simulatorLayout.dataset.mode)) {
    stopPreviewLoop();
  } else {
    startPreviewLoop();
  }

  syncRoute();
}

// ==========================================================================
// 7. EVENT HANDLERS & INITIALIZATION
// ==========================================================================

function setMode(mode) {
  // Reaching for a tab is leaving the menu, whatever the URL still says.
  if (state.menuCode) exitMenuMode();
  state.currentMode = mode;

  // Hidden cards must not leave hover animation loops running.
  cancelCardAnimations();

  DOM.tabBuild.classList.remove('active');
  DOM.tabDictionary.classList.remove('active');
  DOM.tabMyBar.classList.remove('active');
  DOM.tabBuild.setAttribute('aria-selected', String(mode === 'build'));
  DOM.tabDictionary.setAttribute('aria-selected', String(mode === 'dictionary'));
  DOM.tabMyBar.setAttribute('aria-selected', String(mode === 'mybar'));
  DOM.viewBuild.classList.add('hidden');
  DOM.viewDictionary.classList.add('hidden');
  DOM.viewMyBar.classList.add('hidden');
  
  if (mode === 'build') {
    DOM.tabBuild.classList.add('active');
    DOM.viewBuild.classList.remove('hidden');
  } else if (mode === 'dictionary') {
    DOM.tabDictionary.classList.add('active');
    DOM.viewDictionary.classList.remove('hidden');
    DOM.gallerySearch.value = '';
    // The chip set differs between the archive and a menu — serve order is
    // headings there and chips here — so it is rebuilt on arrival rather than
    // inherited from whichever view was open last.
    initGalleryFilters();
    renderGallery('', true);
  } else if (mode === 'mybar') {
    DOM.tabMyBar.classList.add('active');
    DOM.viewMyBar.classList.remove('hidden');
    updateMyBarResults();
  }

  resetGlass();
  positionTabIndicator();
  requestAnimationFrame(positionTabIndicator);
}

// The starter set builds a whole extra grid of cards, so it waits until the
// accordion is actually opened rather than costing every visitor a page load.
// Module scope, not a closure, because flipping the cocktail/mocktail switch
// has to know whether there is a built grid to recompute.
let starterSetBuilt = false;

// ==========================================================================
// 7b. GUEST MODE
// A menu is not a fourth tab. It is the same index with the builder taken
// away: no tabs, no shelf, no live glass to pour into — just what the host
// can actually make tonight, and the recipe behind each card. The one
// control that stays is the cocktail/mocktail switch, so a guest who is not
// drinking does not have to announce it to find their half of the list.
// ==========================================================================

function renderMenuMasthead() {
  const pourable = DOM.galleryGrid.querySelectorAll('.gallery-card').length;
  const noun = state.drinkType === 'mocktail' ? 'モクテル'
             : state.drinkType === 'cocktail' ? 'カクテル'
             : '杯';
  DOM.menuNote.textContent = pourable
    ? `今夜お出しできる ${pourable} ${noun}です。気になるものを選んでください。`
    : '今夜お出しできるものがありません。';
}

function enterMenuMode(code, shelf) {
  state.menuCode = code;
  state.menuShelf = shelf;
  state.currentMode = 'menu';
  state.showResult = false;
  state.selectedBase = null;
  state.selectedMixers = [];
  state.galleryFilter = 'all';

  document.documentElement.dataset.view = 'menu';
  cancelCardAnimations();
  refreshDrinkTypeCounts();   // the switch now counts the shelf, not the archive

  DOM.tabBuild.classList.remove('active');
  DOM.tabDictionary.classList.remove('active');
  DOM.tabMyBar.classList.remove('active');
  DOM.viewBuild.classList.add('hidden');
  DOM.viewMyBar.classList.add('hidden');
  DOM.viewDictionary.classList.remove('hidden');
  DOM.menuMasthead.classList.remove('hidden');

  DOM.gallerySearch.value = '';
  initGalleryFilters();
  renderGallery('', true);
  renderMenuMasthead();
  updateUI();
}

/** Build the link a guest opens. Absolute, so it survives being pasted. */
function menuLinkForShelf(shelf) {
  const url = new URL(location.href);
  url.hash = `#/menu/${encodeShelf(shelf)}`;
  return url.toString();
}

function setShareStatus(text) {
  DOM.shareMenuStatus.textContent = text;
  DOM.shareMenuStatus.classList.toggle('hidden', !text);
}

/**
 * Hand the shelf over. The share sheet is the good path on a phone — the
 * host picks the recipient themselves, and nothing leaves the device until
 * they do. Clipboard is the desktop path. If both are refused the link is
 * simply printed, because a link you can read is still a link you can send.
 */
async function shareMenu() {
  const shelf = state.myBarIngredients;
  if (shelf.size === 0) {
    setShareStatus('先に、手持ちの材料にチェックを入れてください。');
    return;
  }

  const link = menuLinkForShelf(shelf);
  const pourable = DOM.myBarGalleryGrid.querySelectorAll('.gallery-card').length;
  const title = `今夜のメニュー — ${pourable}杯`;

  if (navigator.share) {
    try {
      await navigator.share({ title, text: title, url: link });
      setShareStatus('メニューを送りました。');
      return;
    } catch (err) {
      // The host closed the sheet: that is an answer, not a failure.
      if (err && err.name === 'AbortError') return;
    }
  }

  try {
    await navigator.clipboard.writeText(link);
    setShareStatus(`リンクをコピーしました（${pourable}杯）— ${link}`);
  } catch {
    setShareStatus(`このリンクを送ってください（${pourable}杯）— ${link}`);
  }
}

/**
 * "お任せで" — the oldest order at any bar.
 *
 * It picks from the cards actually on screen rather than from the database,
 * which means it inherits the shelf, the cocktail/mocktail switch and
 * whatever filter is set without knowing that any of them exist. It also
 * refuses to serve the same drink twice running, because being told to have
 * another Negroni is not an answer.
 */
let lastOmakase = null;

function pourOmakase() {
  let cards = [...DOM.galleryGrid.querySelectorAll('.gallery-card')];
  if (!cards.length) return;
  if (cards.length > 1) cards = cards.filter(c => c.dataset.key !== lastOmakase);

  const pick = cards[Math.floor(Math.random() * cards.length)];
  lastOmakase = pick.dataset.key;
  openRecipe(pick.dataset.key);
}

function exitMenuMode() {
  state.menuCode = null;
  state.menuShelf = null;
  delete document.documentElement.dataset.view;
  DOM.menuMasthead.classList.add('hidden');
  DOM.galleryGrid.classList.remove('is-coursed');
  DOM.courseNav.classList.add('hidden');
  refreshDrinkTypeCounts();
}

function initMyBarUI() {
  DOM.starterSetToggle.addEventListener('click', () => {
    DOM.starterSetAccordion.classList.toggle('open');
    if (!starterSetBuilt && DOM.starterSetAccordion.classList.contains('open')) {
      starterSetBuilt = true;
      // Let the panel open first. Building the grid takes long enough to be
      // felt, and there is no reason for the animation to wait on it.
      whenIdle(() => calculateStarterSet());
    }
  });

  DOM.myBarBaseContainer.innerHTML = '';
  DOM.myBarMixerContainer.innerHTML = '';
  
  // Render Bases — spirits only. The soft bases are juices and mixers you
  // already tick below; a carton of orange juice should appear on the shelf
  // once, under the heading a person would look for it.
  SPIRIT_BASES.forEach(base => {
    const jpName = baseNameMap[base] || base;
    const icon = baseIconMap[base] || '🍹';
    const label = createMyBarCheckbox(base, jpName, icon);
    DOM.myBarBaseContainer.appendChild(label);
  });

  // Render Mixers (skip ingredients already listed as base spirits above,
  // e.g. whiskey/brandy/cassis/coffee, to avoid duplicated chips)
  Object.entries(mixerDefinitions).forEach(([mixerId, def]) => {
    if (SPIRIT_BASES.includes(mixerId)) return;
    const label = createMyBarCheckbox(mixerId, def.name, def.icon);
    DOM.myBarMixerContainer.appendChild(label);
  });

  // Bring last visit's shelf back, now that there are boxes to tick.
  const stored = readStoredShelf();
  if (stored.length) {
    state.myBarIngredients = new Set(stored);
    syncMyBarCheckboxes();
    updateMyBarResults();
  }
}

function createMyBarCheckbox(id, name, icon) {
  const label = document.createElement('label');
  label.className = 'mybar-chip';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = id;
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      state.myBarIngredients.add(id);
    } else {
      state.myBarIngredients.delete(id);
    }
    saveShelf();
    syncMyBarCheckboxes();
    updateMyBarResults();
  });
  
  const span = document.createElement('span');
  span.innerHTML = `${icon} ${name}`;
  
  label.appendChild(checkbox);
  label.appendChild(span);
  return label;
}

function syncMyBarCheckboxes() {
  document.querySelectorAll('.mybar-chip input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = state.myBarIngredients.has(checkbox.value);
  });
}

function updateMyBarResults() {
  // The shelf just moved, so any link already offered is out of date.
  setShareStatus('');
  cancelCardAnimations(DOM.myBarGalleryGrid);
  DOM.myBarGalleryGrid.innerHTML = '';
  const makeable = [];
  const missingCounts = {}; // For N-1 recommendations

  // Deduplicate by cocktail name
  const seen = new Set();
  const list = [];
  Object.entries(cocktailDatabase).forEach(([key, data]) => {
    if (seen.has(data.name)) return;
    seen.add(data.name);
    if (!matchesDrinkType(data)) return;
    const parts = key.split('+');
    list.push({ key, data, parts });
  });

  list.forEach(item => {
    const missing = item.parts.filter(part => !state.myBarIngredients.has(part));
    
    if (missing.length === 0) {
      makeable.push(item);
    } else if (missing.length === 1) {
      const missingIng = missing[0];
      if (!missingCounts[missingIng]) {
        missingCounts[missingIng] = { count: 0, unlocks: [] };
      }
      missingCounts[missingIng].count++;
      missingCounts[missingIng].unlocks.push(item.data.name);
    }
  });
  
  // Sort and render makeable cocktails
  makeable.sort((a, b) => a.data.name.localeCompare(b.data.name, 'ja'));
  const noun = state.drinkType === 'mocktail' ? 'モクテル' : 'カクテル';
  DOM.myBarResultCount.textContent = `現在作れる${noun}：${makeable.length}種類`;

  if (makeable.length === 0) {
    DOM.myBarGalleryGrid.innerHTML = `<div class="gallery-empty">手持ちの材料で作れる${noun}はまだありません。材料を追加してください。</div>`;
  } else {
    // Every card pads its recipe list to the longest one so heights stay uniform.
    const maxRecipeRows = makeable.reduce((max, item) => Math.max(max, item.data.ingredients.length), 2);
    DOM.myBarGalleryGrid.style.setProperty('--recipe-rows', maxRecipeRows);
    applyStagger(DOM.myBarGalleryGrid, true);

    const fragment = document.createDocumentFragment();

    makeable.forEach(({ key, data }, index) => {
      const baseKey = key.split('+')[0];
      const baseJp = baseNameMap[baseKey] || baseKey;

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'gallery-card';
      card.dataset.key = key;
      card.style.setProperty('--i', index);
      tintCard(card, data);

      appendCardBadge(card, data);
      
      const thumbDiv = document.createElement('div');
      thumbDiv.className = 'gallery-card-thumb';
      const thumbCanvas = document.createElement('canvas');
      thumbCanvas.width = 180;
      thumbCanvas.height = 230;
      thumbCanvas.setAttribute('aria-hidden', 'true');
      thumbDiv.appendChild(thumbCanvas);
      
      const infoDiv = document.createElement('div');
      infoDiv.className = 'gallery-card-info';
      
      const nameEl = document.createElement('div');
      nameEl.className = 'gallery-card-name';
      nameEl.textContent = data.name;
      
      const enEl = document.createElement('div');
      enEl.className = 'gallery-card-en';
      enEl.textContent = data.enName;
      
      const tagEl = document.createElement('div');
      tagEl.className = 'gallery-card-tag';
      const icon = baseIconMap[baseKey] || '🍹';
      tagEl.innerHTML = `<span class="gallery-card-tag-icon" aria-hidden="true">${icon}</span> ${baseJp}ベース<span class="gallery-card-abv">${abvTagLabel(data)}</span>`;
      
      infoDiv.appendChild(nameEl);
      infoDiv.appendChild(enEl);
      infoDiv.appendChild(tagEl);

      thumbDiv.appendChild(infoDiv);
      card.appendChild(thumbDiv);
      card.appendChild(buildRecipeBlock(data));

      card.addEventListener('click', () => {
        setMode('build');
        openRecipe(key);
      });

      fragment.appendChild(card);
      attachThumb(card, thumbCanvas, data, baseKey);
    });

    DOM.myBarGalleryGrid.appendChild(fragment);
  }
  
  // Render TIPS (N-1 recommendations)
  DOM.myBarTipsList.innerHTML = '';
  const missingArray = Object.entries(missingCounts).map(([ingId, data]) => {
    return { ingId, count: data.count, unlocks: data.unlocks };
  });
  
  missingArray.sort((a, b) => b.count - a.count);
  const topTips = missingArray.slice(0, 3);
  
  if (topTips.length === 0) {
    if (state.myBarIngredients.size === 0) {
      DOM.myBarTipsList.innerHTML = '<li>材料を選択すると、次に買うべきおすすめのお酒や割り材を提案します！</li>';
    } else {
      const firstBuy = state.drinkType === 'mocktail' ? 'ジュースや炭酸水' : 'ベーススピリッツ';
      DOM.myBarTipsList.innerHTML = `<li>これ以上作れる${noun}を増やすには、まだ足りない材料が多いようです。まずは${firstBuy}から集めてみましょう！</li>`;
    }
  } else {
    topTips.forEach(tip => {
      const li = document.createElement('li');
      let ingName = tip.ingId;
      if (baseNameMap[tip.ingId]) ingName = baseNameMap[tip.ingId];
      else if (mixerDefinitions[tip.ingId]) ingName = mixerDefinitions[tip.ingId].name;
      
      const unlockExamples = tip.unlocks.slice(0, 2).join('や');
      li.innerHTML = `<strong>${ingName}</strong> を追加すると、新たに「${unlockExamples}」など <strong>${tip.count}種類</strong> の${noun}が作れるようになります！`;
      DOM.myBarTipsList.appendChild(li);
    });
  }
}

function resetGlass() {
  state.selectedBase = null;
  state.selectedMixers = [];
  state.selectedIce = 'cube';
  state.showResult = false;
  updateUI();
}

function initEventListeners() {
  DOM.tabBuild.addEventListener('click', () => setMode('build'));
  DOM.tabDictionary.addEventListener('click', () => setMode('dictionary'));
  DOM.tabMyBar.addEventListener('click', () => setMode('mybar'));
  
  DOM.baseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const base = btn.dataset.base;
      if (state.selectedBase === base) {
        state.selectedBase = null;
        state.selectedMixers = [];
      } else {
        state.selectedBase = base;
        state.selectedMixers = [];
      }
      state.showResult = false;
      updateUI();
    });
  });
    
  DOM.shareMenuBtn.addEventListener('click', shareMenu);
  DOM.omakaseBtn.addEventListener('click', pourOmakase);

  // Move focus without writing to location.hash at all. applyRoute() now
  // ignores foreign fragments, so this is belt and braces — but leaving a
  // '#controls-card' in the address bar of a menu someone was given is
  // still a URL that no longer opens what they were looking at.
  const skipLink = document.getElementById('skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (event) => {
      const target = document.getElementById('controls-card');
      if (!target) return;
      event.preventDefault();
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'start' });
    });
  }

  // Time-throttled rather than rAF-throttled: highlighting which course you
  // are in is not animation, and this keeps working when frames do not.
  let lastCourseSync = 0;
  window.addEventListener('scroll', () => {
    const now = performance.now();
    if (now - lastCourseSync < 100) return;
    lastCourseSync = now;
    syncCourseNav();
  }, { passive: true });

  DOM.resetBtn.addEventListener('click', resetGlass);
  DOM.viewRecipeBtn.addEventListener('click', () => {
    state.showResult = true;
    updateUI();
  });
  
  // Bind Back to Build button on Completed card
  DOM.backToBuildBtn.addEventListener('click', resetGlass);
  
  // Gallery search input: filter on a short idle so a fast typist rebuilds
  // the grid once rather than once per keystroke.
  let searchTimer = null;
  DOM.gallerySearch.addEventListener('input', (e) => {
    const value = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderGallery(value), 140);
  });
}

/** Slide the shared tab underline to whichever tab is active. */
function positionTabIndicator() {
  const indicator = DOM.tabIndicator;
  const active = document.querySelector('.tab-btn.active');
  if (!indicator || !active || !active.offsetParent) return;

  const tabRect = active.getBoundingClientRect();
  const barRect = active.parentElement.getBoundingClientRect();
  const width = tabRect.width * 0.62;
  indicator.style.width = `${width}px`;
  indicator.style.transform =
    `translateX(${tabRect.left - barRect.left + (tabRect.width - width) / 2}px)`;
}

function initAtmosphere() {
  const panel = DOM.simulatorLayout;

  document.documentElement.classList.add('js-ready');

  // The opening title card is decorative; skip it entirely when motion is off.
  const curtain = document.getElementById('intro-curtain');
  if (curtain) {
    if (prefersReducedMotion) {
      curtain.remove();
    } else {
      setTimeout(() => curtain.remove(), 2100);
    }
  }

  // Header condenses once the masthead has scrolled past.
  const headerBar = DOM.headerBar;
  if (headerBar) {
    let scrollFrame = null;
    const syncHeader = () => {
      headerBar.classList.toggle('is-condensed', window.scrollY > 40);
      scrollFrame = null;
    };
    syncHeader();
    window.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(syncHeader);
    }, { passive: true });
  }

  positionTabIndicator();
  window.addEventListener('resize', positionTabIndicator, { passive: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionTabIndicator);
  }

  if (!prefersReducedMotion && panel) {
    let pointerFrame = null;
    let pointerEvent = null;

    panel.addEventListener('pointermove', (event) => {
      pointerEvent = event;
      if (pointerFrame) return;

      pointerFrame = requestAnimationFrame(() => {
        const rect = panel.getBoundingClientRect();
        const relX = (pointerEvent.clientX - rect.left) / rect.width;
        const relY = (pointerEvent.clientY - rect.top) / rect.height;
        panel.style.setProperty('--spot-x', `${(relX * 100).toFixed(1)}%`);
        panel.style.setProperty('--spot-y', `${(relY * 100).toFixed(1)}%`);

        // The glass leans very slightly toward the pointer, as if catching light.
        if (DOM.glassDisplayArea) {
          DOM.glassDisplayArea.style.setProperty('--tilt-x', (relX - 0.5).toFixed(3));
          DOM.glassDisplayArea.style.setProperty('--tilt-y', (relY - 0.5).toFixed(3));
        }
        pointerFrame = null;
      });
    }, { passive: true });

    panel.addEventListener('pointerleave', () => {
      if (!DOM.glassDisplayArea) return;
      DOM.glassDisplayArea.style.setProperty('--tilt-x', '0');
      DOM.glassDisplayArea.style.setProperty('--tilt-y', '0');
    }, { passive: true });
  }

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    // The hero runs on the load choreography instead, so it is not observed.
    const revealTargets = document.querySelectorAll('.simulator-layout, .site-footer');
    document.documentElement.classList.add('motion-ready');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    revealTargets.forEach((target) => {
      target.classList.add('reveal-section');
      observer.observe(target);
    });
  }
}

const STARTER_SET_SIZE = 5;

/**
 * The search below costs over a tenth of a second on the full book and grows
 * with it, but its answer depends only on the database and which half of the
 * index is showing — neither of which moves during a session. So it is paid
 * for once per half, and never again.
 */
const starterSetCache = new Map();

/**
 * Choose the five bottles that finish the most recipes outright.
 *
 * The obvious shortcut — the two most common bases plus the three most common
 * mixers — only looks right because the cocktail list is full of
 * two-ingredient highballs. Applied to the mocktails, where almost nothing
 * uses fewer than two mixers, it spends its slots on popular bottles that
 * never meet in the same glass and completes precisely nothing. Greedy
 * one-at-a-time does no better: for the first three picks every candidate
 * completes zero drinks, so it has nothing to steer by.
 *
 * So this searches for the real answer. Any set of bottles completes exactly
 * the recipes it contains, which means the best set is the union of some
 * group of recipes that between them use no more than five ingredients — and
 * unions pass five almost immediately, so the search tree stays small enough
 * to walk exhaustively. Leftover slots go to the most common bottle left.
 */
function pickStarterItems(recipes) {
  const parts = recipes.map(item => item.key.split('+'));

  const frequency = {};
  parts.forEach(p => p.forEach(x => { frequency[x] = (frequency[x] || 0) + 1; }));

  const names = Object.keys(frequency);

  /** Spend whatever slots the search left over on the commonest bottles. */
  const fill = (items) => {
    names.filter(x => !items.has(x))
      .sort((a, b) => frequency[b] - frequency[a])
      .slice(0, STARTER_SET_SIZE - items.size)
      .forEach(x => items.add(x));
    return items;
  };

  // A shelf is one bit per ingredient, packed into as many 32-bit words as
  // the vocabulary needs — a JS bitwise operand is only ever 32 bits wide.
  // Sets and string keys were the obvious way to write this and cost over a
  // tenth of a second on the full list, long enough to hitch the accordion
  // open on a phone. It was two fixed words until the back bar grew; a
  // word count derived from the vocabulary cannot be outgrown quietly.
  const WORD = 32;
  const WORDS = Math.ceil(names.length / WORD) || 1;

  // A drink needing more bottles than the whole starter set can never be
  // covered by one, so it has no business in the search. Dropping those keeps
  // the tree from growing with every long tiki recipe added to the book.
  const index = new Map(names.map((n, i) => [n, i]));
  const masks = parts
    .filter(p => p.length <= STARTER_SET_SIZE)
    .map(p => {
      const m = new Int32Array(WORDS);
      p.forEach(x => {
        const i = index.get(x);
        m[(i / WORD) | 0] |= 1 << (i % WORD);
      });
      return m;
    });

  const popcount = (n) => {
    n -= (n >>> 1) & 0x55555555;
    n = (n & 0x33333333) + ((n >>> 2) & 0x33333333);
    return (((n + (n >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
  };
  const size = (m) => {
    let n = 0;
    for (let w = 0; w < WORDS; w++) n += popcount(m[w]);
    return n;
  };
  const covers = (shelf, recipe) => {
    for (let w = 0; w < WORDS; w++) if ((recipe[w] & ~shelf[w]) !== 0) return false;
    return true;
  };

  // Fewest bottles wins a tie, so the spare slots are still free to be spent.
  let bestCount = 0, bestSize = Infinity;
  let best = new Int32Array(WORDS);

  // Dozens of orderings arrive at the same shelf. What a shelf is worth, and
  // what can still be added to it, depend only on the shelf — so each
  // distinct one is walked exactly once.
  const visited = new Set();

  const walk = (shelf) => {
    const id = shelf.join(':');
    if (visited.has(id)) return;
    visited.add(id);

    let count = 0;
    for (let i = 0; i < masks.length; i++) if (covers(shelf, masks[i])) count++;
    const s = size(shelf);
    if (count > bestCount || (count === bestCount && s < bestSize)) {
      bestCount = count; bestSize = s; best = shelf.slice();
    }

    for (let i = 0; i < masks.length; i++) {
      const next = shelf.slice();
      let grew = false;
      for (let w = 0; w < WORDS; w++) {
        next[w] |= masks[i][w];
        if (next[w] !== shelf[w]) grew = true;
      }
      if (!grew) continue;                                   // adds nothing
      if (size(next) > STARTER_SET_SIZE) continue;
      walk(next);
    }
  };
  walk(new Int32Array(WORDS));

  return fill(new Set(names.filter((_, i) =>
    (best[(i / WORD) | 0] >>> (i % WORD)) & 1
  )));
}

function calculateStarterSet() {
  const seen = new Set();
  const validCocktails = [];
  const usedAsBase = new Set();

  Object.entries(cocktailDatabase).forEach(([key, data]) => {
    if (seen.has(data.name)) return;
    seen.add(data.name);
    if (!matchesDrinkType(data)) return;
    validCocktails.push({ key, data });
    usedAsBase.add(key.split('+')[0]);
  });

  if (!starterSetCache.has(state.drinkType)) {
    starterSetCache.set(state.drinkType, pickStarterItems(validCocktails));
  }
  const starterItems = starterSetCache.get(state.drinkType);

  const makeable = validCocktails.filter(item =>
    item.key.split('+').every(part => starterItems.has(part))
  );

  makeable.sort((a, b) => a.data.name.localeCompare(b.data.name, 'ja'));

  const starterNoun = state.drinkType === 'mocktail' ? 'モクテル' : 'カクテル';
  DOM.starterSetDesc.innerHTML = `この <strong>${starterItems.size}種類</strong> のアイテムを揃えるだけで、以下の <strong>【${makeable.length}種類】</strong> の本格${starterNoun}が作れるようになります！`;

  DOM.starterSetItems.innerHTML = '';
  // Bottles that carry a drink are shown first and marked as bases; the rest
  // follow. An item can only be one or the other in a single list.
  const ordered = [...starterItems].sort((a, b) =>
    Number(usedAsBase.has(b)) - Number(usedAsBase.has(a)));

  ordered.forEach(item => {
    const isBase = usedAsBase.has(item);
    const span = document.createElement('span');
    span.className = isBase ? 'starter-item-badge base' : 'starter-item-badge';
    const icon = isBase
      ? (baseIconMap[item] || mixerDefinitions[item]?.icon || '🍹')
      : (mixerDefinitions[item]?.icon || '✨');
    const name = isBase
      ? (baseNameMap[item] || mixerDefinitions[item]?.name || item)
      : (mixerDefinitions[item]?.name || item);
    span.innerHTML = `${icon} ${name}`;
    DOM.starterSetItems.appendChild(span);
  });

  cancelCardAnimations(DOM.starterGalleryGrid);
  DOM.starterGalleryGrid.innerHTML = '';
  const maxRecipeRows = makeable.reduce((max, item) => Math.max(max, item.data.ingredients.length), 2);
  DOM.starterGalleryGrid.style.setProperty('--recipe-rows', maxRecipeRows);

  const fragment = document.createDocumentFragment();

  makeable.forEach(({ key, data }, index) => {
    const baseKey = key.split('+')[0];
    const baseJp = baseNameMap[baseKey] || baseKey;

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'gallery-card';
    card.dataset.key = key;
    card.style.setProperty('--i', index);
    tintCard(card, data);

    appendCardBadge(card, data);
    
    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'gallery-card-thumb';
    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.width = 180;
    thumbCanvas.height = 230;
    thumbCanvas.setAttribute('aria-hidden', 'true');
    thumbDiv.appendChild(thumbCanvas);
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'gallery-card-info';
    
    const nameEl = document.createElement('div');
    nameEl.className = 'gallery-card-name';
    nameEl.textContent = data.name;
    
    const enEl = document.createElement('div');
    enEl.className = 'gallery-card-en';
    enEl.textContent = data.enName;
    
    const tagEl = document.createElement('div');
    tagEl.className = 'gallery-card-tag';
    const icon = baseIconMap[baseKey] || '🍹';
    tagEl.innerHTML = `<span class="gallery-card-tag-icon" aria-hidden="true">${icon}</span> ${baseJp}ベース<span class="gallery-card-abv">${abvTagLabel(data)}</span>`;
    
    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(enEl);
    infoDiv.appendChild(tagEl);

    thumbDiv.appendChild(infoDiv);
    card.appendChild(thumbDiv);
    card.appendChild(buildRecipeBlock(data));

    card.addEventListener('click', () => {
      setMode('build');
      openRecipe(key);
    });

    fragment.appendChild(card);
    attachThumb(card, thumbCanvas, data, baseKey);
  });

  DOM.starterGalleryGrid.appendChild(fragment);
}
// First: it sets state.drinkType, and everything built below reads it.
initDrinkTypeSwitch();
initMyBarUI();
initGalleryFilters();
initEventListeners();
initAtmosphere();

// Back/forward moves through the app rather than out of it.
window.addEventListener('popstate', applyRoute);
window.addEventListener('hashchange', applyRoute);

// Opens whatever the URL asks for, or the build view when it asks for nothing.
applyRoute();
