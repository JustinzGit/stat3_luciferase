import React from "react"
import { useParams, useHistory } from 'react-router-dom'
import useExperiment from "../../hooks/useExperiment"
import Navigation from '../Navigation'

function Experiment(){
    const { id } = useParams()
    const history = useHistory()
    const [experimentState] = useExperiment(id)

    return(
        <div>
            <Navigation currentPath={history.location.pathname}/>
            <p>Date: <b>{experimentState.date}</b></p>
            <p>WT Firefly: <b>{experimentState.wt_firefly}</b></p>
            <p>WT Renilla: <b>{experimentState.wt_renilla}</b></p>
            <p>WT FF/Ren: <b>{experimentState.ff_ren_ratio}</b></p>
            <hr></hr>
            {
                experimentState.luciferase_values_attributes.map(entry => {
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