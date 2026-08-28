import confetti from 'canvas-confetti';

export function triggerBirthdayConfetti() {
  // Fire dual side cannons
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fbbf24']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#fda4af', '#f43f5e', '#e11d48', '#d946ef', '#fef08a']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#f43f5e', '#fb7185', '#ffffff', '#f472b6']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#ffd700', '#f43f5e', '#ec4899']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fb7185', '#e11d48', '#fbbf24']
  });
}

export function triggerHeartBurst(x: number, y: number) {
  const scalar = 1.6;
  const heart = confetti.shapeFromPath({
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  });

  const normalizedX = x / window.innerWidth;
  const normalizedY = y / window.innerHeight;

  confetti({
    shapes: [heart],
    scalar,
    particleCount: 25,
    spread: 80,
    origin: { x: normalizedX, y: normalizedY },
    colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#ec4899'],
    zIndex: 9999,
    ticks: 160
  });
}

export function triggerFireworks() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: number = window.setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#c084fc', '#60a5fa']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#c084fc', '#60a5fa']
    });
  }, 250);
}
