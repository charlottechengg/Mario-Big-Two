import React from 'react';
import PropTypes from 'prop-types'
const images = importAll(require.context('../res/Asset', false, /\.png$/)); 

const Card = (props) =>{
    const onClick = () => {
        if(props.user === "player"){
            props.selectCard(props.card)
        }
    }

    const image = props.card.imagePath
    if(props.user === "opponent") {
        return(
            <div>
                <img className={props.class}  alt="card-image" src={images["Back.png"]}/>
            </div>
    )} else if(props.user === "player"){
        const classname = (props.selected) ? "selectedcard" : ""
            return(
                <img onClick={onClick}  className={"card " + classname} alt = "card-image" src={images[image]}/>)
    } else {
        return(
            <img className={props.class + " flip"} alt=  "card-image" src={images[image]}/>)
    }
}

function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}

Card.defaultProps = {
    props:{
        user: "",
    }
}

Card.propTypes = {
    props:{
        user: PropTypes.string.isRequired,
    }
}


export default Card