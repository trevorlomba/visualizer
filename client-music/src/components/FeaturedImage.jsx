import React from "react"

const FeaturedImage = ({featuredImage}) => {
    return (
        <img className={`featured`} loading = 'lazy' src={featuredImage} alt='...'></img>
    )
}

export default FeaturedImage