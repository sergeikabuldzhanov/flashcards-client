import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./Dashboard.module.css";
import decode from "jwt-decode";
import Home from "../../components/Home/Home";

import {Layout, Menu, Icon, Button} from "antd";

const {Sider, Content} = Layout;
let current = "Home";
let page;

const Dashboard = props => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const token = localStorage.getItem("token");

  if (token !== null) {
    const decoded = decode(token);
    var userName = decoded.name;
  }

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  function logout() {
    localStorage.clear();
  }

  return (
    <div>
      <Layout className={styles.dashboard}>
        <div
          className={
            state.collapsed ? styles.dashboardLeftCollapsed : styles.dashboardLeft
          }
        >
          <Sider
            className={state.collapsed ? styles.siderCollapsed : styles.sider}
            trigger={null}
            collapsible
            collapsed={state.collapsed}
          >
            <div
              className={
                state.collapsed ? styles.logoAndCollapseCollapsed : styles.logoAndCollapse
              }
            >
              <Link to="/">
                <img
                  src="https://i.imgur.com/tuS7kwh.png"
                  alt="logo"
                  className={state.collapsed ? styles.logoCollapsed : styles.logo}
                  data-testid="logo"
                />
              </Link>
              <Icon
                className="trigger"
                type={state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={toggle}
                style={{fontSize: "24px"}}
                data-testid="toggle-icon"
              />
            </div>
            <h3
              className={styles.greeting}
              style={state.collapsed ? {display: "none"} : null}
            >
              Welcome, {userName}!
            </h3>

            <Menu
              className={state.collapsed ? styles.menuCollapsed : styles.menu}
              theme="light"
              mode="inline"
              defaultSelectedKeys={[page]}
              data-testid="menu"
            >
              <Menu.Item key="1">
                <Link to="/">
                  <Icon type="home" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" selected={true}>
                <Link to="/deck-library">
                  <Icon type="block" />
                  <span>Deck Library</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/discover-decks">
                  <Icon type="global" />
                  <span>Discover Decks</span>
                </Link>
              </Menu.Item>
            </Menu>
            <footer
              className={styles.footer}
              style={state.collapsed ? {display: "none"} : null}
              data-testid="footer"
            >
              <Link to="/login">
                <Button
                  onClick={() => logout()}
                  type="primary"
                  className={styles.logoutButton}
                  data-testid="logout-button"
                >
                  Logout
                </Button>
              </Link>
              <p>
                <Icon type="setting" /> Profile Settings
              </p>
            </footer>
          </Sider>
        </div>
        <Layout>
          <Content className={state.collapsed ? styles.contentCollapsed : styles.content}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
