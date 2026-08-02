// JS mínimo: deixa as etiquetas em maiúsculas e garante um fallback de smooth scroll em browsers antigos
(function(){
  document.querySelectorAll('.brand, .footer-meta div').forEach(function(el){
    el.textContent = el.textContent.toUpperCase();
  });

  function renderFamilyBlock(config, target){
    if(!config || !target) return null;

    var block = document.createElement('div');
    block.className = 'block hover-see';

    if (config.className) {
      block.className += ' ' + config.className;
    }

    var hr = document.createElement('hr');
    block.appendChild(hr);

    var header = document.createElement('header');
    header.className = 'block-header';

    var left = document.createElement('div');
    var family = document.createElement('p');
    family.className = 'family';
    family.textContent = config.family || '';
    left.appendChild(family);
    header.appendChild(left);

    if (config.action) {
      var actionWrap = document.createElement('div');
      if (config.action.href) {
        var action = document.createElement('a');
        action.href = config.action.href;
        action.className = config.action.className || 'request-btn';
        action.textContent = config.action.label || '';
        if (config.action.target) action.target = config.action.target;
        if (config.action.rel) action.rel = config.action.rel;
        actionWrap.appendChild(action);
      } else {
        var button = document.createElement('button');
        button.className = config.action.className || 'progress-btn';
        button.textContent = config.action.label || '';
        actionWrap.appendChild(button);
      }
      header.appendChild(actionWrap);
    }

    block.appendChild(header);

    var specimen = document.createElement('div');
    specimen.className = 'block-specimen';

    var link = document.createElement('a');
    link.href = config.linkHref || '#';
    link.className = config.linkClass || '';

    var title = document.createElement('h2');
    title.className = config.titleClass || 'maria specimen-text';
    title.textContent = config.title || '';
    title.setAttribute('data-original', config.dataOriginal || (config.title || ''));
    if (config.dataCursor) title.setAttribute('data-cursor', config.dataCursor);

    link.appendChild(title);
    specimen.appendChild(link);
    block.appendChild(specimen);

    var style = document.createElement('p');
    style.className = 'style';
    style.textContent = config.styleText || '';
    block.appendChild(style);

    if (target) {
      target.appendChild(block);
    }

    return block;
  }

  window.renderFamilyBlock = renderFamilyBlock;

  var mariaTarget = document.getElementById('maria-block-target');
  if (mariaTarget) {
    renderFamilyBlock({
      family: 'Maria',
      title: 'MARIA',
      titleClass: 'maria specimen-text',
      dataOriginal: 'MARIA',
      dataCursor: 'TRY :/ ',
      linkHref: 'maria.htm',
      styleText: 'Variable — 2 Styles',
      action: {
        href: 'https://ruimarques.gumroad.com/l/maria',
        label: 'Download trial',
        className: 'request-btn',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }, mariaTarget);
  }

  var mariaTopTarget = document.getElementById('maria-top-block');
  if (mariaTopTarget) {
    renderFamilyBlock({
      family: 'Maria',
      title: 'MARIA',
      titleClass: 'maria specimen-text',
      dataOriginal: 'MARIA',
      dataCursor: 'TRY :/ ',
      linkHref: 'maria.htm',
      styleText: 'Variable — 2 Styles',
      action: {
        href: 'https://ruimarques.gumroad.com/l/maria',
        label: 'Download trial',
        className: 'request-btn',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }, mariaTopTarget);
  }

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

  // Liquid glass: move os highlights conforme o rato / toque
(function(){
  var el = document.querySelector('.softbar .inner');
  if(!el) return;

  var prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduce) return;

  function move(e){
    var rect = el.getBoundingClientRect();
    var x = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) / rect.width * 100;
    var y = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top) / rect.height * 100;
    // limita faixa para não sair “estourando”
    x = Math.max(10, Math.min(90, x));
    y = Math.max(10, Math.min(90, y));
    el.style.setProperty('--x', x + '%');
    el.style.setProperty('--y', y + '%');
  }
  el.addEventListener('mousemove', move, {passive:true});
  el.addEventListener('touchmove', move, {passive:true});
})();


})();

