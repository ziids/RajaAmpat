document.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("latestReservation");

    if (!savedData) {
        alert("Data pesanan kosong! Silakan isi form pesanan terlebih dahulu.");
        window.location.href = "order.html";
        return;
    }

    const data = JSON.parse(savedData);
    const container = document.getElementById("resumeContainer");

    container.innerHTML = `
        <div class="data-row">
            <div class="data-label">Nama</div>
            <div class="data-colon">:</div>
            <div class="data-value">${data.nama}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Jumlah Peserta</div>
            <div class="data-colon">:</div>
            <div class="data-value">${data.peserta} Orang</div>
        </div>
        <div class="data-row">
            <div class="data-label">Waktu Perjalanan</div>
            <div class="data-colon">:</div>
            <div class="data-value">${data.waktu} Hari</div>
        </div>
        <div class="data-row">
            <div class="data-label">Layanan Paket</div>
            <div class="data-colon">:</div>
            <div class="data-value" style="text-align: right;">${data.layanan}</div>
        </div>
        <div class="data-row">
            <div class="data-label">Harga Paket</div>
            <div class="data-colon">:</div>
            <div class="data-value">${data.hargaPaket}</div>
        </div>
        <div class="data-row total-row">
            <div class="data-label">Jumlah Tagihan</div>
            <div class="data-colon">:</div>
            <div class="data-value">${data.totalTagihan}</div>
        </div>
    `;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        const isAlreadySaved = sessionStorage.getItem("orderSaved_" + data.nama);
        if (!isAlreadySaved) {
            let orderHistory = JSON.parse(localStorage.getItem("history_" + currentUser.username)) || [];

            data.tanggalOrder = new Date().toLocaleDateString('id-ID');
            orderHistory.push(data);
            localStorage.setItem("history_" + currentUser.username, JSON.stringify(orderHistory));
            sessionStorage.setItem("orderSaved_" + data.nama, "true");
        }
    }
});

function hapusCache() {
    localStorage.removeItem("latestReservation");
}