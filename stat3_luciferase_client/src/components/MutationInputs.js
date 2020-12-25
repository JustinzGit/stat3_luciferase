function MutationInputs({ index, mtValues, handleMtChange, variantList }){
    return (
        <div key={`mutation_${index}`} id={`mutation_${index}`}>               
            Mutation:<br/>
            <input list="variants" 
                data-index={index} 
                value={mtValues[index].mutation} 
                onChange={handleMtChange} 
                className="mutation" 
                autoComplete="off" />
            
            <datalist id="variants">
                {
                    variantList.map((variant) => 
                        <option key={variant.id} value={variant.protein_variant}>{variant.protein_variant}</option>)
                }
            </datalist>

            <p>Firefly: 
            <input 
                type="number" 
                data-index={index} 
                className="firefly"
                onChange={handleMtChange} 
                value={mtValues[index].firefly} /></p>

            <p>Renilla: 
            <input 
                type="number" 
                data-index={index}
                className="renilla"
                onChange={handleMtChange} 
                value={mtValues[index].renilla} /></p>
        </div>
    )

}

export default MutationInputs