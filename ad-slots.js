(function() {
  var AD_CONFIGS = {
    sidebar_left: { key: 'e93dd0260f8f170aa495d6679fe95416', width: 160, height: 600 },
    sidebar_right: { key: 'e93dd0260f8f170aa495d6679fe95416', width: 160, height: 600 },
    sidebar_short: { key: '476617950b05b1908ee70df562525708', width: 160, height: 300 },
    top_leaderboard: { key: '08591617b0d54beb48cfca5ec87f584a', width: 728, height: 90 },
    mid_banner: { key: 'd5f020e9e540f361ac1b564c9757eda0', width: 468, height: 60 },
    mobile_banner: { key: 'b766108613a3854f274726cf98fc10e2', width: 320, height: 50 },
    rectangle: { key: '358664223067c01ff85de9714367fe2e', width: 300, height: 250 },
    default: { key: '358664223067c01ff85de9714367fe2e', width: 300, height: 250 }
  };

  function injectAd(targetEl) {
    var slot = targetEl.getAttribute('data-slot') || 'default';
    var config = AD_CONFIGS[slot] || AD_CONFIGS.default;

    var iframe = document.createElement('iframe');
    iframe.width = config.width;
    iframe.height = config.height;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.title = 'Advertisement ' + slot;

    targetEl.innerHTML = '';
    targetEl.appendChild(iframe);

    var doc = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(
        '<!DOCTYPE html><html><head><base target="_blank"><style>*{margin:0;padding:0;box-sizing:border-box;}body{display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body>' +
        '<script type="text/javascript">' +
        'atOptions = {' +
        "'key' : '" + config.key + "'," +
        "'format' : 'iframe'," +
        "'height' : " + config.height + "," +
        "'width' : " + config.width + "," +
        "'params' : {}" +
        '};' +
        '</script>' +
        '<script type="text/javascript" src="https://www.highrevenueformat.com/' + config.key + '/invoke.js"></script>' +
        '</body></html>'
      );
      doc.close();
    }
  }

  function initAds() {
    var adPlaceholders = document.querySelectorAll('.ad-slot-render');
    adPlaceholders.forEach(injectAd);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
