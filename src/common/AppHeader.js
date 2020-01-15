import React, { Component } from "react";
import "./AppHeader.css";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Dropdown, Icon } from "antd";

const Header = Layout.Header;
const { SubMenu } = Menu;

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.handlMenuClick = this.handlMenuClick.bind(this);
  }

  handlMenuClick({ key }) {
    if (key === "logout") {
      this.props.onLogout();
    }
  }

  render() {
    let menuItems;

    if (this.props.currentUser) {
      menuItems = [
        <Menu.Item key="/">
          <Link to="/">
            <span>
              <Icon type="home" className="nav-icon" />
              <span>Home</span>
            </span>
          </Link>
        </Menu.Item>,
        <SubMenu
          key="gallery"
          title={
            <span>
              <Icon type="picture" />
              <span>Gallery </span>
              <span>
                <Icon type="down" />
              </span>
            </span>
          }
          className="gallery-menu"
        >
          {this.props.navs.map(nav => (
            <Menu.Item key={nav.id}>
              <Link to={`/gallery/${nav.category}`}>{nav.category}</Link>
            </Menu.Item>
          ))}
        </SubMenu>,
        <Menu.Item key="profile" className="profile-menu">
          <ProfileDropDownMenu
            currentUser={this.props.currentUser}
            handlMenuClick={this.handlMenuClick}
          />
        </Menu.Item>
      ];
    } else {
      menuItems = [
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>,
        <Menu.Item key="/signup">
          <Link to="/signup">Signup</Link>
        </Menu.Item>
      ];
    }
    return (
      <Header className="app-header">
        <div className="container">
          <div className="app-title">
            <Link to="/">des Lauriers World</Link>
          </div>
        </div>
        <div>
          <Menu
            className="app-menu"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: "64px" }}
            theme="dark"
          >
            {menuItems}
          </Menu>
        </div>
      </Header>
    );
  }
}

function ProfileDropDownMenu(props) {
  const dropdownMenu = (
    <Menu
      onClick={props.handlMenuClick}
      className="profile-dropdown-menu"
      theme="dark"
    >
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.firstname} {props.currentUser.lastname}
        </div>
        <div className="username-info">@{props.currentUser.username}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={["click"]}
      getPopupContainer={() =>
        document.getElementsByClassName("profile-menu")[0]
      }
    >
      <a className="ant-dropdown-link">
        <span>
          <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} />
        </span>
        <span> User </span>
        <span>
          <Icon type="down" />
        </span>
      </a>
    </Dropdown>
  );
}

export default withRouter(AppHeader);
