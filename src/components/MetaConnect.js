import {
Button, DropdownButton, } from "react-bootstrap"
import { formatEther } from "@ethersproject/units";
import {useEthers,useEtherBalance} from "@usedapp/core"
export default  function Buttonmeta() {
    const { activateBrowserWallet,account}=useEthers()
    const balance=useEtherBalance(account);

    function handleConnect(){
        activateBrowserWallet();
    }

    return account ? (
        <>
         
        <DropdownButton id="dropdown-basic-button" title="MetaMask Account">
        <div className="mx-1 "
        style={{}}>
        <p color="white" className=''>
         Account: {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`} </p>
            <p>Balance:{balance && parseFloat(formatEther(balance)).toFixed(3)} ETH</p>
        </div>
        </DropdownButton>
        
        </>
    ) : (<Button onClick={handleConnect}> Connect to Metamask</Button>);
}