const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("GameModule", (m) => {
    const gamestore = m.contract("GameStore");
    return { gamestore };
});