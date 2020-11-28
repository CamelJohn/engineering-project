let relevantFields = [ 'prc1', 'prn1', 'crc1', 'crn1', 'code', 'points', 'prc2', 'prn2', 'crc2', 'crn2', 'prc3', 'prn3', 'crc3', 'crn3' ];

module.exports = dto => {
  let mapped = [];

  dto.forEach((row, idx, arr) => {
    // console.log(row.code, row.name)
    // if (!row.code && !row.name) console.log(arr[idx-1], row, arr[idx +1]);

    if (row.name === 'אנגלית' || row.name === 'כללי') {
      mapped.push(row);
    }
    // last is not empty, current is not empty, next is not empty -> full
    if (!checkLast(idx, arr) && !checkCurrent(idx, arr) && !checkNext(idx, arr)) {
      mapped.push(row);
    }
    // last is not empty, current is not empty, next is empty -> before
    // if (!checkLast(idx, arr) && !checkCurrent(idx, arr) && checkNext(idx, arr)) {
    //   // handle single -> skip for now and handle in 'single'
    // }
    // last is not empty, current is empty, next is not empty -> single
    if (
      !checkLast(idx, arr) &&
      checkCurrent(idx, arr) &&
      !checkNext(idx, arr) &&
      (row.name !== 'אנגלית' || row.name !== 'כללי')
    ) {
      // handle single
      mapped.push(mapRow(idx, arr, 'single'));
    }
    // last is not empty, current is empty, next is empty -> first in chain
    if (!checkLast(idx, arr) && checkCurrent(idx, arr) && checkNext(idx, arr)) {
      // handle first in chain
      mapped.push(mapRow(idx, arr, 'first'));
    }
    // last is empty, current is empty, next is not empty -> second in chain
    // if (checkLast(idx, arr) && checkCurrent(idx, arr) && !checkNext(idx, arr)) {
    //   // handle second in chain -> handled in 'firs' case
    // }
    // last is empty, current is not empty, next is not empty -> after
    if (checkLast(idx, arr) && !checkCurrent(idx, arr) && !checkNext(idx, arr)) {
      mapped.push(row);
    }
  });
  return mapDependencies(mapped);
  // return mapped;
};

function checkLast(idx, arr) {
  if (idx > 0) {
    if (arr[idx - 1].code) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function checkCurrent(idx, arr) {
  if (arr[idx].code) {
    return false;
  } else {
    return true;
  }
}

function checkNext(idx, arr) {
  if (idx < arr.length - 1) {
    if (arr[idx + 1].code) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function mapRow(idx, arr, type) {
  // handle single -> map to [idx - 1];
  if (type === 'single') {
    return handleSingle(idx, arr);
  }
  // handle first
  if (type === 'first') {
    return handleFirst(idx, arr);
  }
  // handle second -> map to [idx - 2] & map [idx - 1] to [idx - 2];
  if (type === 'second') {
    return handleSecond(idx, arr);
  }
}

function handleSingle(idx, arr) {
  let row = { ...arr[idx - 1] };

  for (let [field] of Object.entries(arr[idx])) {
    if (arr[idx][field] !== undefined && relevantFields.includes(field)) {
      if (field === 'code') {
        row['code1'] = arr[idx][field];
      }
      if (field === 'points') {
        row['points1'] = arr[idx][field];
      }
      if (field === 'prc1') {
        row['prc2'] = arr[idx].prc1;
      }
      if (field === 'prn1') {
        row['prn2'] = arr[idx].prn1;
      }
      if (field === 'crc1') {
        row['crc2'] = arr[idx].crc1;
      }
      if (field === 'crn1') {
        row['crn2'] = arr[idx].crn1;
      }
    }
  }
  return row;
}

function handleFirst(idx, arr) {
  let row = { ...arr[idx - 1] };
  for (let [field] of Object.entries(arr[idx - 1])) {
    if (arr[idx][field] !== undefined && relevantFields.includes(field)) {
      if (field === 'code') {
        row['code1'] = arr[idx][field];
      }
      if (field === 'points') {
        row['points1'] = arr[idx][field];
      }
      if (field === 'prc1') {
        row['prc2'] = arr[idx].prc1;
      }
      if (field === 'prn1') {
        row['prn2'] = arr[idx].prn1;
      }
      if (field === 'crc1') {
        row['crc2'] = arr[idx].crc1;
      }
      if (field === 'crn1') {
        row['crn2'] = arr[idx].crn1;
      }
      if (field === 'crc2') {
        row['crc3'] = arr[idx].crc2;
      }
      if (field === 'crn2') {
        row['crn3'] = arr[idx].crn2;
      }
    }
  }
  return handleSecond(idx + 1, arr, row);
}

function handleSecond(idx, arr, first) {
  let row = { ...first };
  for (let [field] of Object.entries(first)) {
    if (arr[idx][field] !== undefined && relevantFields.includes(field)) {
      // console.log(field);

      if (field === 'code') {
        row['code2'] = arr[idx][field];
      }
      if (field === 'points') {
        row['points2'] = arr[idx][field];
      }
      if (field === 'prc1') {
        row['prc3'] = arr[idx].prc1;
      }
      if (field === 'prn1') {
        row['prn3'] = arr[idx].prn1;
      }
      if (field === 'crc1') {
        row['crc2'] = arr[idx].crc1;
      }
      if (field === 'crn1') {
        row['crn2'] = arr[idx].crn1;
      }
      if (field === 'crc2') {
        row['crc3'] = arr[idx].crc2;
      }
      if (field === 'crn2') {
        row['crn3'] = arr[idx].crn2;
      }
    }
  }
  return row;
}

function mapDependencies(dto) {
  return dto.map((r, i, arr) => {

    if (r.prc1) {
      r['prc1y'] = arr[i].year;
      r['prc1s'] = arr[i].semester;
    }

    if (r.prc2) {
      r['prc1y'] = arr[i].year;
      r['prc1s'] = arr[i].semester;
    }
    if (r.prc3) {
      r['prc1y'] = arr[i].year;
      r['prc1s'] = arr[i].semester;
    }
   
    if (r.crc1) {
      r['crc1y'] = arr[i].year;
      r['crc1s'] = arr[i].semester;
    }

    if (r.crc2) {
      r['crc1y'] = arr[i].year;
      r['crc1s'] = arr[i].semester;
    }
    if (r.crc3) {
      r['crc1y'] = arr[i].year;
      r['crc1s'] = arr[i].semester;
    }
    
    return r;   
  });  
}
