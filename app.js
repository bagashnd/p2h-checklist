function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const ws_data = [];

  ws_data.push(["Komponen", "Status", "Remarks"]);
  
  document.querySelectorAll("table tbody tr").forEach(row => {
    const cells = row.querySelectorAll("td");
    const komponen = cells[0].innerText;
    const status = cells[1].querySelector("select").value;
    const remarks = cells[2].querySelector("input").value;
    ws_data.push([komponen, status, remarks]);
  });

  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Checklist");
  XLSX.writeFile(wb, "P2H-Crimping.xlsx");
}
