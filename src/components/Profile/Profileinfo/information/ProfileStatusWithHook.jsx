import React, {useState, useEffect} from 'react';



const ProfileStatusWithHook = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)},
    [props.status]
  );
  
  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () =>{
    setEditMode(false);
    props.updateStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

return( 
    <div>
      { !editMode &&
    <div> 
      <span onDoubleClick={activateEditMode}>{props.status || "no status"}</span>
    </div>
  } 
  { editMode &&
    <div>
        <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode}></input>
    </div>
  }
  </div>
)
}


export default ProfileStatusWithHook;


