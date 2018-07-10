import React, { Component, Fragment } from 'react'
import {connect} from "react-redux";
import * as AppActions from "../../actions/AppActions";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";
import ModeForm from "../../containers/Mode/ModeForm";
import CardsContainer from "../../containers/Cards/CardsContainer";

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {


    render () {

        const {intro_name} = this.props.state;
        const {data} = this.props.cards;

        return (
            <div>
                {data.length === 0 ?
                    <Fragment>
                        Hello, {intro_name}!
                        <ModeForm/>
                    </Fragment>
                    :
                    <CardsContainer data={data}/>
                }
            </div>
        );
    }

    componentDidMount(){
        this.props.actions.localStorageSetItem('score', 0);
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