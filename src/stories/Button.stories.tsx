import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'hyperlink', 'underlined', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    isDisabled: { control: 'boolean' },
    label: { control: 'text' },
    label1: { control: 'boolean', description: 'Show/hide the label' },
    leadingIcon: { control: 'boolean' },
    trailingIcon: { control: 'boolean' },
    split: { control: 'boolean' },
    onBackground: { control: 'boolean', description: 'Inverted style for use on brand-colored backgrounds' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { label: 'Button', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { label: 'Button', variant: 'secondary', size: 'md' },
}

export const Tertiary: Story = {
  args: { label: 'Button', variant: 'tertiary', size: 'md' },
}

export const Hyperlink: Story = {
  args: { label: 'Button', variant: 'hyperlink', size: 'md' },
}

export const Underlined: Story = {
  args: { label: 'Button', variant: 'underlined', size: 'md' },
}

export const Neutral: Story = {
  args: { label: 'Button', variant: 'neutral', size: 'md' },
}
