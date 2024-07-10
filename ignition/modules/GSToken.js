const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

const TokenModule = buildModule("TokenModule", (m) => {
    const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
    const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);
  
    const token = m.contract("GSToken", [unlockTime], {
        value: lockedAmount
    });
  return { token };
});

module.exports = TokenModule;