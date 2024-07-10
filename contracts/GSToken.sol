//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GSToken is ERC20 {
    constructor() ERC20("GSToken", "GST") {
        _mint(msg.sender, 100000000000000000000000);
    }
}