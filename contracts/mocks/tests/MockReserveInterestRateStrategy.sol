// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

import {IReserveInterestRateStrategy} from "../../interfaces/IReserveInterestRateStrategy.sol";
import {IPoolAddressesProvider} from "../../interfaces/IPoolAddressesProvider.sol";
import {WadRayMath} from "../../protocol/libraries/math/WadRayMath.sol";
import {DataTypes} from "../../protocol/libraries/types/DataTypes.sol";

contract MockReserveInterestRateStrategy is IReserveInterestRateStrategy {
    uint256 public immutable OPTIMAL_USAGE_RATIO;
    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;
    uint256 internal immutable _baseVariableBorrowRate;
    uint256 internal immutable _variableRateSlope1;
    uint256 internal immutable _variableRateSlope2;

    uint256 internal _liquidityRate;
    uint256 internal _variableBorrowRate;

    constructor(
        IPoolAddressesProvider provider,
        uint256 optimalUsageRatio,
        uint256 baseVariableBorrowRate,
        uint256 variableRateSlope1,
        uint256 variableRateSlope2
    ) {
        OPTIMAL_USAGE_RATIO = optimalUsageRatio;
        ADDRESSES_PROVIDER = provider;
        _baseVariableBorrowRate = baseVariableBorrowRate;
        _variableRateSlope1 = variableRateSlope1;
        _variableRateSlope2 = variableRateSlope2;
    }

    function setLiquidityRate(uint256 liquidityRate) public {
        _liquidityRate = liquidityRate;
    }

    function setVariableBorrowRate(uint256 variableBorrowRate) public {
        _variableBorrowRate = variableBorrowRate;
    }

    function calculateInterestRates(
        DataTypes.CalculateInterestRatesParams memory
    )
        external
        view
        override
        returns (
            uint256 liquidityRate,
            uint256 variableBorrowRate
        )
    {
        return (_liquidityRate, _variableBorrowRate);
    }

    function getVariableRateSlope1() external view returns (uint256) {
        return _variableRateSlope1;
    }

    function getVariableRateSlope2() external view returns (uint256) {
        return _variableRateSlope2;
    }

    function getBaseVariableBorrowRate()
        external
        view
        override
        returns (uint256)
    {
        return _baseVariableBorrowRate;
    }

    function getMaxVariableBorrowRate()
        external
        view
        override
        returns (uint256)
    {
        return
            _baseVariableBorrowRate + _variableRateSlope1 + _variableRateSlope2;
    }
}
