//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract Scoring {

	address public immutable owner;
	mapping(address => uint) public scores;

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
		scores[msg.sender] += _score;
		emit ScoreRecorded(msg.sender, scores[msg.sender]);
	}

}
