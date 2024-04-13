import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

import './components_css/stopQr.css';
import { Link } from 'react-router-dom';
import arrow from '../img/arrow.svg'

class QrContainer2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Per terminare il viaggio devi scannerizzare il QR Code che trovi alla fermata del bus',
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(result) {
    if (result) {
      this.setState({ result: result.text }); 
      window.location.href = 'http://localhost:3000';
    }
  }
  

  handleError(err) {
    console.error('Errore nella scansione:', err);
  }

  render() {
    const camStyle = {
      width: '85%',
      height: '100%',
    };

    const previewStyle = {
      width: 30,
      height: 20,
    };

    return (
      <div className='map-page3'>
            <Link to="/"> 
                <div className='back3'>
                    <img className='arrow3' src={arrow} alt="arrow"></img>
                </div>
            </Link>
            <p className='p3'>{this.state.result}</p>
            <div className='scheda3'>
                <div className='div-qr3'>
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={camStyle}
                        previewStyle={previewStyle}
                    />
                </div>
            </div>
      </div>
    );
  }
}

export default QrContainer2;
