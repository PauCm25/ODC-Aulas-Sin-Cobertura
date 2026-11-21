/* Aulas sin cobertura · Rural Connect — lógica del ODC */
(function () {
  'use strict';

  var FASES = ['Diagnosticar', 'Comprender', 'Diseñar', 'Simular', 'Optimizar', 'Medir', 'Casos', 'Implementar'];
  var FASE_PANTALLA = { 1: 3, 2: 6, 3: 7, 4: 9, 5: 10, 6: 12, 7: 13, 8: 14 };
  var PERFILES = { D: 'Docente', A: 'Administrador de red', G: 'Gestor' };
  var TOTAL = 18;

  /* ---------------- estado ---------------- */
  var S = {
    p: 1, prof: null, pts: 0, ph: [0, 0, 0, 0, 0, 0, 0, 0], got: {},
    p3: null, p9: [], p11: null, p13: [], p14r: '',
    plan: { e: '', t: '', i: '', l: '' }, self: [0, 0, 0, 0], planOk: 0, seen: {}, mute: false,
    reto: { v: 0, n: 0, best: null, last: null }
  };

  function save() {
    if (typeof updateNav === 'function') updateNav();
    var data = JSON.stringify(S);
    try { localStorage.setItem('ruralconnect_odc', data); } catch (e) {}
    if (SCORM.isActive()) {
      var c = JSON.parse(data);
      ['e', 't', 'i', 'l'].forEach(function (k) { c.plan[k] = (c.plan[k] || '').slice(0, 700); });
      c.p14r = (c.p14r || '').slice(0, 300);
      SCORM.set('cmi.suspend_data', JSON.stringify(c));
      SCORM.set('cmi.core.lesson_location', String(S.p));
      SCORM.commit();
    }
  }
  function load() {
    var raw = '';
    if (SCORM.isActive()) raw = SCORM.get('cmi.suspend_data');
    if (!raw) { try { raw = localStorage.getItem('ruralconnect_odc') || ''; } catch (e) {} }
    if (!raw) return;
    try {
      var o = JSON.parse(raw);
      for (var k in o) if (Object.prototype.hasOwnProperty.call(S, k)) S[k] = o[k];
    } catch (e) {}
  }

  /* ---------------- utilidades ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2600); }
  function award(key, n) { if (S.got[key]) return; S.got[key] = 1; S.pts += n; toast('+' + n + ' puntos'); updateTop(); save(); }
  function light(f) { if (S.ph[f - 1]) return; S.ph[f - 1] = 1; toast('¡Se encendió el nodo ' + FASES[f - 1] + '!'); updateTop(); save(); }
  function allPhases() { return S.ph.every(function (x) { return x; }); }
  function modal(title, html) {
    $('#modalBody').innerHTML = '<h2>' + title + '</h2>' + html;
    $('#modal').classList.add('show'); $('#modalClose').focus();
  }
  function closeModal() { $('#modal').classList.remove('show'); }

  /* ---------------- Nodo (avatar) ---------------- */
  var NODO_SVG = '<svg viewBox="0 0 120 140" aria-hidden="true"><g class="whole">' +
    '<g class="waves"><path d="M48 9a16 16 0 0 1 24 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" style="transform-origin:60px 12px"/>' +
    '<path d="M41 3a25 25 0 0 1 38 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" style="transform-origin:60px 12px"/></g>' +
    '<path d="M60 12v12" stroke="#14213D" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="12" r="5" fill="#fff" stroke="#14213D" stroke-width="2"/>' +
    '<g class="arm-l"><path d="M30 92 Q16 104 20 116" fill="none" stroke="#1A9E8F" stroke-width="8" stroke-linecap="round"/></g>' +
    '<g class="arm-r"><path d="M90 92 Q104 102 100 116" fill="none" stroke="#1A9E8F" stroke-width="8" stroke-linecap="round"/></g>' +
    '<rect x="26" y="24" width="68" height="56" rx="26" fill="#1A9E8F"/>' +
    '<rect x="36" y="35" width="48" height="31" rx="14" fill="#fff"/>' +
    '<g class="eyes"><circle cx="50" cy="48" r="5.5" fill="#14213D"/><circle cx="70" cy="48" r="5.5" fill="#14213D"/><circle cx="52" cy="46" r="1.8" fill="#fff"/><circle cx="72" cy="46" r="1.8" fill="#fff"/></g>' +
    '<path class="mouth-closed" d="M52 58q8 6 16 0" fill="none" stroke="#14213D" stroke-width="3" stroke-linecap="round"/>' +
    '<ellipse class="mouth-open" cx="60" cy="59" rx="6" ry="4.5" fill="#14213D"/>' +
    '<path d="M60 80 L102 122 Q60 134 18 122 Z" fill="#14213D"/>' +
    '<path d="M28 117 l8 -6 8 6 8 -6 8 6 8 -6 8 6 8 -6 8 6" fill="none" stroke="#F4A23B" stroke-width="3"/>' +
    '<path d="M36 108 l6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5" fill="none" stroke="#DDF1EE" stroke-width="2"/>' +
    '<path d="M53 94a10 10 0 0 1 14 0M56 98a5 5 0 0 1 8 0" fill="none" stroke="#DDF1EE" stroke-width="2.4" stroke-linecap="round"/><circle cx="60" cy="102" r="2" fill="#DDF1EE"/>' +
    '</g></svg>';

  /* ---------------- consejos por perfil ---------------- */
  var TIPS = {
    7: { D: 'Pregunta a padres y directivos qué operador tiene mejor señal en la vereda.', A: 'Antes de elegir, mide velocidad y latencia de cada enlace.', G: 'Cotiza el costo mensual y la inversión inicial de cada enlace.' },
    9: { D: 'Fíjate en la disponibilidad: es lo que evita que la clase se caiga.', A: 'Compara la latencia para decidir qué tráfico va por cada enlace.', G: 'Mira el costo: ¿el respaldo cabe en el presupuesto del año?' },
    12: { D: 'La pérdida de paquetes se nota como imagen congelada o voz cortada.', A: 'Mide en horas pico, no solo cuando la red está libre.', G: 'Pide que el contrato con el operador incluya valores de disponibilidad.' },
    15: { D: 'Piensa en tus clases reales: ¿qué no puede fallar?', A: 'Justifica con indicadores y valores de referencia.', G: 'No olvides el costo y quién mantendrá la red.' }
  };

  /* ---------------- Nodo habla: globo + voz + animación ---------------- */
  var V = { timer: null, run: 0, gesture: false };
  function setProgress(text, i, tip) {
    $('#btext').innerHTML = esc(text.slice(0, i)) + '<span class="rest">' + esc(text.slice(i)) + '</span>' + (tip || '');
  }
  function stopVoice() {
    V.run++; clearInterval(V.timer);
    var a = $('#voiceAudio'); if (a) { a.onended = a.onerror = a.ontimeupdate = null; try { a.pause(); } catch (e) {} }
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    var nb = $('#nodoBtn'); if (nb) nb.classList.remove('talking');
    var pb = $('#btnPlay'); if (pb) { pb.textContent = '▶'; pb.setAttribute('aria-label', 'Escuchar'); }
  }
  function tipHtml() {
    var n = S.p;
    return (TIPS[n] && S.prof) ? '<span style="display:block;margin-top:8px;font-style:normal;font-size:13.5px"><b style="color:var(--orange-d)">Para tu rol (' + PERFILES[S.prof] + '):</b> ' + esc(TIPS[n][S.prof]) + '</span>' : '';
  }
  /* Prefiere voces naturales en español latino (p. ej., las «Natural» de Microsoft Edge o las de Google) */
  function bestVoice(vs) {
    function score(v) {
      var n = v.name || '', l = (v.lang || '').replace('_', '-');
      var sc = 0;
      if (/Natural|Online|Neural/i.test(n)) sc += 100;
      if (/Google/i.test(n)) sc += 60;
      if (/^es-CO/i.test(l)) sc += 50; else if (/^es-(MX|US|419|AR|CL|PE|VE|EC)/i.test(l)) sc += 40; else if (/^es-ES/i.test(l)) sc += 10;
      if (/Salome|Dalia|Elena|Paloma|Camila|Valentina|Sabina|Paulina|Catalina|Gonzalo|Jorge|Tomas|Andrea/i.test(n)) sc += 15;
      return sc;
    }
    return vs.slice().sort(function (a, b) { return score(b) - score(a); })[0];
  }
  function say(withVoice) {
    stopVoice();
    var run = V.run, n = S.p, text = VOCES[n].voz, tip = tipHtml();
    $('#bubble').classList.add('show');
    var nb = $('#nodoBtn'); nb.classList.add('talking');
    var pb = $('#btnPlay'); pb.textContent = '■'; pb.setAttribute('aria-label', 'Detener');
    setProgress(text, 0, tip);
    function end() { if (run !== V.run) return; clearInterval(V.timer); setProgress(text, text.length, tip); nb.classList.remove('talking'); pb.textContent = '▶'; pb.setAttribute('aria-label', 'Escuchar');
      setTimeout(function () { if (run === V.run && !$('#bubble').matches(':hover')) $('#bubble').classList.remove('show'); }, tip ? 6000 : 3500); }
    function simulate() {           // sin voz: la boca y el texto avanzan al ritmo de lectura
      var total = Math.max(4, text.split(/\s+/).length / 2.35) * 1000, t0 = Date.now();
      clearInterval(V.timer);
      V.timer = setInterval(function () {
        if (run !== V.run) return clearInterval(V.timer);
        var k = Math.min(1, (Date.now() - t0) / total); setProgress(text, Math.round(text.length * k), tip);
        if (k >= 1) end();
      }, 80);
    }
    function tts() {
      if (run !== V.run) return;
      try {
        var synth = window.speechSynthesis;
        var vs = synth.getVoices().filter(function (v) { return /^es/i.test(v.lang); });
        if (!vs.length) return simulate();
        var u = new SpeechSynthesisUtterance(text);
        u.voice = bestVoice(vs); u.lang = u.voice.lang || 'es-CO';
        var natural = /Natural|Online|Neural|Google/i.test(u.voice.name);
        u.rate = natural ? 1.0 : 0.98; u.pitch = natural ? 1.08 : 1.15;
        var gotBoundary = false;
        u.onboundary = function (e) { if (run === V.run && e.charIndex != null) { gotBoundary = true; clearInterval(V.timer); setProgress(text, e.charIndex, tip); } };
        u.onend = end; u.onerror = function () { if (run === V.run) simulate(); };
        synth.speak(u);
        setTimeout(function () { if (run === V.run && !gotBoundary) simulate(); }, 900);
      } catch (e) { simulate(); }
    }
    if (!withVoice) return simulate();
    if (typeof AUDIOS_GRABADOS === 'undefined' || !AUDIOS_GRABADOS) return tts();
    var a = $('#voiceAudio');
    a.onerror = function () { a.onerror = null; tts(); };
    a.ontimeupdate = function () { if (run === V.run && a.duration) setProgress(text, Math.round(text.length * a.currentTime / a.duration), tip); };
    a.onended = end;
    a.src = 'audio/p' + (n < 10 ? '0' : '') + n + '.mp3';
    var pr = a.play(); if (pr && pr.catch) pr.catch(function () { if (a.onerror) { a.onerror = null; tts(); } });
  }
  function greet() {
    var nb = $('#nodoBtn'); nb.classList.remove('hello'); void nb.offsetWidth; nb.classList.add('hello');
    say(!S.mute && V.gesture);
  }

  /* ---------------- marco de pantalla ---------------- */
  function faseDe(n) {
    if (n <= 2) return 0; if (n <= 5) return 1; if (n === 6) return 2; if (n <= 8) return 3;
    if (n === 9) return 4; if (n <= 11) return 5; if (n === 12) return 6; if (n === 13) return 7; if (n === 14) return 8; return 0;
  }
  function kicker(n) {
    var f = faseDe(n);
    if (n <= 2) return 'Pantalla ' + n + ' · Inicio';
    if (n >= 15) return 'Pantalla ' + n + ' · Cierre';
    return 'Pantalla ' + n + ' · Fase ' + f + ' · ' + FASES[f - 1];
  }
  function updateTop() {
    var f = faseDe(S.p), html = '';
    for (var i = 1; i <= 8; i++) {
      html += '<button class="ph ' + (i === f ? 'cur' : (S.ph[i - 1] ? 'on' : '')) + (FASE_PANTALLA[i] > maxReach() ? ' lock' : '') + '" data-f="' + i + '" title="Fase ' + i + ': ' + FASES[i - 1] + (S.ph[i - 1] ? ' (completada)' : '') + '" aria-label="Ir a la fase ' + i + ', ' + FASES[i - 1] + '">' + i + '</button>' + (i < 8 ? '<span class="bar"></span>' : '');
    }
    $('#phases').innerHTML = html;
  }

  /* ---------------- avance bloqueado: cada pantalla exige su actividad ---------------- */
  function done(n) {
    switch (n) {
      case 2: return !!S.prof;
      case 3: return !!S.p3;
      case 5: return !!S.ph[0];
      case 6: return !!S.ph[1];
      case 7: return [0, 1, 2].every(function (i) { return S.seen['i7_' + i]; });
      case 8: return !!S.ph[2];
      case 9: return !!S.ph[3];
      case 10: return !!S.got.p10;
      case 11: return S.p11 === 'B';
      case 12: return !!S.ph[5];
      case 13: return !!S.ph[6];
      case 14: return !!S.ph[7];
      case 15: return !!S.planOk;
      case 16: return !!S.reto.last;
      default: return true;
    }
  }
  var PENDIENTE = {
    2: 'Elige tu perfil para continuar.', 3: 'Elige una opción para continuar.', 5: 'Responde bien las tres afirmaciones para continuar.',
    6: 'Pulsa +INFO para comparar y poder continuar.', 7: 'Abre el +INFO de las tres tarjetas para continuar.', 8: 'Completa las cuatro parejas para continuar.',
    9: 'Encuentra una combinación equilibrada para continuar.', 10: 'Ordena el tráfico y aplica la política para continuar.',
    11: 'Elige la política que mantiene estable la clase para continuar.', 12: 'Completa el semáforo y elige qué atender primero.',
    13: 'Gira las cuatro tarjetas para continuar.', 14: 'Revisa «Lo que aún falta» para continuar.', 15: 'Envía tu plan para continuar.', 16: 'Presenta el reto final para continuar.'
  };
  function maxReach() { for (var i = 1; i < TOTAL; i++) if (!done(i)) return i; return TOTAL; }
  function updateNav() {
    var nx = $('#next'); if (!nx) return;
    nx.disabled = S.p === TOTAL; nx.classList.toggle('locked', !done(S.p));
    nx.title = done(S.p) ? 'Siguiente' : (PENDIENTE[S.p] || '');
  }
  function canEnter(n) {
    var m = maxReach();
    if (n > m) { toast(PENDIENTE[m] || 'Completa la actividad para continuar.'); return false; }
    return true;
  }
  function go(n) {
    if (n < 1 || n > TOTAL) return;
    if (!canEnter(n)) return;
    stopVoice(); S.p = n; save(); render();
    window.scrollTo(0, 0);
  }

  function render() {
    var n = S.p;
    $('#num').textContent = (n < 10 ? '0' : '') + n;
    $('#kicker').textContent = kicker(n);
    $('#title').textContent = TITULOS[n];
    document.title = TITULOS[n] + ' · Aulas sin cobertura';
    $('#prev').disabled = n === 1;
    updateTop(); updateNav();
    var st = $('#stage'); st.innerHTML = '';
    SCREENS[n](st);
    if (n !== 1) { var ot = document.createElement('p'); ot.className = 'ontext'; ot.textContent = VOCES[n].texto; st.appendChild(ot); }
    $('#stage').focus({ preventScroll: true });
    $('#btnMute').textContent = S.mute ? '🔇' : '🔊';
    greet();
  }

  /* ================= PANTALLAS ================= */
  var SCREENS = {};

  /* 1 · Bienvenida */
  SCREENS[1] = function (el) {
    el.innerHTML = '<div class="hero2"><div class="htext"><h2>AULAS SIN COBERTURA</h2>' +
      '<div class="sub">Conectividad y formación virtual en comunidades rurales</div>' +
      '<div class="row"><button class="btn" id="go1">CONECTAR</button><button class="pill" id="help1">AYUDA</button></div>' +
      '<div class="authors">Paula Andrea Castro Molina · Cristián David Peña Guzmán<br>Universidad de Cundinamarca · 2026</div></div>' +
      '<div class="hart">' + ILU.hero + '<div class="hnodo">' + NODO_SVG + '</div></div></div>';
    $('#go1', el).onclick = function () { go(2); };
    $('#help1', el).onclick = function () {
      modal('Cómo usar este recurso', '<p>Usa las flechas <b>←</b> y <b>→</b> para avanzar o retroceder, y el botón <b>MAPA</b> para volver a la ruta de fases.</p><p>En el panel de Nodo puedes <b>escuchar</b> el audio o leer la <b>transcripción</b>.</p><p>Cada reto completado enciende una fase. Cuando enciendas las 8, se abre el Plan Rural Connect y después el reto final. Tu avance se guarda automáticamente.</p>');
    };
  };

  /* 2 · Mapa y perfil */
  SCREENS[2] = function (el) {
    var pos = [[5, 72], [17, 30], [29, 72], [41, 30], [53, 72], [65, 30], [77, 72], [89, 30]];
    var svg = ILU.mapBg + '<svg viewBox="0 0 112 100" preserveAspectRatio="none"><polyline fill="none" stroke="#1A9E8F" stroke-width=".6" points="' +
      pos.map(function (p) { return p[0] + ',' + p[1]; }).join(' ') + '"/><path d="M89 30 Q99 40 104 62" fill="none" stroke="#F4A23B" stroke-width=".6" stroke-dasharray="1.5 1.5"/></svg>';
    var nodes = pos.map(function (p, i) {
      return '<button class="mnode ' + (S.ph[i] ? 'on ' : '') + (p[1] < 50 ? 'up ' : '') + (FASE_PANTALLA[i + 1] > maxReach() ? 'locked' : '') + '" style="left:' + (p[0] / 112 * 100) + '%;top:' + p[1] + '%" data-f="' + (i + 1) + '"><span class="c">' + (i + 1) + '</span><span class="l">' + FASES[i] + '</span></button>';
    }).join('');
    var gold = '<button class="mnode gold ' + (allPhases() ? 'open' : '') + '" id="planBtn" style="left:' + (104 / 112 * 100) + '%;top:62%"><span class="c">' + (allPhases() ? '★' : '🔒') + '</span><span class="l">Plan Rural Connect</span></button>';
    el.innerHTML = '<div class="map">' + svg + nodes + gold + '</div>' +
      '<div class="row" style="margin-top:8px"><div class="profbar" id="pbar">Tu perfil: ' +
      ['D', 'A', 'G'].map(function (k) { return '<button data-p="' + k + '" class="' + (S.prof === k ? 'sel' : '') + '">' + PERFILES[k] + '</button>'; }).join('') +
      '</div></div>' +
      '<p class="small" style="margin-top:12px">Fases completadas: ' + S.ph.filter(function (x) { return x; }).length + ' de 8.</p>';
    $$('.mnode', el).forEach(function (b) { b.onclick = function () { go(FASE_PANTALLA[b.dataset.f]); }; });
    $$('#pbar button', el).forEach(function (b) { b.onclick = function () { S.prof = b.dataset.p; save(); render(); }; });
    $('#planBtn', el).onclick = function () { go(15); };
    if (!S.prof) askProfile();
  };
  function askProfile() {
    modal('Elige tu perfil', '<p>Así Nodo adapta los consejos a tu rol.</p><div class="grid3" id="pick">' +
      [['D', 'Docente o directivo', 'De instituciones educativas rurales'], ['A', 'Administrador de red', 'Estudiantes y profesionales de sistemas, telecomunicaciones y afines'], ['G', 'Gestor de proyectos', 'De inclusión digital y conectividad territorial']]
        .map(function (p) { return '<button class="card pcard" data-p="' + p[0] + '">' + ILU.perfiles[p[0]] + '<h3>' + p[1] + '</h3><p>' + p[2] + '</p></button>'; }).join('') + '</div>');
    $$('#pick button').forEach(function (b) { b.onclick = function () { S.prof = b.dataset.p; save(); closeModal(); render(); }; });
  }

  /* 3 · Reto inicial */
  var P3 = { A: 'Comprar un plan con más gigas', B: 'Combinar y coordinar los enlaces disponibles', C: 'Aún no lo sé' };
  SCREENS[3] = function (el) {
    el.innerHTML = '<div class="split"><div><div class="question">En la vereda El Roble la escuela tiene 4G débil y la videoclase se congela cada 10 minutos. ¿Qué ayudaría más?</div><div class="opts" id="o3">' +
      ['A', 'B', 'C'].map(function (k) { return '<button class="opt ' + (S.p3 === k ? 'sel' : '') + '" data-k="' + k + '"><span class="k">' + k + '</span>' + P3[k] + '</button>'; }).join('') + '</div></div><div class="art">' + ILU.p3 + '</div></div><div id="f3"></div>';
    function fb() {
      if (!S.p3) return;
      $('#f3', el).innerHTML = '<div class="feedback info">Guardamos tu respuesta: <b>' + P3[S.p3] + '</b>. ' +
        (S.p3 === 'A' ? 'Más gigas no arreglan una señal débil: si el enlace se cae, los datos extra no sirven. Veamos por qué.' :
          S.p3 === 'B' ? '¡Buena intuición! Durante la ruta verás cómo se hace eso con SD-WAN.' :
            'Está bien no saberlo todavía: al final de la ruta podrás responderla con argumentos.') + ' La retomaremos en el cierre.</div>';
    }
    $$('#o3 .opt', el).forEach(function (b) { b.onclick = function () { S.p3 = b.dataset.k; save(); $$('#o3 .opt', el).forEach(function (x) { x.classList.toggle('sel', x === b); }); fb(); }; });
    fb();
  };

  /* 4 · Brecha en cifras */
  SCREENS[4] = function (el) {
    el.innerHTML = '<div class="grid3">' +
      '<div class="stat"><div class="circle dark">41,9 %</div><p>hogares rurales con internet<br>(72,5 % en cabeceras)</p></div>' +
      '<div class="stat"><div class="circle"><span>' + ILU.coin + '<br>36,3 %</span></div><p>de los rurales sin conexión citan el costo</p></div>' +
      '<div class="stat"><div class="circle"><span>' + ILU.pc + '<br>21,1 %</span></div><p>hogares con computador en veredas del Bajo Cauca</p></div></div>' +
      '<div class="infog">' + ILU.houses + '</div>' +
      '<p class="src">Fuente: DANE (2025), ENTIC Hogares 2024 · Hoyos et al. (2023)</p>' +
      '<button class="infobtn" id="i4">+INFO · Acceso, uso y habilidades</button>';
    $('#i4', el).onclick = function () {
      modal('Acceso, uso y habilidades', '<p>Hoyos et al. (2023) midieron la inclusión digital de hogares rurales de El Bagre y Nechí (Bajo Cauca antioqueño) en varias dimensiones:</p>' +
        '<table class="cmp"><tr><th>Dimensión</th><th>Resultado</th></tr><tr><td>Acceso</td><td>47,9 %: el 93,3 % tiene celular, pero solo el 21,1 % tiene computador; el 41,1 % no tiene internet (la mitad por costo).</td></tr>' +
        '<tr><td>Uso</td><td>83,7 %: la mayoría usó internet en los últimos tres meses.</td></tr><tr><td>Habilidades</td><td>77,5 %</td></tr></table>' +
        '<p class="src">Hoyos et al. (2023).</p>');
    };
  };

  /* 5 · Verdadero o falso */
  var VF = [
    { t: 'En 2024, menos de la mitad de los hogares rurales tenía internet.', a: 'V', h: 'Revisa la primera cifra de la pantalla anterior: 41,9 %.' },
    { t: 'Tener celular garantiza estudiar en línea en igualdad de condiciones.', a: 'F', h: 'Casi todos tenían celular, pero solo dos de cada diez hogares tenían computador.' },
    { t: 'La brecha urbano–rural de acceso a TIC en Colombia ya desapareció.', a: 'F', h: 'Compara 41,9 % rural con 72,5 % en cabeceras.' }
  ];
  SCREENS[5] = function (el) {
    var ans = {};
    el.innerHTML = '<div class="prog"><span>Progreso</span><div class="track"><div class="fill" id="pg5" style="width:0%"></div></div><b id="pt5">0/3</b></div>' + VF.map(function (q, i) {
      return '<div class="vf" data-i="' + i + '"><p>' + q.t + '</p><button class="b" data-v="V" aria-label="Verdadero">V</button><button class="b" data-v="F" aria-label="Falso">F</button><span class="hint"></span></div>';
    }).join('') + '<button class="btn teal" id="chk5">Comprobar</button><div id="f5"></div>';
    $$('.vf', el).forEach(function (row) {
      $$('.b', row).forEach(function (b) {
        b.onclick = function () { ans[row.dataset.i] = b.dataset.v; $$('.b', row).forEach(function (x) { x.classList.toggle('sel', x === b); }); row.classList.remove('ok', 'bad'); $('.hint', row).textContent = ''; var c = Object.keys(ans).length; $('#pg5', el).style.width = (c / 3 * 100) + '%'; $('#pt5', el).textContent = c + '/3'; };
      });
    });
    $('#chk5', el).onclick = function () {
      var ok = 0;
      VF.forEach(function (q, i) {
        var row = $('.vf[data-i="' + i + '"]', el), good = ans[i] === q.a;
        row.classList.toggle('ok', good); row.classList.toggle('bad', !good);
        $('.hint', row).textContent = good ? '¡Correcto!' : (ans[i] ? 'Pista: ' + q.h : 'Elige V o F.');
        if (good) ok++;
      });
      if (ok === 3) { $('#f5', el).innerHTML = '<div class="feedback ok">¡Las tres correctas! El acceso no depende solo de la cobertura: el costo y los dispositivos también cuentan.</div>'; award('p5', 50); light(1); }
      else $('#f5', el).innerHTML = '<div class="feedback bad">Llevas ' + ok + ' de 3. Revisa las pistas y vuelve a intentarlo.</div>';
    };
  };

  /* 6 · Fundamentos */
  SCREENS[6] = function (el) {
    el.innerHTML = '<div class="vs"><div class="card">' + ILU.wan + '<h3>WAN tradicional</h3><ul><li>Router por router, a mano</li><li>Caminos casi fijos</li><li>Enlaces dedicados costosos (MPLS)</li></ul></div>' +
      '<div class="mid">VS</div><div class="card dark">' + ILU.sdwan + '<h3>SD-WAN</h3><ul><li>Control central por software</li><li>Varios enlaces a la vez</li><li>Ruta según aplicación y estado</li></ul></div></div>' +
      '<div style="margin-top:16px"><button class="infobtn" id="i6">+INFO · Tabla comparativa</button></div>';
    $('#i6', el).onclick = function () {
      modal('WAN tradicional vs. SD-WAN', '<table class="cmp"><tr><th>Aspecto</th><th>WAN tradicional</th><th>SD-WAN</th></tr>' +
        '<tr><td>Configuración</td><td>Equipo por equipo</td><td>Central, desde un controlador</td></tr>' +
        '<tr><td>Enlaces</td><td>Normalmente uno dedicado (MPLS)</td><td>Varios a la vez: 4G/LTE, banda ancha, satélite</td></tr>' +
        '<tr><td>Rutas</td><td>Casi fijas</td><td>Cambian según la aplicación y el estado del enlace</td></tr>' +
        '<tr><td>Costo</td><td>Alto por enlace dedicado</td><td>Menor al aprovechar enlaces comunes</td></tr>' +
        '<tr><td>Visibilidad</td><td>Limitada</td><td>Monitoreo continuo de cada enlace</td></tr></table>' +
        '<p class="src">Con base en Hussain et al. (2023), Kankipati et al. (2023), Ouamri et al. (2025) y Fu et al. (2024).</p>');
      light(2);
    };
  };

  /* 7 · Diseñar */
  var ENL = [
    { n: '4G / LTE', d: 'Cobertura común, capacidad variable', v: 'Ya existe en muchas veredas y es fácil de contratar.', l: 'La señal varía con el clima, la distancia y la hora.', c: 'Bajo a medio (plan mensual).' },
    { n: 'Satélite LEO', d: 'Llega sin torre; datos con costo', v: 'Funciona donde no hay torre y tiene baja latencia para ser satélite.', l: 'Los datos tienen costo y puede haber límites de consumo.', c: 'Medio a alto (equipo + plan).' },
    { n: 'LTE privado', d: 'Red propia y abierta para zonas remotas', v: 'La comunidad puede operarla y extenderla.', l: 'Requiere montaje, licencias o permisos y alguien que la mantenga.', c: 'Inversión inicial alta, operación baja.' }
  ];
  SCREENS[7] = function (el) {
    el.innerHTML = '<div class="grid3">' + ENL.map(function (e, i) {
      return '<div class="card">' + [ILU.tower, ILU.sat, ILU.roof][i] + '<span class="badge navy" style="margin-top:10px">' + (i + 1) + '</span><h3 style="margin-top:8px">' + e.n + '</h3><p>' + e.d + '</p><button class="infobtn" style="margin-top:10px" data-i="' + i + '">+INFO</button></div>';
    }).join('') + '</div><div class="feedback info" style="background:var(--cream);border-color:var(--orange);text-align:center;font-weight:700">Regla de oro: combinar ≥ 2 enlaces para tener respaldo</div>';
    $$('.infobtn', el).forEach(function (b) {
      b.onclick = function () { S.seen['i7_' + b.dataset.i] = 1; save(); var e = ENL[b.dataset.i]; modal(e.n, '<p><b>Ventajas:</b> ' + e.v + '</p><p><b>Límites:</b> ' + e.l + '</p><p><b>Costo relativo:</b> ' + e.c + '</p>'); };
    });
  };

  /* 8 · Piezas de la red */
  var PIEZAS = [
    { k: 'borde', n: 'Equipo de borde', f: 'Conecta los enlaces en la escuela', h: 'Piensa en la terminal de transportes donde llegan todas las rutas.' },
    { k: 'tunel', n: 'Túnel overlay', f: 'Transporta el tráfico cifrado', h: 'Es el camino protegido por donde viajan los datos.' },
    { k: 'ctrl', n: 'Controlador', f: 'Decide rutas según el estado', h: 'Vigila los túneles y decide por cuál enlace va cada información.' },
    { k: 'pol', n: 'Política', f: 'Define qué tráfico es prioritario', h: 'Es la regla que dice qué información viaja primero.' }
  ];
  SCREENS[8] = function (el) {
    var done = {}, selected = null, order = shuffle(PIEZAS);
    el.innerHTML = '<div class="match3" id="m8">' + PIEZAS.map(function (p, i) {
        return '<button class="piece" draggable="true" data-k="' + p.k + '">' + p.n + '</button><span class="arrow" aria-hidden="true"></span>' +
          '<div class="slot" data-k="' + order[i].k + '" tabindex="0" role="button">' + order[i].f + '</div>';
      }).join('') + '</div><p class="counter" id="cnt8" style="margin-top:12px">Parejas correctas: 0/4</p>' +
      '<p class="small">Arrastra cada pieza hasta su función o toca una pieza y luego su función. Toca una pieza dos veces para ver una pista.</p><div id="f8"></div>';
    function tryMatch(k, slot) {
      if (done[k]) return;
      if (slot.dataset.k === k) {
        done[k] = 1; slot.classList.add('done'); slot.insertAdjacentHTML('afterbegin', '<span class="got">✓ ' + PIEZAS.filter(function (p) { return p.k === k; })[0].n + '</span>');
        var pc = $('.piece[data-k="' + k + '"]', el); pc.classList.add('done'); pc.classList.remove('sel'); pc.draggable = false;
        var c = Object.keys(done).length; $('#cnt8', el).textContent = 'Parejas correctas: ' + c + '/4';
        if (c === 4) { $('#f8', el).innerHTML = '<div class="feedback ok">¡Red armada! Ya reconoces las cuatro piezas de SD-WAN.</div>'; award('p8', 100); light(3); }
      } else {
        slot.classList.add('over'); setTimeout(function () { slot.classList.remove('over'); }, 500);
        $('#f8', el).innerHTML = '<div class="feedback bad">Esa no es su función. Pista: ' + PIEZAS.filter(function (p) { return p.k === k; })[0].h + '</div>';
      }
    }
    $$('.piece', el).forEach(function (b) {
      b.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', b.dataset.k); });
      b.onclick = function () {
        if (done[b.dataset.k]) return;
        if (selected === b.dataset.k) { $('#f8', el).innerHTML = '<div class="feedback info">Pista: ' + PIEZAS.filter(function (p) { return p.k === b.dataset.k; })[0].h + '</div>'; return; }
        selected = b.dataset.k; $$('.piece', el).forEach(function (x) { x.classList.toggle('sel', x === b); });
      };
    });
    $$('.slot', el).forEach(function (s) {
      s.addEventListener('dragover', function (e) { e.preventDefault(); s.classList.add('over'); });
      s.addEventListener('dragleave', function () { s.classList.remove('over'); });
      s.addEventListener('drop', function (e) { e.preventDefault(); s.classList.remove('over'); tryMatch(e.dataTransfer.getData('text/plain'), s); });
      s.onclick = function () { if (selected) { tryMatch(selected, s); selected = null; } };
      s.onkeydown = function (e) { if ((e.key === 'Enter' || e.key === ' ') && selected) { e.preventDefault(); tryMatch(selected, s); selected = null; } };
    });
  };

  /* 9 · Simulador (valores ilustrativos) */
  var LINKS = { g: { n: '4G / LTE', a: 0.92, lat: 70, c: 30 }, s: { n: 'Satélite LEO', a: 0.97, lat: 45, c: 55 }, p: { n: 'LTE privado', a: 0.95, lat: 35, c: 40 } };
  SCREENS[9] = function (el) {
    var on = { g: true, s: false, p: false };
    el.innerHTML = '<div class="sim"><div><div class="small" style="font-weight:700;margin-bottom:8px">ENLACES</div>' +
      Object.keys(LINKS).map(function (k) { return '<div class="tog"><span>' + LINKS[k].n + '</span><button class="switch" role="switch" data-k="' + k + '" aria-label="' + LINKS[k].n + '"></button></div>'; }).join('') +
      '</div><div><div class="small" style="font-weight:700;margin-bottom:8px">INDICADORES (ilustrativos)</div>' +
      '<div class="meter"><div class="top"><span>Disponibilidad</span><span id="v-a"></span></div><div class="track"><div class="fill" id="b-a" style="background:var(--teal)"></div></div></div>' +
      '<div class="meter"><div class="top"><span>Latencia</span><span id="v-l"></span></div><div class="track"><div class="fill" id="b-l" style="background:var(--orange)"></div></div></div>' +
      '<div class="meter"><div class="top"><span>Costos al mes</span><span id="v-c"></span></div><div class="track"><div class="fill" id="b-c" style="background:var(--navy)"></div></div></div>' +
      '<p class="small">Combinaciones probadas: <b id="tried">0</b> de 7</p></div></div><div id="f9"></div>';
    function upd() {
      var ks = Object.keys(on).filter(function (k) { return on[k]; });
      $$('.switch', el).forEach(function (s) { s.classList.toggle('on', on[s.dataset.k]); s.setAttribute('aria-checked', on[s.dataset.k]); });
      var f = $('#f9', el);
      if (!ks.length) { ['a', 'l', 'c'].forEach(function (x) { $('#b-' + x, el).style.width = '0%'; $('#v-' + x, el).textContent = '—'; }); f.innerHTML = '<div class="feedback bad">Sin enlaces no hay red: SD-WAN no crea señal.</div>'; return; }
      var down = 1, lat = 999, cost = 0;
      ks.forEach(function (k) { down *= (1 - LINKS[k].a); lat = Math.min(lat, LINKS[k].lat); cost += LINKS[k].c; });
      var av = (1 - down) * 100;
      $('#b-a', el).style.width = av + '%'; $('#v-a', el).textContent = av.toFixed(1).replace('.', ',') + ' %';
      $('#b-l', el).style.width = (lat / 150 * 100) + '%'; $('#v-l', el).textContent = lat + ' ms';
      $('#b-c', el).style.width = (cost / 125 * 100) + '%'; $('#v-c', el).textContent = cost <= 35 ? 'Bajo' : cost <= 90 ? 'Moderado' : cost <= 110 ? 'Alto' : 'Muy alto';
      var id = ks.sort().join('');
      if (S.p9.indexOf(id) < 0) { S.p9.push(id); save(); }
      $('#tried', el).textContent = S.p9.length;
      var msg;
      if (ks.length === 1) msg = '<div class="feedback info">Un solo enlace: si falla, la escuela queda desconectada. Prueba agregar otro.</div>';
      else if (ks.length === 3) msg = '<div class="feedback info">Máxima disponibilidad, pero el costo se dispara. ¿Lo necesita la escuela?</div>';
      else if (cost > 90) msg = '<div class="feedback info">Hay respaldo, pero el costo es alto para la escuela. Prueba otra combinación de dos enlaces.</div>';
      else { msg = '<div class="feedback ok">¡Equilibrio! Con dos enlaces hay respaldo y el costo sigue siendo moderado.</div>'; light(4); }
      f.innerHTML = msg;
    }
    $$('.switch', el).forEach(function (s) { s.onclick = function () { on[s.dataset.k] = !on[s.dataset.k]; upd(); }; });
    upd();
  };

  /* 10 · Tráfico educativo */
  var TRAF = [{ k: 'v', t: 'Videoclase en vivo', l: 'Alta', ic: 'ic_video' }, { k: 'm', t: 'Plataforma LMS y evaluaciones', l: 'Alta', ic: 'ic_exam' }, { k: 'c', t: 'Correo y mensajería', l: 'Media', ic: 'ic_mail' }, { k: 'd', t: 'Descargas y actualizaciones', l: 'Baja', ic: 'ic_down' }];
  function rankWidget(el, items, onChange, levels) {
    function draw() {
      el.innerHTML = '<div class="rank">' + items.map(function (it, i) {
        return '<div class="ritem"><span class="n">' + (i + 1) + '</span><span class="t">⠿ ' + (it.ic ? ILU[it.ic] : '') + it.t + '</span>' + (levels ? '<span class="lvl badge ' + ['', '', 'orange', 'navy'][i] + '">' + levels[i] + '</span>' : '') + '<span class="mv"><button data-i="' + i + '" data-d="-1" aria-label="Subir ' + it.t + '" ' + (i === 0 ? 'disabled' : '') + '>▲</button><button data-i="' + i + '" data-d="1" aria-label="Bajar ' + it.t + '" ' + (i === items.length - 1 ? 'disabled' : '') + '>▼</button></span></div>';
      }).join('') + '</div>';
      $$('button', el).forEach(function (b) {
        b.onclick = function () { var i = +b.dataset.i, j = i + (+b.dataset.d); var t = items[i]; items[i] = items[j]; items[j] = t; draw(); if (onChange) onChange(items); };
      });
    }
    draw();
  }
  SCREENS[10] = function (el) {
    var items = shuffle(TRAF);
    el.innerHTML = '<div id="r10"></div><p class="small" style="margin-top:10px">Usa las flechas ▲▼ para ordenar de mayor a menor prioridad.</p><div class="row" style="margin-top:14px"><button class="btn teal" id="chk10">Aplicar política</button></div><div id="f10"></div>';
    rankWidget($('#r10', el), items, null, ['Alta', 'Alta', 'Media', 'Baja']);
    $('#chk10', el).onclick = function () {
      var keys = items.map(function (x) { return x.k; });
      var top = keys.slice(0, 2).sort().join(''), good = top === 'mv' && keys[2] === 'c' && keys[3] === 'd';
      $('#f10', el).innerHTML = good ?
        '<div class="feedback ok">¡Política aplicada! La videoclase y la plataforma van primero (alta), el correo después (media) y las descargas esperan (baja).<div class="row" style="margin-top:8px">' + TRAF.map(function (t) { return '<span class="badge ' + (t.l === 'Media' ? 'orange' : t.l === 'Baja' ? 'navy' : '') + '">' + t.t + ': ' + t.l + '</span>'; }).join(' ') + '</div></div>' :
        '<div class="feedback bad">Con ese orden, algo que puede esperar le quita espacio a la clase o al examen. Pregúntate: ¿qué no puede cortarse?</div>';
      if (good) { S.got.p10 = 1; save(); if (S.p11 === 'B') light(5); }
    };
  };

  /* 11 · Tú eres el controlador */
  var P11 = {
    A: { t: 'Todo por 4G', r: 'bad', f: 'El 4G tambalea: la videoclase se congela y las descargas compiten con ella. Mala experiencia para todos.' },
    B: { t: 'Videoclase por satélite, descargas por 4G, con respaldo automático', r: 'ok', f: '¡Clase estable! El tráfico crítico va por el enlace firme, lo que puede esperar usa el 4G y, si algo falla, el controlador cambia de ruta solo.' },
    C: { t: 'Todo por satélite', r: 'bad', f: 'La clase funciona un rato, pero las descargas agotan los datos limitados del satélite y el costo sube.' }
  };
  SCREENS[11] = function (el) {
    var meter = function (id, label, color) { return '<div class="meter"><div class="top"><span>' + label + '</span><span id="v' + id + '"></span></div><div class="track"><div class="fill" id="b' + id + '" style="background:' + color + '"></div></div></div>'; };
    el.innerHTML = '<div class="split"><div><div class="question">10:00 a. m.: videoclase en vivo + 30 estudiantes descargando guías. 4G inestable; satélite estable pero con datos limitados. ¿Qué política configuras?</div><div class="opts" id="o11">' +
      ['A', 'B', 'C'].map(function (k) { return '<button class="opt" data-k="' + k + '"><span class="k">' + k + '</span>' + P11[k].t + '</button>'; }).join('') +
      '</div></div><div class="panel11"><div class="small" style="font-weight:700;margin-bottom:8px">PANEL DE LA RED</div>' + meter('g', '4G', 'var(--orange)') + meter('s', 'Satélite', 'var(--teal)') + meter('q', 'Calidad de la videoclase', 'var(--ok)') + meter('d', 'Consumo de datos del satélite', 'var(--navy)') + '</div></div><div id="f11"></div><div style="margin-top:14px"><button class="infobtn" id="i11">+INFO · Redes que aprenden</button></div>';
    $$('#o11 .opt', el).forEach(function (b) {
      b.onclick = function () {
        var k = b.dataset.k;
        $$('#o11 .opt', el).forEach(function (x) { x.classList.remove('right', 'wrong'); });
        b.classList.add(P11[k].r === 'ok' ? 'right' : 'wrong');
        $('#f11', el).innerHTML = '<div class="feedback ' + P11[k].r + '">' + P11[k].f + '</div>'; panel(k);
        if (k === 'B') { S.p11 = 'B'; award('p11', 100); if (S.got.p10) light(5); else toast('Completa también el orden de tráfico (pantalla 10) para encender Optimizar.'); }
        save();
      };
    });
    function panel(k) {
      var st = { '0': [35, 92, null, 0], A: [35, 92, 25, 0], B: [35, 92, 95, 40], C: [35, 92, 80, 100] }[k];
      var set = function (id, v, txt, col) { $('#b' + id, el).style.width = (v == null ? 0 : v) + '%'; if (col) $('#b' + id, el).style.background = col; $('#v' + id, el).textContent = txt; };
      set('g', st[0], 'Inestable'); set('s', st[1], 'Estable');
      set('q', st[2], st[2] == null ? '—' : st[2] >= 90 ? 'Fluida' : st[2] >= 60 ? 'Con cortes' : 'Congelada', st[2] == null ? null : st[2] >= 90 ? 'var(--ok)' : st[2] >= 60 ? 'var(--warn)' : 'var(--bad)');
      set('d', st[3], st[3] >= 100 ? 'Agotado' : st[3] + ' %', st[3] >= 100 ? 'var(--bad)' : 'var(--navy)');
    }
    panel('0');
    $('#i11', el).onclick = function () {
      modal('Redes que aprenden', '<p>Algunos estudios entrenan al controlador con <b>aprendizaje por refuerzo</b>: el sistema prueba decisiones, mide el resultado y aprende qué túnel elegir según la telemetría de la red.</p>' +
        '<ul><li>En simulación, el enfoque PPO alcanzó hasta 98 % en el índice de fiabilidad de conexión (Borgianni et al., 2025).</li><li>El aprendizaje por refuerzo mejoró la disponibilidad al enrutar el tráfico de forma automática (Borgianni et al., 2023).</li><li>Con varios controladores, si uno falla otro toma el control de las rutas (Wang et al., 2025).</li></ul>' +
        '<p class="small">Ojo: estos resultados vienen de simulaciones, no de escuelas reales.</p>');
    };
  };

  /* 12 · Indicadores y semáforo */
  var IND = [
    { n: 'Latencia', v: '90 ms', a: 'g', d: 'Tiempo que tarda un dato en llegar. Para conversación, la referencia es ≤ 150 ms en un sentido (UIT-T, 2003).' },
    { n: 'Jitter', v: '60 ms', a: 'r', d: 'Variación de la latencia. Si es alta, la voz y el video llegan a saltos.' },
    { n: 'Pérdida de paquetes', v: '8 %', a: 'r', d: 'Porcentaje de datos que nunca llegan. Se nota como imagen congelada o voz cortada.' },
    { n: 'Disponibilidad', v: '99 %', a: 'g', d: 'Porcentaje del tiempo en que la red funciona.' }
  ];
  SCREENS[12] = function (el) {
    var sel = {};
    el.innerHTML = '<p style="font-weight:700;color:var(--navy);margin-top:0">Reporte · Escuela El Roble</p><div class="sem">' + IND.map(function (x, i) {
      return '<button class="ind" data-i="' + i + '" title="¿Qué mide?">' + x.n + ' ⓘ</button><div class="val">' + x.v + '</div><div class="lights" data-i="' + i + '">' +
        ['g', 'y', 'r'].map(function (c) { return '<button class="light ' + c + '" data-c="' + c + '" aria-label="' + x.n + ': ' + { g: 'verde', y: 'amarillo', r: 'rojo' }[c] + '"></button>'; }).join('') + '<span class="mark"></span></div>';
    }).join('') + '</div><p class="small">Toca el nombre de cada indicador para ver qué mide. MOS (calidad percibida, de 1 a 5) se explica en el glosario. Umbrales ilustrativos, excepto la latencia (UIT-T, 2003).</p>' +
      '<div class="row"><button class="btn teal" id="chk12">Comprobar semáforo</button><button class="infobtn" id="g12">Glosario</button></div><div id="f12"></div>';
    $$('.ind', el).forEach(function (b) { b.onclick = function () { var x = IND[b.dataset.i]; modal(x.n, '<p>' + x.d + '</p>'); }; });
    $('#g12', el).onclick = function () {
      modal('Glosario de indicadores', IND.map(function (x) { return '<p><b>' + x.n + ':</b> ' + x.d + '</p>'; }).join('') + '<p><b>MOS:</b> calificación de 1 a 5 de la calidad que percibe el usuario en voz o video; Cheimaras et al. (2024) la usaron para evaluar llamadas.</p>');
    };
    $$('.lights', el).forEach(function (g) {
      $$('.light', g).forEach(function (b) { b.onclick = function () { sel[g.dataset.i] = b.dataset.c; $$('.light', g).forEach(function (x) { x.classList.toggle('sel', x === b); }); $('.mark', g).textContent = ''; }; });
    });
    $('#chk12', el).onclick = function () {
      var ok = 0;
      IND.forEach(function (x, i) { var good = sel[i] === x.a; if (good) ok++; $('.lights[data-i="' + i + '"] .mark', el).textContent = sel[i] ? (good ? '✓' : '✗') : ''; });
      if (ok < 4) { $('#f12', el).innerHTML = '<div class="feedback bad">Llevas ' + ok + ' de 4. Revisa qué mide cada indicador y compáralo con lo que necesita una videoclase.</div>'; return; }
      $('#f12', el).innerHTML = '<div class="feedback ok">¡Semáforo correcto! Ahora, ¿qué atenderías primero?</div><div class="opts" id="o12" style="margin-top:10px">' +
        IND.map(function (x, i) { return '<button class="opt" data-i="' + i + '"><span class="k">' + (i + 1) + '</span>' + x.n + '</button>'; }).join('') + '</div><div id="f12b"></div>';
      $$('#o12 .opt', el).forEach(function (b) {
        b.onclick = function () {
          var i = +b.dataset.i;
          $$('#o12 .opt', el).forEach(function (x) { x.classList.remove('right', 'wrong'); });
          if (i === 2) { b.classList.add('right'); $('#f12b', el).innerHTML = '<div class="feedback ok">Bien: con 8 % de pérdida la videoclase se corta, aunque la latencia esté bien. El jitter va justo después.</div>'; award('p12', 100); light(6); }
          else { b.classList.add('wrong'); $('#f12b', el).innerHTML = '<div class="feedback bad">' + (i === 1 ? 'El jitter también está en rojo, pero perder 8 % de los datos afecta más a la clase. Intenta otra vez.' : 'Ese indicador está en verde. Busca el que más afecta la videoclase.') + '</div>'; }
        };
      });
    };
  };

  /* 13 · Casos */
  var CASOS = [
    { t: 'Salud · Sudán', e: 'Real', c: '', s: 'Red clínica con SD-WAN', b: 'Una red de salud adoptó SD-WAN y alcanzó 98 % de cumplimiento regulatorio y 92 % de mantenimiento de la productividad clínica (Ibrahim et al., 2025).' },
    { t: 'Emergencias', e: 'Laboratorio', c: 'orange', s: 'SD-WAN + LTE abierto', b: 'Plataforma de bajo costo con LTE privado de código abierto: con dos estaciones base mejoraron el jitter y la pérdida, y el MOS pasó de pobre o aceptable a aceptable o bueno. Solo se probó en laboratorio (Cheimaras et al., 2024).' },
    { t: 'Agro rural', e: 'Simulación', c: 'navy', s: '4 sitios con LTE + LEO', b: 'Con dos túneles (LTE y satélite LEO), el controlador con aprendizaje cambió de túnel antes de saturarse el enlace. Evaluado en simulación (Borgianni et al., 2024).' },
    { t: 'Bajo Cauca', e: 'Real', c: '', s: 'Inclusión digital en 180 hogares', b: 'Midió acceso, uso y habilidades TIC en hogares rurales de El Bagre y Nechí: el acceso fue la dimensión más baja (Hoyos et al., 2023).' }
  ];
  SCREENS[13] = function (el) {
    el.innerHTML = '<div class="grid2">' + CASOS.map(function (c, i) {
      return '<button class="flip ' + (S.p13.indexOf(i) >= 0 ? 'open' : '') + '" data-i="' + i + '" aria-label="Ver caso ' + c.t + '"><div class="in"><div class="f">' + [ILU.hospital, ILU.rescue, ILU.crop, ILU.family][i] + '<div class="row" style="justify-content:space-between;margin-top:8px"><h3>' + c.t + '</h3><span class="badge ' + c.c + '">' + c.e + '</span></div><p>' + c.s + ' · <span class="small">Toca para girar</span></p></div><div class="bk">' + c.b + '</div></div></button>';
    }).join('') + '</div><p class="small" style="margin-top:12px">Ninguno de estos casos es todavía una escuela con SD-WAN.</p>';
    $$('.flip', el).forEach(function (b) {
      b.onclick = function () {
        b.classList.toggle('open'); var i = +b.dataset.i;
        if (S.p13.indexOf(i) < 0) { S.p13.push(i); save(); }
        if (S.p13.length === 4) light(7);
      };
    });
  };

  /* 14 · Hoja de ruta */
  var HITOS = [
    { n: 'Diagnóstico', D: 'Cuenta cómo y cuándo usan internet tus clases.', A: 'Mide cobertura y calidad de cada enlace disponible.', G: 'Reúne datos de la comunidad y cifras oficiales.' },
    { n: 'Alianzas', D: 'Involucra a padres, directivos y comunidad.', A: 'Habla con operadores y proveedores de equipos.', G: 'Busca apoyo de la Secretaría de Educación, la alcaldía o programas TIC.' },
    { n: 'Diseño', D: 'Di qué aplicaciones son clave para tus clases.', A: 'Define enlaces, túneles y políticas.', G: 'Ajusta el diseño al presupuesto.' },
    { n: 'Formación', D: 'Aprende a enseñar con conexión limitada.', A: 'Capacita a un técnico local para el mantenimiento.', G: 'Programa las capacitaciones y su costo.' },
    { n: 'Medición', D: 'Reporta cuándo y cómo falla la clase.', A: 'Revisa latencia, pérdida y disponibilidad cada mes.', G: 'Usa los indicadores para rendir cuentas y ajustar el plan.' }
  ];
  SCREENS[14] = function (el) {
    var prof = S.prof || 'D', cur = 0;
    el.innerHTML = '<div style="text-align:right"><button class="infobtn" id="i14">+INFO · Lo que aún falta</button></div><div class="road2">' + ILU.road +
      HITOS.map(function (h, i) { var xy = [[9, 78], [30, 64], [50, 50], [70, 55], [86, 30]][i]; return '<button class="hito ' + (i === 4 ? 'last ' : '') + '" data-i="' + i + '" style="left:' + xy[0] + '%;top:' + xy[1] + '%"><span class="c">' + (i + 1) + '</span><b>' + h.n + '</b></button>'; }).join('') +
      '</div><div class="profbar" id="pf14">Filtros dependiendo del perfil: ' + ['D', 'A', 'G'].map(function (k) { return '<button data-p="' + k + '">' + PERFILES[k] + '</button>'; }).join('') + '</div><div id="d14"></div>';
    function draw() {
      $$('.hito', el).forEach(function (h, i) { h.classList.toggle('sel', i === cur); });
      $$('#pf14 button', el).forEach(function (b) { b.classList.toggle('sel', b.dataset.p === prof); });
      $('#d14', el).innerHTML = '<div class="feedback info"><b>' + (cur + 1) + '. ' + HITOS[cur].n + ' · ' + PERFILES[prof] + ':</b> ' + HITOS[cur][prof] + '</div>';
    }
    $$('.hito', el).forEach(function (h) { h.onclick = function () { cur = +h.dataset.i; draw(); }; });
    $$('#pf14 button', el).forEach(function (b) { b.onclick = function () { prof = b.dataset.p; draw(); }; });
    $('#i14', el).onclick = function () {
      modal('Lo que aún falta', '<ul><li><b>Evidencia mayormente simulada:</b> la mayoría de estudios sobre SD-WAN rural se validó en simulación o laboratorio (Borgianni et al., 2024).</li>' +
        '<li><b>Sobrecarga de túneles:</b> en enlaces de poco ancho de banda, la señalización de los túneles consume parte de la capacidad (Dudczyk et al., 2025).</li>' +
        '<li><b>Punto único de falla:</b> si todo depende de un controlador central, su caída afecta a toda la red (Dudczyk et al., 2025; Navarro et al., 2023).</li></ul>' +
        '<label for="ref14"><b>Reflexión:</b> ¿cuál de estos límites afectaría más a una escuela como El Roble? ¿Por qué?</label><textarea id="ref14" style="width:100%;min-height:80px;margin-top:6px;border:1px solid var(--line);border-radius:8px;padding:8px;font:inherit">' + esc(S.p14r) + '</textarea>' +
        '<div style="margin-top:10px"><button class="btn teal" id="sv14">Guardar reflexión</button></div>');
      $('#sv14').onclick = function () { S.p14r = $('#ref14').value; save(); closeModal(); light(8); };
      light(8);
    };
    draw();
  };

  /* 15 · Plan Rural Connect */
  var RUB = [
    { c: 'Enlaces', l: ['Propone un solo enlace o no lo justifica.', 'Combina enlaces, pero no justifica la elección.', 'Combina al menos dos enlaces y explica el respaldo y el costo de la elección.'] },
    { c: 'Priorización del tráfico', l: ['No establece prioridades.', 'Ordena el tráfico sin explicar el criterio.', 'Ordena el tráfico por aplicación y explica por qué la videoclase y el LMS van primero.'] },
    { c: 'Indicadores', l: ['No define cómo evaluará la red.', 'Nombra indicadores sin valores ni forma de medirlos.', 'Elige tres o más indicadores con su valor de referencia y dice cómo los medirá.'] },
    { c: 'Límite y mejora', l: ['No reconoce límites.', 'Menciona un límite general sin propuesta.', 'Reconoce un límite concreto (costo, sobrecarga, punto único de falla o evidencia simulada) y propone cómo atenderlo.'] }
  ];
  function rubricTable(editable) {
    return '<table class="rubric"><tr><th>Criterio</th><th>Inicial (1)</th><th>En proceso (2)</th><th>Logrado (3)</th></tr>' +
      RUB.map(function (r, i) { return '<tr><td>' + r.c + '</td>' + r.l.map(function (t, j) { return '<td class="' + (editable ? 'lv ' : '') + (S.self[i] === j + 1 ? 'sel' : '') + '" data-i="' + i + '" data-v="' + (j + 1) + '">' + t + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
  }
  function planPts() { return S.self.reduce(function (a, b) { return a + b; }, 0); }
  SCREENS[15] = function (el) {
    var F = [['e', 'Enlaces', '¿Cuáles combinas?', ''], ['t', 'Tráfico', '¿Qué priorizas?', ''], ['i', 'Indicadores', '¿Qué medirás?', ''], ['l', 'Límite', '¿Qué riesgo ves?', 'lim']];
    el.innerHTML = '<div class="planwrap"><div class="canvas">' +
      F.map(function (f) { return '<div class="cell ' + f[3] + '"><label for="pl-' + f[0] + '">' + f[1] + '</label><span class="q">' + f[2] + '</span><textarea id="pl-' + f[0] + '" data-k="' + f[0] + '" placeholder="Escribe tu decisión y por qué la tomas…">' + esc(S.plan[f[0]]) + '</textarea></div>'; }).join('') +
      '</div><aside class="fichacard">' + ILU.fichaSchool + '<div class="ficha">Institución Educativa El Roble</div><ul><li>4G débil</li><li>Opción satelital</li><li>Poco presupuesto</li></ul></aside></div><div class="row" style="margin-top:14px"><button class="infobtn" id="rub15">Ver rúbrica</button><button class="btn teal" id="send15">Autoevaluar y enviar</button><button class="btn ghost" id="pdf15">Descargar en PDF</button></div><div id="f15"></div>';
    $$('textarea', el).forEach(function (t) { t.oninput = function () { S.plan[t.dataset.k] = t.value; clearTimeout(t._s); t._s = setTimeout(save, 600); }; });
    $('#rub15', el).onclick = function () { modal('Rúbrica del Plan Rural Connect', rubricTable(false)); };
    $('#pdf15', el).onclick = printPlan;
    if (S.planOk) $('#f15', el).innerHTML = '<div class="feedback ok">Plan enviado (autoevaluación: ' + planPts() + ' de 12). Puedes mejorarlo y volver a enviarlo cuando quieras.</div>';
    $('#send15', el).onclick = function () {
      var miss = ['e', 't', 'i', 'l'].filter(function (k) { return (S.plan[k] || '').trim().length < 20; });
      if (miss.length) { $('#f15', el).innerHTML = '<div class="feedback bad">Completa las cuatro casillas con tu decisión y su justificación (al menos una o dos frases en cada una).</div>'; return; }
      modal('Autoevalúa tu plan', '<p>Lee tu plan y marca, en cada criterio, el nivel que mejor lo describe. Sé honesto: la rúbrica mide cómo justificas, no si “le atinaste”.</p>' + rubricTable(true) +
        '<div style="margin-top:12px"><button class="btn teal" id="ok15">Enviar plan</button></div><div id="m15"></div>');
      $$('.rubric td.lv').forEach(function (td) {
        td.onclick = function () { S.self[+td.dataset.i] = +td.dataset.v; $$('.rubric td.lv[data-i="' + td.dataset.i + '"]').forEach(function (x) { x.classList.toggle('sel', x === td); }); };
      });
      $('#ok15').onclick = function () {
        if (S.self.some(function (x) { return !x; })) { $('#m15').innerHTML = '<div class="feedback bad">Marca un nivel en los cuatro criterios.</div>'; return; }
        S.planOk = 1; save(); closeModal(); toast('Plan enviado'); render();
      };
    };
  };
  function printPlan() {
    var old = $('#printArea'); if (old) old.remove();
    var d = document.createElement('div'); d.id = 'printArea';
    d.innerHTML = '<h1 style="color:#14213D;font-family:Arial">Plan Rural Connect · IE El Roble</h1><p>Perfil: ' + (S.prof ? PERFILES[S.prof] : '—') + '</p>' +
      [['e', 'Enlaces'], ['t', 'Tráfico prioritario'], ['i', 'Indicadores'], ['l', 'Límite y mejora']].map(function (f) { return '<h3>' + f[1] + '</h3><p style="white-space:pre-wrap">' + esc(S.plan[f[0]] || '—') + '</p>'; }).join('') +
      (S.planOk ? '<p><b>Autoevaluación:</b> ' + planPts() + ' de 12</p>' : '') + '<p style="font-size:12px;color:#666">Aulas sin cobertura · Universidad de Cundinamarca</p>';
    document.body.appendChild(d); window.print();
  }

  /* 16 · Reto final */
  var CRIT8 = ['Enlaces: no combina al menos dos enlaces', 'Priorización: no ordena el tráfico por aplicación', 'Indicadores: no define métricas ni valores de referencia', 'Límite y mejora: no reconoce riesgos ni propone cómo atenderlos'];
  var ITEMS = [
    { lv: 'Comprender · V/F', star: 1, type: 'choice',
      v: [{ q: '«SD-WAN amplía la cobertura de señal de la vereda.» ¿Verdadero o falso?' }, { q: '«Con SD-WAN, una escuela sin ningún enlace disponible queda conectada.» ¿Verdadero o falso?' }],
      o: ['Verdadero', 'Falso'], a: 1,
      w: ['No crea señal; coordina los enlaces que ya existen.', 'Aumenta la potencia de la antena 4G.', 'Instala un satélite propio en la escuela.'], wa: 0 },
    { lv: 'Comprender · asociación', type: 'assoc',
      v: [{ q: 'Relaciona cada pieza con su función.' }, { q: 'Une cada componente de SD-WAN con lo que hace.' }],
      pairs: [['Equipo de borde', 'Reúne los enlaces'], ['Túnel overlay', 'Transporta cifrado'], ['Controlador', 'Decide rutas'], ['Política', 'Fija prioridades']] },
    { lv: 'Aplicar · selección', type: 'choice',
      v: [{ q: 'El Roble puede contratar 4G, satélite LEO o ambos. ¿Qué configuración da respaldo sin disparar el costo?', o: ['Solo satélite LEO para todo el tráfico', '4G como principal y satélite como respaldo para el tráfico crítico', 'Solo 4G con un plan de más gigas', 'Dos planes 4G del mismo operador'], a: 1 },
        { q: 'Una escuela tiene fibra que se corta a veces y 4G estable con datos limitados. ¿Qué configuración da respaldo sin disparar el costo?', o: ['Solo 4G para todo el tráfico', 'Solo fibra y esperar a que vuelva', 'Fibra como principal y 4G como respaldo para el tráfico crítico', 'Dos enlaces de fibra del mismo proveedor'], a: 2 }] },
    { lv: 'Aplicar · ranking', type: 'rank',
      v: [{ q: 'A las 9:00 a. m. coinciden estas tareas. Ordénalas de mayor a menor prioridad.', it: [['Videoclase', 'top'], ['Examen en el LMS', 'top'], ['Mensajería', 'mid'], ['Actualizaciones', 'low']] },
        { q: 'A las 2:00 p. m. coinciden estas tareas. Ordénalas de mayor a menor prioridad.', it: [['Evaluación en línea', 'top'], ['Transmisión de la clase', 'top'], ['Correo institucional', 'mid'], ['Copia de seguridad de archivos', 'low']] }] },
    { lv: 'Aplicar · interpretación', type: 'choice',
      v: [{ q: 'Reporte: latencia 110 ms, jitter 15 ms, pérdida 7 %, disponibilidad 98 %. ¿Qué indicador explica los cortes de la videoclase?', o: ['Latencia', 'Jitter', 'Pérdida de paquetes', 'Disponibilidad'], a: 2 },
        { q: 'Reporte: latencia 320 ms, jitter 10 ms, pérdida 0,5 %, disponibilidad 99 %. ¿Qué indicador explica que la conversación en la videoclase llegue con retraso?', o: ['Latencia', 'Jitter', 'Pérdida de paquetes', 'Disponibilidad'], a: 0 }] },
    { lv: 'Aplicar · decisión', star: 1, type: 'choice',
      v: [{ q: 'En pleno examen se cae el 4G. ¿Qué debe hacer la política SD-WAN?', o: ['Pasar el LMS al satélite de forma automática y aplazar las descargas', 'Detener todo el tráfico hasta que vuelva el 4G', 'Pasar todo el tráfico, incluidas las descargas, al satélite'], a: 0,
        w: ['Protege el tráfico crítico sin agotar los datos limitados del satélite.', 'El satélite tiene datos ilimitados.', 'Las descargas son tan importantes como el examen.'], wa: 0 },
        { q: 'Durante una videoclase, la latencia del satélite sube mucho y el 4G está estable. ¿Qué debe hacer la política SD-WAN?', o: ['Mantener todo en el satélite', 'Mover la videoclase al 4G y dejar en el satélite lo que puede esperar', 'Cancelar la videoclase'], a: 1,
          w: ['El 4G siempre es mejor que el satélite.', 'La política usa el estado de cada enlace para enviar lo crítico por el mejor camino.', 'Las videoclases no necesitan baja latencia.'], wa: 1 }] },
    { lv: 'Analizar · selección', star: 1, type: 'choice',
      v: [{ q: 'Un colega propone enviar todo el tráfico solo por satélite. ¿Cuál es el principal riesgo?', o: ['La señal 4G se debilita', 'Costo de datos alto y ningún respaldo si ese enlace falla', 'Los túneles dejan de estar cifrados'], a: 1,
        w: ['El satélite no funciona en zonas rurales.', 'Un solo enlace es un punto único de falla y el satélite cobra por consumo.', 'SD-WAN no admite enlaces satelitales.'], wa: 1 },
        { q: 'Proponen usar solo una red LTE privada comunitaria, sin otro enlace. ¿Cuál es el principal riesgo?', o: ['Si la red comunitaria falla, la escuela queda sin conexión', 'El costo mensual se multiplica por diez', 'Las políticas dejan de funcionar'], a: 0,
          w: ['Sin un segundo enlace no hay a dónde mover el tráfico cuando hay fallas.', 'LTE privado no se puede usar en escuelas.', 'SD-WAN solo funciona con satélite.'], wa: 0 }] },
    { lv: 'Analizar · caso', type: 'choice',
      v: [{ q: 'El plan de otra escuela combina enlaces y prioriza el tráfico, pero no dice cómo medirá. ¿Qué criterio de la rúbrica no cumple?', o: CRIT8, a: 2 },
        { q: 'Un plan combina 4G y satélite, prioriza la videoclase y mide latencia y pérdida, pero no menciona ningún riesgo. ¿Qué criterio de la rúbrica no cumple?', o: CRIT8, a: 3 }] }
  ];
  function finalScore(correct) { return Math.round(planPts() / 12 * 50 + correct / 8 * 50); }
  function reportScorm(score, correct) {
    if (!SCORM.isActive()) return;
    SCORM.set('cmi.core.score.min', '0'); SCORM.set('cmi.core.score.max', '100'); SCORM.set('cmi.core.score.raw', String(score));
    SCORM.set('cmi.core.lesson_status', score >= 80 ? 'passed' : 'failed');
    var base = 'cmi.objectives.0.';
    SCORM.set(base + 'id', 'reto_final'); SCORM.set(base + 'score.raw', String(Math.round(correct / 8 * 100))); SCORM.set(base + 'status', correct >= 7 ? 'passed' : 'failed');
    SCORM.set('cmi.objectives.1.id', 'plan_rural_connect'); SCORM.set('cmi.objectives.1.score.raw', String(Math.round(planPts() / 12 * 100))); SCORM.set('cmi.objectives.1.status', planPts() >= 10 ? 'passed' : 'failed');
    SCORM.commit();
  }
  SCREENS[16] = function (el) {
    var v = S.reto.v % 2, ans = {}, ranks = {}, assocOpts = {}, moved = {};
    var intro = '<h2 style="font-family:var(--head);color:var(--navy);text-align:center;margin:0 0 14px">RETO FINAL - Preguntas</h2><div class="tiers"><span class="tier">2 · Comprender</span><span class="tier">4 · Aplicar</span><span class="tier">2 · Analizar</span><span class="tier">+ Plan</span><span class="meta">META ≥ 80 %</span></div>' +
      '<div class="panel16">' + ILU.fichaSchool + '<div class="pbars"><div class="small" style="font-weight:700">Caso: IE El Roble · 4G débil · opción satelital · poco presupuesto</div>' +
      [['c', 'Comprender', 2], ['a', 'Aplicar', 4], ['n', 'Analizar', 2]].map(function (x) { return '<div class="prog"><span>' + x[1] + '</span><div class="track"><div class="fill" id="pl' + x[0] + '"></div></div><b id="pn' + x[0] + '">0/' + x[2] + '</b></div>'; }).join('') +
      '<div class="prog logro"><span>Logro</span><div class="track"><div class="fill" id="plog" style="background:var(--orange);width:' + (S.reto.last ? S.reto.last.s : 0) + '%"></div><i class="mark80"></i></div><b id="nlog">' + (S.reto.last ? S.reto.last.s : '—') + '</b></div></div></div>' +
      (S.reto.last ? '<div class="feedback info" style="margin-bottom:12px">Último intento: ' + S.reto.last.c + ' de 8 · nota ' + S.reto.last.s + '/100. ' + (S.reto.n ? 'Este intento usa preguntas equivalentes (versión ' + (v ? 'B' : 'A') + ').' : '') + '</div>' : '');
    var html = ITEMS.map(function (it, i) {
      var V = it.v[v], h = '<div class="item" data-i="' + i + '"><div class="hd">Pregunta ' + (i + 1) + (it.star ? ' ★' : '') + ' · ' + it.lv + '</div><div class="stem">' + V.q + '</div>';
      if (it.type === 'choice') {
        var o = V.o || it.o;
        h += '<div class="opts">' + o.map(function (t, j) { return '<button class="opt" data-q="' + i + '" data-j="' + j + '"><span class="k">' + String.fromCharCode(65 + j) + '</span>' + t + '</button>'; }).join('') + '</div>';
        if (it.star) { var w = V.w || it.w; h += '<div class="why"><b>¿Por qué?</b><div class="opts" style="margin-top:8px">' + w.map(function (t, j) { return '<button class="opt" data-w="' + i + '" data-j="' + j + '"><span class="k">' + (j + 1) + '</span>' + t + '</button>'; }).join('') + '</div></div>'; }
      } else if (it.type === 'assoc') {
        var fs = shuffle(it.pairs.map(function (p) { return p[1]; })); assocOpts[i] = fs;
        h += it.pairs.map(function (p, j) { return '<div class="assoc" style="margin-bottom:8px"><span>' + p[0] + '</span><select data-a="' + i + '" data-j="' + j + '" aria-label="Función de ' + p[0] + '"><option value="">— Elige —</option>' + fs.map(function (f) { return '<option>' + f + '</option>'; }).join('') + '</select></div>'; }).join('');
      } else if (it.type === 'rank') {
        h += '<div id="rk' + i + '"></div>';
      }
      return h + '</div>';
    }).join('');
    el.innerHTML = intro + html + '<button class="btn" id="send16">Enviar respuestas</button><div id="f16"></div>';
    ITEMS.forEach(function (it, i) {
      if (it.type === 'rank') { ranks[i] = shuffle(it.v[v].it.map(function (x) { return { t: x[0], g: x[1] }; })); rankWidget($('#rk' + i, el), ranks[i], function () { moved[i] = 1; prog16(); }); }
    });
    $$('.opt[data-q]', el).forEach(function (b) { b.onclick = function () { var q = b.dataset.q; ans[q] = ans[q] || {}; ans[q].a = +b.dataset.j; $$('.opt[data-q="' + q + '"]', el).forEach(function (x) { x.classList.toggle('sel', x === b); }); }; });
    $$('.opt[data-w]', el).forEach(function (b) { b.onclick = function () { var q = b.dataset.w; ans[q] = ans[q] || {}; ans[q].w = +b.dataset.j; $$('.opt[data-w="' + q + '"]', el).forEach(function (x) { x.classList.toggle('sel', x === b); }); }; });
    function answered(i) {
      var it = ITEMS[i];
      if (it.type === 'choice') { var a = ans[i] || {}; return a.a != null && (!it.star || a.w != null); }
      if (it.type === 'assoc') return $$('select[data-a="' + i + '"]', el).every(function (x) { return x.value; });
      return !!moved[i];
    }
    function prog16() {
      [['c', [0, 1]], ['a', [2, 3, 4, 5]], ['n', [6, 7]]].forEach(function (g) {
        var k = g[1].filter(answered).length; $('#pl' + g[0], el).style.width = (k / g[1].length * 100) + '%'; $('#pn' + g[0], el).textContent = k + '/' + g[1].length;
      });
    }
    $$('.opt[data-q], .opt[data-w]', el).forEach(function (b) { b.addEventListener('click', prog16); });
    $$('select[data-a]', el).forEach(function (x) { x.addEventListener('change', prog16); });
    $('#send16', el).onclick = function () {
      var correct = 0, detail = [];
      ITEMS.forEach(function (it, i) {
        var V = it.v[v], ok = false;
        if (it.type === 'choice') {
          var a = ans[i] || {}, A = V.a != null ? V.a : it.a;
          ok = a.a === A && (!it.star || a.w === (V.wa != null ? V.wa : it.wa));
        } else if (it.type === 'assoc') {
          ok = it.pairs.every(function (p, j) { return $('select[data-a="' + i + '"][data-j="' + j + '"]', el).value === p[1]; });
        } else if (it.type === 'rank') {
          var g = ranks[i].map(function (x) { return x.g; }); ok = g[0] === 'top' && g[1] === 'top' && g[2] === 'mid' && g[3] === 'low';
        }
        if (ok) correct++; detail.push(ok);
        var box = $('.item[data-i="' + i + '"]', el); box.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)';
      });
      var score = finalScore(correct), pass = score >= 80;
      $('#plog', el).style.width = score + '%'; $('#plog', el).style.background = pass ? 'var(--ok)' : 'var(--orange)'; $('#nlog', el).textContent = score;
      S.reto.last = { c: correct, s: score }; S.reto.n++; S.reto.v++;
      if (!S.reto.best || score > S.reto.best.s) S.reto.best = { c: correct, s: score };
      save(); reportScorm(S.reto.best.s, S.reto.best.c);
      var rev = detail.map(function (ok, i) { return ok ? null : 'P' + (i + 1) + ' (fase ' + [[2, 3], [3], [3, 4], [5], [6], [5], [3, 8], [6, 8]][i].join(' y ') + ')'; }).filter(Boolean);
      $('#f16', el).innerHTML = '<div class="result" style="margin-top:16px"><div class="big">' + score + ' / 100</div><p>Reto: ' + correct + ' de 8 (' + Math.round(correct / 8 * 50) + ' de 50) · Plan: ' + planPts() + ' de 12 (' + Math.round(planPts() / 12 * 50) + ' de 50)</p>' +
        '<p><b>' + (pass ? '¡Lograste la meta!' : 'Aún no alcanzas el 80 %.') + '</b> ' + (rev.length ? 'Repasa: ' + rev.join(', ') + '.' : '¡Todas correctas!') + '</p>' +
        '<div class="row"><button class="btn teal" id="cont16">' + (pass ? 'Continuar al cierre' : 'Ver cierre') + '</button><button class="btn ghost" id="again16">Reintentar con preguntas equivalentes</button>' + (pass ? '' : '<button class="btn ghost" id="plan16">Mejorar mi plan</button>') + '</div></div>';
      $('#cont16', el).onclick = function () { go(17); };
      $('#again16', el).onclick = function () { render(); };
      var p16 = $('#plan16', el); if (p16) p16.onclick = function () { go(15); };
      $('#send16', el).disabled = true;
      $('#f16', el).scrollIntoView({ behavior: 'smooth' });
    };
  };

  /* 17 · Red conectada */
  SCREENS[17] = function (el) {
    var checks = [['Explico la brecha rural con datos', S.ph[0]], ['Reconozco las piezas de SD-WAN', S.ph[2]], ['Diseño y priorizo tráfico educativo', S.ph[3] && S.ph[4]], ['Interpreto indicadores de conectividad', S.ph[5]]];
    el.innerHTML = '<div class="net17">' + ILU.net8 + '</div><div class="grid2"><div>' + checks.map(function (c) { return '<div class="check ' + (c[1] ? 'on' : '') + '"><span class="ck">✓</span>' + c[0] + '</div>'; }).join('') +
      '<div class="badgebox ' + (S.reto.best && S.reto.best.s >= 80 ? '' : 'off') + '">' + ILU.badge + '<b>' + (S.reto.best && S.reto.best.s >= 80 ? '¡Ganaste la insignia «Puente Digital»!' : 'Insignia «Puente Digital»: alcanza el 80 % para obtenerla') + '</b></div></div>' +
      '<div><div class="card"><h3>Tu respuesta al inicio</h3><p>' + (S.p3 ? esc(P3[S.p3]) : 'No respondiste el reto inicial.') + '</p></div>' +
      '<div class="card" style="margin-top:10px"><h3>Tu plan: enlaces</h3><p style="white-space:pre-wrap">' + esc(S.plan.e || '—') + '</p></div>' +
      '<p class="small">¿Qué cambió entre tu primera respuesta y tu plan?</p><p class="small">Puntos acumulados: <b>' + S.pts + '</b></p></div></div>' +
      '<div class="row" style="margin-top:16px"><button class="btn ghost" id="rep17">REPASAR</button><button class="btn ghost" id="pdf17">DESCARGAR PLAN</button><button class="btn navy" id="ref17">REFERENCIAS</button><button class="btn" id="fin17">FINALIZAR</button></div>';
    $('#rep17', el).onclick = function () { go(2); };
    $('#pdf17', el).onclick = printPlan;
    $('#ref17', el).onclick = function () { go(18); };
    $('#fin17', el).onclick = finish;
  };
  function finish() {
    save();
    if (SCORM.isActive()) {
      if (!S.reto.best) SCORM.set('cmi.core.lesson_status', 'incomplete');
      SCORM.finish();
      modal('¡Gracias por recorrer la ruta!', '<p>Tu avance y tu nota quedaron registrados en la plataforma. Ya puedes cerrar esta ventana.</p>');
    } else modal('¡Gracias por recorrer la ruta!', '<p>Tu avance quedó guardado en este navegador.</p>');
  }

  /* 18 · Referencias y créditos */
  SCREENS[18] = function (el) {
    el.innerHTML = '<div class="tabs"><button class="sel" data-t="r">Referencias</button><button data-t="c">Créditos</button></div><div id="tb"></div>' +
      '<div class="row" style="margin-top:14px"><button class="btn ghost" id="map18">MAPA</button><button class="btn" id="fin18">FINALIZAR</button></div>';
    function tab(t) {
      $$('.tabs button', el).forEach(function (b) { b.classList.toggle('sel', b.dataset.t === t); });
      $('#tb', el).innerHTML = t === 'r' ? '<div class="refs">' + REFERENCIAS.map(function (r) { return '<p>' + r + '</p>'; }).join('') + '</div>' :
        '<div class="card"><h3>Aulas sin cobertura: conectividad y formación virtual en comunidades rurales</h3><p><b>Autoría:</b> Paula Andrea Castro Molina y Cristián David Peña Guzmán</p><p><b>Institución:</b> Universidad de Cundinamarca · 2026</p><p><b>Nivel:</b> intermedio</p><p><b>Guía:</b> Nodo, avatar original del proyecto</p><p><b>Voz de Nodo:</b> generada con inteligencia artificial (Artlist)</p><p><b>Ilustraciones y avatar:</b> originales del proyecto</p>' +
        '<div style="margin-top:12px">' + ILU.cc + '</div><p style="margin-top:6px"><b>Licencia:</b> Creative Commons Atribución-CompartirIgual 4.0 Internacional (<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noopener">CC BY-SA 4.0</a>)</p></div>';
    }
    $$('.tabs button', el).forEach(function (b) { b.onclick = function () { tab(b.dataset.t); }; });
    $('#map18', el).onclick = function () { go(2); };
    $('#fin18', el).onclick = finish;
    tab('r');
  };

  /* ---------------- arranque ---------------- */
  function boot() {
    SCORM.init(); load();
    var loc = SCORM.isActive() ? parseInt(SCORM.get('cmi.core.lesson_location'), 10) : 0;
    if (loc >= 1 && loc <= TOTAL) S.p = loc;
    if (S.p > maxReach()) S.p = maxReach();
    $('#prev').onclick = function () { go(S.p - 1); };
    $('#next').onclick = function () { go(S.p + 1); };
    $('#mapBtn').onclick = function () { go(2); };
    $('#phases').onclick = function (e) { var b = e.target.closest('.ph'); if (b) go(FASE_PANTALLA[b.dataset.f]); };
    $('#btnPlay').onclick = function () { if ($('#nodoBtn').classList.contains('talking')) { stopVoice(); setProgress(VOCES[S.p].voz, VOCES[S.p].voz.length, tipHtml()); } else say(true); };
    $('#btnMute').onclick = function () { S.mute = !S.mute; save(); this.textContent = S.mute ? '🔇' : '🔊'; if (S.mute) { stopVoice(); setProgress(VOCES[S.p].voz, VOCES[S.p].voz.length, tipHtml()); } };
    $('#btnHide').onclick = function () { stopVoice(); $('#bubble').classList.remove('show'); };
    $('#stage').addEventListener('pointerdown', function () { $('#bubble').classList.remove('show'); });
    $('#nodoBtn').onclick = function () { var b = $('#bubble'); if (b.classList.contains('show') && $('#nodoBtn').classList.contains('talking')) { stopVoice(); b.classList.remove('show'); } else say(!S.mute); };
    var mark = function () { V.gesture = true; document.removeEventListener('pointerdown', mark, true); document.removeEventListener('keydown', mark, true); };
    document.addEventListener('pointerdown', mark, true); document.addEventListener('keydown', mark, true);
    $('#modalClose').onclick = closeModal;
    $('#modal').onclick = function (e) { if (e.target.id === 'modal') closeModal(); };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    $('#nodoSvg').innerHTML = NODO_SVG;
    try { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = function () {}; } catch (e) {}
    window.addEventListener('beforeunload', function () { save(); if (SCORM.isActive()) SCORM.finish(); });
    render();
  }
  document.addEventListener('DOMContentLoaded', boot);
  window.__ODC = { state: S, go: go };
})();
