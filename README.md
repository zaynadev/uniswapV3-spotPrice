# Uniswap spot token prices

Get Uniswap spot token prices (WBTC to ETH) using ethers and hardhat mainnet fork

#### 1. Install dependencies

First you need to install project dependencies by running this command:

```shell
npm install
```

#### 2. Add your Alchemy mainnet and Etherscan as an environment variable for the project

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_URL_MAINNET` and `YOUR_ETHERSCAN_API_KEY` with your url.

```sh
ALCHEMY_URL_MAINNET=YOUR_ALCHEMY_URL_MAINNET
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

#### 2. Run hardhat node

Run hardhat node using this command:

```shell
npx hardhat node
```

#### 3. Execute the script

In another terminal, run this command to get the amount of ETH for 1 WBTC

```shell
 node unsiwapBot.js
```
