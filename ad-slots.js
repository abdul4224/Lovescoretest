/*
 * ad-slots.js - Adsterra ad slots for static article pages on LoveScoreTest.com
 * Uses the same ad units as src/components/AdsterraSlot.tsx.
 * - Only ONE iframe is created per slot (desktop OR mobile size), never a hidden one.
 * - Ads load when the slot is within 600px of the viewport, so they never block the first paint.
 * - Space is reserved up front, so ads do not push the page around (good for CLS).
 */
(function () {
  var DESKTOP = window.matchMedia('(min-width: 768px)').matches;

  var UNITS = {
    top: {
      d: { k: '08591617b0d54beb48cfca5ec87f584a', w: 728, h: 90 },
      m: { k: 'b766108613a3854f274726cf98fc10e2', w: 320, h: 50 }
    },
    bottom: {
      d: { k: '08591617b0d54beb48cfca5ec87f584a', w: 728, h: 90 },
      m: { k: '358664223067c01ff85de9714367fe2e', w: 300, h: 250 }
    }
  };

  function buildSrcdoc(u) {
    return (
      '<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank">' +
      '<style>*,*::before,*::after{box-sizing:border-box}html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:transparent;display:flex;align-items:center;justify-content:center}</style>' +
      '</head><body>' +
      '<script type="text/javascript">atOptions={\'key\':\'' + u.k + '\',\'format\':\'iframe\',\'height\':' + u.h + ',\'width\':' + u.w + ',\'params\':{}};<\/script>' +
      '<script type="text/javascript" src="https://www.highrevenueformat.com/' + u.k + '/invoke.js" async defer><\/script>' +
      '</body></html>'
    );
  }

  function pick(el) {
    var cfg = UNITS[el.getAttribute('data-slot')];
    if (!cfg) return null;
    return DESKTOP ? cfg.d : cfg.m;
  }

  function mount(el) {
    if (el.getAttribute('data-ad-loaded')) return;
    var u = pick(el);
    if (!u) return;
    el.setAttribute('data-ad-loaded', '1');
    var f = document.createElement('iframe');
    f.title = 'Advertisement ' + u.w + 'x' + u.h;
    f.width = u.w;
    f.height = u.h;
    f.setAttribute('scrolling', 'no');
    f.style.cssText = 'border:0;display:block;max-width:100%;width:' + u.w + 'px;height:' + u.h + 'px';
    f.srcdoc = buildSrcdoc(u);
    el.appendChild(f);
  }

  function init() {
    var slots = document.querySelectorAll('.ad-slot[data-slot]');
    var i;
    for (i = 0; i < slots.length; i++) {
      var u = pick(slots[i]);
      if (u) slots[i].style.minHeight = u.h + 'px';
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          for (var j = 0; j < entries.length; j++) {
            if (entries[j].isIntersecting) {
              mount(entries[j].target);
              io.unobserve(entries[j].target);
            }
          }
        },
        { rootMargin: '600px' }
      );
      for (i = 0; i < slots.length; i++) io.observe(slots[i]);
    } else {
      for (i = 0; i < slots.length; i++) mount(slots[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
