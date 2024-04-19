import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import LocationComponent from './geo'
import './components_css/qr.css';
import { withRouter } from './withRouter';
import { Link } from 'react-router-dom';
import arrow from '../img/arrow.svg'
import axios from 'axios';
import { checkSession } from './sessionService';


class QrContainer extends Component {
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
    if (result && (result.text.includes('id=ATV'))) {
      const qrNumber = result.text.slice(-4);
      if (qrNumber !== this.state.qrData) {
        this.setState({ qrData: qrNumber }, () => {
          this.sendDataToBackend();
        });
      }
    } else if (result && result.text.includes('https://stops.atv')) {
      setTimeout(() => {
        this.setState({ error: "Scannerizza il codice QR del bus" });
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
    console.log(this.state)
    try {
      const { locationData, qrData } = this.state;
      const token = localStorage.getItem('token');

      if (locationData && qrData && token) {
        const startCoordinates = `${locationData.latitude},${locationData.longitude}`;
        const response = await axios.post('http://localhost:8080/ego/routes/addRoute', {
          startCoordinates: startCoordinates,
          qrData: qrData
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });

        if (response.data && response.data.errors) {
          this.setState({ error: response.data.errors.join(', ') });
        } else {
            this.props.navigate('/activeHome');
        }

        console.log(response.data);
      } else {
        console.error('Dati del QR, della posizione o del token mancanti.');
      }
    } catch (error) {
      console.error('Errore:', error);
    }
  }

  render() {
    const { isDesktop, error } = this.state;
    const camStyle = {
      width: '100%',
      height: '100%',
    };

    return (
      <div className='map-page1'>

        <div>
            {error ? <p>{error}</p> : null}
          {this.state.qrData && (
            <div className="last-four-digits"></div>
          )}
        </div>
        <Link to="/">
          <div className='back1'>
            <img className='arrow1' src={arrow} alt="arrow"></img>
          </div>
        </Link>

        <p className='p1'>Se vuoi raccogliere punti ricordati di scannerizzare il QR Code che trovi sul bus: {this.state.qrData}</p>

        <div className='scheda1'>
          <div className='div-qr1'>
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

export default withRouter(QrContainer);
