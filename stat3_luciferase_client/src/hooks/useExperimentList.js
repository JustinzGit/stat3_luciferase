import { useState, useEffect } from 'react'

function useExperimentList(){
    const [experimentList, setExperimentList] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/experiments', { credentials: 'include' })
        .then(response => response.json())
        .then(experimentList => {
            setExperimentList(experimentList)
        })
    }, [])

    return [ experimentList, setExperimentList ]
}

export default useExperimentList