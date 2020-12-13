import React from "react"

function Experiment({ data }){
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
            <hr></hr>
        </div>
    )
}

export default Experiment