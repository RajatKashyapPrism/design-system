import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'hyperlink', 'underlined', 'neutral'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size variant',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    isHovered: {
      control: 'boolean',
      description: 'Control hover state',
    },
    isPressed: {
      control: 'boolean',
      description: 'Control pressed state',
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
    label1: {
      control: 'boolean',
      description: 'Show/hide the label',
    },
    leadingIcon: {
      control: 'boolean',
      description: 'Show/hide the leading icon',
    },
    trailingIcon: {
      control: 'boolean',
      description: 'Show/hide the trailing icon',
    },
    split: {
      control: 'boolean',
      description: 'Show/hide the split separator',
    },
    onBackground: {
      control: 'boolean',
      description: 'Adjust styling for background overlay',
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
    label: 'Button',
    variant: 'primary',
    size: 'md',
    leadingIcon: true,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'md',
    leadingIcon: true,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Button',
    variant: 'tertiary',
    size: 'md',
    leadingIcon: true,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Hyperlink: Story = {
  args: {
    label: 'Button',
    variant: 'hyperlink',
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Underlined: Story = {
  args: {
    label: 'Button',
    variant: 'underlined',
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Neutral: Story = {
  args: {
    label: 'Button',
    variant: 'neutral',
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const WithSplit: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    leadingIcon: true,
    trailingIcon: true,
    split: true,
    label1: true,
    theme: 'oyo',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    isDisabled: true,
    leadingIcon: true,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Hovered: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    isHovered: true,
    leadingIcon: true,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Pressed: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    isPressed: true,
    leadingIcon: true,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};


