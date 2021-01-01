import { useState, useEffect } from 'react'
import useVariantList from '../hooks/useVariantList'
import MutationInputs from './MutationInputs'

function ExperimentForm(){
    const [variantList] = useVariantList()
    const [date, setDate] = useState('')

    const [experimentState, setExperimentState] = useState({
        experiment: {
            date: date,
            wt_firefly: '',
            wt_renilla: ''
        },
        luciferase_values: []
    })

    // State for WT Luciferase Values
    const [wtValues, setWtValues] = useState({ wt_firefly: '', wt_renilla: ''})

    // State for MT Luciferase Values
    const blankMtEntry = {protein_variant: '', variant_id: '', firefly: '', renilla: ''}
    const [mtValues, setMtValues] = useState([{...blankMtEntry}])

    // On mount, render todays date
    useEffect(() => {
        let dateObj = new Date()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let month = String(dateObj.getMonth() + 1).padStart(2, '0')
        let year = dateObj.getFullYear();
        let todaysDate = year + '-' + month + '-' + day
        setDate(todaysDate)
    }, [])

    // Set WT luciferase values
    function handleWtChange(event){
        setWtValues({...wtValues, [event.target.name]: event.target.value})
    }

    // Set MT luciferase values 
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

        // Store variant list in object for quick access to variant id
        const variantObject = {}
        variantList.map(entry => {
            return variantObject[entry.protein_variant] = entry
        })

        // Store variant id if variant exists in list
        mtValues.map(entry => {
            const mutation = entry['protein_variant']

            if (variantObject[mutation]){
                entry['variant_id'] = variantObject[mutation].id
            }
            else {
                entry['variant_id'] = false
            }
            return entry
        })

        // Prevent form submission if variants dont exist in database
        let newVariants = mtValues.filter(variant => !variant.variant_id)
        newVariants = newVariants.map(variant => variant.protein_variant)
        if (newVariants.length !== 0){
            console.log(`${newVariants.join(", ")} are not present in database`)
            return
        }

        const data = {
            experiment: {
                date: date,
                wt_firefly: wtValues.wt_firefly,
                wt_renilla: wtValues.wt_renilla
            },
           luciferase_values: mtValues
        }

        console.log(data)

        fetch('http://localhost:3001/experiments', { 
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data) 
        })
        .then(response => response.json())
        .then(apiData => {
            console.log(apiData)
        })
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