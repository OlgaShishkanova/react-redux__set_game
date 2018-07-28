import React, { Component } from 'react'
import Card from "./Card";
import {connect} from "react-redux";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";

@connect(mapStateToProps, mapDispatchToProps)
export default class CardsContainer extends Component {


    render() {

        const {pieceOfCards} = this.props.state;

        return (
            <div>
                {pieceOfCards &&
                <div className='cards'>
                    {pieceOfCards.map((item, key) =>
                        <Card item={item} key={key}/>
                    )}
                </div>
                }
            </div>
        );
    }

    componentDidMount() {
        this.props.actions.getRandomCards(12)
    }

    componentDidUpdate(prevProps) {

        if (this.props.state.chosenCards !== prevProps.state.chosenCards && this.props.state.chosenCards.length === 3) {
            this.props.actions.checkSet()
        }
    }


}
function mapStateToProps (state) {
    return {
        state: state.cards
    }
}
function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(CardsActions, dispatch)
    }
}