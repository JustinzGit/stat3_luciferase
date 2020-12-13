import React from 'react';
import { NavLink } from 'react-router-dom'

function Navigation() {
    return(
        <div id="navigation">
            <NavLink to="/variants">Variant Table</NavLink>
        </div>
    )
}

export default Navigation