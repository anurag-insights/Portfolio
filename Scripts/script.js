document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Hamburger animation toggle (optional, can add CSS for this)
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a nav link is clicked (anchor-based for better mobile support)
    const navAnchors = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');
    navAnchors.forEach(a => {
        a.addEventListener('click', (e) => {
            // Close the mobile menu immediately
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');

            const href = a.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = (header ? header.offsetHeight : 60);
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // Smooth Scrolling for other in-page anchor links (non-nav)
    document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            e.preventDefault();
            const headerOffset = (header ? header.offsetHeight : 60);
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        });
    });

    // Form Submission Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const messageElement = document.getElementById('form-message');
    const originalButtonText = submitButton.innerText;

    submitButton.disabled = true;
    submitButton.innerText = 'Sending...';

    const formData = new FormData(contactForm);
    const encodedData = new URLSearchParams(formData).toString();

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodedData
    })
    .then(() => {
      messageElement.innerText = 'Message sent successfully!';
      messageElement.style.color = 'green';
      messageElement.style.display = 'block';
      contactForm.reset();

      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 5000);
    })
    .catch((error) => {
      console.error(error);
      messageElement.innerText = 'Failed to send message. Please try again later.';
      messageElement.style.color = 'red';
      messageElement.style.display = 'block';
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerText = originalButtonText;
    });
  });
}


    const imageModal = document.getElementById('image-modal');
    const imageModalImg = imageModal ? imageModal.querySelector('.image-modal-img') : null;

    function openImageModal(src) {
        if (!imageModal || !imageModalImg) return;
        imageModalImg.src = src;
        imageModal.classList.add('open');
        positionCloseButton();
    }

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.remove('open');
            }
        });
    }

    const imageModalClose = imageModal ? imageModal.querySelector('.image-modal-close') : null;
    if (imageModalClose) {
        imageModalClose.addEventListener('click', () => {
            imageModal.classList.remove('open');
        });
    }

    function positionCloseButton() {
        if (!imageModal) return;
        const content = imageModal.querySelector('.image-modal-content');
        const closeBtn = imageModal.querySelector('.image-modal-close');
        if (!content || !closeBtn) return;
        const rect = content.getBoundingClientRect();
        const gap = 16;
        const top = rect.top + window.scrollY + rect.height * 0.08;
        const left = rect.right + window.scrollX + gap;
        const btnSize = closeBtn.offsetWidth || 56;
        const maxLeft = window.scrollX + window.innerWidth - btnSize - gap;
        const finalLeft = Math.min(left, maxLeft);
        closeBtn.style.top = `${top}px`;
        closeBtn.style.left = `${finalLeft}px`;
    }

    window.addEventListener('resize', () => {
        if (imageModal && imageModal.classList.contains('open')) {
            positionCloseButton();
        }
    });

    window.addEventListener('scroll', () => {
        if (imageModal && imageModal.classList.contains('open')) {
            positionCloseButton();
        }
    });

    const logoImg = document.querySelector('.logo-avatar img');
    if (logoImg) {
        logoImg.addEventListener('click', () => {
            openImageModal(logoImg.src);
        });
    }

});
