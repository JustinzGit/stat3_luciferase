import { useState, useEffect } from 'react'

function useVariantList(){
    const [variantList, setVariantList] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/variants', { credentials: 'include' })
        .then(response => response.json())
        .then(variantList => {
            setVariantList(variantList)
        })
    }, [])

    return [ variantList, setVariantList ]
}

export default useVariantList