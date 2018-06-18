import React, { Component } from 'react'
import * as FormHandlerActions from "../../actions/FormHandlerActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Input from "../../components/Base/Input"

@connect(mapStateToProps, mapDispatchToProps)
export default class IntroPage extends Component {

    state = {
        tryToSubmit: false
    };

    handleSubmit(e) {

        e.preventDefault();
        //check active errors
        let items = document.querySelector('[data-error-text]');
        if (!items) {
            this.submit()
        }
    }


    submit() {
        const {name} = this.state;
        localStorage.setItem('userName', JSON.stringify(name.value))
    }

    //change tryToSubmit for implementation the errors
    checkTheForm() {
        this.setState({
            tryToSubmit: true
        })
    }


    render() {

        const {name} = this.props.state;
        const {tryToSubmit} = this.state

        return (
            <div>
                Hello, it's the IntroPage
                <form className=""
                      onSubmit={()=>this.handleSubmit()}
                >

                    <Input
                        placeholder="Please enter your name"
                        name="email"
                        type="text"
                        value={name.value}
                        actions={this.props.actions}
                        required={true}
                        fakePlaceholder={true}
                        {...{tryToSubmit}}
                    />

                    <button onClick={()=>this.checkTheForm()}>Enter</button>
                </form>

            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        state: state.form_handler
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(FormHandlerActions, dispatch)
    }
}
