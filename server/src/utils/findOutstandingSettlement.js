const findOutstandingSettlement = (
  settlements,
  paidBy,
  receivedBy
) => {
  return (
    settlements.find(
      (settlement) =>
        settlement.from === paidBy.toString() &&
        settlement.to === receivedBy.toString()
    ) || null
  );
};

module.exports = findOutstandingSettlement;