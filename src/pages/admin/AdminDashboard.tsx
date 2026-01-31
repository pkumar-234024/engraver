import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { addProduct, deleteProduct } from '../../features/products/productSlice';
import { addCategory, deleteCategory } from '../../features/categories/categorySlice';
import { Trash2, Package, Tag, PlusCircle, X } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const categories = useSelector((state: RootState) => state.categories.items);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageUrl: '',
    details: ''
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct({
      ...newProduct,
      id: Date.now().toString(),
      price: parseFloat(newProduct.price) || 0,
      categoryId: newProduct.categoryId || '1'
    }));
    setShowProductModal(false);
    setNewProduct({ name: '', description: '', price: '', categoryId: '', imageUrl: '', details: '' });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addCategory({
      ...newCategory,
      id: Date.now().toString()
    }));
    setShowCategoryModal(false);
    setNewCategory({ name: '', description: '' });
  };

  return (
    <div className="admin-page container">
      <div className="admin-sidebar glass-card">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <div className="sidebar-nav">
          <button 
            className={activeTab === 'products' ? 'active' : ''} 
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} /> Products
          </button>
          <button 
            className={activeTab === 'categories' ? 'active' : ''} 
            onClick={() => setActiveTab('categories')}
          >
            <Tag size={20} /> Categories
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h2>{activeTab === 'products' ? 'Manage Products' : 'Manage Categories'}</h2>
          <button 
            className="btn-primary add-btn"
            onClick={() => activeTab === 'products' ? setShowProductModal(true) : setShowCategoryModal(true)}
          >
            <PlusCircle size={20} /> Add {activeTab === 'products' ? 'Product' : 'Category'}
          </button>
        </div>

        <div className="data-table glass-card">
          {activeTab === 'products' ? (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product">
                        <img src={product.imageUrl} alt="" />
                        <div>
                          <div className="name">{product.name}</div>
                          <div className="desc">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td>{categories.find(c => c.id === product.categoryId)?.name}</td>
                    <td>${product.price}</td>
                    <td className="actions">
                      <button onClick={() => dispatch(deleteProduct(product.id))} className="delete-btn">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td className="name">{category.name}</td>
                    <td className="desc">{category.description}</td>
                    <td className="actions">
                      <button onClick={() => dispatch(deleteCategory(category.id))} className="delete-btn">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      {(showProductModal || showCategoryModal) && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h3>{showProductModal ? 'Add New Product' : 'Add New Category'}</h3>
              <button onClick={() => { setShowProductModal(false); setShowCategoryModal(false); }}>
                <X size={24} />
              </button>
            </div>
            
            {showProductModal ? (
              <form onSubmit={handleAddProduct} className="admin-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Laser Name Plate" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="0.00" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select value={newProduct.categoryId} onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})}>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Short Description</label>
                  <input required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Brief overview..." />
                </div>
                <div className="form-group">
                  <label>Full Details (Specifications)</label>
                  <textarea required value={newProduct.details} onChange={e => setNewProduct({...newProduct, details: e.target.value})} placeholder="Detailed specifications..." rows={4} />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input required value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} placeholder="https://unsplash.com/..." />
                </div>
                <button type="submit" className="btn-primary submit-btn">Create Product</button>
              </form>
            ) : (
              <form onSubmit={handleAddCategory} className="admin-form">
                <div className="form-group">
                  <label>Category Name</label>
                  <input required value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} placeholder="e.g. Signs" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea required value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} placeholder="Category overview..." rows={3} />
                </div>
                <button type="submit" className="btn-primary submit-btn">Create Category</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
