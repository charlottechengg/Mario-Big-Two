import React, { Component } from 'react';
import Card from './Card.jsx'

class PlayingField extends Component {
    render() {
        return (
            <div className="playingfield-container">
                <div id="opponentTop" className="playingfield-section section-top">
                    {this.props.opponentTop.map((card, i) => {
                        return (<Card key={i} card={card} class="field-card" user="field" />)
                    }
                    )}
                </div>
                <div className="playingfield-section">
                    <div id="opponentLeft" className="left-field">
                        {this.props.opponentLeft.map((card, i) => {
                            return (<Card key={i} card={card} class="field-card" user="field" />)
                        }
                        )}
                    </div>
                    <div id="opponentRight" className="right-field">
                        {this.props.opponentRight.map((card, i) => {
                            return (<Card key={i} card={card} class="field-card" user="field" />)
                        }
                        )}
                    </div>
                </div>
                <div id="player" className="playingfield-section section-top">
                    <div className="playingfield-player">
                        {this.props.player.map((card, i) => {
                            return (<Card key={i} card={card} class="field-card" user="field" />)
                        }
                        )}
                    </div>
                    <div className="playingfield-text">{this.props.playerFieldText}</div>
                </div>
            </div>
        )
    }

}


export default PlayingField
