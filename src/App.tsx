import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const connector = connectors[0];
    connect({ connector });
  }, []);

  return (
    <>
      <div>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
      <div>
        <h2>Status</h2>
        <div>{status}</div>
      </div>

      {account.status !== "connected" && (
        <div>
          <div>
            <h2>Reconnect</h2>
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
              >
                Reconnect
              </button>
            ))}
          </div>

          {error?.message && (
            <div>
              <h2>Error</h2>
              <div>Error message: {error?.message}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
