// src/controllers/StatistikController.js
const { Parser } = require("json2csv");
const statistikRepo = require("../repositories/StatistikRepository");

const exportCsv = async (req, res) => {
  try {
    // ambil data saldo cuti (sesuai log kamu)
    const data = await statistikRepo.getSaldoCutiWithEmployee(); 
    // ⬆️ bikin repo baru kalo belum ada, nanti query join saldo + employee + jenisCuti

    // Flatten data biar csv gampang
    const flatData = data.map(item => ({
      id_saldo: item.id_saldo,
      tahun: item.tahun,
      sisa_hari: item.sisa_hari,
      nama: item.employee?.nama,
      nip: item.employee?.nip,
      jabatan: item.employee?.jabatan,
      divisi: item.employee?.id_divisi,
      jenis_cuti: item.jenisCuti?.nama_cuti,
    }));

    const fields = [
      "id_saldo",
      "tahun",
      "sisa_hari",
      "nama",
      "nip",
      "jabatan",
      "divisi",
      "jenis_cuti"
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(flatData);

    res.header("Content-Type", "text/csv");
    res.attachment("saldo_cuti.csv");
    res.send(csv);
  } catch (err) {
    console.error("ERROR EXPORT CSV:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  exportCsv,
};
