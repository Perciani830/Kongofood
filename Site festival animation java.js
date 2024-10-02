function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Ajuste la position cible
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Limite à 1
        const ease = easeInOutQuad(progress); // Fonction d'accélération

        window.scrollTo(0, startPosition + (targetPosition - startPosition) * ease); // Corrige le calcul de position

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Courbe d'accélération
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        smoothScroll(target, 1000); // Durée de 1000 ms (1 seconde)
    });
});

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Affiche ou cache le bouton selon le défilement
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
};

// Fonction pour remonter
scrollToTopBtn.onclick = function() {
    smoothScroll(document.body, 1000); // Utilise smoothScroll pour le retour en haut
};
