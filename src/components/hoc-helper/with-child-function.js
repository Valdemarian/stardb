// Rомпонент высшего порядка принимает в себя любой компонент (Wrapped) и устанавливает 
// ему в качестве children любую заданную функцию (fn)
import React from 'react';

const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};


export default withChildFunction;
