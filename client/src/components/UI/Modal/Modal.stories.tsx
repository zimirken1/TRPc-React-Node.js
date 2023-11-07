import Modal from './Modal';
import './Modal.module.scss';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
    component: Modal,
    title: 'UI/Modal',
    tags: ['autodocs'],
    argTypes: {
        show: {
            type: 'boolean',
            control: {type: 'radio'},
            options: [true, false],
            defaultValue: false,
            description: 'Specify whether the Modal is currently open'
        },
        onClose: {
            type: 'function',
            description: 'Optionally provide a handler that is called whenever modal is closed'
        },
        children: {
            description: 'Provide the contents of your Modal'
        },
    },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
} satisfies Story;
