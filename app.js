document.getElementById('export-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ambil data
    const operator = document.getElementById('operator-name').value;
    const machine = document.getElementById('machine-id').value;
    const table = document.querySelector('table').cloneNode(true);

    // Tambahkan judul dan info
    doc.setFontSize(14);
    doc.text("Laporan P2H Crimping Machine", 10, 10);
    doc.setFontSize(12);
    doc.text(`Nama Operator: ${operator}`, 10, 20);
    doc.text(`ID Mesin: ${machine}`, 10, 28);

    // Konversi tabel ke teks lalu export
    let y = 38;
    table.querySelectorAll("tr").forEach((row, i) => {
        let text = '';
        row.querySelectorAll("td, th").forEach(cell => {
            text += cell.innerText + " | ";
        });
        doc.text(text.trim(), 10, y);
        y += 8;
    });

    doc.save("p2h-checklist.pdf");
});
