import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useAuthentication } from '../../../hooks';

import { generateSignInForm } from '../models';

import { signInService } from '../services';

import '../style/authentication.css';

const AppSignInPage = () => {
    const [ form ] = Form.useForm();
    const [ isLoading, setIsLoading ] = useState(false);

    const { setToken } = useAuthentication();

    const navigate = useNavigate();

    const onSignIn = async (value: any) => {
        try {
            setIsLoading(true);

            const { data } = await signInService(generateSignInForm(value));

            if (value) {
                setIsLoading(false);

                setToken(data.value.token);

                navigate(`/job`, { replace: true });
            }

        } catch (err) {
            console.log(err, 'ini ini')
        }
    }

    return (
        <div className="authenticationContainer">
            <div className="authenticationWrapper">
                <p>Please sign-in with your given personal information</p>
                <Form
                    form={form}
                    onFinish={onSignIn}
                    layout="vertical"
                    autoComplete="off"
                    scrollToFirstError={{ behavior: 'smooth' }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[ { required: true, message: 'Please input your NPP / Email' } ]}
                        hasFeedback
                    >
                        <Input
                            placeholder="Username"
                            disabled={isLoading}
                            bordered={false}
                            prefix={<UserOutlined/>}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[ { required: true, message: 'Please input your password' } ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Password"
                            disabled={isLoading}
                            bordered={false}
                            prefix={<LockOutlined/>}
                        />
                    </Form.Item>

                    <Form.Item className="authenticationSubmitButton">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            disabled={isLoading}
                            block
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};

export default AppSignInPage;
