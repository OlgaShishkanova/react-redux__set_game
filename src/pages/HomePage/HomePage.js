import React, { Component, Fragment } from 'react'
import {connect} from "react-redux";
import * as AppActions from "../../actions/AppActions";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";
import ModeForm from "../../containers/Mode/ModeForm";
import CardsContainer from "../../containers/Cards/CardsContainer";
import classNames from 'classnames'

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {

    state = {
        isAlert: false,
        message: '',
        status: 'neutral'
    };


    render () {

        const {intro_name} = this.props.state;
        const {data, score, mistakes} = this.props.cards;
        const {message, isAlert, status} = this.state;

        return (
            <div className='home__wrapper'>
                {data && data.length === 0 ?
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
                        <div className={classNames('alert', isAlert && 'show',
                            {yes: status === 'yes'},
                            {no: status === 'no'},
                            {neutral: status === 'neutral'}
                        )}>{message}</div>
                        <div className='home__buttons'>
                            <button className={classNames('usual_btn', this.props.cards.pieceOfCards.length > 12 && 'disabled')} onClick={this.addCards}>Add 3 cards</button>
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

        const {score, mistakes, isSet} = this.props.cards;

        if(score !== prevProps.cards.score) {
            this.setState({
                message: 'YEEAAAHHH!',
                status: 'yes',
                isAlert: true
            });
            this.removeAlert()
        }

        if(mistakes !== prevProps.cards.mistakes) {
            this.setState({
                message: 'NO :(',
                status: 'no',
                isAlert: true
            });
            this.removeAlert()
        }
        if(isSet !== prevProps.cards.isSet && isSet === false) {
            if(this.props.cards.data.length !== 0){
                this.setState({
                    message: 'NO SET HERE',
                    isAlert: true,
                    status: 'neutral'
                });
            }else{
                this.setState({
                    message: 'CONGRATULATION! YOU WON!',
                    isAlert: true,
                    status: 'celebrate'
                });
            }
        }

        if(this.props.cards.pieceOfCards.length !== prevProps.cards.pieceOfCards.length && this.props.cards.data.length === 0){
            this.props.cardsActions.getTip()
        }
    }

    removeAlert = () =>{
        setTimeout(() => { this.setState({
            isAlert: false
        }); }, 2000);
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