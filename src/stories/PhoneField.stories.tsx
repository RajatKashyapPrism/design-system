import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PhoneField, type PhoneChangeData } from '../components/PhoneField'

const meta: Meta<typeof PhoneField> = {
  title: 'Components/PhoneField',
  component: PhoneField,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    defaultCountry: {
      control: 'select',
      options: ['IN', 'US', 'GB', 'AU', 'AE', 'SG', 'DE', 'FR', 'BR', 'JP'],
    },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PhoneField>

export const Default: Story = {
  args: {
    label: 'Phone number',
    defaultCountry: 'IN',
    size: 'md',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Mobile number',
    description: "We'll send your booking confirmation to this number.",
    defaultCountry: 'IN',
    size: 'md',
  },
}

export const USDefault: Story = {
  args: {
    label: 'Phone number',
    defaultCountry: 'US',
    size: 'md',
  },
}

export const UKDefault: Story = {
  args: {
    label: 'Phone number',
    defaultCountry: 'GB',
    size: 'md',
  },
}

export const UAEDefault: Story = {
  args: {
    label: 'Phone number',
    defaultCountry: 'AE',
    size: 'md',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Phone number',
    defaultCountry: 'IN',
    isDisabled: true,
    size: 'md',
  },
}

export const Required: Story = {
  args: {
    label: 'Mobile number',
    defaultCountry: 'IN',
    isRequired: true,
    description: 'Required for OTP verification.',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    label: 'Phone number',
    defaultCountry: 'IN',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Phone number',
    defaultCountry: 'IN',
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '420px' }}>
      <PhoneField label="Small" defaultCountry="IN" size="sm" />
      <PhoneField label="Medium" defaultCountry="IN" size="md" />
      <PhoneField label="Large" defaultCountry="IN" size="lg" />
    </div>
  ),
}

// Interactive story that shows the parsed output
export const WithChangeCallback: Story = {
  render: () => {
    const [data, setData] = useState<PhoneChangeData | null>(null)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
        <PhoneField
          label="Phone number"
          defaultCountry="IN"
          size="md"
          description="Type a number to see parsed output below."
          onChange={setData}
        />
        {data && (
          <div
            style={{
              background: 'var(--colour-background-subtle-neutral-3, #f3f4f6)',
              borderRadius: '8px',
              padding: '12px 16px',
              fontFamily: 'monospace',
              fontSize: '12px',
              lineHeight: '1.8',
              color: 'var(--colour-text-intense-neutral, #1a1a2e)',
            }}
          >
            <div><strong>formatted:</strong> {data.formattedValue || '—'}</div>
            <div><strong>country: </strong> {data.countryCode}</div>
            <div><strong>dialCode:</strong> {data.dialCode}</div>
            <div><strong>e164:    </strong> {data.e164 || '—'}</div>
            <div>
              <strong>valid:   </strong>{' '}
              <span style={{ color: data.isValid ? 'var(--colour-text-intense-positive, #059669)' : 'var(--colour-text-intense-negative, #dc2626)' }}>
                {data.isValid ? '✓ valid' : '✗ invalid'}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  },
}
