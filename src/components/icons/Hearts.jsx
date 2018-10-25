import React from "react";

const Hearts = props => (
  <svg height="20px" width="20px">
    <title>Heart</title>
    <path
      fill="red"
      d="M10,6 
             Q10,0 15,0 
             T20,6 
             Q20,10 15,14 
             T10,20 
             Q10,18 5,14
             T0,6
             Q0,0 5,0
             T10,6
             Z"
    />
  </svg>
);

export default Hearts;
