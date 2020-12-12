import React, { useState, useEffect } from "react"

import { useParams } from 'react-router-dom'

function Variant() {
    const { protein_variant } = useParams()
    const [variant, setVariant] = useState()

    useEffect(() => {
        fetch(`http://localhost:3001/variants/${protein_variant}`, { credentials: 'include' })
        .then(response => response.json())
        .then(variant => {
            setVariant(variant)
            console.log(variant)
        })
    }, [])

    return(
        <div>
            <p>{protein_variant}</p>
        </div>
    )
}

export default Variant