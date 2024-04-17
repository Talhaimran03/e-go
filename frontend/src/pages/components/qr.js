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
      locationData: null, // Aggiunto stato per memorizzare i dati di localizzazione
      isDesktop: window.innerWidth > 768
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
    if (result && (result.text.includes('id=ATV'))) {
      this.setState({ result: result.text });
      const lastFourDigits = result.text.slice(-4); // Estrai le ultime 4 cifre del link
      this.setState({ lastFourDigits }); // Aggiungi le ultime 4 cifre allo stato
      window.location.href = 'https://localhost:3000/activeHome';
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
    const { isDesktop } = this.state;
    const camStyle = {
      width: '100%',
      height: '100%',
    };

    return (
      <div className='map-page1'>

        <div>
            {this.state.showError && (
              <div className="error-page">
              </div>
            )}
            {this.state.lastFourDigits && (
              <div className="last-four-digits"></div>
            )}
        </div>
            <Link to="/"> 
                <div className='back1'>
                    <img className='arrow1' src={arrow} alt="arrow"></img>
                </div>
            </Link>
            
            <p className='p1'>Se vuoi raccogliere punti ricordati di scannerizzare il QR Code che trovi sul bus: {this.state.lastFourDigits}</p>
            
            <div className='scheda1'>
                <div className='div-qr1'>
                <QrReader
                  delay = { 300 }
                  style = { camStyle }
                  constraints={isDesktop ? undefined : { video: { facingMode: 'environment' } }}
                  onError={this.handleError}
                  onScan={this.handleScan}
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

export default QrContainer;
