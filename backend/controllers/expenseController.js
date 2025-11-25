/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getExpense = async (req, res, next) => {
  try {
    const expenses = await req.user.getExpenses();

    //Deleting some properties before sending the response.
    expenses.forEach((e) => {
      delete e.dataValues.createdAt;
      delete e.dataValues.updatedAt;
      delete e.dataValues.userId;
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.postExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;
  try {
    const expense = await req.user.createExpense({
      amount,
      description,
      category,
    });

    await req.user.increment("totalExpenses", { by: amount });

    //Deleting some properties before sending the response.
    delete expense.dataValues.createdAt;
    delete expense.dataValues.updatedAt;
    delete expense.dataValues.userId;

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.deleteExpense = async (req, res, next) => {
  try {
    const expenses = await req.user.getExpenses({
      where: { id: req.params.expenseId },
    });

    await req.user.decrement("totalExpenses", { by: expenses[0].amount });

    await expenses[0].destroy();

    res.status(200).json("Expense has been deleted");
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
