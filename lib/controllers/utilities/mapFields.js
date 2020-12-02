module.exports = (dto, field) => {
  let res = dto.map(course => {
    
    [0, 1, 2].forEach(i => {
      if (course[field][i] && course[field][i].name == undefined) {
        delete course[field][i];
      }
    });

    return field == 'course' ? {...course[field]} : course[field].map(f => f);
  });

  return field != 'course' ? res.filter(i => i.length > 0).flat() : res.flat();  
};
