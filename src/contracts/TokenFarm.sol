// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

/// @title Digital Crypto Bank

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;
    //array of addresses that have staked
    // this will be the addresses that can earn tokens as interest
    address[] public stakers;
    mapping(address => uint256) public stakingBalance; // map/dict of accounts to balances
    mapping(address => bool) public hasStaked;
    // track staking status
    mapping(address => bool) public isStaking;

    // Build/inits the token s
    // Deploy Dai --> pass to Token Farm
    // Deploy Dapp --> pass to Token Farm
    // Deploy TokenFarm

    constructor(DappToken _dappToken, DaiToken _daitoken) public {
        dappToken = _dappToken;
        daiToken = _daitoken;
    }

    // 1. Stakes Tokens(Deposit)
    function stakeTokens(uint256 _amount) public {
        // transfer mock dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);
        // update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // add user to stakers array *only* if they havent staked
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // 2. Unstaking Tokens(Withraw)
    // 3. Issuing Tokens(Earn)
}
