import React, { Component } from 'react'
import {connect} from "react-redux";
import * as CardsActions from "../../actions/CardsActions";
import {bindActionCreators} from "redux";
import classNames from 'classnames'

@connect(mapStateToProps, mapDispatchToProps)
export default class Card extends Component {

    state = {
        chosen: false
    };

    render () {

        const {number, colors, form, fullness, images} = this.props.item;

        let arr =  Array.from({length: number}, (v, k) => k+1);

        return (
            <div className={classNames('cards-item', this.state.chosen && 'chosen')} onClick={this.toggleCardChoose}>
                <div>
                {arr.map((item, key) =>
                    <div key={key}
                         className={classNames('cards-item__form', `${form}`,
                             `${fullness}`, images && `${images}`)}
                         style={{borderColor: colors,
                             backgroundColor: fullness==='full' || fullness==='partly' ? colors : 'transparent'}}>
                        {images &&
                        <div className={classNames('cards-item__form-img', `${images}`, `${fullness}`)}/>

                        }
                    </div>
                )}
                </div>
            </div>
        );
    }

    toggleCardChoose = () => {
        this.setState({
            chosen: !this.state.chosen
        });
        this.props.actions.toggleCards(this.props.item)
    };


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