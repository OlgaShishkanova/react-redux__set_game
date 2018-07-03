import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import AuthorizedRoute from './AuthorizedRoute'
import AuthorizedLayout from '../layouts/AuthorizedLayout'
import IntroPage from './IntroPage/IntroPage'

@withRouter
export default class Routes extends Component {

    componentDidUpdate (prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname &&
            this.props.scrollTop) {
            window.scrollTo(0, 0)
        }
    }

    render () {

        return (

            <Switch>
                <Route path='/intro/' exact component={IntroPage}/>
                <AuthorizedRoute path='/' component={AuthorizedLayout}/>
            </Switch>

        )
    }
}
