export default (date: Date) => {
  const month = date.toLocaleString('default', { month: 'long' });
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
};
