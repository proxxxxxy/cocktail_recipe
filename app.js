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
    description: "ジンにレモンを加え、ジンジャーエールでアップした超定番カクテル。「バック(Buck)」とは雄鹿のことで、キックのある力強い飲み口を意味します。",
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
  "gin+curacao+lime": {
    name: "ホワイト・レディ",
    enName: "White Lady",
    abv: 26,
    taste: ["甘酸っぱい", "すっきり", "フルーティー"],
    description: "「白い貴婦人」と呼ばれるIBA公認クラシックカクテル。ジンのハーブ香とオレンジリキュールの甘み、フレッシュな酸味が洗練された調和を生み出します。",
    color: "rgba(255, 255, 255, 0.4)",
    hasBubbles: false,
    garnish: "lemon",
    ice: "none",
    ingredients: [
      { name: "ドライ・ジン", amount: "30 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
      { name: "ライムジュース", amount: "15 ml" }
    ],
    method: [
      "シェイカーに氷とすべての材料を入れます。",
      "しっかりとシェイクし、冷やしたカクテルグラスに注ぎます。"
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
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "ライム果汁", amount: "10 ml" },
      { name: "ジンジャーエール", amount: "適量" }
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
    ingredients: [
      { name: "ウォッカ", amount: "45 ml" },
      { name: "トマトジュース", amount: "適量 (約 120 ml)" },
      { name: "レモンカット", amount: "1個" }
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
    description: "ウォッカのクリアな力強さと、コーヒーリキュールの甘く芳醇な香りが結びついた、世界的に有名なIBA公認ショートカクテル。",
    color: "rgba(78, 52, 46, 0.85)",
    hasBubbles: false,
    garnish: null,
    ice: "cube",
    ingredients: [
      { name: "ウォッカ", amount: "40 ml" },
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
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "フレッシュ・ライム果汁", amount: "10 ml" },
      { name: "コーラ", amount: "適量 (約 120 ml)" }
    ],
    method: [
      "グラスに氷を入れ、ラムとライムジュースを注ぎ軽くかかき混ぜます。",
      "冷えたコーラをごく静かに注ぎ満たし、軽く1回ステアします。"
    ]
  },
  "rum+soda": {
    name: "モヒート",
    enName: "Mojito",
    abv: 8,
    taste: ["ハーバル", "爽快極まりない", "さっぱり"],
    description: "ホワイト・ラムに大量のフレッシュミントとライム、砂糖を加え、クラッシュアイスを敷き詰めてソーダで満たした世界的超有名カクテル。",
    color: "rgba(220, 240, 220, 0.45)",
    hasBubbles: true,
    garnish: "lime",
    ice: "crushed",
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "フレッシュ・ライム果汁", amount: "15 ml" },
      { name: "ミントの葉", amount: "10〜12枚" },
      { name: "ソーダ (炭酸水)", amount: "適量" }
    ],
    method: [
      "グラスの底にミント、砂糖、ライム果汁を入れ、マドラーで優しく潰します。",
      "クラッシュアイスを山盛りに入れ、ラムとソーダを注ぎ底からしっかりかき混ぜます。"
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
    ingredients: [
      { name: "ホワイト・ラム", amount: "45 ml" },
      { name: "ライムジュース", amount: "15 ml" },
      { name: "シュガーシロップ", amount: "1 tsp" }
    ],
    method: [
      "シェイカーに氷と材料を入れ、よくシェイクします。",
      "冷やしたカクテルグラス（氷なし）に注ぎ入れます。"
    ]
  },
  "rum+curacao+lime": {
    name: "XYZ",
    enName: "X.Y.Z.",
    abv: 28,
    taste: ["強い", "甘酸っぱい", "フルーティー"],
    description: "アルファベットの最後である「XYZ」は「これ以上のものは無い」「究極の一杯」を意味します。ラムの甘い香りにキュラソーの華やかさ、ライムの酸味が調和したショートカクテルです。",
    color: "rgba(240, 245, 240, 0.35)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    ingredients: [
      { name: "ホワイト・ラム", amount: "40 ml" },
      { name: "ホワイトキュラソー", amount: "10 ml" },
      { name: "ライムジュース", amount: "10 ml" }
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
    ingredients: [
      { name: "テキーラ", amount: "45 ml" },
      { name: "オレンジジュース", amount: "適量" },
      { name: "グレナデンシロップ", amount: "2 tsp" }
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
    ingredients: [
      { name: "テキーラ", amount: "30 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
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
    saltRim: true,
    ingredients: [
      { name: "テキーラ", amount: "30 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
      { name: "ライムジュース", amount: "15 ml" },
      { name: "塩 (スノースタイル用)", amount: "適量" }
    ],
    method: [
      "カクテルグラスのフチを濡らし、塩をまぶします（スノースタイル）。",
      "氷を入れたシェイカーに材料を注ぎ、よくシェイクしてグラスに注ぎます。"
    ]
  },
  "tequila+pineapple+lime": {
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
  "tequila+cassis+lime+ginger": {
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
  "brandy+curacao+lime": {
    name: "サイドカー",
    enName: "Sidecar",
    abv: 26,
    taste: ["強い", "甘酸っぱい", "芳醇"],
    description: "ブランデーベースを代表するIBA公認クラシックショートカクテル。ブランデーの豊かなコク、ホワイトキュラソーのオレンジの甘味、ライムの酸味が三位一体となった最高峰のカクテルです。",
    color: "rgba(235, 160, 60, 0.65)",
    hasBubbles: false,
    garnish: "lime",
    ice: "none",
    ingredients: [
      { name: "ブランデー", amount: "30 ml" },
      { name: "ホワイトキュラソー", amount: "15 ml" },
      { name: "ライムジュース", amount: "15 ml" }
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
    name: "エル・ディアブロ・カシスジンジャー",
    enName: "El Diablo style Cassis Ginger",
    abv: 6,
    taste: ["甘酸っぱい", "スパイシー", "すっきり"],
    description: "有名な「エル・ディアブロ」からテキーラを除き、カシスリキュールをジンジャーエールとレモンだけで割った、爽やかで上品な甘酸っぱさとスパイシーさを持つカクテル。",
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
  coffee: "rgba(78, 52, 46, 0.7)"        // Rich dark coffee syrup color
};

// All available 15 mixers information for dynamic rendering
const mixerDefinitions = {
  tonic: { name: "トニックウォーター", en: "TONIC WATER", icon: "🫧", color: "rgba(224, 247, 250, 0.4)" },
  orange: { name: "オレンジジュース", en: "ORANGE JUICE", icon: "🍊", color: "rgba(255, 167, 38, 0.8)" },
  cola: { name: "コーラ", en: "COLA", icon: "🥤", color: "rgba(62, 39, 35, 0.9)" },
  ginger: { name: "ジンジャーエール", en: "GINGER ALE", icon: "🫚", color: "rgba(244, 208, 63, 0.5)" },
  soda: { name: "ソーダ (炭酸水)", en: "SODA WATER", icon: "💧", color: "rgba(224, 242, 241, 0.3)" },
  milk: { name: "牛乳", en: "MILK", icon: "🥛", color: "rgba(255, 255, 255, 0.95)" },
  curacao: { name: "ホワイトキュラソー", en: "TRIPLE SEC", icon: "🍊", color: "rgba(255, 255, 255, 0.3)" },
  lime: { name: "ライムジュース", en: "LIME JUICE", icon: "🍋", color: "rgba(197, 225, 165, 0.5)" },
  grapefruit: { name: "グレープフルーツ", en: "GRAPEFRUIT JUICE", icon: "🍊", color: "rgba(255, 245, 157, 0.7)" },
  salt: { name: "食塩 (スノースタイル用)", en: "SALT RIM", icon: "🧂", color: "rgba(255, 255, 255, 0.9)" },
  pineapple: { name: "パイナップル", en: "PINEAPPLE JUICE", icon: "🍍", color: "rgba(255, 235, 59, 0.7)" },
  tomato: { name: "トマトジュース", en: "TOMATO JUICE", icon: "🍅", color: "rgba(211, 47, 47, 0.9)" },
  mint: { name: "ミントリキュール", en: "MINT LIQUEUR", icon: "🍃", color: "rgba(76, 175, 80, 0.7)" },
  absinthe: { name: "アブサン", en: "ABSINTHE", icon: "🧚", color: "rgba(129, 199, 132, 0.6)" },
  whiskey: { name: "ウイスキー (ブレンド用)", en: "WHISKEY MIX", icon: "🥃", color: "rgba(212, 143, 56, 0.6)" }
};

// ==========================================================================
// 2. APPLICATION STATE
// ==========================================================================
const state = {
  currentMode: 'build',  // 'build' | 'dictionary'
  selectedBase: null,    // 'gin' | 'vodka' | 'rum' | ...
  selectedMixers: [],    // Array of selected mixers
  selectedIce: 'cube',   // 'cube' | 'crushed' | 'none'
  
  // Canvas Animation properties
  animLevel: 0,          // Current height level of liquid (0 to 1)
  targetLevel: 0,        // Target height level (e.g. 0.35 or 0.88)
  currentColor: [255, 255, 255, 0], // Current RGBA color components
  targetColor: [255, 255, 255, 0], // Target RGBA color components
  wavePhase: 0,
  bubbles: [],
  saltRim: false
};

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
  // Tabs
  tabBuild: document.getElementById('tab-build'),
  tabDictionary: document.getElementById('tab-dictionary'),
  viewBuild: document.getElementById('view-build'),
  viewDictionary: document.getElementById('view-dictionary'),
  
  // Right Column View wrappers
  controlsCard: document.getElementById('controls-card'),
  
  // Build Mode selectors
  baseBtns: document.querySelectorAll('.base-btn'),
  mixerContainer: document.getElementById('mixer-container'),
  iceBtns: document.querySelectorAll('.ice-btn'),
  resetBtn: document.getElementById('btn-reset'),
  backToBuildBtn: document.getElementById('btn-back-to-build'),
  
  // Dictionary Mode Select
  cocktailSelect: document.getElementById('cocktail-select'),
  
  // Visualizer Canvas & Overlays
  canvas: document.getElementById('cocktail-canvas'),
  garnishLayer: document.getElementById('garnish-layer'),
  statusIndicator: document.getElementById('status-indicator'),
  glass: document.getElementById('cocktail-glass'),
  simulatorLayout: document.querySelector('.simulator-layout'),
  visualizerCard: document.querySelector('.visualizer-card'),
  
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
  if (str.includes('linear-gradient')) return [255, 120, 50, 0.7]; // gradient fallback
  const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return [
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
      match[4] !== undefined ? parseFloat(match[4]) : 1.0
    ];
  }
  return [255, 255, 255, 0.2];
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
  const w = DOM.canvas.width;
  const h = DOM.canvas.height;
  
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
  
  requestAnimationFrame(drawCocktail);
}

requestAnimationFrame(drawCocktail);

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
    btn.id = `btn-${mKey}`;
    
    if (state.selectedMixers.includes(mKey)) {
      btn.classList.add('active');
    }
    
    btn.innerHTML = `
      <span class="btn-icon">${def.icon}</span>
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
    
    // Glow logic
    btn.classList.remove('glow-yellow', 'glow-green');
    if (isValid && !state.selectedMixers.includes(mKey)) {
      let canBeMultiMixer = false;
      let canBeSingleMixerIrregular = false;
      
      Object.entries(cocktailDatabase).forEach(([key, cocktail]) => {
        const parts = key.split('+');
        if (parts[0] !== base) return;
        if (!temp.every(m => parts.includes(m))) return;
        
        const numMixers = parts.length - 1;
        if (numMixers >= 2) {
          canBeMultiMixer = true;
        } else if (numMixers === 1 && parts.length === 2 && (key.includes('orange') || key.includes('ginger') || key.includes('soda') || key.includes('salt') || key.includes('curacao'))) {
          // Glow yellow for specialized single mixers
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
  
  // Auto-set ice when matching recipe completed
  const key = [state.selectedBase, ...[...state.selectedMixers].sort()].join('+');
  const cocktail = cocktailDatabase[key];
  if (cocktail) {
    state.selectedIce = cocktail.ice;
  }
  
  updateUI();
}

function updateIceButtonsUI() {
  DOM.iceBtns.forEach(btn => {
    if (btn.dataset.ice === state.selectedIce) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function initCocktailDropdown() {
  DOM.cocktailSelect.innerHTML = '<option value="">-- カクテルを選択 --</option>';
  
  const list = Object.entries(cocktailDatabase).map(([key, data]) => {
    return { key, name: data.name };
  });
  
  list.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  
  list.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.key;
    opt.textContent = c.name;
    DOM.cocktailSelect.appendChild(opt);
  });
}

// Sync State with UI and layout views
function updateUI() {
  const { selectedBase, selectedMixers, selectedIce } = state;
  
  // Sync Base Buttons active
  DOM.baseBtns.forEach(btn => {
    if (btn.dataset.base === selectedBase) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Sync Ice Buttons active
  updateIceButtonsUI();
  
  // Render mixers
  renderMixerButtons();
  
  // Check matching cocktail
  const key = [selectedBase, ...[...selectedMixers].sort()].join('+');
  const cocktail = cocktailDatabase[key];
  
  if (!selectedBase && selectedMixers.length === 0) {
    // 6.1 NOTHING SELECTED
    state.targetLevel = 0;
    state.targetColor = [255, 255, 255, 0];
    state.saltRim = false;
    renderGarnish(null);
    
    DOM.statusIndicator.textContent = "ベースとなるお酒を選択してください";
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
    
    const baseJp = document.getElementById(`btn-${selectedBase}`).querySelector('.btn-jp').textContent;
    DOM.statusIndicator.textContent = `${baseJp}を選択中。次に光っている割り材を選んでください。`;
    DOM.statusIndicator.classList.remove('ready');
    
    DOM.controlsCard.classList.remove('hidden');
    DOM.resultPanel.classList.add('hidden');
    DOM.simulatorLayout.classList.remove('completed');
    
  } else if (selectedBase && selectedMixers.length > 0 && cocktail) {
    // 6.3 COCKTAIL COMPLETED
    state.targetLevel = 0.88;
    state.targetColor = calculateCurrentBlendColor();
    state.saltRim = !!cocktail.saltRim;
    renderGarnish(cocktail.garnish);
    
    DOM.statusIndicator.textContent = `完成！: ${cocktail.name}`;
    DOM.statusIndicator.classList.add('ready');
    
    // Populate Completed Recipe UI
    DOM.cocktailName.textContent = cocktail.name;
    DOM.cocktailEnName.textContent = cocktail.enName;
    DOM.abvValue.textContent = `約 ${cocktail.abv}%`;
    DOM.abvFill.style.width = `${Math.min((cocktail.abv / 40) * 100, 100)}%`;
    
    let iceText = '🚫 氷なし';
    if (selectedIce === 'cube') iceText = '🧊 キューブアイス';
    else if (selectedIce === 'crushed') iceText = '🍧 クラッシュアイス';
    DOM.iceStyleDisplay.textContent = iceText;
    
    DOM.tasteBadges.innerHTML = '';
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
    
    // UI Panels transition: Hide controls, Show result in the right column
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
    
    DOM.statusIndicator.textContent = "カスタムビルド中... 別の材料を加えるか、氷を調整してください。";
    DOM.statusIndicator.classList.remove('ready');
    
    DOM.controlsCard.classList.remove('hidden');
    DOM.resultPanel.classList.add('hidden');
    DOM.simulatorLayout.classList.remove('completed');
  }
}

// ==========================================================================
// 7. EVENT HANDLERS & INITIALIZATION
// ==========================================================================

function setMode(mode) {
  state.currentMode = mode;
  
  if (mode === 'build') {
    DOM.tabBuild.classList.add('active');
    DOM.tabDictionary.classList.remove('active');
    DOM.viewBuild.classList.remove('hidden');
    DOM.viewDictionary.classList.add('hidden');
  } else {
    DOM.tabBuild.classList.remove('active');
    DOM.tabDictionary.classList.add('active');
    DOM.viewBuild.classList.add('hidden');
    DOM.viewDictionary.classList.remove('hidden');
    initCocktailDropdown();
  }
  
  resetGlass();
}

function resetGlass() {
  state.selectedBase = null;
  state.selectedMixers = [];
  state.selectedIce = 'cube';
  DOM.cocktailSelect.value = '';
  updateUI();
}

function initEventListeners() {
  DOM.tabBuild.addEventListener('click', () => setMode('build'));
  DOM.tabDictionary.addEventListener('click', () => setMode('dictionary'));
  
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
      updateUI();
    });
  });
  
  DOM.iceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedIce = btn.dataset.ice;
      updateUI();
    });
  });
  
  DOM.resetBtn.addEventListener('click', resetGlass);
  
  // Bind Back to Build button on Completed card
  DOM.backToBuildBtn.addEventListener('click', resetGlass);
  
  DOM.cocktailSelect.addEventListener('change', (e) => {
    const key = e.target.value;
    if (!key) {
      resetGlass();
      return;
    }
    
    const cocktail = cocktailDatabase[key];
    if (cocktail) {
      const parts = key.split('+');
      state.selectedBase = parts[0];
      state.selectedMixers = parts.slice(1);
      state.selectedIce = cocktail.ice;
      
      updateUI();
    }
  });
}

initEventListeners();
updateUI();
