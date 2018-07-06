import React, { Component } from 'react'
import {connect} from "react-redux";
import * as AppActions from "../../actions/AppActions";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {

    render () {

        const {intro_name} = this.props.state;

        return (
            <div>
                Hello, {intro_name}, it's HomePage
            </div>
        );
    }

    componentDidMount(){
        this.props.actions.localStorageSetItem('score', 0);
        this.props.cardsActions.loadCardsData('nice');

    }
}
function mapStateToProps (state) {
    return {
        state: state.app,
        cards: state.cards
    }
}
function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch),
        cardsActions: bindActionCreators(CardsActions, dispatch)
    }
}