import React, { useState, useEffect } from "react"
import { useParams, useLocation } from 'react-router-dom'
import useVariantList from '../hooks/useVariantList'
import VariantData from './VariantData'
import Navigation from './Navigation'

function Variant() {
    const location = useLocation()
    const [variantList] = useVariantList()
    const { id } = useParams()
    const [variant, setVariant] = useState({ experiments: [] })

    useEffect(() => {
        fetch(`http://localhost:3001/variants/${id}`, { credentials: 'include' })
        .then(response => response.json())
        .then(variant => setVariant(variant))
    },[id])

    return(
        <div>
           <Navigation currentPath={location.pathname} variants={variantList}/>
           <p>Protien Variant: {variant.protein_variant}</p>
           <p>Average Fold Change: {variant.avg_fold_change}</p>
           <p>GOF? {variant.gof ? "Yes" : "No"}</p>
           {variant.experiments.map((data) => <VariantData key={data.id} variantName={variant.protein_variant} data={data}/>)}
        </div>
    )
}

export default Variant