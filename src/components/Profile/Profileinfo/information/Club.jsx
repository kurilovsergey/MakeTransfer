import React from 'react';
import s from './Club.module.css';

const Club =() => {
return (
    <div className={s.club}>
      <div className={s.team}>
        <div>
          <img src="https://tmssl.akamaized.net//images/wappen/normquad/506.png?lm=1539869052"/></div>
        <div>
            <div>Name</div>
            <div>Tournament</div>
            <div>Место</div>
            <div>Im Team seit:(в команде)</div> 
            <div>Vertrag bis:(по какое)</div>
        </div>
      </div>
      <div className={s.fee}>
          <div><h1>100</h1></div>
          <div><h1>Mil</h1></div>
          <div><h1>Eur</h1></div>
      </div>
      <div id={s.field}>Поле</div>
    </div>
      
)
}

export default Club;