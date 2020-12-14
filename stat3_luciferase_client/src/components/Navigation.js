import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'

function Navigation({ variants }) {
    const [selectedVariant, setSelectedVariant] = useState("")
    const history = useHistory()

    function goToVariant(event){
        event.preventDefault()
        history.push(`/variants/${selectedVariant}`)
    }

    return(
        <div id="navigation">
            <NavLink to="/variants">Variant Table</NavLink>

            <form onSubmit={goToVariant}>
                <input onChange={event => setSelectedVariant(event.target.value)} list="variants" id="variant-selection" autoComplete="off" />
                <datalist id="variants">
                    {variants.map((variant) => <option key={variant.id} value={variant.protein_variant}>{variant.protein_variant}</option>)}
                </datalist>
                <input type="submit" value="Go To Variant"/>
            </form>
        </div>
    )
}

export default Navigation