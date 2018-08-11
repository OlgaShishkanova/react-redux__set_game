import React, { Component, Fragment } from 'react'
import {connect} from "react-redux";
import { NavLink } from 'react-router-dom'
import * as AppActions from "../../actions/AppActions";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";
import ModeForm from "../../containers/Mode/ModeForm";
import CardsContainer from "../../containers/Cards/CardsContainer";
import classNames from 'classnames'
import Alert from "../../components/Base/Alert";

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {


    render () {

        const {intro_name} = this.props.state;
        const {pieceOfCards, score, mistakes} = this.props.cards;

        return (
            <div className='home__wrapper'>
                <div className='home__rules-link__wrapper'>
                <NavLink className='home__rules-link' to="/rules" exact>Read the rules</NavLink>
                </div>
                {pieceOfCards && pieceOfCards.length === 0 ?
                    <Fragment>
                        <div className='main_title'>Hello, {intro_name}!</div>
                        <ModeForm/>
                    </Fragment>
                    :
                    <Fragment>
                        <div className='game-info'>
                            <div>Your SCORE: <span>{score}</span></div>
                            <div>Your mistakes: <span>{mistakes}</span></div>
                        </div>
                       <Alert cards = {this.props.cards}/>
                        <div className='home__buttons'>
                            <button
                                className={classNames('usual_btn', this.props.cards.pieceOfCards.length > 12 && 'disabled')}
                                onClick={this.addCards}>Add 3 cards
                            </button>
                            <button className='usual_btn' onClick={this.getTip}>Get a tip</button>
                        </div>
                        <CardsContainer/>
                    </Fragment>
                }
            </div>
        );
    }

    addCards = (e) => {
        e.preventDefault();
        if(this.props.cards.pieceOfCards && this.props.cards.pieceOfCards.length === 12){
            this.props.cardsActions.getRandomCards(3)
        }
    };

    getTip = (e) => {
        e.preventDefault();
        this.props.cardsActions.getTip()
    };


    componentDidMount(){
        this.props.actions.localStorageSetItem('score', 0);
    }
    componentDidUpdate(prevProps){

        if(this.props.cards.pieceOfCards.length !== prevProps.cards.pieceOfCards.length && this.props.cards.data.length === 0){
            let finish = true;
            this.props.cardsActions.getTip(finish)
        }
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