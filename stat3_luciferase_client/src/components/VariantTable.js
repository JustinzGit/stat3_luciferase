import React, { useEffect, useState } from "react"

function VariantTable() {
    const [variantTable, setVariantTable] = useState([])
    const [foldChangeToggle, setFoldChangeToggle] = useState(true)
    const [variantToggle, setVariantToggle] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3001/variants', { credentials: 'include' })
        .then(response => response.json())
        .then(variantTable => {
            setVariantTable(variantTable)
        })
    }, [])

    function renderVariantTable(){
        return variantTable.map(variant => {
            return(
                <tr key={variant.id}>
                    <td>{variant.protein_variant}</td>
                    <td>{variant.avg_fold_change}</td>
                </tr>
            )
        })
    }

    function sortByFoldChange(){
        const sortedVariantTable = variantTable.sort(function(a, b){
            if (foldChangeToggle){
                return a.avg_fold_change - b.avg_fold_change
            }
            else {
                return b.avg_fold_change - a.avg_fold_change
            }
        })
        setVariantTable(sortedVariantTable)
        setFoldChangeToggle(!foldChangeToggle)
    }

    function sortByVariant(){
        const sortedVariantTable = variantTable.sort(function(a, b){
            if (variantToggle){
                return a.aa_position - b.aa_position
            }
            else {
                return b.aa_position - a.aa_position
            }
        })
        setVariantTable(sortedVariantTable)
        setVariantToggle(!variantToggle)
    }
    
    return(
        <div id="variant-table">
            <button onClick={sortByFoldChange}>Sort By Fold Change</button>
            <button onClick={sortByVariant}>Sort By Variant</button>
            <table>
                <tbody>
                    <tr>
                        <th>Variant</th>
                        <th>Fold Change</th>
                    </tr>
                    {renderVariantTable()}
                </tbody>
            </table>
        </div>
    )
}

export default VariantTable