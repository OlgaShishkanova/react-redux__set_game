import React, { Component } from 'react'
import {connect} from "react-redux";

@connect(mapStateToProps)
export default class HomePage extends Component {

    render () {

        const {intro_name} = this.props.state;

        return (
            <div>
                Hello, {intro_name}, it's HomePage
            </div>
        );
    }
}
function mapStateToProps (state) {
    return {
        state: state.app,
    }
}