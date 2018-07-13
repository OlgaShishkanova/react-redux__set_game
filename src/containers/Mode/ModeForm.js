import React, { Component } from 'react'
import {connect} from "react-redux";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";

@connect(null, mapDispatchToProps)
export default class ModeForm extends Component {

    state={
        selectedOption: ''
    };

    render () {

        return (
            <div>
                <div>Please, choose the mode</div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="radio">
                        <label>
                            <input type="radio" value="classic"
                                   checked={this.state.selectedOption === 'classic'}
                                   onChange={this.handleOptionChange}/>
                            Classic one
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="nice"
                                   checked={this.state.selectedOption === 'nice'}
                                   onChange={this.handleOptionChange}/>
                            Cute one
                        </label>
                    </div>
                    <button className="btn btn-default" type="submit">I've choosen!</button>
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