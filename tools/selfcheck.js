/**
 * Self-check harness
 *
 * Load into the running page and call it:
 *
 *   const s = document.createElement('script');
 *   s.src = '/tools/selfcheck.js?t=' + Date.now();
 *   document.head.appendChild(s);
 *   // then
 *   await window.__selfcheck();
 *
 * It exists because a released change once hid the whole archive tab —
 * display:none, height 0, on every screen — and the checks of the day missed
 * it completely. They counted cards with querySelectorAll, which happily
 * counts nodes inside a hidden subtree. Presence is not visibility, and
 * visibility was the only thing that mattered.
 *
 * So: everything here asserts what a person would actually see, and every
 * invariant the data has to satisfy for the app to be navigable at all.
 */
(function () {
  const results = [];
  const ok = (name, detail = '') => results.push({ pass: true, name, detail });
  const bad = (name, detail = '') => results.push({ pass: false, name, detail });
  const check = (cond, name, detail = '') => (cond ? ok(name, detail) : bad(name, detail));

  /** Visible means occupying space on screen, not merely present in the DOM. */
  const visible = (el) =>
    !!el && el.offsetParent !== null && el.offsetHeight > 0 && el.offsetWidth > 0;

  const wait = (ms = 60) => new Promise(r => setTimeout(r, ms));

  // ---------------------------------------------------------------- data ---
  function checkData() {
    const keys = Object.keys(cocktailDatabase);
    check(keys.length > 0, 'database is not empty', `${keys.length} keys`);

    const badSort = [];
    const unknownBase = [];
    const unknownMixer = [];
    const missingFields = [];
    const REQUIRED = ['name', 'enName', 'abv', 'taste', 'description',
                      'color', 'garnish', 'ice', 'ingredients', 'method'];

    keys.forEach(key => {
      const parts = key.split('+');
      const [base, ...mixers] = parts;

      // The build view and every route rebuild a key as base + sorted mixers.
      // A key stored in any other order can never be reached by a person.
      const sorted = [...mixers].sort();
      if (mixers.join('+') !== sorted.join('+')) badSort.push(key);

      if (!Object.prototype.hasOwnProperty.call(baseTints, base)) unknownBase.push(key);
      mixers.forEach(m => {
        if (!Object.prototype.hasOwnProperty.call(mixerDefinitions, m)) {
          unknownMixer.push(`${key} → ${m}`);
        }
      });

      // The key must be declared; the value may legitimately be null.
      // `garnish: null` is a decision — this drink is served bare — and is
      // not the same thing as forgetting the field exists.
      const data = cocktailDatabase[key];
      const missing = REQUIRED.filter(f => !Object.prototype.hasOwnProperty.call(data, f));
      const empty = REQUIRED.filter(f => f !== 'garnish' && (data[f] === undefined || data[f] === null));
      if (missing.length) missingFields.push(`${key} missing: ${missing.join(',')}`);
      if (empty.length) missingFields.push(`${key} empty: ${empty.join(',')}`);
      if (data && !['cube', 'crushed', 'none'].includes(data.ice)) {
        missingFields.push(`${key}: ice="${data.ice}"`);
      }
    });

    check(!badSort.length, 'recipe keys list mixers in sorted order', badSort.join(' '));
    check(!unknownBase.length, 'every recipe base exists in baseTints', unknownBase.join(' '));
    check(!unknownMixer.length, 'every recipe mixer exists', unknownMixer.join(' '));
    check(!missingFields.length, 'every recipe has the required fields', missingFields.join(' | '));

    // Names are the join key for collections and for routing, so a drink
    // that exists under several keys — margarita with and without a salt
    // rim — must still be one drink everywhere downstream. This used to
    // read `new Set(names).size === new Set(names).size`, which is a
    // tautology: it passed while testing nothing at all.
    const names = Object.values(cocktailDatabase).map(c => c.name);
    const distinct = new Set(names);
    check(buildDrinkList(null).length === distinct.size,
          'the gallery lists each drink exactly once',
          `${buildDrinkList(null).length} cards for ${distinct.size} names (${names.length} keys)`);
    check(routeSlugByName.size === distinct.size,
          'each drink has exactly one route slug',
          `${routeSlugByName.size} slugs for ${distinct.size} names`);

    const slugs = new Set();
    let slugClash = 0;
    Object.values(cocktailDatabase).forEach(c => {
      const s = routeSlugByName.get(c.name);
      if (!s) slugClash++;
      slugs.add(s);
    });
    check(slugClash === 0, 'every drink has a route slug');

    // Curated lists join by name; a typo silently drops a drink.
    const known = new Set(names);
    const stray = [
      ...Object.entries(SERVE_ORDER).flatMap(([k, l]) => l.filter(n => !known.has(n)).map(n => `${k}:${n}`)),
      ...Object.entries(SEASONS).flatMap(([k, l]) => l.filter(n => !known.has(n)).map(n => `${k}:${n}`)),
    ];
    check(!stray.length, 'curated lists name real drinks', stray.join(' '));

    // --- prose ---
    // A Cyrillic word once made it into a description and survived a syntax
    // check, a render and a read-through. Japanese, latin, digits and
    // punctuation are the whole alphabet this book is written in.
    const FOREIGN = /[Ѐ-ӿ가-힯฀-๿؀-ۿ]/;
    const prose = [];
    Object.entries(cocktailDatabase).forEach(([key, d]) => {
      const strings = [d.name, d.enName, d.description,
                       ...d.taste,
                       ...d.ingredients.flatMap(i => [i.name, i.amount]),
                       ...d.method];
      strings.forEach(s => {
        if (typeof s !== 'string' || !s.trim()) prose.push(`${key}: empty string`);
        else if (FOREIGN.test(s)) prose.push(`${key}: foreign script in "${s.slice(0, 24)}"`);
      });
      if (d.taste.length < 2 || d.taste.length > 4) prose.push(`${key}: ${d.taste.length} taste words`);
      if (d.description.length < 30) prose.push(`${key}: description too short`);
      if (!d.method.length) prose.push(`${key}: no method`);
      d.method.forEach(step => {
        if (!/[。）」]$/.test(step)) prose.push(`${key}: step lacks a full stop — "${step.slice(-14)}"`);
      });
      if (!d.ingredients.length) prose.push(`${key}: no ingredients`);
      if (typeof d.abv !== 'number' || d.abv < 0 || d.abv > 60) prose.push(`${key}: abv ${d.abv}`);
      // A mocktail that claims alcohol, or a cocktail that claims none, is
      // one of the two facts having been edited without the other.
      const mock = isMocktailKey(key);
      if (mock && d.abv !== 0) prose.push(`${key}: alcohol-free but ${d.abv}%`);
      if (!mock && d.abv === 0) prose.push(`${key}: 0% but not classed alcohol-free`);
    });
    check(!prose.length, 'recipe prose is well formed', prose.slice(0, 8).join(' | '));

    // The glass label is derived; the method text is written by hand. When
    // they disagree the page tells a bartender two different things, and the
    // method — being specific to the drink — is the one to believe.
    const NAMED_GLASS = [
      ['コリンズグラス', /コリンズ/], ['タンブラー', /タンブラー/], ['ロックグラス', /ロックグラス/],
      ['カクテルグラス', /カクテルグラス/], ['フルートグラス', /フルート/],
      ['ワイングラス', /ワイングラス/], ['銅マグ', /マグ/], ['ハリケーングラス', /ハリケーン/],
      ['ジュレップカップ', /ジュレップ/], ['リキュールグラス', /リキュールグラス/],
    ];
    const glassClash = [];
    Object.values(cocktailDatabase).forEach(d => {
      const method = d.method.join(' ');
      const named = NAMED_GLASS.filter(([, re]) => re.test(method)).map(([n]) => n);
      if (named.length && !named.includes(glassLabel(d))) {
        glassClash.push(`${d.name}: shows ${glassLabel(d)}, method says ${named.join('/')}`);
      }
    });
    check(!glassClash.length, 'the glass shown agrees with the method text',
          glassClash.join(' | '));

    const vocab = new Set(SHELF_VOCABULARY);
    const unlisted = [...Object.keys(baseTints), ...Object.keys(mixerDefinitions)]
      .filter(id => !vocab.has(id));
    check(!unlisted.length, 'every ingredient is in SHELF_VOCABULARY', unlisted.join(' '));
    check(SHELF_VOCABULARY.length === new Set(SHELF_VOCABULARY).size,
          'SHELF_VOCABULARY has no duplicates');
    // There used to be a <= 64 limit asserted here, from when the starter
    // search packed a shelf into two fixed words. It derives its word count
    // now, so the ceiling is gone and the assertion would only have started
    // failing at 65 with nothing actually wrong.
    check(SHELF_VOCABULARY.length >= Object.keys(mixerDefinitions).length,
          'SHELF_VOCABULARY covers at least every mixer',
          `${SHELF_VOCABULARY.length} vs ${Object.keys(mixerDefinitions).length}`);
  }

  // --------------------------------------------------------------- codec ---
  function checkCodec() {
    let fails = 0;
    const same = (a, b) => a.size === b.size && [...a].every(x => b.has(x));
    for (let i = 0; i < 200; i++) {
      const s = new Set(SHELF_VOCABULARY.filter(() => Math.random() < Math.random()));
      if (!same(s, decodeShelf(encodeShelf(s)))) fails++;
    }
    check(fails === 0, 'shelf codec round-trips', `${fails} failures / 200`);
    check(decodeShelf('!!!') === null, 'shelf codec rejects rubbish');
    check(decodeShelf('') === null, 'shelf codec rejects an empty code');
  }

  // ------------------------------------------------------------- rendering --
  function checkThumbnails() {
    const blank = [];
    const seen = new Set();
    Object.values(cocktailDatabase).forEach(data => {
      if (seen.has(data.name)) return;
      seen.add(data.name);
      const c = document.createElement('canvas');
      c.width = 180; c.height = 230;
      try {
        drawGalleryPhoto(c, data, { phase: 0.9 });
      } catch (err) {
        blank.push(`${data.name} threw ${err.message}`);
        return;
      }
      const px = c.getContext('2d').getImageData(0, 0, 180, 230).data;
      let painted = 0;
      for (let i = 3; i < px.length; i += 4) if (px[i] > 8) painted++;
      if (painted / (180 * 230) < 0.05) blank.push(`${data.name} ${(painted / (180 * 230) * 100).toFixed(1)}%`);
    });
    check(!blank.length, 'every drink paints a thumbnail', blank.join(' | '));
  }

  /**
   * The page states its own size — in the meta description, in the share
   * card and in the hero. Those numbers are written by hand and the book
   * grows, so they are checked against the book rather than trusted.
   */
  function checkStatedCounts() {
    const counts = countsByDrinkType();
    const iba = buildDrinkList(null).filter(i => isIBACocktail(i.data)).length;
    const claims = [
      ['meta description', document.querySelector('meta[name="description"]')?.content],
      ['og:description', document.querySelector('meta[property="og:description"]')?.content],
      ['hero copy', document.querySelector('.intro-copy')?.textContent],
    ];

    const stale = [];
    claims.forEach(([where, text]) => {
      if (!text) return;
      // Any 2-3 digit number in this copy is a claim about the collection.
      (text.match(/\d{2,3}/g) || []).forEach(n => {
        if (![counts.all, counts.mocktail, counts.cocktail, iba].includes(Number(n))) {
          stale.push(`${where} says ${n}`);
        }
      });
    });
    check(!stale.length,
          'the page states the collection size correctly',
          `${stale.join(', ')} — actual ${counts.all}/${counts.mocktail}/iba ${iba}`);
  }

  /**
   * Checked with a base selected, because that is when the mixer buttons
   * exist — an empty build view has no collisions to find, which is why a
   * duplicate `btn-brandy` survived until the ids were namespaced.
   */
  function checkNoDuplicateIds() {
    const dupesFound = new Set();
    const scan = () => {
      const seen = new Set();
      document.querySelectorAll('[id]').forEach(el => {
        if (seen.has(el.id)) dupesFound.add(el.id);
        seen.add(el.id);
      });
    };

    setMode('build');
    scan();
    // rum and gin both offer spirits as mixers; sweep every base to be sure.
    document.querySelectorAll('.base-btn').forEach(btn => {
      state.selectedBase = btn.dataset.base;
      state.selectedMixers = [];
      state.showResult = false;
      updateUI();
      scan();
    });
    resetGlass();

    check(dupesFound.size === 0, 'no duplicate element ids', [...dupesFound].join(' '));
  }

  function checkNoSideScroll() {
    const doc = document.documentElement;
    check(doc.scrollWidth <= doc.clientWidth + 1,
          'page does not scroll sideways', `${doc.scrollWidth} > ${doc.clientWidth}`);
  }

  // ----------------------------------------------------------------- modes --
  async function checkModes() {
    const layout = document.querySelector('.simulator-layout');

    setMode('build');
    check(visible(layout), 'build: layout is visible');
    check(visible(document.querySelector('.visualizer-card')), 'build: the glass is visible');
    check(visible(document.getElementById('view-build')), 'build: the base picker is visible');
    check(document.querySelectorAll('.base-btn').length > 0, 'build: bases exist');
    checkNoSideScroll();

    setMode('dictionary');
    check(visible(layout), 'archive: layout is visible');
    check(visible(document.getElementById('gallery-grid')), 'archive: the grid is visible');
    check(visible(document.querySelector('#gallery-grid .gallery-card')),
          'archive: the first card is visible');
    check(!DOM.galleryGrid.classList.contains('is-coursed'), 'archive: not split into courses');
    check(!visible(document.getElementById('course-nav')), 'archive: no course bar');
    checkNoSideScroll();

    setMode('mybar');
    check(visible(layout), 'my bar: layout is visible');
    check(visible(document.getElementById('view-mybar')), 'my bar: the shelf is visible');
    check(visible(document.getElementById('btn-share-menu')), 'my bar: the share button is visible');
    check(document.querySelectorAll('.mybar-chip').length > 0, 'my bar: ingredients are listed');
    checkNoSideScroll();

    setMode('build');
  }

  // ---------------------------------------------------------------- routes --
  async function checkRoutes() {
    const go = async (hash) => { location.hash = hash; applyRoute(); await wait(); };

    await go('#/archive');
    check(state.currentMode === 'dictionary', 'route #/archive opens the archive');

    await go('#/mybar');
    check(state.currentMode === 'mybar', 'route #/mybar opens my bar');

    const sample = [...routeKeyBySlug.keys()][0];
    await go(`#/recipe/${sample}`);
    check(state.showResult === true, `route #/recipe/${sample} opens a recipe`);
    check(visible(document.getElementById('result-panel')), 'recipe panel is visible');
    check(document.getElementById('cocktail-name').textContent.length > 0, 'recipe has a name');

    // Every drink must render its own strength. Checked through the
    // un-animated path so the whole book can be covered in one pass — the
    // count-up is the same value arrived at slowly, and reading it mid-flight
    // says nothing except that it is mid-flight.
    const abvEl = document.getElementById('abv-value');
    const wrongAbv = [];
    Object.values(cocktailDatabase).forEach(data => {
      countUpABV(abvEl, data.abv, false);
      const expected = data.abv === 0 ? 'ALCOHOL FREE' : `約 ${data.abv}%`;
      if (abvEl.textContent !== expected) {
        wrongAbv.push(`${data.name}: "${abvEl.textContent}" ≠ "${expected}"`);
      }
    });
    check(!wrongAbv.length, 'every drink renders its own strength',
          wrongAbv.slice(0, 4).join(' | '));

    // There was an assertion here that opened a drink and read the number
    // back after the count-up should have finished. It measured whether this
    // environment had granted an animation frame in the last second, which is
    // not a property of the app, and it flapped accordingly. The loop above
    // already proves every drink computes its own figure; the animation only
    // walks to that same figure.

    // A menu, its counts, and a recipe reached from inside it.
    const shelf = new Set(SHELF_VOCABULARY);
    const code = encodeShelf(shelf);
    await go(`#/menu/${code}`);
    check(state.currentMode === 'menu', 'route #/menu opens a menu');
    check(visible(document.getElementById('menu-masthead')), 'menu: masthead is visible');
    check(visible(document.querySelector('#gallery-grid .gallery-card')), 'menu: cards are visible');
    check(!visible(document.querySelector('.mode-tabs')), 'menu: the tabs are hidden from guests');
    check(!visible(document.querySelector('.intro')), 'menu: the builder hero is hidden');
    check(visible(document.getElementById('drink-type-switch')),
          'menu: the cocktail/mocktail switch stays');
    checkNoSideScroll();

    const shown = document.querySelectorAll('#gallery-grid .gallery-card').length;
    const tally = [...document.querySelectorAll('.dt-count')].map(e => Number(e.textContent));
    check(tally[0] === shown, 'menu: the switch total matches the cards shown', `${tally[0]} vs ${shown}`);
    check(tally[1] + tally[2] === tally[0], 'menu: cocktails + mocktails = total',
          `${tally[1]}+${tally[2]} vs ${tally[0]}`);

    const courseCards = [...document.querySelectorAll('.menu-course')]
      .reduce((n, s) => n + s.querySelectorAll('.gallery-card').length, 0);
    check(courseCards === shown, 'menu: courses account for every card', `${courseCards} vs ${shown}`);

    const nav = document.getElementById('course-nav');
    check(visible(nav), 'menu: the course bar is visible');
    check(nav.querySelectorAll('.course-nav-btn').length ===
          document.querySelectorAll('.menu-course').length,
          'menu: one bar button per course');

    // Every course button must land its heading clear of the pinned bar.
    //
    // Asserted as geometry rather than by actually scrolling: opening a
    // recipe schedules a smooth scrollIntoView 100ms out, and letting that
    // land mid-measurement made this check flap between runs for reasons
    // that had nothing to do with the thing being tested. Where the bar
    // comes to rest and where a jump puts the heading are both knowable
    // without moving the page.
    const barRestsAt = parseFloat(getComputedStyle(nav).top) || 0;
    const barBottom = barRestsAt + nav.offsetHeight;
    const behind = [];
    nav.querySelectorAll('.course-nav-btn').forEach(btn => {
      const section = document.getElementById(btn.dataset.course);
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const headingTop = section.querySelector('.menu-course-heading')
        .getBoundingClientRect().top + window.scrollY;
      // Where the heading sits in the viewport once the jump has landed.
      const restingTop = headingTop - courseScrollTarget(section);
      if (restingTop < barBottom) {
        behind.push(`${btn.dataset.course} by ${Math.round(barBottom - restingTop)}px`);
      }
      if (sectionTop < 0) behind.push(`${btn.dataset.course} above the page`);
    });
    check(!behind.length, 'menu: every jump clears the pinned bar', behind.join(' '));

    // "お任せで" must only ever pour what the host can actually make, and
    // must respect the half of the index the guest is looking at.
    const omakase = document.getElementById('btn-omakase');
    check(visible(omakase), 'menu: the omakase button is offered');
    setDrinkType('mocktail');
    const poured = [];
    for (let i = 0; i < 8; i++) {
      pourOmakase();
      poured.push(document.getElementById('cocktail-name').textContent);
      location.hash = `#/menu/${code}`;
      applyRoute();
    }
    check(poured.every(n => collectionsByName.mocktail.has(n)),
          'omakase pours nothing alcoholic under the mocktail switch',
          [...new Set(poured)].join(' '));
    check(poured.every((n, i) => i === 0 || n !== poured[i - 1]),
          'omakase does not pour the same drink twice running');
    setDrinkType('all');

    // A shared link must open even when the reader is on the other half.
    const mocktailKey = Object.keys(cocktailDatabase).find(k => isMocktailKey(k));
    const mocktailSlug = routeSlugByName.get(cocktailDatabase[mocktailKey].name);
    setDrinkType('cocktail');
    await go(`#/menu/${code}/recipe/${mocktailSlug}`);
    check(state.showResult === true, 'menu recipe link opens', location.hash);
    check(state.menuCode === code, 'menu recipe link stays inside the menu');

    await go(`#/menu/${code}`);
    check(state.showResult === false, 'back from a menu recipe returns to the menu');

    await go('#/menu/!!!not-a-code');
    check(state.menuCode === null, 'a broken menu code falls back to the index');
    check(visible(document.querySelector('.intro')), 'broken code still shows a usable page');

    setDrinkType('all');
    await go('#/');
    check(state.currentMode === 'build', 'route #/ returns to the builder');
  }

  // ------------------------------------------------------------ drink type --
  async function checkDrinkType() {
    setMode('dictionary');
    const counts = {};
    ['all', 'cocktail', 'mocktail'].forEach(t => {
      setDrinkType(t);
      counts[t] = document.querySelectorAll('#gallery-grid .gallery-card').length;
      const tally = [...document.querySelectorAll('.dt-count')].map(e => Number(e.textContent));
      check(tally[0] === tally[1] + tally[2], `${t}: switch tally is self-consistent`);
    });
    check(counts.all === counts.cocktail + counts.mocktail,
          'archive: the two halves add up to everything',
          `${counts.cocktail}+${counts.mocktail} vs ${counts.all}`);

    setDrinkType('mocktail');
    const strong = [...document.querySelectorAll('#gallery-grid .gallery-card')]
      .map(c => c.dataset.key).filter(k => !isMocktailKey(k));
    check(!strong.length, 'mocktail view shows nothing alcoholic', strong.join(' '));

    setDrinkType('all');
    setMode('build');
  }

  // ------------------------------------------------------------------ run ---
  window.__selfcheck = async function selfcheck() {
    results.length = 0;
    const started = performance.now();

    checkData();
    checkCodec();
    checkStatedCounts();
    checkNoDuplicateIds();
    checkThumbnails();
    await checkModes();
    await checkDrinkType();
    await checkRoutes();

    const failed = results.filter(r => !r.pass);
    return {
      summary: `${results.length - failed.length}/${results.length} passed in ${Math.round(performance.now() - started)}ms`,
      failures: failed.map(f => `${f.name}${f.detail ? ' — ' + f.detail : ''}`),
      passed: results.filter(r => r.pass).map(r => r.name),
    };
  };

  console.log('[selfcheck] ready — call await window.__selfcheck()');
})();
