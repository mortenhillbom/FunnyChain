pragma solidity ^0.4.0;
// FunnyChain made by Morten Hillbom, Kerim Gokarslan and Cedric Chane Ching
contract MemeContract {
    
    address public owner;
    
    function MemeContract() public {
        previousPayoutLikeIndex = 0;
        owner = msg.sender;
    }
    struct Meme {
        uint memeId;
        string url;
        address creator;
        uint likes;
    }
    
    struct Like {
        uint likeId;
        uint memeId;
    }
    
    struct User {
        address user;
        string username;
        string password;
    }
    
    struct Transaction {
        address receiver;
        uint amount;
        uint timestamp;
    }
    
    mapping (address => uint) public balances;
    Meme[] public memes;
    Like[] public likes;
    User[] public users;
    Transaction[] public transactions;
    
    uint public previousPayoutLikeIndex = 0;
    
    function registerUser(string _username, string _password) public{
        users.push(User(msg.sender, _username, _password));
    }
    
    function newMeme(string _url) public returns (uint){
        memes.push(Meme(memes.length - 1, _url, msg.sender, 0));
        return memes.length - 1;
    }
    
    function memeCount() public view returns (uint) {
        return memes.length;
    }
    
    function contractBalance() public view returns (uint) {
        return this.balance;
    }
    
    function likeMeme(uint _memeId) public {
        likes.push(Like(likes.length - 1, _memeId));
        memes[_memeId].likes += 1;
    }
    
    function payCreators() public payable returns (bool success){
        uint profit = this.balance - 100000000000000000;
        uint amountPerLike = ((profit*4)/5)/(likes.length - previousPayoutLikeIndex);
        if (amountPerLike < 300000000) {
            return false;
        }
        if(!owner.send((((this.balance - 100000000000000000)*1)/5))) { // send 20% to us moahahahahaha
            return false;
        }
        transactions.push(Transaction(owner,(profit*4)/5, now));
        for(uint i = previousPayoutLikeIndex; i < likes.length; i++) {
            // This is really stupid because it pays every like, instead of every picture,
            // resulting in a bunch of unecessary gas fees, but idgaf right now because it'send
            // simple to fix when I'm less busy
            if(!memes[likes[i].memeId].creator.send(amountPerLike)) {
                return false;
            }
            transactions.push(Transaction(memes[likes[i].memeId].creator,amountPerLike, now));
            previousPayoutLikeIndex += 1;
        }
        return true;

    }
    
    function kill() public { 
        if(msg.sender == owner) {
            selfdestruct(owner); 
        }
    }
    
    function () public payable {
        
    }
}