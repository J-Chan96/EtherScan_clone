import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";

const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    console.log(chainId);
    return chainId;
  };

  const getRequestAccounts = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(account);
    return account;
  };

  const addNetwork = async (chainId) => {
    const network = {
      chainId: chainId,
      chainName: "chanGanache",
      rpcUrls: ["http://127.0.0.1:9000"],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
    };

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const targetChainId = "0x1e2a";
        const chainId = await getChainId(); // 7722
        // 현재 너의 메타마스크 체인 아이디가 7722니?
        console.log("너의 체인 아이디", chainId);
        // console.log(Web3.utils.toHex('7722'))
        if (targetChainId !== chainId) {
          // network를 추가하는 코드 작성
          addNetwork(targetChainId);
        }
        const [account] = await getRequestAccounts();

        const web3 = new Web3(window.ethereum); // 요청을 메타마스크에 바로 보내줌
        setAccount(account);
        setWeb3(web3);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (window.ethereum) {
      init();
    }
  }, []);

  return [account, web3];
};

export default useWeb3;
