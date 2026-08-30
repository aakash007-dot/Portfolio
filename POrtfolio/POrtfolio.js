/* =========================================================
   AAKASH S.S PORTFOLIO
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const themeButton =
        document.getElementById("themeToggle");

    const menuButton =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const navbar =
        document.querySelector(".navbar");


    /* =====================================================
       THEME
    ===================================================== */

    function updateThemeIcon() {

        if (!themeButton) return;

        if (body.classList.contains("light")) {
            themeButton.innerHTML = "☀";
            themeButton.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        } else {
            themeButton.innerHTML = "☾";
            themeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    }


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light");
    } else {
        body.classList.remove("light");
    }

    updateThemeIcon();


    /* Theme button */

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                body.classList.toggle("light");

                const currentTheme =
                    body.classList.contains("light")
                        ? "light"
                        : "dark";

                localStorage.setItem(
                    "portfolio-theme",
                    currentTheme
                );

                updateThemeIcon();
            }
        );
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            function () {

                mobileMenu.classList.toggle("open");

                const isOpen =
                    mobileMenu.classList.contains("open");

                menuButton.innerHTML =
                    isOpen ? "✕" : "☰";
            }
        );


        /* Close menu after clicking a link */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove("open");

                    menuButton.innerHTML = "☰";
                }
            );
        });
    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function handleNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        handleNavbar
    );

    handleNavbar();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }
        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId === ""
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const offset = 70;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        );
    });


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener(
        "load",
        function () {

            const loader =
                document.querySelector(
                    ".page-loader"
                );

            if (loader) {

                setTimeout(
                    function () {

                        loader.classList.add(
                            "hide"
                        );

                    },
                    400
                );
            }
        }
    );


    /* =====================================================
       MOUSE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroTitle =
        document.querySelector(".hero h1");

    if (
        hero &&
        heroTitle &&
        window.innerWidth > 900
    ) {

        hero.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const moveX =
                    (x / rect.width - 0.5) * 8;

                const moveY =
                    (y / rect.height - 0.5) * 8;

                heroTitle.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;
            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                heroTitle.style.transform =
                    "translate(0, 0)";
            }
        );
    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".primary-button, .social-button"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.width =
                    size + "px";

                ripple.style.height =
                    size + "px";

                ripple.style.position =
                    "absolute";

                ripple.style.left =
                    (event.clientX -
                        rect.left -
                        size / 2) + "px";

                ripple.style.top =
                    (event.clientY -
                        rect.top -
                        size / 2) + "px";

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(255,255,255,0.25)";

                ripple.style.transform =
                    "scale(0)";

                ripple.style.pointerEvents =
                    "none";

                ripple.style.animation =
                    "rippleEffect 0.6s ease-out";

                button.style.position =
                    "relative";

                button.style.overflow =
                    "hidden";

                button.appendChild(ripple);

                setTimeout(
                    function () {
                        ripple.remove();
                    },
                    600
                );
            }
        );
    });


    /* =====================================================
       CURSOR EFFECT
    ===================================================== */

    const cursor =
        document.createElement("div");

    cursor.className =
        "custom-cursor";

    document.body.appendChild(cursor);

    if (window.innerWidth > 900) {

        document.addEventListener(
            "mousemove",
            function (event) {

                cursor.style.left =
                    event.clientX + "px";

                cursor.style.top =
                    event.clientY + "px";
            }
        );


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .project, .skill-card"
            );

        interactiveElements.forEach(
            function (element) {

                element.addEventListener(
                    "mouseenter",
                    function () {

                        cursor.classList.add(
                            "active"
                        );
                    }
                );

                element.addEventListener(
                    "mouseleave",
                    function () {

                        cursor.classList.remove(
                            "active"
                        );
                    }
                );
            }
        );
    }

});


/* =========================================================
   RIPPLE ANIMATION
========================================================= */

const rippleStyle =
document.createElement("style");

rippleStyle.innerHTML = `

@keyframes rippleEffect {

    from {
        transform: scale(0);
        opacity: 1;
    }

    to {
        transform: scale(2);
        opacity: 0;
    }

}

.custom-cursor {

    position: fixed;

    width: 10px;
    height: 10px;

    border: 1px solid currentColor;

    border-radius: 50%;

    pointer-events: none;

    z-index: 10000;

    transform:
        translate(-50%, -50%);

    transition:
        width 0.25s ease,
        height 0.25s ease,
        background 0.25s ease;

    mix-blend-mode: difference;

}

.custom-cursor.active {

    width: 35px;
    height: 35px;

    background: white;

}

@media (max-width: 900px) {

    .custom-cursor {
        display: none;
    }

}

`;

document.head.appendChild(rippleStyle);