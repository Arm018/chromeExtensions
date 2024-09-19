import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const ProductPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
    });

    const fetchProductInfo = () => {
        const productTitle = document.querySelector('.product-info__title')?.innerText || '';
        const productDescription = document.querySelector('.product-info__details')?.innerText.trim() || '';
        const productPrice = document.querySelector('.product-info__price')?.innerText || '';



        setProduct({
            title: productTitle,
            description: productDescription,
            price: productPrice,
        });

        setIsOpen(true);
    };


    return (
        <>
            <button
                onClick={fetchProductInfo}
                style={{
                    position: 'fixed',
                    top: '10px',
                    right: '10px',
                    padding: '10px',
                    backgroundColor: '#f39c12',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Add
            </button>

            {isOpen && (
                <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        zIndex: '1001',
                        width: '600px',
                        height: 'auto',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                    }}
                >
                    <h2>Product Info</h2>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={product.title}
                            style={{width: '450px'}}
                            onChange={(e) => setProduct({...product, title: e.target.value})}
                        />
                    </label>
                    <br/>
                    <label>
                        Description:
                        <textarea
                            value={product.description}
                            style={{width: '450px', height: '150px'}}
                            onChange={(e) => setProduct({...product, description: e.target.value})}
                        />
                    </label>
                    <br/>
                    <label>
                        Price:
                        <input
                            type="text"
                            value={product.price}
                            onChange={(e) => setProduct({...product, price: e.target.value})}
                        />
                    </label>
                    <br/>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
            )}
        </>
    );
};

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);
ReactDOM.render(<ProductPopup/>, appContainer);
