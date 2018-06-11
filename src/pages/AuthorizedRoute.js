import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
// import cssGrid from 'css/grid.css'
// import classNames from 'classnames'

//distribution page while checking user's name

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthorizedRoute extends Component {

    render () {
        const { component: Component } = this.props;
        const { name,
            //pending
        } = this.props.state;

        return (

            <Switch>
                <Route render={props => {
                    //if (pending) return <div>Loading...</div>
                    return name !== ''
                        ? <Component {...props} />
                        : <Redirect to={{
                            pathname: '/intro/',
                            state: {referrer: this.props.location.pathname}
                        }}/>
                }}/>
            </Switch>

        );
    }

    //check user's name
    componentDidMount () {
        const { name } = this.props.state;
        if (name === '') {
            let localStorage = window.localStorage;
            this.props.actions.localStorageSubscribe(localStorage)
        }
    }
}

function mapStateToProps (state) {
    return {
        state: state.app
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}


