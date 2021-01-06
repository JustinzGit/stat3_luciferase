function MutationInputs({ index, luciferaseValues, handleMtChange, variantList }){
    return (
        <div key={`mutation_${index}`} id={`mutation_${index}`}>               
            Mutation:<br/>
            <input 
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
                type="number" 
                data-index={index} 
                className="firefly"
                onChange={handleMtChange}
                value={luciferaseValues[index].firefly} /></p>

            <p>Renilla: 
            <input 
                type="number" 
                data-index={index}
                className="renilla"
                onChange={handleMtChange}
                value={luciferaseValues[index].renilla} /></p>
        </div>
    )

}

export default MutationInputs