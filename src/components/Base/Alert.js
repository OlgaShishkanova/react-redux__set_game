import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames";

export default class Alert extends PureComponent {


    state = {
        isAlert: false,
        message: '',
        status: 'neutral'
    };

    timerId = 0;

    static propTypes = {
        cards: PropTypes.object,
    };

    render () {

        const {message, isAlert, status} = this.state;


        return (
            <div className={classNames('alert', isAlert && 'show',
                {yes: status === 'yes'},
                {no: status === 'no'},
                {neutral: status === 'neutral'},
                {celebrate: status === 'celebrate'}
            )}>{message}</div>
        )
    }

    removeAlert = () =>{
        this.timerId = setTimeout(() => { this.setState({
            isAlert: false
        }); }, 1500);
    }

    componentDidUpdate(prevProps){

        const {score, mistakes, isSet} = this.props.cards;

        if(score !== prevProps.cards.score) {
            console.log(this.timerId);
            clearTimeout(this.timerId);
            this.setState({
                message: 'YEEAAAHHH!',
                status: 'yes',
                isAlert: true
            });
            this.removeAlert()
        }
        if(mistakes !== prevProps.cards.mistakes) {
            clearTimeout(this.timerId);
            this.setState({
                message: 'NO :(',
                status: 'no',
                isAlert: true
            });
            this.removeAlert()
        }
        if(isSet !== prevProps.cards.isSet && isSet === false) {
            clearTimeout(this.timerId);
            if(this.props.cards.data.length !== 0){
                this.setState({
                    message: 'NO SET HERE',
                    isAlert: true,
                    status: 'neutral'
                });
            }
        }
        if(this.props.cards.congrats !== prevProps.cards.congrats && this.props.cards.congrats){
            clearTimeout(this.timerId);
            this.setState({
                message: 'CONGRATULATION! YOU WON!',
                isAlert: true,
                status: 'celebrate'
            });
        }
    }
}
