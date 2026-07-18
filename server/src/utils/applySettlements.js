const applySettlements = (balanceMap, settlements) => {
  // Create a new balance map to avoid mutating the original
  const updatedBalanceMap = { ...balanceMap };

  settlements.forEach((settlement) => {
    const paidById = settlement.paidBy._id
      ? settlement.paidBy._id.toString()
      : settlement.paidBy.toString();

    const receivedById = settlement.receivedBy._id
      ? settlement.receivedBy._id.toString()
      : settlement.receivedBy.toString();

    const amount = Number(settlement.amount);

    // Ensure both users exist in the balance map
    if (!(paidById in updatedBalanceMap)) {
      updatedBalanceMap[paidById] = 0;
    }

    if (!(receivedById in updatedBalanceMap)) {
      updatedBalanceMap[receivedById] = 0;
    }

    // Debtor owes less after settling
    updatedBalanceMap[paidById] = Number(
      (updatedBalanceMap[paidById] + amount).toFixed(2)
    );

    // Creditor should receive less after settlement
    updatedBalanceMap[receivedById] = Number(
      (updatedBalanceMap[receivedById] - amount).toFixed(2)
    );
  });

  return updatedBalanceMap;
};

module.exports = applySettlements;