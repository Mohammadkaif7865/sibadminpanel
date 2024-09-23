import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Middleware
import AuthGuard from './AuthGuard'

import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import ServiceManage from './components/service/Manage';
import ServiceAdd from './components/service/Add';
import ServiceEdit from './components/service/Edit';

import CategoryManage from './components/category/Manage';
import CategoryAdd from './components/category/Add';
import CategoryEdit from './components/category/Edit';

import BlogManage from './components/blog/Manage';
import BlogAdd from './components/blog/Add';
import BlogEdit from './components/blog/Edit';

import EnquiryManage from './components/enquiry/Manage';

import CareerManage from './components/career/Manage';
import CareerView from './components/career/View';

import UserManage from './components/user/Manage';
import UserAdd from './components/user/Add';
import UserEdit from './components/user/Edit';

import { Route, Routes, useLocation } from "react-router-dom";





function App(props) {

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div>
        <ToastContainer position="bottom-center" limit={1} />
        <Routes>
          <Route path = "/" element = { <Login /> }/>
       

          <Route path= "/dashboard" element={ <AuthGuard componentName="Dashboard" component={<Dashboard />} />} />

          <Route path = "/service" element = { <AuthGuard componentName="ServiceManage" component={<ServiceManage />} /> }/>
          <Route path = "/service/add" element = { <AuthGuard componentName="ServiceAdd" component={<ServiceAdd />} /> }/>
          <Route path = "/service/edit/:id" element = { <AuthGuard componentName="ServiceEdit" component={<ServiceEdit />} /> }/>

          <Route path = "/category" element = { <AuthGuard componentName="CategoryManage" component={<CategoryManage />} /> }/>
          <Route path = "/category/add" element = { <AuthGuard componentName="CategoryAdd" component={<CategoryAdd />} /> }/>
          <Route path = "/category/edit/:id" element = { <AuthGuard componentName="CategoryEdit" component={<CategoryEdit />} /> }/>

          <Route path = "/blog" element = { <AuthGuard componentName="BlogManage" component={<BlogManage />} /> }/>
          <Route path = "/blog/add" element = { <AuthGuard componentName="BlogAdd" component={<BlogAdd />} /> }/>
          <Route path = "/blog/edit/:id" element = { <AuthGuard componentName="BlogEdit" component={<BlogEdit />} /> }/>

          <Route path = "/enquiry" element = { <AuthGuard componentName="EnquiryManage" component={<EnquiryManage />} /> }/>

          <Route path = "/career" element = { <AuthGuard componentName="CareerManage" component={<CareerManage />} /> }/>
          <Route path = "/career/view/:id" element = { <AuthGuard componentName="CareerView" component={<CareerView />} /> }/>

          <Route path = "/user" element = { <AuthGuard componentName="UserManage" component={<UserManage />} /> }/>
          <Route path = "/user/add" element = { <AuthGuard componentName="UserAdd" component={<UserAdd />} /> }/>
          <Route path = "/user/edit/:id" element = { <AuthGuard componentName="UserEdit" component={<UserEdit />} /> }/>

        </Routes>
    </div>
  );
}

export default App;
