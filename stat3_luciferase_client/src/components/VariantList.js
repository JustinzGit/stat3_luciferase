import React, { Component } from "react"

class VariantList extends Component {
    state = {
        variantList: []
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
                <tr>
                    <td>{variant.protein_variant}</td>
                    <td>{variant.avg_fold_change}</td>
                </tr>
            )
        })
    }

    sortByFoldChange = () => {
        const sortedVariantList = this.state.variantList.sort(function(a, b){
            return a.avg_fold_change - b.avg_fold_change
        })

        this.setState({variantList: sortedVariantList})
    }
    
    render(){
        return(
            <div id="variant-list">
                <button onClick={this.sortByFoldChange}>Sort By Fold Change</button>
                <table>
                    <tr>
                        <th>Variant</th>
                        <th>Fold Change</th>
                    </tr>
                    {this.renderVariantList()}
                </table>
            </div>
        )
    }
}

export default VariantList