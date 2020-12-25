import { useState, useEffect } from 'react'
import useVariantList from '../hooks/useVariantList'
import MutationInputs from './MutationInputs'

function ExperimentForm(){
    const [variantList] = useVariantList()

    // On mount, render todays date
    const [date, setDate] = useState('')
    useEffect(() => {
        let dateObj = new Date()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let month = String(dateObj.getMonth() + 1).padStart(2, '0')
        let year = dateObj.getFullYear();
        let todaysDate = year + '-' + month + '-' + day
        setDate(todaysDate)
    }, [])

    // Handle state for WT luciferase values
    const [wtValues, setWtValues] = useState({ wt_firefly: '', wt_renilla: ''})
    function handleWtChange(event){
        setWtValues({...wtValues, [event.target.name]: event.target.value})
    }

    // Handle state for MT luciferase values
    const blankMtEntry = {mutation: '', firefly: '', renilla: ''}
    const [mtValues, setMtValues] = useState([{...blankMtEntry}])
    function handleMtChange(event){
        const updatedMtValues = [...mtValues]
        updatedMtValues[event.target.dataset.index][event.target.className] = event.target.value
        setMtValues(updatedMtValues)
    }
    
    // Add blank entries to mtValues  
    function addMutation(){
        setMtValues([...mtValues, {...blankMtEntry}])
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(date)
        console.log(wtValues)
        console.log(mtValues)
    }

    return(
        <div id="experiment_form">
            <form onSubmit={handleSubmit}>
                <h3>Add Experiment</h3>
                <p>Date: <input value={date} type="date" onChange={event => setDate(event.target.value)}/></p>

                <p>WT Firefly: <input onChange={handleWtChange} value={wtValues.wt_firefly} type="number" name="wt_firefly" /></p>
                <p>WT Renilla: <input onChange={handleWtChange} value={wtValues.wt_renilla} type="number" name="wt_renilla" /></p>
                
                <p><input onClick={addMutation} type="button" value="Add Mutation"/></p>
                {
                    mtValues.map((values, index) => (
                        <MutationInputs
                            key={index} 
                            index={index}
                            mtValues={mtValues}
                            variantList={variantList}
                            handleMtChange={handleMtChange} />
                    ))
                }
                <input type="submit" value="Add Experiment" />
            </form>
        </div>
    )
}

export default ExperimentForm