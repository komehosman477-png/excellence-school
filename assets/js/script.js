console.log("EXCELLENCE SCRIPT LOADED");
// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("show");

        if (navbar.classList.contains("show")) {
            menuToggle.textContent = "✕";
            menuToggle.setAttribute("aria-label", "Close navigation");
        } else {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Open navigation");
        }

    });

}


// Close menu after clicking a link

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {
            navbar.classList.remove("show");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Open navigation");
        }

    });

});


// =====================================================
// CONTACT FORM
// =====================================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message =
            document.getElementById("contactFormMessage");

        if (message) {

            message.textContent =
                "Thank you! Your message has been received.";

            message.style.color = "#0b3d91";

        }

        contactForm.reset();

    });

}



// =====================================================
// ADMISSIONS FORM - DATABASE SUBMISSION
// =====================================================

const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {

    admissionForm.addEventListener("submit", async function (event) {

        event.preventDefault();
        event.stopPropagation();

        console.log("Admission form submitted");

        const formMessage =
            document.getElementById("formMessage");

        // Collect form information
        const formData = {

            first_name:
                document.getElementById("firstName").value,

            last_name:
                document.getElementById("lastName").value,

            date_of_birth:
                document.getElementById("dob").value,

            gender:
                document.getElementById("gender").value,

            class_applying_for:
                document.getElementById("class").value,

            guardian_name:
                document.getElementById("guardianName").value,

            relationship:
                document.getElementById("relationship").value,

            phone:
                document.getElementById("phone").value,

            email:
                document.getElementById("email").value,

            address:
                document.getElementById("address").value
        };

        // Show submitting message
        if (formMessage) {
            formMessage.textContent =
                "Submitting application...";

            formMessage.style.color = "#0b3d91";
        }

        try {

            const response = await fetch(
                "/api/admissions",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            // Get server response
            const result = await response.json();

            console.log("Server response:", result);

            // Check HTTP status
            if (!response.ok) {

    console.error("Server error:", result);

    throw new Error(
        result.message ||
        result.error ||
        "The server rejected the application."
    );
}

            // Accept either applicationId or application_id
            const applicationId =
                result.applicationId ||
                result.application_id ||
                result.id;

            if (result.success && applicationId) {

                if (formMessage) {

                    formMessage.textContent =
                        "Application submitted successfully! Application ID: " +
                        applicationId;

                    formMessage.style.color = "green";
                }

                // Save information for receipt
                localStorage.setItem(
                    "applicationData",
                    JSON.stringify({
                        ...formData,
                        applicationId: applicationId
                    })
                );

                // Open receipt
                setTimeout(function () {

                    window.location.href =
                        "receipt.html?id=" +
                        applicationId;

                }, 1000);

            } else {

                if (formMessage) {

                    formMessage.textContent =
                        result.message ||
                        "Unable to upload application information.";

                    formMessage.style.color = "red";
                }

                console.error(
                    "Unexpected server response:",
                    result
                );
            }

       } catch (error) {

    console.error("Admission submission error:", error);

    if (formMessage) {

        formMessage.textContent =
            "Error: " + error.message;

        formMessage.style.color = "red";
    }

}

    });

}

