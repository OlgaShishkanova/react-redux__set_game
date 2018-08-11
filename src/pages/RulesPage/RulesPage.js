import React, { Component } from 'react'
import classNames from "classnames";


export default class RulesPage extends Component {

    render () {

        return (
            <div className='rules'>

                <h2>What is a SET?</h2>

                <p>A SET is three cards where each feature, when looked at individually, is either all the same OR all
                different. Each card contains four features: color (orange, purple or green), shape (oval, rectangle or
                    diamond), number (one, two or three) and shading (solid, striped or outlined).</p>

                <p>The example of the SET
                <img src='/public/images/set_example.png'/></p>

                <h2>How to play</h2>

                <p>When you see a SET you should click on the cards you've chosen. Whether you're wrong or right you'll see
                    conforming message on the top of the screen. Like those:  </p>
                <div className={classNames('alert', 'show', 'yes',)}>YEEAAAHHH!</div>
                <div className={classNames('alert', 'show', 'no',)}>NO :(</div>


                <p>Sometimes there's no SET on the field. In that case you can add 3 cards more. Just push this button — <button className="usual_btn">Add 3 cards</button></p>

                <p>Also if you don't see a SET and nothing comes to you head — don't get upset! We have a cheat button for you — <button className="usual_btn">Get a tip</button>
                Just push it and you'll see the answer ;)</p>

                <p>And finally when you find all sets and you're super cool you'll see this colorful message — </p>
                <div className={classNames('alert', 'show', 'celebrate',)}>CONGRATULATION! YOU WON!</div>

                    <h2>SET is a game of thinking fun!</h2>
            </div>
        );
    }
}
