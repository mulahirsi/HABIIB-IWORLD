document.addEventListener("DOMContentLoaded", () => {
    const phoneContainer = document.getElementById("phone-container");
    const modal = document.getElementById("details-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalPrice = document.getElementById("modal-price");
    const modalPriceKsh = document.getElementById("modal-price-ksh");
    const modalFeatures = document.getElementById("modal-features");
    const closeModal = document.querySelector(".close");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Fetch phone data from API (phones.json)
    fetch("phones.json")
        .then(response => response.json())
        .then(phones => {
            phones.forEach(phone => {
                const phoneCard = document.createElement("div");
                phoneCard.classList.add("phone-card");

                phoneCard.innerHTML = `
                    <img src="${phone.image}" alt="${phone.name}">
                    <h2>${phone.name}</h2>
                    <p>Price: ${phone.price}</p>
                    <p>PRICE: ${phone.priceKsh}</p>
                    <button class="details-btn">View Details</button>
                `;

                phoneCard.querySelector(".details-btn").addEventListener("click", () => {
                    modalTitle.innerText = phone.name;
                    modalImage.src = phone.image;
                    modalImage.alt = phone.name;
                    modalPrice.innerText = phone.price;
                    modalPriceKsh.innerText = phone.priceKsh;
                    modalFeatures.innerText = phone.features;
                    modal.style.display = "block";
                });

                phoneContainer.appendChild(phoneCard);
            });
        })
        .catch(error => console.error("Error fetching phones:", error));

    // Close Modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Dark Mode Toggle
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});