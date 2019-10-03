import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Icon, Button  } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './Index.css'
import logo from '../static/img/logo.png'
import marca from '../static/img/Sin.png'
import brandname from '../static/img/ludiclass.png'

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Index extends React.Component {
    state = {
        login: true
    }

    changeContent = () => {
        this.setState({login: !this.state.login})
    }
  render(){
    return(
            <div className='bg-container'>
                <Row justify="space-between">
                    <Col xs={7} sm={8} md={8} lg={7} xl={5}>
                        <img src={logo} className='logo'/>
                    </Col>
                    
                    <Col xs={17} sm={16} md={16} lg={8} xl={11}>
                        <Row className='message-container '>
                            <img src={brandname} className='brand'/>
                        </Row>
                        <Row>
                            <h1 className='welcome-message'>La aplicación que te ayuda a planear clases más divertidas</h1>
                        </Row>

                    </Col>

                    <Col xs={24} sm={24} md={24} lg={9} xl={8}>
                        <div className='login-container'>
                                <h1 className='login-title'>
                                    { this.state.login ? 'Iniciar sesión' : 'Registrarse' }
                                </h1>
                                
                                {this.state.login ? <LoginForm/> : <RegisterForm/>}
                                
                                <div style={{display: 'flex', flexDirection: 'row', paddingTop: '20px'}}>
                                    <p>{ this.state.login ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?' } </p>
                                    <Button 
                                        type="link" 
                                        onClick={this.changeContent} 
                                        size='small'
                                        style={{color:'#531dab', fontWeight:'bold'}}
                                    >
                                        { this.state.login ? 'Regístrate aquí' : 'Inicia sesión' }
                                    </Button>
                                </div>
                        </div>
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={24} lg={3} xl={24}>
                        <h2>Conoce más acerca de LudiClass </h2>
                    </Col>
                </Row>
                
                <Row type="flex" justify="center">
                    <Col xs={12} sm={12} md={12} lg={10} xl={9}>
                        <h3>Síguenos en nuestras redes sociales: </h3>
                    </Col>
                </Row>
                
                <Row type="flex" gutter={20} justify="center">
                    <Col xs={3} sm={3} md={2} lg={1} xl={1}>
                        <a href='https://www.facebook.com/121172999280716/'>
                            <Icon type="facebook" style={{ fontSize: '28px', color: '#531dab' }}/>
                        </a>
                    </Col>
                    <Col xs={3} sm={3} md={2} lg={1} xl={1}>
                        <a href='https://www.instagram.com/ludiclass/'>
                            <Icon type="instagram" style={{ fontSize: '28px', color: '#531dab' }}/>
                        </a>
                    </Col>
                </Row>
            </div>
            
  );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));