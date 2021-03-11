import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import useVariantList from '../hooks/useVariantList';
import useExperimentList from '../hooks/useExperimentList'
import getTodaysDate from '../getTodaysDate'

function Navigation({ currentPath }) {
    const history = useHistory()
    const todaysDate = getTodaysDate()

    const [variantList] = useVariantList()
    const [experimentList] = useExperimentList()

    const [selectedVariant, setSelectedVariant] = useState('')
    const [selectedExperiment, setSelectedExperiment] = useState('')
    
    function goToVariant(event){
        event.preventDefault()

        // Store variant list in object for quick access to variant id
        const variantObject = {}
        variantList.map(entry => {
            return variantObject[entry.protein_variant] = entry
        })

        // If variant exists in database, navigate
        if (variantObject[selectedVariant]){
            const id = variantObject[selectedVariant].id
            history.push(`/variants/${id}`)
        }
    }

    function goToExperiment(event){
        event.preventDefault()

        // Store experiment list in object for quick access to experiment id
        const experimentObject = {}
        experimentList.map(entry => {
            return experimentObject[entry.date] = entry
        })

        if(experimentObject[selectedExperiment]){
            const id = experimentObject[selectedExperiment].id
            history.push(`/experiments/${id}`)
        }
    }

    return(
        <div id="navigation">
            {currentPath !== "/variants" && <NavLink to="/variants">Variant Table</NavLink>}<br></br>
            {currentPath !== "/experiments/add" && <NavLink to="/experiments/add">Add Experiment</NavLink>}

            <form onSubmit={goToVariant}>
                <input onChange={event => setSelectedVariant(event.target.value)} list="variants" id="variant-selection" autoComplete="off" />
                <datalist id="variants">
                    {variantList.map((variant) => <option key={variant.id} value={variant.protein_variant}/>)}
                </datalist>
                <input type="submit" value="Go To Variant"/>
            </form><br></br>

            <form onSubmit={goToExperiment}>
                <input type="date" value={todaysDate} onChange={event => setSelectedExperiment(event.target.value)} />
                <input type="submit" value="Go To Experiment"/>
            </form><br></br>
        </div>
    )
}

export default Navigation