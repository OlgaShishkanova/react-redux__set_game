import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import RulesPage from '../pages/RulesPage/RulesPage'

export default class AuthorizedLayout extends Component {
    render () {
        const { match } = this.props;

        //location нужен в AsideBlock, чтобы тот, оставаясь PureComponent, мог отслеживать изменение пути страницы
        return (
            <Switch>
                <Route path={`${match.path}`} exact component={HomePage}/>
                <Route path={`${match.path}rules`} component={RulesPage}/>
                <Redirect to="/"/>
            </Switch>
        )
    }

}
