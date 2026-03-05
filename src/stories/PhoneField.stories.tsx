import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PhoneField } from '../components/PhoneField'

type ExtendedArgs = React.ComponentProps<typeof PhoneField> & {
  withDescription: boolean
  withError: boolean
}

const meta: Meta<ExtendedArgs> = {
  title: 'Components/PhoneField',
  component: PhoneField,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    withDescription: { control: 'boolean' },
    withError: { control: 'boolean' },
    description: { table: { disable: true } },
    errorMessage: { table: { disable: true } },
    isInvalid: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<ExtendedArgs>

export const Default: Story = {
  args: {
    label: 'Phone number',
    withDescription: false,
    withError: false,
  },
  render: ({ withDescription, withError, ...args }) => (
    <PhoneField
      {...args}
      description={withDescription ? 'Include your country code.' : undefined}
      isInvalid={withError || undefined}
      errorMessage={withError ? 'Please enter a valid phone number.' : undefined}
    />
  ),
}
