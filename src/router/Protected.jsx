import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function Protected() {
    const isLoggedIn = Boolean(localStorage.getItem('login'));
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    );
}
