export function dateAdapter(dateString: string) {
  // Buat Date object
  const date = new Date(dateString);

  // Format ke Indonesia
  const formatted = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatted;
}
