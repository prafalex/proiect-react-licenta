import { Button, DropdownButton, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import {ethers} from 'ethers'


export default function Buttonmeta() {
  const [errorMeta, setError] = useState(null)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [connecting,setConnecting]=useState(false)
	const [account, setDefaultAccount] = useState(null);
	const [balance, setUserBalance] = useState(null);


  //ETH CONNECT
	const handleConnect = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
      setConnecting(true)
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				getAccountBalance(result[0]);
        setConnecting(false)
			})
			.catch(error => {
				setError(error.message);
        setShow(true)
			});

		} else {
			console.log('Need to install MetaMask');
			setError('Please install MetaMask browser extension to interact');
      setShow(true)
		}
	}
  
  // update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount.toString());
		getAccountBalance(newAccount.toString());
    
	}


  //GET ETH Balance
  
	const getAccountBalance = (account) => {
    if(account){
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setError(error.message);
      setShow(true)
		});
  }
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}
  //check if accounts is changed only is window.ethereum is present
  if(window.ethereum){
    window.ethereum.on('accountsChanged', accountChangedHandler);
  	window.ethereum.on('chainChanged', chainChangedHandler);
  }
  return (account) ? (
    <>
      <DropdownButton id="dropdown-basic-button" title="Wallet Connected">
        <div className="mx-1 " style={{}}>
          <p color="white" className="">
            Account:
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length,
              )}`}
          </p>
          <p>
            {balance && <>Balance:{balance} ETH </>  }
          </p>
        </div>
      </DropdownButton>
    </>
  ) : (
    <>
      <Button onClick={handleConnect}>
        {!connecting && 'Connect to MetaMask'}
        {connecting && 'Connecting...'}
      </Button>

      {errorMeta && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>MetaMask🦊 ERROR</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMeta}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}
