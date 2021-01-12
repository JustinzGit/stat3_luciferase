export default function addExperiment(experimentData){
    fetch('http://localhost:3001/experiments', { 
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(experimentData) 
        })
        .then(response => response.json())
        .then(apiData => {
            console.log(apiData)
        })
}