const arr = [{title:"Kobra Kai", rowNum: 0, isChecked: false},
{title:"I think you should leave", rowNum: 0, isChecked: false},
{title:"The witcher", rowNum: 0, isChecked: true},
{title:"She Hulk", rowNum: 0, isChecked: false},
{title:"birdbox", rowNum: 0, isChecked: true},
{title:"pastor stu", rowNum: 0, isChecked: false},
{title:"deadwood", rowNum: 0, isChecked: false},
{title:"Pleasantville", rowNum: 0, isChecked: false}]

// set rowNum val to char code of 1st letter (lowercase)
const rowNumFromStr = (arr) => {
  arr.forEach(s => {
  const c = s.title[0].toLowerCase().charCodeAt(0)
  s.rowNum = c
  })
}

const selectionSort = (arr) => {
    let noSwapsOnLastIteration
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i
        noSwapsOnLastIteration = true
        for (let j = i + 1; j < arr.length; j++) {
            if(arr[j].rowNum < arr[minIdx].rowNum) minIdx  = j
        }
        if (minIdx !== i) {
            noSwapsOnLastIteration = false
            tmpVal = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = tmpVal
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

/* arr is sorted after selectionSort ==> set rowNum to val of index */
const setRowNum = (arr) => {
  arr.forEach((item, idx) => {
    item.rowNum = idx
  })
}

rowNumFromStr(arr)
selectionSort(arr)
moveCheckedItemsToEnd(arr)
setRowNum(arr)
console.log(arr) 

/*