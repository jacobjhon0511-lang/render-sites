// horsefil.onrender.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".hfl-rise,.hfl-perday2,.hfl-rater,.hfl-dial2,.hfl-chartx,.hfl-dose,.hfl-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("hfl-live2");
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

  var btn = document.querySelector(".hfl-menubtn"), panel = document.getElementById("hfl-megamenu");
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

  var tiles = [].slice.call(document.querySelectorAll(".hfl-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".hfl-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".hfl-whenb")), label = document.getElementById("hfl-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".hfl-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".hfl-sticky2"), foot = document.querySelector(".hfl-base2");
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

/* hero energy canvas: pulsing rings, orbiting connected nodes and rising particles */
(function(){var c=document.getElementById('hfl-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,k,cx=W/2,cy=H*0.55;
var orbs=[{r:52,n:5,s:0.7},{r:86,n:7,s:-0.5},{r:120,n:9,s:0.35}];
var parts=[];for(i=0;i<46;i++){parts.push({x:Math.random()*W,y:Math.random()*H,v:0.4+Math.random()*0.9})}
function frame(){t+=0.016;x.clearRect(0,0,W,H);
for(k=0;k<3;k++){var ph=((t*0.5+k/3)%1);x.beginPath();x.ellipse(cx,cy,30+ph*150,(30+ph*150)*0.55,0,0,6.283);x.strokeStyle='rgba(201,146,42,'+(0.5*(1-ph))+')';x.lineWidth=2;x.stroke()}
var pts=[];
for(k=0;k<orbs.length;k++){var o=orbs[k],ring=[];for(i=0;i<o.n;i++){var a=i/o.n*6.283+t*o.s;ring.push([cx+Math.cos(a)*o.r*1.5,cy+Math.sin(a)*o.r*0.8])}pts.push(ring);
x.strokeStyle='rgba(142,42,60,.25)';x.lineWidth=1;x.beginPath();for(i=0;i<=o.n;i++){var q=ring[i%o.n];if(i)x.lineTo(q[0],q[1]);else x.moveTo(q[0],q[1])}x.stroke();
for(i=0;i<o.n;i++){x.beginPath();x.moveTo(ring[i][0],ring[i][1]);x.lineTo(cx,cy);x.strokeStyle='rgba(201,146,42,.12)';x.stroke()}}
for(k=0;k<pts.length;k++)for(i=0;i<pts[k].length;i++){x.beginPath();x.arc(pts[k][i][0],pts[k][i][1],3.4,0,6.283);x.fillStyle=(i+k)%2?'rgba(201,146,42,.95)':'rgba(142,42,60,.9)';x.fill()}
var pu=1+0.16*Math.sin(t*2.6);x.beginPath();x.arc(cx,cy,11*pu,0,6.283);x.fillStyle='rgba(201,146,42,.95)';x.fill();x.beginPath();x.arc(cx,cy,19*pu,0,6.283);x.strokeStyle='rgba(201,146,42,.4)';x.lineWidth=2;x.stroke();
for(i=0;i<parts.length;i++){var p=parts[i];if(!reduce){p.y-=p.v;if(p.y<0){p.y=H;p.x=Math.random()*W}}x.beginPath();x.arc(p.x,p.y,1.8,0,6.283);x.fillStyle='rgba(142,42,60,'+(0.15+0.4*(p.y/H))+')';x.fill()}
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
