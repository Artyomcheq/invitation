import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import './fonts.css';

const IMAGES_TO_PRELOAD = [
  '/shariki.png',
  '/cvetoshki.png',
  '/cvetochki2.png',
  '/aizada.png',
  '/aizada2.png',
];

function App() {
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    };

    Promise.all(IMAGES_TO_PRELOAD.map(loadImage)).then(() => {
      if (isMounted) setTimeout(() => setIsLoaded(true), 300);

    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSecondImage((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="field">
      <Confetti
        numberOfPieces={50}
        recycle={true}
        gravity={0.05}
        colors={['#FFD700', '#FFA500', '#FF8C00', '#DAA520', '#F0E68C']}
        style={{ zIndex: 0, height: "100vh" }}
      />
      <div className="container">
        <div className={`card ${isLoaded ? 'card-unfolded' : 'card-folded'}`}>

          <div className="card-inner">
            <div className="card-img-second">
              <img className='card-img-second-img1' src="/shariki.png" alt="decor" />
              <img className='card-img-second-img2' src="/cvetoshki.png" alt="cvetoshki" />
              <img className='card-img-second-img3' src="/cvetochki2.png" alt="cvetoshki2" />
            </div>

            <div className="card-header">
              <div className="card-img-first">
                <img
                  src="/aizada.png"
                  alt="profile"
                  className={`img-main ${showSecondImage ? 'fade-out' : 'fade-in'}`}
                />

                <img
                  src="/aizada2.png"
                  alt="profile"
                  className={`img-main img-main-2 img-main-absolute ${showSecondImage ? 'fade-in' : 'fade-out'}`}
                />
              </div>
            </div>

            <div className="card-content">
              <span className="subtitle">ПРИГЛАШЕНИЕ НА ЮБИЛЕЙ</span>
              <h1 className="title">Приглашаю тебя на мой день рождения</h1>
              <p className="description">
                Разделите со мной этот особенный вечер в атмосфере праздника и искусства!
              </p>

              <div className="divider"></div>

              <div className="info-block">
                <div className="info-item">
                  <span className="info-label">ДАТА И ВРЕМЯ</span>
                  <span className="info-value">29 октября, 18:00</span>
                </div>
                <div className="info-item">
                  <span className="info-label">МЕСТО ПРОВЕДЕНИЯ</span>
                  <span className="info-value highlight">Ресторан Вавилон (малый зал)</span>
                  <span className="info-label">ТУРУСБЕКОВА/ЖИБЕК-ЖОЛУ</span>
                  <a href='https://2gis.kg/bishkek/geo/70000001019362616/74.585290,42.883893' target='_blank' className='info-button'>Посмотреть на карте</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card-cover">
            <span className="cover-symbol">✉️</span>
            <span className="cover-title">Приглашение...</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;