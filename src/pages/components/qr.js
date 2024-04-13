import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

import './components_css/qr.css';
import { Link } from 'react-router-dom';
import arrow from '../img/arrow.svg'

class QrContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Se vuoi raccogliere punti ricordati di  scannerizzare il QR Code che trovi sul bus',
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(result) {
    if (result) {
      this.setState({ result: result.text }); 
      window.location.href = 'http://localhost:3000/activeHome';
    }
  }
  

  handleError(err) {
    console.error('Errore nella scansione:', err);
  }

  render() {
    const camStyle = {
      width: '100%',
      height: '100%',
    };


    return (
      <div className='map-page1'>
            <Link to="/"> 
                <div className='back1'>
                    <img className='arrow1' src={arrow} alt="arrow"></img>
                </div>
            </Link>
            <p className='p1'>{this.state.result}</p>
            <div className='scheda1'>
                <div className='div-qr1'>
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={camStyle}
                    />
                </div>
            </div>
      </div>
    );
  }
}

export default QrContainer;
