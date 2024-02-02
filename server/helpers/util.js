function dbFields(fields) {
    const insert = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    // then we can use: (${ insert }) in our string template
    
    // need something like $1, $2, $3
    const select = Object.keys(fields).map(
      (_, index) => `$${index + 1}`).join(', ');
    // then we can use (${ select }) in our string template
  
    const vals = Object.values(fields);
    return {insert, select, vals};
  }
  
  
  module.exports = {
    dbFields,
  }