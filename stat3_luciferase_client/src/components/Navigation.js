import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import useVariantList from '../hooks/useVariantList';

function Navigation({ currentPath }) {
    const [variantList] = useVariantList()
    const [selectedVariant, setSelectedVariant] = useState('')
    const history = useHistory()

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

    return(
        <div id="navigation">
            {currentPath !== "/variants" && <NavLink to="/variants">Variant Table</NavLink>}
            {currentPath !== "/experiments/add" && <NavLink to="/experiments/add">Add Experiment</NavLink>}

            <form onSubmit={goToVariant}>
                <input onChange={event => setSelectedVariant(event.target.value)} list="variants" id="variant-selection" autoComplete="off" />
                <datalist id="variants">
                    {variantList.map((variant) => <option key={variant.id} value={variant.protein_variant}/>)}
                </datalist>
                <input type="submit" value="Go To Variant"/>
            </form><br></br>
        </div>
    )
}

export default Navigation