import { useState, useEffect } from 'react'
import useVariantList from '../hooks/useVariantList'

function ExperimentForm(){
    const [variantList] = useVariantList()

    const [wtValues, setWtValues] = useState({ wt_firefly: '', wt_renilla: ''})
    function handleWtChange(event){
        setWtValues({
            ...wtValues,
            [event.target.name]: [event.target.value]
        })
    }


    const blankLuciferaseValues = {mutation: '', firefly: '', renilla: ''}
    const [luciferaseValues, setLuciferaseValues] = useState([{...blankLuciferaseValues}])
    function handleMutationChange(event){
        const updatedMutationValues = [...luciferaseValues]
        updatedMutationValues[event.target.dataset.idx][event.target.className] = event.target.value
        setLuciferaseValues(updatedMutationValues)
    }
    
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

    function addMutation(){
        setLuciferaseValues([...luciferaseValues, {...blankLuciferaseValues}])
    }

    return(
        <div id="experiment_form">
            <form>
                <h3>Add Experiment</h3>
                <p>Date: <input value={date} type="date" onChange={event => setDate(event.target.value)}/></p>

                <p>WT Firefly: <input onChange={handleWtChange} value={wtValues.wt_firefly} type="number" name="wt_firefly" /></p>
                <p>WT Renilla: <input onChange={handleWtChange} value={wtValues.wt_renilla} type="number" name="wt_renilla" /></p>
                
                <p><input onClick={addMutation} type="button" value="Add Mutation"/></p>
                {
                    luciferaseValues.map((values, index) => {
                        const mutationId = `variant_${index}`
                        const fireflyId = `firefly_${index}`
                        const renillaId = `renilla_${index}`

                        return(
                            <div key={`mutation_${mutationId}`}>
                                Mutation:<br/>
                                <input list="variants" name={mutationId} data-idx={index} value={luciferaseValues[index].mutation} onChange={handleMutationChange} className="mutation" autoComplete="off" />
                                <datalist id="variants">
                                    {variantList.map((variant) => <option key={variant.id} value={variant.protein_variant}>{variant.protein_variant}</option>)}
                                </datalist>

                                <p>Firefly: <input type="number" name={fireflyId} data-idx={index} value={luciferaseValues[index].firefly} onChange={handleMutationChange} className="firefly" /></p>
                                <p>Renilla: <input type="number" name={renillaId} data-idx={index} value={luciferaseValues[index].renilla} onChange={handleMutationChange} className="renilla" /></p>
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