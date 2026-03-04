import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

// Wrapper component that manages interaction states internally
function InteractiveButton(props: React.ComponentProps<typeof Button>) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <Button {...props} isHovered={isHovered} isPressed={isPressed} />
    </div>
  );
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      table: { disable: true }, // Hide variant from controls since we have separate stories
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
  render: (args) => <InteractiveButton {...args} />,
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Secondary: Story = {
  render: (args) => <InteractiveButton {...args} />,
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Tertiary: Story = {
  render: (args) => <InteractiveButton {...args} />,
  args: {
    label: 'Button',
    variant: 'tertiary',
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
    label1: true,
    theme: 'oyo',
  },
};

export const Hyperlink: Story = {
  render: (args) => <InteractiveButton {...args} />,
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
  render: (args) => <InteractiveButton {...args} />,
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
  render: (args) => <InteractiveButton {...args} />,
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


