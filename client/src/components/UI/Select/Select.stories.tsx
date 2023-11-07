import Select from './Select';
import './Select.module.scss';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Select> = {
    component: Select,
    title: 'UI/Select',
    tags: ['autodocs'],
    argTypes: {
        options: {
            description: 'Specify the options of the select',
        },
        value: {
            description: 'Specify the value of the select',
            type: 'string',
            control: 'text',
        },
        onChange: {
            type: 'function',
            description:
                'Optionally provide an onChange handler that is called whenever select is updated',
        },
        placeholder: {
            description: 'Specify the placeholder attribute for the input',
            type: 'string',
            control: 'text',
        },
        className: {
            description:
                'Specify an optional className to be applied to the Select',
            type: 'string',
            control: 'text',
        },
        disabled: {
            description: 'Specify whether the Select should be disabled',
            type: 'boolean',
            control: { type: 'radio' },
            options: [true, false],
            defaultValue: false,
        },
    },
} satisfies Meta<typeof Select>;

export default meta;

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'default',
        options: options,
    },
} satisfies Story;

export const Disabled: Story = {
    args: {
        placeholder: 'disabled',
        options: options,
        disabled: true,
    },
} satisfies Story;