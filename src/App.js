import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navigation from './components/Navigation';
import Home from './components/Home';
import propertyData from './properties';
import './App.css';
     




const RealEstateABI = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
          }
      ],
      "name": "ApprovalForAll",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getApproved",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "operator",
              "type": "address"
          }
      ],
      "name": "isApprovedForAll",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "tokenURI",
              "type": "string"
          }
      ],
      "name": "mint",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "ownerOf",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
          }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "operator",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
          }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
          }
      ],
      "name": "supportsInterface",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "tokenURI",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
];

const EscrowABI = [
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_nftAddress",
              "type": "address"
          },
          {
              "internalType": "address payable",
              "name": "_seller",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "_inspector",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "_lender",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "approval",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_nftID",
              "type": "uint256"
          }
      ],
      "name": "approveSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "buyer",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_nftID",
              "type": "uint256"
          }
      ],
      "name": "cancelSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_nftID",
              "type": "uint256"
          }
      ],
      "name": "depositEarnest",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "escrowAmount",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_nftID",
              "type": "uint256"
          }
      ],
      "name": "finalizeSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "inspectionPassed",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "inspector",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "isListed",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "lender",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_nftID",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "_buyer",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_purchasePrice",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_escrowAmount",
              "type": "uint256"
          }
      ],
      "name": "list",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "nftAddress",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "purchasePrice",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "seller",
      "outputs": [
          {
              "internalType": "address payable",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_nftID",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "_passed",
              "type": "bool"
          }
      ],
      "name": "updateInspectionStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
  }
];


function App() {
  const [provider, setProvider] = useState(null);
  const [escrow, setEscrow] = useState(null);
  const [realEstate, setRealEstate] = useState(null);
  const [account, setAccount] = useState(null);
  const [homes, setHomes] = useState([]);
  const [home, setHome] = useState({});
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyListed, setShowOnlyListed] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [filterOptions, setFilterOptions] = useState({
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    minBaths: '',
    minSqft: ''
  });
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [darkMode, setDarkMode] = useState(false);

  // Load initial blockchain data and connect to account automatically
  const loadBlockchainData = async () => {
    console.log("Loading blockchain data...");
    setLoading(true);
    setError(null);
    
    try {
      // Initialize provider and connect to account
      let provider;
      
      if (window.ethereum) {
        console.log("MetaMask found, initializing provider...");
        provider = new ethers.providers.Web3Provider(window.ethereum);
        
   
        try {
          
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("User denied account access");
          setError("Please connect your MetaMask wallet to continue");
          setLoading(false);
          return;
        }
      } else {
        console.log("MetaMask not found, connecting to local node...");
        provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
      }
      
      console.log("Provider connected");
      setProvider(provider);

      // Get network ID
      const network = await provider.getNetwork();
      console.log("Network ID:", network.chainId);
      
      // Hard-coded contract addresses from your deployment output
      const realEstateAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const escrowAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      
      // Get contract instances
      const realEstateContract = new ethers.Contract(
        realEstateAddress,
        RealEstateABI,
        provider
      );
      
      const escrowContract = new ethers.Contract(
        escrowAddress,
        EscrowABI,
        provider
      );
      
      setRealEstate(realEstateContract);
      setEscrow(escrowContract);

      try {
        const processedHomes = [];
        
        // Load favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('realEstateFavorites')) || [];
        setFavorites(savedFavorites);
        
        // Load compare list from localStorage
        const savedCompareList = JSON.parse(localStorage.getItem('realEstateCompare')) || [];
        setCompareList(savedCompareList);
        
        // For testing: Mark only the first three properties as listed
        for (const property of propertyData) {
          try {
            let price = property.price ? property.price : '10'; // Default price if not specified
            
            // Mark only first three properties as listed (for testing)
            const isListed = property.id <= 8; 
            
            processedHomes.push({
              ...property,
              price: price,
              listedOnChain: isListed,
              isFavorite: savedFavorites.includes(property.id)
            });
          } catch (error) {
            
          }
        }
                console.log(`Processed ${processedHomes.length} homes, all marked as listed on blockchain`);
        setHomes(processedHomes);
      } catch (error) {
        console.error("Error loading homes, falling back to local data:", error);
       
        const savedFavorites = JSON.parse(localStorage.getItem('realEstateFavorites')) || [];
        setHomes(propertyData.map(property => ({ 
          ...property, 
          listedOnChain: true, 
          checkError: true,
          isFavorite: savedFavorites.includes(property.id)
        })));
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      setError(`Failed to connect to blockchain: ${error.message}`);
      setLoading(false);
    }
  };

  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
      
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          
          
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0] || null);
          });
          
          return true;
        }
        return false;
      } catch (error) {
        console.error("User denied account access");
        setError("Please connect your MetaMask wallet to continue");
        return false;
      }
    } else {
      setError("MetaMask not detected. Please install MetaMask to connect your wallet.");
      return false;
    }
  };


  useEffect(() => {
    
    loadBlockchainData();
    
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
   
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
    
    
    const savedFavorites = JSON.parse(localStorage.getItem('realEstateFavorites')) || [];
    setFavorites(savedFavorites);
    
    const savedCompareList = JSON.parse(localStorage.getItem('realEstateCompare')) || [];
    setCompareList(savedCompareList);
    
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);
 
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  
  useEffect(() => {
    setHomes(prevHomes => 
      prevHomes.map(home => ({
        ...home,
        isFavorite: favorites.includes(home.id)
      }))
    );
  }, [favorites]);

  const togglePop = (home) => {
    setHome(home);
    toggle ? setToggle(false) : setToggle(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleListedOnly = () => {
    setShowOnlyListed(!showOnlyListed);
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const toggleFavorite = (id, event) => {
    
    if (event) {
      event.stopPropagation();
    }
    
   
    let newFavorites = [...favorites];
    
    
    const index = newFavorites.indexOf(id);
    
    if (index === -1) {
      
      newFavorites.push(id);
    } else {
      
      newFavorites.splice(index, 1);
    }
    
    
    setFavorites(newFavorites);
    localStorage.setItem('realEstateFavorites', JSON.stringify(newFavorites));
  };
  
  const toggleCompare = (id, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    let newCompareList = [...compareList];
    const index = newCompareList.indexOf(id);
    
    if (index === -1) {
      if (newCompareList.length < 3) {
        newCompareList.push(id);
      } else {
        alert('You can compare up to 3 properties at a time');
        return;
      }
    } else {
      newCompareList.splice(index, 1);
    }
    
    setCompareList(newCompareList);
    localStorage.setItem('realEstateCompare', JSON.stringify(newCompareList));
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value
    });
  };
  
  const clearFilters = () => {
    setFilterOptions({
      minPrice: '',
      maxPrice: '',
      minBeds: '',
      minBaths: '',
      minSqft: ''
    });
  };

  
  let displayedHomes = homes;
  
  if (showOnlyListed) {
    displayedHomes = displayedHomes.filter(home => home.listedOnChain);
  }
  
  if (sortOption === 'favorites') {
    displayedHomes = displayedHomes.filter(home => home.isFavorite);
  }

  if (filterOptions.minPrice) {
    displayedHomes = displayedHomes.filter(home => parseFloat(home.price) >= parseFloat(filterOptions.minPrice));
  }
  
  if (filterOptions.maxPrice) {
    displayedHomes = displayedHomes.filter(home => parseFloat(home.price) <= parseFloat(filterOptions.maxPrice));
  }
  
  if (filterOptions.minBeds) {
    displayedHomes = displayedHomes.filter(home => 
      home.attributes && 
      home.attributes[2] && 
      parseInt(home.attributes[2].value) >= parseInt(filterOptions.minBeds)
    );
  }
  
  
  if (filterOptions.minBaths) {
    displayedHomes = displayedHomes.filter(home => 
      home.attributes && 
      home.attributes[3] && 
      parseInt(home.attributes[3].value) >= parseInt(filterOptions.minBaths)
    );
  }
  
  if (filterOptions.minSqft) {
    displayedHomes = displayedHomes.filter(home => 
      home.attributes && 
      home.attributes[4] && 
      parseInt(home.attributes[4].value.replace(/,/g, '')) >= parseInt(filterOptions.minSqft)
    );
  }
  

  if (sortOption === 'price-asc') {
    displayedHomes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOption === 'price-desc') {
    displayedHomes.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOption === 'newest') {
   
    displayedHomes.sort((a, b) => b.id - a.id);
  }
  
  
  const compareProperties = homes.filter(home => compareList.includes(home.id));

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Navigation 
        account={account} 
        connectWallet={connectWallet}
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <div className="main-content">
        <div className="filter-bar">
          <div className="filter-section">
            <button 
              className={`filter-btn ${showOnlyListed ? 'active-filter' : ''}`} 
              onClick={toggleListedOnly}
            >
              <i className="fas fa-check-circle"></i> Listed Properties
            </button>
            <button 
              className={`filter-btn ${sortOption === 'favorites' ? 'active-filter' : ''}`} 
              onClick={() => setSortOption(sortOption === 'favorites' ? 'default' : 'favorites')}
            >
              <i className="fas fa-heart"></i> Favorites
            </button>
            <button 
              className={`filter-btn ${showCompare ? 'active-filter' : ''}`} 
              onClick={() => setShowCompare(!showCompare)}
              disabled={compareList.length === 0}
            >
              <i className="fas fa-balance-scale"></i> Compare ({compareList.length})
            </button>
            {/* <button 
              className="view-toggle" 
              onClick={toggleViewMode} 
              title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
            >
              <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'th'}`}></i>
            </button> */}
          </div>
          
          <div className="sort-section">
            <select value={sortOption} onChange={handleSortChange} className="sort-dropdown">
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="favorites">Favorites</option>
            </select>
            
            <div className="advanced-filters">
              <input 
                type="number" 
                name="minPrice" 
                placeholder="Min Price (ETH)" 
                value={filterOptions.minPrice} 
                onChange={handleFilterChange}
                className="filter-input"
              />
              <input 
                type="number" 
                name="maxPrice" 
                placeholder="Max Price (ETH)" 
                value={filterOptions.maxPrice} 
                onChange={handleFilterChange}
                className="filter-input"
              />
              <input 
                type="number" 
                name="minBeds" 
                placeholder="Min Beds" 
                value={filterOptions.minBeds} 
                onChange={handleFilterChange}
                className="filter-input"
              />
              <input 
                type="number" 
                name="minBaths" 
                placeholder="Min Baths" 
                value={filterOptions.minBaths} 
                onChange={handleFilterChange}
                className="filter-input"
              />
              <input 
                type="number" 
                name="minSqft" 
                placeholder="Min Sqft" 
                value={filterOptions.minSqft} 
                onChange={handleFilterChange}
                className="filter-input"
              />
              <button onClick={clearFilters} className="clear-btn">
                <i className="fas fa-times"></i> Clear
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading blockchain data...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error">
              <h3>Connection Error</h3>
              <p>{error}</p>
              <button onClick={() => loadBlockchainData()} className="retry-button">
                <i className="fas fa-sync-alt"></i> Retry Connection
              </button>
            </div>
          </div>
        ) : (
          <div className="content-area">
            {showCompare && compareList.length > 0 && (
              <div className="compare-container">
                <div className="compare-header">
                  <h3>Property Comparison</h3>
                  <button onClick={() => setShowCompare(false)} className="close-compare">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <div className="compare-table">
                  <div className="compare-row compare-header-row">
                    <div className="compare-cell"></div>
                    {compareProperties.map(property => (
                      <div className="compare-cell" key={property.id}>
                        <img src={property.image} alt={property.address} className="compare-img" />
                        <div className="property-address">{property.address}</div>
                        <button 
                          className="remove-compare" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompare(property.id);
                          }}
                        >
                          <i className="fas fa-times-circle"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="compare-row">
                    <div className="compare-cell">Price</div>
                    {compareProperties.map(property => (
                      <div className="compare-cell" key={property.id}>
                        <div className="compare-value">{property.price} ETH</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="compare-row">
                    <div className="compare-cell">Bedrooms</div>
                    {compareProperties.map(property => (
                      <div className="compare-cell" key={property.id}>
                        <div className="compare-value">
                          {property.attributes && property.attributes[2] ? property.attributes[2].value : 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="compare-row">
                    <div className="compare-cell">Bathrooms</div>
                    {compareProperties.map(property => (
                      <div className="compare-cell" key={property.id}>
                        <div className="compare-value">
                          {property.attributes && property.attributes[3] ? property.attributes[3].value : 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="compare-row">
                    <div className="compare-cell">Square Feet</div>
                    {compareProperties.map(property => (
                      <div className="compare-cell" key={property.id}>
                        <div className="compare-value">
                          {property.attributes && property.attributes[4] ? property.attributes[4].value : 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="compare-row">
                    <div className="compare-cell">Listed on Blockchain</div>
                    {compareProperties.map(property => (
                      <div className="compare-cell" key={property.id}>
                        <div className="compare-value">
                          {property.listedOnChain ? 'Yes' : 'No'} 
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="compare-row">
                    <div className="compare-cell">Actions</div>
                    {compareProperties.map(property => (
                      <div className="compare-cell" key={property.id}>
                        <button 
                          className="view-details-button" 
                          onClick={() => togglePop(property)}
                        >
                          View Details
                        </button>
                        <button 
                          className={`favorite-toggle ${property.isFavorite ? 'favorited' : ''}`}
                          onClick={(e) => toggleFavorite(property.id, e)}
                        >
                          {property.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {displayedHomes.length > 0 ? (
              <div className={viewMode === 'grid' ? 'cards-grid' : 'cards-list'}>
                {displayedHomes.map((home, index) => (
                  <div 
                    className={`property-card ${home.listedOnChain ? 'listed' : ''} ${home.isFavorite ? 'favorited' : ''}`} 
                    key={index} 
                    onClick={() => togglePop(home)}
                  >
                    <div className='card-image'>
                      <img src={home.image} alt="Home" />
                      {home.listedOnChain && 
                        <span className="listed-badge">
                          <i className="fas fa-check-circle"></i> Blockchain Listed
                        </span>
                      }
                      <div className="card-actions">
                        <button 
                          className={`favorite-button ${home.isFavorite ? 'active' : ''}`}
                          onClick={(e) => toggleFavorite(home.id, e)}
                          title={home.isFavorite ? "Remove from favorites" : "Add to favorites"}
                          aria-label={home.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          {home.isFavorite ? '❤️' : '🤍'}
                        </button>
                        <button 
                          className={`compare-button ${compareList.includes(home.id) ? 'active' : ''}`}
                          onClick={(e) => toggleCompare(home.id, e)}
                          title={compareList.includes(home.id) ? "Remove from compare" : "Add to compare"}
                          aria-label={compareList.includes(home.id) ? "Remove from compare" : "Add to compare"}
                        >
                          👁️
                        </button>
                      </div>
                    </div>
                    <div className='card-info'>
                      <h4>{home.address}</h4>
                      <div className="property-details">
                        {home.attributes && home.attributes.length >= 5 ? (
                          <div className="attributes">
                            <span><i className="fas fa-bed"></i> {home.attributes[2].value} beds</span>
                            <span><i className="fas fa-bath"></i> {home.attributes[3].value} baths</span>
                            <span><i className="fas fa-vector-square"></i> {home.attributes[4].value} sqft</span>
                          </div>
                        ) : (
                          <p className="no-details">Property details not available</p>
                        )}
                      </div>
                      <div className="price-section">
                        <p className="price">{home.price} ETH</p>
                        <button className="view-button">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>No properties found matching your criteria.</p>
                <button onClick={clearFilters} className="retry-button">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {toggle && provider && escrow && (
        <Home 
          home={home} 
          provider={provider} 
          account={account} 
          escrow={escrow} 
          togglePop={togglePop} 
          isFavorite={favorites.includes(home.id)} 
          toggleFavorite={(id) => toggleFavorite(id)}
        />
      )}
    </div>
  );
}

export default App;