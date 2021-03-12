import React, { useEffect, useContext } from "react"
import { useParams, useHistory } from 'react-router-dom'
import useExperiment from "../../hooks/useExperiment"
import Navigation from '../Navigation'
import RemoveExperiment from '../experiment/RemoveExperiment'
import {AppContext} from '../../App'

function Experiment({ alerts }){
    const { id } = useParams()
    const history = useHistory()
    let store = useContext(AppContext)
    const [experimentState] = useExperiment(id)

    useEffect(() =>{
        return function cleanup(){
            store.alerts.set('')
        }
    },[])

    return(
        <div>
            {alerts !== '' && <h3>{alerts}</h3>}
            <Navigation currentPath={history.location.pathname}/>
            <p>Date: <b>{experimentState.date}</b></p>
            <p>WT Firefly: <b>{experimentState.wt_firefly}</b></p>
            <p>WT Renilla: <b>{experimentState.wt_renilla}</b></p>
            <p>WT FF/Ren: <b>{experimentState.ff_ren_ratio}</b></p>
            <hr></hr>
            {
                experimentState.luciferase_values_attributes.map(entry => {
                    return(
                        <div key={entry.id}>
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
             <button onClick={() => history.push(`/experiments/edit/${id}`)}>Edit Experiment</button>
             <RemoveExperiment id={id} />
        </div>
    )
}

export default Experiment