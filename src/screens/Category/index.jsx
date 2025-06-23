import { useNavigate, Link, useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./category.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faPlus,
  faXmark
} 
from "@fortawesome/free-solid-svg-icons";

const CategoryPage = () => {
    const { categories, setCategories, t, API_URL } = useOutletContext();

    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({ theme: "", name: "", color: "#000000" });
    const [editId, setEditId] = useState(null);

    const openAddForm = () => {
        setIsEditMode(false);
        setFormData({ theme: "", name: "", color: "#000000" });
        setEditId(null);
        setShowForm(true);
    };

   const openEditForm = (category) => {
        setIsEditMode(true);
        setFormData({ theme: category.theme, name: category.name, color: category.color });
        setEditId(category._id);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setFormData({ theme: "", name: "", color: "#000000" });
        setIsEditMode(false);
        setEditId(null);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const groupedCategories = categories
    .filter(cat => !cat.isDefault)
    .reduce((acc, cat) => {
        if (!acc[cat.theme]) acc[cat.theme] = [];
        acc[cat.theme].push(cat);
        return acc;
    }, {});


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                const { data } = await axios.put(`${API_URL}/api/category/${editId}`, formData);
                const updatedCategories = categories.map(cat => cat._id === editId ? data : cat);
                setCategories(updatedCategories);

            } else {
                const { data } = await axios.post(`${API_URL}/api/category`, formData);
                setCategories([...categories, data]);
            }

            closeForm();
        } catch (error) {
            console.error(t('CategoryPage.errorSubmit'), error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/category/${id}`);
            setCategories(categories.filter(cat => cat._id !== id));
        } catch (error) {
            console.error(t('CategoryPage.confirmDelete'), error);
        }
    };


    return (
        <div className="category-container">
            <div className="category">
                <button className="btn-add-mobile" onClick={openAddForm}>
                    <FontAwesomeIcon icon={faPlus} /> {t('CategoryPage.addTitleCat')}
                </button>
                <h1>{t('CategoryPage.titleCat')}</h1>
                <div className="category-list">
                    {Object.entries(groupedCategories).map(([theme, cats]) => (
                        <div key={theme}>
                            <p className="titleCat">{theme}</p>
                            <ul>
                                {cats.map((cat) => (
                                    <li key={cat._id} className="cat">
                                        <button className="btn-edit" onClick={() => openEditForm(cat)}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(cat._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <p>{cat.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            
            {showForm && <div className="modal-overlay-cat" onClick={closeForm}></div>}

            <form className={`add-category ${showForm ? "show" : ""}`} onSubmit={handleSubmit}>
                <button type="button" className="btn-close" onClick={closeForm}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <h3>{isEditMode ? t('CategoryPage.editTitleCat') : t('CategoryPage.addTitleCat')}</h3>
                
                <div className="cat-theme">
                <label>
                    {t('CategoryPage.theme')}
                    <input
                    type="text"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    required
                    />
                </label>
                </div>

                <div className="cat-title">
                <label>
                    {t('CategoryPage.name')}
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </label>
                </div>

                <div className="cat-color">
                <label>
                    {t('CategoryPage.color')}
                    <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    />
                </label>
                </div>

                <button type="submit" className="btn-add">
                    {isEditMode ? t('CategoryPage.editCat') : t('CategoryPage.addCat')}
                </button>
            </form>

        </div>
    );
};

export default CategoryPage;