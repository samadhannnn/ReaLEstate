import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import close from '../assets/close.svg';
import './Home.css';



const Home = ({ home, provider, account, escrow, togglePop }) => {
    const [hasBought, setHasBought] = useState(false)
    const [hasLended, setHasLended] = useState(false)
    const [hasInspected, setHasInspected] = useState(false)
    const [hasSold, setHasSold] = useState(false)

    const [buyer, setBuyer] = useState(null)
    const [lender, setLender] = useState(null)
    const [inspector, setInspector] = useState(null)
    const [seller, setSeller] = useState(null)
    const [owner, setOwner] = useState(null)
    
    const [isLoading, setIsLoading] = useState(false);
    const [isContractReady, setIsContractReady] = useState(false);
    const [transferComplete, setTransferComplete] = useState(false);
  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showFullscreen, setShowFullscreen] = useState(false);
    
    const getAllImages = () => {
      if (!home) return [];
      
      const mainImage = home.image;
      const additionalImages = home.additionalImages || [];
      
      return [mainImage, ...additionalImages];
    };
    
    const propertyImages = getAllImages();
    
    const openFullscreen = () => {
      setShowFullscreen(true);
      document.body.style.overflow = 'hidden';
    };
    
    const closeFullscreen = () => {
      setShowFullscreen(false);
      document.body.style.overflow = 'auto';
    };
    
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === propertyImages.length - 1 ? 0 : prevIndex + 1
      );
    };
    
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? propertyImages.length - 1 : prevIndex - 1
      );
    };
    
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (!showFullscreen) return;
        
        if (e.key === 'Escape') closeFullscreen();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showFullscreen]);

    const isAccountRole = (role) => {
      if (!account || !role) return false;
      return account.toLowerCase() === role.toLowerCase();
    };

    const fetchDetails = async () => {
     
      if (!escrow || !home || !home.id) {
        console.log("Missing escrow contract or home data");
        setIsContractReady(false);
        return;
      }
      
      try {
        console.log("Fetching contract details for home ID:", home.id);
        
      
        const seller = await escrow.seller();
        console.log("Seller address:", seller);
        setSeller(seller);
        
       
        const buyer = await escrow.buyer(home.id);
        console.log("Buyer address:", buyer);
        setBuyer(buyer);
        
        
        const lender = await escrow.lender();
        console.log("Lender address:", lender);
        setLender(lender);
        
    
        const inspector = await escrow.inspector();
        console.log("Inspector address:", inspector);
        setInspector(inspector);
        
        
        if (buyer && buyer !== ethers.constants.AddressZero) {
          const hasBought = await escrow.approval(home.id, buyer);
          console.log("Buyer approval status:", hasBought);
          setHasBought(hasBought);
        }
        
        if (seller && seller !== ethers.constants.AddressZero) {
          const hasSold = await escrow.approval(home.id, seller);
          console.log("Seller approval status:", hasSold);
          setHasSold(hasSold);
        }
        
        if (lender && lender !== ethers.constants.AddressZero) {
          const hasLended = await escrow.approval(home.id, lender);
          console.log("Lender approval status:", hasLended);
          setHasLended(hasLended);
        }
        
        if (inspector && inspector !== ethers.constants.AddressZero) {
          const hasInspected = await escrow.inspectionPassed(home.id);
          console.log("Inspector approval status:", hasInspected);
          setHasInspected(hasInspected);
        }
        
       
        const isListed = await escrow.isListed(home.id);
        console.log("Property listed status:", isListed);
        
        
        if (hasBought && hasLended && hasInspected && hasSold && !isListed) {
          setOwner(buyer);
          setTransferComplete(true);
        }
        
        setIsContractReady(true);
      } catch (error) {
        console.error("Error fetching contract details:", error);
        setIsContractReady(false);
      }
    };

    const fetchOwner = async () => {
      if (!escrow || !home || !home.id) return;
      
      try {
        // Check if the property is still listed
        const isListed = await escrow.isListed(home.id);
        if (isListed) {
          setOwner(null);
          setTransferComplete(false);
          return;
        }
        
        // If not listed, get the buyer as the owner
        const owner = await escrow.buyer(home.id);
        console.log("Property owner:", owner);
        setOwner(owner);
        setTransferComplete(true);
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };

    const buyHandler = async () => {
      if (!escrow || !home || !home.id || !provider) {
        console.error("Missing required contract data for purchase");
        return;
      }
      
      setIsLoading(true);
      try {
        
        const currentBuyer = await escrow.buyer(home.id);
        const isNewPurchase = currentBuyer === ethers.constants.AddressZero;
        
        
        if (!isNewPurchase && currentBuyer.toLowerCase() !== account.toLowerCase()) {
          alert("Only the assigned buyer can complete this purchase");
          setIsLoading(false);
          return;
        }
        
        const escrowAmount = await escrow.escrowAmount(home.id);
        console.log("Escrow amount:", ethers.utils.formatEther(escrowAmount), "ETH");
        
        const signer = await provider.getSigner();
        console.log("Using signer for address:", account);

        console.log("Depositing earnest money...");
        let transaction = await escrow.connect(signer).depositEarnest(home.id, { value: escrowAmount });
        await transaction.wait();

        console.log("Approving sale...");
        transaction = await escrow.connect(signer).approveSale(home.id);
        await transaction.wait();

        console.log("Purchase approved!");
        setHasBought(true);
        setBuyer(account); 
        setIsLoading(false);
        
       
        if (hasLended && hasInspected && hasSold) {
          await fetchOwner();
        }
      } catch (error) {
        console.error("Error during purchase:", error);
        
        let errorMessage = "Transaction failed";
        if (error.data && error.data.message) {
          errorMessage = error.data.message;
        } else if (error.message) {
          
          const match = error.message.match(/'(.*?)'/);
          if (match && match[1]) {
            errorMessage = match[1];
          }
        }
        alert(`Error: ${errorMessage}`);
        setIsLoading(false);
      }
    };

    const inspectHandler = async () => {
      if (!escrow || !home || !provider) return;
      
     
      if (!isAccountRole(inspector)) {
        alert("Only the inspector can approve inspection");
        return;
      }
      
      setIsLoading(true);
      try {
        const signer = await provider.getSigner();
        console.log("Inspector approving property...");
        
        const transaction = await escrow.connect(signer).updateInspectionStatus(home.id, true);
        await transaction.wait();
        
        console.log("Inspection approved!");
        setHasInspected(true);
        setIsLoading(false);
        
        
        if (hasBought && hasLended && hasSold) {
          await fetchOwner();
        }
      } catch (error) {
        console.error("Error during inspection:", error);
        let errorMessage = "Transaction failed";
        if (error.data && error.data.message) {
          errorMessage = error.data.message;
        } else if (error.message) {
          const match = error.message.match(/'(.*?)'/);
          if (match && match[1]) {
            errorMessage = match[1];
          }
        }
        alert(`Error: ${errorMessage}`);
        setIsLoading(false);
      }
    };

    const lendHandler = async () => {
      if (!escrow || !home || !provider) return;
      
      
      if (!isAccountRole(lender)) {
        alert("Only the lender can approve lending");
        return;
      }
      
      setIsLoading(true);
      try {
        const signer = await provider.getSigner();
        console.log("Lender approving sale...");

        const transaction = await escrow.connect(signer).approveSale(home.id);
        await transaction.wait();

        const purchasePrice = await escrow.purchasePrice(home.id);
        const escrowAmount = await escrow.escrowAmount(home.id);
        const lendAmount = purchasePrice.sub(escrowAmount);
        
        console.log("Sending funds:", ethers.utils.formatEther(lendAmount), "ETH");
        
        await signer.sendTransaction({
          to: escrow.address, 
          value: lendAmount.toString(), 
          gasLimit: 60000
        });
        
        console.log("Lending approved and funds sent!");
        setHasLended(true);
        setIsLoading(false);
        
        
        if (hasBought && hasInspected && hasSold) {
          await fetchOwner();
        }
      } catch (error) {
        console.error("Error during lending:", error);
        let errorMessage = "Transaction failed";
        if (error.data && error.data.message) {
          errorMessage = error.data.message;
        } else if (error.message) {
          const match = error.message.match(/'(.*?)'/);
          if (match && match[1]) {
            errorMessage = match[1];
          }
        }
        alert(`Error: ${errorMessage}`);
        setIsLoading(false);
      }
    };

    const sellHandler = async () => {
      if (!escrow || !home || !provider) return;
      
      if (!isAccountRole(seller)) {
        alert("Only the seller can approve and finalize the sale");
        return;
      }
      
      setIsLoading(true);
      try {
        const signer = await provider.getSigner();
        console.log("Seller approving sale...");

        let transaction = await escrow.connect(signer).approveSale(home.id);
        await transaction.wait();

        console.log("Finalizing sale...");
        transaction = await escrow.connect(signer).finalizeSale(home.id);
        await transaction.wait();

        console.log("Sale completed!");
        setHasSold(true);
        setIsLoading(false);
        
        await fetchOwner();
      } catch (error) {
        console.error("Error during sale:", error);
        let errorMessage = "Transaction failed";
        if (error.data && error.data.message) {
          errorMessage = error.data.message;
        } else if (error.message) {
          const match = error.message.match(/'(.*?)'/);
          if (match && match[1]) {
            errorMessage = match[1];
          }
        }
        alert(`Error: ${errorMessage}`);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      setHasBought(false);
      setHasLended(false);
      setHasInspected(false);
      setHasSold(false);
      
      if (escrow && home && home.id) {
        fetchDetails();
      }
    }, [account]);

    useEffect(() => {
      const initContractData = async () => {
        if (escrow && home && home.id) {
          console.log("Initializing contract data for home ID:", home.id);
          console.log("Current account:", account);
          console.log("Escrow contract address:", escrow.address);
          
          await fetchDetails();
          await fetchOwner();
        } else {
          console.log("Waiting for escrow contract or home data...");
          if (!escrow) console.log("Escrow contract not available");
          if (!home) console.log("Home data not available");
          if (home && !home.id) console.log("Home ID not available");
        }
      };
      
      initContractData();
    }, [escrow, home, account]); 

    
    useEffect(() => {
      if (escrow && home && home.id) {
        if (hasBought && hasLended && hasInspected && hasSold) {
          fetchOwner();
        }
      }
    }, [hasBought, hasLended, hasInspected, hasSold]);

    const areAllApprovalsComplete = () => {
      return hasBought && hasLended && hasInspected && hasSold;
    };

    const getActionButtonText = () => {
      if (!isContractReady) return 'Loading...';
      
      if (isAccountRole(inspector)) {
        return hasInspected ? 'Inspection Approved' : 'Approve Inspection';
      } else if (isAccountRole(lender)) {
        return hasLended ? 'Lending Approved' : 'Approve & Lend';
      } else if (isAccountRole(seller)) {
        return hasSold ? 'Sale Completed' : 'Approve & Sell';
      } else if (buyer && isAccountRole(buyer)) {
        return hasBought ? 'Purchase Approved' : 'Purchase';
      } else {
        const hasExistingBuyer = buyer && buyer !== ethers.constants.AddressZero;
        return hasExistingBuyer ? 'Another Buyer Selected' : 'Buy Property';
      }
    };
    
    const getActionHandler = () => {
      if (isAccountRole(inspector)) {
        return inspectHandler;
      } else if (isAccountRole(lender)) {
        return lendHandler;
      } else if (isAccountRole(seller)) {
        return sellHandler;
      } else if (buyer && buyer !== ethers.constants.AddressZero) {
        if (isAccountRole(buyer)) {
          return buyHandler;
        } else {
          return () => alert("Only the assigned buyer can complete this purchase");
        }
      } else {
        return buyHandler;
      }
    };
    
    const isActionButtonDisabled = () => {
      if (!isContractReady || isLoading) return true;
      
      if (isAccountRole(inspector)) {
        return hasInspected;
      } else if (isAccountRole(lender)) {
        return hasLended;
      } else if (isAccountRole(seller)) {
        return hasSold;
      } else if (buyer && buyer !== ethers.constants.AddressZero) {
        if (isAccountRole(buyer)) {
          return hasBought;
        } else {
          return true;
        }
      } else {
        return false;
      }
    };

    const renderApprovalStatus = () => {
      return (
        <div className="approval-status">
          <h3>Approval Status</h3>
          <div className="approval-grid">
            <div className={`approval-item ${hasBought ? 'approved' : 'pending'}`}>
              <span className="role">Buyer</span>
              <span className="status">{hasBought ? '✓ Approved' : '⌛ Pending'}</span>
              {buyer && <span className="address">{buyer.slice(0,6) + '...' + buyer.slice(38,42)}</span>}
            </div>
            
            <div className={`approval-item ${hasInspected ? 'approved' : 'pending'}`}>
              <span className="role">Inspector</span>
              <span className="status">{hasInspected ? '✓ Approved' : '⌛ Pending'}</span>
              {inspector && <span className="address">{inspector.slice(0,6) + '...' + inspector.slice(38,42)}</span>}
            </div>
            
            <div className={`approval-item ${hasLended ? 'approved' : 'pending'}`}>
              <span className="role">Lender</span>
              <span className="status">{hasLended ? '✓ Approved' : '⌛ Pending'}</span>
              {lender && <span className="address">{lender.slice(0,6) + '...' + lender.slice(38,42)}</span>}
            </div>
            
            <div className={`approval-item ${hasSold ? 'approved' : 'pending'}`}>
              <span className="role">Seller</span>
              <span className="status">{hasSold ? '✓ Approved' : '⌛ Pending'}</span>
              {seller && <span className="address">{seller.slice(0,6) + '...' + seller.slice(38,42)}</span>}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="home">
        <div className="home__details">
          <div className="home__image">
            <img 
              src={propertyImages[currentImageIndex]} 
              alt="Property view" 
              onClick={openFullscreen}
            />
            
            <div className="gallery-thumbnails">
              {propertyImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="home__overview">
            <h1>{home.name}</h1>
            <p>
              <strong>{home.attributes[2].value}</strong> bds |
              <strong>{home.attributes[3].value}</strong> ba |
              <strong>{home.attributes[4].value}</strong> sqft
            </p>
            <p>{home.address}</p>
            <h2>{home.attributes[0].value} ETH</h2>
            
            {renderApprovalStatus()}
            
            <div className="home__buttons">
              {transferComplete && owner ? (
                <div className='property-owned'>
                  <h3>Property Transfer Complete</h3>
                  <p>Owned by {owner.slice(0,6) + '...' + owner.slice(38,42)}</p>
                  {isAccountRole(owner) && <p className="your-property">This is your property!</p>}
                </div>
              ) : areAllApprovalsComplete() ? (
                <div className='finalizing'>
                  <p>All approvals complete. Finalizing transfer...</p>
                  {buyer && (
                    <p>This property will be owned by {buyer.slice(0,6) + '...' + buyer.slice(38,42)}</p>
                  )}
                </div>
              ) : (
                <div className="action-buttons">
                  <button 
                    className="home__buy" 
                    onClick={getActionHandler()} 
                    disabled={isActionButtonDisabled()}
                  >
                    {isLoading ? 'Processing...' : getActionButtonText()}
                  </button>
                
                  <button className="home__contact">
                    Contact agent
                  </button>
                </div>
              )}
            </div>
            
            <hr />
            <h2>Overview</h2>
            <p>{home.description}</p>
            
            <hr />
            <h2>Facts and Features</h2>
            <ul>
              {home.attributes.map((attribute, index) => (
                <li key={index}>
                  <strong>{attribute.trait_type}</strong>: {attribute.value}
                </li>
              ))}
            </ul>
          </div>
          
          <button onClick={togglePop} className="home__close">
            <img src={close} alt="Close" />
          </button>
        </div>
        
        {showFullscreen && (
          <div className="gallery-fullscreen">
            <img 
              src={propertyImages[currentImageIndex]} 
              alt="Property fullscreen view" 
              className="gallery-fullscreen__image" 
            />
            
            <div className="gallery-fullscreen__controls">
              <button className="gallery-control-btn" onClick={prevImage}>Previous</button>
              <button className="gallery-control-btn" onClick={closeFullscreen}>Close</button>
              <button className="gallery-control-btn" onClick={nextImage}>Next</button>
            </div>
            
            <div className="gallery-thumbnails">
              {propertyImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
};

export default Home;