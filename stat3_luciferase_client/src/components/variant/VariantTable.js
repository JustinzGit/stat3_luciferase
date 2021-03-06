import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Navigation from '../Navigation'
import useVariantList from '../../hooks/useVariantList'

import {AppContext} from '../../App'

function VariantTable({ alerts }) {
    let store = useContext(AppContext)
    
    const [ variantList, setVariantList ] = useVariantList()
    const [foldChangeToggle, setFoldChangeToggle] = useState(true)
    const [variantToggle, setVariantToggle] = useState(true)
    const history = useHistory()

    useEffect(() => {
        return function cleanup(){
            store.alerts.set('')
        }
    },[])
    
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
                return b.aa_position - a.aa_position  
            }
            else {
                return a.aa_position - b.aa_position
            }
        })
        setVariantList(sortedVariantList)
        setVariantToggle(!variantToggle)
    }
    
    return(
        <div id="variant-table">
            {alerts !== '' && <h3>{alerts}</h3>}
            <Navigation currentPath={history.location.pathname} />
            <button onClick={sortByFoldChange}>Sort By Fold Change</button>
            <button onClick={sortByVariant}>Sort By Variant</button>
            <table>
                <tbody>
                    <tr>
                        <th>Variant</th>
                        <th>Fold Change</th>
                    </tr>
                    {
                        variantList.map(variant => (
                                <tr key={variant.id} onClick={() => history.push(`/variants/${variant.id}`)}>
                                    <td>{variant.protein_variant}</td>
                                    <td>{variant.avg_fold_change}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default VariantTable