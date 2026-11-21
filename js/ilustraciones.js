/* Ilustraciones propias del ODC (SVG). Basadas en el apartado «Imagen» del storyboard. Sin logos ni imágenes externas. */
var ILU = (function () {
  var N = '#14213D', T = '#1A9E8F', TD = '#137A6F', M = '#DDF1EE', M2 = '#BFE3DD', O = '#F4A23B', C = '#FDF1E1', W = '#fff', G = '#8E9BA8';

  function svg(vb, body, cls) { return '<svg class="ilu ' + (cls || '') + '" viewBox="' + vb + '" role="img" aria-hidden="true">' + body + '</svg>'; }

  /* --- piezas reutilizables --- */
  function school(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<rect x="0" y="22" width="70" height="40" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/>' +
      '<path d="M-6 24 L35 0 L76 24 Z" fill="' + O + '" stroke="' + N + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<rect x="28" y="38" width="14" height="24" fill="' + T + '" stroke="' + N + '" stroke-width="2"/>' +
      '<rect x="8" y="32" width="12" height="10" fill="' + M + '" stroke="' + N + '" stroke-width="2"/><rect x="50" y="32" width="12" height="10" fill="' + M + '" stroke="' + N + '" stroke-width="2"/>' +
      '<circle cx="35" cy="14" r="4" fill="' + W + '" stroke="' + N + '" stroke-width="2"/></g>';
  }
  function signal(x, y, s, on) {
    s = s || 1; on = on == null ? 4 : on;
    var b = '';
    for (var i = 0; i < 4; i++) b += '<rect x="' + (i * 9) + '" y="' + (24 - i * 7 - 6) + '" width="6" height="' + (i * 7 + 6) + '" rx="1.5" fill="' + (i < on ? T : '#D3DEE5') + '"/>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + b + '</g>';
  }
  function tower(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + N + '" stroke-width="2.5" fill="none" stroke-linecap="round">' +
      '<path d="M0 80 L14 10 L28 80 M5 56 L23 56 M8 36 L20 36 M0 80 L23 56 M28 80 L5 56 M5 56 L20 36 M23 56 L8 36"/>' +
      '<circle cx="14" cy="8" r="4" fill="' + O + '"/>' +
      '<path d="M2 0 a16 16 0 0 0 0 16 M26 0 a16 16 0 0 1 0 16 M-6 -6 a26 26 0 0 0 0 28 M34 -6 a26 26 0 0 1 0 28" stroke="' + T + '"/></g>';
  }
  function satellite(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ') rotate(-20 30 15)">' +
      '<rect x="0" y="6" width="20" height="18" fill="' + T + '" stroke="' + N + '" stroke-width="2"/><path d="M0 12h20M0 18h20M7 6v18M13 6v18" stroke="' + W + '" stroke-width="1.2"/>' +
      '<rect x="22" y="8" width="16" height="14" rx="3" fill="' + W + '" stroke="' + N + '" stroke-width="2"/>' +
      '<rect x="40" y="6" width="20" height="18" fill="' + T + '" stroke="' + N + '" stroke-width="2"/><path d="M40 12h20M40 18h20M47 6v18M53 6v18" stroke="' + W + '" stroke-width="1.2"/>' +
      '<path d="M30 22 v8" stroke="' + N + '" stroke-width="2"/><circle cx="30" cy="32" r="3" fill="' + O + '"/></g>';
  }
  function router(x, y, s) {
    s = s || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M10 0 v12 M38 0 v12" stroke="' + N + '" stroke-width="2.5" stroke-linecap="round"/>' +
      '<rect x="0" y="12" width="48" height="20" rx="5" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/>' +
      '<circle cx="11" cy="22" r="2.5" fill="' + T + '"/><circle cx="20" cy="22" r="2.5" fill="' + T + '"/><circle cx="29" cy="22" r="2.5" fill="#D3DEE5"/></g>';
  }
  function person(x, y, skin, hair, shirt, s, kind) {
    s = s || 1;
    var h = kind === 'long' ? '<path d="M-17 2 Q-18 -24 0 -25 Q18 -24 17 2 L17 20 Q10 12 9 0 L-9 0 Q-10 12 -17 20 Z" fill="' + hair + '"/>' :
      kind === 'gray' ? '<path d="M-15 -4 Q-14 -24 0 -24 Q14 -24 15 -4 Q12 -16 0 -15 Q-12 -16 -15 -4 Z" fill="' + hair + '"/><circle cx="0" cy="-26" r="7" fill="' + hair + '"/>' :
        kind === 'braids' ? '<path d="M-15 -2 Q-15 -24 0 -24 Q15 -24 15 -2 Q10 -14 0 -14 Q-10 -14 -15 -2 Z" fill="' + hair + '"/><path d="M-14 -2 v26 M14 -2 v26" stroke="' + hair + '" stroke-width="6" stroke-linecap="round"/>' :
          '<path d="M-15 -6 Q-12 -24 2 -23 Q16 -21 15 -6 Q8 -14 -2 -12 Q-10 -12 -15 -6 Z" fill="' + hair + '"/>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-28 58 Q-28 26 0 26 Q28 26 28 58 Z" fill="' + shirt + '"/>' +
      '<rect x="-6" y="14" width="12" height="14" fill="' + skin + '"/>' +
      (kind === 'long' ? h : '') + '<ellipse cx="0" cy="0" rx="15" ry="17" fill="' + skin + '"/>' + (kind !== 'long' ? h : '<path d="M-15 -4 Q-12 -20 0 -19 Q12 -20 15 -4 Q8 -12 0 -12 Q-8 -12 -15 -4 Z" fill="' + hair + '"/>') +
      '<circle cx="-5" cy="1" r="1.8" fill="' + N + '"/><circle cx="5" cy="1" r="1.8" fill="' + N + '"/><path d="M-4 8 q4 3 8 0" fill="none" stroke="' + N + '" stroke-width="1.6" stroke-linecap="round"/>' +
      (kind === 'gray' ? '<path d="M-9 1 h6 M3 1 h6 M-3 1 h6" stroke="' + N + '" stroke-width="1.2" fill="none"/><circle cx="-6" cy="1" r="4" fill="none" stroke="' + N + '" stroke-width="1.2"/><circle cx="6" cy="1" r="4" fill="none" stroke="' + N + '" stroke-width="1.2"/>' : '') +
      '</g>';
  }
  function house(x, y, s, fill) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 22 L24 2 L48 22" fill="' + O + '" stroke="' + N + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<rect x="6" y="20" width="36" height="28" fill="' + fill + '" stroke="' + N + '" stroke-width="2.5"/><rect x="20" y="32" width="9" height="16" fill="' + T + '"/></g>';
  }

  /* --- ilustraciones por pantalla --- */
  return {
    hero: svg('0 0 640 300',
      '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EAF6F4"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>' +
      '<rect width="640" height="300" fill="url(#sky)"/><circle cx="530" cy="64" r="30" fill="' + C + '"/>' +
      '<path d="M0 230 L120 120 L210 200 L330 90 L460 210 L560 140 L640 200 L640 300 L0 300Z" fill="' + M2 + '"/>' +
      '<path d="M0 260 Q140 200 300 240 T640 230 L640 300 L0 300Z" fill="' + T + '" opacity=".35"/>' +
      '<path d="M0 285 Q180 250 360 275 T640 268 L640 300 L0 300Z" fill="' + T + '" opacity=".55"/>' +
      satellite(400, 26, 1.1) +
      '<path d="M432 70 Q380 150 300 196" fill="none" stroke="' + O + '" stroke-width="2.5" stroke-dasharray="6 6"/>' +
      tower(150, 140, 1.05) + '<path d="M180 190 Q230 205 262 214" fill="none" stroke="' + O + '" stroke-width="2.5" stroke-dasharray="6 6"/>' +
      school(250, 196, 1.15) +
      '<g fill="' + N + '" opacity=".75"><path d="M70 250 l10 -26 l10 26z"/><path d="M92 254 l8 -20 l8 20z"/><path d="M560 248 l10 -26 l10 26z"/></g>'),

    mapBg: svg('0 0 1000 300',
      '<path d="M0 220 L120 120 L230 200 L360 80 L500 210 L620 110 L760 200 L880 120 L1000 190 L1000 300 L0 300Z" fill="' + M + '"/>' +
      '<path d="M0 260 Q200 210 420 250 T1000 240 L1000 300 L0 300Z" fill="' + M2 + '" opacity=".7"/>', 'bg'),

    p3: svg('0 0 300 210',
      '<rect x="0" y="0" width="300" height="210" rx="14" fill="' + M + '"/>' +
      '<rect x="18" y="20" width="70" height="52" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/><path d="M53 20 v52 M18 46 h70" stroke="' + N + '" stroke-width="2"/>' +
      '<path d="M26 64 l16 -18 l12 12 l10 -8 l16 14" fill="none" stroke="' + T + '" stroke-width="2.5"/>' +
      '<rect x="20" y="168" width="260" height="10" rx="3" fill="#C9A27A"/>' +
      '<rect x="92" y="62" width="150" height="96" rx="8" fill="' + N + '"/><rect x="100" y="70" width="134" height="80" rx="3" fill="#E9EEF2"/>' +
      '<circle cx="167" cy="98" r="13" fill="#C9D3DA"/><path d="M146 136 q21 -26 42 0" fill="#C9D3DA"/>' +
      '<rect x="100" y="70" width="134" height="80" fill="' + N + '" opacity=".35"/>' +
      '<g transform="translate(167 110)"><circle r="16" fill="none" stroke="' + W + '" stroke-width="4" stroke-dasharray="70 30"/></g>' +
      '<path d="M78 158 h178 l10 10 h-198z" fill="#3B4A63"/>' +
      '<g transform="translate(236 20)"><rect x="-6" y="-6" width="50" height="40" rx="8" fill="' + W + '" stroke="' + N + '" stroke-width="2"/>' + signal(2, 2, 1, 1) + '</g>' +
      '<text x="261" y="72" text-anchor="middle" font-size="11" font-family="Arial" font-weight="700" fill="' + N + '">4G</text>'),

    houses: svg('0 0 520 170',
      '<text x="130" y="16" font-size="12" font-family="Arial" fill="#5F6B7A">Hogares con internet (DANE, 2025)</text>' +
      house(30, 18, 1.15, W) + '<text x="58" y="88" text-anchor="middle" font-size="13" font-family="Arial" font-weight="700" fill="' + N + '">Cabecera</text>' +
      '<rect x="130" y="40" width="340" height="18" rx="9" fill="#EEF2F5"/><rect x="130" y="40" width="' + (340 * .725) + '" height="18" rx="9" fill="' + T + '"/><text x="' + (138 + 340 * .725) + '" y="54" font-size="13" font-family="Arial" font-weight="700" fill="' + N + '">72,5 %</text>' +
      house(30, 98, 1.15, C) + '<path d="M96 154 l7 -12 l7 12z" fill="' + T + '" opacity=".6"/><text x="58" y="168" text-anchor="middle" font-size="13" font-family="Arial" font-weight="700" fill="' + N + '">Rural</text>' +
      '<rect x="130" y="120" width="340" height="18" rx="9" fill="#EEF2F5"/><rect x="130" y="120" width="' + (340 * .419) + '" height="18" rx="9" fill="' + O + '"/><text x="' + (138 + 340 * .419) + '" y="134" font-size="13" font-family="Arial" font-weight="700" fill="' + N + '">41,9 %</text>'),

    coin: '<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="' + O + '" stroke="' + N + '" stroke-width="2"/><text x="16" y="22" text-anchor="middle" font-size="17" font-family="Arial" font-weight="700" fill="' + N + '">$</text></svg>',
    pc: '<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="5" width="24" height="16" rx="2" fill="' + W + '" stroke="' + N + '" stroke-width="2.4"/><path d="M12 26 h8 M16 21 v5" stroke="' + N + '" stroke-width="2.4" stroke-linecap="round"/></svg>',

    wan: svg('0 0 300 130',
      '<g>' + router(14, 20, 1) + router(126, 66, 1) + router(238, 20, 1) + '</g>' +
      '<path d="M38 52 V116 M150 98 V116 M262 52 V116" stroke="' + N + '" stroke-width="3"/>' +
      '<path d="M20 116 H280" stroke="' + G + '" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>' +
      '<text x="150" y="20" text-anchor="middle" font-size="12" font-family="Arial" fill="#5F6B7A">un cable por sitio</text>'),
    sdwan: svg('0 0 300 130',
      '<path d="M150 66 L48 30 M150 66 L150 112 M150 66 L252 30" stroke="' + O + '" stroke-width="3" stroke-dasharray="7 6"/>' +
      '<rect x="118" y="46" width="64" height="40" rx="10" fill="' + T + '" stroke="' + W + '" stroke-width="2"/>' +
      '<circle cx="150" cy="66" r="10" fill="none" stroke="' + W + '" stroke-width="3" stroke-dasharray="5 3"/><circle cx="150" cy="66" r="3" fill="' + W + '"/>' +
      '<g transform="translate(28 4) scale(.5)">' + '<path d="M0 80 L14 10 L28 80 M5 56 L23 56 M8 36 L20 36" stroke="' + W + '" stroke-width="4" fill="none"/></g><text x="48" y="58" text-anchor="middle" font-size="11" font-family="Arial" font-weight="700" fill="' + O + '">4G</text>' +
      '<g transform="translate(222 8) scale(.85)">' + '<rect x="0" y="6" width="18" height="16" fill="' + T + '"/><rect x="20" y="8" width="14" height="12" rx="3" fill="' + W + '"/><rect x="36" y="6" width="18" height="16" fill="' + T + '"/></g><text x="252" y="58" text-anchor="middle" font-size="11" font-family="Arial" font-weight="700" fill="' + O + '">Satélite</text>' +
      '<path d="M120 116 h60" stroke="' + W + '" stroke-width="5" stroke-linecap="round"/><path d="M120 122 h60" stroke="' + O + '" stroke-width="2" stroke-linecap="round"/><text x="196" y="122" font-size="11" font-family="Arial" font-weight="700" fill="' + O + '">Fibra</text>'),

    tower: svg('0 0 160 110', '<rect width="160" height="110" rx="12" fill="' + M + '"/><path d="M0 92 Q80 70 160 92 V110 H0Z" fill="' + M2 + '"/>' + tower(66, 18, 0.95)),
    sat: svg('0 0 160 110', '<rect width="160" height="110" rx="12" fill="' + N + '"/><circle cx="20" cy="18" r="1.5" fill="' + W + '"/><circle cx="130" cy="90" r="1.5" fill="' + W + '"/><circle cx="140" cy="20" r="1.2" fill="' + W + '"/><circle cx="30" cy="80" r="1.2" fill="' + W + '"/>' +
      '<path d="M-10 108 Q80 60 170 108" fill="#2B5A85"/><ellipse cx="80" cy="56" rx="62" ry="22" fill="none" stroke="' + O + '" stroke-width="1.5" stroke-dasharray="4 5"/>' + satellite(48, 22, 0.95)),
    roof: svg('0 0 160 110', '<rect width="160" height="110" rx="12" fill="' + C + '"/><path d="M0 96 Q80 84 160 96 V110 H0Z" fill="' + M2 + '"/>' +
      house(42, 34, 1.6, W) + '<path d="M80 38 V14" stroke="' + N + '" stroke-width="3"/><path d="M68 18 q12 -10 24 0" fill="none" stroke="' + N + '" stroke-width="3"/><circle cx="80" cy="12" r="3" fill="' + O + '"/>' +
      '<path d="M96 8 a14 14 0 0 1 0 16 M102 3 a22 22 0 0 1 0 26" fill="none" stroke="' + T + '" stroke-width="2.5" stroke-linecap="round"/>'),

    ic_video: '<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="8" width="18" height="16" rx="3" fill="' + T + '"/><path d="M21 14 l8 -5 v14 l-8 -5z" fill="' + T + '"/></svg>',
    ic_exam: '<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="4" width="20" height="25" rx="3" fill="' + W + '" stroke="' + N + '" stroke-width="2.2"/><path d="M11 12 l2 2 l4 -4 M11 20 h10 M11 24 h7" stroke="' + T + '" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>',
    ic_mail: '<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="8" width="24" height="17" rx="3" fill="' + W + '" stroke="' + N + '" stroke-width="2.2"/><path d="M5 10 l11 8 l11 -8" fill="none" stroke="' + O + '" stroke-width="2.2"/></svg>',
    ic_down: '<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4 v16 M9 14 l7 7 l7 -7" fill="none" stroke="' + N + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 26 h20" stroke="' + G + '" stroke-width="2.6" stroke-linecap="round"/></svg>',

    hospital: svg('0 0 200 110', '<rect width="200" height="110" rx="10" fill="' + M + '"/><path d="M0 96 H200 V110 H0Z" fill="' + M2 + '"/>' +
      '<rect x="50" y="34" width="100" height="62" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/><rect x="80" y="20" width="40" height="20" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/>' +
      '<path d="M100 22 v16 M92 30 h16" stroke="#D64545" stroke-width="5"/><rect x="62" y="48" width="14" height="12" fill="' + M + '"/><rect x="124" y="48" width="14" height="12" fill="' + M + '"/><rect x="90" y="70" width="20" height="26" fill="' + T + '"/>'),
    rescue: svg('0 0 200 110', '<rect width="200" height="110" rx="10" fill="' + C + '"/><path d="M0 96 H200 V110 H0Z" fill="' + M2 + '"/>' +
      '<path d="M120 96 L150 40 L190 96Z" fill="' + M2 + '"/><rect x="24" y="52" width="92" height="40" rx="6" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/><path d="M116 62 h18 l12 16 v14 h-30z" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/>' +
      '<path d="M70 60 v20 M60 70 h20" stroke="#D64545" stroke-width="5"/><rect x="58" y="42" width="22" height="10" rx="3" fill="' + O + '"/><circle cx="44" cy="94" r="8" fill="' + N + '"/><circle cx="126" cy="94" r="8" fill="' + N + '"/>' +
      '<path d="M84 38 a12 12 0 0 1 0 -14 M92 42 a20 20 0 0 1 0 -24" fill="none" stroke="' + T + '" stroke-width="2.5" stroke-linecap="round"/>'),
    crop: svg('0 0 200 110', '<rect width="200" height="110" rx="10" fill="#EAF6F4"/><path d="M0 60 H200 V110 H0Z" fill="#9ED4B3"/>' +
      '<g stroke="#2E8B57" stroke-width="3" stroke-linecap="round">' + [70, 82, 94, 106].map(function (y, i) { var r = ''; for (var x = 12 + (i % 2) * 8; x < 140; x += 16) r += '<path d="M' + x + ' ' + y + ' v-8 M' + (x - 4) + ' ' + (y - 6) + ' l4 2 l4 -2"/>'; return r; }).join('') + '</g>' +
      tower(150, 12, 0.6)),
    family: svg('0 0 200 110', '<rect width="200" height="110" rx="10" fill="' + M + '"/><path d="M0 92 Q100 78 200 92 V110 H0Z" fill="' + M2 + '"/>' +
      person(58, 50, '#8D5A3B', '#2B1B12', T, 0.8, 'long') + person(100, 46, '#C68B59', '#3A2A1E', N, 0.85, 'short') + person(140, 62, '#8D5A3B', '#2B1B12', O, 0.6, 'braids') +
      '<rect x="112" y="64" width="12" height="20" rx="2" fill="' + N + '"/><rect x="114" y="67" width="8" height="13" fill="' + M + '"/>'),

    road: svg('0 0 1000 220',
      '<path d="M0 200 L170 70 L330 170 L520 30 L720 160 L880 60 L1000 140 L1000 220 L0 220Z" fill="' + M + '"/>' +
      '<path d="M0 220 Q250 170 500 200 T1000 190 L1000 220Z" fill="' + M2 + '"/>' +
      '<path d="M90 172 C180 120 230 170 300 140 S420 70 500 110 S640 160 700 120 S820 60 900 92" fill="none" stroke="' + O + '" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/>' +
      school(905, 40, 1.05) + '<path d="M975 30 a14 14 0 0 1 0 18 M983 24 a24 24 0 0 1 0 30" fill="none" stroke="' + T + '" stroke-width="3" stroke-linecap="round"/>', 'bg'),

    fichaSchool: svg('0 0 160 110', '<rect width="160" height="110" rx="12" fill="' + M + '"/><path d="M0 92 Q80 80 160 92 V110 H0Z" fill="' + M2 + '"/>' + school(44, 28, 1.05) + signal(118, 14, 0.8, 1)),

    badge: svg('0 0 140 150',
      '<path d="M44 92 L30 146 L50 136 L62 150 L70 100Z" fill="' + T + '"/><path d="M96 92 L110 146 L90 136 L78 150 L70 100Z" fill="' + TD + '"/>' +
      '<circle cx="70" cy="62" r="52" fill="' + O + '" stroke="' + N + '" stroke-width="4"/><circle cx="70" cy="62" r="40" fill="' + C + '"/>' +
      '<path d="M40 72 Q70 32 100 72" fill="none" stroke="' + N + '" stroke-width="5"/><path d="M40 72 h60" stroke="' + N + '" stroke-width="4"/><path d="M52 72 v-12 M70 72 v-22 M88 72 v-12" stroke="' + N + '" stroke-width="3"/>' +
      '<text x="70" y="92" text-anchor="middle" font-size="9.5" font-family="Arial" font-weight="700" fill="' + N + '">PUENTE DIGITAL</text>'),

    net8: (function () {
      var pts = [[30, 70], [90, 30], [150, 70], [210, 30], [270, 70], [330, 30], [390, 70], [450, 30]], b = '';
      b += '<polyline points="' + pts.map(function (p) { return p.join(','); }).join(' ') + '" fill="none" stroke="' + T + '" stroke-width="3"/>';
      pts.forEach(function (p, i) { b += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="16" fill="' + T + '" stroke="' + W + '" stroke-width="3"/><text x="' + p[0] + '" y="' + (p[1] + 5) + '" text-anchor="middle" font-size="13" font-family="Arial" font-weight="700" fill="' + W + '">' + (i + 1) + '</text>'; });
      return svg('0 0 480 100', b);
    })(),

    cc: '<svg class="ccseal" viewBox="0 0 132 40" role="img" aria-label="Licencia Creative Commons BY-SA 4.0"><rect x="1" y="1" width="130" height="38" rx="6" fill="#fff" stroke="' + N + '" stroke-width="2"/><circle cx="20" cy="20" r="13" fill="none" stroke="' + N + '" stroke-width="2.5"/><text x="20" y="25" text-anchor="middle" font-size="13" font-family="Arial" font-weight="700" fill="' + N + '">cc</text><text x="40" y="18" font-size="11" font-family="Arial" font-weight="700" fill="' + N + '">BY-SA 4.0</text><text x="40" y="31" font-size="9" font-family="Arial" fill="#5F6B7A">Creative Commons</text></svg>',

    perfiles: {
      D: svg('0 0 120 100', '<rect width="120" height="100" rx="12" fill="' + M + '"/>' + person(60, 44, '#E0AC85', '#B9BEC4', T, 1, 'gray')),
      A: svg('0 0 120 100', '<rect width="120" height="100" rx="12" fill="' + C + '"/>' + person(60, 44, '#7A4A2A', '#1E140D', N, 1, 'short')),
      G: svg('0 0 120 100', '<rect width="120" height="100" rx="12" fill="' + M + '"/>' + person(60, 44, '#C68B59', '#2B1B12', O, 1, 'braids'))
    },
    signal: signal
  };
})();
