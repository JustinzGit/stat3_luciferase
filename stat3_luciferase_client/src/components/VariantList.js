import React, { Component } from "react"

class VariantList extends Component {
    state = {
        variantList: []
    }

    componentDidMount(){
        fetch('http://localhost:3001/variants', { credentials: 'include' })
        .then(response => response.json())
        .then(variantList => {
            this.setState({ variantList: variantList }, () => {console.log(this.state)})
        })
    }
    
    render(){
        return(
            <div>hello world</div>
        )
    }
}

export default VariantList