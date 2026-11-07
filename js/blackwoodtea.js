// blackwoodtea.onrender.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".bwt-rise,.bwt-perday2,.bwt-rater,.bwt-dial2,.bwt-chartx,.bwt-dose,.bwt-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("bwt-live2");
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "200px 0px -5% 0px", threshold: 0 });
    els.forEach(function (el) { io.observe(el); });
    var sweep = function () {
      var vh = innerHeight;
      els.forEach(function (el) { if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < vh * 0.92) show(el); });
    };
    addEventListener("scroll", sweep, { passive: true });
    addEventListener("load", function () { sweep(); [400, 1200, 2500].forEach(function (t) { setTimeout(sweep, t); }); });
    sweep();
    setTimeout(function () { els.forEach(show); }, 3500);
  }

  var btn = document.querySelector(".bwt-menubtn"), panel = document.getElementById("bwt-megamenu");
  if (btn && panel) {
    var set = function (on) {
      if (on) panel.setAttribute("data-open", ""); else panel.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", on ? "true" : "false");
    };
    btn.addEventListener("click", function (e) { e.stopPropagation(); set(!panel.hasAttribute("data-open")); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); e.stopPropagation(); });
    document.addEventListener("click", function () { set(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  var tiles = [].slice.call(document.querySelectorAll(".bwt-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".bwt-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".bwt-whenb")), label = document.getElementById("bwt-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".bwt-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".bwt-sticky2"), foot = document.querySelector(".bwt-base2");
  if (bar) {
    var upd = function () {
      if (scrollY > 620) bar.setAttribute("data-up", ""); else bar.removeAttribute("data-up");
      var hide = false;
      if (foot) hide = foot.getBoundingClientRect().top < innerHeight - 40;
      if (hide) bar.setAttribute("data-hide", ""); else bar.removeAttribute("data-hide");
    };
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
  }
})();

/* hero circulation canvas: particles streaming through a branching vessel network, a heartbeat pulse and glowing junction nodes */
(function(){var c=document.getElementById('bwt-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,k;
var paths=[[[10,115],[120,115],[200,70],[340,50],[550,40]],[[120,115],[210,115],[330,115],[550,115]],[[120,115],[200,160],[340,185],[550,195]],[[200,70],[260,30],[400,15],[550,12]],[[200,160],[280,205],[420,222],[550,224]]];
var segs=paths.map(function(p){var s=[],len=0;for(var j=0;j<p.length-1;j++){var d=Math.hypot(p[j+1][0]-p[j][0],p[j+1][1]-p[j][1]);s.push([p[j],p[j+1],d]);len+=d}return {s:s,len:len}});
function at(P,u){var d=u*P.len,j=0;while(j<P.s.length-1&&d>P.s[j][2]){d-=P.s[j][2];j++}var q=P.s[j],f=Math.min(1,d/q[2]);return [q[0][0]+(q[1][0]-q[0][0])*f,q[0][1]+(q[1][1]-q[0][1])*f]}
var parts=[];for(i=0;i<70;i++){parts.push({p:Math.random(),s:0.003+Math.random()*0.004,k:i%paths.length,o:(Math.random()-.5)*5})}
function frame(){t+=0.016;x.clearRect(0,0,W,H);var beat=Math.max(0,Math.sin(t*3.0)),pulse=1+0.22*Math.pow(beat,3);
x.lineCap='round';
for(k=0;k<paths.length;k++){var P=paths[k];x.strokeStyle='rgba(214,58,58,'+(0.22+0.12*beat)+')';x.lineWidth=k?5:9;x.beginPath();x.moveTo(P[0][0],P[0][1]);for(i=1;i<P.length;i++)x.lineTo(P[i][0],P[i][1]);x.stroke()}
var nodes=[[120,115],[200,70],[200,160],[330,115],[340,50],[340,185]];
for(i=0;i<nodes.length;i++){x.beginPath();x.arc(nodes[i][0],nodes[i][1],4.5*pulse,0,6.283);x.fillStyle=i%2?'rgba(217,162,27,.95)':'rgba(214,58,58,.95)';x.fill()}
x.beginPath();x.arc(14,115,9*pulse,0,6.283);x.fillStyle='rgba(214,58,58,.95)';x.fill();x.beginPath();x.arc(14,115,17*pulse,0,6.283);x.strokeStyle='rgba(214,58,58,.35)';x.lineWidth=2;x.stroke();
for(i=0;i<parts.length;i++){var q=parts[i];if(!reduce){q.p+=q.s*(1+0.6*beat);if(q.p>1)q.p=0}var pt=at(segs[q.k],q.p);x.beginPath();x.arc(pt[0],pt[1]+q.o,2.3,0,6.283);x.fillStyle='rgba(217,162,27,'+(0.3+0.6*Math.sin(q.p*3.14))+')';x.fill()}
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
