document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const navButtons = document.getElementById("navButtonsContainer");
    const navMobileButtons = document.getElementById("navMobileButtonsContainer");

    // 1. Cek Status Login buat ubah Navbar
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (currentUser) {
        // Kalau udah login, ganti tombol Register/Login jadi Profile & Logout
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

    // 2. Handle Register
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const username = document.getElementById("reg-username").value;
            const password = document.getElementById("reg-password").value;

            // Simpan data user ke Local Storage
            const userData = { email, username, password };
            localStorage.setItem("userDB", JSON.stringify(userData));
            
            alert("Registrasi berhasil! Silakan Login.");
            window.location.href = "login.html";
        });
    }

    // 3. Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputUser = document.getElementById("username").value;
            const inputPass = document.getElementById("password").value;

            const storedUser = JSON.parse(localStorage.getItem("userDB"));

            // Validasi Login
            if (storedUser && (inputUser === storedUser.username || inputUser === storedUser.email) && inputPass === storedUser.password) {
                localStorage.setItem("currentUser", JSON.stringify(storedUser));
                alert("Login berhasil!");
                window.location.href = "index.html";
            } else {
                // Hardcode user cadangan kalau belum register
                if (inputUser === "admin" && inputPass === "admin123") {
                    localStorage.setItem("currentUser", JSON.stringify({username: "Admin"}));
                    window.location.href = "index.html";
                } else {
                    alert("Username/Email atau Password salah!");
                }
            }
        });
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}