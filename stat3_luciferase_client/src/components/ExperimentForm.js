import { useState, useEffect } from 'react'

function ExperimentForm(){
    const [date, setDate] = useState()
   
    useEffect(() => {
        let dateObj = new Date()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let month = String(dateObj.getMonth() + 1).padStart(2, '0')
        let year = dateObj.getFullYear();
        let todaysDate = year + '-' + month + '-' + day
        setDate(todaysDate)
    }, [])

    return(
        <div>
            <form>
                <h3>Add Experiment</h3>
                <p>Date: <input value={date} type="date"/></p>
            
                <p>WT Firefly: <input type="number"/></p>
                <p>WT Renilla: <input type="number"/></p>

                <input type="submit" />
            </form>
        </div>
    )
}

export default ExperimentForm