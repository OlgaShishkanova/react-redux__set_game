import React, { Component } from 'react'
import Card from "./Card";
import {connect} from "react-redux";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";

@connect(mapStateToProps, mapDispatchToProps)
export default class CardsContainer extends Component {


    render () {

        const {data} = this.props;

        return (
            <div className='cards'>
                {data.map((item, key) =>
                    <Card {...item} key={key}/>
                )}
            </div>
        );
    }

    componentDidMount(){
        this.props.actions.getRandomCards(12)
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