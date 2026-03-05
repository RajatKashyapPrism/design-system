import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from '../components/TextField'

// Sample SVG icons
const SearchIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const EmailIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 5.5L8 9.5L14 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const AlertIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.75" fill="currentColor" />
  </svg>
)

const CheckIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    isInvalid: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Enter your full name',
    size: 'md',
    variant: 'default',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    description: "We'll never share your email with anyone.",
    size: 'md',
  },
}

export const WithLeadingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search properties…',
    leadingIcon: <SearchIcon />,
    size: 'md',
  },
}

export const WithTrailingIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    trailingIcon: <EmailIcon />,
    size: 'md',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    isInvalid: true,
    errorMessage: 'Please enter a valid email address.',
    trailingIcon: <AlertIcon />,
    size: 'md',
    variant: 'error',
  },
}

export const SuccessState: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    description: 'Username is available.',
    trailingIcon: <CheckIcon />,
    size: 'md',
    variant: 'success',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Promo code',
    placeholder: 'No promo code applied',
    isDisabled: true,
    size: 'md',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Booking ID',
    value: 'BK-20240312-9871',
    isReadOnly: true,
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    label: 'City',
    placeholder: 'Enter city',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Destination',
    placeholder: 'Where would you like to go?',
    leadingIcon: <SearchIcon />,
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <TextField label="Small" placeholder="Small input" size="sm" />
      <TextField label="Medium" placeholder="Medium input" size="md" />
      <TextField label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <TextField
        label="Default"
        placeholder="Default state"
        description="Helper text goes here."
        size="md"
      />
      <TextField
        label="Error"
        placeholder="Error state"
        isInvalid
        errorMessage="Something went wrong."
        trailingIcon={<AlertIcon />}
        size="md"
        variant="error"
      />
      <TextField
        label="Success"
        placeholder="Success state"
        description="Looks good!"
        trailingIcon={<CheckIcon />}
        size="md"
        variant="success"
      />
      <TextField
        label="Disabled"
        placeholder="Disabled state"
        isDisabled
        size="md"
      />
    </div>
  ),
}
