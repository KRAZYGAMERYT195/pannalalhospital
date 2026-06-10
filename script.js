const toggleButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggleButton && nav) {
  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('form[data-message]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    if (form.hasAttribute('data-netlify')) {
      return;
    }

    event.preventDefault();
    const message = form.getAttribute('data-message') || 'Submitted successfully.';
    alert(message);
    form.reset();
  });
});

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const counter = entry.target;
      const target = Number(counter.getAttribute('data-target') || 0);
      const duration = 1400;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = value.toLocaleString('en-IN');

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      observer.unobserve(counter);
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const faqs = document.querySelectorAll('.faq-item');
faqs.forEach((item) => {
  const question = item.querySelector('.faq-question');
  if (!question) {
    return;
  }

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqs.forEach((faq) => faq.classList.remove('open'));
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

const testimonials = [
  {
    text: '"The staff was incredibly kind and the doctors explained every step clearly."',
    author: '- Priya M.'
  },
  {
    text: '"Clean facilities, short waiting time, and very professional team."',
    author: '- Rajesh K.'
  },
  {
    text: '"We felt safe and cared for during our entire treatment journey."',
    author: '- Ananya P.'
  }
];

const testimonialText = document.getElementById('testimonialText');
const testimonialAuthor = document.getElementById('testimonialAuthor');
const testimonialButtons = document.querySelectorAll('.testimonial-btn');
let testimonialIndex = 0;

const renderTestimonial = () => {
  if (!testimonialText || !testimonialAuthor) {
    return;
  }

  testimonialText.textContent = testimonials[testimonialIndex].text;
  testimonialAuthor.textContent = testimonials[testimonialIndex].author;
};

testimonialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.getAttribute('data-direction');
    testimonialIndex = direction === 'prev'
      ? (testimonialIndex - 1 + testimonials.length) % testimonials.length
      : (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  });
});

renderTestimonial();

const heroImages = [
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80'
];

const heroImage = document.querySelector('.hero-photo-wrap img');
const photoSwapButton = document.querySelector('.photo-swap');
let heroIndex = 0;

if (photoSwapButton && heroImage) {
  photoSwapButton.addEventListener('click', () => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImage.src = heroImages[heroIndex];
  });
}

const chatbotAnswers = [
  {
    keywords: ['timing', 'time', 'open', 'hours', 'sunday', 'monday'],
    answer: 'Hospital timings are Monday to Saturday, 9:00 AM to 8:00 PM. On Sunday, we are open from 9:00 AM to 3:00 PM. Emergency support is available 24/7.'
  },
  {
    keywords: ['phone', 'call', 'number', 'contact', 'emergency'],
    answer: 'You can call Dr. Pannalal Hospital And Nursing Home at +91 7078789900. For emergencies, please call directly for the fastest help.'
  },
  {
    keywords: ['address', 'location', 'map', 'where', 'directions', 'landmark'],
    answer: 'We are located at Dr. Pannalal Hospital And Nursing Home, Ramghat Road, Shyam Nagar, Uttar Pradesh. Landmark: opposite Tikaram Girls College. You can open the map from the Contact page.'
  },
  {
    keywords: ['mri', '1.5t', '1.5 t', 'magnetic', 'usa'],
    answer: 'We offer Advanced 1.5T MRI. The machine is made in USA and uses a magnetic field about 30,000 times stronger than Earth\'s magnetic field for high-clarity imaging.'
  },
  {
    keywords: ['ct', 'xray', 'x-ray', 'ultrasound', 'usg', 'radiology', 'scan'],
    answer: 'Our diagnostic services include Advanced 1.5T MRI, CT, X-ray, Ultrasound/USG, radiology support, and quick reports to help doctors make timely decisions.'
  },
  {
    keywords: ['service', 'services', 'opd', 'medicine', 'doctor', 'nursing', 'drug', 'pharmacy', 'pathology'],
    answer: 'Services include MRI, CT, X-ray, Ultrasound/USG, experienced OPD, general medicine, radiology, advanced pathology, nursing home facility, drug shop on premises, and 24/7 emergency support.'
  },
  {
    keywords: ['appointment', 'book', 'visit', 'consultation'],
    answer: 'For appointment help, please call +91 7078789900 or send your details through the Contact page. The hospital team can guide you on doctor availability.'
  },
  {
    keywords: ['founder', 'about', 'history', '1986', 'gyan'],
    answer: 'Dr. Pannalal Hospital And Nursing Home has served patients since 1986. It was founded by Dr. Gyan Pannalal and built on trust, careful treatment, and patient-first care.'
  }
];

const createChatbot = () => {
  const widget = document.createElement('section');
  widget.className = 'chatbot-widget';
  widget.innerHTML = `
    <button class="chatbot-toggle" type="button" aria-label="Open hospital assistant" aria-expanded="false">
      <span>AI</span>
    </button>
    <div class="chatbot-panel" aria-live="polite">
      <div class="chatbot-head">
        <div>
          <strong>Hospital Assistant</strong>
          <span>Ask about timings, services, MRI, or location</span>
        </div>
        <button class="chatbot-close" type="button" aria-label="Close hospital assistant">x</button>
      </div>
      <div class="chatbot-messages">
        <div class="chat-message bot">Hello, I can help with hospital timings, services, contact details, and directions.</div>
      </div>
      <div class="chatbot-chips">
        <button type="button" data-question="What are the timings?">Timings</button>
        <button type="button" data-question="What services are available?">Services</button>
        <button type="button" data-question="Where is the hospital?">Location</button>
      </div>
      <form class="chatbot-form">
        <input type="text" aria-label="Ask hospital assistant" placeholder="Type your question..." autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    </div>
  `;

  document.body.appendChild(widget);

  const toggle = widget.querySelector('.chatbot-toggle');
  const close = widget.querySelector('.chatbot-close');
  const messages = widget.querySelector('.chatbot-messages');
  const form = widget.querySelector('.chatbot-form');
  const input = form.querySelector('input');
  const chips = widget.querySelectorAll('.chatbot-chips button');

  const setOpen = (isOpen) => {
    widget.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      input.focus();
    }
  };

  const addMessage = (text, type) => {
    const message = document.createElement('div');
    message.className = `chat-message ${type}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const getAnswer = (question) => {
    const normalized = question.toLowerCase();
    const match = chatbotAnswers.find((item) =>
      item.keywords.some((keyword) => normalized.includes(keyword))
    );

    return match
      ? match.answer
      : 'I can help with timings, services, MRI, CT, X-ray, ultrasound/USG, OPD, contact details, and location. For urgent medical help, please call +91 7078789900.';
  };

  const askQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }

    addMessage(trimmed, 'user');
    window.setTimeout(() => addMessage(getAnswer(trimmed), 'bot'), 250);
  };

  toggle.addEventListener('click', () => setOpen(!widget.classList.contains('open')));
  close.addEventListener('click', () => setOpen(false));
  chips.forEach((chip) => chip.addEventListener('click', () => askQuestion(chip.dataset.question || '')));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    askQuestion(input.value);
    input.value = '';
  });
};

if (document.body) {
  createChatbot();
}

const createCursorEffects = () => {
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let glowX = pointerX;
  let glowY = pointerY;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    document.documentElement.style.setProperty('--cursor-x', `${pointerX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${pointerY}px`);
  });

  const animateGlow = () => {
    glowX += (pointerX - glowX) * 0.16;
    glowY += (pointerY - glowY) * 0.16;
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  };

  animateGlow();

  document.querySelectorAll('.card, .btn, .hero-photo-wrap').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;

      element.style.setProperty('--tilt-x', `${y}deg`);
      element.style.setProperty('--tilt-y', `${x}deg`);
      element.classList.add('cursor-tilt');
    });

    element.addEventListener('pointerleave', () => {
      element.style.removeProperty('--tilt-x');
      element.style.removeProperty('--tilt-y');
      element.classList.remove('cursor-tilt');
    });
  });
};

createCursorEffects();
