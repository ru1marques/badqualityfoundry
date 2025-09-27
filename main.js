// JS mínimo: deixa as etiquetas em maiúsculas e garante um fallback de smooth scroll em browsers antigos
(function(){
  document.querySelectorAll('.brand, .footer-meta div').forEach(function(el){
    el.textContent = el.textContent.toUpperCase();
  });

  // Smooth scroll fallback para browsers que ignoram scroll-behavior
  var supportsSmooth = 'scrollBehavior' in document.documentElement.style;
  if(!supportsSmooth){
    document.querySelectorAll('a[href^="#"]').forEach(function(link){
      link.addEventListener('click', function(e){
        var id = this.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if(target){
          e.preventDefault();
          var start = window.pageYOffset;
          var end = target.getBoundingClientRect().top + window.pageYOffset;
          var startTime = null;
          var duration = 500;
          function easeInOutQuad(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t; }
          function anim(ts){
            if(!startTime) startTime = ts;
            var p = Math.min((ts - startTime)/duration, 1);
            var y = start + (end - start) * easeInOutQuad(p);
            window.scrollTo(0, y);
            if(p < 1) requestAnimationFrame(anim);
          }
          requestAnimationFrame(anim);
        }
      });
    });
  }
})();