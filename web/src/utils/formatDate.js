const formatDate = (date) => {
  const originalDate = new Date(date);
  let month = originalDate.getMonth() + 1;
  let day = originalDate.getDate() + 1;
  const year = originalDate.getFullYear();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  const convertedDate = `${year}-${month}-${day}`;
  return convertedDate;
};

export default formatDate;
