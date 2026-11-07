document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('ndBurger');
  var nav = document.getElementById('ndNav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('nd-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('nd-open'); });
    });
  }

  document.querySelectorAll('.nd-faq-item').forEach(function (item) {
    var q = item.querySelector('.nd-faq-q');
    var a = item.querySelector('.nd-faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.nd-faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.nd-faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
});
