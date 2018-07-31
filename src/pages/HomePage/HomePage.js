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
        isRight: false
    };


    render () {

        const {intro_name} = this.props.state;
        const {data, score, mistakes} = this.props.cards;
        const {message, isAlert, isRight} = this.state;

        return (
            <div className='home_wrapper'>
                {data.length === 0 ?
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
                        <div className={classNames('alert', isAlert && 'show', isRight? 'yes': 'no')}>{message}</div>
                    <CardsContainer/>
                    </Fragment>
                }
            </div>
        );
    }

    componentDidMount(){
        this.props.actions.localStorageSetItem('score', 0);
    }
    componentDidUpdate(prevProps){

        const {score, mistakes} = this.props.cards;

        if(score !== prevProps.cards.score) {
            this.setState({
                message: 'YEEAAAHHH!',
                isRight: true,
                isAlert: true
            });
            this.removeAlert()
        }

        if(mistakes !== prevProps.cards.mistakes) {
            this.setState({
                message: 'NO :(',
                isRight: false,
                isAlert: true
            });
            this.removeAlert()
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