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

});
