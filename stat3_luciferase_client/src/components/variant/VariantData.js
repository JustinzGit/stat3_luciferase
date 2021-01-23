import React from "react"
import { useHistory } from "react-router-dom"

function VariantData({ data, variantName }){
    const history = useHistory()

    return(
        <div>
            <p>Experiment Date: <b>{data.date}</b></p>
            <p>STAT3 Firefly: <b>{data.wt_firefly}</b></p>
            <p>STAT3 Renilla: <b>{data.wt_renilla}</b></p>
            <p>STAT3 FF/Ren: <b>{data.ff_ren_ratio}</b></p>
            <p>{variantName} Firefly: <b>{data.luciferase_values.firefly}</b></p>
            <p>{variantName} Renilla: <b>{data.luciferase_values.renilla}</b></p>
            <p>{variantName} FF/Ren: <b>{data.luciferase_values.ff_ren_ratio}</b></p>
            <p>Fold Change <b>{data.luciferase_values.fold_change}</b></p>
            <button onClick={() => history.push(`/experiments/edit/${data.id}`)}>Edit Experiment</button>
            <hr></hr>
        </div>
    )
}

export default VariantData