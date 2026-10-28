export function formatNaira(amount) {
  const num = typeof amount === 'number' ? amount : Number(amount) || 0;
  return `₦${num.toLocaleString('en-NG')}`;
}

export function formatDateString(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-NG', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function generateGoogleCalendarUrl(title, description, location, dateStr) {
  const cleanTitle = encodeURIComponent(title || 'Event');
  const cleanDesc = encodeURIComponent(description || '');
  const cleanLoc = encodeURIComponent(location || '');

  try {
    const d = new Date(dateStr);
    const startIso = d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${cleanTitle}&details=${cleanDesc}&location=${cleanLoc}&dates=${startIso}/${startIso}`;
  } catch {
    return '#';
  }
}
