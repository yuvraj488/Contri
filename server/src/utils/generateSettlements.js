const generateSettlements = (balanceMap) => {
  const creditors = [];
  const debtors = [];

  // Separate creditors and debtors
  Object.entries(balanceMap).forEach(([memberId, balance]) => {
    if (balance > 0) {
      creditors.push({
        memberId,
        amount: balance,
      });
    } else if (balance < 0) {
      debtors.push({
        memberId,
        amount: Math.abs(balance),
      });
    }
  });

  const settlements = [];

  let creditorIndex = 0;
  let debtorIndex = 0;

  while (
    creditorIndex < creditors.length &&
    debtorIndex < debtors.length
  ) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];

    const settledAmount = Number(
      Math.min(creditor.amount, debtor.amount).toFixed(2)
    );

    settlements.push({
      from: debtor.memberId,
      to: creditor.memberId,
      amount: settledAmount,
    });

    creditor.amount = Number(
      (creditor.amount - settledAmount).toFixed(2)
    );

    debtor.amount = Number(
      (debtor.amount - settledAmount).toFixed(2)
    );

    if (creditor.amount <= 0.01) {
      creditorIndex++;
    }

    if (debtor.amount <= 0.01) {
      debtorIndex++;
    }
  }

  return settlements;
};

module.exports = generateSettlements;