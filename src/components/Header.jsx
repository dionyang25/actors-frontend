import React, { PureComponent } from 'react';
import { Balloon, Icon,Feedback } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from './../menuConfig';
import Logo from './Logo';
import DataBinder from "@icedesign/data-binder/lib/index";
import {userCheckBinderConfig,userLogoutBinderConfig} from "../config/dataBinderConfig";
import { withRouter } from 'react-router'

@DataBinder({
    userCheckBinder: userCheckBinderConfig,
    userLogoutBinder: userLogoutBinderConfig
})
@withRouter
export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username:''
        };
    }


  componentWillMount(){
      //判断是否登陆如未登陆 跳转登陆界面
      let me = this
      this.props.updateBindingData('userCheckBinder', {},function () {
          const { userCheckBinder } = me.props.bindingData
          if(userCheckBinder.error == 0){
              me.setState({username:userCheckBinder.content.username})
          }else{
              me.props.history.push('/')
          }
      })
  }

  logout = (e) => {
      console.log('aa',e)
      e.preventDefault();
      //请求登出
      let me = this
      this.props.updateBindingData('userLogoutBinder', {},function () {
          const { userLogoutBinder } = me.props.bindingData
          if(userLogoutBinder.error == 0){
              Feedback.toast.success('退出成功')
              me.props.history.push('/')
          }else{
              Feedback.toast.error(userLogoutBinder.msg)
          }
      })
  }

  render() {
    const { width, theme, isMobile, className, style } = this.props;

    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                      {this.state.username}
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px', color: '#999' }}
                  >
                    看球后台
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/">
                  <FoundationSymbol type="person" size="small" />我的主页
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/">
                  <FoundationSymbol type="repair" size="small" />设置
                </Link>
              </li>
              <li className="user-profile-menu-item" onClick={this.logout} >
                  <FoundationSymbol type="compass" size="small" />退出
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
