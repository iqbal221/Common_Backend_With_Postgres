import { z } from 'zod';

const create = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  price: z.number({
    required_error: 'Price is required',
  }),
  category: z.string({
    required_error: 'category is required',
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

export const NewArrivalProductValidation = {
  create,
  update,
};
