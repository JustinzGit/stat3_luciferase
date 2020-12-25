import { useState, useEffect } from 'react'
import useVariantList from '../hooks/useVariantList'

function ExperimentForm(){
    const [variantList] = useVariantList()
    const [mutationCount, setMutationCount] = useState(1)
    const [luciferaseValues, setLuciferaseValues] = useState([
        {mutation: '', firefly: '', renilla: ''}
    ])
    
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

    // const mutationInput = 
    //     <div key={`variant_${mutationCount}`} id={`variant_${mutationCount}`}>
    //         Mutation:<br/><input list="variants" onChange={handleFormChange} name={`variant_${mutationCount}`} autoComplete="off" />
    //         <datalist id="variants">
    //             {variantList.map((variant) => <option key={variant.id} value={variant.protein_variant}>{variant.protein_variant}</option>)}
    //         </datalist>

    //         <p>Firefly: <input onChange={handleFormChange} type="number" name={`firefly_${mutationCount}`} /></p>
    //         <p>Renilla: <input onChange={handleFormChange} type="number" name={`renilla_${mutationCount}`} /></p>
    //     </div>

    // On mount, render inputs for a mutation and luciferase values
    // Render inputs for additional mutation when mutationCount is updated
    // const [mutationInputs, setMutationInputs] = useState([])
    // useEffect(() => {
    //     if (variantList.length !== 0){
    //         setMutationInputs([...mutationInputs, mutationInput])
    //     }
    //     // eslint-disable-next-line
    // }, [mutationCount, variantList])

    // Set mutation luciferase values on form change
    // function handleFormChange(event){
    //     const plasmidEntry = event.target.name
    //     const luciferaseValue = event.target.value
    //     setLuciferaseValues({...luciferaseValues, [plasmidEntry]: luciferaseValue})
    // }

    return(
        <div id="experiment_form">
            <form>
                <h3>Add Experiment</h3>
                <p>Date: <input value={date} type="date" onChange={event => setDate(event.target.value)}/></p>

                <p>WT Firefly: <input  type="number" name="wt_firefly" /></p>
                <p>WT Renilla: <input  type="number" name="wt_renilla" /></p>
                
                <p><input onClick={() => setMutationCount(mutationCount + 1)} type="button" value="Add Mutation"/></p>
                {
                    luciferaseValues.map((values, index) => {
                        const mutationId = `variant_${index}`
                        const fireflyId = `firefly_${index}`
                        const renillaId = `renilla_${index}`

                        return(
                            <div key={`mutation_${mutationId}`}>
                                Mutation:<br/>
                                <input list="variants" name={mutationId} autoComplete="off" />
                                <datalist id="variants">
                                    {variantList.map((variant) => <option key={variant.id} value={variant.protein_variant}>{variant.protein_variant}</option>)}
                                </datalist>

                                <p>Firefly: <input type="number" name={fireflyId} /></p>
                                <p>Renilla: <input type="number" name={renillaId} /></p>
                            </div>
                        )
                    })
                }

                <input type="submit" value="Add Experiment" />
            </form>
        </div>
    )
}

export default ExperimentForm