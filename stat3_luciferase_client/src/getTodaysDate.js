export default function getTodaysDate(){
    let dateObj = new Date()
    let day = String(dateObj.getDate()).padStart(2, '0')
    let month = String(dateObj.getMonth() + 1).padStart(2, '0')
    let year = dateObj.getFullYear();
    let todaysDate = year + '-' + month + '-' + day
    return todaysDate
}