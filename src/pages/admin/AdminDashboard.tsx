import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { addProduct, deleteProduct, updateProduct } from '../../features/products/productSlice';
import { addCategory, deleteCategory } from '../../features/categories/categorySlice';
import { logout } from '../../features/auth/authSlice';
import { 
  Trash2, Package, Tag, PlusCircle, X, Search, Filter, 
  Edit3, LogOut, Upload, Image as ImageIcon, CheckCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const categories = useSelector((state: RootState) => state.categories.items);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Form states
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
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

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.categoryId === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = (product: any) => {
    setEditMode(true);
    setCurrentId(product.id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryId: product.categoryId,
      imageUrl: product.imageUrl,
      details: product.details
    });
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setTimeout(() => {
      setEditMode(false);
      setCurrentId(null);
      setNewProduct({ name: '', description: '', price: '', categoryId: '', imageUrl: '', details: '' });
    }, 200);
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price) || 0,
      categoryId: newProduct.categoryId || (categories[0]?.id || '1')
    };

    if (editMode && currentId) {
      dispatch(updateProduct({ ...productData, id: currentId }));
      showStatus('success', 'Product updated successfully!');
    } else {
      dispatch(addProduct({
        ...productData,
        id: Date.now().toString(),
      }));
      showStatus('success', 'New product added!');
    }
    
    closeProductModal();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addCategory({
      ...newCategory,
      id: Date.now().toString()
    }));
    setShowCategoryModal(false);
    setNewCategory({ name: '', description: '' });
    showStatus('success', 'Category created!');
  };

  return (
    <div className="admin-page container">
      {/* Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="admin-sidebar glass-card"
      >
        <div className="sidebar-header">
          <h3>Workspace</h3>
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
        <button className="logout-btn" onClick={() => dispatch(logout())}>
          <LogOut size={20} /> Logout
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="content-header">
          <motion.h2 layout>{activeTab === 'products' ? 'Product Inventory' : 'Category Management'}</motion.h2>
          <button 
            className="btn-primary add-btn"
            onClick={() => activeTab === 'products' ? setShowProductModal(true) : setShowCategoryModal(true)}
          >
            <PlusCircle size={20} /> Add New {activeTab === 'products' ? 'Product' : 'Category'}
          </button>
        </div>

        {/* Global Status Message */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`status-toast ${statusMessage.type}`}
            >
              <CheckCircle size={18} /> {statusMessage.text}
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'products' && (
          <div className="filter-bar glass-card">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Find a product..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <Filter size={18} />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Data Table */}
        <motion.div 
          layout
          className="data-table glass-card"
        >
          {activeTab === 'products' ? (
            <table>
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Pricing</th>
                  <th className="actions">Operations</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={product.id}
                    >
                      <td>
                        <div className="table-product">
                          <img src={product.imageUrl} alt="" />
                          <div>
                            <div className="name">{product.name}</div>
                            <div className="desc">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-tag-mini">
                          {categories.find(c => c.id === product.categoryId)?.name}
                        </span>
                      </td>
                      <td><span className="price-label">${product.price}</span></td>
                      <td className="actions">
                        <button onClick={() => openEditModal(product)} className="edit-btn" title="Edit Product">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => dispatch(deleteProduct(product.id))} className="delete-btn" title="Delete Product">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="no-data">
                      <div className="empty-state">
                        <Package size={48} opacity={0.3} />
                        <p>No products found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category Identity</th>
                  <th>Overview</th>
                  <th className="actions">Operations</th>
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
        </motion.div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {showProductModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content glass-card"
            >
              <div className="modal-header">
                <h3>{editMode ? 'Edit Project' : 'New Project'}</h3>
                <button onClick={closeProductModal} className="close-btn">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddProduct} className="admin-form">
                <div className="form-group">
                  <label>Title</label>
                  <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Executive Brass Plate" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Base Price ($)</label>
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
                  <label>Brief Description</label>
                  <input required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="One-line overview..." />
                </div>
                <div className="form-group">
                  <label>Technical Details</label>
                  <textarea required value={newProduct.details} onChange={e => setNewProduct({...newProduct, details: e.target.value})} placeholder="Full specifications..." rows={4} />
                </div>
                <div className="form-group">
                  <label>Visual Asset</label>
                  <div className="image-upload-wrapper">
                    <div className="image-preview">
                      {newProduct.imageUrl ? (
                        <img src={newProduct.imageUrl} alt="Preview" />
                      ) : (
                        <div className="placeholder-preview"><ImageIcon size={32} /></div>
                      )}
                    </div>
                    <div className="upload-controls">
                      <div className="url-input">
                        <ImageIcon size={18} />
                        <input value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} placeholder="Asset URL..." />
                      </div>
                      <div className="file-input-btn">
                        <Upload size={18} />
                        <span>Upload from System</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-primary submit-btn">
                  {editMode ? 'Synchronize Changes' : 'Initialize Project'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {showCategoryModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content glass-card"
            >
              <div className="modal-header">
                <h3>New Classification</h3>
                <button onClick={() => setShowCategoryModal(false)} className="close-btn">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddCategory} className="admin-form">
                <div className="form-group">
                  <label>Label</label>
                  <input required value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} placeholder="e.g. Architectural Signs" />
                </div>
                <div className="form-group">
                  <label>Strategic Overview</label>
                  <textarea required value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} placeholder="Scope of this category..." rows={3} />
                </div>
                <button type="submit" className="btn-primary submit-btn">Establish Category</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
