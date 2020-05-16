anima_isHidden = function (e) {
  if (!(e instanceof HTMLElement)) return !1;
  if (getComputedStyle(e).display == "none") return !0;
  else if (e.parentNode && anima_isHidden(e.parentNode)) return !0;
  return !1;
};
anima_loadAsyncSrcForTag = function (tag) {
  var elements = document.getElementsByTagName(tag);
  var toLoad = [];
  for (var i = 0; i < elements.length; i++) {
    var e = elements[i];
    var src = e.getAttribute("src");
    var loaded =
      src != undefined &&
      src.length > 0 &&
      src != "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    if (loaded) continue;
    var asyncSrc = e.getAttribute("anima-src");
    if (asyncSrc == undefined || asyncSrc.length == 0) continue;
    if (anima_isHidden(e)) continue;
    toLoad.push(e);
  }
  toLoad.sort(function (a, b) {
    return anima_getTop(a) - anima_getTop(b);
  });
  for (var i = 0; i < toLoad.length; i++) {
    var e = toLoad[i];
    var asyncSrc = e.getAttribute("anima-src");
    e.setAttribute("src", asyncSrc);
  }
};
anima_pauseHiddenVideos = function (tag) {
  var elements = document.getElementsByTagName("video");
  for (var i = 0; i < elements.length; i++) {
    var e = elements[i];
    var isPlaying = !!(e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2);
    var isHidden = anima_isHidden(e);
    if (!isPlaying && !isHidden && e.getAttribute("autoplay") == "autoplay") {
      e.play();
    } else if (isPlaying && isHidden) {
      e.pause();
    }
  }
};
anima_loadAsyncSrc = function (tag) {
  anima_loadAsyncSrcForTag("img");
  anima_loadAsyncSrcForTag("iframe");
  anima_loadAsyncSrcForTag("video");
  anima_pauseHiddenVideos();
};
var anima_getTop = function (e) {
  var top = 0;
  do {
    top += e.offsetTop || 0;
    e = e.offsetParent;
  } while (e);
  return top;
};
anima_loadAsyncSrc();
anima_old_onResize = window.onresize;
anima_new_onResize = undefined;
anima_updateOnResize = function () {
  if (anima_new_onResize == undefined || window.onresize != anima_new_onResize) {
    anima_new_onResize = function (x) {
      if (anima_old_onResize != undefined) anima_old_onResize(x);
      anima_loadAsyncSrc();
    };
    window.onresize = anima_new_onResize;
    setTimeout(function () {
      anima_updateOnResize();
    }, 3000);
  }
};
anima_updateOnResize();
setTimeout(function () {
  anima_loadAsyncSrc();
}, 200);
