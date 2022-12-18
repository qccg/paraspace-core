import {DRE, getDb, getParaSpaceConfig} from "./misc-utils";
import {
  tEthereumAddress,
  eContractid,
  tStringTokenSmallUnits,
  ERC20TokenContractId,
  ERC721TokenContractId,
} from "./types";
import {
  ACLManager,
  ApeStakingLogic,
  ApeStakingLogic__factory,
  ATokenDebtToken,
  ATokenDebtToken__factory,
  AuctionLogic,
  AuctionLogic__factory,
  BlurAdapter,
  BlurAdapter__factory,
  BlurExchange,
  BlurExchange__factory,
  BorrowLogic,
  BorrowLogic__factory,
  ConduitController,
  ConfiguratorLogic,
  CurrencyManager,
  DefaultReserveAuctionStrategy,
  DefaultReserveInterestRateStrategy,
  DelegationAwarePToken,
  ERC721Delegate,
  ERC721OracleWrapper,
  ExecutionDelegate,
  ExecutionDelegate__factory,
  ExecutionManager,
  ExecutorWithTimelock,
  ExecutorWithTimelock__factory,
  FlashClaimLogic,
  FlashClaimLogic__factory,
  InitializableImmutableAdminUpgradeabilityProxy,
  LiquidationLogic,
  LooksRareAdapter,
  LooksRareExchange,
  MarketplaceLogic,
  MerkleVerifier,
  MerkleVerifier__factory,
  MintableERC20,
  MintableERC721,
  MintableERC721Logic,
  MintableERC721Logic__factory,
  MockAggregator,
  MockAirdropProject,
  MockIncentivesController,
  MockInitializableFromConstructorImple,
  MockInitializableImple,
  MockInitializableImpleV2,
  MockNToken,
  MockNToken__factory,
  MockPToken,
  MockReentrantInitializableImple,
  MockReserveAuctionStrategy,
  MockReserveAuctionStrategy__factory,
  MockReserveConfiguration,
  MockVariableDebtToken,
  NFTFloorOracle,
  NFTFloorOracle__factory,
  NToken,
  NTokenBAYC,
  NTokenMAYC,
  NTokenMoonBirds,
  NTokenUniswapV3,
  ParaProxy__factory,
  ParaSpaceOracle,
  PausableZoneController,
  PolicyManager,
  PolicyManager__factory,
  PoolAddressesProvider,
  PoolAddressesProviderRegistry,
  PoolApeStaking,
  PoolApeStaking__factory,
  PoolConfigurator,
  PoolCore,
  PoolLogic,
  PoolLogic__factory,
  PoolMarketplace,
  PoolParameters,
  PriceOracle,
  ProtocolDataProvider,
  PToken,
  PTokenAToken,
  PTokenSApe,
  PTokenSApe__factory,
  PTokenStETH,
  ReservesSetupHelper,
  RoyaltyFeeManager,
  RoyaltyFeeRegistry,
  Seaport,
  SeaportAdapter,
  StandardPolicyERC721,
  StandardPolicyERC721__factory,
  StETHDebtToken,
  StETHDebtToken__factory,
  StrategyStandardSaleForFixedPrice,
  SupplyLogic,
  SupplyLogic__factory,
  TransferManagerERC1155,
  TransferManagerERC721,
  TransferSelectorNFT,
  UiIncentiveDataProvider,
  UiPoolDataProvider,
  UniswapV3Factory,
  UniswapV3OracleWrapper,
  UserFlashclaimRegistry,
  VariableDebtToken,
  WalletBalanceProvider,
  WETHGateway,
  WPunkGateway,
  X2Y2Adapter,
  X2Y2Adapter__factory,
  X2Y2R1,
} from "../types";
import {StETH, MockAToken} from "../types";
import {MockContract} from "ethereum-waffle";
import {
  getApeStakingLogic,
  getPunks,
  getFirstSigner,
  getWETH,
  getMintableERC721Logic,
  getAllTokens,
} from "./contracts-getters";
import {
  convertToCurrencyDecimals,
  getFunctionSignatures,
} from "./contracts-helpers";
import {
  ProtocolDataProvider__factory,
  PToken__factory,
  NToken__factory,
  ReservesSetupHelper__factory,
  ParaSpaceOracle__factory,
  DefaultReserveInterestRateStrategy__factory,
  DefaultReserveAuctionStrategy__factory,
  DelegationAwarePToken__factory,
  PoolAddressesProvider__factory,
  PoolAddressesProviderRegistry__factory,
  PoolConfigurator__factory,
  MintableDelegationERC20__factory,
  MintableERC20__factory,
  MintableERC721__factory,
  MockAggregator__factory,
  MockPToken__factory,
  MockVariableDebtToken__factory,
  PriceOracle__factory,
  VariableDebtToken__factory,
  WETH9Mocked__factory,
  ConfiguratorLogic__factory,
  MockIncentivesController__factory,
  MockInitializableFromConstructorImple__factory,
  MockInitializableImple__factory,
  MockInitializableImpleV2__factory,
  InitializableImmutableAdminUpgradeabilityProxy__factory,
  WETH9Mocked,
  ACLManager__factory,
  MockReserveConfiguration__factory,
  MockReentrantInitializableImple__factory,
  UiPoolDataProvider__factory,
  UiIncentiveDataProvider__factory,
  WalletBalanceProvider__factory,
  WETHGateway__factory,
  ERC721OracleWrapper__factory,
  CryptoPunksMarket__factory,
  WPunk__factory,
  WPunkGateway__factory,
  WPunk,
  CryptoPunksMarket,
  LiquidationLogic__factory,
  BoredApeYachtClub__factory,
  MutantApeYachtClub__factory,
  Doodles__factory,
  Doodles,
  BoredApeYachtClub,
  MutantApeYachtClub,
  MockTokenFaucet__factory,
  Azuki,
  CloneX,
  Land,
  Meebits,
  Moonbirds,
  Azuki__factory,
  CloneX__factory,
  Moonbirds__factory,
  Meebits__factory,
  Land__factory,
  ConduitController__factory,
  Seaport__factory,
  PausableZoneController__factory,
  CurrencyManager__factory,
  ExecutionManager__factory,
  LooksRareExchange__factory,
  RoyaltyFeeManager__factory,
  RoyaltyFeeRegistry__factory,
  TransferSelectorNFT__factory,
  TransferManagerERC721__factory,
  TransferManagerERC1155__factory,
  StrategyStandardSaleForFixedPrice__factory,
  X2Y2R1__factory,
  ERC721Delegate__factory,
  NTokenMoonBirds__factory,
  UniswapV3OracleWrapper__factory,
  NTokenUniswapV3__factory,
  MarketplaceLogic__factory,
  SeaportAdapter__factory,
  LooksRareAdapter__factory,
  UniswapV3Factory__factory,
  StETH__factory,
  MockAToken__factory,
  PTokenAToken__factory,
  PTokenStETH__factory,
  UserFlashclaimRegistry__factory,
  MockAirdropProject__factory,
  PoolCore__factory,
  PoolParameters__factory,
  PoolMarketplace__factory,
  ApeCoinStaking__factory,
  NTokenBAYC__factory,
  NTokenMAYC__factory,
} from "../types";

import * as nonfungiblePositionManager from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import * as uniSwapRouter from "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json";
import * as nFTDescriptor from "@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json";
import * as nonfungibleTokenPositionDescriptor from "@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json";

import {
  withSaveAndVerify,
  insertContractAddressInDb,
} from "./contracts-helpers";
import {MintableDelegationERC20} from "../types";
import {Address} from "hardhat-deploy/dist/types";
import {Contract} from "ethers";
import {LiquidationLogicLibraryAddresses} from "../types/factories/protocol/libraries/logic/LiquidationLogic__factory";
import {MarketplaceLogicLibraryAddresses} from "../types/factories/protocol/libraries/logic/MarketplaceLogic__factory";
import {PoolCoreLibraryAddresses} from "../types/factories/protocol/pool/PoolCore__factory";
import {PoolMarketplaceLibraryAddresses} from "../types/factories/protocol/pool/PoolMarketplace__factory";
import {PoolParametersLibraryAddresses} from "../types/factories/protocol/pool/PoolParameters__factory";

import {pick} from "lodash";
import {ZERO_ADDRESS} from "./constants";
import {GLOBAL_OVERRIDES} from "./hardhat-constants";

export const deployPoolAddressesProvider = async (
  marketId: string,
  owner: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new PoolAddressesProvider__factory(await getFirstSigner()),
    eContractid.PoolAddressesProvider,
    [marketId, owner],
    verify
  ) as Promise<PoolAddressesProvider>;

export const deployPoolAddressesProviderRegistry = async (
  owner: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new PoolAddressesProviderRegistry__factory(await getFirstSigner()),
    eContractid.PoolAddressesProviderRegistry,
    [owner],
    verify
  ) as Promise<PoolAddressesProviderRegistry>;

export const deployACLManager = async (
  provider: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new ACLManager__factory(await getFirstSigner()),
    eContractid.ACLManager,
    [provider],
    verify
  ) as Promise<ACLManager>;

export const deployConfiguratorLogicLibrary = async (verify?: boolean) =>
  withSaveAndVerify(
    new ConfiguratorLogic__factory(await getFirstSigner()),
    eContractid.ConfiguratorLogic,
    [],
    verify
  ) as Promise<ConfiguratorLogic>;

export const deployPoolConfigurator = async (verify?: boolean) => {
  const configuratorLogic = await deployConfiguratorLogicLibrary(verify);
  const libraries = {
    ["contracts/protocol/libraries/logic/ConfiguratorLogic.sol:ConfiguratorLogic"]:
      configuratorLogic.address,
  };
  return withSaveAndVerify(
    new PoolConfigurator__factory(libraries, await getFirstSigner()),
    eContractid.PoolConfiguratorImpl,
    [],
    verify,
    false,
    libraries
  ) as Promise<PoolConfigurator>;
};

export const deploySupplyLogic = async (verify?: boolean) =>
  withSaveAndVerify(
    new SupplyLogic__factory(await getFirstSigner()),
    eContractid.SupplyLogic,
    [],
    verify
  ) as Promise<SupplyLogic>;

export const deployFlashClaimLogic = async (verify?: boolean) =>
  withSaveAndVerify(
    new FlashClaimLogic__factory(await getFirstSigner()),
    eContractid.FlashClaimLogic,
    [],
    verify
  ) as Promise<FlashClaimLogic>;

export const deployBorrowLogic = async (verify?: boolean) =>
  withSaveAndVerify(
    new BorrowLogic__factory(await getFirstSigner()),
    eContractid.BorrowLogic,
    [],
    verify
  ) as Promise<BorrowLogic>;

export const deployLiquidationLogic = async (
  libraries: LiquidationLogicLibraryAddresses,
  verify?: boolean
) =>
  withSaveAndVerify(
    new LiquidationLogic__factory(libraries, await getFirstSigner()),
    eContractid.LiquidationLogic,
    [],
    verify,
    false,
    libraries
  ) as Promise<LiquidationLogic>;

export const deployAuctionLogic = async (verify?: boolean) =>
  withSaveAndVerify(
    new AuctionLogic__factory(await getFirstSigner()),
    eContractid.AuctionLogic,
    [],
    verify
  ) as Promise<AuctionLogic>;

export const deployPoolLogic = async (verify?: boolean) =>
  withSaveAndVerify(
    new PoolLogic__factory(await getFirstSigner()),
    eContractid.PoolLogic,
    [],
    verify
  ) as Promise<PoolLogic>;

export const deployPoolCoreLibraries = async (
  verify?: boolean
): Promise<PoolCoreLibraryAddresses> => {
  const supplyLogic = await deploySupplyLogic(verify);
  const borrowLogic = await deployBorrowLogic(verify);
  const auctionLogic = await deployAuctionLogic(verify);
  const liquidationLogic = await deployLiquidationLogic(
    {
      ["contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic"]:
        supplyLogic.address,
    },
    verify
  );
  const flashClaimLogic = await deployFlashClaimLogic(verify);

  return {
    ["contracts/protocol/libraries/logic/AuctionLogic.sol:AuctionLogic"]:
      auctionLogic.address,
    ["contracts/protocol/libraries/logic/LiquidationLogic.sol:LiquidationLogic"]:
      liquidationLogic.address,
    ["contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic"]:
      supplyLogic.address,
    ["contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic"]:
      borrowLogic.address,
    ["contracts/protocol/libraries/logic/FlashClaimLogic.sol:FlashClaimLogic"]:
      flashClaimLogic.address,
  };
};

export const deployPoolMarketplaceLibraries = async (
  coreLibraries: PoolCoreLibraryAddresses,
  verify?: boolean
): Promise<PoolMarketplaceLibraryAddresses> => {
  const marketplaceLogic = await deployMarketplaceLogic(
    pick(coreLibraries, [
      "contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic",
      "contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic",
    ]),
    verify
  );
  return {
    ["contracts/protocol/libraries/logic/MarketplaceLogic.sol:MarketplaceLogic"]:
      marketplaceLogic.address,
  };
};

export const deployPoolParametersLibraries = async (
  verify?: boolean
): Promise<PoolParametersLibraryAddresses> => {
  const poolLogic = await deployPoolLogic(verify);
  return {
    ["contracts/protocol/libraries/logic/PoolLogic.sol:PoolLogic"]:
      poolLogic.address,
  };
};

export const getPoolSignatures = () => {
  const poolCoreSelectors = getFunctionSignatures(PoolCore__factory.abi);

  const poolParametersSelectors = getFunctionSignatures(
    PoolParameters__factory.abi
  );

  const poolMarketplaceSelectors = getFunctionSignatures(
    PoolMarketplace__factory.abi
  );

  const poolApeStakingSelectors = getFunctionSignatures(
    PoolApeStaking__factory.abi
  );

  const poolProxySelectors = getFunctionSignatures(ParaProxy__factory.abi);

  const allSelectors = {};
  const poolSelectors = [
    ...poolCoreSelectors,
    ...poolParametersSelectors,
    ...poolMarketplaceSelectors,
    ...poolApeStakingSelectors,
    ...poolProxySelectors,
  ];
  for (const selector of poolSelectors) {
    if (!allSelectors[selector.signature]) {
      allSelectors[selector.signature] = selector;
    } else {
      throw new Error(
        `added function ${selector.name} conflict with exist function:${
          allSelectors[selector.signature].name
        }`
      );
    }
  }

  return {
    poolCoreSelectors,
    poolParametersSelectors,
    poolMarketplaceSelectors,
    poolApeStakingSelectors,
  };
};

export const deployPoolComponents = async (
  provider: string,
  verify?: boolean
) => {
  const coreLibraries = await deployPoolCoreLibraries(verify);
  const marketplaceLibraries = await deployPoolMarketplaceLibraries(
    coreLibraries,
    verify
  );
  const parametersLibraries = await deployPoolParametersLibraries(verify);

  const apeStakingLibraries = pick(coreLibraries, [
    "contracts/protocol/libraries/logic/BorrowLogic.sol:BorrowLogic",
    "contracts/protocol/libraries/logic/SupplyLogic.sol:SupplyLogic",
  ]);

  const poolCore = new PoolCore__factory(coreLibraries, await getFirstSigner());

  const poolParameters = new PoolParameters__factory(
    parametersLibraries,
    await getFirstSigner()
  );

  const poolMarketplace = new PoolMarketplace__factory(
    marketplaceLibraries,
    await getFirstSigner()
  );

  const poolApeStaking = new PoolApeStaking__factory(
    apeStakingLibraries,
    await getFirstSigner()
  );

  const {
    poolCoreSelectors,
    poolParametersSelectors,
    poolMarketplaceSelectors,
    poolApeStakingSelectors,
  } = getPoolSignatures();

  return {
    poolCore: (await withSaveAndVerify(
      poolCore,
      eContractid.PoolCoreImpl,
      [provider],
      verify,
      false,
      coreLibraries,
      poolCoreSelectors
    )) as PoolCore,
    poolParameters: (await withSaveAndVerify(
      poolParameters,
      eContractid.PoolParametersImpl,
      [provider],
      verify,
      false,
      parametersLibraries,
      poolParametersSelectors
    )) as PoolParameters,
    poolMarketplace: (await withSaveAndVerify(
      poolMarketplace,
      eContractid.PoolMarketplaceImpl,
      [provider],
      verify,
      false,
      marketplaceLibraries,
      poolMarketplaceSelectors
    )) as PoolMarketplace,
    poolApeStaking: (await withSaveAndVerify(
      poolApeStaking,
      eContractid.PoolApeStakingImpl,
      [provider],
      verify,
      false,
      apeStakingLibraries,
      poolApeStakingSelectors
    )) as PoolApeStaking,
    poolCoreSelectors: poolCoreSelectors.map((s) => s.signature),
    poolParametersSelectors: poolParametersSelectors.map((s) => s.signature),
    poolMarketplaceSelectors: poolMarketplaceSelectors.map((s) => s.signature),
    poolApeStakingSelectors: poolApeStakingSelectors.map((s) => s.signature),
  };
};

export const deployPriceOracle = async (verify?: boolean) =>
  withSaveAndVerify(
    new PriceOracle__factory(await getFirstSigner()),
    eContractid.PriceOracle,
    [],
    verify
  ) as Promise<PriceOracle>;

export const deployAggregator = async (
  symbol: string,
  price: tStringTokenSmallUnits,
  verify?: boolean
) =>
  withSaveAndVerify(
    new MockAggregator__factory(await getFirstSigner()),
    eContractid.Aggregator.concat(`.${symbol}`),
    [price],
    verify
  ) as Promise<MockAggregator>;

export const deployParaSpaceOracle = async (
  args: [
    tEthereumAddress,
    tEthereumAddress[],
    tEthereumAddress[],
    tEthereumAddress,
    tEthereumAddress,
    string
  ],
  verify?: boolean
) =>
  withSaveAndVerify(
    new ParaSpaceOracle__factory(await getFirstSigner()),
    eContractid.ParaSpaceOracle,
    [...args],
    verify
  ) as Promise<ParaSpaceOracle>;

export const deployNFTFloorPriceOracle = async (verify?: boolean) =>
  withSaveAndVerify(
    new NFTFloorOracle__factory(await getFirstSigner()),
    eContractid.NFTFloorOracle,
    [],
    verify
  ) as Promise<NFTFloorOracle>;

export const deployProtocolDataProvider = async (
  addressesProvider: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new ProtocolDataProvider__factory(await getFirstSigner()),
    eContractid.ProtocolDataProvider,
    [addressesProvider],
    verify
  ) as Promise<ProtocolDataProvider>;

export const deployMintableERC20 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableERC20> =>
  withSaveAndVerify(
    new MintableERC20__factory(await getFirstSigner()),
    args[1],
    [...args],
    verify
  ) as Promise<MintableERC20>;

export const deployMintableERC721 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableERC721> =>
  withSaveAndVerify(
    new MintableERC721__factory(await getFirstSigner()),
    args[1],
    [...args],
    verify
  ) as Promise<MintableERC721>;

export const deployMintableDelegationERC20 = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MintableDelegationERC20> =>
  withSaveAndVerify(
    new MintableDelegationERC20__factory(await getFirstSigner()),
    eContractid.MintableDelegationERC20,
    [...args],
    verify
  ) as Promise<MintableDelegationERC20>;

export const deployMockReserveAuctionStrategy = async (
  args: [string, string, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    new MockReserveAuctionStrategy__factory(await getFirstSigner()),
    eContractid.MockReserveAuctionStrategy,
    [...args],
    verify
  ) as Promise<MockReserveAuctionStrategy>;

export const deployReserveAuctionStrategy = async (
  strategyName: string,
  args: [string, string, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    new DefaultReserveAuctionStrategy__factory(await getFirstSigner()),
    strategyName,
    [...args],
    verify
  ) as Promise<DefaultReserveAuctionStrategy>;

export const deployReserveInterestRateStrategy = async (
  strategyName: string,
  args: [tEthereumAddress, string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    new DefaultReserveInterestRateStrategy__factory(await getFirstSigner()),
    strategyName,
    [...args],
    verify
  ) as Promise<DefaultReserveInterestRateStrategy>;

export const deployGenericVariableDebtToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new VariableDebtToken__factory(await getFirstSigner()),
    eContractid.VariableDebtTokenImpl,
    [poolAddress],
    verify
  ) as Promise<VariableDebtToken>;

export const deployGenericPTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new PToken__factory(await getFirstSigner()),
    eContractid.PTokenImpl,
    [poolAddress],
    verify
  ) as Promise<PToken>;

export const deployGenericNTokenImpl = async (
  poolAddress: tEthereumAddress,
  atomicPricing: boolean,
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    new NToken__factory(libraries, await getFirstSigner()),
    eContractid.NTokenImpl,
    [poolAddress, atomicPricing],
    verify
  ) as Promise<NToken>;
};

export const deployUniswapV3NTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    new NTokenUniswapV3__factory(libraries, await getFirstSigner()),
    eContractid.NTokenUniswapV3Impl,
    [poolAddress],
    verify
  ) as Promise<NTokenUniswapV3>;
};

export const deployGenericMoonbirdNTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    new NTokenMoonBirds__factory(libraries, await getFirstSigner()),
    eContractid.NTokenMoonBirdsImpl,
    [poolAddress],
    verify
  ) as Promise<NTokenMoonBirds>;
};

export const deployDelegationAwarePTokenImpl = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new DelegationAwarePToken__factory(await getFirstSigner()),
    eContractid.DelegationAwarePTokenImpl,
    [poolAddress],
    verify
  ) as Promise<DelegationAwarePToken>;

export const deployAllERC20Tokens = async (verify?: boolean) => {
  const tokens: {
    [symbol: string]:
      | MockContract
      | MintableERC20
      | WETH9Mocked
      | StETH
      | MockAToken;
  } = {};

  const paraSpaceConfig = getParaSpaceConfig();
  const reservesConfig = paraSpaceConfig.ReservesConfig;
  const tokensConfig = paraSpaceConfig.Tokens;

  for (const tokenSymbol of Object.keys(ERC20TokenContractId)) {
    const db = getDb();
    const contractAddress = db
      .get(`${tokenSymbol}.${DRE.network.name}`)
      .value()?.address;
    const reserveConfig = reservesConfig[tokenSymbol];
    if (!reserveConfig) {
      continue;
    }

    // if contract address is already in db, then skip to next tokenSymbol
    if (contractAddress) {
      console.log("contract address is already in db ", tokenSymbol);
      continue;
    } else if (tokensConfig[tokenSymbol]) {
      console.log("contract address is already in db ", tokenSymbol);
      await insertContractAddressInDb(
        tokenSymbol,
        tokensConfig[tokenSymbol],
        false
      );

      if (
        tokenSymbol === ERC20TokenContractId.sAPE &&
        paraSpaceConfig.YogaLabs.ApeCoinStaking
      ) {
        await insertContractAddressInDb(
          eContractid.ApeCoinStaking,
          paraSpaceConfig.YogaLabs.ApeCoinStaking,
          false
        );
      }
      if (
        tokenSymbol === ERC20TokenContractId.sAPE &&
        paraSpaceConfig.YogaLabs.BAKC
      ) {
        await insertContractAddressInDb(
          eContractid.BAKC,
          paraSpaceConfig.YogaLabs.BAKC,
          false
        );
      }
      continue;
    } else {
      console.log("deploying now ", tokenSymbol);
      if (tokenSymbol === ERC20TokenContractId.WETH) {
        tokens[tokenSymbol] = await deployWETH(verify);
        continue;
      }

      if (tokenSymbol === ERC20TokenContractId.stETH) {
        tokens[tokenSymbol] = await deployStETH(
          [tokenSymbol, tokenSymbol, reserveConfig.reserveDecimals],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC20TokenContractId.aWETH) {
        tokens[tokenSymbol] = await deployMockAToken(
          [tokenSymbol, tokenSymbol, reserveConfig.reserveDecimals],
          verify
        );
        continue;
      }

      tokens[tokenSymbol] = await deployMintableERC20(
        [tokenSymbol, tokenSymbol, reserveConfig.reserveDecimals],
        verify
      );
    }
  }

  return tokens;
};

export const deployAllERC721Tokens = async (verify?: boolean) => {
  const tokens: {
    [symbol: string]:
      | MockContract
      | MintableERC721
      | WPunk
      | CryptoPunksMarket
      | Doodles
      | BoredApeYachtClub
      | MutantApeYachtClub
      | Azuki
      | CloneX
      | Land
      | Meebits
      | Moonbirds
      | Contract;
  } = {};
  const paraSpaceConfig = getParaSpaceConfig();
  const reservesConfig = paraSpaceConfig.ReservesConfig;
  const tokensConfig = paraSpaceConfig.Tokens;

  for (const tokenSymbol of Object.keys(ERC721TokenContractId)) {
    const db = getDb();
    const contractAddress = db
      .get(`${tokenSymbol}.${DRE.network.name}`)
      .value()?.address;
    const reserveConfig = reservesConfig[tokenSymbol];
    if (!reserveConfig) {
      continue;
    }

    // if contract address is already in db, then skip to next tokenSymbol
    if (contractAddress) {
      console.log("contract address is already in db ", tokenSymbol);
      continue;
    } else if (tokensConfig[tokenSymbol]) {
      console.log("contract address is already in db ", tokenSymbol);
      await insertContractAddressInDb(
        tokenSymbol,
        tokensConfig[tokenSymbol],
        false
      );
      if (
        tokenSymbol === ERC721TokenContractId.UniswapV3 &&
        paraSpaceConfig.Uniswap.V3Factory
      ) {
        await insertContractAddressInDb(
          eContractid.UniswapV3Factory,
          paraSpaceConfig.Uniswap.V3Factory,
          false
        );
      }
      if (
        tokenSymbol === ERC721TokenContractId.WPUNKS &&
        paraSpaceConfig.Tokens.PUNKS
      ) {
        await insertContractAddressInDb(
          eContractid.PUNKS,
          paraSpaceConfig.Tokens.PUNKS,
          false
        );
      }
      continue;
    } else {
      console.log("deploying now ", tokenSymbol);

      // we are using hardhat, we want to use mock ERC721 contracts
      if (tokenSymbol === ERC721TokenContractId.WPUNKS) {
        const punks = await deployPunks([], verify);
        tokens[eContractid.PUNKS] = punks;
        tokens[tokenSymbol] = await deployWPunks([punks.address], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.BAYC) {
        tokens[tokenSymbol] = await deployBAYC(
          [tokenSymbol, tokenSymbol, "8000", "0"],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.MAYC) {
        tokens[tokenSymbol] = await deployMAYC(
          [tokenSymbol, tokenSymbol, ZERO_ADDRESS, ZERO_ADDRESS],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.DOODLE) {
        tokens[tokenSymbol] = await deployDoodle([], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.AZUKI) {
        tokens[tokenSymbol] = await deployAzuki([5, 10000, 8900, 200], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.CLONEX) {
        tokens[tokenSymbol] = await deployCloneX([], verify);
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.MEEBITS) {
        const punks = await getPunks();
        tokens[tokenSymbol] = await deployMeebits(
          [punks.address, ZERO_ADDRESS, paraSpaceConfig.ParaSpaceTeam],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.OTHR) {
        tokens[tokenSymbol] = await deployOTHR(
          [
            "OTHR",
            "OTHR",
            [ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS],
            [10, 100, 1000, 10000],
            [[paraSpaceConfig.ParaSpaceTeam, 100]],
            paraSpaceConfig.ParaSpaceTeam,
            paraSpaceConfig.ParaSpaceTeam,
            "0x63616e6469646174653100000000000000000000000000000000000000000000",
            5,
            paraSpaceConfig.ParaSpaceTeam,
          ],
          verify
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.MOONBIRD) {
        tokens[tokenSymbol] = await deployMoonbirds(
          [
            "Moonbirds",
            "MOONBIRD",
            "0x0000000000000000000000000000000000000000",
            paraSpaceConfig.ParaSpaceTeam,
            paraSpaceConfig.ParaSpaceTeam,
          ],
          verify
        );
        await (tokens[tokenSymbol] as Moonbirds).setNestingOpen(
          true,
          GLOBAL_OVERRIDES
        );
        continue;
      }

      if (tokenSymbol === ERC721TokenContractId.UniswapV3) {
        const weth = await getWETH();
        const positionDescriptor =
          await deployNonfungibleTokenPositionDescriptor(
            [
              weth.address,
              // 'ETH' as a bytes32 string
              "0x4554480000000000000000000000000000000000000000000000000000000000",
            ],
            verify
          );
        const factory = await deployUniswapV3Factory([], verify);
        await deployUniswapSwapRouter([factory.address, weth.address], verify);
        const nonfungiblePositionManager =
          await deployNonfungiblePositionManager(
            [factory.address, weth.address, positionDescriptor.address],
            verify
          );
        tokens[tokenSymbol] = nonfungiblePositionManager;
        continue;
      }

      tokens[tokenSymbol] = await deployMintableERC721(
        [tokenSymbol, tokenSymbol, ""],
        verify
      );
    }
  }

  return tokens;
};

export const deployMoonbirds = async (
  args: [string, string, tEthereumAddress, tEthereumAddress, tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    new Moonbirds__factory(await getFirstSigner()),
    eContractid.MOONBIRD,
    [...args],
    verify
  ) as Promise<Moonbirds>;

export const deployReservesSetupHelper = async (verify?: boolean) =>
  withSaveAndVerify(
    new ReservesSetupHelper__factory(await getFirstSigner()),
    eContractid.ReservesSetupHelper,
    [],
    verify
  ) as Promise<ReservesSetupHelper>;

export const deployInitializableImmutableAdminUpgradeabilityProxy = async (
  args: [tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    new InitializableImmutableAdminUpgradeabilityProxy__factory(
      await getFirstSigner()
    ),
    eContractid.InitializableImmutableAdminUpgradeabilityProxy,
    [...args],
    verify
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;

export const deployWETH = async (verify?: boolean) =>
  withSaveAndVerify(
    new WETH9Mocked__factory(await getFirstSigner()),
    eContractid.WETH,
    [],
    verify
  ) as Promise<WETH9Mocked>;

export const deployUiPoolDataProvider = async (
  arg1: string,
  arg2: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new UiPoolDataProvider__factory(await getFirstSigner()),
    eContractid.UiPoolDataProvider,
    [arg1, arg2],
    verify
  ) as Promise<UiPoolDataProvider>;

export const deployUiIncentiveDataProvider = async (verify?: boolean) =>
  withSaveAndVerify(
    new UiIncentiveDataProvider__factory(await getFirstSigner()),
    eContractid.UiIncentiveDataProvider,
    [],
    verify
  ) as Promise<UiIncentiveDataProvider>;

export const deployWalletBalanceProvider = async (verify?: boolean) =>
  withSaveAndVerify(
    new WalletBalanceProvider__factory(await getFirstSigner()),
    eContractid.WalletBalanceProvider,
    [],
    verify
  ) as Promise<WalletBalanceProvider>;

export const deployWETHGateway = async (
  weth: string,
  pool: Address,
  verify?: boolean
) =>
  withSaveAndVerify(
    new WETHGateway__factory(await getFirstSigner()),
    eContractid.WETHGatewayImpl,
    [weth, pool],
    verify
  ) as Promise<WETHGateway>;

export const deployWETHGatewayProxy = async (
  admin: string,
  wethGateway: string,
  initData: string,
  verify?: boolean
) => {
  const wethGatewayProxy =
    new InitializableImmutableAdminUpgradeabilityProxy__factory(
      await getFirstSigner()
    );
  return withSaveAndVerify(
    wethGatewayProxy,
    eContractid.WETHGatewayProxy,
    [admin, wethGateway, initData],
    verify,
    true
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;
};

export const deployMeebits = async (
  args: [tEthereumAddress, tEthereumAddress, tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    new Meebits__factory(await getFirstSigner()),
    eContractid.Meebits,
    [...args],
    verify
  ) as Promise<Meebits>;

export const deployAzuki = async (
  args: [number, number, number, number],
  verify?: boolean
) =>
  withSaveAndVerify(
    new Azuki__factory(await getFirstSigner()),
    eContractid.Azuki,
    [...args],
    verify
  ) as Promise<Azuki>;

export const deployOTHR = async (
  // eslint-disable-next-line
  args: [any, any, any, any, any, any, any, any, any, any],
  verify?: boolean
) =>
  withSaveAndVerify(
    new Land__factory(await getFirstSigner()),
    eContractid.OTHR,
    [...args],
    verify
  ) as Promise<Land>;

export const deployCloneX = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    new CloneX__factory(await getFirstSigner()),
    eContractid.CloneX,
    [...args],
    verify
  ) as Promise<CloneX>;

export const deployDoodle = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    new Doodles__factory(await getFirstSigner()),
    eContractid.Doodles,
    [...args],
    verify
  ) as Promise<Doodles>;

export const deployMAYC = async (
  args: [string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    new MutantApeYachtClub__factory(await getFirstSigner()),
    eContractid.MutantApeYachtClub,
    [...args],
    verify
  ) as Promise<MutantApeYachtClub>;

export const deployBAYC = async (
  args: [string, string, string, string],
  verify?: boolean
) =>
  withSaveAndVerify(
    new BoredApeYachtClub__factory(await getFirstSigner()),
    eContractid.BoredApeYachtClub,
    [...args],
    verify
  ) as Promise<BoredApeYachtClub>;

export const deployERC721OracleWrapper = async (
  addressesProvider: string,
  oracleAddress: string,
  asset: string,
  symbol: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new ERC721OracleWrapper__factory(await getFirstSigner()),
    eContractid.Aggregator.concat(`.${symbol}`),
    [addressesProvider, oracleAddress, asset],
    verify
  ) as Promise<ERC721OracleWrapper>;

export const deployPunks = async (args: [], verify?: boolean) =>
  withSaveAndVerify(
    new CryptoPunksMarket__factory(await getFirstSigner()),
    eContractid.PUNKS,
    [...args],
    verify
  ) as Promise<CryptoPunksMarket>;

export const deployWPunks = async (
  args: [tEthereumAddress],
  verify?: boolean
) =>
  withSaveAndVerify(
    new WPunk__factory(await getFirstSigner()),
    eContractid.WPunk,
    [...args],
    verify
  ) as Promise<WPunk>;

export const deployPunkGateway = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    // tEthereumAddress,
    tEthereumAddress
  ],
  verify?: boolean
) => {
  const punkImpl = new WPunkGateway__factory(await getFirstSigner());
  return withSaveAndVerify(
    punkImpl,
    eContractid.WPunkGatewayImpl,
    [...args],
    verify
  ) as Promise<WPunkGateway>;
};

export const deployPunkGatewayProxy = async (
  admin: string,
  punkGateway: string,
  initData: string,
  verify?: boolean
) => {
  const punkGatewayProxy =
    new InitializableImmutableAdminUpgradeabilityProxy__factory(
      await getFirstSigner()
    );
  return withSaveAndVerify(
    punkGatewayProxy,
    eContractid.WPunkGatewayProxy,
    [admin, punkGateway, initData],
    verify,
    true
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;
};

export const deploySeaportAdapter = async (
  provider: tEthereumAddress,
  verify?: boolean
) => {
  const seaportAdapter = new SeaportAdapter__factory(await getFirstSigner());

  return withSaveAndVerify(
    seaportAdapter,
    eContractid.SeaportAdapter,
    [provider],
    verify
  ) as Promise<SeaportAdapter>;
};

export const deployLooksRareAdapter = async (
  provider: tEthereumAddress,
  strategy: tEthereumAddress,
  verify?: boolean
) => {
  const looksRareAdapter = new LooksRareAdapter__factory(
    await getFirstSigner()
  );

  return withSaveAndVerify(
    looksRareAdapter,
    eContractid.LooksRareAdapter,
    [provider, strategy],
    verify
  ) as Promise<LooksRareAdapter>;
};

export const deployX2Y2Adapter = async (
  provider: tEthereumAddress,
  verify?: boolean
) => {
  const x2y2Adapter = new X2Y2Adapter__factory(await getFirstSigner());

  return withSaveAndVerify(
    x2y2Adapter,
    eContractid.X2Y2Adapter,
    [provider],
    verify
  ) as Promise<X2Y2Adapter>;
};

export const deployMarketplaceLogic = async (
  libraries: MarketplaceLogicLibraryAddresses,
  verify?: boolean
) => {
  const marketplaceLogic = new MarketplaceLogic__factory(
    libraries,
    await getFirstSigner()
  );

  return withSaveAndVerify(
    marketplaceLogic,
    eContractid.MarketplaceLogic,
    [],
    verify,
    false,
    libraries
  ) as Promise<MarketplaceLogic>;
};

export const deployConduitController = async (verify?: boolean) =>
  withSaveAndVerify(
    new ConduitController__factory(await getFirstSigner()),
    eContractid.ConduitController,
    [],
    verify
  ) as Promise<ConduitController>;

export const deployPausableZoneController = async (
  owner: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new PausableZoneController__factory(await getFirstSigner()),
    eContractid.PausableZoneController,
    [owner],
    verify
  ) as Promise<PausableZoneController>;

export const deploySeaport = async (
  conduitController: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new Seaport__factory(await getFirstSigner()),
    eContractid.Seaport,
    [conduitController],
    verify
  ) as Promise<Seaport>;

export const deployCurrencyManager = async (verify?: boolean) =>
  withSaveAndVerify(
    new CurrencyManager__factory(await getFirstSigner()),
    eContractid.CurrencyManager,
    [],
    verify
  ) as Promise<CurrencyManager>;

export const deployExecutionManager = async (verify?: boolean) =>
  withSaveAndVerify(
    new ExecutionManager__factory(await getFirstSigner()),
    eContractid.ExecutionManager,
    [],
    verify
  ) as Promise<ExecutionManager>;

export const deployLooksRareExchange = async (
  currencyManager: string,
  executionManager: string,
  royaltyFeeManager: string,
  weth: string,
  protocolFeeRecipient: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new LooksRareExchange__factory(await getFirstSigner()),
    eContractid.LooksRareExchange,
    [
      currencyManager,
      executionManager,
      royaltyFeeManager,
      weth,
      protocolFeeRecipient,
    ],
    verify
  ) as Promise<LooksRareExchange>;

export const deployRoyaltyFeeManager = async (
  royaltyFeeRegistry: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new RoyaltyFeeManager__factory(await getFirstSigner()),
    eContractid.RoyaltyFeeManager,
    [royaltyFeeRegistry],
    verify
  ) as Promise<RoyaltyFeeManager>;

export const deployRoyaltyFeeRegistry = async (
  royaltyFeeLimit: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new RoyaltyFeeRegistry__factory(await getFirstSigner()),
    eContractid.RoyaltyFeeRegistry,
    [royaltyFeeLimit],
    verify
  ) as Promise<RoyaltyFeeRegistry>;

export const deployTransferSelectorNFT = async (
  transferManagerERC721: string,
  transferManagerERC1155: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new TransferSelectorNFT__factory(await getFirstSigner()),
    eContractid.TransferSelectorNFT,
    [transferManagerERC721, transferManagerERC1155],
    verify
  ) as Promise<TransferSelectorNFT>;

export const deployTransferManagerERC721 = async (
  looksRareExchange: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new TransferManagerERC721__factory(await getFirstSigner()),
    eContractid.TransferManagerERC721,
    [looksRareExchange],
    verify
  ) as Promise<TransferManagerERC721>;

export const deployTransferManagerERC1155 = async (
  looksRareExchange: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new TransferManagerERC1155__factory(await getFirstSigner()),
    eContractid.TransferManagerERC1155,
    [looksRareExchange],
    verify
  ) as Promise<TransferManagerERC1155>;

export const deployStrategyStandardSaleForFixedPrice = async (
  protocolFee: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new StrategyStandardSaleForFixedPrice__factory(await getFirstSigner()),
    eContractid.StrategyStandardSaleForFixedPrice,
    [protocolFee],
    verify
  ) as Promise<StrategyStandardSaleForFixedPrice>;

export const deployX2Y2R1 = async (verify?: boolean) =>
  withSaveAndVerify(
    new X2Y2R1__factory(await getFirstSigner()),
    eContractid.X2Y2R1,
    [],
    verify
  ) as Promise<X2Y2R1>;

export const deployERC721Delegate = async (verify?: boolean) =>
  withSaveAndVerify(
    new ERC721Delegate__factory(await getFirstSigner()),
    eContractid.ERC721Delegate,
    [],
    verify
  ) as Promise<ERC721Delegate>;

export const deployUniswapV3Factory = async (args: [], verify?: boolean) => {
  const uniswapV3Factory = new UniswapV3Factory__factory(
    await getFirstSigner()
  );
  return withSaveAndVerify(
    uniswapV3Factory,
    eContractid.UniswapV3Factory,
    [...args],
    verify
  ) as Promise<UniswapV3Factory>;
};

export const deployNonfungibleTokenPositionDescriptor = async (
  args: [string, string],
  verify?: boolean
) => {
  const nFTDescriptorFactory = (
    await DRE.ethers.getContractFactoryFromArtifact(nFTDescriptor)
  ).connect(await getFirstSigner());

  const nftDescriptorLibraryContract = await withSaveAndVerify(
    nFTDescriptorFactory,
    eContractid.NFTDescriptor,
    [],
    verify
  );
  const libraries = {
    NFTDescriptor: nftDescriptorLibraryContract.address,
  };
  const nonfungibleTokenPositionDescriptorFactory = (
    await DRE.ethers.getContractFactoryFromArtifact(
      nonfungibleTokenPositionDescriptor,
      {
        libraries,
      }
    )
  ).connect(await getFirstSigner());

  return withSaveAndVerify(
    nonfungibleTokenPositionDescriptorFactory,
    eContractid.NonfungibleTokenPositionDescriptor,
    [...args],
    verify,
    false,
    libraries
  );
};

export const deployUniswapV3OracleWrapper = async (
  factory: string,
  manager: string,
  addressProvider: string,
  verify?: boolean
) =>
  withSaveAndVerify(
    new UniswapV3OracleWrapper__factory(await getFirstSigner()),
    eContractid.Aggregator.concat(`.${eContractid.UniswapV3}`),
    [factory, manager, addressProvider],
    verify
  ) as Promise<UniswapV3OracleWrapper>;

export const deployNonfungiblePositionManager = async (
  args: [string, string, string],
  verify?: boolean
) => {
  const nonfungiblePositionManagerFactory = (
    await DRE.ethers.getContractFactoryFromArtifact(nonfungiblePositionManager)
  ).connect(await getFirstSigner());

  return withSaveAndVerify(
    nonfungiblePositionManagerFactory,
    eContractid.UniswapV3,
    [...args],
    verify
  );
};

export const deployUniswapSwapRouter = async (
  args: [string, string],
  verify?: boolean
) => {
  const swapRouter = (
    await DRE.ethers.getContractFactoryFromArtifact(uniSwapRouter)
  ).connect(await getFirstSigner());

  return withSaveAndVerify(
    swapRouter,
    eContractid.UniswapV3SwapRouter,
    [...args],
    verify
  );
};

export const deployStETH = async (
  args: [string, string, string],
  verify?: boolean
): Promise<StETH> =>
  withSaveAndVerify(
    new StETH__factory(await getFirstSigner()),
    args[1],
    [...args],
    verify
  ) as Promise<StETH>;

export const deployMockAToken = async (
  args: [string, string, string],
  verify?: boolean
): Promise<MockAToken> =>
  withSaveAndVerify(
    new MockAToken__factory(await getFirstSigner()),
    args[1],
    [...args],
    verify
  ) as Promise<MockAToken>;

export const deployPTokenAToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new PTokenAToken__factory(await getFirstSigner()),
    eContractid.PTokenATokenImpl,
    [poolAddress],
    verify
  ) as Promise<PTokenAToken>;

export const deployPTokenStETH = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new PTokenStETH__factory(await getFirstSigner()),
    eContractid.PTokenStETHImpl,
    [poolAddress],
    verify
  ) as Promise<PTokenStETH>;

export const deployPTokenSApe = async (
  poolAddress: tEthereumAddress,
  nBAYC: tEthereumAddress,
  nMAYC: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new PTokenSApe__factory(await getFirstSigner()),
    eContractid.PTokenSApeImpl,
    [poolAddress, nBAYC, nMAYC],
    verify
  ) as Promise<PTokenSApe>;

export const deployUserFlashClaimRegistry = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new UserFlashclaimRegistry__factory(await getFirstSigner()),
    eContractid.FlashClaimRegistry,
    [poolAddress],
    verify
  ) as Promise<UserFlashclaimRegistry>;

export const deployMockAirdropProject = async (
  underlyingAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new MockAirdropProject__factory(await getFirstSigner()),
    eContractid.MockAirdropProject,
    [underlyingAddress],
    verify
  ) as Promise<MockAirdropProject>;

export const deployApeCoinStaking = async (verify?: boolean) => {
  const allTokens = await getAllTokens();
  const bakc = await deployMintableERC721(["BAKC", "BAKC", ""], verify);
  const args = [
    allTokens.APE.address,
    allTokens.BAYC.address,
    allTokens.MAYC.address,
    bakc.address,
  ];

  const apeCoinStaking = await withSaveAndVerify(
    new ApeCoinStaking__factory(await getFirstSigner()),
    eContractid.ApeCoinStaking,
    [...args],
    verify
  );
  const amount = await convertToCurrencyDecimals(
    allTokens.APE.address,
    "94694400"
  );

  await apeCoinStaking.addTimeRange(
    0,
    amount,
    "1666771200",
    "1761465600",
    amount,
    GLOBAL_OVERRIDES
  );
  await apeCoinStaking.addTimeRange(
    1,
    amount,
    "1666771200",
    "1761465600",
    amount,
    GLOBAL_OVERRIDES
  );
  await apeCoinStaking.addTimeRange(
    2,
    amount,
    "1666771200",
    "1761465600",
    amount,
    GLOBAL_OVERRIDES
  );
  await apeCoinStaking.addTimeRange(
    3,
    amount,
    "1666771200",
    "1761465600",
    amount,
    GLOBAL_OVERRIDES
  );
  return apeCoinStaking;
};

export const deployApeStakingLogic = async (verify?: boolean) => {
  return withSaveAndVerify(
    new ApeStakingLogic__factory(await getFirstSigner()),
    eContractid.ApeStakingLogic,
    [],
    verify
  ) as Promise<ApeStakingLogic>;
};

export const deployNTokenBAYCImpl = async (
  apeCoinStaking: tEthereumAddress,
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let apeStakingLogic;
  apeStakingLogic = await getApeStakingLogic();
  if (!apeStakingLogic) {
    apeStakingLogic = await deployApeStakingLogic(verify);
  }
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/ApeStakingLogic.sol:ApeStakingLogic"]:
      apeStakingLogic.address,
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };

  return withSaveAndVerify(
    new NTokenBAYC__factory(libraries, await getFirstSigner()),
    eContractid.NTokenBAYCImpl,
    [poolAddress, apeCoinStaking],
    verify
  ) as Promise<NTokenBAYC>;
};

export const deployNTokenMAYCImpl = async (
  apeCoinStaking: tEthereumAddress,
  poolAddress: tEthereumAddress,
  verify?: boolean
) => {
  let apeStakingLogic;
  apeStakingLogic = await getApeStakingLogic();
  if (!apeStakingLogic) {
    apeStakingLogic = await deployApeStakingLogic();
  }
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/ApeStakingLogic.sol:ApeStakingLogic"]:
      apeStakingLogic.address,
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };
  return withSaveAndVerify(
    new NTokenMAYC__factory(libraries, await getFirstSigner()),
    eContractid.NTokenMAYCImpl,
    [poolAddress, apeCoinStaking],
    verify
  ) as Promise<NTokenMAYC>;
};
export const deployATokenDebtToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new ATokenDebtToken__factory(await getFirstSigner()),
    eContractid.ATokenDebtToken,
    [poolAddress],
    verify
  ) as Promise<ATokenDebtToken>;

export const deployStETHDebtToken = async (
  poolAddress: tEthereumAddress,
  verify?: boolean
) =>
  withSaveAndVerify(
    new StETHDebtToken__factory(await getFirstSigner()),
    eContractid.StETHDebtToken,
    [poolAddress],
    verify
  ) as Promise<StETHDebtToken>;

export const deployMintableERC721Logic = async (verify?: boolean) => {
  return withSaveAndVerify(
    new MintableERC721Logic__factory(await getFirstSigner()),
    eContractid.MintableERC721Logic,
    [],
    verify
  ) as Promise<MintableERC721Logic>;
};

export const deployMerkleVerifier = async (verify?: boolean) =>
  withSaveAndVerify(
    new MerkleVerifier__factory(await getFirstSigner()),
    eContractid.MerkleVerifier,
    [],
    verify
  ) as Promise<MerkleVerifier>;

export const deployExecutionDelegate = async (verify?: boolean) =>
  withSaveAndVerify(
    new ExecutionDelegate__factory(await getFirstSigner()),
    eContractid.ExecutionDelegate,
    [],
    verify
  ) as Promise<ExecutionDelegate>;

export const deployPolicyManager = async (verify?: boolean) =>
  withSaveAndVerify(
    new PolicyManager__factory(await getFirstSigner()),
    eContractid.PolicyManager,
    [],
    verify
  ) as Promise<PolicyManager>;

export const deployStandardPolicyERC721 = async (verify?: boolean) =>
  withSaveAndVerify(
    new StandardPolicyERC721__factory(await getFirstSigner()),
    eContractid.StandardPolicyERC721,
    [],
    verify
  ) as Promise<StandardPolicyERC721>;

export const deployBlurExchangeImpl = async (verify?: boolean) => {
  const merkleVerifier = await deployMerkleVerifier(verify);
  const blurExchangeLibraries = {
    ["contracts/dependencies/blur-exchange/MerkleVerifier.sol:MerkleVerifier"]:
      merkleVerifier.address,
  };
  const blurExchange = new BlurExchange__factory(
    blurExchangeLibraries,
    await getFirstSigner()
  );

  return withSaveAndVerify(
    blurExchange,
    eContractid.BlurExchangeImpl,
    [],
    verify,
    false,
    blurExchangeLibraries
  ) as Promise<BlurExchange>;
};

export const deployBlurExchangeProxy = async (
  admin: string,
  blurExchange: string,
  initData: string,
  verify?: boolean
) => {
  const blurExchangeProxy =
    new InitializableImmutableAdminUpgradeabilityProxy__factory(
      await getFirstSigner()
    );
  return withSaveAndVerify(
    blurExchangeProxy,
    eContractid.BlurExchangeProxy,
    [admin, blurExchange, initData],
    verify,
    true
  ) as Promise<InitializableImmutableAdminUpgradeabilityProxy>;
};

export const deployBlurAdapter = async (
  provider: tEthereumAddress,
  policy: tEthereumAddress,
  verify?: boolean
) => {
  return withSaveAndVerify(
    new BlurAdapter__factory(await getFirstSigner()),
    eContractid.BlurAdapter,
    [provider, policy],
    verify
  ) as Promise<BlurAdapter>;
};

export const deployTimeLockExecutor = async (
  args: string[],
  verify?: boolean
) => {
  return withSaveAndVerify(
    new ExecutorWithTimelock__factory(await getFirstSigner()),
    eContractid.TimeLockExecutor,
    [...args],
    verify
  ) as Promise<ExecutorWithTimelock>;
};

////////////////////////////////////////////////////////////////////////////////
//  MOCK
////////////////////////////////////////////////////////////////////////////////
export const deployGenericPToken = async (
  [
    poolAddress,
    underlyingAssetAddress,
    treasuryAddress,
    incentivesController,
    name,
    symbol,
  ]: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    new PToken__factory(await getFirstSigner()),
    eContractid.PTokenImpl,
    [poolAddress],
    verify
  );

  await instance.initialize(
    poolAddress,
    treasuryAddress,
    underlyingAssetAddress,
    incentivesController,
    "18",
    name,
    symbol,
    "0x10"
  );

  return instance;
};

export const deployDelegationAwarePToken = async (
  [
    poolAddress,
    underlyingAssetAddress,
    treasuryAddress,
    incentivesController,
    name,
    symbol,
  ]: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = await withSaveAndVerify(
    new DelegationAwarePToken__factory(await getFirstSigner()),
    eContractid.DelegationAwarePTokenImpl,
    [poolAddress],
    verify
  );

  await instance.initialize(
    poolAddress,
    treasuryAddress,
    underlyingAssetAddress,
    incentivesController,
    "18",
    name,
    symbol,
    "0x10"
  );

  return instance;
};

export const deployMockVariableDebtToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = (await withSaveAndVerify(
    new MockVariableDebtToken__factory(await getFirstSigner()),
    eContractid.MockVariableDebtToken,
    [args[0]],
    verify
  )) as MockVariableDebtToken;

  await instance.initialize(
    args[0],
    args[1],
    args[2],
    "18",
    args[3],
    args[4],
    args[5],
    GLOBAL_OVERRIDES
  );

  return instance;
};

export const deployMockNToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  let mintableERC721Logic;
  mintableERC721Logic = await getMintableERC721Logic();
  if (!mintableERC721Logic) {
    mintableERC721Logic = await deployMintableERC721Logic(verify);
  }

  const libraries = {
    ["contracts/protocol/tokenization/libraries/MintableERC721Logic.sol:MintableERC721Logic"]:
      mintableERC721Logic.address,
  };

  const instance = (await withSaveAndVerify(
    new MockNToken__factory(libraries, await getFirstSigner()),
    eContractid.MockNToken,
    [args[0], false],
    verify
  )) as MockNToken;

  await instance.initialize(
    args[0],
    args[1],
    args[2],
    args[3],
    args[4],
    args[5],
    GLOBAL_OVERRIDES
  );

  return instance;
};

export const deployMockPToken = async (
  args: [
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    tEthereumAddress,
    string,
    string,
    string
  ],
  verify?: boolean
) => {
  const instance = (await withSaveAndVerify(
    new MockPToken__factory(await getFirstSigner()),
    eContractid.MockPToken,
    [args[0]],
    verify
  )) as MockPToken;

  await instance.initialize(
    args[0],
    args[2],
    args[1],
    args[3],
    "18",
    args[4],
    args[5],
    args[6],
    GLOBAL_OVERRIDES
  );

  return instance;
};

export const deployMockIncentivesController = async (verify?: boolean) =>
  withSaveAndVerify(
    new MockIncentivesController__factory(await getFirstSigner()),
    eContractid.MockIncentivesController,
    [],
    verify
  ) as Promise<MockIncentivesController>;

export const deployMockReserveConfiguration = async (verify?: boolean) =>
  withSaveAndVerify(
    new MockReserveConfiguration__factory(await getFirstSigner()),
    eContractid.MockReserveConfiguration,
    [],
    verify
  ) as Promise<MockReserveConfiguration>;

export const deployMockInitializableImple = async (verify?: boolean) =>
  withSaveAndVerify(
    new MockInitializableImple__factory(await getFirstSigner()),
    eContractid.MockInitializableImple,
    [],
    verify
  ) as Promise<MockInitializableImple>;

export const deployMockInitializableImpleV2 = async (verify?: boolean) =>
  withSaveAndVerify(
    new MockInitializableImpleV2__factory(await getFirstSigner()),
    eContractid.MockInitializableImpleV2,
    [],
    verify
  ) as Promise<MockInitializableImpleV2>;

export const deployMockInitializableFromConstructorImple = async (
  args: [string],
  verify?: boolean
) =>
  withSaveAndVerify(
    new MockInitializableFromConstructorImple__factory(await getFirstSigner()),
    eContractid.MockInitializableFromConstructorImple,
    [...args],
    verify
  ) as Promise<MockInitializableFromConstructorImple>;

export const deployMockReentrantInitializableImple = async (verify?: boolean) =>
  withSaveAndVerify(
    new MockReentrantInitializableImple__factory(await getFirstSigner()),
    eContractid.MockReentrantInitializableImple,
    [],
    verify
  ) as Promise<MockReentrantInitializableImple>;

export const deployMockTokenFaucet = async (
  erc20configs,
  erc721configs,
  punkConfig,
  verify?: boolean
) =>
  withSaveAndVerify(
    new MockTokenFaucet__factory(await getFirstSigner()),
    eContractid.MockTokenFaucet,
    [erc20configs, erc721configs, punkConfig],
    verify
  );
