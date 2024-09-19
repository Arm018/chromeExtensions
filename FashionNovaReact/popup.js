import React, { useEffect, useState } from "react";

export default function Popup() {
    const [productInfo, setProductInfo] = useState({
        title: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getProductInfo' }, (response) => {
                if (response) {
                    setProductInfo({
                        title: response.title || '',
                        description: response.description || '',
                        price: response.price || '',
                    });
                }
            });
        });
    }, []);

    return (
        <div>
            <h2>Product Info</h2>
            <label>
                Title:
                <input
                    type="text"
                    value={productInfo.title}
                    onChange={(e) => setProductInfo({ ...productInfo, title: e.target.value })}
                />
            </label>
            <br />
            <label>
                Description:
                <textarea
                    value={productInfo.description}
                    onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
                    style={{ width: '450px', height: '150px' }}
                />
            </label>
            <br />
            <label>
                Price:
                <input
                    type="number"
                    value={productInfo.price}
                    onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
                />
            </label>
            <br />
            <button onClick={() => window.close()}>Close</button>
        </div>
    );
}
