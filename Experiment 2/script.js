document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // 1. Get the form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const dob = document.getElementById('dob').value;
        const university = document.getElementById('university').value;

        // 2. Basic validation (Check for empty fields)
        if (!name || !email || !phone || !dob || !university) {
            alert('Please fill in all fields.');
            return; // Stop if validation fails
        }

        // 3.  Check for duplicate entry (using localStorage)
        let contactEntries = JSON.parse(localStorage.getItem('contactEntries') || '[]');
        const isDuplicate = contactEntries.some(entry =>
            entry.name === name &&
            entry.phone === phone &&
            entry.email === email &&
            entry.dob === dob &&
            entry.university === university
        );

        if (isDuplicate) {
            alert('This detail is already entered. Try again.');
            form.reset(); // Clear the form
            return; // Stop if it's a duplicate
        }

        // 4.  If not a duplicate, create a new entry object
        const newEntry = {
            name: name,
            phone: phone,
            email: email,
            dob: dob,
            university: university
        };

        // 5. Add the new entry to the array
        contactEntries.push(newEntry);

        // 6. Save the updated array back to localStorage
        localStorage.setItem('contactEntries', JSON.stringify(contactEntries));

        // 7. Display the data in an alert
        let detailsString = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nDate of Birth: ${dob}\nUniversity: ${university}`;
        alert(`${detailsString}\n\nThank you for submitting!`);

        // 8. Clear the form
        form.reset();
    });
});
