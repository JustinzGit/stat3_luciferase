import React, { useState, useEffect } from "react"

import { useParams } from 'react-router-dom'

import Experiment from './Experiment'

function Variant() {
    const { protein_variant } = useParams()
    const [variant, setVariant] = useState({ experiments: [] })

    useEffect(() => {
        fetch(`http://localhost:3001/variants/${protein_variant}`, { credentials: 'include' })
        .then(response => response.json())
        .then(variant => {
            setVariant(variant)
        })
    })

    return(
        <div>
           <p>Protien Variant: {variant.protein_variant}</p>
           <p>Average Fold Change: {variant.avg_fold_change}</p>
           <p>GOF? {variant.gof ? "Yes" : "No"}</p>
           {variant.experiments.map((data) => <Experiment data={data}/>)}
        </div>
    )
}

export default Variant