import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

import './components_css/stopQr.css';
import { Link } from 'react-router-dom';
import arrow from '../img/arrow.svg'
import LocationComponent from './geo'

class QrContainer2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(result) {
    if (result && (result.text.includes('https://stops.atv'))) {
      this.setState({ result: result.text });
      const lastFourDigits = result.text.slice(-4); // Estrai le ultime 4 cifre del link
      this.setState({ lastFourDigits }); // Aggiungi le ultime 4 cifre allo stato
      window.location.href = 'http://localhost:3000';
    } else {
      // Mostra l'errore solo se non è già stato mostrato
      if (!this.state.showError) {
        this.setState({ showError: true });
      }
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
      <div className='map-page3'>

<div>
        {this.state.showError && (
          <div className="error-page">
            
          </div>
        )}
        {this.state.lastFourDigits && (
          <div className="last-four-digits">
          </div>
        )}
      </div>
            <Link to="/activeHome"> 
                <div className='back3'>
                    <img className='arrow3' src={arrow} alt="arrow"></img>
                </div>
            </Link>
            <p className='p3'>Per terminare il viaggio devi scannerizzare il QR Code che trovi alla fermata del bus: {this.state.lastFourDigits}</p>
            <div className='scheda3'>
                <div className='div-qr3'>
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={camStyle}
                    />
                </div>
                
            </div>
            <div className='geolocalisation'>
                  <LocationComponent></LocationComponent>
                </div>
      </div>
    );
  }
}

export default QrContainer2;
