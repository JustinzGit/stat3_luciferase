import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function VariantTable() {
    const [variantList, setVariantList] = useState([])
    const [foldChangeToggle, setFoldChangeToggle] = useState(true)
    const [variantToggle, setVariantToggle] = useState(true)
    const history = useHistory()

    useEffect(() => {
        fetch('http://localhost:3001/variants', { credentials: 'include' })
        .then(response => response.json())
        .then(variantList => {
            setVariantList(variantList)
        })
    }, [])

    function renderVariantRows(){
        return variantList.map(variant => {
            return(
                <tr key={variant.id} onClick={() => history.push(`/variants/${variant.protein_variant}`)}>
                    <td>{variant.protein_variant}</td>
                    <td>{variant.avg_fold_change}</td>
                </tr>
            )
        })
    }

    function sortByFoldChange(){
        const sortedVariantList = variantList.sort(function(a, b){
            if (foldChangeToggle){
                return a.avg_fold_change - b.avg_fold_change
            }
            else {
                return b.avg_fold_change - a.avg_fold_change
            }
        })
        setVariantList(sortedVariantList)
        setFoldChangeToggle(!foldChangeToggle)
    }

    function sortByVariant(){
        const sortedVariantList = variantList.sort(function(a, b){
            if (variantToggle){
                return a.aa_position - b.aa_position
            }
            else {
                return b.aa_position - a.aa_position
            }
        })
        setVariantList(sortedVariantList)
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
                    {renderVariantRows()}
                </tbody>
            </table>
        </div>
    )
}

export default VariantTable