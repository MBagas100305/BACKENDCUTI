function hitungSaldoCuti(jenisCuti, tanggalMasuk) {
  const tahunMasuk = new Date(tanggalMasuk).getFullYear();
  const tahunSekarang = new Date().getFullYear();
  const masaKerja = tahunSekarang - tahunMasuk;

  if (jenisCuti === "Tahunan") {
   let saldo = 12;
    if (masaKerjaTahun > 30) saldo += 3;
    else if (masaKerjaTahun > 20) saldo += 2;
    else if (masaKerjaTahun > 10) saldo += 1;
    return saldo;
  }

  if (jenisCuti === "Besar") {
  // cuti besar: 26 hari berlaku setiap 4 tahun
  const tahunAwalPeriode = tahunMasuk + Math.floor(masaKerja / 4) * 4;
  const tahunAkhirPeriode = tahunAwalPeriode + 3; // berlaku 4 tahun

  return {
    saldo: 26,  
    berlaku_dari: tahunAwalPeriode,
    berlaku_sampai: tahunAkhirPeriode
  };
}
  return 0;
}
