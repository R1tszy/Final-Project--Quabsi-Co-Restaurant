// Function to validate email
function validateEmail(email) {
    const validDomains = ['@gmail.com', '@yahoo.com', '@outlook.com'];
    return validDomains.some(domain => email.endsWith(domain));
}

// Function to validate phone number (Philippines)
function validatePhoneNumber(phone) {
    return /^09\d{2}-\d{3}-\d{4}$/.test(phone);
}

// Function to validate name (no special characters or numbers)
function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

// Function to show popup message
function showPopup(message, isError = false) {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.borderRadius = '5px';
    popup.style.color = '#fff';
    popup.style.backgroundColor = isError ? '#ff0000' : '#00ff00';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';
    document.body.appendChild(popup);
    setTimeout(() => document.body.removeChild(popup), 3000);
}

// Simulate sending email (replace with actual email sending logic when you have a backend)
function simulateSendEmail(data, formType) {
    console.log(`Sending ${formType} data to rslbbalajadia@gmail.com:`, data);
    // In a real implementation, you would send this data to your server
    // which would then use an email service to send the email
    showPopup(`${formType} submitted successfully!`);
}

// Handle reservation form submission
document.querySelector('.reservation-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const date = this.querySelector('input[name="date"]').value;
    const time = this.querySelector('input[name="time"]').value;
    const message = this.querySelector('textarea[name="message"]').value;

    if (!validateName(name)) {
        showPopup('Please enter a valid name without special characters or numbers.', true);
        return;
    }

    if (!validateEmail(email)) {
        showPopup('Please enter a valid email address (gmail, yahoo, or outlook).', true);
        return;
    }

    simulateSendEmail({ name, email, date, time, message }, 'Reservation');
    this.reset();
});

// Handle contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const phone = this.querySelector('input[name="contact"]').value;
    const address = this.querySelector('input[name="address"]').value;

    if (!validateName(name)) {
        showPopup('Please enter a valid name without special characters or numbers.', true);
        return;
    }

    if (!validateEmail(email)) {
        showPopup('Please enter a valid email address (gmail, yahoo, or outlook).', true);
        return;
    }

    if (!validatePhoneNumber(phone)) {
        showPopup('Please enter a valid Philippines phone number (e.g., 0929-369-0895).', true);
        return;
    }

    simulateSendEmail({ name, email, phone, address }, 'Contact Form');
    this.reset();
});