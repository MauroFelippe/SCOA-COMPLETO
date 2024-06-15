import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ label, path }) => (
    <li>
        <Link to={path}>{label}</Link>
    </li>
);

export default MenuItem;