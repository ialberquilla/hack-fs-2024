//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import {NFTTier} from './NFTTier.sol';

contract Scoring {

	address public immutable owner;
	mapping(address => uint) public scores;
	address NFT_TIER_1 = 0xab9515BB9DBe00764eA6A8Adc628425f8F65A456;
	address NFT_TIER_2 = 0xAE507bF7164326827513F1AA794fb777aA1A291E;
	address NFT_TIER_3 = 0xfECAA5182A8cD661C0AB8229e78820A0DEf18Ba5;

	event ScoreRecorded(
		address indexed user,
		uint score
	);

	constructor(address _owner) {
		owner = _owner;
	}

	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function addScore(uint _score) public {
		scores[msg.sender] = _score;

		if (_score >= 500) {
			NFTTier(NFT_TIER_1).safeMint(msg.sender);
		} else if (_score >= 200) {
			NFTTier(NFT_TIER_2).safeMint(msg.sender);
		} else if (_score >= 50) {
			NFTTier(NFT_TIER_3).safeMint(msg.sender);
		}


		emit ScoreRecorded(msg.sender, _score);
	}

}
