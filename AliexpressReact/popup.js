import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles.css';
import PriceMarkup from "./priceMarkup.js";

const AliExpressPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('productDetails');
    const [product, setProduct] = useState({
        title: '',
        productId: '',
        productType: '',
        collection: '',
        quantity: '',
        description: '',
        price: '',
    });

    const [showTitle, setShowTitle] = useState(true);

    const getProductIdFromUrl = () => {
        const pathParts = window.location.pathname.split('/');
        const productIdWithHtml = pathParts[pathParts.length - 1];
        return productIdWithHtml.split('.')[0];
    };

    function getQuantities() {
        const productItems = document.querySelectorAll('.HazeProductCharacteristics_HazeProductCharacteristics__item__qd5y4');

        let quantities = [];

        productItems.forEach((item, index) => {
            const spans = item.querySelectorAll('span');

            spans.forEach((span, spanIndex) => {
                const spanText = span.innerText.trim();

                if (spanText === 'Количество' && spanIndex < spans.length - 1) {
                    const quantity = spans[spanIndex + 1].innerText.trim();
                    quantities.push(quantity);
                }
            });
        });

        console.log('Final quantities array:', quantities[1]);

        return quantities[1];
    }



    const fetchProductInfo = () => {
        const productTitle = document.querySelector('.snow-ali-kit_Typography__base__1shggo')?.innerText || '';
        const productType = document.querySelector('.SeoRedBreadcrumbs_SeoRedBreadcrumbs__breadcrumbsWrap__glr1j a span:last-child')?.innerText;
        const productDescription = document.querySelector('.HazeProductCharacteristics_HazeProductCharacteristics__item__qd5y4')?.innerText.trim() || '';
        const productPrice = document.querySelector('.HazeProductPrice_SnowPrice__mainS__1tavf')?.innerText || '';
        const productQuantity = getQuantities() ? getQuantities() : 1;

        const productId = getProductIdFromUrl();

        setProduct((prevProduct) => ({
            ...prevProduct,
            title: productTitle,
            productId: productId,
            productType: productType,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity,
        }));

        setIsOpen(true);
    };

    const saveProduct = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                const data = await response.json();
                setIsOpen(false);
            } else {
                console.error('Failed to save product:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <>
            <button onClick={fetchProductInfo} className="addButton">
                Product Info
            </button>

            {isOpen && (
                <div className="popupOverlay">
                    <div className="popupContainer">
                        <div className="tabContainer">
                            <button onClick={() => setActiveTab('productDetails')} className={activeTab === 'productDetails' ? 'activeTab' : 'tab'}>
                                PRODUCT DETAILS
                            </button>
                            <button onClick={() => setActiveTab('priceMarkup')} className={activeTab === 'priceMarkup' ? 'activeTab' : 'tab'}>
                                PRICE MARKUP
                            </button>
                            <button onClick={() => setActiveTab('additionalDetails')} className={activeTab === 'additionalDetails' ? 'activeTab' : 'tab'}>
                                PRODUCT ADDITIONAL DETAILS
                            </button>
                            <button onClick={() => setActiveTab('variants')} className={activeTab === 'variants' ? 'activeTab' : 'tab'}>
                                VARIANTS
                            </button>
                        </div>
                        <br />
                        {activeTab === 'productDetails' && (
                            <form className="form">
                                <h2 className="heading">PRODUCT DETAILS</h2>
                                <div className="formProductDetail">
                                    <label className='label'>
                                        Title
                                        <input
                                            type="checkbox"
                                            checked={!showTitle}
                                            onChange={() => setShowTitle(!showTitle)}
                                            className="checkbox"
                                        />
                                        {showTitle && (
                                            <input
                                                type="text"
                                                value={product.title}
                                                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                                className="input"
                                            />
                                        )}
                                    </label>
                                </div>
                                <div className="formProductDetail">
                                    <label className="label">
                                        Product ID
                                        <input
                                            type="text"
                                            value={product.productId}
                                            onChange={(e) => setProduct({ ...product, productId: e.target.value })}
                                            className="input"
                                        />
                                    </label>
                                </div>
                                <div className="formProductDetail">
                                    <label className="label">
                                        Product Type
                                        <input
                                            type="text"
                                            value={product.productType}
                                            onChange={(e) => setProduct({ ...product, productType: e.target.value })}
                                            className="input"
                                        />
                                    </label>
                                </div>
                                <div className="formProductDetail">
                                    <label className="label">
                                        Collection
                                        <select
                                            value={product.collection}
                                            onChange={(e) => setProduct({ ...product, collection: e.target.value })}
                                            className="input"
                                        >
                                            <option value="">Select Shopify Collection</option>
                                            <option value="collection1">Collection 1</option>
                                            <option value="collection2">Collection 2</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="formProductDetail">
                                    <label className="label">
                                        Quantity
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                                            className="input"
                                        />
                                    </label>
                                </div>
                                <div className="formProductDetail">
                                    <label className="label">
                                        Description
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={product.description}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setProduct({ ...product, description: data });
                                            }}
                                        />
                                    </label>
                                </div>
                            </form>
                        )}

                        {activeTab === 'priceMarkup' && (
                            <div>
                                <h3 className="heading">PRICE MARKUP</h3>
                                <PriceMarkup product={product} />
                            </div>
                        )}

                        {activeTab === 'additionalDetails' && (
                            <div>Additional Details Content</div>
                        )}

                        {activeTab === 'variants' && (
                            <div>Variants Content</div>
                        )}

                        <div className="buttonGroup">
                            <button type="button" className="submitButton" onClick={saveProduct}>
                                Save
                            </button>
                            <button type="button" className="submitButton" onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);
ReactDOM.render(<AliExpressPopup />, appContainer);
