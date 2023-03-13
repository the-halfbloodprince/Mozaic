# NFT Marketplace

Mozaic is a Web 3.0 NFT marketplace securely deployed on Goerli testnet, with NFT metadata stored on IPFS and profile details stored on mongoDB where

• One can 'create' NFTs of various categories.

• 'List' NFTs on marketplace and 'buy' the NFTs listed by other users.

• The user is allowed to 'unlist' NFTs owned by him/her.

• User can see other user's profile, their NFTs and their mutual transactions.

• Users can update their profile including profile and cover images as well.

• Search functionality allows user to search through various NFTs and other users.

• Marketplace contains all NFTs and can be filtered according by the categories.

• All the transactions can also be seen by all users.

• Users can also provide rating to other users.

# Technology Stack & Tools

- [Solidity](https://soliditylang.org/) - Smart Contracts
- [React](https://reactjs.org/) - JavaScript library for building User Interfaces
- [Ethers](https://docs.ethers.io/v5/) - Blockchain Interaction
- [Hardhat](https://hardhat.org/) - Development Framework
- [IPFS](https://ipfs.io/) - Metadata storage
- [React Router](https://v5.reactrouter.com/) -  Navigational components
- [Mantine](https://mantine.dev/) - for Frontend components
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/) 
- [MongoDB](https://www.mongodb.com/) - database
- [Mongoose](https://mongoosejs.com/) - ORM for MongoDB
- [Axios](https://axios-http.com/) - HTTP client
- Other libraries for icons and animations

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)
- Install [Hardhat](https://hardhat.org/)

## Setting Up

- ### Set up the Backend

  - ### Clone/Download the Backend Repository for profiles here: [Mozaic API](https://github.com/Hiwatari-Kai/Mozaic-API)
    ```
    $ git clone https://github.com/Hiwatari-Kai/Mozaic-API
    ```

  - ### Install dependencies
    ```
    $ cd Mozaic-API
    $ npm install
    ```

  - ### Run the server
    ```
    $ npm start
    ```

- ### Set up the Frontend

  - ### Clone/Download the main repository
    ```
    $ git clone https://github.com/the-halfbloodprince/Mozaic
    ```

  - ### Install Dependencies:
      ```
      $ cd Mozaic
      $ npm install
      ```

  - ### Boot up local development blockchain
    ```
    $ npx hardhat node
    ```

  - ### Connect development blockchain accounts to Metamask
    - Copy private key of the addresses and import to Metamask
    - Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
    - If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.  


  - ### Migrate Smart Contracts
    ```
    npx hardhat run src/backend/scripts/deploy.js --network localhost
    ```

  - ### Launch Frontend
    ```
    $ npm run start
    ```

License
----
MIT