import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useExperiment from '../../hooks/useExperiment'
import useVariantList from '../../hooks/useVariantList'
import MutationInputs from './MutationInputs'
import Navigation from '../Navigation'
import getTodaysDate from '../../getTodaysDate'

import {AppContext} from '../../App'

import Errors from '../Errors'
import RemoveExperiment from './RemoveExperiment'

function ExperimentForm(){
    let store = useContext(AppContext)

    const { id } = useParams()
    const [variantList] = useVariantList()
    const history = useHistory()
    const [hasError, setHasError] = useState(false)
    const [errors, setErrors] = useState([])
    const [experimentState, setExperimentState] = useExperiment(id)

    // On mount, render and set todays date
    useEffect(() => {
        let todaysDate = getTodaysDate()
        setExperimentState({ ...experimentState, date: todaysDate})
        // eslint-disable-next-line
    }, [])

    // Set WT luciferase values
    function handleWtChange(event){
        setExperimentState({...experimentState, [event.target.name]: event.target.value})
    }

    // Set MT luciferase values 
    function handleMtChange(event){
        const updatedLuciferaseValues = [...experimentState.luciferase_values_attributes]
        updatedLuciferaseValues[event.target.dataset.index][event.target.className] = event.target.value
        setExperimentState({...experimentState, luciferase_values_attributes: updatedLuciferaseValues})
    }
    
    // Add blank luciferase value entries
    function addMutation(){
        const blankEntry = {protein_variant: '', variant_id: '', firefly: '', renilla: ''}
        setExperimentState({ 
            ...experimentState, 
            luciferase_values_attributes: [...experimentState.luciferase_values_attributes, blankEntry] 
        })
    }

    function removeMutation(index){
        experimentState.luciferase_values_attributes.splice(index, 1)

        setExperimentState({
            ...experimentState,
            luciferase_values_attributes: experimentState.luciferase_values_attributes
        })
    }

    const variantsNotInDb = []
    function assignValues(){

        // Set the experiment WT ratio
        experimentState.ff_ren_ratio = experimentState.wt_firefly/experimentState.wt_renilla

        // Store variant list in object for quick access to variant id
        const variantObject = {}
        variantList.map(entry => {
            return variantObject[entry.protein_variant] = entry
        })

        experimentState.luciferase_values_attributes.map(lv => {
            const mutation = lv.protein_variant

            // Sets luciferase ratio and fold change
            lv.ff_ren_ratio = parseInt(lv.firefly)/parseInt(lv.renilla)
            lv.fold_change = lv.ff_ren_ratio/experimentState.ff_ren_ratio
            
            // Assign variant id if variant exists in list
            if (variantObject[mutation] && lv.variant_id === ''){
                lv.variant_id = variantObject[mutation].id
            }
            else if (!variantObject[mutation]) {
                variantsNotInDb.push(lv.protein_variant)
            }
            return lv
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        setHasError(false)
        setErrors([])
        assignValues()

        if (variantsNotInDb.length !== 0){
            setHasError(true)
            setErrors([`Not In Database: ${variantsNotInDb.join(", ")}`])
        }
        else if (id){
            fetch(`http://localhost:3001/experiments/${experimentState.id}`, { 
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(experimentState) 
                })
                .then(response => response.json())
                .then(apiData => {
                    if(apiData.status === 422){
                        setErrors(apiData.error)
                        setHasError(true) 
                    }
                    else {
                        store.alerts.set("Experiment Has Been Modified")
                        history.push(`/experiments/${apiData.id}`)
                    }
                })
        }
        else {
            fetch('http://localhost:3001/experiments', { 
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(experimentState) 
                })
                .then(response => response.json())
                .then(apiData => {
                    if (apiData.status === 422){
                        setErrors(apiData.error)
                        setHasError(true)   
                    }
                    else {
                        store.alerts.set("Experiment Has Been Added")
                        history.push(`/experiments/${apiData.id}`)
                    }
                })
        }
    }

    return(
        <div id="experiment_form">
            <Navigation currentPath={history.location.pathname}/>
            <form onSubmit={handleSubmit}>
             
                {hasError && <Errors messages={errors} />}
                {id ? <h3>Edit Experiment</h3> : <h3>Add Experiment</h3>}

                <p>Date: <input value={experimentState.date} type="date" onChange={event => setExperimentState({...experimentState, date: event.target.value})}/></p>

                <p>WT Firefly: <input onChange={handleWtChange} value={experimentState.wt_firefly} type="number" name="wt_firefly" required /></p>
                <p>WT Renilla: <input onChange={handleWtChange} value={experimentState.wt_renilla} type="number" name="wt_renilla" required /></p>
                
                <p><input onClick={addMutation} type="button" value="Add Mutation"/></p>
                {
                    experimentState.luciferase_values_attributes.map((values, index) => (
                        <MutationInputs
                            key={index} 
                            index={index}
                            luciferaseValues={experimentState.luciferase_values_attributes}
                            variantList={variantList}
                            removeMutation={removeMutation}
                            handleMtChange={handleMtChange} />
                    ))
                }
                {id && <RemoveExperiment id={experimentState.id} />}
                {id ? <input type="submit" value="Edit Experiment"/> : <input type="submit" value="Add Experiment" />}
            </form>
        </div>
    )
}

export default ExperimentForm