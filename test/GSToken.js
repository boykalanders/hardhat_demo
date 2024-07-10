const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");


describe("GSToken contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const gsToken = await ethers.deployContract("GSToken");

    await gsToken.waitForDeployment();
    // Fixtures can return anything you consider useful for your tests
    return { gsToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const { gsToken, owner } = await loadFixture(deployTokenFixture);
      let balance = await owner.getBalance();
      const ownerBalance = await gsToken.balanceOf(owner.address);
      expect(await gsToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { gsToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 50 tokens from owner to addr1
      expect(await gsToken.transfer(addr1.address, parseEther('50'))).to.changeTokenBalances(
        gsToken,
        [owner, addr1],
        [-50, 50]
      );

      //console.log('addr1 balance', await gsToken.balanceOf(addr1.address))
      
      // Transfer 50 tokens from addr1 to addr2
      expect(
        await gsToken.connect(addr1).transfer(addr2.address, parseEther('50'))).to.changeTokenBalances(
        gsToken,
        [addr1, addr2],
        [-50, 50]
      );
    });

    it("Should emit Transfer events", async function () {
      const { gsToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 50 tokens from owner to addr1
      await expect(gsToken.transfer(addr1.address, 50))
        .to.emit(gsToken, "Transfer")
        .withArgs(owner.address, addr1.address, 50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(gsToken.connect(addr1).transfer(addr2.address, 50))
        .to.emit(gsToken, "Transfer")
        .withArgs(addr1.address, addr2.address, 50);
    });
    
  });
});
