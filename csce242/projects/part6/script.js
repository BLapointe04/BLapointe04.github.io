/* Burger Tavern – global JS (keeps your current style/markup)
   Step 1: Centralize JavaScript here. JSON rendering will be added next.

   What this does now:
   - Handles mobile nav open/close (removes inline onclick to avoid double toggles)
   - Closes nav when a link is clicked or when pressing Escape
   - Safe to include on every page (Home, Menu, About, Contact & Reviews, Order, Part 6 pages)
*/

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const navBtn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('header nav') || document.querySelector('nav');
  
    // Remove inline onclick="document.body.classList.toggle('nav-open')" if present,
    // so we don't toggle twice when the button is clicked.
    if (navBtn && navBtn.hasAttribute('onclick')) {
      navBtn.removeAttribute('onclick');
    }
  
    // Toggle nav open/close
    if (navBtn) {
      navBtn.addEventListener('click', () => {
        body.classList.toggle('nav-open');
      });
    }
  
    // Close nav when a link is clicked (mobile UX nicety)
    if (nav) {
      nav.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.tagName === 'A') {
          body.classList.remove('nav-open');
        }
      });
    }
  
    // Close nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') body.classList.remove('nav-open');
    });
  
    // 🔜 JSON hooks (no-ops for now). We’ll implement these next.
    if (document.getElementById('gallery')) {
      // renderGallery(); // to be added in the JSON step
    }
    if (document.getElementById('item')) {
      // renderItemDetail(); // to be added in the JSON step
    }
  });
  