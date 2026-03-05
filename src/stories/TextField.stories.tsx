import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from '../components/TextField'

type ExtendedArgs = React.ComponentProps<typeof TextField> & {
  withDescription: boolean
  withError: boolean
}

const meta: Meta<ExtendedArgs> = {
  title: 'Components/TextField',
  component: TextField,
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
    label: 'Email address',
    withDescription: false,
    withError: false,
  },
  render: ({ withDescription, withError, ...args }) => (
    <TextField
      {...args}
      description={withDescription ? 'We will never share your email.' : undefined}
      isInvalid={withError || undefined}
      errorMessage={withError ? 'Please enter a valid email address.' : undefined}
    />
  ),
}
