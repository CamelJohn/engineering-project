module.exports = (files, fileName) => {  
  
  let out = files.split('\n');
  out.pop();

  return out.filter(f => f.includes(fileName));
}