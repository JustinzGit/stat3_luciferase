import React, { Component } from "react"

class VariantList extends Component {
    constructor(){
        super()

        this.state = {
            variantList: [],
            foldChangeToggle: true
        }
    }

    componentDidMount(){
        fetch('http://localhost:3001/variants', { credentials: 'include' })
        .then(response => response.json())
        .then(variantList => {
            this.setState({ variantList: variantList })
        })
    }

    renderVariantList = () => {
        return this.state.variantList.map(variant => {
            return(
                <tr key={variant.id}>
                    <td>{variant.protein_variant}</td>
                    <td>{variant.avg_fold_change}</td>
                </tr>
            )
        })
    }

    sortByFoldChange = () => {
        const foldChangeToggle = this.state.foldChangeToggle
        const sortedVariantList = this.state.variantList.sort(function(a, b){
            if (foldChangeToggle){
                return a.avg_fold_change - b.avg_fold_change
            }
            else {
                return b.avg_fold_change - a.avg_fold_change
            }
        })
        this.setState({variantList: sortedVariantList, foldChangeToggle: !foldChangeToggle})
    }
    
    render(){
        return(
            <div id="variant-list">
                <button onClick={this.sortByFoldChange}>Sort By Fold Change</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Variant</th>
                            <th>Fold Change</th>
                        </tr>
                        {this.renderVariantList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default VariantList