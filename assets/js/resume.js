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
});

function hapusCache() {
    localStorage.removeItem("latestReservation");
}