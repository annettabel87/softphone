const optionsDate = {
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const getFormattedDate = (date) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString('ru-RU', optionsDate);
};

export default getFormattedDate;
