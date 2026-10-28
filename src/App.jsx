import React, { useState, useRef, useEffect } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
.sc-root {
  --bg:#F4EEE4; --card:#FCF9F3; --tint:#F0E9DC; --line:#E7DCC9;
  --navy:#2E2820; --ink:#332E27; --soft:#9B8E78;
  --primary:#2E2820; --marker:#E8D6B4; --accent:#9A7B4F;
  font-family:'Inter',-apple-system,system-ui,sans-serif;
  background:radial-gradient(900px 340px at 50% -140px, #EFE4D1 0%, rgba(239,228,209,0) 72%), #F4EEE4;
  color:var(--ink); min-height:100vh; display:flex; justify-content:center; padding:24px 16px 96px;
}
.sc-shell { width:100%; max-width:460px; position:relative; }
.sc-topbar { display:flex; align-items:center; gap:12px; margin:2px 2px 0; }
.sc-menubtn { width:42px; height:42px; border-radius:13px; border:1px solid var(--line); background:var(--card); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--navy); box-shadow:0 2px 8px rgba(120,92,52,.05); }
.sc-menubtn:hover { background:var(--tint); }
.sc-topword { font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:30px; color:var(--navy); letter-spacing:-0.012em; }
.hl { background:linear-gradient(180deg, transparent 58%, var(--marker) 58%); padding:0 .1em; border-radius:2px; -webkit-box-decoration-break:clone; box-decoration-break:clone; }
.sy-hero { margin-top:30px; text-align:center; animation:syrise .5s ease both; }
@keyframes syrise { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
.sy-hl { font-family:'Instrument Serif',Georgia,serif; font-weight:400; font-size:43px; line-height:1.03; letter-spacing:-0.01em; color:var(--navy); margin:0 0 14px; }
.sy-sub { color:var(--soft); font-size:15px; line-height:1.6; margin:0 auto 26px; max-width:330px; }
.sy-preview { background:var(--card); border:1px solid var(--line); border-radius:20px; padding:15px 16px; box-shadow:0 20px 46px rgba(120,92,52,.13); text-align:left; margin:0 auto 24px; max-width:380px; }
.sy-prev-top { display:flex; align-items:center; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid var(--line); margin-bottom:6px; }
.sy-prev-title { font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:18px; color:var(--navy); }
.sy-prev-tag { font-size:11px; font-weight:700; color:var(--accent); background:rgba(201,138,43,.13); padding:4px 10px; border-radius:999px; letter-spacing:.02em; }
.sy-prev-row { display:flex; gap:11px; align-items:center; padding:10px 0; }
.sy-prev-row + .sy-prev-row { border-top:1px solid var(--tint); }
.sy-prev-bar { width:4px; align-self:stretch; min-height:32px; border-radius:3px; flex:none; }
.sy-prev-name { font-weight:600; font-size:14.5px; color:var(--ink); }
.sy-prev-meta { font-size:12px; color:var(--soft); margin-top:2px; font-variant-numeric:tabular-nums; }
.sy-hero .sc-btn { max-width:380px; margin:0 auto; }
.sy-hero .sc-reassure { margin-top:14px; }
.sy-hero { border-radius:24px; transition:outline-color .15s, background .15s; outline:2px dashed transparent; outline-offset:8px; }
.sy-hero.drag { outline-color:var(--accent); background:rgba(154,123,79,.05); }
.sy-drop-hint { display:none; text-align:center; font-size:12.5px; color:var(--soft); margin-top:10px; }
@media (hover:hover) and (pointer:fine) { .sy-drop-hint { display:block; } }
.sy-how { max-width:380px; margin:38px auto 0; display:flex; flex-direction:column; gap:20px; }
.sy-how-step { display:flex; gap:14px; align-items:flex-start; text-align:left; }
.sy-how-num { flex:none; width:30px; height:30px; border-radius:50%; background:var(--navy); color:#fff; font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:15px; display:flex; align-items:center; justify-content:center; }
.sy-how-t { font-weight:600; font-size:15px; color:var(--ink); }
.sy-how-d { font-size:13.5px; color:var(--soft); line-height:1.5; margin-top:2px; }
.sy-trust { text-align:center; font-family:'Fraunces',Georgia,serif; font-style:italic; font-size:15px; color:var(--navy); margin:34px auto 6px; max-width:320px; }

.sc-drop { margin-top:30px; background:var(--card); border:1px solid var(--line); border-radius:28px; padding:50px 26px; text-align:center; box-shadow:0 18px 44px rgba(120,92,52,.10); }
.sc-iconwrap { width:82px; height:82px; margin:0 auto 24px; border-radius:24px; background:#2E2820; display:flex; align-items:center; justify-content:center; box-shadow:0 14px 28px rgba(120,92,52,.30); }
.sc-iconwrap svg { width:39px; height:39px; color:#fff; }
.sc-drop h2 { font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:29px; letter-spacing:-0.008em; margin:0 0 11px; color:var(--navy); }
.sc-drop p { margin:0 0 28px; color:var(--soft); font-size:14.5px; line-height:1.6; }
.sc-btn { width:100%; border:none; cursor:pointer; font-family:'Inter',sans-serif; font-weight:600; font-size:16px; border-radius:14px; padding:16px 18px; background:#2E2820; color:#F4EEE4; transition:filter .15s, transform .08s; box-shadow:0 10px 24px rgba(120,92,52,.26); }
.sc-btn:hover { filter:brightness(1.08); }
.sc-btn:active { transform:translateY(1px); }
.sc-btn:disabled { opacity:.45; cursor:default; box-shadow:none; }
.sc-btn.ghost { background:#fff; color:var(--navy); border:1px solid var(--line); box-shadow:none; }
.sc-btn.ghost:hover { background:var(--tint); filter:none; }
.sc-reassure { margin-top:18px; text-align:center; font-size:12.5px; color:var(--soft); line-height:1.5; }

.sc-reading { margin-top:84px; text-align:center; }
.sc-doc { width:100px; height:126px; margin:0 auto 30px; border-radius:13px; background:#fff; border:1px solid var(--line); position:relative; overflow:hidden; box-shadow:0 16px 38px rgba(120,92,52,.14); }
.sc-doc::before { content:""; position:absolute; left:16px; right:16px; top:20px; height:6px; border-radius:3px; background:#E6ECF8; box-shadow:0 16px 0 #E6ECF8,0 32px 0 #E6ECF8,0 48px 0 #E6ECF8,0 64px 0 #E6ECF8; }
.sc-scanline { position:absolute; left:0; right:0; height:22px; background:linear-gradient(180deg, rgba(30,58,120,0) 0%, rgba(30,58,120,.22) 100%); border-bottom:2px solid var(--primary); animation:scan 1.25s ease-in-out infinite; }
@keyframes scan { 0%{top:-22px} 100%{top:126px} }
.sc-reading h2 { font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:22px; margin:0 0 5px; color:var(--navy); }
.sc-reading p { color:var(--soft); font-size:14px; margin:0; }

.sc-head { margin-top:24px; display:flex; align-items:flex-end; justify-content:space-between; }
.sc-head h2 { font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:27px; letter-spacing:-0.008em; margin:0; color:var(--navy); }
.sc-count { font-family:'Inter',sans-serif; font-size:13px; color:var(--primary); font-weight:600; font-variant-numeric:tabular-nums; }
.sc-hint { margin:9px 2px 14px; font-size:13.5px; color:var(--soft); line-height:1.55; }
.sc-pickwrap { display:flex; align-items:center; gap:9px; margin:2px 2px 10px; font-size:13px; color:var(--soft); flex-wrap:wrap; }
.sc-legend.compact { padding:10px 12px; gap:7px 12px; margin:0 2px 12px; }
.sc-legend.compact .sc-legitem { font-size:12.5px; padding:2px 6px; margin:-2px -6px; }
.sc-legend.compact .sc-legitem:hover { background:var(--tint); border-color:var(--line); }
.sc-legend.compact .sc-legdot { width:9px; height:9px; }
.sc-ctls { display:flex; gap:10px; margin:0 2px 16px; flex-wrap:wrap; }
.sc-ctl { flex:1 1 150px; min-width:0; display:flex; flex-direction:column; gap:5px; }
.sc-ctl .sc-pick, .sc-ctl input.sc-pick { width:100%; box-sizing:border-box; }
.sc-ctllabel { font-size:11px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:var(--soft); }
.sc-tally { font-size:13px; color:var(--ink); font-weight:600; margin:0 2px 10px; }
.sy-pastelink { display:block; margin:11px auto 0; background:none; border:none; font-family:inherit; font-size:13.5px; font-weight:600; color:var(--primary); cursor:pointer; text-decoration:underline; text-underline-offset:3px; }
.sy-pastelink:hover { color:var(--navy); }
.sc-textarea { width:100%; box-sizing:border-box; min-height:190px; resize:vertical; border:1px solid var(--line); border-radius:11px; padding:12px; font-family:'Inter',system-ui,sans-serif; font-size:16px; line-height:1.5; color:var(--ink); background:#fff; outline:none; }
.sc-textarea:focus { border-color:var(--primary); }
/* iOS zooms any focused input under 16px, which shoves the layout. */
@media (max-width: 520px) {
  .sc-field, .sc-finput, .sc-pick, .sc-title { font-size:16px; }
}
.sc-pick { font-family:'Inter'; font-weight:600; font-size:13px; border:1px solid var(--line); border-radius:10px; padding:9px 11px; background:#fff; color:var(--ink); outline:none; }
.sc-pick:focus { border-color:var(--primary); }

.sc-card { background:var(--card); border:1px solid var(--line); border-radius:18px; padding:14px 15px; margin-bottom:11px; transition:opacity .15s; box-shadow:0 4px 14px rgba(120,92,52,.06); }
.sc-card.off { opacity:.45; }
.sc-row1 { display:flex; align-items:center; gap:12px; }
.sc-check { flex:none; width:24px; height:24px; border-radius:8px; border:1.5px solid #BCCBEC; cursor:pointer; display:flex; align-items:center; justify-content:center; background:#fff; }
.sc-check.on { background:var(--primary); border-color:var(--primary); }
.sc-title { flex:1; border:none; outline:none; font-family:'Inter',sans-serif; font-weight:600; font-size:16px; color:var(--ink); background:transparent; min-width:0; }
.sc-del { flex:none; border:none; background:transparent; cursor:pointer; color:#A9B6D2; padding:4px; }
.sc-del:hover { color:#E0566B; }
.sc-row2 { display:flex; align-items:center; gap:8px; margin-top:12px; flex-wrap:wrap; }
.sc-field { font-family:'Inter',sans-serif; font-size:12.5px; color:var(--ink); font-variant-numeric:tabular-nums; border:1px solid var(--line); background:var(--tint); border-radius:10px; padding:8px 10px; outline:none; }
.sc-field:focus { border-color:var(--primary); }
.sc-swatchpick { width:34px; height:34px; border-radius:10px; flex:none; cursor:pointer; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.08); padding:0; display:inline-block; }
.sc-swatchpick input { position:absolute; inset:-6px; opacity:0; cursor:pointer; border:none; }
.sc-bar { margin-top:18px; padding-top:6px; }
.sc-bar small { display:block; text-align:center; color:var(--soft); font-size:12px; margin-top:10px; }

.sc-msg { margin-top:84px; text-align:center; }
.sc-msg h2 { font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:23px; margin:0 0 9px; color:var(--navy); }
.sc-msg p { color:var(--soft); font-size:14px; line-height:1.55; margin:0 0 24px; }

.sc-caltop { display:flex; align-items:center; justify-content:space-between; margin-top:22px; }
.sc-monthlabel { font-family:'Inter',system-ui,sans-serif; font-weight:700; font-size:21px; color:var(--navy); letter-spacing:-0.02em; }
.sc-navs { display:flex; gap:8px; align-items:center; }
.sc-navbtn { width:38px; height:38px; border-radius:11px; border:1px solid var(--line); background:#fff; color:var(--navy); cursor:pointer; font-size:17px; display:flex; align-items:center; justify-content:center; }
.sc-navbtn:hover { background:var(--tint); }
.sc-today { font-family:'Inter'; font-size:12.5px; font-weight:600; color:var(--primary); background:#fff; border:1px solid var(--line); border-radius:11px; padding:0 13px; height:38px; cursor:pointer; }
.sc-today:hover { background:var(--tint); }
.sc-cal2 { background:var(--card); border:1px solid var(--line); border-radius:20px; padding:14px 12px 10px; margin-top:14px; box-shadow:0 8px 24px rgba(120,92,52,.07); }
.sc-wdrow, .sc-grid { display:grid; grid-template-columns:repeat(7,1fr); }
.sc-wd { text-align:center; font-size:11px; font-weight:600; color:var(--soft); padding:2px 0 8px; letter-spacing:.04em; }
.sc-day { aspect-ratio:1/1; border-radius:11px; display:flex; flex-direction:column; align-items:center; padding-top:6px; font-size:13.5px; color:var(--ink); cursor:pointer; }
.sc-day.empty { cursor:default; }
.sc-day:hover:not(.empty):not(.sel) { background:var(--tint); }
.sc-day.today { color:var(--primary); font-weight:700; }
.sc-day.sel { background:var(--primary); color:#fff; font-weight:700; }
.sc-dots { display:flex; gap:3px; margin-top:4px; flex-wrap:wrap; justify-content:center; max-width:42px; }
.sc-dot { width:5px; height:5px; border-radius:50%; }
.sc-day.sel .sc-dot { box-shadow:0 0 0 1.5px #fff; }

.sc-agtitle { font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:18px; color:var(--navy); margin:24px 2px 11px; }
.sc-ev { display:flex; align-items:stretch; gap:11px; background:var(--card); border:1px solid var(--line); border-radius:13px; padding:11px 13px; margin-bottom:8px; width:100%; text-align:left; box-shadow:0 2px 8px rgba(120,92,52,.05); }
.sc-ev.tap { cursor:pointer; }
.sc-ev.tap:hover { border-color:#C7D4F0; box-shadow:0 4px 12px rgba(120,92,52,.10); }
.sc-evbar { width:4px; border-radius:3px; flex:none; }
.sc-evmain { flex:1; min-width:0; }
.sc-evname { font-weight:600; font-size:14.5px; color:var(--ink); }
.sc-evmeta { font-size:12px; color:var(--soft); margin-top:3px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.sc-evtype { font-size:10.5px; font-weight:600; border-radius:999px; padding:2px 8px; }
.sc-bell { display:inline-flex; align-items:center; gap:3px; }
.sc-chev { align-self:center; color:#C2CBE0; flex:none; }
.sc-empty { text-align:center; color:var(--soft); font-size:13.5px; padding:16px 0; }
.sc-emptybig { text-align:center; color:var(--soft); font-size:13.5px; line-height:1.55; padding:28px 14px; border:1px dashed var(--line); border-radius:16px; background:#fff; }

.sc-section { font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:18px; color:var(--navy); margin:22px 2px 11px; }
.sc-legend { display:flex; flex-wrap:wrap; gap:8px 14px; background:var(--card); border:1px solid var(--line); border-radius:14px; padding:14px 15px; box-shadow:0 2px 8px rgba(120,92,52,.05); }
.sc-legitem { display:inline-flex; align-items:center; gap:7px; font-size:13px; color:var(--ink); font-weight:500; }
.sc-legdot { width:10px; height:10px; border-radius:50%; flex:none; }
.sc-legnote { font-size:12px; color:var(--soft); margin:9px 2px 0; }
.sc-legitem { cursor:pointer; border:1px solid transparent; border-radius:9px; padding:3px 7px; margin:-3px -7px; transition:background .12s, border-color .12s; }
.sc-legitem:hover { background:var(--tint); border-color:var(--line); }
.sc-legitem { touch-action:none; user-select:none; -webkit-user-select:none; }
.sc-legitem.dragging { opacity:.45; background:var(--tint); border-color:var(--accent); }
.sc-legitem.dropping { border-color:var(--accent); background:rgba(154,123,79,.08); }
.sc-legadd { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:600; color:var(--primary); background:#fff; border:1px dashed #BCCBEC; border-radius:9px; padding:4px 10px; cursor:pointer; font-family:inherit; }
.sc-legadd:hover { background:var(--tint); }
.sc-calrow { display:flex; align-items:center; gap:11px; background:var(--card); border:1px solid var(--line); border-radius:13px; padding:11px 13px; margin-bottom:8px; box-shadow:0 2px 8px rgba(120,92,52,.05); }
.sc-calrow.hidden { opacity:.5; }
.sc-swatch { width:14px; height:14px; border-radius:5px; flex:none; }
.sc-calname { flex:1; font-weight:600; font-size:14.5px; color:var(--ink); }
.sc-renameinput { flex:1; min-width:0; font-family:'Inter'; font-weight:600; font-size:14.5px; color:var(--ink); border:1px solid var(--primary); border-radius:9px; padding:7px 9px; outline:none; background:#fff; }
.sc-calcount { font-size:12px; color:var(--soft); font-variant-numeric:tabular-nums; }
.sc-iconbtn { border:none; background:transparent; cursor:pointer; color:var(--soft); padding:4px; display:flex; }
.sc-calx { color:#C2CBE0; }
.sc-calx:hover { color:#E0566B; }
.sc-addbtn { width:100%; border:1px dashed #BCCBEC; background:#fff; color:var(--primary); font-weight:600; font-size:14px; border-radius:13px; padding:12px; cursor:pointer; font-family:'Inter'; }
.sc-addbtn:hover { background:var(--tint); }
.sc-addform { background:var(--card); border:1px solid var(--line); border-radius:13px; padding:13px; margin-bottom:8px; box-shadow:0 2px 8px rgba(120,92,52,.05); }
.sc-addform input[type=text] { width:100%; border:1px solid var(--line); border-radius:10px; padding:11px; font-size:14px; font-family:'Inter'; outline:none; color:var(--ink); background:#fff; }
.sc-addform input[type=text]:focus { border-color:var(--primary); }
.sc-colors { display:flex; gap:9px; margin:13px 0; flex-wrap:wrap; align-items:center; }
.sc-coldot { width:27px; height:27px; border-radius:8px; cursor:pointer; border:2.5px solid transparent; position:relative; overflow:hidden; }
.sc-coldot.on { border-color:var(--navy); }
.sc-coldot.custom { background:conic-gradient(from 0deg,#f43f5e,#f59e0b,#eab308,#22c55e,#06b6d4,#3b82f6,#8b5cf6,#f43f5e); display:flex; align-items:center; justify-content:center; }
.sc-coldot.custom input { position:absolute; inset:-6px; opacity:0; cursor:pointer; }
.sc-coldot.custom span { color:#fff; font-weight:700; font-size:16px; text-shadow:0 1px 2px rgba(0,0,0,.4); }
.sc-addactions { display:flex; gap:8px; }
.sc-addactions .sc-btn { font-size:14px; padding:11px; }
.sc-grphead { display:flex; align-items:center; gap:9px; margin:18px 2px 10px; }
.sc-grphead .sc-swatch { width:13px; height:13px; }
.sc-grpname { font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:16px; color:var(--navy); }
.sc-grpcount { font-size:12px; color:var(--soft); margin-left:auto; font-variant-numeric:tabular-nums; }

.sc-tabbar { position:sticky; bottom:14px; margin-top:26px; background:rgba(255,255,255,.86); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:18px; padding:7px; display:flex; box-shadow:0 12px 30px rgba(120,92,52,.12); }
.sc-tab { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; padding:8px 0; border:none; background:transparent; cursor:pointer; color:var(--soft); font-family:'Inter'; font-size:11px; font-weight:600; border-radius:13px; }
.sc-tab.on { color:var(--primary); background:var(--tint); }
.sc-tab svg { width:21px; height:21px; }

.sc-overlay { position:fixed; inset:0; background:rgba(16,28,56,.34); z-index:40; display:flex; }
.sc-sheet { width:284px; max-width:84%; background:#fff; height:100%; padding:24px 18px; display:flex; flex-direction:column; box-shadow:0 0 50px rgba(0,0,0,.22); }
.sc-sheet h3 { font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:24px; color:var(--navy); margin:4px 2px 20px; }
.sc-menuitem { display:flex; align-items:center; gap:12px; width:100%; text-align:left; border:none; background:transparent; padding:14px 10px; border-radius:12px; font-family:'Inter'; font-weight:600; font-size:15px; color:var(--ink); cursor:pointer; }
.sc-menuitem:hover { background:var(--tint); }
.sc-menuitem svg { color:var(--primary); }
.sc-help { margin-top:auto; border-top:1px solid var(--line); padding-top:18px; }
.sc-help h4 { font-family:'Fraunces',Georgia,serif; font-style:italic; font-weight:600; font-size:16px; color:var(--navy); margin:0 0 10px; }
.sc-help p { font-size:12.5px; color:var(--soft); line-height:1.55; margin:0 0 8px; }

.sc-modal { position:fixed; inset:0; background:rgba(16,28,56,.40); z-index:50; display:flex; align-items:flex-end; justify-content:center; }
.sc-modalcard { width:100%; max-width:460px; background:#fff; border-radius:24px 24px 0 0; padding:24px 18px 28px; box-shadow:0 -14px 44px rgba(120,92,52,.22); max-height:90vh; overflow-y:auto; }
.sc-modalcard h3 { font-family:'Fraunces',Georgia,serif; font-weight:700; font-size:23px; color:var(--navy); margin:0 0 14px; }
.sc-choose p { color:var(--soft); font-size:14px; line-height:1.5; margin:0 0 20px; }
.sc-choose .sc-btn { margin-bottom:10px; }
.sc-choosesub { text-align:center; font-size:11.5px; color:var(--soft); margin-top:14px; font-weight:500; }
.sc-chooselbl { text-align:center; font-size:11.5px; color:var(--soft); margin-top:6px; }
.sc-flabel { font-size:12px; font-weight:600; color:var(--soft); margin:13px 2px 6px; display:block; letter-spacing:.03em; }
.sc-finput { width:100%; border:1px solid var(--line); border-radius:11px; padding:12px; font-size:15px; font-family:'Inter'; color:var(--ink); outline:none; background:#fff; }
.sc-finput:focus { border-color:var(--primary); }
.sc-frow { display:flex; gap:10px; }
.sc-frow > div { flex:1; }
.sc-colorbig { display:inline-flex; width:48px; height:48px; border-radius:12px; cursor:pointer; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.10); }
.sc-colorbig input { position:absolute; inset:-8px; opacity:0; cursor:pointer; }
.sc-modalactions { display:flex; gap:10px; margin-top:22px; }
.sc-delbtn { border:1px solid #F3C9CF; background:#FFF5F6; color:#D23B4E; font-weight:600; border-radius:14px; padding:14px 18px; cursor:pointer; font-family:'Inter'; font-size:15px; }
.sc-delbtn:hover { background:#FCEBED; }

@media (prefers-reduced-motion: reduce){ .sc-scanline{ animation:none; top:54px } }
.sc-root { padding-top:max(24px, env(safe-area-inset-top)); padding-bottom:max(96px, calc(env(safe-area-inset-bottom) + 86px)); padding-left:max(16px, env(safe-area-inset-left)); padding-right:max(16px, env(safe-area-inset-right)); }
@media (min-width:760px){
  .sc-shell { max-width:600px; }
  .sy-hl { font-size:52px; }
  .sy-sub, .sy-preview, .sy-how { max-width:480px; }
  .sc-tabbar { max-width:600px; margin-left:auto; margin-right:auto; }
}
`;

const DEFAULT_TYPE_COLORS = {
  assignment:"#4A6FA5", exam:"#A8463C", quiz:"#B0792F", reading:"#5E7254",
  project:"#6B5E8A", class:"#8A7C66", event:"#3F7A72", holiday:"#7E5A86", payment:"#9A7B4F", other:"#8A7C66",
};
const TYPE_LABELS = { assignment:"Assignment", exam:"Exam / test", quiz:"Quiz", reading:"Reading", project:"Project", class:"Class", event:"Event", holiday:"Holiday", payment:"Payment", other:"Other" };
const TYPES = Object.keys(DEFAULT_TYPE_COLORS);
const seedCategories = () => TYPES.map((k) => ({ key: k, label: TYPE_LABELS[k], color: DEFAULT_TYPE_COLORS[k], builtin: true, hidden: false }));
const CAL_COLORS = ["#1E3A78","#2F62F0","#198A5E","#D8364A","#8A52C0","#C0820F","#0E8C93","#D8569E"];
const REMINDERS = [["", "No reminder"], ["0", "At time of event"], ["60", "1 hour before"], ["1440", "1 day before"], ["10080", "1 week before"]];
const remindShort = (v) => ({ "0": "At time", "60": "1 hr", "1440": "1 day", "10080": "1 wk" }[v] || "");
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WD = ["S","M","T","W","T","F","S"];
const TODAY = new Date().toISOString().slice(0, 10);
const STORE_KEY = "snapcal:v3";
const GCAL_URL = import.meta.env.VITE_GCAL_URL || "/api/gcal";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const EVENTS_URL = import.meta.env.VITE_EVENTS_URL || "";


const PROMPT = `Look at this document (a schedule, calendar, syllabus, or similar). Do not transcribe the body text. Do two jobs:
1) Read the big title or header and turn it into a short calendar name (e.g. "Millbrook Athletics May 2024").
2) Read the month and year, then list EVERY dated item on the page.

Today is ${TODAY}.

Return ONLY one compact JSON object. No prose, no explanation, no code fences:
{"cal":"short calendar name from the title","items":[{"t":"short title","d":"YYYY-MM-DD","h":"HH:MM 24h or null","y":"type"}]}

"y" must be one of: assignment, exam, quiz, reading, project, class, event, holiday, payment, other.
Use "event" for games, matches, activities, meetings, pep rallies, banquets, performances. Use "exam" for tests, midterms, finals.

Rules:
- Use the month and year shown in the document. If a year is missing, pick the next occurrence on or after today.
- "h" is null unless a clock time is shown. TBD or no time means null. Never invent times.
- Skip empty "No Events" cells. Deduplicate. Be thorough: capture every dated entry, even on a packed calendar.`;

// Deterministic id from normalized content, so the same event (re-scanned) maps
// to the same key and the database-level dedup (attribute_not_exists) actually fires.
function hashId(title, date, time) {
  const s = `${String(title || "").trim().toLowerCase().replace(/\s+/g, " ")}|${date || ""}|${time || ""}`;
  const fnv = (str, seed) => { let h = seed >>> 0; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(16).padStart(8, "0"); };
  return "evt_" + fnv(s, 2166136261) + fnv(s + "#", 2246822519);
}

function pad(n) { return String(n).padStart(2, "0"); }
function ymd(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }
function fmtLong(ds) { return new Date(ds + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }); }
// "class" -> "classes", "quiz" -> "quizzes", "readings" stays put.
function plural(label) {
  const w = label.toLowerCase();
  if (/[aeiou]z$/.test(w)) return w + "zes";            // quiz -> quizzes
  if (/(ss|sh|ch|x|z)$/.test(w)) return w + "es";       // class -> classes
  if (/s$/.test(w)) return w;                            // readings -> readings
  if (/[^aeiou]y$/.test(w)) return w.slice(0, -1) + "ies"; // study -> studies
  return w + "s";
}

function fmtShort(ds) { return new Date(ds + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" }); }
function fmtTime(t) { if (!t) return "All day"; let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return `${h}:${pad(m)} ${ap}`; }
function evColor(e) { return e.color || DEFAULT_TYPE_COLORS[e.type] || "#2F62F0"; }
function monthMatrix(y, m) {
  const startDow = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return cells;
}
function byDate(a, b) { return a.date === b.date ? (a.time || "99").localeCompare(b.time || "99") : a.date.localeCompare(b.date); }
function nextDay(d) { const dt = new Date(d + "T00:00:00"); dt.setDate(dt.getDate() + 1); return dt.toISOString().slice(0, 10); }
function buildICS(events) {
  const esc = (s) => (s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sylla//EN", "CALSCALE:GREGORIAN"];
  events.forEach((e, i) => {
    const v = e.date.replace(/-/g, "");
    lines.push("BEGIN:VEVENT", `UID:snapcal-${Date.now()}-${i}@snapcal.app`, `DTSTAMP:${TODAY.replace(/-/g, "")}T000000Z`);
    if (!e.time) lines.push(`DTSTART;VALUE=DATE:${v}`, `DTEND;VALUE=DATE:${nextDay(e.date).replace(/-/g, "")}`);
    else lines.push(`DTSTART:${v}T${e.time.replace(":", "")}00`);
    lines.push(`SUMMARY:${esc(e.title)}`);
    if (e.notes) lines.push(`DESCRIPTION:${esc(e.notes)}`);
    if (e.remind) lines.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(e.title)}`, `TRIGGER:-PT${e.remind}M`, "END:VALARM");
    lines.push("END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
function downloadICS(list) {
  if (!list || !list.length) return;
  const blob = new Blob([buildICS(list)], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a"); link.href = url; link.download = "snapcal.ics"; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function fileToDataURL(file) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = () => rej(new Error("Could not read that file")); r.readAsDataURL(file); }); }
async function shrinkImage(file) {
  const dataUrl = await fileToDataURL(file);
  const img = await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error("That image type wouldn't open. Try a screenshot or JPEG")); im.src = dataUrl; });
  const max = 1568;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
  canvas.getContext("2d").drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.85).split(",")[1];
}

const CamIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2Z"/><circle cx="12" cy="13" r="3.2"/></svg>);
const CalIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 3v3M16 3v3"/></svg>);
const ListIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>);
const MenuIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>);
const DownIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>);
const Chev = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...p}><polyline points="9 18 15 12 9 6"/></svg>);
const Check = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" {...p}><polyline points="20 6 9 17 4 12"/></svg>);
const X = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="17" height="17" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const Bell = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>);
const Pencil = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>);
const Eye = ({ on, ...p }) => on
  ? (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="19" height="19" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>)
  : (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="19" height="19" {...p}><path d="m2 2 20 20"/><path d="M6.7 6.7C4 8.3 2 12 2 12s3.5 7 10 7c2 0 3.7-.5 5.2-1.3"/><path d="M9.9 5.2A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-2.3 3"/></svg>);

export default function App() {
  const [stage, setStage] = useState("home");
  const [tab, setTab] = useState("snap");
  const [calendars, setCalendars] = useState([{ id: "c1", name: "School", color: CAL_COLORS[0], visible: true }]);
  const [events, setEvents] = useState([]);
  const [customColors, setCustomColors] = useState([]);
  const [categories, setCategories] = useState(seedCategories);
  const [catEdit, setCatEdit] = useState(null);
  const [dragCat, setDragCat] = useState(null);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteVal, setPasteVal] = useState("");
  const consentIntent = useRef("scan");
  const dragInfo = useRef(null);
  const [draft, setDraft] = useState([]);
  const [targetCal, setTargetCal] = useState("c1");
  const [bulkRemind, setBulkRemind] = useState("1440");
  const [cursor, setCursor] = useState(() => { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() }; });
  const [selected, setSelected] = useState(TODAY);
  const [errMsg, setErrMsg] = useState("");
  const [addingCal, setAddingCal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(CAL_COLORS[1]);
  const [editing, setEditing] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [consented, setConsented] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);
  const [gcalMsg, setGcalMsg] = useState("");
  const [idToken, setIdToken] = useState("");
  const [gUser, setGUser] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const gBtnRef = useRef(null);
  const [pending, setPending] = useState(null);
  const [suggestName, setSuggestName] = useState("");
  const [renameId, setRenameId] = useState(null);
  const [renameVal, setRenameVal] = useState("");
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef(null);
  const saveTimer = useRef(null);
  const localTs = useRef(0);

  useEffect(() => {
    // Load the local cache first for an instant start.
    let data = null;
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) data = JSON.parse(raw); } catch (e) {}
    try { if (localStorage.getItem("snapcal:consent") === "1") setConsented(true); } catch (e) {}
    if (data && data.calendars && data.calendars.length) {
      setCalendars(data.calendars); setEvents(data.events || []); setTargetCal(data.calendars[0].id);
      if (data.customColors) setCustomColors(data.customColors);
      setCategories(data.categories && data.categories.length ? data.categories : seedCategories());
      if ((data.events || []).length) setTab("calendar");
    }
    if (data && data.updatedAt) localTs.current = data.updatedAt;
    setLoaded(true);
    // Restore a saved Google session if it hasn't expired.
    try {
      const t = localStorage.getItem("snapcal:idtoken");
      if (t && tokenValid(t)) { setIdToken(t); const p = parseJwt(t); setGUser((p && p.email) || ""); }
      else localStorage.removeItem("snapcal:idtoken");
    } catch (e) {}
  }, []);

  // Pull authoritative state from the cloud once signed in (server wins over local cache).
  useEffect(() => {
    if (!loaded || !EVENTS_URL || !idToken) return;
    clearTimeout(saveTimer.current); // flush: don't let a pending debounced save race the pull
    (async () => {
      try {
        const r = await fetch(EVENTS_URL, { headers: { Authorization: "Bearer " + idToken } });
        if (r.status === 401) { signOut(); return; }
        const d = await r.json();
        const serverTs = (d && d.updatedAt) || 0;
        const serverHas = d && Array.isArray(d.calendars) && d.calendars.length;
        if (serverHas && serverTs >= localTs.current) {
          // Server is newer (or equal): adopt it.
          setCalendars(d.calendars); setEvents(d.events || []); setCustomColors(d.customColors || []);
          setCategories(d.categories && d.categories.length ? d.categories : seedCategories());
          setTargetCal(d.calendars[0].id);
          if ((d.events || []).length) setTab("calendar");
          localTs.current = serverTs;
        } else {
          // Local is newer (offline edits) or server is empty: push local up so it isn't lost.
          const ts = localTs.current || Date.now(); localTs.current = ts;
          fetch(EVENTS_URL, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + idToken }, body: JSON.stringify({ calendars, events, customColors, categories, updatedAt: ts }) })
            .then((rr) => { if (rr.status === 401) signOut(); }).catch(() => {});
        }
      } catch (e) {}
    })();
  }, [idToken, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const ts = Date.now(); localTs.current = ts;
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ calendars, events, customColors, categories, updatedAt: ts })); } catch (e) {}
    if (!EVENTS_URL || !idToken) return; // cloud sync only when signed in
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch(EVENTS_URL, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + idToken }, body: JSON.stringify({ calendars, events, customColors, categories, updatedAt: ts }) })
        .then((r) => { if (r.status === 401) signOut(); }).catch(() => {});
    }, 800);
  }, [calendars, events, customColors, categories, loaded, idToken]);

  function parseJwt(t) { try { return JSON.parse(atob(t.split(".")[1])); } catch (e) { return null; } }
  function tokenValid(t) { const p = parseJwt(t); return !!(p && p.exp && p.exp * 1000 > Date.now() + 5000); }
  function handleCredential(resp) {
    const t = resp && resp.credential;
    if (!t) return;
    try { localStorage.setItem("snapcal:idtoken", t); } catch (e) {}
    setIdToken(t); const p = parseJwt(t); setGUser((p && p.email) || "");
    setMenuOpen(false);
  }
  function signOut() {
    try { localStorage.removeItem("snapcal:idtoken"); } catch (e) {}
    setIdToken(""); setGUser("");
  }
  // Render the Google button when the menu is open and GIS is ready.
  useEffect(() => {
    if (!menuOpen || idToken || !GOOGLE_CLIENT_ID) return;
    const g = window.google;
    if (!g || !g.accounts || !g.accounts.id || !gBtnRef.current) return;
    g.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleCredential });
    gBtnRef.current.innerHTML = "";
    g.accounts.id.renderButton(gBtnRef.current, { theme: "outline", size: "large", width: 240 });
  }, [menuOpen, idToken]);

  function deviceId() {
    try {
      let id = localStorage.getItem("snapcal:device");
      if (!id) {
        id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2));
        localStorage.setItem("snapcal:device", id);
      }
      return id;
    } catch (e) { return "anon"; }
  }
  function pick() {
    if (!consented) { consentIntent.current = "scan"; setConsentOpen(true); return; }
    fileRef.current && fileRef.current.click();
  }
  function acceptConsent() {
    try { localStorage.setItem("snapcal:consent", "1"); } catch (e) {}
    setConsented(true); setConsentOpen(false);
    if (consentIntent.current === "paste") { setPasteOpen(true); return; }
    setTimeout(() => fileRef.current && fileRef.current.click(), 0);
  }

  async function onFile(ev) {
    const file = ev.target.files && ev.target.files[0];
    if (file) processFile(file);
  }
  function onDrop(e) {
    e.preventDefault(); setDragOver(false);
    if (!consented) { setConsentOpen(true); return; }
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) processFile(f);
  }
  // Shared by the photo/PDF path and the pasted-text path.
  async function runScan(payload, emptyMsg, failMsg) {
    setStage("reading"); setErrMsg("");
    try {
      const SCAN_URL = import.meta.env.VITE_SCAN_URL || "/api/scan";
      let result = null, lastErr = null;
      for (let attempt = 0; attempt < 2 && !result; attempt++) {
        try {
          const headers = { "Content-Type": "application/json", "x-snapcal-device": deviceId() };
          if (import.meta.env.VITE_APP_KEY) headers["x-snapcal-key"] = import.meta.env.VITE_APP_KEY;
          const resp = await fetch(SCAN_URL, { method: "POST", headers, body: JSON.stringify(payload) });
          let d;
          try { d = await resp.json(); } catch (e3) { throw new Error("Invalid response format"); }
          if (d && d.error) throw new Error(d.error);
          result = d;
        } catch (err) { lastErr = err; }
      }
      if (!result) throw (lastErr || new Error("Invalid response format"));
      const items = Array.isArray(result.items) ? result.items : [];
      const calName = (result.cal || "").trim();
      const cleaned = items.map((o) => {
        const type = TYPES.includes(o.type) ? o.type : "other";
        let time = o.time || "";
        if (!/^\d{2}:\d{2}$/.test(time)) time = "";
        const catHit = categories.find((c) => c.key === type);
        return { title: o.title || "Untitled", date: o.date || "", time, type, color: (catHit && catHit.color) || DEFAULT_TYPE_COLORS[type], notes: "", remind: bulkRemind, on: true };
      }).filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date));
      if (!cleaned.length) { setStage("error"); setErrMsg(emptyMsg); return; }
      setDraft(cleaned); setSuggestName(calName); setTargetCal(calName ? "__new__" : calendars[0].id); setStage("review");
    } catch (e) {
      const m = (e && e.message) || "";
      const conn = /invalid response|failed to fetch|load failed|network/i.test(m);
      setStage("error");
      setErrMsg(conn
        ? "The scanner couldn't be reached. Check your connection, or add dates by hand below."
        : failMsg + (m ? " (" + m + ")" : ""));
    } finally { if (fileRef.current) fileRef.current.value = ""; }
  }

  function submitPaste() {
    const t = (pasteVal || "").trim();
    if (!t) return;
    setPasteOpen(false);
    runScan({ text: t },
      "No dates found in that text. Paste a section that actually lists dates.",
      "Couldn't read that text.");
  }

  async function processFile(file) {
    if (!file) return;
    const name = (file.name || "").toLowerCase();
    const isPdf = file.type === "application/pdf";
    const isImage = (file.type || "").startsWith("image/");
    const isTextFile = file.type === "text/plain" || /\.(txt|md|markdown)$/.test(name);
    if (!isPdf && !isImage && !isTextFile) {
      setStage("error");
      setErrMsg("That's not a photo, PDF, or text file. Drop an image, a PDF, or a .txt of your schedule.");
      return;
    }
    if (isTextFile) {
      let txt = "";
      try { txt = await file.text(); } catch (e) { txt = ""; }
      if (!txt.trim()) {
        setStage("error"); setErrMsg("That file looks empty.");
        if (fileRef.current) fileRef.current.value = "";
        return;
      }
      return runScan({ text: txt.trim().slice(0, 20000) },
        "No dates found in that file. Try one that actually lists dates.",
        "Couldn't read that file.");
    }
    setStage("reading"); setErrMsg("");
    let data64;
    try {
      data64 = isPdf ? (await fileToDataURL(file)).split(",")[1] : await shrinkImage(file);
    } catch (e) {
      setStage("error");
      setErrMsg("Couldn't read that file. A clear screenshot or PDF of the schedule page works best.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    return runScan({ image: data64, mediaType: isPdf ? "application/pdf" : "image/jpeg", isPdf },
      "No dates found in that document. Try a clearer photo, or a page that actually lists due dates.",
      "Couldn't read that file. A clear screenshot or PDF of the schedule page works best.");
  }


  function updateDraft(i, key, val) { setDraft((p) => p.map((e, j) => (j === i ? { ...e, [key]: val } : e))); }
  function removeDraft(i) { setDraft((p) => p.filter((_, j) => j !== i)); }
  function setAllRemind(v) { setBulkRemind(v); setDraft((p) => p.map((e) => ({ ...e, remind: v }))); }

  function commit() {
    let calId = targetCal, addCalObj = null;
    if (targetCal === "__new__") {
      calId = "c_" + Date.now();
      addCalObj = { id: calId, name: (suggestName || "Imported").slice(0, 40), color: CAL_COLORS[calendars.length % CAL_COLORS.length], visible: true };
    }
    const chosen = draft.filter((e) => e.on).map((e) => ({ id: hashId(e.title, e.date, e.time), title: e.title, date: e.date, time: e.time, type: e.type, color: e.color, notes: e.notes, remind: e.remind, calId }));
    if (!chosen.length) return;
    if (addCalObj) setCalendars((p) => [...p, addCalObj]);
    setEvents((p) => [...p, ...chosen]);
    const earliest = chosen.map((e) => e.date).sort()[0];
    const dt = new Date(earliest + "T00:00:00");
    setCursor({ y: dt.getFullYear(), m: dt.getMonth() }); setSelected(earliest);
    setDraft([]); setSuggestName(""); setStage("home"); setTab("calendar");
    setPending(chosen);
  }

  function chooserKeep() { setPending(null); }
  function chooserSend() { downloadICS(pending); setPending(null); }

  // Validate events client-side before they ever leave for a calendar write.
  function validEvents(list) {
    const INJECT = /(ignore\s+(all|previous|above)|disregard|system\s*prompt|you\s+are\s+now|assistant\s*:|<\s*\/?\s*script|javascript:)/i;
    return (list || []).filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date) && e.title && !INJECT.test(e.title));
  }

  function startGoogleAdd(list) {
    const safe = validEvents(list);
    if (!GOOGLE_CLIENT_ID || !safe.length) { setPending(null); return; }
    const state = Math.random().toString(36).slice(2);
    try {
      localStorage.setItem("snapcal:gcal_pending", JSON.stringify(safe));
      localStorage.setItem("snapcal:gcal_state", state);
    } catch (e) {}
    const redirect = window.location.origin + "/";
    const p = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID, redirect_uri: redirect, response_type: "code",
      scope: "https://www.googleapis.com/auth/calendar.events",
      access_type: "online", include_granted_scopes: "true", state, prompt: "consent",
    });
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?" + p.toString();
  }

  // On return from Google, exchange the code via the backend and write events.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const code = q.get("code"), state = q.get("state");
    if (!code) return;
    let saved = null, savedState = null;
    try { saved = JSON.parse(localStorage.getItem("snapcal:gcal_pending") || "null"); savedState = localStorage.getItem("snapcal:gcal_state"); } catch (e) {}
    window.history.replaceState({}, "", window.location.origin + "/");
    if (!saved || !savedState || state !== savedState) return;
    (async () => {
      setGcalMsg("Adding to Google Calendar...");
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        const resp = await fetch(GCAL_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-snapcal-device": deviceId() },
          body: JSON.stringify({ code, redirectUri: window.location.origin + "/", events: saved, tz }),
        });
        const d = await resp.json();
        if (d.error) throw new Error(d.error);
        setGcalMsg("Added " + d.added + " events to Google Calendar.");
      } catch (e) { setGcalMsg("Couldn't add to Google Calendar."); }
      finally { try { localStorage.removeItem("snapcal:gcal_pending"); localStorage.removeItem("snapcal:gcal_state"); } catch (e) {} setTimeout(() => setGcalMsg(""), 6000); }
    })();
  }, []);

  function toggleCal(id) { setCalendars((p) => p.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c))); }
  function removeCal(id) { setEvents((p) => p.filter((e) => e.calId !== id)); setCalendars((p) => p.filter((c) => c.id !== id)); }
  function addCal() { const name = newName.trim() || "Untitled"; const id = "c_" + Date.now(); setCalendars((p) => [...p, { id, name, color: newColor, visible: true }]); setNewName(""); setNewColor(CAL_COLORS[1]); setAddingCal(false); }
  function pickCustom(hex) { setCustomColors((p) => (p.includes(hex) ? p : [...p, hex])); setNewColor(hex); }
  function startRename(c) { setRenameId(c.id); setRenameVal(c.name); }
  function saveRename() { const n = renameVal.trim(); if (n) setCalendars((p) => p.map((c) => (c.id === renameId ? { ...c, name: n.slice(0, 40) } : c))); setRenameId(null); setRenameVal(""); }

  function openEdit(e) { setEditing({ ...e, color: evColor(e), remind: e.remind || "" }); }
  function openNew() { setEditing({ id: "e_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7), title: "", date: selected || TODAY, time: "", type: "event", color: DEFAULT_TYPE_COLORS.event, notes: "", remind: bulkRemind, calId: calendars[0].id, __new: true }); }
  function saveEdit() {
    if (!editing.title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(editing.date)) return;
    const { __new, ...ev } = editing;
    if (__new) {
      ev.id = hashId(ev.title, ev.date, ev.time);
      setEvents((p) => (p.some((x) => x.id === ev.id) ? p.map((x) => (x.id === ev.id ? ev : x)) : [...p, ev]));
      const dt = new Date(ev.date + "T00:00:00"); setCursor({ y: dt.getFullYear(), m: dt.getMonth() }); setSelected(ev.date);
    } else {
      setEvents((p) => p.map((e) => (e.id === ev.id ? ev : e)));
    }
    setEditing(null);
  }
  function deleteEvent() { setEvents((p) => p.filter((e) => e.id !== editing.id)); setEditing(null); }

  const onCount = draft.filter((e) => e.on).length;
  const visEvents = events.filter((e) => calendars.some((c) => c.id === e.calId && c.visible));
  const dayEvents = (ds) => visEvents.filter((e) => e.date === ds).sort(byDate);
  const calOf = (id) => calendars.find((c) => c.id === id);
  const selEvents = dayEvents(selected);
  const upcoming = visEvents.filter((e) => e.date >= TODAY).sort(byDate).slice(0, 6);
  const cells = monthMatrix(cursor.y, cursor.m);
  const palette = [...CAL_COLORS, ...customColors];
  useEffect(() => {
    if (loaded && (!categories || categories.length === 0)) setCategories(seedCategories());
  }, [loaded, categories]);

  // Hero preview: the user's own next few dates once they have any,
  // otherwise the illustrative sample.
  const heroPreview = (() => {
    if (!events.length) return null;
    const soon = events
      .filter((e) => e.date >= TODAY)
      .sort((a, b) => (a.date === b.date ? (a.time || "").localeCompare(b.time || "") : a.date.localeCompare(b.date)));
    const list = (soon.length ? soon : events.slice().sort((a, b) => b.date.localeCompare(a.date))).slice(0, 3);
    const cal = calendars.find((c) => c.id === list[0].calId);
    return {
      title: (cal && cal.name) || "Your calendar",
      count: events.length,
      upcoming: soon.length,
      rows: list,
    };
  })();

  const visibleCats = categories.filter((c) => !c.hidden);
  // Only key the colours actually on screen, so the legend stays short.
  const draftCats = (() => {
    const seen = new Set(draft.map((d) => d.type));
    return categories.filter((c) => seen.has(c.key));
  })();
  // "12 assignments, 6 readings, 4 exams" so the count is checkable at a glance.
  const draftSummary = (() => {
    const on = draft.filter((d) => d.on);
    if (!on.length) return "";
    const counts = new Map();
    on.forEach((d) => counts.set(d.type, (counts.get(d.type) || 0) + 1));
    return categories
      .filter((c) => counts.has(c.key))
      .map((c) => {
        const k = counts.get(c.key);
        return `${k} ${k === 1 ? (c.label || "untitled").toLowerCase() : plural(c.label || "untitled")}`;
      })
      .join(", ");
  })();
  const catColor = (key) => {
    const c = categories.find((x) => x.key === key);
    return (c && c.color) || DEFAULT_TYPE_COLORS[key] || "";
  };
  // "Uncustomised" means the event still carries the colour its type gives it,
  // either the current category colour or the original built-in default.
  const isDefaultColor = (color, key) => {
    const cur = (color || "").toLowerCase();
    return cur === catColor(key).toLowerCase() || cur === (DEFAULT_TYPE_COLORS[key] || "").toLowerCase();
  };

  function saveCat(next) {
    setCategories((prev) => (prev.some((c) => c.key === next.key) ? prev.map((c) => (c.key === next.key ? next : c)) : [...prev, next]));
    setCatEdit(null);
  }
  function deleteCat(key) {
    setCategories((prev) => prev.filter((c) => c.key !== key));
    setCatEdit(null);
  }
  // Pointer-based reordering so it works with touch as well as a mouse.
  function catPointerDown(e, key) {
    dragInfo.current = { key, x: e.clientX, y: e.clientY, moved: false };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function catPointerMove(e) {
    const info = dragInfo.current;
    if (!info) return;
    if (!info.moved) {
      if (Math.abs(e.clientX - info.x) < 6 && Math.abs(e.clientY - info.y) < 6) return;
      info.moved = true;
      setDragCat(info.key);
    }
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const chip = el && el.closest && el.closest("[data-catkey]");
    const overKey = chip && chip.getAttribute("data-catkey");
    if (!overKey || overKey === info.key) return;
    setCategories((prev) => {
      const from = prev.findIndex((c) => c.key === info.key);
      const to = prev.findIndex((c) => c.key === overKey);
      if (from < 0 || to < 0 || from === to) return prev;
      const copy = prev.slice();
      const [it] = copy.splice(from, 1);
      copy.splice(to, 0, it);
      return copy;
    });
  }
  function catPointerUp(e, key) {
    const info = dragInfo.current;
    dragInfo.current = null;
    setDragCat(null);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) {}
    if (info && !info.moved) {
      const c = categories.find((x) => x.key === key);
      if (c) setCatEdit({ ...c });
    }
  }

  function addCat() {
    const key = "cat_" + Math.random().toString(36).slice(2, 9);
    setCatEdit({ key, label: "", color: CAL_COLORS[categories.length % CAL_COLORS.length], builtin: false, hidden: false, __new: true });
  }


  function prevMonth() { setCursor((c) => (c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 })); }
  function nextMonth() { setCursor((c) => (c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 })); }
  function goToday() { const n = new Date(); setCursor({ y: n.getFullYear(), m: n.getMonth() }); setSelected(TODAY); }

  function EventRow({ e, tappable }) {
    const color = evColor(e);
    const c = calOf(e.calId);
    return (
      <button className={`sc-ev ${tappable ? "tap" : ""}`} onClick={tappable ? () => openEdit(e) : undefined}>
        <div className="sc-evbar" style={{ background: color }} />
        <div className="sc-evmain">
          <div className="sc-evname">{e.title}</div>
          <div className="sc-evmeta">
            <span className="sc-evtype" style={{ background: color + "1A", color }}>{e.type}</span>
            <span>{fmtShort(e.date)} · {fmtTime(e.time)}</span>
            {e.remind && <span className="sc-bell"><Bell /> {remindShort(e.remind)}</span>}
            {c && <span>· {c.name}</span>}
          </div>
        </div>
        {tappable && <span className="sc-chev"><Chev /></span>}
      </button>
    );
  }

  return (
    <div className="sc-root">
      <style>{STYLES}</style>
      <div className="sc-shell">
        {gcalMsg && <div style={{ background: "#15306B", color: "#fff", borderRadius: 12, padding: "10px 14px", fontSize: 13.5, fontWeight: 600, margin: "4px 2px 10px", textAlign: "center" }}>{gcalMsg}</div>}
        {stage === "home" ? (
          <div className="sc-topbar">
            <button className="sc-menubtn" onClick={() => setMenuOpen(true)} aria-label="Menu"><MenuIcon /></button>
            <span className="sc-topword"><span className="hl">Syl</span>la</span>
          </div>
        ) : (
          <div className="sc-topbar"><span className="sc-topword"><span className="hl">Syl</span>la</span></div>
        )}

        <input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={onFile} style={{ display: "none" }} />

        {stage === "home" && tab === "snap" && (
          <>
            <div className={`sy-hero ${dragOver ? "drag" : ""}`} onDrop={onDrop} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={(e) => { e.preventDefault(); if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(false); }}>
              <h1 className="sy-hl">Snap a schedule.<br />Get a calendar.</h1>
              <p className="sy-sub">Point your camera at a syllabus, work schedule, or flyer. Every date is pulled out for you to confirm, in seconds.</p>
              {heroPreview ? (
                <div className="sy-preview">
                  <div className="sy-prev-top">
                    <span className="sy-prev-title">{heroPreview.title}</span>
                    <span className="sy-prev-tag">{heroPreview.count} {heroPreview.count === 1 ? "date" : "dates"}</span>
                  </div>
                  {heroPreview.rows.map((e) => (
                    <div className="sy-prev-row" key={e.id}>
                      <span className="sy-prev-bar" style={{ background: evColor(e) }} />
                      <div>
                        <div className="sy-prev-name">{e.title}</div>
                        <div className="sy-prev-meta">{fmtShort(e.date)}{e.time ? " \u00b7 " + fmtTime(e.time) : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sy-preview" aria-hidden="true">
                  <div className="sy-prev-top"><span className="sy-prev-title">Course Calendar</span><span className="sy-prev-tag">Example</span></div>
                  <div className="sy-prev-row"><span className="sy-prev-bar" style={{ background: "#2F62F0" }} /><div><div className="sy-prev-name">Essay 1 due</div><div className="sy-prev-meta">Fri, Sep 12</div></div></div>
                  <div className="sy-prev-row"><span className="sy-prev-bar" style={{ background: "#D8364A" }} /><div><div className="sy-prev-name">Midterm exam</div><div className="sy-prev-meta">Tue, Oct 14 \u00b7 10:00 AM</div></div></div>
                  <div className="sy-prev-row"><span className="sy-prev-bar" style={{ background: "#198A5E" }} /><div><div className="sy-prev-name">Reading: Chapter 5</div><div className="sy-prev-meta">Thu, Oct 16</div></div></div>
                </div>
              )}
              <button className="sc-btn" onClick={pick}>Scan a schedule</button>
              <button className="sy-pastelink" onClick={() => {
                if (!consented) { consentIntent.current = "paste"; setConsentOpen(true); return; }
                setPasteOpen(true);
              }}>Paste text instead</button>
              <div className="sy-drop-hint">or drag a photo, PDF, or .txt here</div>
              <div className="sc-reassure">You'll confirm every date before anything is added.</div>
            </div>
            <div className="sy-how">
              <div className="sy-how-step"><span className="sy-how-num">1</span><div><div className="sy-how-t">Snap it</div><div className="sy-how-d">A syllabus, work schedule, lease, or flyer. Photo or PDF.</div></div></div>
              <div className="sy-how-step"><span className="sy-how-num">2</span><div><div className="sy-how-t">Confirm the dates</div><div className="sy-how-d">Check what it pulled and fix anything in a tap.</div></div></div>
              <div className="sy-how-step"><span className="sy-how-num">3</span><div><div className="sy-how-t">Keep or export</div><div className="sy-how-d">Keep them in Sylla or send them to your own calendar.</div></div></div>
            </div>
            <div className="sy-trust">Reads a full semester of dates in seconds.</div>
          </>
        )}

        {stage === "home" && tab === "calendar" && (
          <>
            <div className="sc-caltop">
              <span className="sc-monthlabel">{MONTHS[cursor.m]} {cursor.y}</span>
              <div className="sc-navs">
                <button className="sc-today" onClick={goToday}>Today</button>
                <button className="sc-navbtn" onClick={prevMonth} aria-label="Previous">‹</button>
                <button className="sc-navbtn" onClick={nextMonth} aria-label="Next">›</button>
              </div>
            </div>
            <div className="sc-cal2">
              <div className="sc-wdrow">{WD.map((w, i) => <div className="sc-wd" key={i}>{w}</div>)}</div>
              <div className="sc-grid">
                {cells.map((d, i) => {
                  if (!d) return <div className="sc-day empty" key={i} />;
                  const ds = ymd(cursor.y, cursor.m, d);
                  const colors = [...new Set(dayEvents(ds).map((e) => evColor(e)))].slice(0, 4);
                  return (
                    <div className={`sc-day ${ds === TODAY ? "today" : ""} ${ds === selected ? "sel" : ""}`} key={i} onClick={() => setSelected(ds)}>
                      <span>{d}</span>
                      <div className="sc-dots">{colors.map((c, j) => <span className="sc-dot" key={j} style={{ background: c }} />)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sc-agtitle">{fmtLong(selected)}</div>
            {selEvents.length ? selEvents.map((e) => <EventRow key={e.id} e={e} tappable />) : <div className="sc-empty">Nothing scheduled this day.</div>}
            <button className="sc-addbtn" onClick={openNew} style={{ marginTop: 4 }}>+ Add an event</button>
            {upcoming.length > 0 && (<><div className="sc-agtitle">Upcoming</div>{upcoming.map((e) => <EventRow key={e.id} e={e} tappable />)}</>)}
          </>
        )}

        {stage === "home" && tab === "organize" && (
          <>
            <div className="sc-section">Color key</div>
            <div className="sc-legend">
              {visibleCats.map((c) => (
                <span
                  className={`sc-legitem ${dragCat === c.key ? "dragging" : ""}`}
                  key={c.key}
                  data-catkey={c.key}
                  onPointerDown={(e) => catPointerDown(e, c.key)}
                  onPointerMove={catPointerMove}
                  onPointerUp={(e) => catPointerUp(e, c.key)}
                  onPointerCancel={() => { dragInfo.current = null; setDragCat(null); }}
                  title="Tap to edit, drag to reorder"
                >
                  <span className="sc-legdot" style={{ background: c.color }} />{c.label || "Untitled"}
                </span>
              ))}
              <button className="sc-legadd" onClick={addCat}>+ Add category</button>
            </div>
            <div className="sc-legnote">Drag to reorder. Tap a category to rename or recolor it. Tap any event to recolor that one.</div>
            <div className="sc-section">Your calendars</div>
            {calendars.map((c) => {
              const count = events.filter((e) => e.calId === c.id).length;
              return (
                <div className={`sc-calrow ${c.visible ? "" : "hidden"}`} key={c.id}>
                  <span className="sc-swatch" style={{ background: c.color }} />
                  {renameId === c.id ? (
                    <input className="sc-renameinput" autoFocus value={renameVal} onChange={(e) => setRenameVal(e.target.value)} onBlur={saveRename} onKeyDown={(e) => { if (e.key === "Enter") saveRename(); }} />
                  ) : (
                    <span className="sc-calname">{c.name}</span>
                  )}
                  <span className="sc-calcount">{count}</span>
                  <button className="sc-iconbtn" onClick={() => startRename(c)} aria-label="Rename"><Pencil /></button>
                  <button className="sc-iconbtn" onClick={() => toggleCal(c.id)} aria-label="Show or hide"><Eye on={c.visible} /></button>
                  {calendars.length > 1 && <button className="sc-iconbtn sc-calx" onClick={() => removeCal(c.id)} aria-label="Disconnect"><X /></button>}
                </div>
              );
            })}
            {addingCal ? (
              <div className="sc-addform">
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Calendar name (e.g. Sports)" />
                <div className="sc-colors">
                  {palette.map((col) => <span key={col} className={`sc-coldot ${newColor === col ? "on" : ""}`} style={{ background: col }} onClick={() => setNewColor(col)} />)}
                  <label className="sc-coldot custom"><span>+</span><input type="color" value={newColor} onChange={(e) => pickCustom(e.target.value)} /></label>
                </div>
                <div className="sc-addactions">
                  <button className="sc-btn" onClick={addCal}>Add calendar</button>
                  <button className="sc-btn ghost" onClick={() => setAddingCal(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="sc-addbtn" onClick={() => setAddingCal(true)}>+ New calendar</button>
            )}

            <div className="sc-section">All events</div>
            {events.length === 0 ? (
              <div className="sc-emptybig">Nothing here yet. Snap a schedule and your events will show up, each one you can tap to rename, recolor, change the date, or set a reminder.</div>
            ) : (
              calendars.map((c) => {
                const evs = events.filter((e) => e.calId === c.id).sort(byDate);
                if (!evs.length) return null;
                return (
                  <div key={c.id}>
                    <div className="sc-grphead">
                      <span className="sc-swatch" style={{ background: c.color }} />
                      <span className="sc-grpname">{c.name}</span>
                      <span className="sc-grpcount">{evs.length} events</span>
                    </div>
                    {evs.map((e) => <EventRow key={e.id} e={e} tappable />)}
                  </div>
                );
              })
            )}
          </>
        )}

        {stage === "reading" && (
          <div className="sc-reading">
            <div className="sc-doc"><div className="sc-scanline" /></div>
            <h2>Reading your dates…</h2>
            <p>Pulling out every deadline and exam.</p>
          </div>
        )}

        {stage === "review" && (
          <>
            <div className="sc-head">
              <h2>Confirm your dates</h2>
              <span className="sc-count">{onCount}/{draft.length} selected</span>
            </div>
            <p className="sc-hint" style={{ margin: "7px 2px 12px" }}>Check the dates, fix anything, then add.</p>
            {draftSummary && <div className="sc-tally">Found {draftSummary}.</div>}
            {draftCats.length > 0 && (
              <div className="sc-legend compact">
                {draftCats.map((c) => (
                  <span
                    className={`sc-legitem ${dragCat === c.key ? "dragging" : ""}`}
                    key={c.key}
                    data-catkey={c.key}
                    onPointerDown={(e) => catPointerDown(e, c.key)}
                    onPointerMove={catPointerMove}
                    onPointerUp={(e) => catPointerUp(e, c.key)}
                    onPointerCancel={() => { dragInfo.current = null; setDragCat(null); }}
                    title="Tap to edit, drag to reorder"
                  >
                    <span className="sc-legdot" style={{ background: c.color }} />{c.label || "Untitled"}
                  </span>
                ))}
              </div>
            )}
            <div className="sc-ctls">
              <div className="sc-ctl">
                <label className="sc-ctllabel">Add to</label>
                <select className="sc-pick" value={targetCal} onChange={(e) => setTargetCal(e.target.value)}>
                  <option value="__new__">{suggestName ? `New: ${suggestName}` : "New calendar"}</option>
                  {calendars.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="sc-ctl">
                <label className="sc-ctllabel">Remind</label>
                <select className="sc-pick" value={bulkRemind} onChange={(e) => setAllRemind(e.target.value)}>{REMINDERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
              </div>
            </div>
            {targetCal === "__new__" && (
              <div className="sc-ctls">
                <div className="sc-ctl">
                  <label className="sc-ctllabel">Calendar name</label>
                  <input className="sc-pick" value={suggestName} onChange={(e) => setSuggestName(e.target.value)} placeholder="New calendar name" />
                </div>
              </div>
            )}
            {draft.map((e, i) => (
              <div className={`sc-card ${e.on ? "" : "off"}`} key={i}>
                <div className="sc-row1">
                  <div className={`sc-check ${e.on ? "on" : ""}`} onClick={() => updateDraft(i, "on", !e.on)} role="checkbox" aria-checked={e.on}>{e.on && <Check />}</div>
                  <input className="sc-title" value={e.title} onChange={(ev) => updateDraft(i, "title", ev.target.value)} />
                  <button className="sc-del" onClick={() => removeDraft(i)} aria-label="Remove"><X /></button>
                </div>
                <div className="sc-row2">
                  <label className="sc-swatchpick" style={{ background: e.color }} title="Change color"><input type="color" value={e.color} onChange={(ev) => updateDraft(i, "color", ev.target.value)} /></label>
                  <input className="sc-field" type="date" value={e.date} onChange={(ev) => updateDraft(i, "date", ev.target.value)} />
                  <input className="sc-field" type="time" value={e.time} onChange={(ev) => updateDraft(i, "time", ev.target.value)} />
                </div>
              </div>
            ))}
            <div className="sc-bar">
              <button className="sc-btn" onClick={commit} disabled={!onCount}>Confirm &amp; add {onCount} to {targetCal === "__new__" ? (suggestName || "new calendar") : (calOf(targetCal) ? calOf(targetCal).name : "calendar")}</button>
              <button className="sc-btn ghost" onClick={() => { setDraft([]); setStage("home"); }} style={{ marginTop: 10 }}>Cancel</button>
            </div>
          </>
        )}

        {stage === "error" && (
          <div className="sc-msg">
            <h2>Couldn't pull dates</h2>
            <p>{errMsg}</p>
            <button className="sc-btn" onClick={() => setStage("home")}>Try again</button>
            <button className="sc-btn ghost" onClick={() => { setStage("home"); setTab("calendar"); openNew(); }} style={{ marginTop: 10 }}>Add a date manually</button>
          </div>
        )}

        {stage === "home" && (
          <div className="sc-tabbar">
            <button className={`sc-tab ${tab === "calendar" ? "on" : ""}`} onClick={() => setTab("calendar")}><CalIcon /><span>Calendar</span></button>
            <button className={`sc-tab ${tab === "organize" ? "on" : ""}`} onClick={() => setTab("organize")}><ListIcon /><span>Organize</span></button>
            <button className={`sc-tab ${tab === "snap" ? "on" : ""}`} onClick={() => setTab("snap")}><CamIcon /><span>Snap</span></button>
          </div>
        )}
      </div>

      {consentOpen && (
        <div className="sc-modal" onClick={() => setConsentOpen(false)}>
          <div className="sc-modalcard sc-choose" onClick={(e) => e.stopPropagation()}>
            <h3>Before your first scan</h3>
            <p>Your photo is used only to read it and is not stored. Dates stay on your device.</p>
            <button className="sc-btn" onClick={acceptConsent}>I agree, continue</button>
            <button className="sc-btn ghost" onClick={() => setConsentOpen(false)} style={{ marginTop: 10 }}>Cancel</button>
            <div className="sc-choosesub">Read our <a href={import.meta.env.VITE_PRIVACY_URL || "/privacy.html"} target="_blank" rel="noreferrer" style={{ color: "var(--primary)", fontWeight: 600 }}>Privacy Policy</a>.</div>
          </div>
        </div>
      )}

      {pending && (
        <div className="sc-modal" onClick={chooserKeep}>
          <div className="sc-modalcard sc-choose" onClick={(e) => e.stopPropagation()}>
            <h3>You're all set</h3>
            <p>{pending.length} {pending.length === 1 ? "date" : "dates"} ready. Where do you want them?</p>
            <button className="sc-btn" onClick={chooserSend}>Send to Apple, Outlook, or other</button>
            <div className="sc-chooselbl">Downloads a calendar file you open once.</div>
            {GOOGLE_CLIENT_ID && <button className="sc-btn ghost" onClick={() => { const list = pending; setPending(null); startGoogleAdd(list); }} style={{ marginTop: 14 }}>Add to Google Calendar</button>}
            {GOOGLE_CLIENT_ID && <div className="sc-chooselbl">Sends them straight to your Google Calendar.</div>}
            <button className="sc-btn ghost" onClick={chooserKeep} style={{ marginTop: 14 }}>Just keep them in Sylla</button>
            <div className="sc-choosesub">No account needed, any option.</div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="sc-overlay" onClick={() => setMenuOpen(false)}>
          <div className="sc-sheet" onClick={(e) => e.stopPropagation()}>
            <h3>Sylla</h3>
            <button className="sc-menuitem" onClick={() => { setMenuOpen(false); setTab("snap"); setStage("home"); }}><CamIcon style={{ width: 20, height: 20 }} /> Snap a schedule</button>
            <button className="sc-menuitem" onClick={() => { setMenuOpen(false); setTab("calendar"); setStage("home"); openNew(); }}><Pencil style={{ width: 20, height: 20 }} /> Add an event manually</button>
            <button className="sc-menuitem" onClick={() => { setMenuOpen(false); downloadICS(visEvents); }}><DownIcon /> Send all to my calendar (.ics)</button>
            {GOOGLE_CLIENT_ID && EVENTS_URL && (
              idToken ? (
                <div style={{ padding: "12px 10px", fontSize: 13 }}>
                  <div style={{ color: "var(--soft)", fontSize: 12 }}>Synced as</div>
                  <div style={{ color: "var(--ink)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{gUser || "Google account"}</div>
                  <button className="sc-selbtn" style={{ marginTop: 8 }} onClick={signOut}>Sign out</button>
                </div>
              ) : (
                <div style={{ padding: "12px 10px" }}>
                  <div style={{ color: "var(--soft)", fontSize: 12.5, marginBottom: 8 }}>Sign in to back up and sync across devices.</div>
                  <div ref={gBtnRef} />
                </div>
              )
            )}
            <div className="sc-help">
              <h4>Help &amp; tips</h4>
              <p>Tap any event to rename it, change its color or date, or set a reminder, one at a time.</p>
              <p>Reminders ride along when you send events to your own calendar.</p>
              <p>Keep events here in Sylla or send them out. No account needed.</p>
            </div>
          </div>
        </div>
      )}

      {pasteOpen && (
        <div className="sc-modal" onClick={() => setPasteOpen(false)}>
          <div className="sc-modalcard" onClick={(e) => e.stopPropagation()}>
            <h3>Paste your schedule</h3>
            <p className="sc-hint" style={{ margin: "0 0 12px" }}>Paste the part of a syllabus or schedule that lists dates.</p>
            <textarea
              className="sc-textarea"
              value={pasteVal}
              autoFocus
              onChange={(e) => setPasteVal(e.target.value.slice(0, 20000))}
              placeholder={"Sep 12 - Essay 1 due\nOct 14, 10:00am - Midterm exam\nOct 16 - Reading: Chapter 5"}
            />
            <div className="sc-modalactions">
              <button className="sc-btn ghost" onClick={() => setPasteOpen(false)}>Cancel</button>
              <button className="sc-btn" onClick={submitPaste} disabled={!pasteVal.trim()}>Pull out the dates</button>
            </div>
          </div>
        </div>
      )}

      {catEdit && (
        <div className="sc-modal" onClick={() => setCatEdit(null)}>
          <div className="sc-modalcard" onClick={(e) => e.stopPropagation()}>
            <h3>{catEdit.__new ? "New category" : "Edit category"}</h3>
            <label className="sc-flabel">Name</label>
            <input className="sc-finput" value={catEdit.label} placeholder="e.g. Lab, Shift, Rent"
              onChange={(e) => setCatEdit({ ...catEdit, label: e.target.value })} />
            <div className="sc-frow">
              <div><label className="sc-flabel">Color</label>
                <label className="sc-colorbig" style={{ background: catEdit.color }}>
                  <input type="color" value={catEdit.color} onChange={(e) => setCatEdit({ ...catEdit, color: e.target.value })} />
                </label>
              </div>
            </div>
            {catEdit.builtin && (
              <>
                <label className="sc-flabel">Show in color key</label>
                <select className="sc-finput" value={catEdit.hidden ? "hidden" : "shown"}
                  onChange={(e) => setCatEdit({ ...catEdit, hidden: e.target.value === "hidden" })}>
                  <option value="shown">Shown</option>
                  <option value="hidden">Hidden</option>
                </select>
              </>
            )}
            <div className="sc-modalactions">
              {!catEdit.builtin && <button className="sc-delbtn" onClick={() => deleteCat(catEdit.key)}>Delete</button>}
              <button className="sc-btn" onClick={() => saveCat({ ...catEdit, label: (catEdit.label || "").trim() || "Untitled", __new: undefined })}>Save</button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="sc-modal" onClick={() => setEditing(null)}>
          <div className="sc-modalcard" onClick={(e) => e.stopPropagation()}>
            <h3>{editing.__new ? "New event" : "Edit event"}</h3>
            <label className="sc-flabel">Title</label>
            <input className="sc-finput" value={editing.title} placeholder="What is it? (e.g. Lab report due)" onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <div className="sc-frow">
              <div><label className="sc-flabel">Date</label><input className="sc-finput" type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
              <div><label className="sc-flabel">Time</label><input className="sc-finput" type="time" value={editing.time} onChange={(e) => setEditing({ ...editing, time: e.target.value })} /></div>
            </div>
            <div className="sc-frow">
              <div><label className="sc-flabel">Color</label><label className="sc-colorbig" style={{ background: editing.color }}><input type="color" value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })} /></label></div>
              <div><label className="sc-flabel">Calendar</label><select className="sc-finput" value={editing.calId} onChange={(e) => setEditing({ ...editing, calId: e.target.value })}>{calendars.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            </div>
            <label className="sc-flabel">Type</label>
            <select className="sc-finput" value={editing.type || "other"} onChange={(e) => {
              const nextType = e.target.value;
              const keepColor = !isDefaultColor(editing.color, editing.type || "other");
              setEditing({ ...editing, type: nextType, color: keepColor ? editing.color : catColor(nextType) });
            }}>
              {visibleCats.map((c) => <option key={c.key} value={c.key}>{c.label || "Untitled"}</option>)}
            </select>
            <label className="sc-flabel">Reminder</label>
            <select className="sc-finput" value={editing.remind || ""} onChange={(e) => setEditing({ ...editing, remind: e.target.value })}>{REMINDERS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
            <div className="sc-modalactions">
              {!editing.__new && <button className="sc-delbtn" onClick={deleteEvent}>Delete</button>}
              <button className="sc-btn" onClick={saveEdit}>{editing.__new ? "Add event" : "Save changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
