module.exports = dto => {  
  let mapped = [];

  dto.forEach((row, idx, arr) => {
    
    if (row.course.name === 'אנגלית' || row.course.name === 'כללי') {
      mapped.push(row);
    }
    // last is not empty, current is not empty, next is not empty -> full
    if (!checkLast(idx, arr) && !checkCurrent(idx, arr) && !checkNext(idx, arr)) {
      mapped.push(row);
    }
    // last is not empty, current is empty, next is not empty -> single
    if (
      !checkLast(idx, arr) &&
      checkCurrent(idx, arr) &&
      !checkNext(idx, arr) &&
      (row.course.name !== 'אנגלית' || row.course.name !== 'כללי')
    ) {
      // handle single
      mapped.push(mapRow(idx, arr, 'single'));
    }
    // last is not empty, current is empty, next is empty -> first in chain
    if (!checkLast(idx, arr) && checkCurrent(idx, arr) && checkNext(idx, arr)) {
      // handle first in chain
      mapped.push(mapRow(idx, arr, 'first'));
    }
    // last is empty, current is not empty, next is not empty -> after
    if (checkLast(idx, arr) && !checkCurrent(idx, arr) && !checkNext(idx, arr)) {
      mapped.push(row);
    }
 
  });
  // map all depencies
  return mapDependencies(mapped);
};

function checkLast(idx, arr) {
  return idx > 0 ? (arr[idx - 1].course.code ? false : true) : false;
}

function checkCurrent(idx, arr) {
  return arr[idx].course.code ? false : true;
}

function checkNext(idx, arr) {
  return idx < arr.length - 1 ? (arr[idx + 1].course.code ? false : true) : false;
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
    return handleSecond(idx, arr, arr[idx - 2]);
  }
}

function handleSingle(idx, arr) {
  // row before the current being dealt with
  let row = { ...arr[idx - 1] };  

  [0, 1, 2].forEach(index => {
    if (arr[idx]['preRequesites'][index].code || arr[idx]['preRequesites'][index].name) {
      row['preRequesites'][index + 1] = { ...arr[idx]['preRequesites'][index], course: row.course.code };
    }

    if (arr[idx]['concurrentRequesites'][index].code || arr[idx]['concurrentRequesites'][index].name) {
      row['concurrentRequesites'][index + 1] = { ...arr[idx]['concurrentRequesites'][index], course: row.course.code };
    }
  });
  
  return row;
}

function handleFirst(idx, arr) {
  let row = { ...arr[idx - 1] };
  [0, 1, 2].forEach(index => {
    if (arr[idx]['preRequesites'][index].code || arr[idx]['preRequesites'][index].name) {
      row['preRequesites'][index + 1] = { ...arr[idx]['preRequesites'][index], course: row.course.code };
    }

    if (arr[idx]['concurrentRequesites'][index].code || arr[idx]['concurrentRequesites'][index].name) {
      row['concurrentRequesites'][index + 1] = { ...arr[idx]['concurrentRequesites'][index], course: row.course.code };
    }
  });

  return handleSecond(idx + 1, arr, row);
}

function handleSecond(idx, arr, first) {
  let row = { ...first };  

  [0, 1, 2].forEach(index => {
    if (arr[idx]['preRequesites'][index].code || arr[idx]['preRequesites'][index].name) {
      row['preRequesites'][index + 2] = { ...arr[idx]['preRequesites'][index], course: row.course.code };
    }

    if (arr[idx]['concurrentRequesites'][index].code || arr[idx]['concurrentRequesites'][index].name) {
      row['concurrentRequesites'][index + 2] = { ...arr[idx]['concurrentRequesites'][index], course: row.course.code };
    }
  });
  return row;
}

function mapDependencies(dto) {
  return dto.map((r, i, arr) => {
    [0, 1, 2].forEach(index => {
      if (r['preRequesites'][index].code && !Boolean(r['preRequesites'][index].year)) {
      // if (r['preRequesites'][index].code && r['preRequesites'][index].year == undefined) {
        
        let { year, semester } = findRow(arr, r['preRequesites'][index].code);
        r['preRequesites'][index].year = year;
        r['preRequesites'][index].semester = semester;
      }
      if (
        r['concurrentRequesites'][index].code && 
        !Boolean(r['concurrentRequesites'][index].year) &&
        Boolean(r['concurrentRequesites'][index].name)
      ) {
        let { year, semester } = findRow(arr, r['concurrentRequesites'][index].code);
        r['concurrentRequesites'][index].year = year;
        r['concurrentRequesites'][index].semester = semester;
      }
    });
    return r;
  });
}

function findRow(arr, code) {
  let { course } = arr.find(({ course }) => course.code === code);
  return { year: course.year, semester: course.semester };
}