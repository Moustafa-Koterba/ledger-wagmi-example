# Connect to Ledger Dapps Browser v2 with Wagmi

1. Generate a project using Wagmi

```shell
pnpm create wagmi
cd your-project-folder # go to the project folder
pnpm i # install dependencies
```

2. Add a `localManifest.json` file at the root of your project

```json
{
  "$schema": "https://live-app-catalog.ledger.com/schema.json",
  "id": "Wagmi Integration Test", # change it
  "name": "Wagmi Integration Test", # change it
  "private": true,
  "url": "https://dapp-browser.apps.ledger.com/v2/",
  "params": {
    "dappUrl": "http://localhost:5173", # replace by the dapp url
    "nanoApp": "WagmiIntegration", # change it
    "dappName": "WagmiIntegration", # change it
    "networks": [
      {
        "currency": "ethereum",
        "chainID": 1,
        "nodeURL": "https://eth-dapps.api.live.ledger.com"
      }
    ]
  },
  "homepageUrl": "https://wagmi.sh/", # change it
  "icon": "https://developers.moralis.com/wp-content/uploads/web3wiki/196-wagmi/637e6c001c60c5e2d8078d8c_wOdHswYe73lnRqkKuJDsSLgwRkQ9Kt831G_9nSGTEFw.png", # change it
  "platforms": ["android", "ios", "desktop"], # change to supported platform
  "apiVersion": "^2.0.0",
  "manifestVersion": "2",
  "branch": "stable",
  "categories": ["swap"], # change to supported categories
  "currencies": ["ethereum"],
  "content": {
    "shortDescription": {
      "en": "Wagmi integration example for dapp browser v2" # change it
    },
    "description": {
      "en": "Wagmi integration example for dapp browser v2" # change it
    }
  },
  "permissions": [
    "account.list",
    "account.receive",
    "account.request",
    "currency.list",
    "wallet_requestPermissions"
  ], # minimum to set
  "domains": ["https://"],
  "visibility": "complete",
  "overrides": []
}
```

3. Implement the `EIP1193Provider` interface fro `viem` for a working provider (see [provider.ts](src/provider.ts))

Note: In the example [provider.ts](src/provider.ts), we need to install more dependencies

```shell
pnpm add @types/node
pnpm add events
```

4. Use your provider in your Wagmi configuration like in [wagmi.ts](src/wagmi.ts)

```ts
const provider = new LedgerLiveEthereumProvider();

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected({
      target() {
        return {
          id: "some random id, see docs",
          name: "some random name, see docs",
          provider: provider,
        };
      },
    }),
  ],
  transports: {
    [mainnet.id]: custom(provider),
  },
});
```

Documentation for target: https://wagmi.sh/react/api/connectors/injected#target

5. Use `connect` from `wagmi` package in your frontend code to connect to your Etherum account

```ts
import { useAccount, useConnect, useDisconnect } from "wagmi";
const { connect } = useConnect();
```

You can see an example from [App.tsx](src/App.tsx)

And you're done ! You can run your dapp `pnpm dev`
