import React, { Component } from 'react'
import Card from "./Card";

export default class CardsContainer extends Component {


    render () {

        const {data} = this.props;

        return (
            <div>
                {data.map((item, key) =>
                    <Card {...item} key={key}/>
                )}
            </div>
        );
    }

}