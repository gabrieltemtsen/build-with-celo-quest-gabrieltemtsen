// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CeloBasic {
    string public winnerName;
    uint256 public reward;
    address public winnerAddress;

    function setWinner(string memory name, address _winnerAddress) public {
        winnerName = name;
        winnerAddress = _winnerAddress;
        
    }
    function setReward(uint256 _reward) public {
        reward = _reward;
    }

  function payReward(address _winnerAddress) public {
        require(address(this).balance >= reward, "Contract balance is insufficient to pay the reward");
        payable(_winnerAddress).transfer(reward);
    }
    function fundContract() public payable {
    
}

    function getWinnerName() public view returns (string memory) {
        return winnerName;
    }
}