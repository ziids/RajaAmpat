document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const navButtons = document.getElementById("navButtonsContainer");
    const navMobileButtons = document.getElementById("navMobileButtonsContainer");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (currentUser) {
        if (navButtons && navMobileButtons) {
            navButtons.innerHTML = `
                <a href="profile.html" class="user-greeting">Halo, <b>${currentUser.username}</b>!</a>
                <a href="#" id="btnLogout" class="nav-btn nav-btn-desktop" onclick="logout()">Logout</a>
            `;

            navMobileButtons.innerHTML = `
                <a href="profile.html" class="user-greeting">Halo, <b>${currentUser.username}</b>!</a>
                <a href="#" id="btnLogout" class="nav-btn nav-btn-mobile" onclick="logout()">Logout</a>
            `;
        }
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const username = document.getElementById("reg-username").value;
            const password = document.getElementById("reg-password").value;

            const users = JSON.parse(localStorage.getItem("userDB")) || [];

            const userExists = users.some( user => user.username === username || user.email === email );

            if (userExists) {
                alert("Username atau email sudah digunakan!");
                return;
            }

            users.push({ email, username, password });

            localStorage.setItem("userDB", JSON.stringify(users));

            alert("Registrasi berhasil!");
            window.location.href = "login.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputUser = document.getElementById("username").value;
            const inputPass = document.getElementById("password").value;

            const users = JSON.parse(localStorage.getItem("userDB")) || [];

            const user = users.find( u => (u.username === inputUser || u.email === inputUser) && u.password === inputPass );

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                alert("Login berhasil!");
                window.location.href = "index.html";
                return;
            }

            if (inputUser === "admin" && inputPass === "admin123") {
                localStorage.setItem( "currentUser", JSON.stringify({ username: "Admin", role: "admin" }) );

                window.location.href = "index.html";
                return;
            }

            alert("Username/Email atau Password salah!");
        });
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const input = button.parentElement.querySelector("input");
        const icon = button.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    });
});