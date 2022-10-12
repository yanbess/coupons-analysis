export function calcAverage(array = [], max) {
  let result = 0

  const avg = Math.round(max / 2)

  let previousValue = max
  array.forEach((currentValue) => {
    const diff = Math.abs(avg - currentValue)

    if (diff < previousValue) {
      result = currentValue
      previousValue = diff
    }
  })

  return result
}
