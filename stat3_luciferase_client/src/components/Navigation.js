import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'

function Navigation({ currentPath }) {
    const [selectedVariant, setSelectedVariant] = useState('')
    const history = useHistory()

    function goToVariant(event){
        event.preventDefault()

        // Store variant list in object for quick access to variant id
        const variantObject = {}
        variants.map(entry => {
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

            <p><form onSubmit={goToVariant}>
                <input onChange={event => setSelectedVariant(event.target.value)} list="variants" id="variant-selection" autoComplete="off" />
                <datalist id="variants">
                    {variants.map((variant) => <option key={variant.id} value={variant.protein_variant}/>)}
                </datalist>
                <input type="submit" value="Go To Variant"/>
            </form></p>
        </div>
    )
}

export default Navigation