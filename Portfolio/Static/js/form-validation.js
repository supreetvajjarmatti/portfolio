document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validate form fields (you can add more validation as needed)
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const project = form.querySelector('[name="project"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !project || !message) {
            alert("All fields must be filled out");
            return;
        }

        // Submit the form if validation passes
        submitForm(name, email, project, message);
    });

    function submitForm(name, email, project, message) {
        // Create a FormData object to send the form data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("project", project);
        formData.append("message", message);

        // Use fetch API to send the data to the server
        fetch("process_form.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                if (data.success) {
                    alert("Form submitted successfully!");
                    form.reset();
                } else {
                    alert("Error submitting form. Please try again later.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
});
