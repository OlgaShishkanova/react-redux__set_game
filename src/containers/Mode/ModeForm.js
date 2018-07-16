import React, { Component } from 'react'
import {connect} from "react-redux";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";
import classNames from 'classnames'

@connect(null, mapDispatchToProps)
export default class ModeForm extends Component {

    state={
        selectedOption: ''
    };

    render () {

        return (
            <div>
                <div className='main_subtitle'>Please, choose the mode</div>
                <form className='mode_form' onSubmit={this.handleFormSubmit}>
                    <div className='mode_form__wrapper'>
                        <div className="mode_form__wrapper-radio">
                            <label className={classNames('mode_form__label', 'classic')}>
                                <input type="radio" value="classic"
                                       checked={this.state.selectedOption === 'classic'}
                                       onChange={this.handleOptionChange}/>
                                <span className='mode_form__custom-radio'>Classic one</span>
                            </label>
                        </div>
                        <div className="mode_form__wrapper-radio">
                            <label className={classNames('mode_form__label', 'nice')}>
                                <input type="radio" value="nice"
                                       checked={this.state.selectedOption === 'nice'}
                                       onChange={this.handleOptionChange}/>

                                <span className='mode_form__custom-radio'>Cute one</span>
                            </label>
                        </div>
                    </div>
                    <button className="usual_btn" type="submit">I've choosen!</button>
                </form>
            </div>
        );
    }

    handleOptionChange = (event)=>{
        this.setState({
            selectedOption: event.currentTarget.value
        });
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.actions.loadCardsData(this.state.selectedOption);
    };
}
function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(CardsActions, dispatch)
    }
}