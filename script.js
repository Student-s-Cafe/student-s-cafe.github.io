// Header scroll effect
const header = document.querySelector('header');
const scrollToTop = document.querySelector('.scroll-to-top');

const handleScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    scrollToTop.classList.add('show');
  } else {
    header.classList.remove('scrolled');
    scrollToTop.classList.remove('show');
  }
};

window.addEventListener('scroll', handleScroll);

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .project, .team-member').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s, transform 0.5s';
  animateOnScroll.observe(el);
});

// Scroll to top functionality
scrollToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Interactive cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}`);
    card.style.setProperty('--mouse-y', `${y}`);
  });
});

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Dynamic content loader for team members
const teamMembers = [
  { name: 'CreonC', role: 'Backend Lead & Lead Software Engineer', image: './team-members/Creon.webp' },
  { name: 'LazerTC', role: 'UI/UX Developer & Research Lead', image: './team-members/LazerTC.webp' }
];

const teamContainer = document.getElementById('team-container');
teamMembers.forEach(member => {
  const memberElement = document.createElement('div');
  memberElement.className = 'card team-member';
  memberElement.innerHTML = `
    <img src="${member.image}" alt="${member.name}" loading="lazy">
    <h3>${member.name}</h3>
    <p>${member.role}</p>
  `;
  teamContainer.appendChild(memberElement);
});

// Service worker registration for offline capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}