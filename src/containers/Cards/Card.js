import React, { Component } from 'react'
import {connect} from "react-redux";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";

@connect(mapStateToProps, mapDispatchToProps)
export default class Card extends Component {


    render () {

        return (
            <div>

            </div>
        );
    }

}
function mapStateToProps (state) {
    return {
        cards: state.cards
    }
}
function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(CardsActions, dispatch)
    }
}