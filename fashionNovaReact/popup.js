import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles.css';
import PriceMarkup from "./priceMarkup";

const ProductPopup = () => {
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
    const [showDescription, setShowDescription] = useState(true);

    const fetchProductInfo = () => {
        const productTitle = document.querySelector('.product-info__title')?.innerText || '';
        const productType = document.querySelector('.breadcrumbs-container nav span:last-child')?.textContent.trim() || '';
        const productDescription = document.querySelector('.product-info__details-body')?.innerText.trim() || '';
        const productPrice = document.querySelector('.product-info__price')?.innerText || '';
        const productQuantity = 0;
        setProduct({
            ...product,
            title: productTitle,
            productType: productType,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity
        });

        setIsOpen(true);
    };

    return (
        <>
            <button
                onClick={fetchProductInfo}
                className="addButton"
            >
                Product Info
            </button>

            {isOpen && (
                <div className="popupOverlay">
                    <div className="popupContainer">

                        <div className="tabContainer">
                            <button
                                onClick={() => setActiveTab('productDetails')}
                                className={activeTab === 'productDetails' ? 'activeTab' : 'tab'}
                            >
                                PRODUCT DETAILS
                            </button>
                            <button
                                onClick={() => setActiveTab('priceMarkup')}
                                className={activeTab === 'priceMarkup' ? 'activeTab' : 'tab'}
                            >
                                PRICE MARKUP
                            </button>
                            <button
                                onClick={() => setActiveTab('additionalDetails')}
                                className={activeTab === 'additionalDetails' ? 'activeTab' : 'tab'}
                            >
                                PRODUCT ADDITIONAL DETAILS
                            </button>
                            <button
                                onClick={() => setActiveTab('variants')}
                                className={activeTab === 'variants' ? 'activeTab' : 'tab'}
                            >
                                VARIANTS
                            </button>
                        </div>
                        <br/>
                        {activeTab === 'productDetails' && (

                            <form className="form">
                                <>
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
                                                    onChange={(e) => setProduct({...product, title: e.target.value})}
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
                                                onChange={(e) => setProduct({...product, productId: e.target.value})}
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
                                                onChange={(e) => setProduct({...product, productType: e.target.value})}
                                                className="input"
                                            />
                                        </label>
                                    </div>
                                    <div className="formProductDetail">
                                        <label className="label">
                                            Collection
                                            <select
                                                value={product.collection}
                                                onChange={(e) => setProduct({...product, collection: e.target.value})}
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
                                                onChange={(e) => setProduct({...product, quantity: e.target.value})}
                                                className="input"
                                            />
                                        </label>
                                    </div>
                                    <div className="formProductDetail">
                                        <label className="label">
                                            Description
                                            <input
                                                type="checkbox"
                                                checked={!showDescription}
                                                onChange={() => setShowDescription(!showDescription)}
                                                className="checkbox"
                                            />
                                            {showDescription && (
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={product.description}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setProduct({...product, description: data});
                                                    }}
                                                />
                                            )}
                                        </label>
                                    </div>
                                </>
                            </form>

                        )}

                        {activeTab === 'priceMarkup' && (
                            <>
                                <div className="formGroup">
                                    <h3 className="heading">Currency Converter</h3>
                                    <span> Enable Currency Converter</span>
                                    <input type="checkbox" className="checkbox" />
                                </div>

                                <div className="formGroup">
                                    <h3 className="heading">Regular Price Markup</h3>
                                    <p>Pricing rule was not applied. You can create custom pricing rules from <a
                                        href="#">settings</a>.</p>

                                    <PriceMarkup product={product} />

                                </div>

                                <div className="formGroup">
                                    <h3 className="heading">Compare at Price Markup</h3>

                                    <div className="priceMarkupRow">
                                        <div>
                                            <label className="label">Final Compare At Price</label>
                                            <input type="text" value="115.98" className="input"/>
                                        </div>

                                        <div>
                                            <label className="label">Compare At Price Policy</label>
                                            <select className="input">
                                                <option value="amount">By Amount</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="label">Compare At Value</label>
                                            <input type="number" value="0" className="input"/>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'additionalDetails' && (
                            <div>Additional Details Content</div>
                        )}

                        {activeTab === 'variants' && (
                            <div>Variants Content</div>
                        )}

                        <div className="buttonGroup">
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
ReactDOM.render(<ProductPopup/>, appContainer);
