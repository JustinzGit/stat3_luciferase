import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useExperiment from '../hooks/useExperiment'
import useVariantList from '../hooks/useVariantList'
import MutationInputs from './MutationInputs'

import Errors from './Errors'

function ExperimentForm(){
    const { id } = useParams()
    const [variantList] = useVariantList()
    const history = useHistory()
    const [experimentState, setExperimentState] = useExperiment(id)

    const [hasError, setHasError] = useState(false)
    const [errors, setErrors] = useState([])

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
        const blankEntry = {protein_variant: '', variant_id: '', firefly: '', renilla: ''}
        setExperimentState({ 
            ...experimentState, 
            luciferase_values: [...experimentState.luciferase_values, blankEntry] 
        })
    }

    const variantsNotInDb = []
    function assignVariantIds(){

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
                delete entry['protein_variant']
            }
            else {
                variantsNotInDb.push(entry['protein_variant'])
            }
            return entry
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        setHasError(false)
        setErrors([])
        assignVariantIds()

        if (variantsNotInDb.length !== 0){
            setHasError(true)
            setErrors([`Not In Database: ${variantsNotInDb.join(", ")}`])
        }
        else if (id){
            console.log("PERFORM EDIT")
        }
        else { 
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
                    if (apiData.status === 422){
                        setErrors(apiData.error)
                        setHasError(true)
                        
                    }
                    else {
                        history.push(`/experiments/${apiData.id}`)
                    }
                })
        }
    }

    return(
        <div id="experiment_form">
            <form onSubmit={handleSubmit}>
                {hasError && <Errors messages={errors} />}
                {id ? <h3>Edit Experiment</h3> : <h3>Add Experiment</h3>}

                <p>Date: <input value={experimentState.date} type="date" onChange={event => setExperimentState({...experimentState, date: event.target.value})}/></p>

                <p>WT Firefly: <input onChange={handleWtChange} value={experimentState.wt_firefly} type="number" name="wt_firefly" required /></p>
                <p>WT Renilla: <input onChange={handleWtChange} value={experimentState.wt_renilla} type="number" name="wt_renilla" required /></p>
                
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
                {id ? <input type="button" value="Edit Experiment"/> : <input type="submit" value="Add Experiment" />}
            </form>
        </div>
    )
}

export default ExperimentForm






// const data = {
//         experiment: {
//             date: experimentState.date,
//             wt_firefly: experimentState.wt_firefly,
//             wt_renilla: experimentState.wt_renilla
//         },
//        luciferase_values: experimentState.luciferase_values
//     }

// fetch(`http://localhost:3001/experiments/${experimentState.id}`, { 
//         method: "PATCH",
//         credentials: 'include',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(data) 
//     })
//     .then(response => response.json())
//     .then(apiData => {
//         console.log(apiData)
//     })