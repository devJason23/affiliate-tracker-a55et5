'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

  const [marketingChannels, setMarketingChannels] = useState<string[]>([])

  const toggleChannel = (channel: string) => {
    setMarketingChannels(prev => 
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    )
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company (Optional)
          </label>
          <input
            type="text"
            {...register('company')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website (Optional)
          </label>
          <input
            type="url"
            {...register('website')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Marketing Experience
        </label>
        <select
          {...register('experience')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="none">No Experience</option>
          <option value="some">Some Experience</option>
          <option value="experienced">Experienced Marketer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Referral Code (Optional)
        </label>
        <input
          type="text"
          {...register('referralCode')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Marketing Channels
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'Social Media',
            'Email Marketing',
            'Content Marketing',
            'Paid Advertising',
            'SEO',
            'Other'
          ].map(channel => (
            <label key={channel} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={marketingChannels.includes(channel)}
                onChange={() => toggleChannel(channel)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">{channel}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tell Us About Yourself
        </label>
        <textarea
          {...register('aboutYou')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.aboutYou && (
          <p className="mt-1 text-sm text-red-600">{errors.aboutYou.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Goals with Our Program
        </label>
        <textarea
          {...register('goals')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.goals && (
          <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
        )}
      </div>

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
