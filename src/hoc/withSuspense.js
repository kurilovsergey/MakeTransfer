import React, {Suspense} from 'react';
import Preloader from '../../src/components/common/Preloader/Preloader'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

export const WithSuspence = (Component) => {
    
return (props) => {
    return <Suspense fallback={<Preloader/>}>
           <Component {...props}/>
           </Suspense>
}
}