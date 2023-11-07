import Input from './Input';
import './Input.module.scss';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
    component: Input,
    title: 'UI/Input',
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'Specify the value of the input',
            type: 'string',
            control: 'text',
        },
        onChange: {
            type: 'function',
            description: 'Optionally provide an onChange handler that is called whenever input is updated'
        },
        onBlur: {
            type: 'function',
            description: 'Optionally provide an onBlur handler that is called whenever input is out of focus'
        },
        type:{
            type: 'string',
            description: 'Specify the type of the input'
        },
        placeholder: {
            description: 'Specify the placeholder attribute for the input',
            type: 'string',
            control: 'text',
        },
        className: {
            description: 'Specify an optional className to be applied to the input node',
            type: 'string',
            control: 'text',
        },
        disabled: {
            description: 'Specify whether the input should be disabled',
            type: 'boolean',
            control: {type: 'radio'},
            options: [true, false],
            defaultValue: false
        },
    },
} as Meta;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'default',
        type: 'text'
    },
} satisfies Story;

export const Disabled: Story = {
    args: {
        placeholder: 'disabled',
        type: 'text',
        disabled: true
    },
} satisfies Story;
