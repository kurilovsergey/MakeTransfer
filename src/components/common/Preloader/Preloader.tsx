import preloader from '../../../assets/images/preloader.svg'
import React from 'react';

type PreloaderPropsType = {

}

let Preloader: React.FC<PreloaderPropsType> = (props) => {
    return <img src={preloader}/>
}

export default Preloader