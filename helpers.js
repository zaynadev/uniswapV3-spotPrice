const axios = require("axios");
require("dotenv").config();

const getABI = async (address) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;

  const res = await axios.get(url);
  return JSON.parse(res.data.result);
};

const getPoolImmutables = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  return { token0, token1, fee };
};

module.exports = { getABI, getPoolImmutables };
