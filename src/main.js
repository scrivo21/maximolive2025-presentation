import './style.css';
import slides from './slides.js';

const app = document.querySelector('#app');
let index = 0;

const pulseIntervalMs = 20000;
let pulseTimer = null;

const ensurePulseElement = () => {
  let pulse = document.querySelector('.bg-pulse');
  if (!pulse) {
    pulse = document.createElement('div');
    pulse.className = 'bg-pulse';
    document.body.appendChild(pulse);
  }
  return pulse;
};

const triggerBackgroundPulse = () => {
  const pulse = ensurePulseElement();
  const x = Math.round(Math.random() * 60) + 20;
  const y = Math.round(Math.random() * 60) + 20;
  const rotation = Math.round(Math.random() * 360);

  pulse.style.setProperty('--pulse-x', `${x}%`);
  pulse.style.setProperty('--pulse-y', `${y}%`);
  pulse.style.setProperty('--pulse-rotation', `${rotation}deg`);
  pulse.classList.remove('is-active');

  // Force reflow so the animation retriggers
  void pulse.offsetWidth;

  pulse.classList.add('is-active');
};

const scheduleBackgroundPulse = () => {
  if (pulseTimer) {
    clearInterval(pulseTimer);
  }

  pulseTimer = setInterval(triggerBackgroundPulse, pulseIntervalMs);
  triggerBackgroundPulse();
};

const measureTimeline = (timelineList, activeSectionIndex) => {
  if (!timelineList.isConnected) {
    return;
  }

  const dots = timelineList.querySelectorAll('.timeline__dot');
  if (!dots.length || activeSectionIndex < 0 || activeSectionIndex >= dots.length) {
    return;
  }

  const listRect = timelineList.getBoundingClientRect();
  const firstDotRect = dots[0].getBoundingClientRect();
  const lastDotRect = dots[dots.length - 1].getBoundingClientRect();
  const activeDotRect = dots[activeSectionIndex].getBoundingClientRect();

  const firstCenter = firstDotRect.left + firstDotRect.width / 2;
  const lastCenter = lastDotRect.left + lastDotRect.width / 2;
  const activeCenter = activeDotRect.left + activeDotRect.width / 2;

  const startOffset = Math.max(0, firstCenter - listRect.left);
  const endOffset = Math.max(0, listRect.right - lastCenter);
  const activeWidth = Math.max(0, activeCenter - firstCenter);
  const lastDotRightEdge = lastDotRect.right;

  const toPixels = (value) => `${Math.max(0, value).toFixed(2)}px`;

  timelineList.style.setProperty('--timeline-start-offset', toPixels(startOffset));
  timelineList.style.setProperty('--timeline-end-offset', toPixels(endOffset));
  timelineList.style.setProperty('--timeline-active-width', toPixels(activeWidth));

  const slideEl = timelineList.closest('.slide');
  if (slideEl) {
    const slideRect = slideEl.getBoundingClientRect();
    const rightEdgeOffset = Math.max(0, slideRect.right - lastDotRightEdge);
    slideEl.style.setProperty('--timeline-right-edge-offset', toPixels(rightEdgeOffset));
  }
};

const sections = slides.reduce((acc, slide) => {
  if (!acc.includes(slide.section)) {
    acc.push(slide.section);
  }
  return acc;
}, []);

const syncHash = () => {
  const targetHash = `#${index + 1}`;
  if (window.location.hash !== targetHash) {
    window.history.replaceState(null, '', targetHash);
  }
};

const renderSlide = () => {
  const slide = slides[index];
  const progress = ((index + 1) / slides.length) * 100;
  const sectionIndex = Math.max(sections.indexOf(slide.section), 0);
  const classes = ['slide'];

  if (slide.hero) {
    classes.push('slide--hero');
  }

  if (!slide.hero) {
    classes.push('slide--with-media');
  }

  const timeline = slide.hero
    ? ''
    : `
      <nav class="timeline" role="navigation" aria-label="Presentation sections">
        <ol class="timeline__list">
          ${sections
            .map((section, idx) => {
              const state = idx === sectionIndex ? 'is-active' : idx < sectionIndex ? 'is-complete' : '';
              const currentLabel = idx === sectionIndex ? ' aria-current="step"' : '';
              return `
                <li class="timeline__item ${state}"${currentLabel}>
                  <span class="timeline__dot" aria-hidden="true"></span>
                  <span class="timeline__label">${section}</span>
                </li>
              `;
            })
            .join('')}
        </ol>
      </nav>
    `;

  const header = slide.hero
    ? `
      <header class="slide__header slide__header--hero">
        <div class="slide__meta">${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</div>
      </header>
    `
    : `
      <header class="slide__header">
        <div class="slide__title">${slide.title}</div>
        <div class="slide__meta">${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</div>
      </header>
    `;

  const bodyClasses = ['slide__body'];
  if (!slide.hero) {
    bodyClasses.push('slide__body--split');
  }

  const subtitleMarkup = slide.subtitle ? `<p class="slide__subtitle">${slide.subtitle}</p>` : '';

  const ctaMarkup = slide.cta
    ? `
      <div class="cta-content">
        <div class="cta-qr">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=36b5c7&bgcolor=ffffff&data=https://www.sas-am.com/services/ai-ml-for-smarter-asset-management?utm_source=MaximoLive2025%26utm_medium=presentation%26utm_campaign=EdgeAI" alt="QR Code to SAS-AM AI/ML Services" class="qr-code" />
          <p class="qr-label">Scan to learn more about our AI/ML services</p>
        </div>
        <div class="search-pill">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="search-icon">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <span class="search-text">Edge AI Asset Management SAS-AM</span>
        </div>
        <div class="cta-contact">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" class="email-icon">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <span class="email-address">EdgeAI@SAS-AM.com</span>
        </div>
      </div>
    `
    : '';

  const imageMarkup = slide.image
    ? `
        <figure class="slide__media">
          <img src="${slide.image}" alt="${slide.imageAlt ?? ''}" loading="lazy" />
        </figure>
      `
    : slide.hero
        ? ''
        : `
        <figure class="slide__media slide__media--fallback">
          <div class="slide__media-card">
            <span class="slide__media-label">Concept Visual</span>
            <p>${slide.visual ?? 'Visual to be provided.'}</p>
          </div>
        </figure>
      `;

  app.innerHTML = `
    <div class="${classes.join(' ')}" role="presentation" aria-live="polite">
      <div class="progress" style="--progress:${progress}%"></div>
      ${timeline}
      ${header}
      <main class="${bodyClasses.join(' ')}">
        <div class="slide__content">
          <h1>${slide.line}</h1>
          ${subtitleMarkup}
          ${ctaMarkup}
        </div>
        ${imageMarkup}
      </main>
      <footer class="slide__footer">
        <span>${slide.notes ?? ''}</span>
      </footer>
    </div>
  `;

  scheduleTimelineMeasurement();

  syncHash();
};

const next = () => {
  if (index < slides.length - 1) {
    index += 1;
    renderSlide();
  }
};

const prev = () => {
  if (index > 0) {
    index -= 1;
    renderSlide();
  }
};

const handlers = {
  ArrowRight: next,
  ArrowDown: next,
  ' ': next,
  Enter: next,
  ArrowLeft: prev,
  ArrowUp: prev,
  Backspace: prev,
};

window.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
    return;
  }

  const handler = handlers[event.key];
  if (handler) {
    event.preventDefault();
    handler();
  }
});

document.body.addEventListener('click', (event) => {
  if (event.target.closest('button, a')) {
    return;
  }

  next();
});

window.addEventListener('hashchange', () => {
  const position = Number(window.location.hash.replace('#', ''));
  if (!Number.isNaN(position) && position >= 1 && position <= slides.length) {
    index = position - 1;
    renderSlide();
  }
});

const scheduleTimelineMeasurement = () => {
  const timelineList = document.querySelector('.timeline__list');
  if (!timelineList) {
    return;
  }

  requestAnimationFrame(() => {
    const activeSectionIndex = Math.max(sections.indexOf(slides[index].section), 0);
    measureTimeline(timelineList, activeSectionIndex);
  });
};

window.addEventListener('resize', scheduleTimelineMeasurement);

if (document.fonts && 'ready' in document.fonts) {
  document.fonts
    .ready
    .then(scheduleTimelineMeasurement)
    .catch(() => {});
}

const initialIndex = Number(window.location.hash.replace('#', ''));
if (!Number.isNaN(initialIndex) && initialIndex >= 1 && initialIndex <= slides.length) {
  index = initialIndex - 1;
}

renderSlide();
scheduleBackgroundPulse();
