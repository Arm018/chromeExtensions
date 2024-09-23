import React, { useState, useEffect } from 'react';

const PriceMarkup = ({ product }) => {
    const [markupValue, setMarkupValue] = useState('');
    const [markupType, setMarkupType] = useState('amount');
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        updateFinalPrice();
    }, [markupValue, markupType, product.price]);

    const updateFinalPrice = () => {
        const originalPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 0;
        const markup = parseFloat(markupValue) || 0;

        let calculatedFinalPrice = originalPrice;

        if (markupType === 'amount') {
            calculatedFinalPrice = originalPrice + markup;
        } else if (markupType === 'percent') {
            calculatedFinalPrice = originalPrice + (originalPrice * (markup / 100));
        }

        setFinalPrice(calculatedFinalPrice.toFixed(2));
    };

    const handleMarkupValueChange = (e) => {
        const value = e.target.value;
        setMarkupValue(value);
    };

    const handleMarkupTypeChange = (e) => {
        const value = e.target.value;
        setMarkupType(value);
    };

    return (
        <div className="priceMarkupRow">
            <div>
                <label className="label">Price</label>
                <input
                    type="text"
                    value={product.price || ''}
                    className="input"
                    readOnly
                />
            </div>

            <div>
                <label className="label">Final Price</label>
                <input
                    type="text"
                    value={finalPrice}
                    className="input"
                    readOnly
                />
            </div>

            <div>
                <label className="label">Markup Type</label>
                <select
                    className="input"
                    value={markupType}
                    onChange={handleMarkupTypeChange}
                >
                    <option value="percent">By Percent</option>
                    <option value="amount">By Amount</option>
                </select>
            </div>

            <div>
                <label className="label">Markup Value</label>
                <input
                    type="number"
                    value={markupValue}
                    onChange={handleMarkupValueChange}
                    className="input"
                    placeholder="Enter markup value"
                />
            </div>
        </div>
    );
};

export default PriceMarkup;
