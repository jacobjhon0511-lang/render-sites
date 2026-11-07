(function(){
  "use strict";
  var d=document;
  /* mobile menu */
  var bt=d.querySelector(".bzx-lilehe"),dr=d.getElementById("bzx-xepe");
  if(bt&&dr){
    bt.addEventListener("click",function(){var o=dr.classList.toggle("is-open");bt.setAttribute("aria-expanded",o?"true":"false");});
    dr.addEventListener("click",function(e){if(e.target.tagName==="A"){dr.classList.remove("is-open");bt.setAttribute("aria-expanded","false");}});
  }
  /* tabs */
  d.querySelectorAll("[data-bzx-zefuri]").forEach(function(g){
    var tabs=g.querySelectorAll(".bzx-suko");
    tabs.forEach(function(t){t.addEventListener("click",function(){
      tabs.forEach(function(x){x.setAttribute("aria-selected","false");var p=d.getElementById(x.getAttribute("aria-controls"));if(p)p.hidden=true;});
      t.setAttribute("aria-selected","true");var p=d.getElementById(t.getAttribute("aria-controls"));if(p)p.hidden=false;
    });});
  });
  /* reveal */
  var items=[].slice.call(d.querySelectorAll(".bzx-xanuxi,.bzx-hileme"));
  function show(el){el.classList.add("is-in");}
  function sweep(){var h=window.innerHeight||800;items.forEach(function(el){if(!el.classList.contains("is-in")&&el.getBoundingClientRect().top<h*0.92)show(el);});}
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target);}});},{rootMargin:"200px 0px -5% 0px",threshold:0});
    items.forEach(function(el){io.observe(el);});
  }else{items.forEach(show);}
  window.addEventListener("scroll",sweep,{passive:true});
  window.addEventListener("load",sweep);
  [400,1200,2500].forEach(function(t){setTimeout(sweep,t);});
  setTimeout(function(){items.forEach(show);},3500);
  /* sticky dock hides at footer */
  var dock=d.querySelector(".bzx-duwono"),ft=d.querySelector(".bzx-puwela");
  if(dock&&ft&&"IntersectionObserver" in window){
    new IntersectionObserver(function(es){es.forEach(function(e){dock.classList.toggle("is-off",e.isIntersecting);});}).observe(ft);
  }
  /* particle network inside hero */
  var cv=d.querySelector(".bzx-hohodu");
  if(cv&&cv.getContext&&!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)){
    var ctx=cv.getContext("2d"),host=cv.parentElement,pts=[],W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2);
    function size(){W=host.clientWidth;H=host.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.round(Math.min(70,Math.max(24,W*H/18000)));pts=[];
      for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35});}
    function draw(){ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
        ctx.fillStyle="rgba(10,31,38,.55)";ctx.beginPath();ctx.arc(p.x,p.y,2.2,0,6.283);ctx.fill();
        for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,dist=dx*dx+dy*dy;
          if(dist<16000){ctx.strokeStyle="rgba(10,31,38,"+(0.22*(1-dist/16000))+")";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}}
      requestAnimationFrame(draw);}
    size();window.addEventListener("resize",size);requestAnimationFrame(draw);
  }
})();
