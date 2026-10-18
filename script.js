// =====================================================================
// EGM BASKETBALL BUILD-A-BEAUTY - everything in ONE file (script.js + extras.js merged)
// Paste this whole thing into the CodePen JS panel.
// =====================================================================

const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ATTRIBUTES = [
  { id: "scoring", name: "Scoring", emoji: "🏀" },
  { id: "iq", name: "Basketball IQ", emoji: "🧠" },
  { id: "rebounding", name: "Rebounding", emoji: "🗑️" },
  { id: "defence", name: "Defence", emoji: "🛡️" },
  { id: "speed", name: "Speed", emoji: "⚡" },
  { id: "stamina", name: "Stamina", emoji: "🫁" },
  { id: "handles", name: "Ball Handles", emoji: "🔀" },
  { id: "passing", name: "Passing", emoji: "➡️" },
  { id: "athleticiem", name: "Athleticism", emoji: "🚀" },
  { id: "physicality", name: "Physicality", emoji: "💥" }
];

const ALL100 = { scoring: 100, iq: 100, rebounding: 100, defence: 100, speed: 100, stamina: 100, handles: 100, passing: 100, athleticiem: 100, physicality: 100 };

const BASE_PLAYERS = [
  { name: "Nico", tier: "All-Star", stats: { scoring: 99, iq: 97, rebounding: 83, defence: 93, speed: 92, stamina: 94, handles: 98, passing: 95, athleticiem: 93, physicality: 98 } },
  { name: "Josh", tier: "Gold", stats: { scoring: 86, iq: 85, rebounding: 98, defence: 83, speed: 99, stamina: 97, handles: 71, passing: 98, athleticiem: 98, physicality: 91 } },
  { name: "Esrom", tier: "Gold", stats: { scoring: 96, iq: 95, rebounding: 82, defence: 89, speed: 88, stamina: 84, handles: 97, passing: 94, athleticiem: 88, physicality: 85 } },
  // Harder to get, upgraded Esrom (rolled on its own chance, see CH.la)
  { name: "Esrom (LA)", display: "Esrom", la: true, chanceKey: "la", tier: "Gold+", stats: { scoring: 98, iq: 97, rebounding: 90, defence: 93, speed: 92, stamina: 91, handles: 98, passing: 96, athleticiem: 92, physicality: 89 } },
  { name: "Jackson", tier: "Gold", stats: { scoring: 94, iq: 88, rebounding: 90, defence: 92, speed: 92, stamina: 94, handles: 92, passing: 87, athleticiem: 83, physicality: 81 } },
  { name: "Bryden", tier: "Bronze", stats: { scoring: 67, iq: 67, rebounding: 67, defence: 67, speed: 67, stamina: 67, handles: 67, passing: 67, athleticiem: 67, physicality: 67 } },
  { name: "Ose", tier: "Developer!", stats: { scoring: 87, iq: 79, rebounding: 96, defence: 89, speed: 98, stamina: 91, handles: 83, passing: 90, athleticiem: 97, physicality: 89 } },
  { name: "Xian", tier: "Silver", stats: { scoring: 86, iq: 90, rebounding: 84, defence: 91, speed: 88, stamina: 82, handles: 85, passing: 84, athleticiem: 83, physicality: 78 } },
  { name: "Eman", tier: "Silver", stats: { scoring: 85, iq: 74, rebounding: 70, defence: 73, speed: 82, stamina: 89, handles: 78, passing: 78, athleticiem: 73, physicality: 72 } },
  { name: "Maxwell", tier: "Silver", stats: { scoring: 83, iq: 84, rebounding: 78, defence: 78, speed: 78, stamina: 75, handles: 83, passing: 74, athleticiem: 72, physicality: 75 } },
  { name: "Vivian", tier: "Silver", stats: { scoring: 78, iq: 76, rebounding: 78, defence: 72, speed: 73, stamina: 72, handles: 78, passing: 79, athleticiem: 70, physicality: 73 } },
  { name: "Mubeen", tier: "Silver", bad: true, stats: { scoring: 64, iq: 68, rebounding: 66, defence: 62, speed: 65, stamina: 61, handles: 67, passing: 63, athleticiem: 69, physicality: 58 } },
  { name: "Nazery", tier: "Silver", stats: { scoring: 71, iq: 68, rebounding: 65, defence: 61, speed: 74, stamina: 70, handles: 67, passing: 64, athleticiem: 69, physicality: 62 } },
  { name: "LeBron James", tier: "NBA All-Star", nba: true, stats: ALL100 },
  { name: "Stephen Curry", tier: "NBA All-Star", nba: true, stats: ALL100 },
  { name: "Giannis Antetokounmpo", tier: "NBA All-Star", nba: true, stats: ALL100 },
  { name: "Nikola Jokic", tier: "NBA All-Star", nba: true, stats: ALL100 },
  { name: "Kevin Durant", tier: "NBA All-Star", nba: true, stats: ALL100 },
  { name: "Anu", tier: "Bronze", bad: true, stats: { scoring: 58, iq: 55, rebounding: 60, defence: 52, speed: 59, stamina: 56, handles: 54, passing: 57, athleticiem: 60, physicality: 53 } },
  { name: "Skyler", tier: "Silver", bad: true, stats: { scoring: 62, iq: 60, rebounding: 63, defence: 58, speed: 66, stamina: 60, handles: 59, passing: 61, athleticiem: 64, physicality: 57 } },
  { name: "Miguel 1", tier: "Silver", stats: { scoring: 77, iq: 73, rebounding: 72, defence: 75, speed: 76, stamina: 74, handles: 73, passing: 75, athleticiem: 78, physicality: 72 } },
  { name: "Miguel 2", tier: "Silver", stats: { scoring: 75, iq: 72, rebounding: 74, defence: 70, speed: 73, stamina: 71, handles: 74, passing: 72, athleticiem: 75, physicality: 70 } },
  { name: "Lucas", tier: "Silver", stats: { scoring: 72, iq: 75, rebounding: 71, defence: 73, speed: 70, stamina: 72, handles: 74, passing: 71, athleticiem: 72, physicality: 73 } },
  { name: "Alejandro", tier: "Silver", stats: { scoring: 74, iq: 71, rebounding: 73, defence: 70, speed: 75, stamina: 71, handles: 71, passing: 73, athleticiem: 74, physicality: 71 } },
  { name: "Coen", tier: "Silver", stats: { scoring: 76, iq: 74, rebounding: 75, defence: 72, speed: 78, stamina: 73, handles: 75, passing: 74, athleticiem: 76, physicality: 72 } },
  { name: "Kody", tier: "Silver", stats: { scoring: 81, iq: 76, rebounding: 68, defence: 77, speed: 87, stamina: 96, handles: 79, passing: 83, athleticiem: 82, physicality: 77 } },
  { name: "Logan VM", tier: "Gold", stats: { scoring: 92, iq: 91, rebounding: 93, defence: 97, speed: 92, stamina: 94, handles: 79, passing: 93, athleticiem: 97, physicality: 84 } }, 
  { name: "allie & callie", tier: "Bronze", bad: true, stats: { scoring: 1, iq: 0, rebounding: 0, defence:0, speed: 0, stamina: 5, handles: 0, passing: 7, athleticiem: 44, physicality: 1  }
},
  // Diesem from H.S. Paul: super rare, 97 overall
  { name: "Diesem", display: "Diesem", hs: true, chanceKey: "diesem", tier: "H.S. Paul", stats: { scoring: 98, iq: 96, rebounding: 95, defence: 97, speed: 98, stamina: 97, handles: 98, passing: 96, athleticiem: 98, physicality: 97 } }
];

// ===== SAVED STUFF (settings, chances, gifs, custom players...) =====
function lsGet(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

const SPEED_GIF = "https://media1.tenor.com/m/lJbFfmCxHhwAAAAd/ishowspeed-oooo.gif";
const LOSE_VIDEO = "https://i.makeagif.com/media/12-14-2024/xVwLkc.mp4";
const TESTER_GIF = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjdnNXZ3Y3g3MjhvdXBndzJic3Z3MzlodnB1OWQ4ajc1MG1wenptZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vt1Wcut8Dvu4JXoFFF/giphy.gif";
const HALF_GIF = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVtbDZjZG5xODB1enB5eW44MjQ0dXdoa3Q0MHE5MjJzNHpiYzlkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WykUqckDqi95YIqtFZ/giphy.gif";

const DEFAULT_SETTINGS = { accent: '#0071e3', anim: true, gifs: true, tabs: true, rollColors: true, loseScreen: true, noCooldown: false };

// All the spin odds live here (also editable in the secret menu -> Chances)
const DEFAULT_CHANCES = {
  nba: 1,        // % per spin to pull a real NBA All-Star
  diamond: 10,   // % of NBA pulls that get the DIAMOND tab (8x Nico chance next roll)
  bryden: 30,    // % per GAME/round that Bryden shows up on one of your picks (about 1 in 3 games)
  nico: 1.8,     // base % per spin (multiplied by 3 normally)
  bad: 3,        // % per spin for a benchwarmer
  gold: 1.5,     // weight of Gold players (Josh, Esrom, Jackson). LOW = gold is hard to get
  mid: 2.5,      // weight of regular players
  weak: 1.3,     // weight of weak players
  la: 1.5,       // % per spin for "Esrom back from LA"
  diesem: 0.5,   // % per spin for Diesem (H.S. Paul)
  password: 40   // % per attempt to open the password lock
};
const DEFAULT_GIFS = {
  bryden: "https://i.kym-cdn.com/photos/images/original/003/153/286/f3a.gif",
  lose: LOSE_VIDEO, nba: HALF_GIF, diamond: HALF_GIF, nico: SPEED_GIF,
  la: "", ose: "", dies: "", half: HALF_GIF, tester: TESTER_GIF
};
const GIF_LABELS = {
  bryden: "Trapped by Bryden tab", lose: "Lose screen", nba: "Gold NBA tab", diamond: "Diamond NBA tab",
  nico: "Nico (OMG) tab", la: "Esrom back from LA tab", ose: "Developer / Ose tab (blank = no popup)",
  dies: "Diesem (H.S. Paul) popup", half: "Halftime show (tournament) + after an NBA pull", tester: "Not a game tester screen"
};
const CHANCE_LABELS = {
  nba: "NBA All-Star chance (% per spin)", diamond: "Diamond tab chance (% of NBA pulls)",
  bryden: "Bryden chance (% per game/round, 30 = about 1 in 3 games)", nico: "Nico base chance (% per spin, x3 normally)",
  bad: "Benchwarmer chance (% per spin)", gold: "Gold player weight (Josh, Esrom, Jackson)",
  mid: "Regular player weight", weak: "Weak player weight", la: "Esrom back from LA chance (% per spin)",
  diesem: "Diesem (H.S. Paul) chance (% per spin)", password: "Password lock chance (% per attempt)"
};
const DEFAULT_ROUNDS = [
  { opp: 'Westside Hoopers', ovr: 74 },
  { opp: 'EGM Elites', ovr: 82 },
  { opp: 'EGM Legends', ovr: 89 }
];

let settings = Object.assign({}, DEFAULT_SETTINGS, lsGet('egm_settings', {}));
let CH = Object.assign({}, DEFAULT_CHANCES, lsGet('egm_chances', {}));
if (CH.gold === 12.9) CH.gold = DEFAULT_CHANCES.gold; // old default: gold is harder now
if (lsGet('egm_ch_v', 0) < 2) { CH.bryden = DEFAULT_CHANCES.bryden; lsSet('egm_chances', CH); lsSet('egm_ch_v', 2); } // Bryden is now per game
let GIFS = Object.assign({}, DEFAULT_GIFS, lsGet('egm_gifs', {}));
if (!GIFS.half) GIFS.half = HALF_GIF;
if (!GIFS.tester) GIFS.tester = TESTER_GIF;
if (lsGet('egm_gif_v', 0) < 2) { // NBA pulls now show the halftime gif
  if (!GIFS.nba || GIFS.nba === SPEED_GIF) GIFS.nba = HALF_GIF;
  if (!GIFS.diamond || GIFS.diamond === SPEED_GIF) GIFS.diamond = HALF_GIF;
  lsSet('egm_gifs', GIFS); lsSet('egm_gif_v', 2);
}
let TEXT_OVR = lsGet('egm_text', {});
let customPlayers = lsGet('egm_players', []);
let customRounds = lsGet('egm_rounds', null);
let GOD = lsGet('egm_god', false); // "win everything" switch

let EGM_PLAYERS = [];
function normalizeCustom(c) {
  // (custom popup settings live in c.pop)
  const p = { name: c.name, tier: c.tier, stats: c.stats, chance: +c.chance || 0 };
  if (c.tier === 'NBA All-Star') p.nba = true;
  if (c.tier === 'Benchwarmer') p.bad = true;
  const base = BASE_PLAYERS.find(b => b.name === c.name);
  if (base) { p.display = base.display; p.la = base.la; p.hs = base.hs; p.chanceKey = base.chanceKey; }
  if (c.pop) p.pop = c.pop;
  return p;
}
function rebuildPlayers() {
  const names = customPlayers.map(p => p.name);
  EGM_PLAYERS = BASE_PLAYERS.filter(p => !names.includes(p.name)).concat(customPlayers.map(normalizeCustom));
}
rebuildPlayers();

let playerBuild = {};
let usedPlayers = [];
let reSpinsRemaining = 3;
let currentRolledPlayer = null;
let savedOverallScore = null;
let badAppearances = 0;
let currentDifficulty = 'medium', aiBuild = {}, aiUsed = [], aiOverall = null;
let pendingReward = null, firstSpinBoost = null;
let myPicks = {};
let gameStarted = false, trapped = false, gameOver = false, nicoCharges = 0;
let forceNba = false, forceNextName = null;
let nicoBoost = false;                           // diamond tab: 8x Nico chance on the next roll
let bonusNext = { respins: 0, wheel: 0 };        // secret menu bonuses for the next game
let scoreClicks = 0, respinClicks = 0;           // hidden password lock sequence
let brydenAt = -1;                               // which pick Bryden shows up on this game (-1 = not this game)
let TOUR = null;                                 // the tournament in progress
let lastOpts = {};                               // options of the current game (2 player perks), reused by Restart
let globalLeaderboard = [
  { name: "Nico_EGM_AllStar", overall: 96, grade: "Superstar" },
  { name: "Josh_Gold_Draft", overall: 91, grade: "Superstar" },
  { name: "Esrom_Max_Build", overall: 89, grade: "All-Star" }
];

// Powers, luck, grants, admin extras
const X = {
  powers: Object.assign({ wheel: 0, luck: 0, respin: 0, medium: 0, hard: 0 }, lsGet('egm_powers', {})), // owned powers
  armed: { wheel: 0, luck: 0, respin: 0, medium: 0, hard: 0 },                                         // armed for the next game
  grants: lsGet('egm_grants', {}),                                      // granted wins {mode: n, any: n}
  fanReady: lsGet('egm_fan_ready', false),                              // secret button visible
  adminLuck: lsGet('egm_adminluck', 1),
  forceEvery: lsGet('egm_forceevery', ''),
  wholeGame: lsGet('egm_whole', true),
  heldW: 0, heldL: 0, luckLeft: 0, luckActive: false,
  pendingTour: false, forceWin: false
};
function persist() {
  lsSet('egm_powers', X.powers); lsSet('egm_grants', X.grants); lsSet('egm_fan_ready', X.fanReady);
  lsSet('egm_adminluck', X.adminLuck); lsSet('egm_forceevery', X.forceEvery); lsSet('egm_whole', X.wholeGame);
}

// ===== SMALL HELPERS =====
function playerAvg(p) { const vals = Object.values(p.stats); return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length); }
function rareChance(p, C) { C = C || CH; return p.chanceKey ? (C[p.chanceKey] || 0) : (p.chance || 0); }
function isRare(p) { return !!p.chanceKey || (+p.chance > 0); }   // rare players only come from their own chance (0 = never)
function boom(o) { if (settings.anim && typeof confetti === 'function') confetti(o); }
function chancesEdited() { return Object.keys(DEFAULT_CHANCES).some(k => k !== 'password' && CH[k] !== DEFAULT_CHANCES[k]); }
// When you edit chances in the admin panel they apply for the WHOLE game (repeats allowed, no benchwarmer cap)
function wholeGame() { return X.wholeGame && chancesEdited(); }

// LED rainbow text: every letter cycles through colors
function ledify(t) {
  return '<span class="led">' + Array.from(String(t)).map((c, i) => '<span style="--i:' + i + '">' + (c === ' ' ? '&nbsp;' : esc(c)) + '</span>').join('') + '</span>';
}

function toast(msg, ms) {
  let t = $('egm-toast');
  if (!t) { t = document.createElement('div'); t.id = 'egm-toast'; document.body.appendChild(t); }
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), ms || 2600);
}

function mediaHtml(url, cls) {
  if (!settings.gifs || !url) return '';
  cls = cls || 'trapped-gif';
  if (/\.(mp4|webm)(\?|$)/i.test(url)) return '<video class="' + cls + '" src="' + esc(url) + '" autoplay loop muted playsinline></video>';
  return '<img class="' + cls + '" src="' + esc(url) + '" alt="">';
}

// ===== SETTINGS =====
function saveSettings() { lsSet('egm_settings', settings); }
function applySettings() {
  const root = document.documentElement.style;
  root.setProperty('--accent', settings.accent);
  root.setProperty('--accent-2', settings.accent.toLowerCase() === '#0071e3' ? '#0a84ff' : settings.accent);
}
function syncSettingsUI() {
  const map = { 'set-anim': 'anim', 'set-gifs': 'gifs', 'set-tabs': 'tabs', 'set-rollcolors': 'rollColors', 'set-lose': 'loseScreen', 'set-nocd': 'noCooldown' };
  Object.keys(map).forEach(id => { const c = $(id); if (c) c.checked = !!settings[map[id]]; });
  const col = $('set-color'); if (col) col.value = settings.accent;
  document.querySelectorAll('.swatch').forEach(b => b.classList.toggle('on', b.dataset.c.toLowerCase() === settings.accent.toLowerCase()));
}
function initSettingsUI() {
  const sw = $('set-swatches');
  ['#0071e3', '#ff453a', '#30d158', '#bf5af2', '#ff9f0a', '#ff375f', '#64d2ff', '#ffd60a'].forEach(c => {
    const b = document.createElement('button');
    b.className = 'swatch'; b.dataset.c = c; b.style.background = c;
    b.onclick = () => { settings.accent = c; saveSettings(); applySettings(); syncSettingsUI(); };
    sw.appendChild(b);
  });
  $('set-color').oninput = e => { settings.accent = e.target.value; saveSettings(); applySettings(); syncSettingsUI(); };
  const map = { 'set-anim': 'anim', 'set-gifs': 'gifs', 'set-tabs': 'tabs', 'set-rollcolors': 'rollColors', 'set-lose': 'loseScreen', 'set-nocd': 'noCooldown' };
  Object.keys(map).forEach(id => {
    $(id).onchange = e => {
      settings[map[id]] = e.target.checked; saveSettings();
      if (!settings.tabs) { const rt = $('rank-tab'); if (rt) rt.className = 'rank-tab hidden'; }
      if (!settings.rollColors) clearRollTheme();
    };
  });
  $('set-reset').onclick = () => { settings = Object.assign({}, DEFAULT_SETTINGS); saveSettings(); applySettings(); syncSettingsUI(); };
  syncSettingsUI();
}

// ===== EDITABLE TEXT =====
let TEXT_ENTRIES = [];
function scanText() {
  const skipIds = ['player-name', 'overall-rating', 'ai-overall', 'user-court-ovr', 'cpu-court-ovr', 'ai-status', 'reward-banner', 'difficulty-tag', 'respin-btn', 'lucky-btn', 'luck-btn', 'rank-tab', 'egm-toast', 'twop-lock'];
  let i = 0;
  document.querySelectorAll('#home-screen *, #game-screen *').forEach(e => {
    if (e.children.length || !e.textContent.trim()) return;
    if (skipIds.includes(e.id)) return;
    if (e.closest('#draft-pool, #my-build, #ai-build, #match-ticker-box, #leaderboard-rows, #set-swatches, #tab-powers, #tab-players')) return;
    e.dataset.tkey = 't' + (i++);
    TEXT_ENTRIES.push({ key: e.dataset.tkey, def: e.textContent.trim(), el: e });
  });
}
function applyTexts() {
  TEXT_ENTRIES.forEach(en => {
    const v = TEXT_OVR[en.key];
    if (v) { en.el.textContent = v; en.el.dataset.ov = '1'; }
    else if (en.el.dataset.ov) { en.el.textContent = en.def; delete en.el.dataset.ov; }
  });
}

// ===== ROLL COLORS + RANK TAB =====
function clearRollTheme() {
  const g = $('game-screen'); if (!g) return;
  g.className = g.className.split(' ').filter(c => c && !c.startsWith('rt-')).join(' ');
}
function setRollTheme(t) { if (!settings.rollColors || !t) return; const g = $('game-screen'); if (g) g.classList.add('rt-' + t); }
function showRankTab(sp) {
  const el = $('rank-tab'); if (!el) return;
  el.removeAttribute('style');
  if (!settings.tabs || !sp.tabText) { el.className = 'rank-tab hidden'; el.innerHTML = ''; return; }
  el.className = 'rank-tab ' + sp.tabClass;
  if (sp.tabStyle) el.setAttribute('style', sp.tabStyle);
  el.innerHTML = sp.led ? ledify(sp.tabText) : sp.tabText;
}

function baseLook(p) {
  if (p.name === 'Bryden') return { label: '⚠️ TRAPPED BY BRYDEN (no re-spins!)', color: '#ff9f0a', tabClass: 'bench', tabText: '⚠️ TRAPPED' };
  if (p.bad) return { label: '😬 BENCHWARMER', color: '#ff9f0a', tabClass: 'bench', tabText: '😬 BENCHWARMER' };
  if (p.tier === 'All-Star') return { label: '🔥 LUCKY ALL-STAR', color: '#ff453a', tabClass: 'nico', tabText: '🔴 ALL-STAR' };
  if (p.tier === 'Gold') return { label: 'Gold', color: '#ffd60a', tabClass: 'gold', tabText: '🥇 GOLD' };
  if (p.tier === 'Gold+') return { label: 'Gold+', color: '#ffb52e', tabClass: 'la', tabText: '🥇 GOLD+' };
  if (p.tier === 'Bronze') return { label: 'Bronze', color: '#ff9f0a', tabClass: 'bronze', tabText: '🥉 BRONZE' };
  return { label: p.tier, color: '#8e8e93', tabClass: 'silver', tabText: '🥈 ' + String(p.tier).toUpperCase() };
}

function hexToRgba(h, a) {
  h = String(h || '#ff9f0a').replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16) || 0;
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
}

// A player with a custom popup (made in Admin > Players) looks like this when rolled
function customLook(p) {
  const c = p.pop, name = p.display || p.name, col = c.color || '#ff9f0a';
  return {
    theme: null, tabClass: 'custom', tabText: esc(c.tab || ('✨ ' + name.toUpperCase())), label: '✨ ' + esc(c.tab || 'CUSTOM'), color: col, confetti: false,
    tabStyle: 'background:' + hexToRgba(col, .2) + ';border-color:' + col + ';color:' + col + ';box-shadow:0 0 26px ' + hexToRgba(col, .7),
    overlay: { custom: { color: col, anim: c.anim || 'slam', fx: c.fx || 'sprinkles' }, title: esc(c.title || ('✨ ' + name + '! ✨')), chains: '✨ ⭐ ✨', chat: c.chat ? esc(c.chat) : '', gifUrl: c.gif || '' }
  };
}

// pv = preview mode (admin Preview tab): no side effects, diamond can be picked
function specialFor(p, pv) {
  if (p.pop && p.pop.on) return customLook(p);
  const base = baseLook(p);
  if (p.name === 'Diesem' || p.hs) {
    return { theme: 'paul', tabClass: 'paul', tabText: '🏫 H.S. PAUL · HEAD TEAM', label: '🏫 H.S. PAUL', color: '#e0b0ff', confetti: true,
      overlay: { theme: 'paul', title: '🏫 DIESEM FROM H.S. PAUL! 🏫', chains: '🔥 🏫 🔥', chat: 'You rolled Diesem, the head of H.S. Paul. SUPER RARE · 97 overall', gifKey: 'dies' } };
  }
  if (p.nba) {
    const diamond = pv ? !!pv.diamond : Math.random() * 100 < CH.diamond;
    if (diamond && !pv) nicoBoost = true;
    return {
      theme: diamond ? 'diamond' : 'gold', tabClass: diamond ? 'diamond' : 'gold',
      tabText: diamond ? '💎 DIAMOND TAB' : '🌟 GOLD TAB', label: diamond ? '💎 DIAMOND NBA ALL-STAR' : '🌟 NBA ALL-STAR',
      color: diamond ? '#64d2ff' : '#ffd60a', confetti: diamond,   // no confetti for gold
      overlay: {
        theme: diamond ? 'diamond' : 'gold', title: diamond ? '💎 DIAMOND NBA PULL! 💎' : '🌟 NBA ALL-STAR PULL! 🌟',
        chains: diamond ? '💎 ⭐ 💎' : '🏆 ⭐ 🏆',
        chat: p.name + ' · ALL STATS 100 😱' + (diamond ? ' · 8× NICO CHANCE NEXT ROLL!' : ''), gifKey: diamond ? 'diamond' : 'nba'
      }
    };
  }
  if (p.name === 'Nico') {
    return { theme: 'nico', tabClass: 'nico', tabText: '🔴 ALL-STAR · NICO', label: '🔥 LUCKY ALL-STAR', color: '#ff453a', confetti: true,
      overlay: { theme: 'red', title: '😱 OMG!! YOU GOT NICO!! 😱', chains: '🔴 🔥 🔴', chat: 'Nico · ALL-STAR · the Speed sticker approves 🔊', gifKey: 'nico' } };
  }
  if (p.la) {
    return { theme: 'la', tabClass: 'la', tabText: '🌴 GOLD+ · BACK FROM LA', label: '🌴 BACK FROM LA', color: '#ff9f0a', confetti: true,
      overlay: { theme: 'la', title: '🌴 ESROM IS BACK FROM LA 🌴', chains: '✨ 🥇 ✨', chat: 'GOLD+ · stats bumped up 🔥', gifKey: 'la' } };
  }
  if (p.tier === 'Developer!') {
    // no confetti, no rainbow menu theme: only the rainbow DEVELOPER rank stays
    return { theme: null, tabClass: 'ose', tabText: 'DEVELOPER', label: 'DEVELOPER', led: true, confetti: false,
      overlay: GIFS.ose ? { theme: 'ose', title: '👑 DEVELOPER PULL 👑', chains: '🌈 🌈 🌈', chat: (p.display || p.name) + ' · the creator', gifKey: 'ose' } : null };
  }
  return { theme: null, tabClass: base.tabClass, tabText: base.tabText, label: base.label, color: base.color, overlay: null };
}

// Good pulls feel good (no confetti for plain Gold)
function hype(p, sp) {
  const avg = playerAvg(p);
  if (sp.confetti) boom({ particleCount: p.nba ? 200 : 130, spread: 100, origin: { y: 0.5 }, zIndex: 10000 });
  else if (p.tier === 'Gold' || avg >= 90) toast('🔥 ELITE PULL! ' + (p.display || p.name) + ' · avg ' + avg);
  else if (avg >= 80) toast('💪 Solid pull · avg ' + avg);
}

// ===== PASSWORD LOCK (hidden) =====
// Click the Scoring emoji 3 times + hit Re-spin 3 times -> the lock tries to open
function revealSecretBtn() { const b = $('secret-btn'); if (b) b.classList.remove('hidden'); }
function pwProgress() {
  if (scoreClicks < 3 || respinClicks < 3) return;
  scoreClicks = 0; respinClicks = 0;
  if (lsGet('egm_pw_unlocked', false)) { toast('🔑 The password tab is already unlocked. Check the home screen.'); return; }
  if (lsGet('egm_pw_blocked', false)) { toast('🔒 The Lock has not found thee worthy.<br>Lock not worthy.', 4200); return; }
  const tries = lsGet('egm_pw_tries', 0) + 1;
  lsSet('egm_pw_tries', tries);
  if (Math.random() * 100 < CH.password) {
    lsSet('egm_pw_unlocked', true); revealSecretBtn();
    boom({ particleCount: 120, spread: 90, origin: { y: 0.6 }, zIndex: 10000 });
    toast('🔓 The lock opened! The 🔑 tab is now on the home screen.', 4200);
  } else if (tries >= 3) {
    lsSet('egm_pw_blocked', true);
    toast('🔒 The Lock has not found thee worthy.<br>Lock not worthy.', 4200);
  } else {
    const left = 3 - tries;
    toast("🔒 Lock didn't budge. Try again later. (" + left + (left === 1 ? ' try' : ' tries') + ' left)', 3500);
  }
}
// Dev escape hatch: type egmResetLock() in the browser console
window.egmResetLock = function () {
  lsSet('egm_pw_tries', 0); lsSet('egm_pw_blocked', false); lsSet('egm_pw_unlocked', true); revealSecretBtn();
  return 'Lock reset, 🔑 tab unlocked.';
};

// ===== BUILD LAYOUT / SCORES =====
function initBuildLayout() {
  const myBuildDiv = $('my-build');
  if (!myBuildDiv) return;
  myBuildDiv.innerHTML = '';
  playerBuild = {}; savedOverallScore = null; currentRolledPlayer = null; badAppearances = 0;
  aiBuild = {}; aiUsed = []; aiOverall = null; myPicks = {};
  ATTRIBUTES.forEach(a => { aiBuild[a.id] = null; });
  renderAIBuild();
  $('ai-overall').innerText = 'AI OVERALL: ??';

  ATTRIBUTES.forEach(attr => {
    playerBuild[attr.id] = null;
    const row = document.createElement('div');
    row.id = 'slot-container-' + attr.id;
    row.className = 'inventory-row-slot';
    row.innerHTML = '<span class="inventory-label"><span>' + attr.emoji + '</span><span>' + attr.name + '</span></span>' +
      '<span class="inventory-val-badge" id="saved-' + attr.id + '">-</span>';
    myBuildDiv.appendChild(row);
  });

  $('overall-rating').innerText = "OVERALL: --";
  $('draft-pool').innerHTML = '<div class="placeholder-notice">Click "SPIN PLAYER" above to reveal classmate cards and bank your traits.</div>';
  $('player-name').innerText = "🎰 HIT SPIN TO START";
  const simBtn = $('simulate-match-btn'); if (simBtn) simBtn.disabled = true;
  const userOvr = $('user-court-ovr'); if (userOvr) userOvr.innerText = "OVR: --";
}

function updateOverallScore() {
  const overallText = $('overall-rating');
  if (!overallText) return;
  let total = 0, counted = 0;
  ATTRIBUTES.forEach(attr => { if (playerBuild[attr.id] !== null) { total += playerBuild[attr.id]; counted++; } });
  if (counted === 0) return;
  const avg = Math.round(total / counted);
  savedOverallScore = avg;
  // The overall stays hidden until the whole team is built
  if (counted === ATTRIBUTES.length) overallText.innerText = 'OVERALL: ' + avg + ' | ' + getTierName(avg);
}

function getTierName(avg) {
  if (avg >= 95) return "Generational";
  if (avg >= 90) return "Superstar";
  if (avg >= 80) return "All-Star";
  return "Role Player";
}

function buildEndStats() {
  const col = (title, cls, get) => '<div class="end-col"><h4>' + title + '</h4><div class="end-rows">' +
    ATTRIBUTES.map(a => '<div class="inventory-row-slot ' + cls + '"><span class="inventory-label"><span>' + a.emoji + '</span><span>' + a.name + '</span></span><span class="inventory-val-badge">' + get(a) + '</span></div>').join('') +
    '</div></div>';
  let html = col('🧍 Your Build', 'active-filled', a => String(myPicks[a.id]).replace(' (LA)', '') + ' ' + playerBuild[a.id]);
  if (!NO_AI_MODES.includes(currentDifficulty)) {
    html += col('🤖 AI Build (' + DIFFICULTY[currentDifficulty].label + ')', 'ai-filled', a => aiBuild[a.id].player.replace(' (LA)', '') + ' ' + aiBuild[a.id].value);
  }
  return '<div class="end-grid">' + html + '</div>';
}

function showOverallReveal(avg, tierName, result, onClose) {
  const old = $('overall-overlay'); if (old) old.remove();
  const overlay = document.createElement('div');
  overlay.id = 'overall-overlay';
  overlay.innerHTML = '<div class="overall-box">' +
    '<div class="overall-label">YOUR FINAL OVERALL</div>' +
    '<div class="overall-number">0</div>' +
    '<div class="overall-tier">' + tierName + '</div>' +
    '<div class="overall-result">' + result.html + '</div>' +
    buildEndStats() +
    '<div class="overall-sub">Tap to continue</div>' +
    '</div>';

  // Count the number up from 0
  const numEl = overlay.querySelector('.overall-number');
  let shown = 0;
  const step = Math.max(1, Math.ceil(avg / 40));
  const timer = setInterval(() => { shown = Math.min(avg, shown + step); numEl.innerText = shown; if (shown >= avg) clearInterval(timer); }, 35);

  let closed = false;
  overlay.onclick = () => {
    if (closed) return;
    closed = true; clearInterval(timer);
    overlay.classList.add('overall-out');
    setTimeout(() => { overlay.remove(); if (onClose) onClose(); }, 400);
  };
  document.body.appendChild(overlay);
  if ((avg >= 90 || result.champion) && typeof confetti === "function") boom({ particleCount: 150, spread: 90, origin: { y: 0.5 }, zIndex: 10000 });
}

function lockOverlay(overlay, subEl, seconds, close) {
  if (seconds <= 0) { overlay.style.cursor = 'pointer'; subEl.innerText = 'Tap to continue'; overlay.onclick = close; return; }
  let left = seconds, ready = false;
  overlay.style.cursor = 'not-allowed';
  subEl.innerText = 'Wait ' + left + '...';
  const t = setInterval(() => {
    left--;
    if (left <= 0) { clearInterval(t); ready = true; overlay.style.cursor = 'pointer'; subEl.innerText = 'Tap to continue'; }
    else subEl.innerText = 'Wait ' + left + '...';
  }, 1000);
  overlay.onclick = () => { if (ready) close(); };
}

// ----- sprinkles and other effects (also used by the admin previews) -----
const FX_TYPES = { none: 'None', sprinkles: '🍬 Sprinkles', confetti: '🎊 Confetti', stars: '⭐ Stars', hearts: '💖 Hearts', fire: '🔥 Fire', snow: '❄️ Snow', sparks: '✨ Sparks' };
const ANIM_TYPES = { slam: 'Slam + shake', bounce: 'Bounce', spin: 'Spin in', zoom: 'Zoom', drop: 'Drop', flip: 'Flip', glow: 'Glow pulse' };
function spawnFx(box, fx, color) {
  if (!box || !fx || fx === 'none') return;
  const old = box.querySelector(':scope > .fx-layer'); if (old) old.remove();
  const layer = document.createElement('div');
  layer.className = 'fx-layer';
  box.appendChild(layer);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const hues = ['#ff453a', '#ff9f0a', '#ffd60a', '#30d158', '#64d2ff', '#0a84ff', '#bf5af2', '#ff375f'];
  for (let i = 0; i < 40; i++) {
    const sp = document.createElement('span');
    sp.className = 'fx-p';
    sp.style.setProperty('--x', rnd(2, 96) + '%');
    sp.style.setProperty('--d', rnd(0, 2.4) + 's');
    sp.style.setProperty('--t', rnd(1.8, 3.6) + 's');
    if (fx === 'sprinkles') { sp.classList.add('sp'); sp.style.background = hues[i % hues.length]; sp.style.setProperty('--r', Math.floor(rnd(0, 180)) + 'deg'); }
    else if (fx === 'confetti') { sp.classList.add('cf'); sp.style.background = hues[i % hues.length]; }
    else if (fx === 'sparks') { sp.classList.add('spark'); sp.style.background = color || '#fff'; sp.style.setProperty('--y', rnd(5, 95) + '%'); }
    else {
      sp.classList.add('em');
      sp.textContent = { stars: '⭐', hearts: '💖', fire: '🔥', snow: '❄️' }[fx] || '✨';
      sp.style.setProperty('--s', rnd(12, 26) + 'px');
      if (fx === 'fire' || fx === 'hearts') sp.classList.add('rise');
    }
    layer.appendChild(sp);
  }
}

// The inside of a big popup (also used for the small square previews)
function popupInner(opts, withSub) {
  const c = opts.custom;
  const url = opts.gifUrl || (opts.gifKey ? GIFS[opts.gifKey] : '');
  const tstyle = c ? ' style="color:' + c.color + ';text-shadow:0 0 20px ' + c.color + ',0 0 50px ' + hexToRgba(c.color, .6) + '"' : '';
  return '<div class="trapped-box' + (c ? ' an-' + c.anim : '') + '">' +
    '<div class="trapped-chains">' + (opts.chains || '⛓️ ⛓️ ⛓️') + '</div>' +
    '<div class="trapped-text"' + tstyle + '>' + (opts.title || '⚠️ TRAPPED BY BRYDEN ⚠️') + '</div>' +
    (opts.chat ? '<div class="trapped-chat">' + opts.chat + '</div>' : '') +
    mediaHtml(url) +
    (withSub ? '<div class="trapped-sub"></div>' : '') +
    '</div>';
}

// The big popup (Bryden trap, NBA pull, Nico, Esrom LA, Diesem, lose screen, custom players...)
// opts.noSkip = the "skip the wait" setting does not apply (Bryden). opts.preview = show even if animations are off.
function showTrappedOverlay(opts) {
  opts = opts || {};
  // Animations off -> skip the popup but still continue the game flow
  if (!settings.anim && !opts.preview) { if (opts.onClose) setTimeout(opts.onClose, 0); return; }
  const old = $('trapped-overlay'); if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'trapped-overlay';
  if (opts.theme) overlay.classList.add(opts.theme);
  if (opts.custom) overlay.style.background = 'radial-gradient(circle, ' + hexToRgba(opts.custom.color, .55) + ', rgba(0,0,0,.96))';
  overlay.innerHTML = popupInner(opts, true);

  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    overlay.classList.add('trapped-out');
    setTimeout(() => { overlay.remove(); if (opts.onClose) opts.onClose(); }, 400);
  };
  document.body.appendChild(overlay);
  if (opts.custom) spawnFx(overlay, opts.custom.fx, opts.custom.color);
  const wait = opts.lock === undefined ? 3 : opts.lock;
  lockOverlay(overlay, overlay.querySelector('.trapped-sub'), (settings.noCooldown && !opts.noSkip) ? 0 : wait, close);
}

// ===== ROLLING =====
function rollPlayer(mode, forced) {
  mode = mode || 'spin';
  const playerNameDiv = $('player-name');
  const whole = wholeGame();
  const pool0 = whole ? EGM_PLAYERS.slice() : EGM_PLAYERS.filter(p => !usedPlayers.includes(p.name));
  // Diesem (H.S. Paul) can ONLY be rolled in Tournament
  const available = pool0.filter(p => !p.hs || currentDifficulty === 'tournament');

  if (available.length === 0 || ATTRIBUTES.every(attr => playerBuild[attr.id] !== null)) {
    if (playerNameDiv) playerNameDiv.innerText = "ROSTER LOCKED";
    return;
  }

  if (forced) { currentRolledPlayer = forced; finishRoll(); return; }

  // Admin: force every spin / force next spin
  let fname = forceNextName; forceNextName = null;
  if (!fname && X.forceEvery) fname = X.forceEvery;
  if (fname) {
    const f = pool0.find(p => p.name === fname); // admin force can override
    if (f) { currentRolledPlayer = f; finishRoll(); return; }
  }

  // Luck: admin multiplier on every spin, plus the 8x luck power for one spin
  let m = Math.max(1, +X.adminLuck || 1);
  if (X.luckActive) { m = Math.max(m, 8); X.luckActive = false; }

  // Bryden: ~30% of games he shows up once, on a random pick (luck can save you)
  const brydenP = available.find(p => p.name === 'Bryden');
  if (brydenAt >= 0 && usedPlayers.length >= brydenAt && mode === 'spin' && brydenP) {
    brydenAt = -1;
    if (Math.random() < 1 / m) { currentRolledPlayer = brydenP; finishRoll(); return; }
  }
  const C = Object.assign({}, CH);
  if (m > 1) {
    ['nba', 'nico', 'la', 'diesem', 'gold'].forEach(k => { C[k] = (C[k] || 0) * m; });
    ['bryden', 'bad'].forEach(k => { C[k] = (C[k] || 0) / m; });
  }

  // NBA All-Star pull
  const nbaPool = available.filter(p => p.nba);
  if (nbaPool.length && (forceNba || Math.random() * 100 < C.nba)) {
    forceNba = false;
    currentRolledPlayer = nbaPool[Math.floor(Math.random() * nbaPool.length)];
    finishRoll(); return;
  }

  // Rare players with their own chance (Esrom back from LA, Diesem, custom rares)
  const rares = available.filter(p => !p.nba && isRare(p) && rareChance(p, C) > 0);
  for (const p of rares) {
    if (Math.random() * 100 < rareChance(p, C)) { currentRolledPlayer = p; finishRoll(); return; }
  }

  // Normal re-spins are 1x, lucky re-spins are 2x luck,
  // and a won reward boosts your first spin of the next game
  const goodMult = mode === 'lucky' ? 2 : 1;
  let nicoMult = 3, midMult = 3;
  if (mode === 'spin' && firstSpinBoost) {
    if (firstSpinBoost === 'hard') nicoMult = 9;
    if (firstSpinBoost === 'medium') { nicoMult = 6; midMult = 6; }
    setStatus(DIFFICULTY[firstSpinBoost].reward + ' (active this spin!)');
    firstSpinBoost = null;
  }
  if (nicoBoost) { nicoMult *= 8; nicoBoost = false; setStatus('💎 DIAMOND BOOST: 8× Nico chance on this roll!'); }

  const BRYDEN_CHANCE = 0; // Bryden is decided once per game (see brydenAt)
  const NICO_CHANCE = C.nico * goodMult * nicoMult;
  const BAD_CHANCE = C.bad;
  const BAD_MAX_PER_ROUND = whole ? 999 : 2;

  const roll = Math.random() * 100;
  const bryden = available.find(p => p.name === "Bryden");
  const nico = available.find(p => p.name === "Nico");

  if (roll < BRYDEN_CHANCE && bryden) {
    currentRolledPlayer = bryden;
  } else if (roll >= BRYDEN_CHANCE && roll < BRYDEN_CHANCE + NICO_CHANCE && nico) {
    currentRolledPlayer = nico;
  } else if (roll >= BRYDEN_CHANCE + NICO_CHANCE && roll < BRYDEN_CHANCE + NICO_CHANCE + BAD_CHANCE &&
    badAppearances < BAD_MAX_PER_ROUND && available.some(p => p.bad)) {
    const badPool = available.filter(p => p.bad);
    currentRolledPlayer = badPool[Math.floor(Math.random() * badPool.length)];
    badAppearances++;
  } else {
    // Weighted pick among everyone else still available
    let others = available.filter(p => p.name !== "Bryden" && p.name !== "Nico" && !p.bad && !p.nba && !isRare(p));
    if (others.length === 0) others = available;
    const weights = others.map(p => {
      if (p.tier === 'Gold') return C.gold * goodMult;
      const avg = playerAvg(p);
      if (avg >= 90) return C.gold * goodMult;
      if (avg >= 67) return C.mid * midMult;
      return C.weak;
    });
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let pick = Math.random() * totalWeight;
    let chosen = others[others.length - 1];
    for (let i = 0; i < others.length; i++) {
      pick -= weights[i];
      if (pick < 0) { chosen = others[i]; break; }
    }
    currentRolledPlayer = chosen;
  }
  finishRoll();
}

function finishRoll() {
  const p = currentRolledPlayer;
  const playerNameDiv = $('player-name');
  clearRollTheme();
  const sp = specialFor(p);
  const shown = p.display || p.name;

  if (playerNameDiv) {
    const nameHtml = sp.led ? ledify(shown) : shown;
    const labelHtml = sp.led ? ledify(sp.label) : '<span style="color:' + sp.color + '">' + sp.label + '</span>';
    playerNameDiv.innerHTML = nameHtml + ' ' + labelHtml;
  }
  setRollTheme(sp.theme);
  showRankTab(sp);
  renderStatSelectionList();
  trapped = p.name === "Bryden";
  updateSpinButtons();
  hype(p, sp);

  if (trapped) {
    setStatus("🔒 Trapped by Bryden! No re-spins. Pick a stat or hit Restart.");
    showTrappedOverlay({ gifKey: 'bryden', chat: 'ggs friken easy 😂 😭✌️', noSkip: true });
  }
  if (sp.overlay) showTrappedOverlay(sp.overlay);
}

function renderStatSelectionList() {
  const draftPoolDiv = $('draft-pool');
  if (!draftPoolDiv) return;
  draftPoolDiv.innerHTML = '';

  ATTRIBUTES.forEach(attr => {
    const btn = document.createElement('button');
    btn.className = 'picker-row-btn';
    const statValue = currentRolledPlayer.stats[attr.id] || 0;

    if (playerBuild[attr.id] !== null) {
      btn.disabled = true;
      btn.innerHTML = '<span class="picker-label-group"><span>' + attr.emoji + '</span><span>' + attr.name + '</span></span><span class="picker-num-badge">FILLED</span>';
    } else {
      btn.innerHTML = '<span class="picker-label-group"><span>' + attr.emoji + '</span><span>' + attr.name + '</span></span><span class="picker-num-badge">' + statValue + '</span>';

      // Hidden: clicking the Scoring emoji (not the button) counts toward the password lock
      if (attr.id === 'scoring') {
        const em = btn.querySelector('.picker-label-group span');
        if (em) em.onclick = e => { e.stopPropagation(); scoreClicks++; pwProgress(); };
      }

      btn.onclick = function () {
        playerBuild[attr.id] = statValue;
        myPicks[attr.id] = currentRolledPlayer.name;
        usedPlayers.push(currentRolledPlayer.name);
        $('saved-' + attr.id).innerText = statValue;
        $('slot-container-' + attr.id).classList.add('active-filled');
        aiTakeTurn(currentRolledPlayer.name);
        updateOverallScore();

        if (ATTRIBUTES.every(a => playerBuild[a.id] !== null)) {
          draftPoolDiv.innerHTML = '<div class="placeholder-notice">🏁 DRAFT COMPLETE!<br><br><button id="view-results-btn" class="apple-btn action-spin-btn">📊 VIEW RESULTS</button><br><br>Hit Restart to try again.</div>';
          $('player-name').innerText = "ROSTER LOCKED";
          $('roll-btn').disabled = true;
          gameOver = true;
          updateSpinButtons();

          syncVSTeamData();
          const finalAvg = savedOverallScore || 70;
          const result = finishVersusRound(finalAvg);
          const vb = $('view-results-btn');
          if (vb) vb.onclick = () => showOverallReveal(finalAvg, getTierName(finalAvg), result, null);

          const afterReveal = () => {
            if (currentDifficulty === '2p') { twoPlayerNext(); return; }
            if (X.pendingTour) {
              X.pendingTour = false;
              if (TOUR && TOUR.awaitingDraft) { TOUR.awaitingDraft = false; TOUR.user = userTeam(); tourScout(TOUR); }
              else openTournament();
              return;
            }
            const userNameInput = prompt("Draft finalized! Enter your name for the EGM Leaderboard:", "EGM_Baller");
            if (userNameInput) {
              let label = "Role Player";
              if (finalAvg >= 90) label = "Superstar";
              else if (finalAvg >= 80) label = "All-Star";
              globalLeaderboard.push({ name: userNameInput, overall: finalAvg, grade: label });
              renderLeaderboardTable();
            }
          };
          const showEnd = () => showOverallReveal(finalAvg, getTierName(finalAvg), result, afterReveal);
          if (result.lost && settings.loseScreen) showTrappedOverlay({ title: '💀 YOU LOSE 💀', gifKey: 'lose', onClose: showEnd });
          else showEnd();
        } else {
          rollPlayer();
        }
      };
    }
    draftPoolDiv.appendChild(btn);
  });
}

function renderLeaderboardTable() {
  const listBody = $('leaderboard-rows');
  if (!listBody) return;
  listBody.innerHTML = '';
  globalLeaderboard.sort((a, b) => b.overall - a.overall);
  globalLeaderboard.forEach((entry, idx) => {
    const row = document.createElement('tr');
    const rankClass = idx === 0 ? ' class="rank-highlight"' : '';
    row.innerHTML = '<td' + rankClass + '>#' + (idx + 1) + '</td><td><strong>' + esc(entry.name) + '</strong></td><td>' + entry.overall + '</td><td>' + entry.grade + '</td>';
    listBody.appendChild(row);
  });
}

function syncVSTeamData() {
  const simBtn = $('simulate-match-btn');
  const ovrTag = $('user-court-ovr');
  if (savedOverallScore && simBtn && ovrTag) { simBtn.disabled = false; ovrTag.innerText = 'OVR: ' + savedOverallScore; }
}

// ===== VERSUS MODE: difficulty, AI opponent, rewards =====
const DIFFICULTY = {
  easy: { label: "Easy", looks: 1, mistake: 0.35, reward: "🎁 Easy win: +1 extra re-spin" },
  medium: { label: "Medium", looks: 1, mistake: 0.15, reward: "🎁 Medium win: 2× Nico chance + more Silver players (1 spin)" },
  hard: { label: "Hard", looks: 2, mistake: 0.03, reward: "🎁 Hard win: 4× Nico chance (1 spin)" },
  extreme: { label: "Extreme", looks: 3, mistake: 0, reward: "🎁 Extreme win: 2 Nico Wheel spins (78% each)" },
  solo: { label: "Solo" },
  tournament: { label: "Tournament" },
  '2p': { label: "2 Player" }
};
const NO_AI_MODES = ['solo', 'tournament', '2p'];

function loadReward() { try { return localStorage.getItem('egm_reward') || null; } catch (e) { return null; } }
function saveReward(v) { pendingReward = v; try { if (v) localStorage.setItem('egm_reward', v); else localStorage.removeItem('egm_reward'); } catch (e) {} }
function setStatus(t) { const el = $('ai-status'); if (el) el.innerText = t; }

function renderHome() {
  const el = $('reward-banner'); if (!el) return;
  el.innerText = pendingReward ? DIFFICULTY[pendingReward].reward + " — ready for your next game!" : "No reward yet. Beat the AI to earn one!";
}

function goHome() {
  if (!gameOver) bank(true);
  TP.players = []; TP.idx = 0;
  TOUR = null; X.pendingTour = false; X.forceWin = false;
  ['tour-overlay', 'match-overlay', 'half-overlay', 'overall-overlay', 'trapped-overlay', 'wheel-overlay'].forEach(id => { const el = $(id); if (el) el.remove(); });
  ['tp-handoff', 'tp-results', 'tp-setup'].forEach(id => { const el = $(id); if (el) el.remove(); });
  $('game-screen').classList.add('hidden');
  $('home-screen').classList.remove('hidden');
  clearRollTheme();
  renderHome(); renderPowers(); refreshSecret(); refreshTwoP();
}

// Unused powers go back to the Powers tab
function bank(all) {
  const w = Math.min(X.heldW, nicoCharges), l = Math.min(X.heldL, X.luckLeft);
  X.powers.wheel += w; X.powers.luck += l;
  if (!all) { X.armed.wheel += w; X.armed.luck += l; } // restart: re-arm them
  X.heldW = 0; X.heldL = 0; X.luckLeft = 0; nicoCharges = 0; X.luckActive = false;
  persist();
  return [w, l];
}

function startGame(key, opts) {
  opts = opts || {};
  lastOpts = opts;
  if (!opts.tour) TOUR = null;
  brydenAt = (Math.random() * 100 < CH.bryden) ? Math.floor(Math.random() * ATTRIBUTES.length) : -1;
  if (X.heldW || X.heldL) bank(false);
  currentDifficulty = key;
  usedPlayers = [];
  const reward = NO_AI_MODES.includes(key) ? null : pendingReward; // solo / tournament / 2p ignore rewards
  reSpinsRemaining = 3 + (reward === 'easy' ? 1 : 0) + bonusNext.respins + (opts.respins || 0);
  firstSpinBoost = (reward === 'hard' || reward === 'medium') ? reward : null;
  nicoCharges = (reward === 'extreme' ? 2 : 0) + bonusNext.wheel + (opts.wheel || 0);
  bonusNext = { respins: 0, wheel: 0 };

  // Powers armed in the Powers tab (not in 2 player mode)
  X.heldW = 0; X.heldL = 0; X.luckLeft = opts.luck || 0; X.luckActive = false;
  if (!opts.noPowers) {
    const w = Math.min(X.armed.wheel, X.powers.wheel), l = Math.min(X.armed.luck, X.powers.luck);
    X.powers.wheel -= w; X.powers.luck -= l;
    X.heldW = w; X.heldL = l; X.luckLeft = l; nicoCharges += w;
    // reward powers: +1 re-spin, Medium boost, Hard boost (one boost per game)
    const ra = Math.min(X.armed.respin, X.powers.respin);
    X.powers.respin -= ra; reSpinsRemaining += ra;
    if (X.armed.hard > 0 && X.powers.hard > 0) { X.powers.hard--; firstSpinBoost = 'hard'; }
    else if (X.armed.medium > 0 && X.powers.medium > 0) { X.powers.medium--; firstSpinBoost = 'medium'; }
  }
  X.armed = { wheel: 0, luck: 0, respin: 0, medium: 0, hard: 0 };
  persist();

  nicoBoost = false; gameStarted = false; trapped = false; gameOver = false; scoreClicks = 0; respinClicks = 0;

  // clear any popups left over from the last game
  ['trapped-overlay', 'overall-overlay', 'wheel-overlay', 'tp-handoff'].forEach(id => { const el = $(id); if (el) el.remove(); });
  clearRollTheme();
  const rt = $('rank-tab');
  if (rt) { rt.className = 'rank-tab hidden'; rt.innerHTML = ''; }

  $('home-screen').classList.add('hidden');
  $('game-screen').classList.remove('hidden');
  let tag = NO_AI_MODES.includes(key) ? DIFFICULTY[key].label : 'vs AI · ' + DIFFICULTY[key].label;
  if (key === '2p' && TP.players[TP.idx]) tag = '👥 ' + TP.players[TP.idx].name;
  $('difficulty-tag').innerText = tag;
  $('roll-btn').disabled = false;
  $('roll-btn').innerText = "🏀 SPIN PLAYER";
  $('respin-btn').innerText = reSpinsRemaining + ' RE-SPINS LEFT';
  $('lucky-btn').classList.toggle('hidden', nicoCharges <= 0);
  $('match-ticker-box').innerHTML = '<div class="log-placeholder">Complete your custom roster build above to unlock the court simulation scoreboard!</div>';

  initBuildLayout();
  $('ai-status').classList.toggle('hidden', NO_AI_MODES.includes(key));
  setStatus((reward || firstSpinBoost) ? DIFFICULTY[reward || firstSpinBoost].reward + " (active!)" : "🤖 AI is waiting for your first pick...");
  updateSpinButtons();
  applyTexts();
  renderPowers();
}

function renderAIBuild() {
  const box = $('ai-build'); if (!box) return;
  box.innerHTML = ATTRIBUTES.map(a => {
    const p = aiBuild[a.id];
    return '<div class="inventory-row-slot' + (p ? ' ai-filled' : '') + '"><span class="inventory-label"><span>' + a.emoji + '</span><span>' + a.name + '</span></span>' +
      '<span class="inventory-val-badge">' + (p ? p.player + ' ' + p.value : '-') + '</span></div>';
  }).join('');
}

// The AI goes right after you, and can't take the player you just picked
function aiTakeTurn(blockedName) {
  if (NO_AI_MODES.includes(currentDifficulty)) return;
  const cfg = DIFFICULTY[currentDifficulty];
  const open = ATTRIBUTES.filter(a => aiBuild[a.id] === null);
  if (!open.length) return;
  let pool = EGM_PLAYERS.filter(p => !aiUsed.includes(p.name) && p.name !== blockedName && !p.nba && !isRare(p));
  if (!pool.length) pool = EGM_PLAYERS.filter(p => !aiUsed.includes(p.name) && p.name !== blockedName);
  const bestStat = p => Math.max(...open.map(a => p.stats[a.id]));
  let pick = null;
  for (let i = 0; i < cfg.looks; i++) {
    const c = pool[Math.floor(Math.random() * pool.length)];
    if (!pick || bestStat(c) > bestStat(pick)) pick = c;
  }
  const slot = Math.random() < cfg.mistake ? open[Math.floor(Math.random() * open.length)] : open.reduce((a, b) => pick.stats[b.id] > pick.stats[a.id] ? b : a);
  aiBuild[slot.id] = { player: pick.display || pick.name, value: pick.stats[slot.id] };
  aiUsed.push(pick.name);
  renderAIBuild();
  setStatus("🤖 AI locked in its pick. Its build is revealed at the end!");
}

// Compare overalls, hand out rewards, return text for the reveal screen
function finishVersusRound(userOvr) {
  const key = currentDifficulty, notes = [];
  let res;

  if (key === 'tournament') {
    X.pendingTour = true;
    $('cpu-court-ovr').innerText = 'OVR: 84';
    res = { html: '🏆 Your team is locked in!<br><br>Close this to scout your opponent.' };
  } else if (key === 'solo') {
    $('cpu-court-ovr').innerText = 'OVR: 84';
    res = { html: '🏀 Solo draft complete!' };
  } else if (key === '2p') {
    const P = TP.players[TP.idx];
    if (P) { P.ovr = userOvr; P.tier = getTierName(userOvr); }
    $('cpu-court-ovr').innerText = 'OVR: --';
    res = { html: '👥 ' + esc(P ? P.name : 'Player') + ' locked in with ' + userOvr + '!<br><br>Close this to continue.' };
  } else {
    const vals = ATTRIBUTES.map(a => aiBuild[a.id].value);
    aiOverall = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);

    // Granted wins (from the Tournament) only get used when you would lose
    let god = GOD;
    if (!god && userOvr <= aiOverall && ((X.grants[key] || 0) > 0 || (X.grants.any || 0) > 0)) {
      god = true;
      if ((X.grants[key] || 0) > 0) X.grants[key]--; else X.grants.any--;
      notes.push('🎟️ A granted win was used!');
    }
    if (god && userOvr <= aiOverall) aiOverall = Math.max(0, userOvr - 1);

    $('ai-overall').innerText = 'AI OVERALL: ' + aiOverall;
    $('cpu-court-ovr').innerText = 'OVR: ' + aiOverall;
    saveReward(null); // last reward is used up when the game ends
    const label = DIFFICULTY[key].label;

    if (userOvr > aiOverall) {
      if (key === 'extreme') {
        // Extreme: the 2 Nico wheel spins are saved in the Powers tab, plus the fan lock secret button
        X.powers.wheel += 2; X.fanReady = true;
        res = { html: '🏆 YOU BEAT THE EXTREME AI (' + userOvr + ' vs ' + aiOverall + ')<br><br>🎡 +2 Nico Wheel spins saved in your ⚡ Powers tab', won: true };
        notes.push('🔓 A secret button appeared in the Credits tab…');
      } else {
        // the reward is saved in the Powers tab: you choose when to use it
        X.powers[{ easy: 'respin', medium: 'medium', hard: 'hard' }[key]]++;
        res = { html: '🏆 YOU BEAT THE ' + label.toUpperCase() + ' AI (' + userOvr + ' vs ' + aiOverall + ')<br><br>' + DIFFICULTY[key].reward + '<br>Saved in your ⚡ Powers tab!', won: true };
      }
    } else if (userOvr === aiOverall) {
      res = { html: '🤝 DRAW vs the ' + label + ' AI (' + userOvr + ' each)' };
    } else {
      res = { html: '❌ THE ' + label.toUpperCase() + ' AI WINS (' + aiOverall + ' vs ' + userOvr + ')', lost: true };
    }
  }

  // unused powers are saved, not lost
  const b = bank(true);
  if (b[0] || b[1]) notes.push('⚡ Unused powers saved: ' + b[0] + ' wheel, ' + b[1] + ' luck');
  persist(); renderPowers(); refreshSecret();
  if (notes.length) res.html += '<br><br>' + notes.join('<br>');
  return res;
}

// One place decides which buttons are usable
function updateSpinButtons() {
  const respin = $('respin-btn'), wheel = $('lucky-btn');
  const locked = !gameStarted || gameOver || trapped; // trapped by Bryden = no re-spins
  respin.disabled = locked || reSpinsRemaining <= 0;
  wheel.innerText = '🎡 NICO WHEEL (' + nicoCharges + ' LEFT)';
  wheel.disabled = locked || nicoCharges <= 0 || (!wholeGame() && usedPlayers.includes('Nico')) || (currentRolledPlayer && currentRolledPlayer.name === 'Nico');
  refreshLuckBtn();
}

// ===== LUCK POWER =====
function refreshLuckBtn() {
  const lb = $('luck-btn'); if (!lb) return;
  lb.classList.toggle('hidden', X.luckLeft <= 0 && !X.luckActive);
  lb.innerText = '🍀 USE 8× LUCK (' + X.luckLeft + ' LEFT)';
  lb.disabled = !gameStarted || gameOver || X.luckActive || X.luckLeft <= 0;
}
function useLuck() {
  if (X.luckLeft <= 0 || X.luckActive) return;
  X.luckLeft--; X.luckActive = true;
  const t = $('rank-tab');
  if (t) { t.removeAttribute('style'); t.className = 'rank-tab luck'; t.innerHTML = '🍀 LUCK ACTIVE · 8× on your next re-spin or spin'; }
  toast('🍀 Luck is activated for your next re-spin or normal spin!', 3600);
  refreshLuckBtn();
}

const NICO_WHEEL_CHANCE = 78; // % that the wheel lands on Nico

function openNicoWheel() {
  if ($('lucky-btn').disabled) return;
  const nico = EGM_PLAYERS.find(p => p.name === 'Nico');
  const nicoDeg = NICO_WHEEL_CHANCE * 3.6;
  const nicoMid = nicoDeg / 2, missMid = nicoDeg + (360 - nicoDeg) / 2;
  const spot = a => 'transform: translate(-50%, -50%) rotate(' + a + 'deg) translateY(-85px) rotate(-' + a + 'deg);';
  const overlay = document.createElement('div');
  overlay.id = 'wheel-overlay';
  overlay.innerHTML = '<div class="wheel-box">' +
    '<div class="wheel-title">🎡 NICO WHEEL</div>' +
    '<div class="wheel-sub">' + NICO_WHEEL_CHANCE + '% chance to land on Nico</div>' +
    '<div class="wheel-pointer">▼</div>' +
    '<div class="wheel" id="wheel" style="background: conic-gradient(#30d158 0deg ' + nicoDeg + 'deg, #ff453a ' + nicoDeg + 'deg 360deg);">' +
    '<span class="wheel-label" style="' + spot(nicoMid) + '">NICO<br>' + NICO_WHEEL_CHANCE + '%</span>' +
    '<span class="wheel-label" style="' + spot(missMid) + '">MISS<br>' + (100 - NICO_WHEEL_CHANCE) + '%</span>' +
    '</div>' +
    '<div class="wheel-result" id="wheel-result"></div>' +
    '<button id="wheel-spin" class="apple-btn action-spin-btn">🎡 SPIN THE WHEEL</button>' +
    '<button id="wheel-close" class="apple-btn action-counter-btn hidden">Continue</button>' +
    '</div>';
  document.body.appendChild(overlay);

  let hit = false;
  $('wheel-spin').onclick = () => {
    $('wheel-spin').classList.add('hidden');
    nicoCharges--; updateSpinButtons();
    hit = Math.random() * 100 < NICO_WHEEL_CHANCE;
    const angle = hit ? 10 + Math.random() * (nicoDeg - 20) : nicoDeg + 10 + Math.random() * (360 - nicoDeg - 20);
    const wheel = $('wheel');
    void wheel.offsetWidth; // make sure the spin animates
    wheel.style.transform = 'rotate(' + (360 * 6 + (360 - angle)) + 'deg)';
    setTimeout(() => {
      $('wheel-result').innerText = hit ? '🔥 NICO! He is your next draw!' : '💨 MISS' + (nicoCharges > 0 ? ' (' + nicoCharges + ' spin left)' : '');
      $('wheel-close').classList.remove('hidden');
    }, 4700);
  };
  $('wheel-close').onclick = () => { overlay.remove(); if (hit) rollPlayer('wheel', nico); };
}

// =====================================================================
// POWERS TAB, SECRET BUTTON (Credits) AND THE FAN LOCK (0001)
// =====================================================================
function renderPowers() {
  const el = $('tab-powers'); if (!el) return;
  const row = (k, icon, title, desc) => '<div class="credit-section"><h3>' + icon + ' ' + title + '</h3><p>' + desc + '</p>' +
    '<div class="pw-line">Owned: ' + X.powers[k] + ' · Armed for your next game: ' + X.armed[k] + '</div>' +
    '<div class="pw-btns"><button class="apple-btn action-spin-btn" data-pw="' + k + '" data-d="1">➕ Activate one</button>' +
    '<button class="apple-btn action-counter-btn" data-pw="' + k + '" data-d="-1">💾 Save it</button></div></div>';
  const gr = Object.keys(X.grants).filter(k => X.grants[k] > 0).map(k => k + ' ×' + X.grants[k]).join(', ') || 'none';
  el.innerHTML = '<div class="credits-grid">' +
    row('wheel', '🎡', 'Nico Wheel spins', NICO_WHEEL_CHANCE + '% to land on Nico. Armed ones are usable in your next game.') +
    row('respin', '➕', 'Extra re-spin', '+1 re-spin in your next game. Earned by beating Easy.') +
    row('medium', '🙂', 'Medium boost', '2× Nico chance + more Silver players on your first spin. Earned by beating Medium.') +
    row('hard', '😤', 'Hard boost', '4× Nico chance on your first spin. Earned by beating Hard.') +
    row('luck', '🍀', '8× Luck', 'Use it in a game: your next re-spin or spin gets 8× luck. Unused charges get saved here.') +
    '<div class="credit-section"><h3>🎟️ Granted wins</h3><p>' + esc(gr) + '</p></div></div>';
  el.querySelectorAll('[data-pw]').forEach(b => b.onclick = () => {
    const k = b.dataset.pw, d = +b.dataset.d;
    X.armed[k] = clamp(X.armed[k] + d, 0, X.powers[k]);
    renderPowers();
  });
}

let secretClicks = 0;
function refreshSecret() { const sb = $('fan-secret'); if (sb) sb.classList.toggle('hidden', !X.fanReady); }
function onSecretClick() {
  secretClicks++;
  if (secretClicks === 2) toast('😮 You have awoken the dev…', 3000);
  if (secretClicks >= 3) {
    secretClicks = 0;
    toast('🔓 The dev has granted you worthy of thou lock.', 3000);
    setTimeout(openFanLock, 900);
  }
}

function openFanLock() {
  const old = $('fan-overlay'); if (old) old.remove();
  const o = document.createElement('div');
  o.id = 'fan-overlay';
  o.innerHTML = '<div class="fan-box"><div class="fan-title">🍀 THE LOCK 🍀</div><div class="fan-sub">FAN CODE</div>' +
    '<div class="fan-slots" id="fan-slots"></div>' +
    '<div class="fan-pad">' + '1234567890'.split('').map(k => '<button class="fan-key" data-k="' + k + '">' + k + '</button>').join('') + '</div>' +
    '<div class="pw-btns" style="margin-top:12px"><button class="fan-key fan-wide" data-k="del">⌫ DELETE</button><button class="fan-key fan-wide" data-k="x">✕ CLOSE</button></div></div>';
  document.body.appendChild(o);

  let code = '';
  const slots = $('fan-slots'), box = o.querySelector('.fan-box');
  const show = () => { slots.innerText = [0, 1, 2, 3].map(i => i < code.length ? code[i] : '_').join(' '); };
  show();
  o.querySelectorAll('.fan-key').forEach(k => k.onclick = () => {
    const v = k.dataset.k;
    if (v === 'x') { o.remove(); return; }
    if (v === 'del') { code = code.slice(0, -1); show(); return; }
    if (code.length >= 4) return;
    code += v; show();
    if (code.length === 4) {
      if (code === '0001') {
        o.remove();
        X.fanReady = false; X.powers.luck += 2;
        persist(); refreshSecret(); renderPowers();
        boom({ particleCount: 120, spread: 90, origin: { y: 0.6 }, zIndex: 10000 });
        toast('🍀 The lock opened! +2× 8× Luck saved in your ⚡ Powers tab. Activate it for your next game!', 4500);
      } else {
        slots.innerText = 'NOT WORTHY';
        box.classList.add('shake');
        setTimeout(() => { code = ''; show(); box.classList.remove('shake'); }, 800);
      }
    }
  });
}

// =====================================================================
// REAL TOURNAMENT (8 teams, scouting, play-by-play where every stat matters)
// =====================================================================
function mkTeam(name, attrs) { return { name, attrs }; }
function userTeam() {
  const attrs = {};
  ATTRIBUTES.forEach(a => { attrs[a.id] = { value: playerBuild[a.id] || 50, who: String(myPicks[a.id] || 'Your player').replace(' (LA)', '') }; });
  return mkTeam('You', attrs);
}
// A bot team: for each stat it takes the best of "skill" random classmates
function pickStat(id, skill) {
  const pool = EGM_PLAYERS.filter(p => !p.nba && !p.bad && !p.hs);
  let best = null;
  for (let i = 0; i < skill; i++) {
    const p = pool[Math.floor(Math.random() * pool.length)];
    if (!best || p.stats[id] > best.stats[id]) best = p;
  }
  return { value: best.stats[id], who: best.display || best.name };
}
function makeBot(name, skill) {
  const attrs = {};
  ATTRIBUTES.forEach(a => { attrs[a.id] = pickStat(a.id, skill); });
  const weak = ATTRIBUTES[Math.floor(Math.random() * ATTRIBUTES.length)].id; // every team has a hole
  attrs[weak] = { value: Math.round(attrs[weak].value * 0.78), who: attrs[weak].who };
  return mkTeam(name, attrs);
}
function makePaul() {
  const t = makeBot('H.S. Paul', 3), d = EGM_PLAYERS.find(p => p.name === 'Diesem');
  if (d) ['scoring', 'handles', 'athleticiem', 'iq'].forEach(id => { t.attrs[id] = { value: d.stats[id], who: 'Diesem' }; });
  return t;
}
function teamOvr(t) { return Math.round(ATTRIBUTES.reduce((s, a) => s + t.attrs[a.id].value, 0) / ATTRIBUTES.length); }

// Every ability matters: scoring = make chance, passing/iq = assists + fewer turnovers, handles = turnovers,
// defence = lowers their chance + steals, speed = fast breaks, athleticism/physicality = dunks + blocks + boards,
// rebounding = second chances, stamina = late-game fade.
function simGame(A, B, qpp) {
  const T = [A, B], sc = [0, 0], events = [], per = qpp || 6;
  const who = (t, id) => t.attrs[id].who;

  function seq(i, q) {
    const O = T[i], D = T[1 - i], late = q >= 3;
    const e = (id, t) => { const v = t.attrs[id].value; return (late && id !== 'stamina') ? v * (0.85 + 0.15 * t.attrs.stamina.value / 100) : v; };
    const pTO = clamp(0.12 + (e('defence', D) + e('speed', D)) / 200 * 0.25 - (e('handles', O) + e('passing', O) + e('iq', O)) / 300 * 0.3, 0.02, 0.45);
    if (Math.random() < pTO) return { pts: 0, text: '❌ ' + O.name + ': ' + who(O, 'handles') + ' turns it over, ' + who(D, 'defence') + ' picks it off!' };

    const fast = Math.random() < clamp(0.08 + (e('speed', O) - e('speed', D)) / 500, 0, 0.3);
    const drive = fast || Math.random() < (e('athleticiem', O) + e('physicality', O)) / 200 * 0.5;
    const three = !drive && Math.random() < 0.35;
    let p = e('scoring', O) / 100 - (e('defence', D) - 60) / 100 * 0.5 + (e('passing', O) - 60) / 100 * 0.2 + (e('iq', O) - 60) / 100 * 0.12 +
      (drive ? (e('physicality', O) + e('athleticiem', O) - 140) / 100 * 0.1 : 0);
    if (three) p *= 0.88;
    p = clamp(p, 0.18, 0.95);
    const lead = fast ? who(O, 'speed') + ' starts the fast break and ' : (O.name + ' have the ball. ' + who(O, 'passing') + ' passes to ' + who(O, 'scoring') + ', who ');
    if (drive && Math.random() < (e('athleticiem', D) + e('defence', D)) / 200 * 0.09) return { pts: 0, text: '🛡️ ' + lead + 'goes up… BLOCKED by ' + who(D, 'defence') + '!' };
    const verb = fast ? 'finishes at the rim' : drive ? 'drives and dunks it' : three ? 'pulls up from three' : 'hits the jumper';
    const pts = three ? 3 : 2, pct = Math.round(p * 100);
    if (Math.random() < p) return { pts, text: '🏀 ' + lead + verb + ' (' + who(O, 'scoring') + ' scoring ' + O.attrs.scoring.value + ' → ' + pct + '%) ✅ +' + pts };
    const off = Math.random() < clamp(0.25 + (e('rebounding', O) + e('physicality', O) - e('rebounding', D) - e('physicality', D)) / 800, 0.1, 0.5);
    if (off && Math.random() < p * 0.85) return { pts: 2, text: '🏀 ' + lead + 'misses (' + pct + '%), but ' + who(O, 'rebounding') + ' grabs the board and puts it back ✅ +2' };
    return { pts: 0, text: '✖ ' + lead + 'misses (' + pct + '%). ' + (off ? who(O, 'rebounding') + ' gets the board but nothing falls' : who(D, 'rebounding') + ' rebounds') };
  }
  const run = (q, n) => {
    for (let k = 0; k < n; k++) for (let i = 0; i < 2; i++) {
      const r = seq(i, q);
      sc[i] += r.pts;
      events.push({ i, q, text: r.text, sc: sc.slice() });
    }
  };
  for (let q = 1; q <= 4; q++) { run(q, per); if (q === 2) events.push({ half: true }); }
  let ot = 0;
  while (sc[0] === sc[1] && ot++ < 5) run(5, 2);
  if (sc[0] === sc[1]) sc[Math.random() < 0.5 ? 0 : 1]++;
  return { sc, events, w: sc[0] > sc[1] ? 0 : 1 };
}
window.__egmSim = { simGame, makeBot, makePaul, userTeam, teamOvr }; // handy for testing in the console

// A rigged result (granted win / always-win cheat) that still reads like a game
function rigWin(g) {
  const hi = Math.max(g.sc[0], g.sc[1]), lo = Math.min(g.sc[0], g.sc[1]);
  const sc = [hi + (hi === lo ? 1 : 0), lo];
  g.events.push({ i: 0, q: 4, text: '🔥 Late run: your team takes over and closes it out!', sc: sc.slice() });
  return { sc, events: g.events, w: 0 };
}

const HOME_BTN = '<button class="apple-btn action-restart-btn tour-home">🏠 Home</button>';
function quitTournament() {
  ['match-overlay', 'half-overlay', 'tour-overlay'].forEach(id => { const el = $(id); if (el) el.remove(); });
  TOUR = null; X.forceWin = false; X.pendingTour = false;
  goHome();
}
function wireHome(root) { root.querySelectorAll('.tour-home').forEach(b => { b.onclick = quitTournament; }); }

function halftime(next) {
  const h = document.createElement('div');
  h.id = 'half-overlay';
  h.innerHTML = '<div class="mo-box"><h2>🎤 HALFTIME SHOW</h2>' + mediaHtml(GIFS.half, 'trapped-gif mo-gif') +
    '<div class="pw-btns"><button id="half-go" class="apple-btn action-spin-btn">▶ Back to the game</button>' + HOME_BTN + '</div></div>';
  document.body.appendChild(h);
  wireHome(h);
  $('half-go').onclick = () => { h.remove(); next(); };
}

function playMatch(A, B, done) {
  let g = simGame(A, B), n = 0;
  if (X.forceWin) { while (g.w !== 0 && n++ < 80) g = simGame(A, B); if (g.w !== 0) g = rigWin(g); }
  const o = document.createElement('div');
  o.id = 'match-overlay';
  o.innerHTML = '<div class="mo-box"><div class="mo-top">' +
    '<div class="mo-team"><span>' + esc(A.name) + '</span><b id="mo-a">0</b></div><div class="mo-q" id="mo-q">Q1</div>' +
    '<div class="mo-team"><span>' + esc(B.name) + '</span><b id="mo-b">0</b></div></div>' +
    '<div class="mo-log" id="mo-log"></div>' +
    '<div class="pw-btns"><button id="mo-skip" class="apple-btn action-counter-btn">⏩ Speed up</button>' + HOME_BTN + '</div></div>';
  document.body.appendChild(o);
  wireHome(o);
  let i = 0, speed = 420;
  const log = $('mo-log');
  $('mo-skip').onclick = () => { speed = 12; };

  const finish = () => {
    if (!o.isConnected) return;
    $('mo-q').innerText = 'FINAL';
    const win = g.w === 0;
    log.innerHTML += '<div class="mo-line ' + (win ? 'you' : 'bad') + '"><b>' + (win ? '🏆 ' + esc(A.name) + ' win ' : '💀 ' + esc(B.name) + ' win ') + g.sc[0] + ' - ' + g.sc[1] + '</b></div>';
    log.scrollTop = log.scrollHeight;
    $('mo-skip').innerText = 'Continue ▶';
    $('mo-skip').className = 'apple-btn action-spin-btn';
    $('mo-skip').onclick = () => { o.remove(); done(g); };
  };
  const tick = () => {
    if (!o.isConnected) return; // you left to the home screen
    if (i >= g.events.length) return finish();
    const ev = g.events[i++];
    if (ev.half) return halftime(() => setTimeout(tick, speed));
    $('mo-a').innerText = ev.sc[0]; $('mo-b').innerText = ev.sc[1];
    $('mo-q').innerText = ev.q > 4 ? 'OT' : 'Q' + ev.q;
    log.innerHTML += '<div class="mo-line ' + (ev.i === 0 ? 'you' : 'bad') + '">' + esc(ev.text) + '</div>';
    log.scrollTop = log.scrollHeight;
    setTimeout(tick, speed);
  };
  tick();
}

// ----- bracket of 8: you scout, you play -----
const SCHOOL_PLACES = ['Westside', 'Eastside', 'Northgate', 'Southpoint', 'Lakeview', 'Harbor', 'Midtown', 'Riverside', 'Summit', 'Capital', 'Oakwood', 'Cedar Park', 'Fairview', 'Stonebridge', 'Maple Ridge', 'Ironwood', 'Sunset', 'Bayside', 'Hillcrest', 'Redwood', 'Pine Valley', 'Brookfield'];
const SCHOOL_MASCOTS = ['Hoopers', 'Ballers', 'Knights', 'Lions', 'Hawks', 'Mavericks', 'Raptors', 'Suns', 'Kings', 'Wolves', 'Titans', 'Falcons', 'Bulls', 'Storm', 'Vipers', 'Cobras', 'Panthers', 'Dragons', 'Rockets', 'Warriors'];
// random school names every tournament
function randomSchools(n) {
  const out = [];
  while (out.length < n) {
    const nm = SCHOOL_PLACES[Math.floor(Math.random() * SCHOOL_PLACES.length)] + ' ' + SCHOOL_MASCOTS[Math.floor(Math.random() * SCHOOL_MASCOTS.length)];
    if (!out.includes(nm)) out.push(nm);
  }
  return out;
}
function attachTourOverlay(t) {
  if (t.ov && t.ov.isConnected) return;
  const ov = document.createElement('div');
  ov.id = 'tour-overlay';
  document.body.appendChild(ov);
  t.ov = ov;
}
function botMatch(a, b, forceA) {
  let g = simGame(a, b, 4), n = 0;
  if (forceA) while (g.w !== 0 && n++ < 60) g = simGame(a, b, 4);
  return { a, b, sa: g.sc[0], sb: g.sc[1], w: g.w === 0 ? a : b };
}

function openTournament() {
  const t = { user: userTeam(), stage: 0, qf: [null, null, null, null], sf: [null, null], f: null, out: false };
  const names = randomSchools(6);
  const o = names.slice(1).map(n => makeBot(n, 2));
  t.west = makeBot(names[0], 1);
  t.paul = makePaul();
  t.o = o;
  X.forceWin = GOD;
  if ((X.grants.tournament || 0) > 0) { X.grants.tournament--; X.forceWin = true; }
  else if ((X.grants.any || 0) > 0) { X.grants.any--; X.forceWin = true; }
  persist(); renderPowers();
  t.qf[1] = botMatch(t.paul, o[0], true);   // H.S. Paul is the head team
  t.qf[2] = botMatch(o[1], o[2]);
  t.qf[3] = botMatch(o[3], o[4]);
  TOUR = t;
  tourScout(t);
}

// ----- bracket drawing: animated boxes + connecting lines -----
const BK = { xs: [0, 37, 74], w: 26, h: 66, qf: [78, 168, 258, 348], sf: [123, 303], f: 213 };
const bkRow = (tm, s, win, done) => '<div class="bk-r' + (done ? (win ? ' w' : ' l') : '') + (tm && tm.name === 'You' ? ' me' : '') + '"><span class="bk-n">' + esc(tm ? tm.name : '—') + '</span><b>' + (s === null ? '' : s) + '</b></div>';
function bkMatch(col, cy, m, show, pend, now, i) {
  const inner = (m && show) ? bkRow(m.a, m.sa, m.w === m.a, true) + bkRow(m.b, m.sb, m.w === m.b, true)
    : bkRow(pend ? pend[0] : null, null, false, false) + bkRow(pend ? pend[1] : null, null, false, false);
  return '<div class="bk-m' + (now ? ' now' : '') + '" style="left:' + BK.xs[col] + '%;top:' + (cy - BK.h / 2) + 'px;--d:' + (i * 0.08) + 's">' + inner + '</div>';
}
function bkH(left, cy, w, on, d) { return '<div class="bk-l h' + (on ? ' on' : '') + '" style="left:' + left + '%;top:' + (cy - 1) + 'px;width:' + w + '%;--d:' + d + 's"></div>'; }
function bkV(left, top, h, on, d, down) { return '<div class="bk-l v' + (on ? ' on' : '') + (down ? '' : ' up') + '" style="left:calc(' + left + '% - 1px);top:' + top + 'px;height:' + h + 'px;--d:' + d + 's"></div>'; }
function bkConn(x0, y0, x1, y1, on, d) {
  const mid = (x0 + x1) / 2;
  return bkH(x0, y0, mid - x0, on, d) + bkV(mid, Math.min(y0, y1), Math.abs(y1 - y0), on, d + 0.4, y1 > y0) + bkH(mid, y1, x1 - mid, on, d + 0.8);
}
// Who plays who is always shown; results appear (and the lines light up) as you move through the bracket
function bracketHtml(t) {
  const seen = t.out ? 99 : t.stage, live = !t.out;
  const qfShow = [!!t.qf[0], seen >= 1, seen >= 1, seen >= 1];
  const sfShow = [!!t.sf[0], seen >= 2];
  const qfPend = [[t.user, t.west], t.qf[1] && [t.qf[1].a, t.qf[1].b], t.qf[2] && [t.qf[2].a, t.qf[2].b], t.qf[3] && [t.qf[3].a, t.qf[3].b]];
  const sfPend = [(t.stage === 1 && live) ? [t.user, t.qf[1].w] : null, t.sf[1] ? [t.sf[1].a, t.sf[1].b] : null];
  const fPend = (t.stage === 2 && live && t.sf[1]) ? [t.user, t.sf[1].w] : null;
  let h = '<div class="bk">';
  ['Quarterfinals', 'Semifinals', 'Final'].forEach((n, i) => { h += '<div class="bk-h" style="left:' + BK.xs[i] + '%">' + n + '</div>'; });
  for (let i = 0; i < 4; i++) h += bkConn(BK.w, BK.qf[i], BK.xs[1], BK.sf[i >> 1], qfShow[i], i * 0.15);
  for (let j = 0; j < 2; j++) h += bkConn(BK.xs[1] + BK.w, BK.sf[j], BK.xs[2], BK.f, sfShow[j], 0.3 + j * 0.15);
  for (let i = 0; i < 4; i++) h += bkMatch(0, BK.qf[i], t.qf[i], qfShow[i], qfPend[i], i === 0 && live && t.stage === 0, i);
  for (let j = 0; j < 2; j++) h += bkMatch(1, BK.sf[j], t.sf[j], sfShow[j], sfPend[j], j === 0 && live && t.stage === 1, 4 + j);
  h += bkMatch(2, BK.f, t.f, !!t.f, fPend, live && t.stage === 2, 6);
  if (t.f) h += '<div class="bk-champ" style="left:' + BK.xs[2] + '%;top:' + (BK.f + BK.h / 2 + 10) + 'px">👑 ' + esc(t.f.w.name) + '</div>';
  return h + '</div>';
}
function scoutHtml(u, o) {
  const cls = (x, y) => x > y ? 'g' : x < y ? 'r' : '';
  return '<table class="tb-scout"><tr><td></td><td><b>You</b></td><td><b>' + esc(o.name) + '</b></td></tr>' +
    ATTRIBUTES.map(a => {
      const x = u.attrs[a.id], y = o.attrs[a.id];
      return '<tr><td>' + a.emoji + ' ' + a.name + '</td><td class="' + cls(x.value, y.value) + '">' + x.value + ' <small>' + esc(x.who) + '</small></td><td class="' + cls(y.value, x.value) + '">' + y.value + ' <small>' + esc(y.who) + '</small></td></tr>';
    }).join('') +
    '<tr><td><b>Overall</b></td><td><b>' + teamOvr(u) + '</b></td><td><b>' + teamOvr(o) + '</b></td></tr></table>';
}

const ROUND = ['Quarterfinal', 'Semifinal', 'Final'];
function tourOpp(t) { return t.stage === 0 ? t.west : t.stage === 1 ? t.qf[1].w : t.sf[1].w; }

function tourScout(t) {
  attachTourOverlay(t);
  const o = tourOpp(t);
  t.ov.innerHTML = '<div class="mo-box"><h2>🏆 TOURNAMENT · ' + ROUND[t.stage] + ' (game ' + (t.stage + 1) + ' of 3)</h2>' + bracketHtml(t) +
    '<h3>Scouting report: ' + esc(o.name) + '</h3>' +
    (o.name === 'H.S. Paul' ? '<p>The head team. They have Diesem. 😬</p>' : '') +
    scoutHtml(t.user, o) +
    '<p class="sec-note">Their stronger stats beat your weak spots. Think about turnovers, defence and rebounds.</p>' +
    '<div class="pw-btns"><button id="tour-play" class="apple-btn action-spin-btn">▶ PLAY the ' + ROUND[t.stage] + '</button>' + HOME_BTN + '</div></div>';
  $('tour-play').onclick = () => playMatch(t.user, o, g => tourAfter(t, o, g));
  wireHome(t.ov);
}

function finishBracket(t) {
  if (!t.qf[0]) t.qf[0] = { a: t.user, b: t.west, sa: 0, sb: 0, w: t.west };
  if (!t.sf[0]) t.sf[0] = botMatch(t.qf[0].w, t.qf[1].w);
  if (!t.sf[1]) t.sf[1] = botMatch(t.qf[2].w, t.qf[3].w);
  if (!t.f) t.f = botMatch(t.sf[0].w, t.sf[1].w);
}

function tourAfter(t, o, g) {
  attachTourOverlay(t);
  const m = { a: t.user, b: o, sa: g.sc[0], sb: g.sc[1], w: g.w === 0 ? t.user : o };
  if (t.stage === 0) t.qf[0] = m; else if (t.stage === 1) t.sf[0] = m; else t.f = m;

  if (g.w !== 0) { // eliminated
    t.out = true;
    if (t.stage === 0) t.sf[1] = botMatch(t.qf[2].w, t.qf[3].w);
    finishBracket(t);
    t.ov.innerHTML = '<div class="mo-box"><h2>💀 ELIMINATED in the ' + ROUND[t.stage] + '</h2>' + bracketHtml(t) +
      '<p>' + esc(o.name) + ' beat you ' + g.sc[1] + '-' + g.sc[0] + '. Champion: ' + esc(t.f.w.name) + '</p>' +
      '<div class="pw-btns"><button id="tour-x" class="apple-btn action-counter-btn">Close</button>' + HOME_BTN + '</div></div>';
    $('tour-x').onclick = () => { t.ov.remove(); X.forceWin = false; TOUR = null; };
    wireHome(t.ov);
    return;
  }

  if (t.stage === 0) t.sf[1] = botMatch(t.qf[2].w, t.qf[3].w);
  t.stage++;
  if (t.stage < 3) {
    t.ov.innerHTML = '<div class="mo-box"><h2>✅ YOU WIN ' + g.sc[0] + '-' + g.sc[1] + '!</h2><p>You go to the next game: the ' + ROUND[t.stage] + '.</p>' +
      bracketHtml(t) + '<p class="sec-note">New school, new team: you spin a fresh draft for it.</p>' +
      '<div class="pw-btns"><button id="tour-next" class="apple-btn action-spin-btn">🎰 Spin a new team for the ' + ROUND[t.stage] + ' ▶</button>' + HOME_BTN + '</div></div>';
    $('tour-next').onclick = () => {
      t.awaitingDraft = true;
      t.ov.remove();
      toast('🏀 New school next: spin a NEW team for the ' + ROUND[t.stage] + '!', 3600);
      startGame('tournament', { tour: true, noPowers: true });
    };
    wireHome(t.ov);
    return;
  }

  // CHAMPION
  X.forceWin = false; X.fanReady = true;
  lsSet('egm_2p', true);
  persist(); refreshSecret(); refreshTwoP();
  boom({ particleCount: 200, spread: 100, origin: { y: 0.5 }, zIndex: 10000 });
  const modes = ['easy', 'medium', 'hard', 'extreme', 'tournament'];
  t.ov.innerHTML = '<div class="mo-box"><h2>👑 YOU ARE THE EGM CHAMPION!</h2>' + bracketHtml(t) +
    '<p>You earned a granted win ×2 for any mode. Pick one:</p>' +
    '<div class="pw-btns">' + modes.map(k => '<button class="apple-btn action-spin-btn" data-g="' + k + '">' + DIFFICULTY[k].label + '</button>').join('') + '</div>' +
    '<p class="sec-note">2 Player mode (beta testing) is unlocked on the home screen. A secret button also appeared in Credits.</p></div>';
  t.ov.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
    X.grants[b.dataset.g] = (X.grants[b.dataset.g] || 0) + 2;
    persist(); renderPowers(); t.ov.remove(); TOUR = null;
    toast('🎟️ Granted win ×2 for ' + b.innerText + '!', 3600);
  });
}

// =====================================================================
// 2 PLAYER MODE (beta testing): pass the laptop. 2 players for everyone, up to 4 for admins.
// =====================================================================
const TP = { players: [], idx: 0 };
function isAdmin() { return !!lsGet('egm_admin', false); }
function twoPlayerUnlocked() { return !!lsGet('egm_2p', false) || isAdmin(); }
function refreshTwoP() {
  const c = document.querySelector('.difficulty-card.twop'); if (!c) return;
  const open = twoPlayerUnlocked();
  c.classList.toggle('locked', !open);
  const l = $('twop-lock'); if (l) l.innerText = open ? '' : '🔒';
}

function openTwoPlayerSetup() {
  if (!twoPlayerUnlocked()) { toast('🔒 Win the Tournament to unlock 2 Player mode.', 3200); return; }
  const old = $('tp-setup'); if (old) old.remove();
  const max = isAdmin() ? 4 : 2;
  let n = 2;
  const names = ['', '', '', ''], perks = ['all', 'all', 'all', 'all'];
  const o = document.createElement('div');
  o.id = 'tp-setup'; o.className = 'tp-overlay';
  document.body.appendChild(o);

  const keep = () => o.querySelectorAll('.tp-row').forEach((r, i) => { names[i] = r.querySelector('.tp-name').value; perks[i] = r.querySelector('.tp-perk').value; });
  const draw = () => {
    o.innerHTML = '<div class="mo-box"><h2>👥 2 PLAYER MODE <span class="beta">(beta testing)</span></h2>' +
      '<p class="sec-note">Each player drafts on the same laptop. Highest overall wins. Leave a name blank and you are Player 1, Player 2' + (max > 2 ? ', Player 3, Player 4' : '') + '.</p>' +
      (max > 2 ? '<div class="pw-btns">' + [2, 3, 4].map(k => '<button class="apple-btn ' + (k === n ? 'action-spin-btn' : 'action-counter-btn') + '" data-n="' + k + '">' + k + ' players</button>').join('') + '</div>' : '') +
      Array.from({ length: n }, (_, i) => '<div class="tp-row"><input class="sec-input tp-name" maxlength="16" placeholder="Player ' + (i + 1) + '" value="' + esc(names[i]) + '">' +
        '<select class="sec-input tp-perk"><option value="all"' + (perks[i] === 'all' ? ' selected' : '') + '>🎁 All free perks</option><option value="raw"' + (perks[i] === 'raw' ? ' selected' : '') + '>💪 Raw play (no perks)</option></select></div>').join('') +
      '<p class="sec-note">Free perks: +2 re-spins, 2 Nico Wheel spins and 1× 8× Luck.</p>' +
      '<div class="pw-btns"><button id="tp-start" class="apple-btn action-spin-btn">▶ START</button><button id="tp-cancel" class="apple-btn action-counter-btn">Cancel</button></div></div>';
    o.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { keep(); n = +b.dataset.n; draw(); });
    $('tp-cancel').onclick = () => o.remove();
    $('tp-start').onclick = () => {
      keep();
      const list = Array.from({ length: n }, (_, i) => ({ name: (names[i] || '').trim() || ('Player ' + (i + 1)), perks: perks[i], ovr: null }));
      o.remove();
      TP.players = list; TP.idx = 0;
      twoPlayerTurn();
    };
  };
  draw();
}

function twoPlayerTurn() {
  const P = TP.players[TP.idx];
  const old = $('tp-handoff'); if (old) old.remove();
  const o = document.createElement('div');
  o.id = 'tp-handoff'; o.className = 'tp-overlay';
  o.innerHTML = '<div class="mo-box"><div class="trapped-chains">📲</div><h2>Pass the laptop to</h2><div class="tp-name-big">' + esc(P.name) + '</div>' +
    '<p>' + (P.perks === 'all' ? '🎁 Free perks: +2 re-spins, 2 Nico Wheel spins, 1× 8× Luck' : '💪 Raw play: no perks') + '</p>' +
    '<p class="sec-note">Player ' + (TP.idx + 1) + ' of ' + TP.players.length + '</p>' +
    '<button id="tp-go" class="apple-btn action-spin-btn">▶ I am ' + esc(P.name) + ', START</button></div>';
  document.body.appendChild(o);
  $('tp-go').onclick = () => {
    o.remove();
    startGame('2p', P.perks === 'all' ? { respins: 2, wheel: 2, luck: 1, noPowers: true } : { noPowers: true });
  };
}

function twoPlayerNext() {
  TP.idx++;
  if (TP.idx < TP.players.length) { twoPlayerTurn(); return; }
  showTwoPlayerResults();
}

function showTwoPlayerResults() {
  const list = TP.players.slice().sort((a, b) => (b.ovr || 0) - (a.ovr || 0));
  const top = list[0].ovr;
  const winners = list.filter(p => p.ovr === top);
  const o = document.createElement('div');
  o.id = 'tp-results'; o.className = 'tp-overlay';
  o.innerHTML = '<div class="mo-box"><h2>' + (winners.length > 1 ? '🤝 IT IS A TIE!' : '👑 ' + esc(list[0].name) + ' WINS!') + '</h2>' +
    list.map((p, i) => '<div class="tp-rank' + (p.ovr === top ? ' win' : '') + '"><span>#' + (i + 1) + ' ' + esc(p.name) + '</span><span>' + p.ovr + ' · ' + p.tier + '</span></div>').join('') +
    '<div class="pw-btns" style="margin-top:14px"><button id="tp-again" class="apple-btn action-spin-btn">🔁 Play again</button><button id="tp-home" class="apple-btn action-counter-btn">🏠 Home</button></div></div>';
  document.body.appendChild(o);
  boom({ particleCount: 150, spread: 90, origin: { y: 0.5 }, zIndex: 10000 });
  $('tp-again').onclick = () => { o.remove(); TP.players.forEach(p => { p.ovr = null; }); TP.idx = 0; twoPlayerTurn(); };
  $('tp-home').onclick = () => { o.remove(); goHome(); };
}

// =====================================================================
// SECRET CODE KEYPAD + ADMIN MENU (autosaves, no caps)
// =====================================================================
function showNotTester() {
  const old = $('tester-overlay'); if (old) old.remove();
  const o = document.createElement('div');
  o.id = 'tester-overlay';
  o.innerHTML = '<div class="tester-box"><div class="tester-icon">🚫</div><div class="tester-title">NOT A GAME TESTER</div>' +
    '<div class="tester-sub">The admin lock has shut. Go play! 🏀</div>' + mediaHtml(GIFS.tester, 'tester-gif') +
    '<button id="tester-go" class="apple-btn action-spin-btn">🏀 GO PLAY</button></div>';
  document.body.appendChild(o);
  $('tester-go').onclick = () => o.remove();
}

// Only 3 tries. After 3 wrong codes the keypad is gone for good (type egmResetAdmin() in the console to undo).
function openKeypad() {
  if (lsGet('egm_admin_locked', false)) { showNotTester(); return; }
  const old = $('keypad-overlay'); if (old) old.remove();
  const overlay = document.createElement('div');
  overlay.id = 'keypad-overlay';
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  overlay.innerHTML = '<div class="keypad-box"><div class="keypad-title">🔑 Secret Code</div>' +
    '<div class="keypad-display" id="keypad-display"></div>' +
    '<div class="keypad-grid">' + keys.map(k => '<button class="keypad-key" data-k="' + k + '">' + (k === '*' ? '⌫' : k) + '</button>').join('') + '</div>' +
    '<div class="keypad-hint">⌫ delete  ·  # close  ·  ' + (3 - lsGet('egm_admin_tries', 0)) + ' tries left</div></div>';
  document.body.appendChild(overlay);

  let code = '', busy = false;
  const disp = $('keypad-display');
  const box = overlay.querySelector('.keypad-box');
  const show = () => { disp.innerText = [0, 1, 2, 3].map(i => i < code.length ? '●' : '–').join(' '); };
  show();
  overlay.querySelectorAll('.keypad-key').forEach(btn => {
    btn.onclick = () => {
      if (busy) return;
      const k = btn.dataset.k;
      if (k === '#') { overlay.remove(); return; }
      if (k === '*') { code = code.slice(0, -1); show(); return; }
      if (code.length >= 4) return;
      code += k; show();
      if (code.length === 4) {
        if (code === '1474') {
          lsSet('egm_admin_tries', 0);
          overlay.remove(); lsSet('egm_admin', true); refreshTwoP(); openSecretMenu();
        } else {
          const tries = lsGet('egm_admin_tries', 0) + 1;
          lsSet('egm_admin_tries', tries);
          box.classList.add('shake');
          busy = true;
          if (tries >= 3) {
            lsSet('egm_admin_locked', true);
            disp.innerText = '🔒 LOCKED';
            setTimeout(() => { overlay.remove(); showNotTester(); }, 900);
          } else {
            disp.innerText = '❌ WRONG · ' + (3 - tries) + ' left';
            setTimeout(() => { code = ''; show(); box.classList.remove('shake'); busy = false; }, 800);
          }
        }
      }
    };
  });
}
window.egmResetAdmin = function () { lsSet('egm_admin_tries', 0); lsSet('egm_admin_locked', false); return 'Admin keypad unlocked, 3 tries again.'; };

let adminSave = null; // the open admin section sets this; it runs before any tab switch / close / change

function openSecretMenu() {
  const old = $('secret-overlay'); if (old) old.remove();
  const overlay = document.createElement('div');
  overlay.id = 'secret-overlay';
  overlay.innerHTML = '<div class="secret-box secret-wide"><h3>🔓 Admin Tab</h3><div class="sec-tabs" id="sec-tabs"></div>' +
    '<div id="sec-body"></div><div class="secret-msg" id="secret-msg"></div>' +
    '<button id="sec-close" class="apple-btn action-counter-btn">Close</button></div>';
  document.body.appendChild(overlay);
  adminSave = null;

  const body = overlay.querySelector('#sec-body');
  const msg = t => { $('secret-msg').innerText = t; };
  const runSave = () => { if (adminSave) { try { adminSave(); } catch (e) { console.warn(e); } } };
  const sections = { cheats: ['🏆 Cheats', secCheats], chances: ['🎲 Chances', secChances], players: ['👤 Players', secPlayers], teams: ['🏟️ Teams', secTeams], text: ['✏️ Text', secText], gifs: ['🎞️ GIFs', secGifs], preview: ['🎬 Preview', secPreview], extras: ['⚡ Extras', secExtras] };
  const tabs = overlay.querySelector('#sec-tabs');
  const open = key => {
    runSave(); adminSave = null;
    tabs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.s === key));
    msg('');
    sections[key][1](body, msg);
  };
  Object.keys(sections).forEach(key => {
    const b = document.createElement('button');
    b.className = 'apple-btn action-counter-btn';
    b.dataset.s = key; b.innerText = sections[key][0];
    b.onclick = () => open(key);
    tabs.appendChild(b);
  });
  // Autosave: any change you make is saved right away
  body.addEventListener('change', e => {
    if (/^(p-load|p-fill|p-name)$/.test(e.target.id || '')) return;
    if (adminSave) { runSave(); msg('✅ Auto-saved'); }
  });
  // No caps: remove max limits that inputs might have
  new MutationObserver(() => body.querySelectorAll('input[max]').forEach(i => i.removeAttribute('max'))).observe(body, { childList: true, subtree: true });
  overlay.querySelector('#sec-close').onclick = () => { runSave(); adminSave = null; overlay.remove(); renderHome(); renderPowers(); refreshSecret(); refreshTwoP(); renderPlayersTab(); };
  open('cheats');
}

function secCheats(body, msg) {
  body.innerHTML =
    '<label class="sec-row"><input type="checkbox" id="c-god"' + (GOD ? ' checked' : '') + '><span>Always win everything (AI games, tournament, court sim)</span></label>' +
    '<div class="sec-row"><span>Reward for next game</span><select id="c-reward" class="sec-input">' + ['easy', 'medium', 'hard', 'extreme'].map(k => '<option value="' + k + '">' + DIFFICULTY[k].label + '</option>').join('') + '</select>' +
    '<button id="c-give" class="apple-btn action-spin-btn sec-mini">Give</button><button id="c-clear" class="apple-btn action-counter-btn sec-mini">Clear reward</button></div>' +
    '<div class="sec-row"><span>Force next spin</span><select id="c-force" class="sec-input"><option value="__nba">⭐ Random NBA All-Star</option>' + EGM_PLAYERS.map(p => '<option value="' + esc(p.name) + '">' + esc(p.name) + '</option>').join('') + '</select>' +
    '<button id="c-force-set" class="apple-btn action-spin-btn sec-mini">Set</button><button id="c-force-clear" class="apple-btn action-counter-btn sec-mini">Clear</button></div>' +
    '<div class="sec-row"><span>+ re-spins next game</span><input id="c-resp" class="sec-input sec-num" type="number" value="2" min="0"><button id="c-resp-set" class="apple-btn action-spin-btn sec-mini">Add</button></div>' +
    '<div class="sec-row"><span>+ Nico Wheel spins next game</span><input id="c-wheel" class="sec-input sec-num" type="number" value="2" min="0"><button id="c-wheel-set" class="apple-btn action-spin-btn sec-mini">Add</button></div>' +
    '<div class="sec-note">Force next spin stays until it is used. Bonuses apply when you start your next game.</div>';
  const g = id => body.querySelector('#' + id);
  g('c-god').onchange = e => { GOD = e.target.checked; lsSet('egm_god', GOD); msg(GOD ? '✅ You win everything now.' : '✅ Back to normal.'); };
  g('c-give').onclick = () => { saveReward(g('c-reward').value); renderHome(); msg('✅ Reward ready for your next AI game!'); };
  g('c-clear').onclick = () => { saveReward(null); renderHome(); msg('✅ Reward cleared.'); };
  g('c-force-set').onclick = () => {
    const v = g('c-force').value;
    if (v === '__nba') { forceNba = true; forceNextName = null; msg('✅ Next spin pulls an NBA All-Star!'); }
    else { forceNextName = v; forceNba = false; msg('✅ Next spin = ' + v + '!'); }
  };
  g('c-force-clear').onclick = () => { forceNba = false; forceNextName = null; msg('✅ Forced spin cleared.'); };
  g('c-resp-set').onclick = () => { bonusNext.respins += Math.max(0, parseInt(g('c-resp').value) || 0); msg('✅ Next game re-spin bonus: +' + bonusNext.respins); };
  g('c-wheel-set').onclick = () => { bonusNext.wheel += Math.max(0, parseInt(g('c-wheel').value) || 0); msg('✅ Next game Nico Wheel bonus: +' + bonusNext.wheel); };
}

function secChances(body, msg) {
  body.innerHTML = '<div class="sec-note">No caps. Once you change a chance it applies for the WHOLE game (repeat players allowed, no benchwarmer limit). Turn that off in ⚡ Extras.</div>' +
    Object.keys(DEFAULT_CHANCES).map(k => '<div class="sec-row"><span>' + CHANCE_LABELS[k] + '</span><input class="sec-input sec-num" type="number" step="any" min="0" data-k="' + k + '" value="' + CH[k] + '"></div>').join('') +
    '<button id="ch-reset" class="apple-btn action-restart-btn sec-mini">↩️ Reset to defaults</button>';
  adminSave = () => {
    body.querySelectorAll('input[data-k]').forEach(i => { const v = parseFloat(i.value); CH[i.dataset.k] = isNaN(v) ? DEFAULT_CHANCES[i.dataset.k] : Math.max(0, v); });
    lsSet('egm_chances', CH);
  };
  body.querySelector('#ch-reset').onclick = () => { CH = Object.assign({}, DEFAULT_CHANCES); lsSet('egm_chances', CH); secChances(body, msg); msg('✅ Chances reset.'); };
}

function secPlayers(body, msg) {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Gold+', 'All-Star', 'NBA All-Star', 'Benchwarmer', 'H.S. Paul', 'Developer!'];
  body.innerHTML =
    '<div class="sec-row"><span>Load existing player</span><select id="p-load" class="sec-input"><option value="">— pick —</option>' + EGM_PLAYERS.map(p => '<option value="' + esc(p.name) + '">' + esc(p.name) + '</option>').join('') + '</select>' +
    '<button id="p-loadbtn" class="apple-btn action-counter-btn sec-mini">Load</button></div>' +
    '<div class="sec-row"><span>Name</span><input id="p-name" class="sec-input" type="text"></div>' +
    '<div class="sec-row"><span>Tier</span><select id="p-tier" class="sec-input">' + tiers.map(t => '<option value="' + t + '">' + t + '</option>').join('') + '</select></div>' +
    '<div class="sec-row"><span>Rare chance % per spin (0 = normal pool)</span><input id="p-chance" class="sec-input sec-num" type="number" step="any" min="0" value="0"></div>' +
    '<div class="sec-row"><span>Fill all stats with</span><input id="p-fill" class="sec-input sec-num" type="number" value="80"><button id="p-fillbtn" class="apple-btn action-counter-btn sec-mini">Fill</button></div>' +
    '<div class="sec-stats">' + ATTRIBUTES.map(a => '<label>' + a.emoji + ' ' + a.name + '<input class="sec-input" type="number" data-s="' + a.id + '" value="70"></label>').join('') + '</div>' +
    '<div class="sec-note"><b>✨ Custom roll popup</b> (color, animation, sprinkles + live preview)</div>' +
    '<label class="sec-row"><input type="checkbox" id="pp-on"><span>Use a custom popup + tab when this player is rolled</span></label>' +
    '<div class="sec-row"><span>Popup title</span><input id="pp-title" class="sec-input" type="text" placeholder="✨ NAME! ✨"></div>' +
    '<div class="sec-row"><span>Chat bubble text</span><input id="pp-chat" class="sec-input" type="text"></div>' +
    '<div class="sec-row"><span>Rank tab text</span><input id="pp-tab" class="sec-input" type="text" placeholder="✨ NAME"></div>' +
    '<div class="sec-row"><span>Color</span><input id="pp-color" type="color" value="#ff9f0a" style="flex:0 0 70px;height:38px;border:none;background:none"></div>' +
    '<div class="sec-row"><span>Animation</span><select id="pp-anim" class="sec-input">' + Object.keys(ANIM_TYPES).map(k => '<option value="' + k + '">' + ANIM_TYPES[k] + '</option>').join('') + '</select></div>' +
    '<div class="sec-row"><span>Sprinkles / effect</span><select id="pp-fx" class="sec-input">' + Object.keys(FX_TYPES).map(k => '<option value="' + k + '"' + (k === 'sprinkles' ? ' selected' : '') + '>' + FX_TYPES[k] + '</option>').join('') + '</select></div>' +
    '<div class="sec-row"><span>GIF / mp4 link (optional)</span><input id="pp-gif" class="sec-input" type="text"></div>' +
    '<div class="pp-wrap"><div id="pp-pv" class="pv-box"></div><div><button id="pp-replay" class="apple-btn action-counter-btn sec-mini">▶ Replay preview</button><br><br><button id="pp-full" class="apple-btn action-counter-btn sec-mini">🖥️ Full-screen test</button></div></div>' +
    '<button id="p-save" class="apple-btn action-spin-btn sec-mini">💾 Save player</button> ' +
    '<button id="p-del" class="apple-btn action-restart-btn sec-mini">🗑️ Delete custom player (uses the Name box)</button>' +
    '<div class="sec-note">Same name as a built-in player = replaces that player. Deleting a replaced player brings the original back. Stats have no cap. Custom players: ' + (customPlayers.length ? customPlayers.map(p => esc(p.name)).join(', ') : 'none yet') + '</div>';
  const g = id => body.querySelector('#' + id);
  const statInputs = () => body.querySelectorAll('input[data-s]');
  const popOpts = () => {
    const col = g('pp-color').value, name = g('p-name').value.trim() || 'Player';
    return { custom: { color: col, anim: g('pp-anim').value, fx: g('pp-fx').value }, title: esc(g('pp-title').value || ('✨ ' + name + '! ✨')), chains: '✨ ⭐ ✨', chat: esc(g('pp-chat').value), gifUrl: g('pp-gif').value.trim() };
  };
  const drawPv = () => {
    const o = popOpts(), pv = g('pp-pv');
    pv.className = 'pv-box';
    pv.style.background = 'radial-gradient(circle, ' + hexToRgba(o.custom.color, .55) + ', rgba(0,0,0,.96))';
    pv.innerHTML = popupInner(o, false);
    spawnFx(pv, o.custom.fx, o.custom.color);
  };
  ['pp-title', 'pp-chat', 'pp-color', 'pp-anim', 'pp-fx', 'pp-gif', 'p-name'].forEach(id => { g(id).addEventListener('input', drawPv); g(id).addEventListener('change', drawPv); });
  g('pp-replay').onclick = drawPv;
  g('pp-full').onclick = () => showTrappedOverlay(Object.assign({}, popOpts(), { preview: true, lock: 0 }));
  const savePlayer = redraw => {
    const name = g('p-name').value.trim();
    if (!name) return false;
    const stats = {};
    statInputs().forEach(i => { const v = parseFloat(i.value); stats[i.dataset.s] = isNaN(v) ? 1 : Math.max(0, v); });
    const pop = { on: g('pp-on').checked, title: g('pp-title').value, chat: g('pp-chat').value, tab: g('pp-tab').value, color: g('pp-color').value, anim: g('pp-anim').value, fx: g('pp-fx').value, gif: g('pp-gif').value.trim() };
    const entry = { name, tier: g('p-tier').value, chance: parseFloat(g('p-chance').value) || 0, stats, pop };
    customPlayers = customPlayers.filter(p => p.name !== name);
    customPlayers.push(entry);
    lsSet('egm_players', customPlayers);
    rebuildPlayers();
    if (redraw) secPlayers(body, msg);
    return true;
  };
  adminSave = () => savePlayer(false);
  g('p-fillbtn').onclick = () => { const v = Math.max(0, parseInt(g('p-fill').value) || 80); statInputs().forEach(i => { i.value = v; }); };
  g('p-loadbtn').onclick = () => {
    const p = EGM_PLAYERS.find(x => x.name === g('p-load').value); if (!p) return;
    g('p-name').value = p.name;
    g('p-tier').value = p.nba ? 'NBA All-Star' : p.bad ? 'Benchwarmer' : p.tier;
    g('p-chance').value = rareChance(p);
    statInputs().forEach(i => { i.value = p.stats[i.dataset.s]; });
    const c = p.pop || {};
    g('pp-on').checked = !!c.on; g('pp-title').value = c.title || ''; g('pp-chat').value = c.chat || ''; g('pp-tab').value = c.tab || '';
    g('pp-color').value = c.color || '#ff9f0a'; g('pp-anim').value = c.anim || 'slam'; g('pp-fx').value = c.fx || 'sprinkles'; g('pp-gif').value = c.gif || '';
    drawPv();
    msg('Loaded ' + p.name + '. Change stuff and it saves by itself.');
  };
  g('p-save').onclick = () => { const name = g('p-name').value.trim(); if (savePlayer(true)) msg('✅ Saved ' + name + '!'); else msg('❌ Give the player a name.'); };
  g('p-del').onclick = () => {
    const name = g('p-name').value.trim();
    if (!customPlayers.some(p => p.name === name)) { msg('❌ No custom player with that name.'); return; }
    customPlayers = customPlayers.filter(p => p.name !== name);
    lsSet('egm_players', customPlayers); rebuildPlayers();
    adminSave = null; secPlayers(body, msg); msg('✅ Deleted ' + name + '.');
  };
  drawPv();
}

// ----- Preview tab: see every roll effect without playing -----
function previewRoll(p, diamond) {
  const sp = specialFor(p, { diamond: !!diamond });
  if (sp.confetti) boom({ particleCount: p.nba ? 200 : 130, spread: 100, origin: { y: 0.5 }, zIndex: 10000 });
  if (sp.overlay) showTrappedOverlay(Object.assign({}, sp.overlay, { preview: true, lock: 0 }));
  else toast('No big popup for ' + (p.display || p.name) + ', only the tab.', 2500);
}
function previewTab(sp) {
  const t = document.createElement('div');
  t.className = 'rank-tab ' + sp.tabClass;
  if (sp.tabStyle) t.setAttribute('style', sp.tabStyle);
  t.innerHTML = sp.led ? ledify(sp.tabText) : sp.tabText;
  return t;
}
function previewSquare(sp) {
  const box = document.createElement('div');
  const o = sp.overlay;
  if (!o) { box.className = 'pv-box'; box.innerHTML = '<div class="sec-note" style="text-align:center">No big popup<br>(tab only)</div>'; return box; }
  box.className = 'pv-box ' + (o.theme || '');
  if (o.custom) box.style.background = 'radial-gradient(circle, ' + hexToRgba(o.custom.color, .55) + ', rgba(0,0,0,.96))';
  box.innerHTML = popupInner(o, false);
  if (o.custom) spawnFx(box, o.custom.fx, o.custom.color);
  return box;
}
function secPreview(body, msg) {
  adminSave = null;
  const nbaP = EGM_PLAYERS.find(p => p.nba);
  body.innerHTML = '<div class="sec-note">Pick a player to see how their roll looks (tab + popup). Nothing here changes your game.</div>' +
    '<div class="sec-row"><span>Player</span><select id="pv-p" class="sec-input">' + EGM_PLAYERS.map(p => '<option value="' + esc(p.name) + '">' + esc(p.name) + (p.nba ? ' (NBA)' : '') + '</option>').join('') + '</select>' +
    '<label class="sec-row" style="flex:0 0 auto"><input type="checkbox" id="pv-dia"><span>💎 Diamond (NBA)</span></label>' +
    '<button id="pv-play" class="apple-btn action-spin-btn sec-mini">▶ Full popup</button></div>' +
    '<div id="pv-stage" class="pv-stage"></div>' +
    '<div class="sec-note"><b>All roll effects</b> (click one to play it big):</div><div id="pv-grid" class="pv-grid"></div>';
  const g = id => body.querySelector('#' + id);
  const cur = () => EGM_PLAYERS.find(x => x.name === g('pv-p').value);
  const draw = () => {
    const p = cur(); if (!p) return;
    const sp = specialFor(p, { diamond: g('pv-dia').checked });
    const st = g('pv-stage'); st.innerHTML = '';
    st.appendChild(previewSquare(sp));
    const side = document.createElement('div'); side.className = 'pv-side';
    side.appendChild(previewTab(sp));
    st.appendChild(side);
  };
  g('pv-p').onchange = draw; g('pv-dia').onchange = draw;
  g('pv-play').onclick = () => previewRoll(cur(), g('pv-dia').checked);
  const cards = [];
  if (nbaP) { cards.push({ label: '🌟 NBA Gold tab', p: nbaP, dia: false }); cards.push({ label: '💎 NBA Diamond tab', p: nbaP, dia: true }); }
  EGM_PLAYERS.filter(p => !p.nba).forEach(p => cards.push({ label: p.display || p.name, p, dia: false }));
  const grid = g('pv-grid');
  cards.forEach(c => {
    const sp = specialFor(c.p, { diamond: c.dia });
    const el = document.createElement('button');
    el.className = 'pv-card';
    const nm = document.createElement('div'); nm.className = 'pv-name'; nm.textContent = c.label;
    el.appendChild(nm); el.appendChild(previewTab(sp));
    el.onclick = () => previewRoll(c.p, c.dia);
    grid.appendChild(el);
  });
  draw();
}

function secTeams(body, msg) {
  let rows = getRounds().map(r => ({ opp: r.opp, ovr: r.ovr }));
  const sync = () => {
    body.querySelectorAll('input[data-i]').forEach(i => {
      const r = rows[+i.dataset.i]; if (!r) return;
      if (i.dataset.f === 'opp') r.opp = i.value; else r.ovr = parseInt(i.value) || 0;
    });
  };
  const persistRows = () => { sync(); customRounds = rows.map(r => ({ opp: r.opp.trim() || 'Team', ovr: Math.max(1, r.ovr || 1) })); lsSet('egm_rounds', customRounds); };
  const draw = () => {
    body.innerHTML = '<div class="sec-note">Old-style tournament opponents (used by the quick sim). The real bracket makes random teams by itself. The last one is the Final.</div>' +
      rows.map((r, i) => '<div class="sec-row"><span>' + roundLabel(i, rows.length) + '</span>' +
        '<input class="sec-input" type="text" data-i="' + i + '" data-f="opp" value="' + esc(r.opp) + '">' +
        '<input class="sec-input sec-num" type="number" data-i="' + i + '" data-f="ovr" value="' + r.ovr + '">' +
        '<button class="apple-btn action-restart-btn sec-mini" data-del="' + i + '">✕</button></div>').join('') +
      '<button id="t-add" class="apple-btn action-counter-btn sec-mini">➕ Add team</button> ' +
      '<button id="t-reset" class="apple-btn action-restart-btn sec-mini">↩️ Reset to default teams</button>';
    body.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { sync(); if (rows.length > 1) { rows.splice(+b.dataset.del, 1); persistRows(); draw(); } else msg('❌ Keep at least one team.'); });
    body.querySelector('#t-add').onclick = () => { sync(); if (rows.length < 8) { rows.push({ opp: 'New Team', ovr: 80 }); persistRows(); draw(); } else msg('❌ Max 8 teams.'); };
    body.querySelector('#t-reset').onclick = () => { customRounds = null; lsSet('egm_rounds', null); rows = DEFAULT_ROUNDS.map(r => ({ opp: r.opp, ovr: r.ovr })); draw(); msg('✅ Default teams back.'); };
  };
  adminSave = persistRows;
  draw();
}

function secText(body, msg) {
  body.innerHTML = '<input id="t-filter" class="sec-input" type="text" placeholder="Search text..." style="width:100%">' +
    '<div id="t-list">' + TEXT_ENTRIES.map(en => '<div class="sec-row" data-def="' + esc(en.def.toLowerCase()) + '"><span class="sec-note">' + esc(en.def) + '</span>' +
      '<input class="sec-input" type="text" data-k="' + en.key + '" value="' + esc(TEXT_OVR[en.key] || en.def) + '"></div>').join('') + '</div>' +
    '<button id="t-reset" class="apple-btn action-restart-btn sec-mini">↩️ Reset all text</button>';
  body.querySelector('#t-filter').oninput = e => {
    const q = e.target.value.toLowerCase();
    body.querySelectorAll('#t-list .sec-row').forEach(r => { r.style.display = (!q || r.dataset.def.includes(q) || r.querySelector('input').value.toLowerCase().includes(q)) ? '' : 'none'; });
  };
  adminSave = () => {
    body.querySelectorAll('input[data-k]').forEach(i => {
      const en = TEXT_ENTRIES.find(x => x.key === i.dataset.k); if (!en) return;
      if (i.value.trim() && i.value !== en.def) TEXT_OVR[en.key] = i.value; else delete TEXT_OVR[en.key];
    });
    lsSet('egm_text', TEXT_OVR); applyTexts();
  };
  body.querySelector('#t-reset').onclick = () => { TEXT_OVR = {}; lsSet('egm_text', TEXT_OVR); applyTexts(); adminSave = null; secText(body, msg); msg('✅ All text reset.'); };
}

function secGifs(body, msg) {
  body.innerHTML = '<div class="sec-note">Paste a GIF or .mp4 link for each popup. Leave blank for no gif.</div>' +
    Object.keys(DEFAULT_GIFS).map(k => '<div class="sec-row"><span>' + GIF_LABELS[k] + '</span><input class="sec-input" type="text" data-k="' + k + '" value="' + esc(GIFS[k] || '') + '"></div>').join('') +
    '<button id="g-reset" class="apple-btn action-restart-btn sec-mini">↩️ Reset GIFs</button>';
  adminSave = () => { body.querySelectorAll('input[data-k]').forEach(i => { GIFS[i.dataset.k] = i.value.trim(); }); lsSet('egm_gifs', GIFS); };
  body.querySelector('#g-reset').onclick = () => { GIFS = Object.assign({}, DEFAULT_GIFS); lsSet('egm_gifs', GIFS); adminSave = null; secGifs(body, msg); msg('✅ GIFs reset.'); };
}

function secExtras(body, msg) {
  body.innerHTML =
    '<div class="sec-row"><span>🍀 Luck multiplier on EVERY spin (1 = off, no cap)</span><input id="x-luck" class="sec-input sec-num" type="number" step="any" min="1" value="' + X.adminLuck + '"></div>' +
    '<div class="sec-row"><span>Force EVERY spin to be</span><select id="x-force" class="sec-input"><option value="">— off —</option>' + EGM_PLAYERS.map(p => '<option value="' + esc(p.name) + '"' + (p.name === X.forceEvery ? ' selected' : '') + '>' + esc(p.name) + '</option>').join('') + '</select></div>' +
    '<div class="sec-row"><span>🎟️ Auto-win games (any mode)</span><input id="x-win" class="sec-input sec-num" type="number" min="0" value="' + (X.grants.any || 0) + '"></div>' +
    '<div class="sec-row"><span>🎡 Owned Nico Wheel spins</span><input id="x-wheel" class="sec-input sec-num" type="number" min="0" value="' + X.powers.wheel + '"></div>' +
    '<div class="sec-row"><span>🍀 Owned 8× Luck charges</span><input id="x-lk" class="sec-input sec-num" type="number" min="0" value="' + X.powers.luck + '"></div>' +
    '<div class="sec-row"><span>➕ Owned extra re-spins</span><input id="x-respin" class="sec-input sec-num" type="number" min="0" value="' + X.powers.respin + '"></div>' +
    '<div class="sec-row"><span>🙂 Owned Medium boosts</span><input id="x-medium" class="sec-input sec-num" type="number" min="0" value="' + X.powers.medium + '"></div>' +
    '<div class="sec-row"><span>😤 Owned Hard boosts</span><input id="x-hard" class="sec-input sec-num" type="number" min="0" value="' + X.powers.hard + '"></div>' +
    '<label class="sec-row"><input type="checkbox" id="x-fan"' + (X.fanReady ? ' checked' : '') + '><span>Show the secret button in Credits</span></label>' +
    '<label class="sec-row"><input type="checkbox" id="x-whole"' + (X.wholeGame ? ' checked' : '') + '><span>Edited chances apply the WHOLE game (repeats allowed, no benchwarmer cap)</span></label>' +
    '<label class="sec-row"><input type="checkbox" id="x-2p"' + (lsGet('egm_2p', false) ? ' checked' : '') + '><span>2 Player mode unlocked (admins always get it free, up to 4 players)</span></label>' +
    '<div class="sec-note">Everything here saves the moment you change it. No caps.</div>';
  const g = id => body.querySelector('#' + id);
  adminSave = () => {
    X.adminLuck = Math.max(1, parseFloat(g('x-luck').value) || 1);
    X.forceEvery = g('x-force').value;
    X.grants.any = Math.max(0, parseInt(g('x-win').value) || 0);
    X.powers.wheel = Math.max(0, parseInt(g('x-wheel').value) || 0);
    X.powers.luck = Math.max(0, parseInt(g('x-lk').value) || 0);
    X.powers.respin = Math.max(0, parseInt(g('x-respin').value) || 0);
    X.powers.medium = Math.max(0, parseInt(g('x-medium').value) || 0);
    X.powers.hard = Math.max(0, parseInt(g('x-hard').value) || 0);
    X.fanReady = g('x-fan').checked;
    X.wholeGame = g('x-whole').checked;
    lsSet('egm_2p', g('x-2p').checked);
    persist(); refreshSecret(); renderPowers(); refreshTwoP();
  };
}

// Old quick-sim tournament helpers (used by the admin Teams tab)
function getRounds() { return (customRounds && customRounds.length) ? customRounds : DEFAULT_ROUNDS; }
function roundLabel(i, n) {
  if (i === n - 1) return 'Final';
  if (i === n - 2) return 'Semifinal';
  if (i === n - 3) return 'Quarterfinal';
  return 'Round ' + (i + 1);
}

// ===== COURT SIMULATION =====
function runCourtSimulationEngine() {
  const ticker = $('match-ticker-box');
  if (!ticker) return;
  ticker.innerHTML = '';
  const userOvr = savedOverallScore || 75;
  const cpuOvr = aiOverall || 84;
  const addLine = text => { ticker.innerHTML += '<div class="match-line">' + text + '</div>'; ticker.scrollTop = ticker.scrollHeight; };

  setTimeout(() => addLine('⏱️ [Q1] Tip-off won by EGM Core. Driving layup down the lane.'), 300);
  setTimeout(() => addLine('🏀 [Q2] Your custom legend catches fire from beyond the arc!'), 900);
  setTimeout(() => {
    let userScore = Math.floor(Math.random() * 10) + (userOvr - 5);
    let cpuScore = Math.floor(Math.random() * 10) + (cpuOvr - 5);
    if (GOD && userScore <= cpuScore) { const t = userScore; userScore = cpuScore + 1; cpuScore = Math.min(t, userScore - 1); }
    const conclusion = userScore > cpuScore ? "🏆 CHALLENGER VICTORY! Your custom build dominates the court." : "❌ CPU WINS! EGM Core controls the paint.";
    addLine('🏁 FULL TIME: Your Build [' + userScore + '] - [' + cpuScore + '] CPU Bot');
    addLine('<strong>' + conclusion + '</strong>');
  }, 1600);
}

// =====================================================================
// ALL PLAYERS TAB: search, A-Z, best to worst, click a player for all stats
// =====================================================================
const PL = { q: '', sort: 'best', view: 'list', all: false };
function tierOf(p) { return p.nba ? 'NBA All-Star' : p.bad ? 'Benchwarmer' : p.tier; }
function showPlayerCard(p) {
  const old = $('pl-modal'); if (old) old.remove();
  const avg = playerAvg(p), look = baseLook(p);
  const col = p.nba ? '#ffd60a' : look.color;
  const o = document.createElement('div');
  o.id = 'pl-modal'; o.className = 'pl-overlay';
  const note = p.hs ? '<div class="sec-note">🏫 Only shows up in Tournament spins. Super rare.</div>' : (isRare(p) ? '<div class="sec-note">⭐ Rare roll</div>' : '');
  o.innerHTML = '<div class="pl-card"><div style="text-align:center"><div class="pl-big-name">' + esc(p.name) + '</div>' +
    '<div class="pl-tier" style="color:' + col + '">' + esc(tierOf(p)) + '</div><div class="pl-big-ovr">' + avg + '</div><div class="sec-note">OVERALL</div>' + note + '</div>' +
    ATTRIBUTES.map(a => { const v = p.stats[a.id] || 0; return '<div class="pl-stat"><span style="flex:0 0 150px">' + a.emoji + ' ' + a.name + '</span><div class="bar"><i style="width:' + clamp(v, 0, 100) + '%;background:' + (v >= 90 ? '#ffd60a' : v >= 75 ? '#30d158' : v >= 60 ? '#0a84ff' : '#ff9f0a') + '"></i></div><b>' + v + '</b></div>'; }).join('') +
    '<button id="pl-close" class="apple-btn action-spin-btn" style="width:100%;margin-top:14px">Close</button></div>';
  document.body.appendChild(o);
  $('pl-close').onclick = () => o.remove();
  o.onclick = e => { if (e.target === o) o.remove(); };
}
function renderPlayersTab() {
  const el = $('tab-players'); if (!el) return;
  el.innerHTML = '<div class="pl-bar"><button class="apple-btn ' + (PL.view === 'list' ? 'action-spin-btn' : 'action-counter-btn') + '" id="pl-v-list">📋 Player list</button>' +
    '<button class="apple-btn ' + (PL.view === 'preview' ? 'action-spin-btn' : 'action-counter-btn') + '" id="pl-v-prev">🎬 Player preview</button></div>' +
    '<div class="pl-bar"><input id="pl-q" class="sec-input" type="text" placeholder="🔍 Search players..." value="' + esc(PL.q) + '">' +
    '<select id="pl-sort" class="sec-input">' + [['best', '⬇ Best to worst'], ['worst', '⬆ Worst to best'], ['az', 'A → Z'], ['za', 'Z → A']].map(o => '<option value="' + o[0] + '"' + (PL.sort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></div>' +
    '<div class="sec-note" id="pl-count"></div><label class="sec-row' + (PL.view === 'preview' ? '' : ' hidden') + '" id="pl-allrow"><input type="checkbox" id="pl-all"' + (PL.all ? ' checked' : '') + '><span>Show every player (off = just the OP / special ones)</span></label><div id="pl-list" class="' + (PL.view === 'preview' ? 'pv-grid' : 'pl-list') + '"></div>';
  const drawPreview = () => {
    const q = PL.q.trim().toLowerCase();
    const isOp = p => p.nba || p.hs || p.la || p.pop && p.pop.on || p.name === 'Nico' || p.tier === 'Developer!' || playerAvg(p) >= 90;
    const cards = [];
    const nbaP = EGM_PLAYERS.find(p => p.nba);
    if (nbaP) { cards.push({ label: '🌟 NBA All-Star (Gold tab)', p: nbaP, dia: false }); cards.push({ label: '💎 NBA All-Star (Diamond tab)', p: nbaP, dia: true }); }
    EGM_PLAYERS.filter(p => !p.nba && (PL.all || isOp(p))).sort((a, b) => playerAvg(b) - playerAvg(a) || a.name.localeCompare(b.name)).forEach(p => cards.push({ label: p.name, p, dia: false }));
    const shown = cards.filter(c => !q || c.label.toLowerCase().includes(q) || c.p.name.toLowerCase().includes(q) || (c.p.nba && 'nba'.includes(q)));
    $('pl-count').innerText = shown.length + ' preview' + (shown.length === 1 ? '' : 's') + ' · tap one to play it big';
    const box = $('pl-list'); box.innerHTML = '';
    shown.forEach(c => {
      const sp = specialFor(c.p, { diamond: c.dia });
      const el = document.createElement('button');
      el.className = 'pv-card pv-mini';
      const nm = document.createElement('div'); nm.className = 'pv-name'; nm.textContent = c.label + ' · ' + playerAvg(c.p);
      el.appendChild(nm);
      el.appendChild(previewSquare(sp));
      el.appendChild(previewTab(sp));
      el.onclick = () => previewRoll(c.p, c.dia);
      box.appendChild(el);
    });
  };
  const draw = () => {
    if (PL.view === 'preview') return drawPreview();
    const q = PL.q.trim().toLowerCase();
    let list = EGM_PLAYERS.filter(p => !q || p.name.toLowerCase().includes(q) || tierOf(p).toLowerCase().includes(q));
    const byName = (a, b) => a.name.localeCompare(b.name);
    if (PL.sort === 'az') list.sort(byName);
    else if (PL.sort === 'za') list.sort((a, b) => byName(b, a));
    else if (PL.sort === 'worst') list.sort((a, b) => playerAvg(a) - playerAvg(b) || byName(a, b));
    else list.sort((a, b) => playerAvg(b) - playerAvg(a) || byName(a, b));
    $('pl-count').innerText = list.length + ' player' + (list.length === 1 ? '' : 's');
    const box = $('pl-list'); box.innerHTML = '';
    list.forEach(p => {
      const b = document.createElement('button');
      b.className = 'pl-row';
      const col = p.nba ? '#ffd60a' : baseLook(p).color;
      b.innerHTML = '<span class="pl-name">' + esc(p.name) + (p.hs ? ' 🏫' : '') + '</span><span class="pl-tier" style="color:' + col + '">' + esc(tierOf(p)) + '</span><span class="pl-ovr">' + playerAvg(p) + '</span>';
      b.onclick = () => showPlayerCard(p);
      box.appendChild(b);
    });
  };
  $('pl-v-list').onclick = () => { PL.view = 'list'; renderPlayersTab(); };
  $('pl-v-prev').onclick = () => { PL.view = 'preview'; renderPlayersTab(); };
  $('pl-all').onchange = e => { PL.all = e.target.checked; draw(); };
  $('pl-q').oninput = e => { PL.q = e.target.value; draw(); };
  $('pl-sort').onchange = e => { PL.sort = e.target.value; draw(); };
  draw();
}

// ===== START UP =====
window.addEventListener('load', () => {
  scanText(); // remember every editable text first
  applySettings();
  initSettingsUI();
  applyTexts();

  // Credits: the developer name gets the moving LED rainbow
  document.querySelectorAll('.rainbow-text').forEach(el => { el.classList.remove('rainbow-text'); el.innerHTML = ledify(el.textContent); });

  if (lsGet('egm_pw_unlocked', false)) revealSecretBtn();

  initBuildLayout();
  renderLeaderboardTable();
  $('cpu-court-ovr').innerText = 'OVR: --';

  $('roll-btn').onclick = () => {
    gameStarted = true;
    $('roll-btn').disabled = true; // later spins happen automatically after each pick
    rollPlayer('spin');
  };

  $('respin-btn').onclick = () => {
    if (reSpinsRemaining > 0 && currentRolledPlayer && !trapped && !gameOver) {
      reSpinsRemaining--;
      $('respin-btn').innerText = reSpinsRemaining + ' RE-SPINS LEFT';
      rollPlayer('respin');
      respinClicks++;
      pwProgress();
    }
  };

  // Restart goes straight to a fresh game (keeps 2 player perks)
  $('clear-btn').onclick = () => startGame(currentDifficulty, lastOpts);

  const simBtn = $('simulate-match-btn');
  if (simBtn) simBtn.onclick = runCourtSimulationEngine;

  $('lucky-btn').onclick = openNicoWheel;
  $('luck-btn').onclick = useLuck;

  document.querySelectorAll('.difficulty-card').forEach(card => {
    card.onclick = () => {
      if (card.dataset.level === '2p') openTwoPlayerSetup();
      else startGame(card.dataset.level);
    };
  });

  $('home-btn').onclick = () => {
    const done = ATTRIBUTES.every(a => playerBuild[a.id] !== null);
    if (done || confirm('⚠️ Are you sure you want to quit?\n\nYour current draft will be lost and you will have to restart.')) goHome();
  };

  document.querySelectorAll('.tab-btn[data-tab]').forEach(b => {
    b.onclick = () => {
      document.querySelectorAll('.tab-btn[data-tab]').forEach(x => x.classList.toggle('active', x === b));
      ['play', 'powers', 'players', 'credits', 'settings'].forEach(t => { const e = $('tab-' + t); if (e) e.classList.toggle('hidden', b.dataset.tab !== t); });
      if (b.dataset.tab === 'powers') renderPowers();
      if (b.dataset.tab === 'players') renderPlayersTab();
    };
  });
  $('secret-btn').onclick = openKeypad;
  $('fan-secret').onclick = onSecretClick;

  pendingReward = loadReward();
  renderHome();
  renderPowers();
  renderPlayersTab();
  refreshSecret();
  refreshTwoP();
});

// =====================================================================
// EGM BASKETBALL ONLINE - PART 1: accounts, profiles, tester tools
// =====================================================================
(function () {
  'use strict';

  // The anon / publishable key is SAFE here. NEVER paste the "service_role" key.
  const SUPABASE_URL = 'dcvrbxflbxtfyfysxifb';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdnJieGZsYnh0ZnlmeXN4aWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzNTAyNDYsImV4cCI6MjEwNzkyNjI0Nn0.TuXxc8ebv1qV5-aZoEeNaZnUXwFTj_hCAXmGtWrfplA';

  const configured = !/PASTE_/.test(SUPABASE_URL + SUPABASE_ANON_KEY);
  let sb = null;
  if (configured && window.supabase && window.supabase.createClient) {
    try {
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
    } catch (e) { console.warn('Supabase failed to start', e); }
  }

  const S = { user: null, profile: null, stats: null, role: 'player', flags: [] };
  window.EGM_ONLINE = {
    get client() { return sb; },
    state: S,
    canUse: key => canUse(key)
  };

  let view = 'login', busy = false, recovery = false, manualLogout = false;
  let msg = { text: '', ok: false };
  let reports = [];

  const AVATARS = ['🏀', '🔥', '👑', '⚡', '🛡️', '🚀', '💎', '🐐', '😎', '🦁'];
  const h = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const panel = () => document.getElementById('tab-account');
  const val = id => { const e = document.getElementById(id); return e ? e.value : ''; };
  const redirectUrl = () => location.origin + location.pathname;

  function canUse(key) {
    const f = S.flags.find(x => x.key === key);
    if (!f) return false;
    if (S.role === 'admin' || f.audience === 'everyone') return true;
    return f.audience === 'testers' && S.role === 'tester';
  }

  function friendly(err) {
    const m = ((err && err.message) || '').toLowerCase();
    if (m.includes('invalid login')) return 'Wrong email or password.';
    if (m.includes('email not confirmed')) return 'Verify your email first: check your inbox (and spam) for the link.';
    if (m.includes('already registered') || m.includes('already been registered')) return 'That email already has an account. Try logging in.';
    if (m.includes('database error saving new user')) return 'That username is invalid or was just taken. Try another.';
    if (m.includes('rate limit') || m.includes('too many')) return 'Too many tries. Wait a few minutes and try again.';
    if (m.includes('jwt') || m.includes('expired')) return 'Your session expired. Please log in again.';
    if (m.includes('failed to fetch') || m.includes('network')) return "Can't reach the online service. Solo modes still work.";
    return (err && err.message) ? err.message : 'Something went wrong.';
  }

  function say(text, ok) {
    msg = { text: text || '', ok: !!ok };
    const m = document.getElementById('acct-msg');
    if (m) { m.textContent = msg.text; m.className = 'acct-msg' + (ok ? ' ok' : ''); }
  }
  const msgHtml = () => '<div id="acct-msg" class="acct-msg' + (msg.ok ? ' ok' : '') + '">' + h(msg.text) + '</div>';

  async function run(fn) {
    if (busy) return;
    busy = true; say('');
    const p = panel(); if (p) p.querySelectorAll('button').forEach(b => { b.disabled = true; });
    try { await fn(); } catch (e) { say(friendly(e), false); render(); }
    busy = false;
    const p2 = panel(); if (p2) p2.querySelectorAll('button').forEach(b => { b.disabled = false; });
  }

  // ---------------- actions ----------------
  async function doLogin() {
    const email = val('a-email').trim(), password = val('a-pass');
    if (!email || !password) return say('Enter your email and password.', false);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function doSignup() {
    const email = val('a-email').trim(), password = val('a-pass'), uname = val('a-user').trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(uname)) return say('Username: 3-16 letters, numbers or _ only.', false);
    if (!email.includes('@')) return say('Enter a valid email.', false);
    if (password.length < 8) return say('Password must be at least 8 characters.', false);
    const chk = await sb.rpc('username_available', { uname });
    if (chk.error) throw chk.error;
    if (!chk.data) return say('That username is taken. Try another.', false);
    const { data, error } = await sb.auth.signUp({
      email, password, options: { data: { username: uname }, emailRedirectTo: redirectUrl() }
    });
    if (error) throw error;
    if (data.user && data.user.identities && data.user.identities.length === 0) return say('That email already has an account. Try logging in.', false);
    if (!data.session) { view = 'login'; say('Account created! Click the verification link we emailed you, then log in.', true); render(); return; }
    say('Welcome, ' + uname + '!', true);
  }

  async function doForgot() {
    const email = val('a-email').trim();
    if (!email.includes('@')) return say('Enter the email of your account.', false);
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl() });
    if (error) throw error;
    say('If that email has an account, a reset link is on its way.', true);
  }

  async function doNewPassword() {
    const a = val('a-new1'), b = val('a-new2');
    if (a.length < 8) return say('Password must be at least 8 characters.', false);
    if (a !== b) return say('The two passwords do not match.', false);
    const { error } = await sb.auth.updateUser({ password: a });
    if (error) throw error;
    recovery = false; say('Password changed!', true);
    await loadUser(S.user || (await sb.auth.getUser()).data.user);
  }

  async function doLogout() { manualLogout = true; const { error } = await sb.auth.signOut(); if (error) throw error; }

  async function doAvatar(avatar) {
    const { error } = await sb.from('profiles').update({ avatar }).eq('id', S.user.id);
    if (error) throw error;
    S.profile.avatar = avatar; render();
  }

  async function doReport() {
    const kind = val('r-kind'), message = val('r-msg').trim();
    if (message.length < 5) return say('Write at least a few words.', false);
    const { error } = await sb.from('bug_reports').insert({ user_id: S.user.id, kind, message });
    if (error) throw error;
    render(); say('Thanks! Your report was sent.', true);
    if (S.role === 'admin') loadReports();
  }

  async function doSetRole(role) {
    const name = val('ad-user').trim();
    if (!name) return say('Type a username.', false);
    const { error } = await sb.rpc('set_user_role', { target_username: name, new_role: role });
    if (error) throw error;
    say(role === 'tester' ? name + ' is now a tester.' : name + ' is a normal player again.', true);
  }

  async function doResolve(id) {
    const { error } = await sb.from('bug_reports').update({ status: 'resolved' }).eq('id', id);
    if (error) throw error;
    await loadReports(); say('Marked resolved.', true);
  }

  // ---------------- loading ----------------
  async function loadReports() {
    if (S.role !== 'admin') return;
    const r = await sb.from('bug_reports').select('id,kind,message,created_at,profiles(username)')
      .eq('status', 'open').order('created_at', { ascending: false }).limit(20);
    reports = r.data || []; render();
  }

  async function loadUser(user) {
    if (!user) {
      const expired = S.user && !manualLogout;
      S.user = S.profile = S.stats = null; S.role = 'player'; S.flags = []; reports = [];
      if (expired) msg = { text: 'Your session ended. Please log in again.', ok: false };
      manualLogout = false; render(); return;
    }
    S.user = user;
    try {
      let p = await sb.from('profiles').select('id,username,avatar,created_at').eq('id', user.id).maybeSingle();
      if (!p.data && !p.error) { await new Promise(r => setTimeout(r, 800)); p = await sb.from('profiles').select('id,username,avatar,created_at').eq('id', user.id).maybeSingle(); }
      if (p.error) throw p.error;
      S.profile = p.data;
      const [st, ro, fl] = await Promise.all([
        sb.from('player_stats').select('*').eq('user_id', user.id).maybeSingle(),
        sb.from('user_roles').select('role').eq('user_id', user.id).maybeSingle(),
        sb.from('feature_flags').select('key,audience,description').order('key')
      ]);
      S.stats = st.data; S.role = (ro.data && ro.data.role) || 'player'; S.flags = fl.data || [];
    } catch (e) { msg = { text: friendly(e), ok: false }; }
    render();
    if (S.role === 'admin') loadReports();
  }

  // ---------------- screens ----------------
  function authHtml() {
    const names = { login: 'Log in', signup: 'Sign up', forgot: 'Forgot password' };
    const tabs = Object.keys(names).map(v => '<button class="apple-btn ' + (view === v ? 'action-spin-btn' : 'action-counter-btn') + '" data-view="' + v + '">' + names[v] + '</button>').join('');
    let f = '';
    if (view === 'login') f = '<input id="a-email" class="sec-input" type="email" autocomplete="email" placeholder="Email"><input id="a-pass" class="sec-input" type="password" autocomplete="current-password" placeholder="Password"><button id="a-go" class="apple-btn action-spin-btn">Log in</button>';
    if (view === 'signup') f = '<input id="a-user" class="sec-input" maxlength="16" autocomplete="username" placeholder="Username (3-16: letters, numbers, _)"><input id="a-email" class="sec-input" type="email" autocomplete="email" placeholder="Email (kept private)"><input id="a-pass" class="sec-input" type="password" autocomplete="new-password" placeholder="Password (8+ characters)"><button id="a-go" class="apple-btn action-spin-btn">Create account</button>';
    if (view === 'forgot') f = '<input id="a-email" class="sec-input" type="email" autocomplete="email" placeholder="Email of your account"><button id="a-go" class="apple-btn action-spin-btn">Send reset link</button>';
    return '<div class="credit-section"><h3>🌐 Online Account</h3><p>Log in to save your progress on every device. Solo, Tournament and AI modes work without an account.</p>' +
      '<div class="pw-btns">' + tabs + '</div><div class="acct-form">' + f + '</div>' + msgHtml() + '</div>';
  }

  function recoveryHtml() {
    return '<div class="credit-section"><h3>🔑 Choose a new password</h3><div class="acct-form">' +
      '<input id="a-new1" class="sec-input" type="password" autocomplete="new-password" placeholder="New password (8+ characters)">' +
      '<input id="a-new2" class="sec-input" type="password" autocomplete="new-password" placeholder="Repeat new password">' +
      '<button id="a-go" class="apple-btn action-spin-btn">Save new password</button></div>' + msgHtml() + '</div>';
  }

  function statBox(label, value) { return '<div class="acct-stat"><b>' + h(value) + '</b><span>' + h(label) + '</span></div>'; }
  const rate = (w, n) => n > 0 ? Math.round(w / n * 100) + '%' : '-';
  const rankName = r => r >= 2200 ? 'Elite' : r >= 1900 ? 'Diamond' : r >= 1600 ? 'Platinum' : r >= 1300 ? 'Gold' : r >= 1000 ? 'Silver' : 'Bronze';

  function profileHtml() {
    const p = S.profile, st = S.stats || {};
    if (!p) return '<div class="credit-section"><h3>🌐 Online Account</h3><p>Loading your profile…</p>' + msgHtml() + '<button id="a-out" class="apple-btn action-restart-btn">Log out</button></div>';
    const badge = S.role === 'admin' ? '<span class="acct-badge admin">ADMIN</span>' : S.role === 'tester' ? '<span class="acct-badge tester">TESTER</span>' : '';
    let out = '<div class="credit-section"><div class="acct-head"><div class="acct-avatar">' + h(p.avatar) + '</div><div><div class="acct-name">' + h(p.username) + ' ' + badge + '</div>' +
      '<p style="margin:2px 0 0">Joined ' + h(new Date(p.created_at).toLocaleDateString()) + '</p></div></div>' +
      '<div class="acct-avatars">' + AVATARS.map(a => '<button data-av="' + a + '" class="' + (a === p.avatar ? 'on' : '') + '">' + a + '</button>').join('') + '</div>' +
      '<h4 class="acct-h">Casual</h4><div class="acct-stats">' + statBox('Played', st.casual_played || 0) + statBox('Wins', st.casual_wins || 0) + statBox('Losses', st.casual_losses || 0) + statBox('Win rate', rate(st.casual_wins || 0, st.casual_played || 0)) + '</div>' +
      '<h4 class="acct-h">Ranked 2v2</h4><div class="acct-stats">' + statBox('Rating', st.ranked_rating == null ? 1000 : st.ranked_rating) + statBox('Tier', rankName(st.ranked_rating == null ? 1000 : st.ranked_rating)) + statBox('Wins', st.ranked_wins || 0) + statBox('Losses', st.ranked_losses || 0) + '</div>' +
      '<p class="sec-note">Ranked and casual stats are saved by the server only. Ranked matches start in a later part.</p>' +
      msgHtml() + '<div class="pw-btns" style="margin-top:12px"><button id="a-out" class="apple-btn action-restart-btn">Log out</button></div></div>';

    if (S.role === 'tester' || S.role === 'admin') {
      out += '<div class="credit-section"><h3>🧪 Tester features</h3><p>Features still being tested. Only testers and admins see these as unlocked.</p>' +
        (S.flags.length ? S.flags.map(f => '<div class="acct-report"><b>' + h(f.key) + '</b> · ' + (canUse(f.key) ? '✅ unlocked for you' : '🔒 locked') + '<br><small>' + h(f.description || '') + ' (audience: ' + h(f.audience) + ')</small></div>').join('') : '<p>No features listed.</p>') + '</div>';
    }

    out += '<div class="credit-section"><h3>🐞 Report a bug / send feedback</h3><div class="acct-form">' +
      '<select id="r-kind" class="sec-input"><option value="bug">🐞 Bug</option><option value="feedback">💬 Feedback</option></select>' +
      '<textarea id="r-msg" class="sec-input" maxlength="1000" placeholder="What happened? What did you expect?"></textarea>' +
      '<button id="r-send" class="apple-btn action-spin-btn">Send</button></div></div>';

    if (S.role === 'admin') {
      out += '<div class="credit-section"><h3>🛠️ Admin</h3><p>Manage testers and read reports. The server checks you are an admin on every action.</p>' +
        '<div class="acct-form"><input id="ad-user" class="sec-input" placeholder="Username"><div class="pw-btns"><button id="ad-add" class="apple-btn action-spin-btn">Make tester</button><button id="ad-rem" class="apple-btn action-counter-btn">Remove tester</button></div></div>' +
        '<h4 class="acct-h">Open reports (' + reports.length + ')</h4>' +
        (reports.length ? reports.map(r => '<div class="acct-report"><b>' + (r.kind === 'bug' ? '🐞' : '💬') + ' ' + h(r.profiles ? r.profiles.username : '?') + '</b> · ' + h(new Date(r.created_at).toLocaleString()) + '<br>' + h(r.message) +
          '<br><button class="apple-btn action-counter-btn sec-mini" data-resolve="' + r.id + '">✔ Resolve</button></div>').join('') : '<p>No open reports.</p>') + '</div>';
    }
    return out;
  }

  function render() {
    const p = panel(); if (!p) return;
    let body;
    if (!sb) body = '<div class="credit-section"><h3>🌐 Online</h3><p>Online features are not set up or could not load. Solo, Tournament and AI modes still work.</p></div>';
    else if (recovery) body = recoveryHtml();
    else if (!S.user) body = authHtml();
    else body = profileHtml();
    p.innerHTML = '<div class="credits-grid">' + body + '</div>';
    wire(p);
  }

  function wire(p) {
    const on = (sel, fn) => p.querySelectorAll(sel).forEach(el => { el.onclick = () => fn(el); });
    on('[data-view]', el => { view = el.dataset.view; msg = { text: '', ok: false }; render(); });
    on('#a-go', () => run(recovery ? doNewPassword : view === 'signup' ? doSignup : view === 'forgot' ? doForgot : doLogin));
    p.querySelectorAll('.acct-form input').forEach(i => { i.onkeydown = e => { if (e.key === 'Enter') { const g = document.getElementById('a-go'); if (g) g.click(); } }; });
    on('#a-out', () => run(doLogout));
    on('[data-av]', el => run(() => doAvatar(el.dataset.av)));
    on('#r-send', () => run(doReport));
    on('#ad-add', () => run(() => doSetRole('tester')));
    on('#ad-rem', () => run(() => doSetRole('player')));
    on('[data-resolve]', el => run(() => doResolve(el.dataset.resolve)));
  }

  // ---------------- start up ----------------
  function injectTab() {
    const bar = document.querySelector('#home-screen .tab-bar'), settings = document.getElementById('tab-settings');
    if (!bar || !settings || document.getElementById('tab-account')) return;
    const btn = document.createElement('button');
    btn.className = 'tab-btn'; btn.id = 'acct-tab-btn'; btn.textContent = '🌐 Account';
    bar.insertBefore(btn, document.getElementById('secret-btn'));
    const pnl = document.createElement('div');
    pnl.id = 'tab-account'; pnl.className = 'hidden';
    settings.parentNode.insertBefore(pnl, settings.nextSibling);
    btn.onclick = () => {
      document.querySelectorAll('.tab-btn[data-tab]').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      ['play', 'powers', 'players', 'credits', 'settings'].forEach(t => { const e = document.getElementById('tab-' + t); if (e) e.classList.add('hidden'); });
      pnl.classList.remove('hidden'); render();
    };
    document.querySelectorAll('.tab-btn[data-tab]').forEach(b => b.addEventListener('click', () => { pnl.classList.add('hidden'); btn.classList.remove('active'); }));
  }

  function start() {
    injectTab();
    render();
    if (!sb) return;
    sb.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED') return;
      if (event === 'PASSWORD_RECOVERY') { recovery = true; const b = document.getElementById('acct-tab-btn'); if (b) b.click(); }
      if (event === 'SIGNED_OUT') recovery = false;
      setTimeout(() => loadUser(session && session.user ? session.user : null), 0);
    });
  }
  window.addEventListener('load', start);
})();
