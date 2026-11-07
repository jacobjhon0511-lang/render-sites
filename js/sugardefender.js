// sugardefender.onrender.com: reveal-on-scroll (progressive enhancement), "Where to?" panel, ingredient tiles, habit planner, sticky order bar.
(function () {
  var root = document.documentElement;
  var els = [].slice.call(document.querySelectorAll(".sdf-rise,.sdf-perday2,.sdf-rater,.sdf-dial2,.sdf-chartx,.sdf-dose,.sdf-donutx"));
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) { el.classList.add("is-in"); }
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(show); }
  else {
    root.classList.add("sdf-live2");
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

  var btn = document.querySelector(".sdf-menubtn"), panel = document.getElementById("sdf-megamenu");
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

  var tiles = [].slice.call(document.querySelectorAll(".sdf-chip6"));
  if (tiles.length) {
    var stories = [].slice.call(document.querySelectorAll(".sdf-focus"));
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        var id = t.getAttribute("data-s");
        tiles.forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
        stories.forEach(function (s) { s.hidden = s.id !== id; });
      });
    });
  }

  var moments = [].slice.call(document.querySelectorAll(".sdf-whenb")), label = document.getElementById("sdf-moment");
  moments.forEach(function (m) {
    m.addEventListener("click", function () {
      moments.forEach(function (x) { x.setAttribute("aria-pressed", x === m ? "true" : "false"); });
      if (label) label.textContent = m.textContent.toLowerCase();
    });
  });
  [].slice.call(document.querySelectorAll(".sdf-daysbtn")).forEach(function (d) {
    d.addEventListener("click", function () { d.setAttribute("aria-pressed", d.getAttribute("aria-pressed") === "true" ? "false" : "true"); });
  });

  var bar = document.querySelector(".sdf-sticky2"), foot = document.querySelector(".sdf-base2");
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

/* hero glucose canvas: a scrolling monitor-style trace whose spikes calm into a steady target band, with glowing nodes */
(function(){var c=document.getElementById('sdf-flow');if(!c||!c.getContext)return;var x=c.getContext('2d'),W=c.width,H=c.height,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,t=0,run=true,i,top=H*0.36,bot=H*0.64,mid=H*0.5;
function val(u,ph){var calm=(Math.sin(ph*0.5)+1)/2;var spikes=Math.sin(u*0.045)*Math.sin(u*0.013+1)*70+Math.sin(u*0.11)*22;var amp=reduce?0.3:(1-calm*0.82);return mid+spikes*amp*0.55+Math.sin(u*0.2)*3*calm}
function frame(){t+=0.016;x.clearRect(0,0,W,H);
x.fillStyle='rgba(201,150,47,.16)';x.fillRect(0,top,W,bot-top);x.strokeStyle='rgba(201,150,47,.55)';x.lineWidth=1;x.setLineDash([6,5]);x.beginPath();x.moveTo(0,top);x.lineTo(W,top);x.moveTo(0,bot);x.lineTo(W,bot);x.stroke();x.setLineDash([]);
var off=reduce?0:t*60;x.strokeStyle='rgba(210,61,54,.95)';x.lineWidth=3.2;x.lineJoin='round';x.beginPath();for(i=0;i<=W;i+=4){var y=val(i+off,t);if(i)x.lineTo(i,y);else x.moveTo(i,y)}x.stroke();
for(i=40;i<W;i+=70){var yy=val(i+off,t),inb=yy>=top&&yy<=bot;x.beginPath();x.arc(i,yy,4.2,0,6.283);x.fillStyle=inb?'rgba(201,150,47,.98)':'rgba(210,61,54,.98)';x.fill()}
var hx=W-30,hy=val(hx+off,t);x.beginPath();x.arc(hx,hy,9+2*Math.sin(t*4),0,6.283);x.strokeStyle='rgba(210,61,54,.5)';x.lineWidth=2;x.stroke();
if(run&&!reduce)requestAnimationFrame(frame)}
frame();
if('IntersectionObserver' in window){new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run&&!reduce){run=true;frame()}else if(!v){run=false}},{threshold:0}).observe(c)}
})();
