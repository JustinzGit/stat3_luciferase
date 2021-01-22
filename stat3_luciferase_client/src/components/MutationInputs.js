function MutationInputs({ index, luciferaseValues, handleMtChange, variantList, removeMutation }){
    return (
        <div key={`mutation_${index}`} id={`mutation_${index}`}>               
            Mutation:<br/>
            <input
                required 
                list="variants" 
                data-index={index}
                value={luciferaseValues[index].protein_variant}  
                onChange={handleMtChange} 
                className="protein_variant" 
                autoComplete="off" />
            
            <datalist id="variants">
                {
                    variantList.map((variant) =>
                        <option key={variant.id} value={variant.protein_variant} />)
                }
            </datalist>

            <p>Firefly: 
            <input
                required 
                type="number" 
                data-index={index} 
                className="firefly"
                onChange={handleMtChange}
                value={luciferaseValues[index].firefly} /></p>

            <p>Renilla: 
            <input
                required 
                type="number" 
                data-index={index}
                className="renilla"
                onChange={handleMtChange}
                value={luciferaseValues[index].renilla} /></p>

            <p><input type="button" value="Remove Variant" onClick={() => removeMutation(index)}/></p>
        </div>
    )

}

export default MutationInputs