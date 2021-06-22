# Digital Crypto Bank

TokenFarm Contract is a Solidity contract that works like a digital bank.
You can deposit one crypto(DAI) and get interest in another crypto(Dapp).
Both DAI and Dapp are ERC 20 tokens.

User stakes DAI tokens in the Token Farm, earn in the Dapp tokens and can
withdraw the DAI staked or Dapp earned when they want to.

All Dapp Tokens are loaded into a liquidity pool(TokenFarm) and the Token Farm
rewards investors through liquidity mining(yield farming).

User client side is a React App.

## Installation

For testing, you should have the following dependancies installed:

1. Truffle
2. Ganache -> Local block chain--> you can use any blockchain to test really 😃
3. npm

## Run

`npm i` to install dependancies
run `truffle compile` to create the abi(contracts).
run `truffle migrate` to install it on your blockchain.
you can use `truffle migrate --reset` to set up new contracts on the blockchain.

run `npm run start` to interact with the blockchain through the front-end React app.
