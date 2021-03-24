import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
const images = importAll(require.context('../res/Asset', false, /\.png$/)); 

const Card = (props) =>{
    const path = props.card.imagePath


    if(props.user === "opponent") {
        return(
            <div>
                <img className={props.class}  alt="card-image" src={images["Back.png"]}/>
            </div>
    )} else if(props.user === "player"){
        const classname = (props.selected) ? "selectedcard" : ""
            return(
                <img onClick={() => props.selectCard(props.card)}  className={"card " + classname} alt = "card-image" src={images[path]}/>)
    } else {
        return(
            <img className={props.class + " flip-in-ver-left"} alt=  "card-image" src={images[path]}/>)
    }
}

/*!
 * Imports all card images from the folder.
 * \fn string replaceStrings(translation, parameters)
 * \memberof Definitions
 * \param string translation Translation string 
 * \param array parameters (optional) List of parameters
 * \return string replaced string
 */
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



export default Card