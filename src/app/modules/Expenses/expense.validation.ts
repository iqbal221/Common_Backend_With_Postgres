import { z } from 'zod';

const create = z.object({
  body: z.object({
    serialNo: z.string({
      required_error: 'Serial No is required',
    }),
    entryDate: z.string({
      required_error: 'Entry Date is required',
    }),
    expenseHead: z.string({
      required_error: 'Expense Head is required',
    }),
    expenseType: z.string({
      required_error: 'Expense Type is required',
    }),
    amount: z.number({
      required_error: 'Amount is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const ExpenseValidation = {
  create,
  update,
};
