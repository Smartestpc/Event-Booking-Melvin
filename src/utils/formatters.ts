export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function formatDateString(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-NG', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function generateGoogleCalendarUrl(
  title: string,
  description: string,
  location: string,
  dateStr: string
): string {
  const cleanTitle = encodeURIComponent(title);
  const cleanDesc = encodeURIComponent(description);
  const cleanLoc = encodeURIComponent(location);
  
  // Create ISO string for start/end
  const d = new Date(dateStr);
  const startIso = d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${cleanTitle}&details=${cleanDesc}&location=${cleanLoc}&dates=${startIso}/${startIso}`;
}
