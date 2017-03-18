UI.registerHelper('dateFormat', (query) => {
  const date = new Date(query);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
  return formattedDate;
});
