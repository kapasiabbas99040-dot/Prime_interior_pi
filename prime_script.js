       // =========================================================
// PRIME INTERIOR - Main JavaScript
// =========================================================

const WHATSAPP_NUMBER = '919898077252';
const INSTAGRAM_USERNAME = 'prime_interior_pi';

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    const button = document.getElementById('menuToggle');
    if (!nav) return;

    const isOpen = nav.classList.toggle('show');
    if (button) {
        button.classList.toggle('active', isOpen);
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }
}

function closeMenu() {
    const nav = document.getElementById('navLinks');
    const button = document.getElementById('menuToggle');
    if (nav) nav.classList.remove('show');
    if (button) {
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open navigation menu');
    }
}

// App-first WhatsApp opening, with official wa.me fallback.
// WhatsApp documents both whatsapp:// URL schemes and wa.me universal links.
function openWhatsApp(event, message = '') {
    if (event) event.preventDefault();

    const encoded = message ? `&text=${encodeURIComponent(message)}` : '';
    const appUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}${encoded}`;
    const webUrl = `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

    let hidden = false;
    const onVisibility = () => {
        if (document.hidden) hidden = true;
    };

    document.addEventListener('visibilitychange', onVisibility);

    window.location.href = appUrl;

    setTimeout(() => {
        document.removeEventListener('visibilitychange', onVisibility);
        if (!hidden && !document.hidden) window.location.href = webUrl;
    }, 900);
}

// App-first Instagram opening. On Android, use an intent; on iPhone,
// try Instagram's URL scheme. If the app cannot be opened, use the
// normal Instagram profile URL.
function openInstagram(event) {
    if (event) event.preventDefault();

    const username = INSTAGRAM_USERNAME;
    const webUrl = `https://www.instagram.com/${username}/`;

    let hidden = false;
    const onVisibility = () => {
        if (document.hidden) hidden = true;
    };

    document.addEventListener('visibilitychange', onVisibility);

    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) {
        window.location.href =
            `intent://instagram.com/_u/${username}#Intent;package=com.instagram.android;scheme=https;end`;
    } else if (isIOS) {
        window.location.href = `instagram://user?username=${username}`;
    } else {
        window.location.href = webUrl;
        return;
    }

    setTimeout(() => {
        document.removeEventListener('visibilitychange', onVisibility);
        if (!hidden && !document.hidden) window.location.href = webUrl;
    }, 1000);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openInquiryForm() {
    const modal = document.getElementById('inquiryModal');
    if (!modal) return;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    const form = document.getElementById('customerInquiryForm');
    const success = document.getElementById('successMessage');

    if (form) form.style.display = 'block';
    if (success) success.classList.remove('show');
}

function closeInquiryForm() {
    const modal = document.getElementById('inquiryModal');
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Gallery popup helpers
function openImg(src) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    if (popup && popupImg) {
        popup.style.display = 'flex';
        popupImg.src = src;
    }
}

function closeImg() {
    const popup = document.getElementById('popup');
    if (popup) popup.style.display = 'none';
}

function toggleDark() {
    document.body.classList.toggle('dark');
}

document.addEventListener('DOMContentLoaded', function () {
    const inquiryForm = document.getElementById('customerInquiryForm');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('custName')?.value.trim() || '';
            const email = document.getElementById('custEmail')?.value.trim() || '';
            const mobile = document.getElementById('custMobile')?.value.trim() || '';

            if (!name || !email || !mobile) {
                alert('Please fill all required fields (Name, Email, Mobile)');
                return;
            }

            const interests = [];
            document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked')
                .forEach(checkbox => interests.push(checkbox.value));

            const city = document.getElementById('custCity')?.value || '';
            const propertyType = document.getElementById('custPropertyType')?.value || '';
            const requirements = document.getElementById('custRequirements')?.value || '';
            const date = new Date().toLocaleString();

            let message = `🏠 *New Inquiry - Prime Interior*\n\n`;
            message += `👤 *Name:* ${name}\n`;
            message += `📧 *Email:* ${email}\n`;
            message += `📱 *Mobile:* ${mobile}\n`;
            if (city) message += `🏙️ *City:* ${city}\n`;
            if (propertyType) message += `🏡 *Property Type:* ${propertyType}\n`;
            message += `✨ *Interested In:* ${interests.length ? interests.join(', ') : 'Not specified'}\n`;
            if (requirements) message += `📝 *Requirements:* ${requirements}\n`;
            message += `📅 *Date:* ${date}`;

            openWhatsApp(null, message);

            inquiryForm.style.display = 'none';
            document.getElementById('successMessage')?.classList.add('show');
        });
    }

    window.addEventListener('click', function (event) {
        const modal = document.getElementById('inquiryModal');
        if (event.target === modal) closeInquiryForm();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
            closeInquiryForm();
            closeImg();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeMenu();
    });
});


// =========================================================
// PREMIUM NO-BACKEND FEATURES
// =========================================================
(function(){
  const safeStorage = {
    get(key, fallback=null){ try { const v=localStorage.getItem(key); return v===null?fallback:v; } catch(e){ return fallback; } },
    set(key,value){ try { localStorage.setItem(key,value); } catch(e){} }
  };

  window.toggleTheme = function(){
    const dark = document.body.classList.toggle('dark');
    safeStorage.set('primeTheme', dark ? 'dark' : 'light');
    const btn = document.querySelector('.theme-toggle');
    if(btn) btn.textContent = dark ? '☀' : '☾';
  };

  window.shareWebsite = async function(){
    const data = {title:'Prime Interior', text:'Check out Prime Interior - premium interior design solutions.', url:window.location.href};
    if(navigator.share){
      try{ await navigator.share(data); }catch(e){}
      return;
    }
    try{
      await navigator.clipboard.writeText(window.location.href);
      alert('Website link copied!');
    }catch(e){ alert('Copy the website link from your browser address bar.'); }
  };

  window.openDirections = function(){
    const query = encodeURIComponent('Lokhand Bazar, Top Nu Naku, Opp Navkar Steel, Bhavnagar, Gujarat 364001');
    window.open('https://www.google.com/maps/search/?api=1&query='+query, '_blank', 'noopener');
  };

  window.saveContact = function(){
    const vcard = [
      'BEGIN:VCARD','VERSION:3.0','FN:Prime Interior','ORG:Prime Interior',
      'TEL;TYPE=WORK,VOICE:+919824621511','TEL;TYPE=CELL,VOICE:+919898077252',
      'EMAIL:primeinterior53@gmail.com',
      'ADR;TYPE=WORK:;;Lokhand Bazar, Top Nu Naku, Opp Navkar Steel;Bhavnagar;Gujarat;364001;India',
      'URL:https://instagram.com/prime_interior_pi','END:VCARD'
    ].join('\n');
    const blob = new Blob([vcard], {type:'text/vcard;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='Prime-Interior.vcf'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };

  window.filterGallery = function(filter, button){
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    if(button) button.classList.add('active');
    document.querySelectorAll('.gallery-card').forEach(card=>{
      card.classList.toggle('hidden', filter!=='all' && card.dataset.category!==filter);
    });
  };

  window.openDesignCard = function(card){
    const visual = card.querySelector('.visual');
    const title = card.querySelector('h3')?.textContent || 'Design Inspiration';
    const text = card.querySelector('p')?.textContent || 'Explore this design direction with Prime Interior.';
    const popup = document.getElementById('designPopup');
    const pv = document.getElementById('designPopupVisual');
    if(!popup || !pv) return;
    pv.className = 'design-popup-visual ' + (visual?.className || '').replace('visual ','');
    document.getElementById('designPopupTitle').textContent = title;
    document.getElementById('designPopupText').textContent = text + ' Contact us to customize this concept for your space.';
    popup.classList.add('show'); popup.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  };
  window.closeDesignCard = function(){
    const popup=document.getElementById('designPopup'); if(popup){popup.classList.remove('show');popup.setAttribute('aria-hidden','true');} document.body.style.overflow='';
  };

  document.addEventListener('DOMContentLoaded', function(){
    const saved = safeStorage.get('primeTheme','light');
    if(saved==='dark') document.body.classList.add('dark');
    const themeBtn=document.querySelector('.theme-toggle'); if(themeBtn) themeBtn.textContent=saved==='dark'?'☀':'☾';
    const year=document.getElementById('currentYear'); if(year) year.textContent=new Date().getFullYear();

    // Reveal-on-scroll.
    const revealSelectors='.why-card,.process-card,.gallery-card,.number-card,.testimonial-card,details,.contact-cta-card';
    const elements=document.querySelectorAll(revealSelectors);
    elements.forEach(el=>el.classList.add('reveal-ready'));
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');io.unobserve(entry.target)}}),{threshold:.12});
      elements.forEach(el=>io.observe(el));
    }else elements.forEach(el=>el.classList.add('revealed'));

    // Animated counters.
    const counters=document.querySelectorAll('.counter');
    if('IntersectionObserver' in window && counters.length){
      const cio=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const el=entry.target, target=Number(el.dataset.target)||0; let start=0; const duration=900; const t0=performance.now();
        function tick(now){ const p=Math.min((now-t0)/duration,1); el.textContent=Math.floor((1-Math.pow(1-p,3))*target); if(p<1) requestAnimationFrame(tick); }
        requestAnimationFrame(tick); cio.unobserve(el);
      }),{threshold:.6});
      counters.forEach(c=>cio.observe(c));
    }

    document.getElementById('designPopup')?.addEventListener('click',e=>{if(e.target.id==='designPopup') closeDesignCard();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeDesignCard();});
  });
})();
