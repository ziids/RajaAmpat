document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
    if (!currentUser) {
        alert("Silakan login terlebih dahulu!");
        window.location.href = "login.html";
        return;
    }
 
    // =============== POPULATE USER DATA ===============
    function renderUserData() {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        document.getElementById("topUsername").textContent = user.username;
        document.getElementById("profileName").textContent = user.username;
        document.getElementById("profileEmail").textContent = user.email || "Email tidak tersedia";
 
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=f0f4f4&color=1a4d4d`;
        document.getElementById("topAvatar").src = avatarUrl;
        document.getElementById("mainAvatar").src = avatarUrl;
    }
    renderUserData();
 
    // =============== ORDER HISTORY ===============
    const historyContainer = document.getElementById("orderHistoryContainer");
    const orderHistory = JSON.parse(localStorage.getItem("history_" + currentUser.username)) || [];
 
    if (orderHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-history" style="text-align:center; padding:30px; color:#666; background:#f8fafd; border-radius:8px;">
                Belum ada riwayat pemesanan nih. Yuk pesen paket wisata Raja Ampat sekarang!
            </div>`;
    } else {
        let htmlContent = "";
        orderHistory.slice().reverse().forEach((order) => {
            htmlContent += `
                <div style="background:#fdfdfd;padding:15px;border-radius:8px;border-left:5px solid #1a4d4d;box-shadow:0 2px 10px rgba(0,0,0,0.05);margin-bottom:15px;border-top:1px solid #eee;border-right:1px solid #eee;border-bottom:1px solid #eee;">
                    <div style="display:flex;justify-content:space-between;border-bottom:1px dashed #ddd;padding-bottom:8px;margin-bottom:10px;">
                        <strong style="color:#1a4d4d;">${order.layanan} | ${order.id}</strong>
                        <span style="font-size:12px;color:#888;">${order.tanggalOrder || '-'}</span>
                    </div>
                    <div style="font-size:14px;color:#444;line-height:1.6;">
                        <div><strong>Atas Nama:</strong> ${order.nama}</div>
                        <div><strong>Detail:</strong> ${order.peserta} Orang | ${order.waktu} Hari</div>
                        <div><strong>Total Tagihan:</strong> <span style="color:#d9534f;font-weight:bold;">${order.totalTagihan}</span></div>
                    </div>
                </div>`;
        });
        historyContainer.innerHTML = htmlContent;
    }
 
    // =============== TAB SWITCHING ===============
    const tabs = {
        profile:  { btn: document.getElementById("btnMenuProfile"),   sec: document.getElementById("sectionProfile")  },
        history:  { btn: document.getElementById("btnMenuHistory"),   sec: document.getElementById("sectionHistory")  },
        settings: { btn: document.getElementById("btnMenuSettings"),  sec: document.getElementById("sectionSettings") }
    };
 
    function switchTab(active) {
        Object.entries(tabs).forEach(([key, { btn, sec }]) => {
            const isActive = key === active;
            sec.style.display = isActive ? "block" : "none";
            btn.classList.toggle("active", isActive);
        });
    }
 
    tabs.profile.btn.addEventListener("click",  (e) => { e.preventDefault(); switchTab("profile");  });
    tabs.history.btn.addEventListener("click",  (e) => { e.preventDefault(); switchTab("history");  });
    tabs.settings.btn.addEventListener("click", (e) => { e.preventDefault(); switchTab("settings"); });
 
    // =============== SIDEBAR LOGOUT ===============
    document.getElementById("btnSidebarLogout").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });
 
    // =============== INLINE EDIT: NAME ===============
    const editBtns = document.querySelectorAll(".btn-edit[data-field]");
 
    editBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const field = btn.dataset.field;
            if (field === "name") {
                const form = document.getElementById("editFormName");
                const input = document.getElementById("inputName");
                const isOpen = form.style.display !== "none";
                form.style.display = isOpen ? "none" : "block";
                if (!isOpen) {
                    const user = JSON.parse(localStorage.getItem("currentUser"));
                    input.value = user.username;
                    input.focus();
                }
            } else if (field === "email") {
                const form = document.getElementById("editFormEmail");
                const input = document.getElementById("inputEmail");
                const isOpen = form.style.display !== "none";
                form.style.display = isOpen ? "none" : "block";
                if (!isOpen) {
                    const user = JSON.parse(localStorage.getItem("currentUser"));
                    input.value = user.email || "";
                    input.focus();
                }
            }
        });
    });
 
    // Save Name
    document.getElementById("saveName").addEventListener("click", () => {
        const newName = document.getElementById("inputName").value.trim();
        if (!newName) { alert("Nama tidak boleh kosong!"); return; }
 
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("userDB")) || [];
 
        // Update in userDB
        const idx = users.findIndex(u => u.username === user.username);
        if (idx !== -1) { users[idx].username = newName; }

        const oldKey = `history_${user.username}`;
        const newKey = `history_${newName}`;
        const data = localStorage.getItem(oldKey);

        if (data) {
            localStorage.setItem(newKey, data);
            localStorage.removeItem(oldKey);
        }
        localStorage.setItem("userDB", JSON.stringify(users));
 
        // Update currentUser
        user.username = newName;
        localStorage.setItem("currentUser", JSON.stringify(user));
 
        document.getElementById("editFormName").style.display = "none";
        renderUserData();
    });
 
    document.getElementById("cancelName").addEventListener("click", () => {
        document.getElementById("editFormName").style.display = "none";
    });
 
    // Save Email
    document.getElementById("saveEmail").addEventListener("click", () => {
        const newEmail = document.getElementById("inputEmail").value.trim();
        if (!newEmail) { alert("Email tidak boleh kosong!"); return; }
 
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("userDB")) || [];
 
        const idx = users.findIndex(u => u.username === user.username);
        if (idx !== -1) { users[idx].email = newEmail; }
        localStorage.setItem("userDB", JSON.stringify(users));
 
        user.email = newEmail;
        localStorage.setItem("currentUser", JSON.stringify(user));
 
        document.getElementById("editFormEmail").style.display = "none";
        renderUserData();
    });
 
    document.getElementById("cancelEmail").addEventListener("click", () => {
        document.getElementById("editFormEmail").style.display = "none";
    });
 
    // =============== SETTINGS: CHANGE PASSWORD ===============
    document.getElementById("btnChangePassword").addEventListener("click", () => {
        const form = document.getElementById("editFormPassword");
        form.style.display = form.style.display !== "none" ? "none" : "block";
        if (form.style.display === "block") document.getElementById("inputOldPassword").focus();
    });
 
    document.getElementById("savePassword").addEventListener("click", () => {
        const oldPass = document.getElementById("inputOldPassword").value;
        const newPass = document.getElementById("inputNewPassword").value.trim();
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("userDB")) || [];
 
        const idx = users.findIndex(u => u.username === user.username);
        if (idx === -1) { alert("Akun tidak ditemukan."); return; }
 
        if (users[idx].password !== oldPass) {
            alert("Password lama salah!");
            return;
        }
        if (!newPass || newPass.length < 6) {
            alert("Password baru minimal 6 karakter!");
            return;
        }
 
        users[idx].password = newPass;
        localStorage.setItem("userDB", JSON.stringify(users));
 
        user.password = newPass;
        localStorage.setItem("currentUser", JSON.stringify(user));
 
        alert("Password berhasil diperbarui!");
        document.getElementById("editFormPassword").style.display = "none";
        document.getElementById("inputOldPassword").value = "";
        document.getElementById("inputNewPassword").value = "";
    });
 
    document.getElementById("cancelPassword").addEventListener("click", () => {
        document.getElementById("editFormPassword").style.display = "none";
    });
 
    // =============== SETTINGS: DELETE ACCOUNT ===============
    document.getElementById("btnDeleteAccount").addEventListener("click", () => {
        const form = document.getElementById("deleteConfirmForm");
        form.style.display = form.style.display !== "none" ? "none" : "block";
        if (form.style.display === "block") document.getElementById("inputDeletePassword").focus();
    });
 
    document.getElementById("cancelDeleteAccount").addEventListener("click", () => {
        document.getElementById("deleteConfirmForm").style.display = "none";
        document.getElementById("inputDeletePassword").value = "";
    });
 
    document.getElementById("confirmDeleteAccount").addEventListener("click", () => {
        const enteredPass = document.getElementById("inputDeletePassword").value;
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const users = JSON.parse(localStorage.getItem("userDB")) || [];
 
        const idx = users.findIndex(u => u.username === user.username);
        if (idx === -1) { alert("Akun tidak ditemukan."); return; }
 
        if (users[idx].password !== enteredPass) {
            alert("Password salah. Penghapusan akun dibatalkan.");
            return;
        }
 
        const confirmed = confirm(`Apakah kamu yakin ingin menghapus akun "${user.username}" secara permanen?`);
        if (!confirmed) return;
 
        // Remove user from DB and clear session
        users.splice(idx, 1);
        localStorage.setItem("userDB", JSON.stringify(users));
        localStorage.removeItem("currentUser");
        localStorage.removeItem("history_" + user.username);
 
        alert("Akun kamu telah dihapus. Sampai jumpa!");
        window.location.href = "index.html";
    });
});
 
// =============== GLOBAL: LOGOUT FUNCTION ===============
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}