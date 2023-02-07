import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

interface InputTextInterface {
    label: string;
    inputName: string;
    disabled?: boolean;
    rules?: Rule[];
}

export const AppInputTextComponent = ({ label, inputName, disabled, rules }: InputTextInterface) => {
    // type = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email'

    return (
        <Form.Item
            label={label}
            name={inputName}
            rules={rules}
            hasFeedback
        >
            <Input
                placeholder={label}
                disabled={disabled}
            />
        </Form.Item>
    );
}
