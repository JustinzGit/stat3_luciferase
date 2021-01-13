export default function editExperiment(experimentState){
    
    const data = {
        experiment: {
            date: experimentState.date,
            wt_firefly: experimentState.wt_firefly,
            wt_renilla: experimentState.wt_renilla
        },
       luciferase_values: experimentState.luciferase_values
    }

    fetch(`http://localhost:3001/experiments/${experimentState.id}`, { 
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data) 
        })
        .then(response => response.json())
        .then(apiData => {
            console.log(apiData)
        })
}