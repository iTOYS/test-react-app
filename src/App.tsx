import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Users } from './components/Users';
import { SplashScreen } from './components/SplashScreen';
import './App.css';
import { setVisible } from './components/UsersSlice';

function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  setTimeout(() => {
    setShowSplash(false);
    dispatch(setVisible(true));
  }, 3000);

  return (
    <>
      {showSplash ? <SplashScreen /> : ''}
      <Users />
    </>
  );
}

export default App;
