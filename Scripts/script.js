(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document;
    const body = doc.body;

    function initThemeToggle() {
        const toggle = doc.querySelector('.theme-toggle');
        if (!toggle) return;

        const icon = toggle.querySelector('i');
        const stored = localStorage.getItem('theme');
        const initial = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';

        applyTheme(initial);

        toggle.addEventListener('click', () => {
            const next = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });

        function applyTheme(theme) {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
            if (icon) {
                icon.classList.toggle('fa-moon', theme === 'light');
                icon.classList.toggle('fa-sun', theme === 'dark');
            }
        }
    }

    function initScrollProgress() {
        const bar = doc.querySelector('.scroll-progress');
        if (!bar) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY || doc.documentElement.scrollTop;
                const docHeight = doc.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                bar.style.width = progress + '%';

                const header = doc.querySelector('header');
                if (header) {
                    if (scrollTop > 40) header.classList.add('scrolled');
                    else header.classList.remove('scrolled');
                }

                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    function initScrollSpy() {
        const navLinks = doc.querySelectorAll('.nav-links a[href^="#"]');
        if (!navLinks.length) return;

        const linkMap = new Map();
        navLinks.forEach(link => {
            const hash = link.getAttribute('href');
            if (!hash || hash === '#') return;
            const target = doc.querySelector(hash);
            if (target) linkMap.set(target, link);
        });

        if (!linkMap.size) return;

        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (!visible.length) return;
            const best = visible[0].target;
            navLinks.forEach(l => l.classList.remove('active'));
            const link = linkMap.get(best);
            if (link) link.classList.add('active');
        }, {
            rootMargin: '-40% 0px -55% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        linkMap.forEach((_, section) => observer.observe(section));
    }

    function initReveal() {
        const items = doc.querySelectorAll('.reveal');
        if (!items.length) return;

        if (prefersReducedMotion) {
            items.forEach(el => el.classList.add('visible'));
            initSkillBars(true);
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('visible');
                    obs.unobserve(el);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.12
        });

        items.forEach(el => observer.observe(el));

        const bars = doc.querySelectorAll('.skill-bar-fill');
        if (bars.length) {
            const barObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fill = entry.target;
                        const w = fill.getAttribute('data-width') || '0';
                        fill.style.width = w + '%';
                        obs.unobserve(fill);
                    }
                });
            }, { rootMargin: '0px 0px -10% 0px', threshold: 0.25 });
            bars.forEach(b => barObserver.observe(b));
        }
    }

    function initSkillBars(immediate) {
        doc.querySelectorAll('.skill-bar-fill').forEach(fill => {
            const w = fill.getAttribute('data-width') || '0';
            fill.style.width = (immediate ? w : 0) + '%';
        });
    }

    function initTypingEffect() {
        if (prefersReducedMotion) return;
        const target = doc.querySelector('.typed-text');
        const caret = doc.querySelector('.caret');
        if (!target) return;

        const phrases = ['Data Analyst', 'MERN Stack Developer', 'Data Storyteller'];
        const typeSpeed = 80;
        const deleteSpeed = 45;
        const holdDuration = 1800;
        const startDelay = 600;

        let phraseIdx = 0;
        let charIdx = 0;
        let deleting = false;
        let timeoutId;

        function tick() {
            const phrase = phrases[phraseIdx];
            if (!deleting) {
                charIdx++;
                target.textContent = phrase.slice(0, charIdx);
                if (charIdx === phrase.length) {
                    deleting = true;
                    timeoutId = setTimeout(tick, holdDuration);
                    return;
                }
                timeoutId = setTimeout(tick, typeSpeed);
            } else {
                charIdx--;
                target.textContent = phrase.slice(0, charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    timeoutId = setTimeout(tick, 350);
                    return;
                }
                timeoutId = setTimeout(tick, deleteSpeed);
            }
        }

        if (caret) caret.style.animationPlayState = 'running';
        timeoutId = setTimeout(tick, startDelay);
    }

    function initNavToggle() {
        const hamburger = doc.querySelector('.hamburger');
        const navLinks = doc.querySelector('.nav-links');
        const links = doc.querySelectorAll('.nav-links li');
        if (!hamburger || !navLinks) return;

        function toggleMenu() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        }
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                toggleMenu();
            }
        });

        const navAnchors = doc.querySelectorAll('.nav-links a');
        const header = doc.querySelector('header');

        navAnchors.forEach(a => {
            a.addEventListener('click', (e) => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');

                const href = a.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href;
                    const targetElement = doc.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        const headerOffset = header ? header.offsetHeight : 60;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                    }
                }
            });
        });

        doc.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;
                const targetElement = doc.querySelector(targetId);
                if (!targetElement) return;
                e.preventDefault();
                const headerOffset = header ? header.offsetHeight : 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });
        });
    }

    function initContactForm() {
        const contactForm = doc.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const messageElement = doc.getElementById('form-message');
            if (!submitButton) return;

            const originalButtonHTML = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<span class="spinner"></span> Sending...';

            if (messageElement) {
                messageElement.className = '';
                messageElement.style.display = 'none';
                messageElement.style.color = '';
            }

            const formData = new FormData(contactForm);
            const encodedData = new URLSearchParams(formData).toString();

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encodedData
            })
                .then(() => {
                    if (messageElement) {
                        messageElement.innerText = 'Message sent successfully!';
                        messageElement.className = 'show success';
                        messageElement.style.display = 'block';
                    }
                    contactForm.reset();
                    setTimeout(() => {
                        if (messageElement) {
                            messageElement.classList.remove('show');
                            setTimeout(() => { messageElement.style.display = 'none'; }, 400);
                        }
                    }, 5000);
                })
                .catch((error) => {
                    console.error(error);
                    if (messageElement) {
                        messageElement.innerText = 'Failed to send message. Please try again later.';
                        messageElement.className = 'show error';
                        messageElement.style.display = 'block';
                    }
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');
                    submitButton.innerHTML = originalButtonHTML;
                });
        });
    }

    function initImageModal() {
        const imageModal = doc.getElementById('image-modal');
        const imageModalImg = imageModal ? imageModal.querySelector('.image-modal-img') : null;

        function openImageModal(src) {
            if (!imageModal || !imageModalImg) return;
            imageModalImg.src = src;
            imageModal.classList.add('open');
        }

        if (imageModal) {
            imageModal.addEventListener('click', (e) => {
                if (e.target === imageModal) {
                    imageModal.classList.remove('open');
                }
            });
            doc.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && imageModal.classList.contains('open')) {
                    imageModal.classList.remove('open');
                }
            });
        }

        const logoImg = doc.querySelector('.logo-avatar img');
        if (logoImg) {
            logoImg.addEventListener('click', () => openImageModal(logoImg.src));
        }
    }

    doc.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initScrollProgress();
        initScrollSpy();
        initNavToggle();
        initTypingEffect();
        initContactForm();
        initImageModal();
        initReveal();
    });
})();
