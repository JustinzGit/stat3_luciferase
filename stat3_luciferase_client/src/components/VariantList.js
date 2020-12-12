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
    
    render(){
        return(
            <div id="variant-list">
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