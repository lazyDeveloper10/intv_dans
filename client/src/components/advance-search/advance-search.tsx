import { useState } from 'react';
import { Button, Col, Form, Row } from 'antd';

import { AppInputTextComponent } from '../input/input-text';
import { AppCheckboxComponent } from '../checkbox/checkbox';

export const AppAdvanceSearch = ({ onSearch }: any) => {
    const [ form ] = Form.useForm();

    const [ isSearching, setIsSearching ] = useState(false);

    const onSubmit = (value: any) => {
        onSearch(value);
    }

    return (
        <>
            <Form
                form={form}
                // initialValues={initialValue}
                onFinish={onSubmit}
                layout="vertical"
                autoComplete="off"
                scrollToFirstError={{ behavior: 'smooth' }}
            >
                <Row gutter={[ 16, 16 ]} justify="space-between" align="bottom">
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <AppInputTextComponent
                            label="Job Description"
                            inputName="description"
                        />
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <AppInputTextComponent
                            label="Location"
                            inputName="location"
                        />
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={4}>
                        <AppCheckboxComponent
                            label="Full Time Only"
                            inputName="full_time"
                        />
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={4}>
                        <Form.Item className="authenticationSubmitButton">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSearching}
                                disabled={isSearching}
                            >
                                Search
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
};
