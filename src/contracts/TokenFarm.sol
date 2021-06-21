// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

/// @title Digital Token Bank

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    // Build/inits the tokens
    // Deploy Dai --> pass to Token Farm
    // Deploy Dapp --> pass to Token Farm
    // Deploy TokenFarm

    constructor(DappToken _dappToken, DaiToken _daitoken) public {
        dappToken = _dappToken;
        daiToken = _daitoken;
    }
}
