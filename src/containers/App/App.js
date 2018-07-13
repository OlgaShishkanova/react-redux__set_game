import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../pages/Routes'
import '../../css/grid.scss';

export default class AppDesktop extends Component {

    render () {

        return (
            <BrowserRouter>
                <div className='grid__inner'>
                    <Routes/>
                </div>
            </BrowserRouter>
        );
    }
}
