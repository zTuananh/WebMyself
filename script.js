document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // EXTRA 1: Dark / Light Mode Toggle
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeIcon.className = "fa-solid fa-sun";
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeIcon.className = "fa-solid fa-moon";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeIcon.className = "fa-solid fa-sun";
        }
    });

    // ==========================================
    // EXTRA 2: Dynamic Project Filtering
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ==========================================
    // EXTRA 3: Interactive Modal with Images
    // ==========================================
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalImg = document.getElementById("modal-img");
    const closeModalBtn = document.querySelector(".close-modal");
    const openModalBtns = document.querySelectorAll(".open-modal");

    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modalTitle.textContent = btn.getAttribute("data-title");
            modalDesc.textContent = btn.getAttribute("data-desc");
            modalImg.src = btn.getAttribute("data-img");
            modal.style.display = "flex";
            modal.setAttribute("aria-hidden", "false");
        });
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        }
    });

    // ==========================================
    // EXTRA 4: Scroll to Top & Form Validation
    // ==========================================
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Form Validation Logic
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        let isValid = true;

        if (name === "") {
            document.getElementById("name-error").textContent = "Vui lòng nhập họ và tên.";
            isValid = false;
        } else {
            document.getElementById("name-error").textContent = "";
        }

        if (email === "" || !email.includes("@")) {
            document.getElementById("email-error").textContent = "Email không hợp lệ.";
            isValid = false;
        } else {
            document.getElementById("email-error").textContent = "";
        }

        if (message === "") {
            document.getElementById("message-error").textContent = "Vui lòng nhập lời nhắn.";
            isValid = false;
        } else {
            document.getElementById("message-error").textContent = "";
        }

        if (isValid) {
            formStatus.style.color = "#10b981";
            formStatus.textContent = "✓ Gửi thành công! Tôi sẽ phản hồi bạn sớm nhất.";
            contactForm.reset();
        }
    });
});