document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hardcoded login check for demo purposes
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === "operator" && password === "password123") {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('p2h-form').style.display = 'block';
    } else {
        alert('Login failed. Please try again.');
    }
});

// Export to PDF
document.getElementById('export-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.querySelector('table');
    let content = table.innerHTML;

    doc.html(content, {
        callback: function (doc) {
            doc.save('p2h-checklist.pdf');
        }
    });
});

// Export to Excel
document.getElementById('export-excel').addEventListener('click', function () {
    // Ambil data form
    const operatorName = document.getElementById('operator-name').value;
    const machineId = document.getElementById('machine-id').value;

    // Ambil status dari setiap komponen
    const checklist = [
        { Komponen: "Power Supply", Status: document.querySelector('[name="power-supply-status"]').value },
        { Komponen: "Hydraulic Unit", Status: document.querySelector('[name="hydraulic-unit-status"]').value },
        { Komponen: "Crimp Dies", Status: document.querySelector('[name="crimp-dies-status"]').value },
        { Komponen: "Cylinder Movement", Status: document.querySelector('[name="cylinder-movement-status"]').value },
        { Komponen: "Control Panel", Status: document.querySelector('[name="control-panel-status"]').value },
        { Komponen: "Grease Point", Status: document.querySelector('[name="grease-point-status"]').value },
        { Komponen: "Emergency Stop", Status: document.querySelector('[name="emergency-stop-status"]').value }
    ];

    // Format data untuk Excel
    const data = [
        ["Nama Operator", operatorName],
        ["ID Mesin", machineId],
        [],
        ["Komponen", "Status"]
    ];

    checklist.forEach(item => {
        data.push([item.Komponen, item.Status]);
    });

    // Buat worksheet dan workbook
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "P2H");

    // Simpan file
    XLSX.writeFile(wb, `P2H_${operatorName || 'operator'}.xlsx`);
});

});

document.getElementById('p2h-checklist').addEventListener('submit', function (e) {
    const photoInput = document.getElementById('photo-upload');
    if (!photoInput.files || photoInput.files.length === 0) {
        alert("Silakan upload gambar terlebih dahulu sebelum submit.");
        e.preventDefault();
        return false;
    }

    alert("Checklist berhasil disubmit!");
    // Lanjutkan proses submit sesuai backend atau penyimpanan yang Anda pakai
});
