import React, { Component } from 'react'


export default class RulesPage extends Component {

    render () {

        return (
            <div className='rules'>

                <h2>What is a SET?</h2>

                <p>A SET is three cards where each feature, when looked at individually, is either all the same OR all
                different. Each card contains four features: color (orange, purple or green), shape (oval, rectangle or
                    diamond), number (one, two or three) and shading (solid, striped or outlined).</p>

                <h2>How to play</h2>

                <p>When you see a SET you should click on the cards you've chosen. Whether you're wrong or right you'll see
                    conforming message on the top of the screen.  </p>
                <p>Sometimes there's no SET on the field. In that case you can add 3 cards more. Just push this button — <button className="usual_btn">Add 3 cards</button></p>

                <p>Also if you don't see a SET and nothing comes to you head. We have a cheat button for you — <button className="usual_btn">Get a tip</button></p>
                <p>Just push it and you'll see the answer ;)</p>

                    <h2>SET is a game of thinking fun!</h2>
            </div>
        );
    }
}
