(function() {
  var urlParams = new URLSearchParams(window.location.search);
  var currentScript = document.currentScript;
  var slot = "default";
  
  if (currentScript && currentScript.src) {
    try {
      var scriptUrl = new URL(currentScript.src, window.location.origin);
      slot = scriptUrl.searchParams.get("slot") || "default";
    } catch(e) {}
  }

  var target = document.getElementById("adsterra-" + slot) || (currentScript && currentScript.parentElement);
  if (!target) return;

  var adFrame = document.createElement("iframe");
  adFrame.style.width = "100%";
  adFrame.style.maxWidth = "728px";
  adFrame.style.height = "250px";
  adFrame.style.border = "none";
  adFrame.style.overflow = "hidden";
  adFrame.scrolling = "no";
  adFrame.title = "Advertisement " + slot;

  target.innerHTML = "";
  target.appendChild(adFrame);

  var frameDoc = adFrame.contentWindow ? adFrame.contentWindow.document : adFrame.contentDocument;
  if (frameDoc) {
    frameDoc.open();
    frameDoc.write(`<!DOCTYPE html><html><head><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;}</style></head><body><script type="text/javascript">atOptions={'key':'e86b0a880f8ebce4ceeb46ff53c846bf','format':'iframe','height':250,'width':300,'params':{}};</script><script type="text/javascript" src="//www.highperformanceformat.com/e86b0a880f8ebce4ceeb46ff53c846bf/invoke.js"></script></body></html>`);
    frameDoc.close();
  }
})();
