document.addEventListener('DOMContentLoaded', () => {

    // 1. Navegação Suave (Smooth Scroll)
    document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Fechar o menu mobile do Bootstrap após o clique
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });

    // 2. Efeito Glitch/Glow no CTA Principal
    const ctaButton = document.getElementById('cta-button');

    function applyGlitchEffect() {
        // Simula a falha de transmissão do VCR/Vigilância
        ctaButton.style.textShadow = `
            ${(Math.random() - 0.5) * 5}px 0 5px var(--color-nina-neon),
            0 ${(Math.random() - 0.5) * 5}px 5px var(--color-nina-neon),
            ${(Math.random() - 0.5) * 5}px 0 5px rgba(255, 0, 0, 0.7)
        `;
        ctaButton.style.transform = `skew(${(Math.random() - 0.5) * 0.5}deg, ${(Math.random() - 0.5) * 0.5}deg)`;
    }

    // Aplica o glitch de forma sutil e intermitente
    setInterval(applyGlitchEffect, 500); // Glitch suave a cada 0.5s

    // Remove a transformação ao passar o mouse para a animação CSS (hover) assumir
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.textShadow = 'none';
        ctaButton.style.transform = 'none';
    });
    // Reaplica ao sair
    ctaButton.addEventListener('mouseleave', () => {
        // A animação de intervalo cuidará da reaplicação
    });

});