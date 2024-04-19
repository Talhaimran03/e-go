import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import './components_css/stopQr.css';
import { withRouter } from './withRouter';
import { Link } from 'react-router-dom';
import arrow from '../img/arrow.svg'
import LocationComponent from './geo'
import axios from 'axios';
import { checkSession } from './sessionService';

class QrContainer2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: null,
      isDesktop: window.innerWidth > 768,
      qrData: null,
    };
    this.handleScan = this.handleScan.bind(this);
  }

  async componentDidMount() {
    const isLoggedIn = await checkSession();
    if (!isLoggedIn.success) {
      this.props.navigate('/login');
    }
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = { latitude, longitude };
          this.setState({ locationData });
        },
        (error) => {
          console.error('Errore nella geolocalizzazione:', error);
        }
      );
    } else {
      console.error('Geolocalizzazione non supportata');
    }
  }


  handleScan(result) {
    if (result && (result.text.includes('https://stops.atv'))) {
      const qrNumber = result.text.slice(-4);
      if (qrNumber !== this.state.qrData) {
        this.setState({ qrData: qrNumber }, () => {
          this.sendDataToBackend();
        });
      }
    } else if (result && result.text.includes('id=ATV')) {
      setTimeout(() => {
        this.setState({ error: "Scannerizza il codice QR della fertmata!" });
      }, 1000);
    } else {
      setTimeout(() => {
        if (result) {
          this.setState({ error: "Codice QR non valido" });
        }
      }, 1000);
    }
  }


  handleError(err) {
    console.error('Errore nella scansione:', err);
  }

  async sendDataToBackend() {

    try {
      const { locationData, qrData } = this.state;
      const token = localStorage.getItem('token');
      console.log(this.state)

      if (locationData && qrData && token) {
        const endCoordinates = `${locationData.latitude},${locationData.longitude}`;
        const response = await axios.put('http://localhost:8080/ego/routes/endRoute', {
          endCoordinates: endCoordinates,
          stopQR: qrData
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });

        if (response.data.data.errors != null) {
          this.props.navigate('/activeHome');
        }

        // console.log(response.data);
      } else {
        console.error('Dati del QR, della posizione o del token mancanti.');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  render() {
    const { isDesktop, error } = this.state;
    const camStyle = {
      width: '100%',
      height: '100%',
    };


    return (
      <div className='map-page3'>

        <div>
          {error ? <p>{error}</p> : null}
          {this.state.qrData && (
            <div className="last-four-digits"></div>
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
              style={camStyle}
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

export default withRouter(QrContainer2);
