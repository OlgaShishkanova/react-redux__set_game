import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../pages/Routes'


export default class AppDesktop extends Component {

    render () {

        return (
            <BrowserRouter>
                <div>
                    <Routes/>
                </div>
            </BrowserRouter>
        );
    }
}
