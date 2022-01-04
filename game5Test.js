const { assert } = require("chai");
var crypto = require('crypto');
const { parseEther } = require("ethers/lib/utils");
const provider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/h1nCokLG4XEAsdV4P-bU00vZITFGSNlx")

describe("Game5", function() {
  
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();
    const options = {
      gasLimit: 150000,
      gasPrice: ethers.utils.parseUnits('10.0', 'gwei')
  };

  //generate intitial wallet
    var id = crypto.randomBytes(32).toString('hex');
    var privateKey = "0x"+id;
    console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);

    var wallet = new ethers.Wallet(privateKey, provider);
    
    //await correct wallet address
    while(true){

      id = crypto.randomBytes(32).toString('hex');
      privateKey = "0x"+id;
      wallet = new ethers.Wallet(privateKey, ethers.provider);

      //break when found
      if(wallet.address < 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf){
        break;
      }

    }
    
    //get wallet address and send some ether from a hardhat signer
    const newAddress = await wallet.getAddress();
    const signer = ethers.provider.getSigner(0);
    await signer.sendTransaction({to: newAddress, value: ethers.utils.parseEther("1")});
    
    //win the game
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
