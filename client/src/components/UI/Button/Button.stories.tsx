import Button from './Button';
import './Button.module.scss';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'UI/Button',
    tags: ['autodocs'],
    argTypes: {
        text: {
            type: 'string',
            control: 'text',
            description: 'Text for button',
        },
        type: {
            type: 'string',
            options: ['button', 'submit', 'reset'],
            control: { type: 'radio' },
            description: 'The type of button matching the HTML "type" attribute on the  tag',
            defaultValue: 'button',
        },
        onClick: {
            type: 'function',
            description: 'The function that is called when the button is "clicked" via cursor, touch, or keyboard'
        },
        className: {
            type: 'string',
            control: {type: 'text'},
            description: 'Specify an optional className to be added to your Button'
        },
        disabled: {
            type: 'boolean',
            control: {type: 'radio'},
            options: [true, false],
            description: 'Specify whether the Button should be disabled, or not',
            defaultValue: false,
        },
    },
} as Meta;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        text: 'Primary',
    },
} satisfies Story;

export const Disabled: Story = {
    args: {
        text: 'Disabled',
        disabled: true
    }
} satisfies Story;
