/* =========================================================
   CAMEL CREW THE GYM
   JAVASCRIPT
========================================================= */


/* ================= PRELOADER ================= */

const preloader = document.getElementById("preloader");

function hidePreloader() {
    if (!preloader) return;

    preloader.classList.add("hide");

    setTimeout(() => {
        preloader.style.display = "none";
    }, 600);
}


/*
   DOMContentLoaded instead of window.load.

   This means the preloader does NOT wait for:
   - images
   - Google Maps
   - external fonts
   - external resources
*/

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", () => {

        setTimeout(hidePreloader, 700);

    });

} else {

    setTimeout(hidePreloader, 700);

}


/*
   Absolute safety fallback.

   Even if something unexpected happens,
   the website will appear within 2 seconds.
*/

setTimeout(hidePreloader, 2200);


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}, { passive: true });


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("open");

    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("open");

        });

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("open");

        }

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    obs.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* ================= IMAGE ERROR HANDLING ================= */

/*
   If an external image ever fails,
   don't leave an ugly broken-image icon.
*/

const images = document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        const parent = image.parentElement;

        if (parent) {
            parent.classList.add("image-fallback");
        }

    });

});


/* ================= SMOOTH ANCHORS ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const navbarHeight = navbar
            ? navbar.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* ================= YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}