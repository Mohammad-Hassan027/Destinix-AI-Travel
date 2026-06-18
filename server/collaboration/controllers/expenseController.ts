import { Response } from "express";
import { ExpenseService } from "../services/expenseService";

export class ExpenseController {
  static async addExpense(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const { title, amount } = req.body;
      const paidBy = req.user.id;

      const expense = await ExpenseService.addExpense(groupId, title, Number(amount), paidBy);

      if (req.io) {
        req.io.to(groupId).emit("expense:created", expense);
      }

      return res.status(201).json(expense);
    } catch (error: any) {
      console.error("Add expense error:", error);
      return res.status(500).json({ error: error.message || "Failed to add expense" });
    }
  }

  static async listExpenses(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const expenses = await ExpenseService.listExpenses(groupId);
      return res.json(expenses);
    } catch (error: any) {
      console.error("List expenses error:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch expenses" });
    }
  }

  static async getExpenseSummary(req: any, res: Response) {
    try {
      const groupId = req.params.id;
      const summary = await ExpenseService.getExpenseSummary(groupId);
      return res.json(summary);
    } catch (error: any) {
      console.error("Get expense summary error:", error);
      return res.status(500).json({ error: error.message || "Failed to fetch expense summary" });
    }
  }
}
