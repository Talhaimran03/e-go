import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import LocationComponent from './geo'
import './components_css/qr.css';
import { Link } from 'react-router-dom';
import arrow from '../img/arrow.svg'

class QrContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Se vuoi raccogliere punti ricordati di scannerizzare il QR Code che trovi sul bus',
      locationData: null, // Aggiunto stato per memorizzare i dati di localizzazione
    };
    this.handleScan = this.handleScan.bind(this);
  }

  componentDidMount() {
    const locationData = JSON.parse(localStorage.getItem('locationData'));
    if (locationData) {
      this.setState({ locationData });
    } else {
      this.getLocation(); // Richiama la funzione per ottenere la localizzazione se non è stata salvata
    }
  }
  

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const locationData = { latitude, longitude };
          this.setState({ locationData }, () => {
            // Salva i dati di localizzazione in localStorage
            localStorage.setItem('locationData', JSON.stringify(locationData));
          });
        },
        error => {
          console.error('Errore nella geolocalizzazione:', error);
        }
      );
    } else {
      console.error('Geolocalizzazione non supportata');
    }
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
                <div className='geolocalisation'>
                  <LocationComponent></LocationComponent>
                </div>
            </div>
      </div>
    );
  }
}

export default QrContainer;
