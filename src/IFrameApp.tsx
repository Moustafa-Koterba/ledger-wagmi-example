import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import { useEffect, useState } from "react";

const provider = new IFrameEthereumProvider();

function subscribeOnAccountsChanged(
  provider: IFrameEthereumProvider,
  subscribe: (account: string) => void
) {
  provider.on("accountsChanged", (accounts: string[]) => {
    console.log("[DEBUG] Accounts changed:", accounts);
    subscribe(accounts[0]);
  });
}

function IFrameApp() {
  const [status, setStatus] = useState("connecting");
  const [account, setAccount] = useState("");

  subscribeOnAccountsChanged(provider, (account) => {
    setAccount(account);
    setStatus("connected");
  });

  useEffect(() => {
    provider.send("eth_requestAccounts").then((accounts) => {
      setAccount(accounts[0]);
      setStatus("connected");
    });
  }, []);

  return (
    <>
      <div>
        <h2>Using Iframe provider</h2>
        <h2>Account</h2>
        <p>Status: {status}</p>
        {account && <p>Address: {account}</p>}
      </div>
    </>
  );
}

export default IFrameApp;
