export function filter(arrayOne, callback) {
  let filteredArray = []
  let count = 0
  const arrayOneLength = arrayOne.length - 1
  const arrayTwoLength = arrayOne.length - 2
  let arrayTwo = [...new Set(arrayOne)]

  arrayTwo.forEach(arrayTwoEl => {
    arrayOne.filter((arrayOneEl, arrayOneIndex) => {
      if (arrayOneIndex <= arrayTwoLength) {
        if (arrayTwoEl === arrayOneEl) {
          count = count + 1
        }
      } else if (arrayOneIndex === arrayOneLength) {
        filteredArray.push({
          name: arrayTwoEl,
          count: count,
        })
        count = 0
      }
    })
  })
  filteredArray.sort((a, b) => b.count - a.count)
  callback(filteredArray)
  return filteredArray
}
