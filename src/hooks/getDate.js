export function getDate(date = new Date()) {
  // const date = new Date()
  const year = date.getFullYear()
  const month = `0${1 + date.getMonth()}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)

  return `${year}-${month}-${day} 00:00:00.000`
}
export function getMonth(date = new Date()) {
  // const date = new Date()
  const year = date.getFullYear()
  const month = `0${1 + date.getMonth()}`.slice(-2)


  return `${year}-${month}`
}
