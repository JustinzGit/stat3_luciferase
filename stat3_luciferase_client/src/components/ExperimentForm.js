import { useState, useEffect } from 'react'

function ExperimentForm(){
    const [date, setDate] = useState()
    const [luciferaseValues, setLuciferaseValues] = useState({})
   
    useEffect(() => {
        let dateObj = new Date()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let month = String(dateObj.getMonth() + 1).padStart(2, '0')
        let year = dateObj.getFullYear();
        let todaysDate = year + '-' + month + '-' + day
        setDate(todaysDate)
    }, [])

    function handleFormChange(event){
        const plasmidEntry = event.target.name
        const luciferaseValue = event.target.value
        setLuciferaseValues({
            ...luciferaseValues, 
            [plasmidEntry]: luciferaseValue
        })

    }

    return(
        <div>
            <form>
                <h3>Add Experiment</h3>
                <p>Date: <input value={date} type="date"/></p>
            
                <p>WT Firefly: <input onChange={handleFormChange} type="number" name="wt_firefly" /></p>
                <p>WT Renilla: <input onChange={handleFormChange} type="number" name="wt_renilla" /></p>
                <p>Firefly: {luciferaseValues.wt_firefly}</p>
                <p>Renilla: {luciferaseValues.wt_renilla}</p>

                <input type="submit" />
            </form>
        </div>
    )
}

export default ExperimentForm