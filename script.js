const toggleButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggleButton && nav) {
  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('form[data-message]').forEach((form) => {
  form.addEventListener('submit', (event) => {
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
