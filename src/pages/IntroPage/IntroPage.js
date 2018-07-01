import React, { Component } from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Redirect } from 'react-router-dom'
import Input from "../../components/Base/Input"
import * as AppActions from "../../actions/AppActions";

@connect(mapStateToProps, mapDispatchToProps)

export default class IntroPage extends Component {

    state = {
        tryToSubmit: false
    };

    handleSubmit = (e) => {

        e.preventDefault();
        //check active errors
        let items = document.querySelector('[data-error-text]');
        if (!items) {
            this.submit()
        }
    };


    submit() {
        const {name} = this.props.form_handler;
        this.props.actions.localStorageSetItem('userName', name.value)
    }

    //change tryToSubmit for implementation the errors
    checkTheForm() {
        this.setState({
            tryToSubmit: true
        })
    }

    render() {

        const {name} = this.props.form_handler;
        const {intro_name} = this.props.state;
        const {tryToSubmit} = this.state;

            if(intro_name !== null){
                    const {referrer} = this.props.location.state;
                    return <Redirect to={referrer}/>
            }else {

                return (
                    <div>
                        Hello, it's the IntroPage
                        <form className=""
                              onSubmit={this.handleSubmit}
                        >

                            <Input
                                placeholder="Please enter your name"
                                name="name"
                                type="text"
                                value={name.value}
                                required={true}
                                fakePlaceholder={true}
                                {...{tryToSubmit}}
                            />

                            <button onClick={() => this.checkTheForm()}>Enter</button>
                        </form>

                    </div>
                );

            }


    }
}

function mapStateToProps (state) {
    return {
        state: state.app,
        form_handler: state.form_handler
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}
