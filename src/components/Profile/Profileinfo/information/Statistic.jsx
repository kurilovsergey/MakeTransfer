import React from 'react';
import s from './Statistic.module.css';

const Statistic =() => {
return (
  <div className={s.statistic}>
   <div className={s.statinseason}>
       <div className={s.label}>Матчи</div><div>1</div>
       <div className={s.label}>Голы</div><div>1</div>
       <div className={s.label}>Голевые передачи</div><div>1</div>
   </div>
   <div className={s.headinfo}>
   <div>Родился:</div>
   <div>Место рождения:</div>
   <div>Гражданство:</div>
   <div>Рост/вес:</div>
   <div>Статус в сборной</div>
   <div>Матчей за сборную</div>
   </div>
  </div>   
)
}

export default Statistic;