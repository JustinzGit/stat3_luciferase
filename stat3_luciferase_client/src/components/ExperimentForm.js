import { useState, useEffect } from 'react'
import useVariantList from '../hooks/useVariantList'
import MutationInputs from './MutationInputs'

function ExperimentForm(){
    const [variantList] = useVariantList()

    const blankEntry = {protein_variant: '', variant_id: '', firefly: '', renilla: ''}
    const [experimentState, setExperimentState] = useState({
            date: '',
            wt_firefly: '',
            wt_renilla: '',
            luciferase_values: [blankEntry]
    })

    // On mount, render and set todays date
    useEffect(() => {
        let dateObj = new Date()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let month = String(dateObj.getMonth() + 1).padStart(2, '0')
        let year = dateObj.getFullYear();
        let todaysDate = year + '-' + month + '-' + day
        setExperimentState({ ...experimentState, date: todaysDate})
        // eslint-disable-next-line
    }, [])

    // Set WT luciferase values
    function handleWtChange(event){
        setExperimentState({...experimentState, [event.target.name]: event.target.value})
    }

    // Set MT luciferase values 
    function handleMtChange(event){
        const updatedLuciferaseValues = [...experimentState.luciferase_values]
        updatedLuciferaseValues[event.target.dataset.index][event.target.className] = event.target.value
        setExperimentState({...experimentState, luciferase_values: updatedLuciferaseValues})
    }
    
    // Add blank luciferase value entries
    function addMutation(){
        setExperimentState({ 
            ...experimentState, 
            luciferase_values: [...experimentState.luciferase_values, blankEntry] 
        })
    }

    function handleSubmit(event){
        event.preventDefault()

        // Store variant list in object for quick access to variant id
        const variantObject = {}
        variantList.map(entry => {
            return variantObject[entry.protein_variant] = entry
        })

        // Store variant id if variant exists in list
        experimentState.luciferase_values.map(entry => {
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
        let newVariants = experimentState.luciferase_values.filter(variant => !variant.variant_id)
        newVariants = newVariants.map(variant => variant.protein_variant)
        if (newVariants.length !== 0){
            console.log(`${newVariants.join(", ")} are not present in database`)
            return
        }

        const data = {
            experiment: {
                date: experimentState.date,
                wt_firefly: experimentState.wt_firefly,
                wt_renilla: experimentState.wt_renilla
            },
           luciferase_values: experimentState.luciferase_values
        }

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
                <p>Date: <input value={experimentState.date} type="date" onChange={event => setExperimentState({...experimentState, date: event.target.value})}/></p>

                <p>WT Firefly: <input onChange={handleWtChange} value={experimentState.wt_firefly} type="number" name="wt_firefly" /></p>
                <p>WT Renilla: <input onChange={handleWtChange} value={experimentState.wt_renilla} type="number" name="wt_renilla" /></p>
                
                <p><input onClick={addMutation} type="button" value="Add Mutation"/></p>
                {
                    experimentState.luciferase_values.map((values, index) => (
                        <MutationInputs
                            key={index} 
                            index={index}
                            luciferaseValues={experimentState.luciferase_values}
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