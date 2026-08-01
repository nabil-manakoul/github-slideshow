// ISTA Tafraout — interactions
(function(){
  // Mobile menu
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      menu.classList.toggle('open');
    });
    menu.addEventListener('click', function(e){
      if(e.target.tagName === 'A') menu.classList.remove('open');
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:0.12});
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add('in'); });
  }

  // Animated counters
  function animate(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start)/dur, 1);
      var val = Math.floor(p * target);
      el.textContent = val.toLocaleString('ar-MA') + suffix;
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('ar-MA') + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ animate(en.target); co.unobserve(en.target); }
      });
    }, {threshold:0.5});
    counters.forEach(function(el){ co.observe(el); });
  } else {
    counters.forEach(animate);
  }

  // Footer year
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
