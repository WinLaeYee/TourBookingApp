import React, { useContext, useRef, useState, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';

const nav__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/tours',
    display: 'Tours',
  },
 /*  {
    path: '/booking',
    display: 'Booked',
  }, */
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu');
  };

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                <ul className="menu d-flex align-items-center gap-5">
                  {nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? 'active__link' : ''
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}

                  {/* Conditional rendering based on user role */}
                  {user && user.role === 'admin' && (
                    <>
                      <li className="nav__item">
                        <NavLink to="/createTour">Create</NavLink>
                      </li>
                      <li className="nav__item">
                        <NavLink to="/booking">Bookings</NavLink>
                      </li>
                    </>
                  )}

                  {user && user.role === 'user' && (
                    <li className="nav__item">
                      <NavLink to="/my-bookings">My Bookings</NavLink>
                    </li>
                  )}
                </ul>
              </div>
              <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                  {user ? (
                    <>
                      <h5 className="mb-0">{user.username}</h5>
                      <Button className="btn btn-dark" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
                <span className="mobile__menu" onClick={toggleMenu}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;