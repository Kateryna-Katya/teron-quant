document.addEventListener('DOMContentLoaded', () => {
  // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. МОБИЛЬНОЕ МЕНЮ
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (burger && nav) {
      burger.addEventListener('click', () => {
          burger.classList.toggle('burger--active');
          nav.classList.toggle('nav--active');
          document.body.classList.toggle('no-scroll'); // Чтобы не скроллился фон
      });

      // Закрытие при клике на ссылку
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              burger.classList.remove('burger--active');
              nav.classList.remove('nav--active');
              document.body.classList.remove('no-scroll');
          });
      });
  }

  // 3. СКРОЛЛ ХЕДЕРА
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  });

  // 4. ПЛАВНАЯ ПРОКРУТКА
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  // 5. АНИМАЦИЯ ПОЯВЛЕНИЯ (Intersection Observer)
  const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('is-visible');
              }
          });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  };
  observeElements();

  // 6. ROADMAP: ПРОГРЕСС-ЛИНИЯ
  const animateRoadmapLine = () => {
      const roadmap = document.querySelector('.roadmap');
      const fill = document.querySelector('.roadmap__fill');
      if (!roadmap || !fill) return;

      window.addEventListener('scroll', () => {
          const rect = roadmap.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          let progress = (windowHeight / 2 - rect.top) / rect.height;
          progress = Math.max(0, Math.min(1, progress));
          fill.style.height = `${progress * 100}%`;
      });
  };
  animateRoadmapLine();

  // 7. ИННОВАЦИИ: ПЕРЕКЛЮЧЕНИЕ ТАБОВ
  const nodes = document.querySelectorAll('.core-node');
  const contentItems = document.querySelectorAll('.innovation-item');

  if (nodes.length > 0) {
      nodes.forEach(node => {
          node.addEventListener('click', () => {
              nodes.forEach(n => n.classList.remove('active'));
              contentItems.forEach(item => item.classList.remove('active'));

              node.classList.add('active');
              const target = document.getElementById(node.dataset.target);
              if (target) target.classList.add('active');
          });
      });
  }

  // 8. ФОРМА КОНТАКТОВ + КАПЧА
  const handleForm = () => {
      const form = document.getElementById('main-contact-form');
      const captchaQ = document.getElementById('captcha-question');
      const captchaInput = document.getElementById('captcha-answer');
      const successMsg = document.getElementById('form-success');

      if (!form) return;

      // Генерация капчи
      let n1 = Math.floor(Math.random() * 10) + 1;
      let n2 = Math.floor(Math.random() * 10) + 1;
      let correct = n1 + n2;
      if (captchaQ) captchaQ.textContent = `${n1} + ${n2} = ?`;

      form.addEventListener('submit', (e) => {
          e.preventDefault();

          if (parseInt(captchaInput.value) !== correct) {
              alert('Ошибка в капче!');
              return;
          }

          const btn = form.querySelector('button');
          btn.disabled = true;
          btn.textContent = 'Отправка...';

          // Имитация AJAX
          setTimeout(() => {
              form.reset();
              btn.disabled = false;
              btn.textContent = 'Отправить запрос';
              successMsg.style.display = 'flex';

              // Обновление капчи
              n1 = Math.floor(Math.random() * 10) + 1;
              n2 = Math.floor(Math.random() * 10) + 1;
              correct = n1 + n2;
              captchaQ.textContent = `${n1} + ${n2} = ?`;

              setTimeout(() => successMsg.style.display = 'none', 5000);
          }, 1500);
      });
  };
  handleForm();

  // 9. COOKIE POPUP
  const handleCookies = () => {
      const popup = document.getElementById('cookie-popup');
      const acceptBtn = document.getElementById('accept-cookies');
      if (!popup || localStorage.getItem('cookie_consent_accepted')) return;

      setTimeout(() => popup.classList.add('cookie-popup--active'), 2500);

      acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookie_consent_accepted', 'true');
          popup.classList.remove('cookie-popup--active');
      });
  };
  handleCookies();
});