function submitToDatabase(event) {
  event.preventDefault();

  const form = document.getElementById("checklistForm");
  const formData = {
    nama: form.nama.value,
    tanggal: form.tanggal.value,
    asset: form.asset.value,
    lokasi: form.lokasi.value,
    checklist: []
  };

  checklistItems.forEach(group => {
    group.items.forEach(item => {
      const radios = form.querySelectorAll(`input[name='${item}']`);
      const selected = [...radios].find(r => r.checked)?.value || "";
      const remark = form.querySelector(`input[name='${item}_remark']`)?.value || "";
      formData.checklist.push({ item, status: selected, remark });
    });
  });

  fetch("https://your-api-server.com/api/checklist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(res => {
    if (res.ok) {
      alert("Checklist berhasil disimpan ke database.");
      exportToExcel();
    } else {
      alert("Gagal menyimpan checklist.");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Terjadi kesalahan koneksi.");
  });
}
