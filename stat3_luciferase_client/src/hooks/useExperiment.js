import { useState, useEffect } from 'react'

function useExperiment(date = null){
    const [experimentState, setExperimentState] = useState({
        date: '',
        wt_firefly: '',
        wt_renilla: '',
        luciferase_values: [{
            protein_variant: '', 
            variant_id: '', 
            firefly: '', 
            renilla: ''
        }]
    })

    useEffect(() => {
        if (date !== null){
            fetch(`http://localhost:3001/experiments/${date}`, { credentials: 'include' })
            .then(response => response.json())
            .then(apiData => {
                const luciferase_values = apiData.variants.map(variant => ({
                    protein_variant: variant.protein_variant,
                    variant_id: variant.id,
                    firefly: variant.luciferase_values.firefly,
                    renilla: variant.luciferase_values.renilla
                }))
    
                const experiment = {
                    date: apiData.date,
                    wt_firefly: apiData.wt_firefly,
                    wt_renilla: apiData.wt_renilla,
                    luciferase_values: luciferase_values
                }
    
                setExperimentState(experiment)
            })
        }
    }, [date])
    
    return [ experimentState, setExperimentState ]
}

export default useExperiment