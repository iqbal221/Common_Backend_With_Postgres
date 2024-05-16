import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is required' }),
    role: z.string({
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z
      .object({
        firstName: z.string({
          required_error: 'first Name is required',
        }),
        middleName: z.string({
          required_error: 'middle Name is required',
        }),
        lastName: z.string({
          required_error: 'last Name is required',
        }),
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .optional(),
    dateOfBirth: z
      .string({
        required_error: 'Date Of Birth is required',
      })
      .optional(),
    gender: z
      .string({
        required_error: 'Gender is required',
      })
      .optional(),
    bloodGroup: z
      .string({
        required_error: 'Blood Group is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact No is required',
      })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency Contact No is required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present Address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent Address is required',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'Designation is required',
      })
      .optional(),
    profileImage: z
      .string({
        required_error: 'Profile Image is required',
      })
      .optional(),
  }),
});

// const updateUser = z.object({
//   body: z.object({
//     password: z.string().optional(),
//     firstName: z.string().optional(),
//     lastName: z.string().optional(),
//     dateOfBirth: z.string().optional(),
//     gender: z.string().optional(),
//     email: z.string().email().optional(),
//     contactNo: z.string().optional(),
//     emergencyContactNo: z.string().optional(),
//     presentAddress: z.string().optional(),
//     permanentAddress: z.string().optional(),
//   }),
// });

export const UserValidation = {
  createUser,
  // updateUser,
};
