document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    function onScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        const sections = document.querySelectorAll("section[id]");
        let current = "";
        const scrollMid = window.scrollY + window.innerHeight / 2;

        sections.forEach((sec) => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (scrollMid >= top && scrollMid < bottom) {
                current = sec.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /*HAMBURGER MENU */
    const hamburger = document.getElementById("hamburger");
    const navList = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navList.classList.toggle("open");
        // Removed overflow lock — page stays scrollable even when nav is open
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            navList.classList.remove("open");
            // Removed overflow reset — no longer needed
        });
    });

    /* SMOOTH SCROLL for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            const offset = navbar.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    /*REVEAL ON SCROLL (Intersection Observer*/
    const revealEls = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
                setTimeout(() => {
                    el.classList.add("visible");
                }, delay);
                revealObserver.unobserve(el);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    /* CARD EFFECT */
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            // If mouse is outside the card bounds, reset and bail out
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                card.style.transform = "";
                card.style.transition = "transform 0.4s ease";
                return;
            }

            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            card.style.transition = "transform 0.1s ease";
            card.style.transform = `perspective(600px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transition = "transform 0.4s ease";
            card.style.transform = "";
        });
    });

    /*HERO PARALLAX on mousemove*/
    const heroGrid = document.querySelector(".hero-grid");
    const heroSection = document.querySelector(".hero-section");

    if (heroGrid && heroSection) {
        heroSection.addEventListener("mousemove", (e) => {
            const { innerWidth: W, innerHeight: H } = window;
            const px = (e.clientX / W - 0.5) * 20;
            const py = (e.clientY / H - 0.5) * 20;
            heroGrid.style.transform = `translate(${px}px, ${py}px)`;
        });

        heroSection.addEventListener("mouseleave", () => {
            heroGrid.style.transform = "";
        });
    }

    /*SCROLL TO TOP on logo click*/
    const navLogo = document.querySelector(".nav-logo");
    if (navLogo) {
        navLogo.style.cursor = "pointer";
        navLogo.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /*INPUT FLOAT LABEL EFFECT */
    document
        .querySelectorAll(".form-group input, .form-group textarea")
        .forEach((input) => {
            input.addEventListener("focus", () => {
                input.parentElement.classList.add("focused");
            });
            input.addEventListener("blur", () => {
                input.parentElement.classList.remove("focused");
                if (input.value.trim() !== "") {
                    input.parentElement.classList.add("has-value");
                } else {
                    input.parentElement.classList.remove("has-value");
                }
            });
        });

});