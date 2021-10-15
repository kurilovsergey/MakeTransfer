import React, {Suspense} from 'react';
import Preloader from '../components/common/Preloader/Preloader'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';


export function WithSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<div>loading...</div>} >
            <WrappedComponent {...props} />
        </React.Suspense>
    }
}