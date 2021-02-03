pragma solidity ^0.7.4;

abstract contract ERC20Token {
    string public name;
    string public symbol;
    uint8 public decimals;
    function totalSupply() public virtual view returns (uint);
    function balanceOf(address tokenOwner) public virtual view returns (uint balance);
    function allowance(address tokenOwner, address spender) public virtual view returns (uint remaining);
    function transfer(address to, uint tokens) public virtual returns (bool success);
    function approve(address spender, uint tokens) public virtual returns (bool success);
    function transferFrom(address from, address to, uint tokens) public virtual returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract BitSongGenesis {

    event hasBeenAdded(
        address sender,
        address recipient,
        string btsgBech32,
        uint256 amount,
        address contractAddress
    );

    address public btsgErc20ContractAddress;
    address public bridgeWalletAddress;

    constructor(address _btsgErc20ContractAddress, address _bridgeWalletAddress ) {
        btsgErc20ContractAddress = _btsgErc20ContractAddress;
        bridgeWalletAddress = _bridgeWalletAddress;
    }

    function deposit(
        uint256 amount,
        string memory target
    ) public {
        ERC20Token token = ERC20Token(btsgErc20ContractAddress);
        require(token.transferFrom(msg.sender, bridgeWalletAddress, amount), "ERC20 token transfer was unsuccessful");
        emit hasBeenAdded(msg.sender, bridgeWalletAddress, target, amount, btsgErc20ContractAddress);
    }
}