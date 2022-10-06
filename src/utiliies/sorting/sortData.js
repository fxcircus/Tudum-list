// title column - set rowNum val to char code of 1st letter (lowercase)
const rowNumFromStr = (arr) => {
  arr.forEach(s => {
  const c = s.title[0].toLowerCase().charCodeAt(0)
  s.rowNum = c
  })
}

const rowNumFromRank = (arr, direction) => {
  arr.forEach(i => {
    if(i.isChecked) {
      i.rowNum = 6
    } else {
      i.rowNum = direction ? i.rank : 5 - i.rank
    }
  })
  return arr
}

const selectionSortAsc = (arr) => {
    let noSwapsOnLastIteration
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i
        noSwapsOnLastIteration = true
        for (let j = i + 1; j < arr.length; j++) {
            if(arr[j].rowNum < arr[minIdx].rowNum) minIdx  = j
        }
        if (minIdx !== i) {
            noSwapsOnLastIteration = false
            const tmpVal = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = tmpVal
        }
    if (noSwapsOnLastIteration) break
    }
    return arr
}

const selectionSortDsc = (arr) => {
  let noSwapsOnLastIteration
  for (let i = 0; i < arr.length; i++) {
      let maxIdx = i
      noSwapsOnLastIteration = true
      for (let j = i + 1; j < arr.length; j++) {
        if(arr[j].rowNum > arr[maxIdx].rowNum) maxIdx  = j
      }
      if (maxIdx !== i) {
          noSwapsOnLastIteration = false
          const tmpVal = arr[i]
          arr[i] = arr[maxIdx]
          arr[maxIdx] = tmpVal
      }
  if (noSwapsOnLastIteration) break
  }
  return arr
}

// Move items where isChecked val is "true" to end of list
const moveCheckedItemsToEnd = (arr) => {
  const itemsToMove = []
  arr.forEach((item, idx) => {
    if (item.isChecked) {
      itemsToMove.push(idx)
    }
  })
  let drag = 0
  for (let i = 0; i < itemsToMove.length; i++) {
    const idx = itemsToMove[i] - drag
    const tmp = arr[idx]
    arr.splice(idx, 1)
    arr.push(tmp)
    drag++
  }
}

// arr is sorted after selectionSort ==> set rowNum to val of index
const setRowNum = (arr) => {
  arr.forEach((item, idx) => {
    item.rowNum = idx
  })
}

export function sortItemsArr(arr, column = "title", order = "↓") {
  if (column === "title") {
    rowNumFromStr(arr)
    order === "↓" ? selectionSortAsc(arr) : selectionSortDsc(arr)
    moveCheckedItemsToEnd(arr)
    setRowNum(arr)
  } else if (column === "rank") {
    order === "↓" ? rowNumFromRank(arr, true) : rowNumFromRank(arr, false)
  } else {

  }
  
  return arr
}