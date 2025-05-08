document.getElementById('export-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const operator = document.getElementById('operator-name').value;
    const machine = document.getElementById('machine-id').value;
    const table = document.querySelector('table');

    // Tambah header teks
    doc.setFontSize(14);
    doc.text("Laporan P2H Crimping Machine", 10, 10);
    doc.setFontSize(12);
    doc.text(`Nama Operator: ${operator}`, 10, 20);
    doc.text(`ID Mesin: ${machine}`, 10, 28);

    // Ekstrak isi tabel dan cetak
    let y = 40;
    table.querySelectorAll("tr").forEach(row => {
        let text = '';
        row.querySelectorAll("td, th").forEach(cell => {
            text += cell.innerText + " | ";
        });
        doc.text(text.trim(), 10, y);
        y += 8;
    });

    // Tambahkan gambar upload
    const fileInput = document.getElementById('photo-upload');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgData = e.target.result;

            // Tambah label & gambar ke PDF
            doc.setFontSize(12);
            doc.text("Foto Kondisi Mesin:", 10, y + 10);
            doc.addImage(imgData, 'JPEG', 10, y + 15, 80, 60); // (x, y, width, height)
            doc.save("p2h-checklist.pdf");
        };
        reader.readAsDataURL(file);
    } else {
        doc.save("p2h-checklist.pdf");
    }
});
