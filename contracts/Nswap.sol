// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract NSwap {
    address public token1;
    address public token2;
    uint256 public reserveA;
    uint256 public reserveB;

    constructor(address _tokenA, address _tokenB) {
        token1 = _tokenA;
        token2 = _tokenB;
    }

    struct LiquidityProvider {
        uint AmountA;
        uint AmountB;
    }

    mapping(address => LiquidityProvider) liquidityProvider;

    function swap(uint256 amountIn, uint256 amountOutMin) external {
        IERC20(token1).transferFrom(msg.sender, address(this), amountIn);
        uint256 amountOut = getAmountOut(amountIn);
        require(amountOut >= amountOutMin, "Insufficient output amount");
        IERC20(token2).transfer(msg.sender, amountOut);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        IERC20(token1).transferFrom(msg.sender, address(this), amountA);
        IERC20(token2).transferFrom(msg.sender, address(this), amountB);

        reserveA += amountA;
        reserveB += amountB;

        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.AmountA += amountA;
        provider.AmountB + amountB;
    }

    function getAmountOut(uint256 amountIn) public view returns (uint256) {
        require(reserveA > 0 && reserveB > 0, "No liquidity available");
        uint256 amountInWithFee = amountIn * 997;
        uint256 numerator = amountInWithFee * reserveB;
        uint256 denominator = reserveA * 1000 + amountInWithFee;
        return numerator / denominator;
    }
}
