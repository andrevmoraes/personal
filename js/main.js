// main.js — persistence and progress for Zune Treinos
const STORAGE_PREFIX = 'zune:';

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle fallback for browsers that don't support :has()
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    // apply saved theme
    const saved = localStorage.getItem(STORAGE_PREFIX + 'theme');
    if (saved === 'light') {
      document.body.classList.add('light');
      themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('light', themeToggle.checked);
      localStorage.setItem(STORAGE_PREFIX + 'theme', themeToggle.checked ? 'light' : 'dark');
    });
  }

  // For each form (exercise), restore checks and wire events
  const forms = document.querySelectorAll('form.exercicio');
  forms.forEach((form, idx) => {
    const formKey = STORAGE_PREFIX + (form.getAttribute('aria-label') || ('exercise:' + idx));
    const checkboxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));
    const totalEl = form.querySelector('.total');
    const pill = form.querySelector('.pill');

    // restore state
    checkboxes.forEach(cb => {
      const key = formKey + ':' + cb.id;
      try {
        const val = localStorage.getItem(key);
        if (val === '1') cb.checked = true;
      } catch (e) {
        // ignore storage errors
      }

      cb.addEventListener('change', () => {
        try {
          localStorage.setItem(key, cb.checked ? '1' : '0');
        } catch (e) {}
        updateProgress();
      });
    });

    // set totals
    if (totalEl) totalEl.textContent = String(checkboxes.length);

    // update progress UI
    function updateProgress() {
      const done = checkboxes.filter(c => c.checked).length;
      if (pill) pill.textContent = String(done);
    }
    updateProgress();

    // reset handling: clear storage for this form
    form.addEventListener('reset', (ev) => {
      // allow native reset then clear storage and update
      setTimeout(() => {
        checkboxes.forEach(cb => {
          const key = formKey + ':' + cb.id;
          try { localStorage.removeItem(key); } catch(e){}
        });
        updateProgress();
      }, 0);
    });
  });

  // Accessibility: allow keyboard checking via Enter/Space on labels
  document.querySelectorAll('.set-label').forEach(lbl => {
    lbl.setAttribute('tabindex', '0');
    lbl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lbl.click();
      }
    });
  });
});
