/* eslint-disable no-unused-vars */
import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import api from "../api";

const Sidebar = () => {
  const [user, setUser] = useState({});
  const nav = useNavigate();
  let location = useLocation();
  const [modal2Open, setModal2Open] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const to = (address) => {
    setOpen(false);
    nav(`/${address}`);
  };

  const getProfile = () => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    api.get("/auth/logout").then((res) => {
      nav("/login", { state: "logout" });
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div
      className={`${
        location.pathname === "/register" ||
        location.pathname === "/login" ||
        location.pathname === "*"
          ? "hideButton"
          : ""
      }`}
    >
      <Menu
        right
        isOpen={isOpen}
        onOpen={() => setOpen(!isOpen)}
        onClose={() => setOpen(!isOpen)}
      >
        {user?.is_admin === 1 && (
          <div onClick={() => to("admin/products")} className="menu-item">
            Admin Panel
          </div>
        )}
        <div onClick={() => to("products")} className="menu-item">
          Products
        </div>
        <div onClick={() => to("recommendations")} className="menu-item">
          Recommendations
        </div>

        {!user?.name ? (
          <li>
            <div onClick={() => to("login")} className="menu-item">
              Login
            </div>
          </li>
        ) : (
          <li>
            <div
              onClick={() => {
                setModal2Open(true);
                setOpen(false);
              }}
              className="menu-item"
            >
              Logout
            </div>
          </li>
        )}
        <Modal
          title="Confirmation"
          centered
          open={modal2Open}
          okText={"Log out"}
          onOk={logout}
          onCancel={() => setModal2Open(false)}
        >
          <div>Are you sure you want to log out?</div>
        </Modal>
      </Menu>
    </div>
  );
};

export default Sidebar;
