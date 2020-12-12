import React from "react"

import { useParams } from 'react-router-dom'

function Variant() {
    let { protein_variant } = useParams()
    return(
        <div>
            <p>{protein_variant}</p>
        </div>
    )
}

export default Variant