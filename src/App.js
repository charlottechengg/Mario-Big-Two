/**
 * @file App.js
 * @description This file contains the class APP that renders and generates the game on a web page.
 * @author Manyi Cheng
 * @version Latest edition on April 10, 2021
 */
import React, { Component } from 'react';
import Game from './components/Game.jsx'
import './App.css';


/**
 * @class App
 * @description This is a class that renders and generates the game on a web page.
 * @extends Component
 */
class App extends Component {

  /**
   * @function render
   * @description The funtion that generates the game on a web page
   * @returns a div container that contains the web game
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Game/>
        </header>
      </div>
    );
  }
}

/**
 * @exports App
 */
export default App;
