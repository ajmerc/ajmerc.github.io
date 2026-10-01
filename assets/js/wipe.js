/*
  Wipe transition between the landing page and the two sides of the site.

  Links opt in with data-wipe="research" | "illustration" | "home".
  They are ordinary links: if this script fails or is blocked, they still work.

  - On the landing page, the chosen half grows out of the seam (wherever
    hover has pushed it) and pushes it across the screen (sideways on wide screens,
    up/down on phones, where the halves are stacked).
  - From an inner page, Research wipes in from the left, Illustration
    from the right.
  - "home" slides the *other* half back in to the middle, so the landing
    page's split screen reassembles itself before it loads.
  - With prefers-reduced-motion, the wipe becomes a quick fade.
*/
(function () {
  if (!('animate' in Element.prototype)) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var splitLayout = window.matchMedia('(min-width: 48rem)'); // keep in sync with site.css
  var DURATION = 700;

  // Returns the panel's theme, which axis it moves on, and its start/end offset.
  function plan(target) {
    var split = splitLayout.matches;
    var side = document.body.getAttribute('data-side'); // null on the landing page

    if (target === 'research' || target === 'illustration') {
      var sign = target === 'research' ? -1 : 1;
      if (side) return { theme: target, axis: 'X', from: sign * 100 + '%', to: '0%' };
      // Start at the seam (which hover may have pushed off-center). Research starts just
      // left of the torn edge so it pushes it across.
      if (split) {
        var main = document.querySelector('.landing main');
        var shift = main ? parseFloat(getComputedStyle(main).getPropertyValue('--shift')) || 0 : 0;
        var seam = 50 + shift / window.innerWidth * 100;
        return target === 'research'
          ? { theme: target, axis: 'X', from: 'calc(' + (seam - 100) + '% - 16px)', to: '0%' }
          : { theme: target, axis: 'X', from: seam + '%', to: '0%' };
      }
      // Stacked halves: start at the horizontal seam between them.
      var ill = document.querySelector('.half--illustration');
      var seam = ill ? ill.getBoundingClientRect().top / window.innerHeight * 100 : 50;
      seam = Math.min(100, Math.max(0, seam));
      return target === 'research'
        ? { theme: target, axis: 'Y', from: (seam - 100) + '%', to: '0%' }
        : { theme: target, axis: 'Y', from: seam + '%', to: '0%' };
    }

    // Home: the other half returns to the middle.
    var axis = split ? 'X' : 'Y';
    return side === 'research'
      ? { theme: 'illustration', axis: axis, from: '100%', to: '50%' }
      : { theme: 'research', axis: axis, from: '-100%', to: axis === 'X' ? 'calc(-50% - 16px)' : '-50%' };
  }

  function wipeTo(link) {
    var p = plan(link.getAttribute('data-wipe'));
    var href = link.href;
    var done = false;
    function navigate() {
      if (done) return;
      done = true;
      window.location.href = href;
    }

    var layer = document.createElement('div');
    layer.className = 'wipe';
    layer.setAttribute('aria-hidden', 'true');
    var panel = document.createElement('div');
    panel.className = 'wipe__panel wipe__panel--' + p.theme + (p.axis === 'Y' ? ' wipe__panel--y' : '');
    layer.appendChild(panel);
    document.body.appendChild(layer);

    var move = 'translate' + p.axis + '(';
    var anim;
    if (reduceMotion.matches) {
      panel.style.transform = move + p.to + ')';
      anim = layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, fill: 'forwards' });
    } else {
      anim = panel.animate(
        [{ transform: move + p.from + ')' }, { transform: move + p.to + ')' }],
        { duration: DURATION, easing: 'cubic-bezier(.77, 0, .18, 1)', fill: 'forwards' }
      );
    }
    anim.finished.then(navigate, navigate);
    setTimeout(navigate, DURATION + 300); // safety net
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[data-wipe]');
    if (!link || e.defaultPrevented) return;
    // Leave new-tab / modified clicks alone.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') return;
    e.preventDefault();
    wipeTo(link);
  });

  // Coming back via the Back button can restore the page with the wipe still covering it.
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    document.querySelectorAll('.wipe').forEach(function (el) { el.remove(); });
  });
})();
