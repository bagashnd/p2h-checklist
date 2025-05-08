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
document.getElementById('export-excel').addEventListener('click', function() {
    const table = document.querySelector('table');
    const wb = XLSX.utils.table_to_book(table, {sheet: "P2H Checklist"});
    XLSX.writeFile(wb, 'p2h-checklist.xlsx');
});
