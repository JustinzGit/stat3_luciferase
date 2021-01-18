import React from "react"
import { useHistory } from "react-router-dom"
// import useExperiment from "../hooks/useExperiment"

function VariantData({ data }){

    // const { id } = useParams()
    // const [experimentState, setExperimentState] = useExperiment(id)
    const history = useHistory()

    return(
        <div>
            <p>Date: <b>{data.date}</b></p>
            <p>WT Firefly: <b>{data.wt_firefly}</b></p>
            <p>WT Renilla: <b>{data.wt_renilla}</b></p>
            <p>WT FF/Ren: <b>{data.ff_ren_ratio}</b></p>
            <p>MT Firefly: <b>{data.luciferase_values.firefly}</b></p>
            <p>MT Renilla: <b>{data.luciferase_values.renilla}</b></p>
            <p>MT FF/Ren: <b>{data.luciferase_values.ff_ren_ratio}</b></p>
            <p>Fold Change <b>{data.luciferase_values.fold_change}</b></p>
            <button onClick={() => history.push(`/experiments/edit/${data.date}`)}>Edit Experiment</button>
            <hr></hr>
        </div>
    )
}

export default VariantData