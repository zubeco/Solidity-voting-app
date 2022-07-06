import React, { useEffect, useState } from "react";
import web3 from "../ethereum/web3";

const Btn = () => {
  const handleClick = () => {
    window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const [showConnectBtn, setShowConnectBtn] = useState(true);

  useEffect(async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length) {
      setShowConnectBtn(false);
    } else {
      setShowConnectBtn(true);
    }

    window.ethereum.on("accountsChanged", (accounts) => {
      // Do something
      // console.log(accounts);
      if (accounts.length) {
        setShowConnectBtn(false);
      } else {
        setShowConnectBtn(true);
      }
    });
  }, []);

  return (
    <div>
      {showConnectBtn ? (
        <button
          className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md"
          onClick={handleClick}
        >
          Connect Wallet
        </button>
      ) : null}
    </div>
  );
};

export default Btn;
