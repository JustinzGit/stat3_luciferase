import React from "react"
import { useParams } from 'react-router-dom'
import useExperiment from "../hooks/useExperiment"

function Experiment(){
    const { id } = useParams()
    const [experimentState] = useExperiment(id)

    return(
        <div>
            <p>Date: <b>{experimentState.date}</b></p>
            <p>WT Firefly: <b>{experimentState.wt_firefly}</b></p>
            <p>WT Renilla: <b>{experimentState.wt_renilla}</b></p>
            <p>WT FF/Ren: <b>{experimentState.ff_ren_ratio}</b></p>
            <hr></hr>
            {
                experimentState.luciferase_values.map(entry => {
                    return(
                        <div>
                            <p><b>{entry.protein_variant}</b></p>
                            <p>Firefly: {entry.firefly}</p>
                            <p>Renillay: {entry.renilla}</p>
                            <p>FF/Ren: {entry.ff_ren_ratio}</p>
                            <p>Fold Change: {entry.fold_change}</p>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Experiment