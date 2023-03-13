const ethers = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");

const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");
const { getABI, getPoolImmutables } = require("./helpers");

// hardhat node mainnet fork
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const poolAddress = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed"; //  WBTC / ETH
const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

const getPrice = async (inputAmount) => {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  const token0Address = await poolContract.token0(); //WBTC
  const token1Address = await poolContract.token1(); //ETH

  const token0ABI = await getABI(token0Address);
  const token1ABI = await getABI(token1Address);

  const token0Contract = new ethers.Contract(
    token0Address,
    token0ABI,
    provider
  );
  const token1Contract = new ethers.Contract(
    token1Address,
    token1ABI,
    provider
  );

  const token0Symbol = await token0Contract.symbol();
  const token1Symbol = await token1Contract.symbol();
  const token0Decimals = await token0Contract.decimals();
  const token1Decimals = await token1Contract.decimals();

  const quoterContract = new ethers.Contract(
    quoterAddress,
    QuoterABI,
    provider
  );

  const immutables = await getPoolImmutables(poolContract);

  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    token0Decimals
  );

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token0,
    immutables.token1,
    immutables.fee,
    amountIn,
    "0"
  );

  const amountOut = ethers.utils.formatUnits(
    quotedAmountOut.toString(),
    token1Decimals
  );

  console.log(`${inputAmount} ${token0Symbol} = ${amountOut} ${token1Symbol}`);
};

// WBTC input amount
getPrice(1);
