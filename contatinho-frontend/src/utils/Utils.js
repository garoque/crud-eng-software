export const formatData = input => {
    const datePart = input.match(/\d+/g)
    const year = datePart[0]
    const month = datePart[1]
    const day = datePart[2]

  
    return day + '/' + month + '/' + year;
}