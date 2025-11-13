import React, { useState, useEffect } from 'react';
import './ModernNavbar.css';

const SimpleNavbar = () => {
  const [account, setAccount] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const connectWallet = async () => {
    try {
      setConnecting(true);
     
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask to connect your wallet');
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setConnecting(false);
    }
  };

  const formatAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  };


  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
   
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
   
    localStorage.setItem('darkMode', newDarkMode);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
     
      <div className="logo">
        <span className="logo-icon">🚀</span>
        <span className="logo-text">BlockEstate</span>
      </div>

   
      <ul className="nav-links">
        <li>
          <a href="#">Buy</a>
        </li>
        <li>
          <a href="#">Sell</a>
        </li>
        <li>
          <a href="#">Lender</a>
        </li>
      </ul>

      <div className="navbar-actions">
      
        <button
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>

      
        <button
          className="connect-wallet-btn"
          onClick={connectWallet}
          disabled={connecting}
        >
          {account ? (
            <span className="account-address">{formatAddress(account)}</span>
          ) : (
            <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default SimpleNavbar;