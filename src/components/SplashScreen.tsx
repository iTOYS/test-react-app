import React from 'react';
import logo from '../pulse.gif';

export const SplashScreen = (): JSX.Element => {
  return (
    <div className="Splash">
      <video autoPlay muted loop>
        <source src="pulse.mp4" type="video/mp4" />
        <img src={logo} className="App-logo" alt="logo" />
      </video>
    </div>
  );
};
