document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const paket = params.get("paket");

    const paketMap = {
        hemat: "paketHemat",
        santai: "paketSantai",
        puas: "paketPuas"
    };

    if (paketMap[paket]) {
        document.getElementById(paketMap[paket]).checked = true;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Akses ditolak! Lo harus login dulu sebelum bisa memesan paket wisata.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("namaPemesan").value = currentUser.username;

    const form = document.getElementById("orderForm");
    const waktuInput = document.getElementById("waktuPerjalanan");
    const pesertaInput = document.getElementById("jumlahPeserta");
    const radios = document.querySelectorAll(".layanan-radio");
    
    const hargaPaketField = document.getElementById("hargaPaket");
    const jumlahTagihanField = document.getElementById("jumlahTagihan");

    function formatRupiah(angka) {
        return "Rp " + angka.toLocaleString('id-ID');
    }

    function hitungKalkulasi() {
        let hargaPaketPerjalanan = 0;

        const paketTerpilih = document.querySelector('input[name="paketWisata"]:checked');
        if (paketTerpilih) {
            hargaPaketPerjalanan = parseInt(paketTerpilih.value);
        }

        const waktu = parseInt(waktuInput.value) || 0;
        const peserta = parseInt(pesertaInput.value) || 0;

        const jumlahTagihan = waktu * peserta * hargaPaketPerjalanan;

        hargaPaketField.value = formatRupiah(hargaPaketPerjalanan);
        jumlahTagihanField.value = formatRupiah(jumlahTagihan);
    }

    waktuInput.addEventListener("input", hitungKalkulasi);
    pesertaInput.addEventListener("input", hitungKalkulasi);
    radios.forEach(radio => {
        radio.addEventListener("change", hitungKalkulasi);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const paketTerpilih = document.querySelector('input[name="paketWisata"]:checked');
        if (!paketTerpilih) {
            alert("Pilih paket perjalanannya dulu bro!");
            return;
        }

        let namaPaket = "";
        if(paketTerpilih.id === "paketHemat") namaPaket = "Paket Hemat";
        if(paketTerpilih.id === "paketSantai") namaPaket = "Paket Santai";
        if(paketTerpilih.id === "paketPuas") namaPaket = "Paket Puas";

        function generateId(prefix = "ORD") {
            const timestamp = Date.now();
            return `${prefix}-${timestamp}`;
        }

        const dataPesanan = {
            id: generateId("ORD"),
            nama: document.getElementById("namaPemesan").value,
            nomorTelp: document.getElementById("nomorTelp").value,
            waktu: waktuInput.value,
            peserta: pesertaInput.value,
            layanan: namaPaket,
            hargaPaket: hargaPaketField.value,
            totalTagihan: jumlahTagihanField.value,
            tanggalOrder: new Date().toLocaleDateString('id-ID')
        };

        let orderHistory = JSON.parse(localStorage.getItem("history_" + currentUser.username)) || [];
        orderHistory.push(dataPesanan);
        
        localStorage.setItem("history_" + currentUser.username, JSON.stringify(orderHistory));

        localStorage.setItem("latestReservation", JSON.stringify(dataPesanan));
        window.location.href = "resume.html";
    });
});