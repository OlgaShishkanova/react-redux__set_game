import React, { PureComponent } from 'react'
import '../../css/blocks/ErrorsHandler.scss'
import PropTypes from 'prop-types'

export default class ErrorsHandler extends PureComponent {

    state = {
        text: ''
    };

    static propTypes = {
        nameOfInput: PropTypes.string,
        required: PropTypes.bool,
        tryToSubmit: PropTypes.bool,
        type: PropTypes.string,
        value: PropTypes.string,
    };

    render () {

        const { text } = this.state;


        return (
            <div className="error">
                {/*//verify mistake in front-end*/}
                {text !== '' &&
                <div id="client-error" data-error-text>{text}</div>
                }
            </div>
        )
    }

    UNSAFE_componentWillReceiveProps (nextProps) {

        const {
            value, required
        } = this.props;

        //if content in field was deleted
        if (value !== nextProps.value && nextProps.value === '' && required) {
            this.setState({
                text: 'This field is required'
            })
            //если нажали кнопку при пустых полях
        } else if (nextProps.tryToSubmit && nextProps.value === '' && required) {
            this.setState({
                text: 'This field is required'
            })
        }
        //если данные в поле инпута не меняются
        else if (value === nextProps.value) {
            this.setState({
                text: this.state.text
            })
        }

    }

    componentWillUnmount(){
        this.setState({
            text: ''
        })
    }
}
