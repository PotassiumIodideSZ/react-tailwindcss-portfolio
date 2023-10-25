import React, { Component } from 'react'

class DrawingBoard extends Component {
  

  render() {
    
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  }
}

export default Phaser2048;

import React from "react";
import "./assets/css/DrawingBoard.css";

export const Day = () => {
  return (
    <div className="day">
      <div className="div-2">
        <div className="board">
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
          <Row className="row-instance" property="default" />
        </div>
        <div className="sidebar">
          <div className="top-section">
            <div className="title">Доска для рисования</div>
            <img className="divider" alt="Divider" src="divider.svg" />
            <div className="how-to">
              <div className="text-wrapper">How to play?</div>
              <div className="instructions">
                <div className="instruction">Well, simple and straightforward!</div>
                <div className="flexcontainer">
                  <p className="text-i">
                    <span className="span">
                      Hover on the squares
                      <br />
                    </span>
                  </p>
                  <p className="text-i">
                    <span className="span">
                      Click to nail it
                      <br />
                    </span>
                  </p>
                  <p className="text-i">
                    <span className="span">Long press </span>
                  </p>
                </div>
                <div className="flexcontainer">
                  <p className="span-wrapper">
                    <span className="text-wrapper-2">
                      Let your creative bloom, take a screenshot and share yours with hashtags.
                      <br />
                    </span>
                  </p>
                  <p className="span-wrapper">
                    <span className="text-wrapper-3">#BROSTeam #FigmaPrototypeChallenge</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="frame">
            <div className="shortcuts">
              <div className="div-3">
                <div className="div-wrapper">
                  <div className="text-wrapper-4">B</div>
                </div>
                <div className="text-wrapper-5">=&nbsp;&nbsp; Undo</div>
              </div>
              <div className="div-3">
                <div className="div-wrapper">
                  <div className="text-wrapper-4">R</div>
                </div>
                <div className="text-wrapper-5">=&nbsp;&nbsp; Reset</div>
              </div>
            </div>
            <div className="shortcuts">
              <div className="div-3">
                <div className="div-wrapper">
                  <div className="text-wrapper-4">T</div>
                </div>
                <div className="text-wrapper-5">=&nbsp;&nbsp; VN/EN</div>
              </div>
            </div>
          </div>
          <div className="credit">
            <div className="container">
              <div className="overlap-group">
                <ThNgNguyNLogo className="thng-nguyn-logo" />
                <div className="logo-text">
                  <BrosLogo className="BROS-logo" />
                  <p className="p">Please like and share if you find this interesting. Thank you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};