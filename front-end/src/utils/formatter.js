export const formatterToVND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const formatPaymentDate = (payDate) => {
    if (!payDate) return "";
    // Convert yyyyMMddHHmmss to readable format
    const year = payDate.substring(0, 4);
    const month = payDate.substring(4, 6);
    const day = payDate.substring(6, 8);
    const hour = payDate.substring(8, 10);
    const minute = payDate.substring(10, 12);
    const second = payDate.substring(12, 14);
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dayName = format(date, 'EEEE', { locale: vi });
  // Capitalize first letter of day name
  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  return `${capitalizedDayName}, ${format(date, 'dd/MM/yy')}`;
};