import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
  
const Sellers = () => {
    return (        
        <div className="list-group" >
        <nav className="navigation">
            <table className="mt-2 mb-5">
                <tr>
                    <Link to ="/newProduct" className="list-group-item list-group-item-action">Create a product</Link>
                </tr>
                <tr>
                    <Link to ="/manageProducts" className="list-group-item list-group-item-action">Manage Products</Link>
                </tr>
                <tr>
                    <Link to ="/newCategory" className="list-group-item list-group-item-action">Create a category</Link>
                </tr>
                <tr>
                    <Link to ="/listCategories" className="list-group-item list-group-item-action">List Categories</Link>
                </tr>
            </table>
        </nav>
        </div>
    );
  };
  
  export default Sellers;