import { useState, useEffect } from 'react'
import useVariantList from '../hooks/useVariantList'

function ExperimentForm(){
    const [date, setDate] = useState()
    const [variants] = useVariantList()
    const [luciferaseValues, setLuciferaseValues] = useState({})

    const [mutationCount, setMutationCount] = useState(1)
    const [mutationInput, setMutationInput] = useState([])
   
    // On render, set todays date and add input for a single mutation
    useEffect(() => {
        let dateObj = new Date()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let month = String(dateObj.getMonth() + 1).padStart(2, '0')
        let year = dateObj.getFullYear();
        let todaysDate = year + '-' + month + '-' + day
        setDate(todaysDate)
        addMutationInput()
        // eslint-disable-next-line
    }, [])

    function handleFormChange(event){
        const plasmidEntry = event.target.name
        const luciferaseValue = event.target.value
        setLuciferaseValues({
            ...luciferaseValues, 
            [plasmidEntry]: luciferaseValue
        })

    }

    function addMutationInput(){
        setMutationCount(mutationCount + 1)
        setMutationInput([
            ...mutationInput,
            <div>
                Mutation:<br/>
                <input list="variants" onChange={handleFormChange} name={`variant_${mutationCount}`} autoComplete="off" />
                <datalist id="variants">
                    {variants.map((variant) => <option key={variant.id} value={variant.protein_variant}>{variant.protein_variant}</option>)}
                </datalist>

                <p>Firefly: <input onChange={handleFormChange} type="number" name={`firefly_${mutationCount}`} /></p>
                <p>Renilla: <input onChange={handleFormChange} type="number" name={`renilla_${mutationCount}`} /></p>
            </div>
        ]
        )
    }

    return(
        <div>
            <form>
                <h3>Add Experiment</h3>
                <p>Date: <input value={date} type="date"/></p>
            
                <p>WT Firefly: <input onChange={handleFormChange} type="number" name="wt_firefly" /></p>
                <p>WT Renilla: <input onChange={handleFormChange} type="number" name="wt_renilla" /></p>
                <p><input onClick={addMutationInput} type="button" value="Add Mutation"/></p>
                {mutationInput.map(input => input)}
                <input type="submit" />
            </form>
        </div>
    )
}

export default ExperimentForm