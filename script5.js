const linkItems = document.querySelectorAll(".link-item");

linkItems.forEach((linkItem, index) => {
    linkItem.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        linkItem.classList.add("active");

        const indicator = document.querySelector(".indicator");

        indicator.style.left = `${index * 95 + 48}px`;
    })
})

// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.querySelector(".login_form");
//     const signupForm = document.querySelector(".signup_form");
//     const signupBtn = signupForm.querySelector(".btn");

//     // Function to create error message
//     function showError(input, message) {
//         let errorBox = input.parentElement.querySelector(".error-message");
//         if (!errorBox) {
//             errorBox = document.createElement("div");
//             errorBox.classList.add("error-message");
//             input.parentElement.appendChild(errorBox);
//         }
//         errorBox.textContent = message;
//         input.style.border = "2px solid crimson";
//     }

//     function clearError(input) {
//         let errorBox = input.parentElement.querySelector(".error-message");
//         if (errorBox) {
//             errorBox.remove();
//         }
//         input.style.border = "2px solid green";
//     }

//     // Validation Function
//     function validateForm() {
//         let isValid = true;

//         const username = signupForm.querySelector("input[placeholder='Username']");
//         const email = signupForm.querySelector("input[placeholder='Email']");
//         const password = signupForm.querySelector("input[placeholder='Password']");

//         // Username Validation (At least 3 characters)
//         if (username.value.trim().length < 3) {
//             showError(username, "Username must be at least 3 characters long!");
//             isValid = false;
//         } else {
//             clearError(username);
//         }

//         // Email Validation
//         const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         if (!emailPattern.test(email.value.trim())) {
//             showError(email, "Enter a valid email address!");
//             isValid = false;
//         } else {
//             clearError(email);
//         }

//         // Password Validation (At least 6 characters)
//         if (password.value.trim().length < 6) {
//             showError(password, "Password must be at least 6 characters long!");
//             isValid = false;
//         } else {
//             clearError(password);
//         }

//         return isValid;
//     }

//     // Event Listener for Sign-Up Button
//     signupBtn.addEventListener("click", function (event) {
//         event.preventDefault();

//         if (validateForm()) {
//             showSuccessMessage();
//         }
//     });

//     // Function to Show Success Message
//     function showSuccessMessage() {
//         // Create Success Box
//         const successBox = document.createElement("div");
//         successBox.classList.add("success-box");
//         successBox.innerHTML = `
//             <div class="success-content">
//                 <h2>✅ Sign Up Successful</h2>
//                 <p>Welcome to <b>Bloodsphere</b>!</p>
//                 <button class="done-btn">Done</button>
//             </div>
//         `;

//         // Blur Background Except Success Box
//         document.body.classList.add("blur-background");
//         document.body.appendChild(successBox);

//         // Add Animation
//         setTimeout(() => {
//             successBox.classList.add("show");
//         }, 100);

//         // Event Listener for Done Button
//         successBox.querySelector(".done-btn").addEventListener("click", function () {
//             document.body.classList.remove("blur-background");
//             successBox.remove();
//             window.location.href = "index.html"; // Redirect to index page
//         });
//     }
// });
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login_form");
    const signupForm = document.querySelector(".signup_form");
    const loginBtn = loginForm.querySelector(".btn");
    const signupBtn = signupForm.querySelector(".btn");

    // Function to create error message
    function showError(input, message) {
        let errorBox = input.parentElement.querySelector(".error-message");
        if (!errorBox) {
            errorBox = document.createElement("div");
            errorBox.classList.add("error-message");
            input.parentElement.appendChild(errorBox);
        }
        errorBox.textContent = message;
        input.style.border = "2px solid crimson";
    }

    function clearError(input) {
        let errorBox = input.parentElement.querySelector(".error-message");
        if (errorBox) {
            errorBox.remove();
        }
        input.style.border = "2px solid green";
    }

    // Validation Function for Signup
    function validateSignupForm() {
        let isValid = true;

        const username = signupForm.querySelector("input[placeholder='Username']");
        const email = signupForm.querySelector("input[placeholder='Email']");
        const password = signupForm.querySelector("input[placeholder='Password']");

        // Username Validation (At least 3 characters)
        if (username.value.trim().length < 3) {
            showError(username, "Username must be at least 3 characters long!");
            isValid = false;
        } else {
            clearError(username);
        }

        // Email Validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Enter a valid email address!");
            isValid = false;
        } else {
            clearError(email);
        }

        // Password Validation (At least 6 characters)
        if (password.value.trim().length < 6) {
            showError(password, "Password must be at least 6 characters long!");
            isValid = false;
        } else {
            clearError(password);
        }

        return isValid;
    }

    // Validation Function for Login
    function validateLoginForm() {
        let isValid = true;

        const email = loginForm.querySelector("input[placeholder='Email Address']");
        const password = loginForm.querySelector("input[placeholder='Password']");

        // Email Validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Enter a valid email address!");
            isValid = false;
        } else {
            clearError(email);
        }

        // Password Validation (At least 6 characters)
        if (password.value.trim().length < 6) {
            showError(password, "Password must be at least 6 characters long!");
            isValid = false;
        } else {
            clearError(password);
        }

        return isValid;
    }

    // Event Listener for Sign-Up Button
    signupBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateSignupForm()) {
            showSuccessMessage("Sign Up Successful", "Welcome to Bloodsphere!");
        }
    });

    // Event Listener for Login Button
    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateLoginForm()) {
            showSuccessMessage("Login Successful", "Welcome back to Bloodsphere!");
        }
    });

    // Function to Show Success Message
    function showSuccessMessage(title, message) {
        // Create Success Box
        const successBox = document.createElement("div");
        successBox.classList.add("success-box");
        successBox.innerHTML = `
            <div class="success-content">
                <h2>✅ ${title}</h2>
                <p>${message}</p>
                <button class="done-btn">Done</button>
            </div>
        `;

        // Blur Background Except Success Box
        document.body.classList.add("blur-background");
        document.body.appendChild(successBox);

        // Add Animation
        setTimeout(() => {
            successBox.classList.add("show");
        }, 100);

        // Event Listener for Done Button
        successBox.querySelector(".done-btn").addEventListener("click", function () {
            document.body.classList.remove("blur-background");
            successBox.remove();
            window.location.href = "index.html"; // Redirect to index page
        });
    }
});
