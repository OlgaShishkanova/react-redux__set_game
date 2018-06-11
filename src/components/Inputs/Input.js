import React, { PureComponent } from 'react'
//import css from './Input.scss'
import PropTypes from 'prop-types'
//import ErrorsHandler from '../../components/ErrorsHandler/ErrorsHandler'

export default class Input extends PureComponent {

    static propTypes = {

        fields_errors: PropTypes.array,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        tryToSubmit: PropTypes.bool,
        type: PropTypes.string,
        value: PropTypes.string.isRequired,
        textarea: PropTypes.bool
    };

    handleChange (e) {
        const { name, onChange } = this.props;

        onChange(name, { value: e.target.value })
    }

    render () {

        const {
            type = 'text',
            placeholder,
            name,
            value,
            textarea,
            required,
            tryToSubmit,
            fields_errors,
            newPassValue
        } = this.props

        return (
            <div>


                {textarea ?
                    <textarea
                    {...{ type, placeholder, name, value }}
                    onChange={::this.handleChange}
                />
                    :
                <input
                    {...{ type, placeholder, name, value }}
                    onChange={::this.handleChange}
                />
                }
                <ErrorsHandler
                    nameOfInput={name} {...{
                    newPassValue,
                    type,
                    tryToSubmit,
                    required,
                    value,
                    fields_errors
                }}/>
            </div>
        )
    }

}