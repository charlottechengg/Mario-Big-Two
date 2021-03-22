import React, {Component} from 'react'

const imageDir = importAll(require.context('../res/Asset', false, /\.png$/)); 

class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        if(this.props.user === "player"){
            this.props.selectCard(this.props.card)
        }
    }

    render(){
        let image = this.props.card.imagePath
        if(this.props.user === "player") {
            let cardClass = (this.props.selected) ? "selectedcard" : ""
            return(
                <React.Fragment>
                    <img onClick={this.handleClick} alt="card" className={"card " + cardClass} src={imageDir[image]}></img>
                </React.Fragment>
            )
        } else if(this.props.user === "opponent"){
            return(
                <React.Fragment>
                    <div>
                    <img onClick={this.handleClick} alt="card" className={this.props.class}  src={imageDir["Back.png"]}></img>
                    {/* <img onClick={this.handleClick} alt="card" className={this.props.class} src={imageDir[image]}></img> */}
                    </div>
                </React.Fragment>
            )
        } else {
                return(
                    <React.Fragment>
                        <img alt="card" className={this.props.class + " flip-in-ver-left"} src={imageDir[image]}></img>
                    </React.Fragment>
                )
        }
}}

/** 
 * Imports set of files at once
 * @param {Array} a items An array containing the items.
 */
function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }


export default Card