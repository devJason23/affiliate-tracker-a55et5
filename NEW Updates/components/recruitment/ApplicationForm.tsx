'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const applicationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  experience: z.enum(['none', 'some', 'experienced']),
  referralCode: z.string().optional(),
  marketingChannels: z.array(z.string()).min(1, 'Select at least one channel'),
  aboutYou: z.string().min(50, 'Tell us more about yourself (min 50 characters)'),
  goals: z.string().min(30, 'Please describe your goals'),
})

type ApplicationData = z.infer<typeof applicationSchema>

export default function ApplicationForm({ onSubmit }: { 
  onSubmit: (data: ApplicationData) => void 
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register('firstName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register('lastName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Add other form fields here */}
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Application
        </button>
      </div>
    </form>
  )
}
