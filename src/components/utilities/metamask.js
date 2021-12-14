export const connectMetam= async() =>{
    if(windows.ethereum){
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj={
                status: " ",
                address:addressArray[0],
            };
            return obj;
        } catch(error){
            return{
            address:"",
            status:" Connecting error " + error.message,
        };
    }
    }else { 
        return {
            address:"",
            status: (<p>Please install Metamask</p>),
        };
    }
};