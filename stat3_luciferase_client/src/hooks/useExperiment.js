import { useState, useEffect } from 'react'

function useExperiment(id = null){
    const [experimentState, setExperimentState] = useState({
        id: '',
        date: '',
        wt_firefly: '',
        wt_renilla: '',
        ff_ren_ratio: '',
        luciferase_values_attributes: [{
            id: '',
            protein_variant: '', 
            variant_id: '', 
            firefly: '', 
            renilla: '',
        }]
    })

    useEffect(() => {
        if (id !== null){
            fetch(`http://localhost:3001/experiments/${id}`, { credentials: 'include' })
            .then(response => response.json())
            .then(apiData => {

                const luciferase_values = apiData.variants.map(variant => ({
                    id: variant.luciferase_values.id,
                    protein_variant: variant.protein_variant,
                    variant_id: variant.id,
                    firefly: variant.luciferase_values.firefly,
                    renilla: variant.luciferase_values.renilla,
                    ff_ren_ratio: variant.luciferase_values.ff_ren_ratio,
                    fold_change: variant.luciferase_values.fold_change
                }))
    
                const experiment = {
                    id: apiData.id,
                    date: apiData.date,
                    wt_firefly: apiData.wt_firefly,
                    wt_renilla: apiData.wt_renilla,
                    ff_ren_ratio: apiData.ff_ren_ratio,
                    luciferase_values_attributes: luciferase_values
                }
    
                setExperimentState(experiment)
            })
        }
    }, [id])
    
    return [ experimentState, setExperimentState ]
}

export default useExperiment