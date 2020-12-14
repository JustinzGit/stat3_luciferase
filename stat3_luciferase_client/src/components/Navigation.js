import React from 'react';
import { NavLink } from 'react-router-dom'

function Navigation({ variants }) {

    return(
        <div id="navigation">
            <NavLink to="/variants">Variant Table</NavLink>

            <input list="variants" id="variant-selection"/>
            <datalist id="variants">
                {variants.map((variant) => <option value={variant.protein_variant}>{variant.protein_variant}</option>)}
            </datalist>
        </div>
    )
}

export default Navigation