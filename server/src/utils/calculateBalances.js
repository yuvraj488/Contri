const calculateBalances = (expenses) => {
  const paidMap = {};
  const shareMap = {};

  expenses.forEach((expense) => {
    const paidById = expense.paidBy._id
      ? expense.paidBy._id.toString()
      : expense.paidBy.toString();

    const share = Number(
      (expense.amount / expense.participants.length).toFixed(2)
    );

    // Amount paid
    paidMap[paidById] =
      (paidMap[paidById] || 0) + expense.amount;

    // Equal share
    expense.participants.forEach((participant) => {
      const participantId = participant._id
        ? participant._id.toString()
        : participant.toString();

      shareMap[participantId] =
        (shareMap[participantId] || 0) + share;
    });
  });

  const balanceMap = {};

  const allUsers = new Set([
    ...Object.keys(paidMap),
    ...Object.keys(shareMap),
  ]);

  allUsers.forEach((userId) => {
    balanceMap[userId] = Number(
      (
        (paidMap[userId] || 0) -
        (shareMap[userId] || 0)
      ).toFixed(2)
    );
  });

  return balanceMap;
};

module.exports = calculateBalances;