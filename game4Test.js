const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    const signer1 = ethers.provider.getSigner(0);
    const address1 = await signer1.getAddress();

    await game.write(address1);
    // nested mappings are rough :}

    
    await game.win(address1);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
