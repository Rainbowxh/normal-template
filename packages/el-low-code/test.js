/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const dp = []
  dp[0] = 0;

  for(let i = 1; i <= amount; i++) {
      let min = undefined;
      for(let coin of coins) {
          const cursor = i - coin;
          if(cursor < 0) continue;

          console.log(dp, cursor, dp[cursor])

          if(dp[cursor] === undefined) {

              continue
          }else {

            if(min === undefined) {
              min = dp[cursor] + 1
            }else {
              min = Math.min(dp[cursor] + 1, min)
            }
          }
      }
      dp[i] = min;
  }

  return dp[amount] === undefined ? -1 : dp[amount]

};

coinChange([1,2,5], 11)
