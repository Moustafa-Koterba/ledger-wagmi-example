import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { LedgerLiveEthereumProvider } from "./provider";
import { custom } from "viem";
import { createConfig } from "wagmi";

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

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
