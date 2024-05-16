import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    admission: z.string({
      required_error: 'Admission is required',
    }),
    roll: z.string({
      required_error: 'Roll No is required',
    }),
    roll: z.string({
      required_error: 'Roll No is required',
    }),
    month: z
      .string({
        required_error: 'Month is required',
      })
      .optional(),
    year: z
      .string({
        required_error: 'Year is required',
      })
      .optional(),
    exam: z
      .string({
        required_error: 'Exam is required',
      })
      .optional(),
    fees: z
      .string({
        required_error: 'Fees is required',
      })
      .optional(),
    entryDate: z.string({
      required_error: 'Date is required',
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

export const FeesManagementValidation = {
  create,
  update,
};
