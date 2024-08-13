import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Sellers = () => {

    return (
        <div className="mt-5">
        <nav className="navigation">
          <ul className="form-label">
            <table>
                <tr>
                    <li><Link to ="/newProduct">Create a product</Link></li>
                </tr>
                <tr>
                    <li><Link to ="/manageProducts">Manage Products</Link></li>
                </tr>
                <tr>
                    <li><Link to ="/newCategory">Create a category</Link></li>
                </tr>
                <tr>
                    <li><Link to ="/listCategories">List Categories</Link></li>
                </tr>       
            </table>
          </ul>
        </nav>
        </div>
    );
  };
  
  export default Sellers;