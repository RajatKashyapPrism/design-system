import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'link', 'underlined'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size variant',
    },
    children: {
      control: 'text',
    },
    showLeadingIcon: {
      control: 'boolean',
      description: 'Show/hide the leading icon',
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Show/hide the trailing icon',
    },
    theme: {
      control: 'select',
      options: ['oyo', 'belvilla', 'checkin', 'dancenter', 'motel-6', 'studio-6'],
      description: 'Brand theme to apply',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    showLeadingIcon: true,
    showTrailingIcon: false,
    theme: 'oyo',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
    showLeadingIcon: true,
    showTrailingIcon: false,
    theme: 'oyo',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'md',
    showLeadingIcon: true,
    showTrailingIcon: false,
    theme: 'oyo',
  },
};

export const Link: Story = {
  args: {
    children: 'Button',
    variant: 'link',
    size: 'md',
    showLeadingIcon: false,
    showTrailingIcon: false,
    theme: 'oyo',
  },
};

export const Underlined: Story = {
  args: {
    children: 'Button',
    variant: 'underlined',
    size: 'md',
    showLeadingIcon: false,
    showTrailingIcon: false,
    theme: 'oyo',
  },
};


