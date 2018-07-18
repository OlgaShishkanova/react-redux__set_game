import React, { Component } from 'react'
import {connect} from "react-redux";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";
import classNames from 'classnames'

@connect(mapStateToProps, mapDispatchToProps)
export default class Card extends Component {


    render () {

        const {number, colors, form, fullness, images} = this.props;

        let arr =  Array.from({length: number}, (v, k) => k+1);

        return (
            <div className='cards-item'>
                <div>
                {arr.map((item, key) =>
                    <div key={key}
                         className={classNames('cards-item__form', `${form}`, `${fullness}`, `${colors}`)}
                         style={{borderColor: colors}}>
                        {images &&
                        <img src={images}/>
                        }
                    </div>
                )}
                </div>
            </div>
        );
    }

}
function mapStateToProps (state) {
    return {
        cards: state.cards
    }
}
function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(CardsActions, dispatch)
    }
}