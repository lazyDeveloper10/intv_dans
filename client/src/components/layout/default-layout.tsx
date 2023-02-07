import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

export const AppDefaultLayout = () => {
    return (
        <Layout className="layout">
            <Header style={{ width: '100%', top: 0, position: 'sticky', zIndex: 1, backgroundColor: '#3C80C2' }}>
                <h1 style={{ fontSize: 'x-large', fontWeight: 700, color: 'white' }}>
                    GitHub
                    <span style={{ marginLeft: '15px', fontWeight: 'normal' }}>Jobs</span>
                </h1>
            </Header>

            <Content className="site-layout" style={{ minHeight: '100vh', padding: '20px 50px' }}>
                <Outlet/>
            </Content>
        </Layout>
    )
}
