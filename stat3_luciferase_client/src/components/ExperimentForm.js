import { useState, useEffect } from 'react'
import useVariantList from '../hooks/useVariantList'

function ExperimentForm(){
    const [variantList] = useVariantList()

    const [wtValues, setWtValues] = useState({ wt_firefly: '', wt_renilla: ''})
    function handleWtChange(event){
        setWtValues({
            ...wtValues,
            [event.target.name]: event.target.value
        })
    }


    const blankMtEntry = {mutation: '', firefly: '', renilla: ''}
    const [mtValues, setMtValues] = useState([{...blankMtEntry}])
    function handleMtChange(event){
        const updatedMtValues = [...mtValues]
        updatedMtValues[event.target.dataset.idx][event.target.className] = event.target.value
        setMtValues(updatedMtValues)
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
        setMtValues([...mtValues, {...blankMtEntry}])
    }

    function handleSubmit(event){
        event.preventDefault()
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
                    mtValues.map((values, index) => {
                        const mutationId = `variant_${index}`
                        const fireflyId = `firefly_${index}`
                        const renillaId = `renilla_${index}`

                        return(
                            <div key={`mutation_${mutationId}`}>
                                Mutation:<br/>
                                <input list="variants" name={mutationId} data-idx={index} value={mtValues[index].mutation} onChange={handleMtChange} className="mutation" autoComplete="off" />
                                <datalist id="variants">
                                    {variantList.map((variant) => <option key={variant.id} value={variant.protein_variant}>{variant.protein_variant}</option>)}
                                </datalist>

                                <p>Firefly: <input type="number" name={fireflyId} data-idx={index} value={mtValues[index].firefly} onChange={handleMtChange} className="firefly" /></p>
                                <p>Renilla: <input type="number" name={renillaId} data-idx={index} value={mtValues[index].renilla} onChange={handleMtChange} className="renilla" /></p>
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