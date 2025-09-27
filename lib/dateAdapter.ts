export function dateAdapter(isoDate: string) {
  const date = new Date(isoDate);

  // Array bulan untuk versi manual
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // --- Bagian Tanggal ---
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  // --- Bagian Waktu ---
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return {formattedDate, formattedTime}
}
