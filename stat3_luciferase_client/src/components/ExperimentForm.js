import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useExperiment from '../hooks/useExperiment'
import useVariantList from '../hooks/useVariantList'
import MutationInputs from './MutationInputs'
import { useLocation } from 'react-router-dom'

function ExperimentForm({ submitData }){
    const variantErrors = []
    const [errorMessage, setErrorMessage] = useState('')
    const location = useLocation()
    const [variantList] = useVariantList()
    const { id } = useParams()
    const blankEntry = {protein_variant: '', variant_id: '', firefly: '', renilla: ''}
    const [experimentState, setExperimentState] = useExperiment(id)

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
                variantErrors.push(entry['protein_variant'])
            }
            return entry
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        assignVariantIds()

        if (variantErrors.length !== 0){
            setErrorMessage(`Not Present In Database: ${variantErrors.join(", ")}`)
            variantErrors.length = 0
        }
        else {
            submitData(experimentState)
        }
    }

    return(
        <div id="experiment_form">
            <form onSubmit={handleSubmit}>
            {<h3 style={{color: 'red'}}>{errorMessage}</h3>}
            {location.pathname === '/experiments/add' && <h3>Add Experiment</h3>}
            {location.pathname === `/experiments/edit/${id}` && <h3>Edit Experiment</h3>}

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
                {location.pathname === '/experiments/add' && <input type="submit" value="Add Experiment" />}
                {location.pathname === `/experiments/edit/${id}` && <input type="submit" value="Edit Experiment" />}
            </form>
        </div>
    )
}

export default ExperimentForm