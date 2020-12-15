function ExperimentForm(){
    return(
        <div>
            <form>
                <h3>Add Experiment</h3>
                <p>Date: <input type="date"/></p>
            
                <p>WT Firefly: <input type="number"/></p>
                <p>WT Renilla: <input type="number"/></p>

                <input type="submit" />
            </form>
        </div>
    )
}

export default ExperimentForm