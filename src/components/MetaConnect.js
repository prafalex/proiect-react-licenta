import { Button, DropdownButton, Modal } from 'react-bootstrap'
import { formatEther } from '@ethersproject/units'
import React, { useState } from 'react'
import { useEthers, useEtherBalance } from '@usedapp/core'

export default function Buttonmeta() {
  const [errorMeta, setError] = useState(null)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [connecting, setConnecting] = useState(false)

  const { activateBrowserWallet, account } = useEthers()
  const balance = useEtherBalance(account)

  const eth=window.ethereum
  


  const  handleConnect = ()=> {
      if(window.ethereum){
        activateBrowserWallet() 
        }
      else{
        console.log("Need to install MetaMask")
        setError('Please install MetaMask!')
        setShow(true)
      }
  }   

  
  return account ? (
    <>
      <DropdownButton id="dropdown-basic-button" title="MetaMask Account">
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
            Balance:{balance && parseFloat(formatEther(balance)).toFixed(3)} ETH
          </p>
        </div>
      </DropdownButton>
    </>
  ) : (
    <>
      <Button onClick={handleConnect}>
        Connect to MetaMask
        
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
