const calculateBalances = require("./calculateBalances");
const applySettlements = require("./applySettlements");
const generateSettlements = require("./generateSettlements");

const generateSettlementPlan = (expenses, settlements) => {
  const balanceMap = calculateBalances(expenses);

  const updatedBalanceMap = applySettlements(
    balanceMap,
    settlements
  );

  return generateSettlements(updatedBalanceMap);
};

module.exports = generateSettlementPlan;