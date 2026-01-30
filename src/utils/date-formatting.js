// Format date to match UI style (e.g., "15 Jan 2024")
export function formatDate(dateString, prefix = '') {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return null;

    const day = date.getDate();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${prefix}${day} ${month} ${year}`;
  } catch {
    return null;
  }
}
