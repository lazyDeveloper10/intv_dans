import { Checkbox, Form } from 'antd';

interface InputTextInterface {
    label: string;
    inputName: string;
}

export const AppCheckboxComponent = ({ label, inputName }: InputTextInterface) => {
    // type = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email'

    return (
        <Form.Item
            name={inputName}
            valuePropName="checked"
            wrapperCol={{ offset: 0, span: 16 }}
        >
            <Checkbox>{label}</Checkbox>
        </Form.Item>
    );
}
