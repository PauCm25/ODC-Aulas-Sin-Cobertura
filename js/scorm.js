/* Envoltorio mínimo SCORM 1.2. Si no hay LMS, funciona en modo local (localStorage). */
var SCORM = (function () {
  var api = null, active = false, startTime = new Date();

  function findAPI(win) {
    var tries = 0;
    while (win && !win.API && win.parent && win.parent !== win && tries < 10) { win = win.parent; tries++; }
    return win && win.API ? win.API : null;
  }
  function locate() {
    var a = null;
    try { a = findAPI(window); } catch (e) {}
    if (!a) { try { if (window.opener) a = findAPI(window.opener); } catch (e) {} }
    return a;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function sessionTime() {
    var s = Math.round((new Date() - startTime) / 1000);
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return pad(h) + ':' + pad(m) + ':' + pad(sec);
  }

  return {
    init: function () {
      api = locate();
      if (api) {
        try { active = String(api.LMSInitialize('')) === 'true'; } catch (e) { active = false; }
        if (active) {
          var st = this.get('cmi.core.lesson_status');
          if (!st || st === 'not attempted') this.set('cmi.core.lesson_status', 'incomplete');
        }
      }
      return active;
    },
    isActive: function () { return active; },
    get: function (k) { if (!active) return ''; try { return api.LMSGetValue(k); } catch (e) { return ''; } },
    set: function (k, v) { if (!active) return false; try { return String(api.LMSSetValue(k, String(v))) === 'true'; } catch (e) { return false; } },
    commit: function () { if (!active) return; try { api.LMSCommit(''); } catch (e) {} },
    finish: function () {
      if (!active) return;
      this.set('cmi.core.session_time', sessionTime());
      this.commit();
      try { api.LMSFinish(''); } catch (e) {}
      active = false;
    }
  };
})();
