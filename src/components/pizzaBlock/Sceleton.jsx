import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = (props) => (
  <ContentLoader 
   className="pizza-block"
    speed={1}
    width={400}
    height={800}
    viewBox="0 0 400 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="170" cy="170" r="170" /> 
    <rect x="20" y="360" rx="10" ry="0" width="320" height="23" /> 
    <rect x="34" y="520" rx="0" ry="0" width="91" height="25" /> 
    <rect x="150" y="500" rx="24" ry="24" width="180" height="60" /> 
    <rect x="20" y="400" rx="0" ry="0" width="320" height="88" />
  </ContentLoader>
)

export default Sceleton
