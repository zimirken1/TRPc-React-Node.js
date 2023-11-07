import Loader from './Loader';
import './Loader.module.scss';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Loader> = {
    component: Loader,
    title: 'UI/Loader',
    tags: ['autodocs'],
    argTypes: {
        className: {
            description: 'Specify an optional className to be applied to the Loader',
            type: 'string',
            control: 'text',
        },
    },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {

    },
} satisfies Story;

