  const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document
  .querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  )
  .forEach((element, index) => {
    element.style.transitionDelay =
      `${Math.min(index % 4, 3) * 150}ms`;

    observer.observe(element);
  });

const ticker = document.querySelector('.ticker div');
if (ticker) ticker.innerHTML += ticker.innerHTML;

const interests = {
  hobbies: { number: '01', label: 'Hobbies / FUTSAL', title: 'Reading the field.', copy: 'I’ve been playing soccer since I was four, and I currently play with Michigan Club Futsal. The game has shaped how I think: scan early, find space, communicate clearly, and make the next action count. Outside of soccer, I enjoy fishing and snowboarding—two completely different ways to reset, challenge myself, and spend time outdoors.' },
  building: { number: '02', label: 'PRODUCTS / ENGINEERING', title: 'Turning ideas into systems.', copy: 'I’m drawn to building because it turns curiosity into something tangible. Whether I’m working on a software project or exploring a new technology, I enjoy starting with an unclear problem, figuring out what actually matters, and creating something that solves it. For me, building is less about the finished product and more about learning how to turn an idea into something useful.' },
  culture: { number: '03', label: 'LANGUAGE / COMMUNITY', title: 'Connecting across teams.', copy: 'Growing up between Japanese and American cultures taught me to appreciate living in the gray space between two different ways of thinking. Rather than feeling like I have to belong completely to one or the other, I’ve learned to value the perspective that comes from understanding both. It has shaped how I communicate, connect with different people, and approach situations with more than one point of view.' }
};

const stage = document.querySelector('.interest-stage');

document.querySelectorAll('.interest-btn').forEach((button) => {
  button.addEventListener('click', () => {

    const key = button.dataset.interest;
    console.log("KEY:", key);

    const item = interests[key];
    console.log("ITEM:", item);

    if (!item) {
      console.error(`No interest found for: ${key}`);
      return;
    }

    document.querySelectorAll('.interest-btn').forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle('active', selected);
      candidate.setAttribute('aria-selected', String(selected));
    });

    stage.classList.remove('switching');
    void stage.offsetWidth;
    stage.classList.add('switching');

    stage.querySelector('.interest-number').textContent = item.number;
    stage.querySelector('.interest-label').textContent = item.label;
    stage.querySelector('h3').textContent = item.title;
    stage.querySelector('.interest-copy').textContent = item.copy;
  });
});

const transitionBall =
  document.querySelector('#transition-ball');

document.querySelectorAll('.project-link').forEach((project) => {
  project.addEventListener('click', (event) => {
    const destination = project.href;

    event.preventDefault();

    transitionBall.classList.remove('kick');
    void transitionBall.offsetWidth;
    transitionBall.classList.add('kick');

    setTimeout(() => {
      window.location.href = destination;
    }, 1350);
  });
});
