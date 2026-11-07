// breathizen-us.onrender.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".brz-rise,.brz-perday2,.brz-rater,.brz-dial2,.brz-chartx,.brz-dose,.brz-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("brz-live2");
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

  var btn = document.querySelector(".brz-menubtn"), panel = document.getElementById("brz-megamenu");
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

  var tiles = [].slice.call(document.querySelectorAll(".brz-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".brz-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".brz-whenb")), label = document.getElementById("brz-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".brz-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".brz-sticky2"), foot = document.querySelector(".brz-base2");
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

/* hero breath canvas: a breathing circle that grows and shrinks, air streamlines and a branching airway node network */
(function(){var c=document.getElementById('brz-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,k,cx=W*0.3,cy=H*0.5;
var branches=[];function grow(px,py,ang,len,d){if(d>3)return;var nx=px+Math.cos(ang)*len,ny=py+Math.sin(ang)*len;branches.push([px,py,nx,ny,d]);grow(nx,ny,ang-0.5,len*0.72,d+1);grow(nx,ny,ang+0.5,len*0.72,d+1)}
grow(W*0.52,H*0.5,0,70,0);
var air=[];for(i=0;i<40;i++)air.push({p:Math.random(),y:12+Math.random()*(H-24),s:0.002+Math.random()*0.004});
function frame(){t+=0.016;x.clearRect(0,0,W,H);
var ph=(t%10)/10,br=ph<0.4?ph/0.4:1-(ph-0.4)/0.6,e=br*br*(3-2*br),r=reduce?44:22+e*40;
x.beginPath();x.arc(cx,cy,r+14,0,6.283);x.strokeStyle='rgba(59,120,201,'+(0.18+0.25*e)+')';x.lineWidth=2;x.stroke();
x.beginPath();x.arc(cx,cy,r,0,6.283);x.fillStyle='rgba(217,142,26,'+(0.25+0.35*e)+')';x.fill();x.strokeStyle='rgba(217,142,26,.95)';x.lineWidth=3;x.stroke();
for(i=0;i<air.length;i++){var a=air[i];if(!reduce){a.p+=a.s*(ph<0.4?1:0.5);if(a.p>1)a.p=0}var px=cx+r+10+a.p*(W*0.52-cx-r),py=a.y+(H*0.5-a.y)*a.p*0.9;x.beginPath();x.arc(px,py,1.9,0,6.283);x.fillStyle='rgba(59,120,201,'+(0.15+0.6*Math.sin(a.p*3.14))+')';x.fill()}
for(i=0;i<branches.length;i++){var b=branches[i];x.beginPath();x.moveTo(b[0],b[1]);x.lineTo(b[2],b[3]);x.strokeStyle='rgba(59,120,201,'+(0.55-b[4]*0.1)+')';x.lineWidth=5-b[4]*1.1;x.lineCap='round';x.stroke();
x.beginPath();x.arc(b[2],b[3],2.6+e*2,0,6.283);x.fillStyle=b[4]%2?'rgba(217,142,26,.95)':'rgba(59,120,201,.95)';x.fill()}
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
