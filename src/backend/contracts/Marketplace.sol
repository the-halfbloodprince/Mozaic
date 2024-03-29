// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {

   
    address payable private immutable feeAccount;
    uint private immutable feePercent;
    uint private itemCount; 
    uint private transactionCount;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool onSale;
    }

    struct Transaction {
        uint transactionCount;
        address from;
        address to;
        uint amount;
        uint tokenId;
        uint timestamp;
    }
    
    mapping(uint => Item) private items;
    mapping(uint => Transaction) private transactions;

    event Minted(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller
    );
    event Offered(
        uint itemId,
        uint price,
        address indexed seller
    );
    event Unlisted(
            uint itemId,
            address indexed seller
        );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    
    function makeItem(IERC721 _nft, uint _tokenId) external nonReentrant {
        itemCount ++;
       
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            0,
            payable(msg.sender),
            false
        );
       
        emit Minted(
            itemCount,
            address(_nft),
            _tokenId,
            msg.sender
        );
    }
    function listItem(uint id, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater > zero");
        require(msg.sender == items[id].seller,"You don't own the nft");
        items[id].nft.transferFrom(msg.sender, address(this), id);
        items[id].price = _price;
        items[id].onSale = true;
        emit Offered(
            id,
            _price,
            msg.sender
        );
    }

    function unlistItem(uint _tokenId) external nonReentrant {
        require(msg.sender == items[_tokenId].seller,"You don't own this nft");
        items[_tokenId].price = 0;
        items[_tokenId].onSale = false;
        
        items[_tokenId].nft.transferFrom(address(this), msg.sender, _tokenId);
        emit Unlisted(
            _tokenId,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(msg.sender != item.seller,"You already own the nft!");


        transactionCount++;
        transactions[transactionCount] = Transaction(
            transactionCount,
            item.seller,
            msg.sender,
            _totalPrice,
            _itemId,
            block.timestamp

        );
       
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        items[_itemId].seller = payable(msg.sender);
        items[_itemId].onSale = false;
    
        
        items[_itemId].nft.transferFrom(address(this), msg.sender, item.tokenId);
      
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }
    function getTotalPrice(uint _itemId) view public returns(uint){
        return((items[_itemId].price*(100 + feePercent))/100);
    }

    function getItemCount() view public returns(uint){
        return(itemCount);
    }
    function getTransactionCount() view public returns(uint){
        return(transactionCount);
    }

    function getAllNFTs() public view returns (Item[] memory) {
        uint nftCount = itemCount;
        Item[] memory tokens = new Item[](nftCount);
        for(uint i=0;i<nftCount;i++)
        { 
           tokens[i] = items[i+1];  
        }
    
        return tokens;
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        uint tCount = transactionCount;
        Transaction[] memory transactionArray = new Transaction[](tCount);
        for(uint i=0;i<tCount;i++)
        { 
           transactionArray[i] = transactions[i+1];  
        }
        return transactionArray;
    }
    
}