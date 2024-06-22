import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
function Alert() {
  let context = useContext(noteContext)
  const {alert} = context;
  let data="default"
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    if(alert){
         data=(alert.type).toString();
      
    }

    return (
        <div style={{height: '50px'}}>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          
           <strong>{capitalize(data)}</strong>: {alert.msg} 
        </div>}
        </div>
    )
}

export default Alert