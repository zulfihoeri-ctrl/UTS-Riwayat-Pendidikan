document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Inisialisasi sql.js dengan file wasm
        const SQL = await initSqlJs({
            locateFile: file => file
        });

        // Memuat file database riwayat.db
        const response = await fetch("riwayat.db");
        const buffer = await response.arrayBuffer();
        const db = new SQL.Database(new Uint8Array(buffer));

        // Mengambil data dari tabel riwayat sesuai permintaan soal
        const res = db.exec("SELECT nama_sekolah, tahun_masuk, tahun_lulus, keterangan FROM riwayat;");
        
        if (res.length > 0) {
            const values = res[0].values;
            const tbody = document.querySelector("#tabel-riwayat tbody");
            tbody.innerHTML = ""; // Kosongkan tabel awal

            // Masukkan data baris demi baris ke HTML
            values.forEach(row => {
                const tr = document.createElement("tr");
                row.forEach(cellData => {
                    const td = document.createElement("td");
                    td.textContent = cellData;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        }
    } catch (err) {
        console.error("Gagal memuat database SQLite:", err);
    }
});