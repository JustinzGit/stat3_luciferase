import {useContext} from 'react'
import {AppContext} from '../../App'
import { useHistory } from 'react-router-dom'


function RemoveExperiment({id}){
    const history = useHistory()
    let store = useContext(AppContext)

    function deleteExperiment(){
        fetch(`http://localhost:3001/experiments/${id}`, { 
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }})
        
        store.alerts.set("Experiment Deleted")
        history.push('/variants')
    }

    return(
        <input type="button" value="Remove Experiment" onClick={deleteExperiment}/>
    )
}

export default RemoveExperiment