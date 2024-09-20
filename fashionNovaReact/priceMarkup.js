import React, { useState } from 'react';

const PriceMarkup = ({ product }) => {
    const [markupValue, setMarkupValue] = useState('');
    const [markupType, setMarkupType] = useState('amount');
    const [finalPrice, setFinalPrice] = useState(parseFloat(product.price) || 0);

    const handleMarkupValueChange = (e) => {
        const newMarkupValue = parseFloat(e.target.value) || 0;
        setMarkupValue(newMarkupValue);

        const originalPrice = parseFloat(product.price) || 0;

        if (markupType === 'amount') {
            setFinalPrice(originalPrice + newMarkupValue);
        } else if (markupType === 'percent') {
            setFinalPrice(originalPrice + (originalPrice * (newMarkupValue / 100)));
        }
    };

    const handleMarkupTypeChange = (e) => {
        const newMarkupType = e.target.value;
        setMarkupType(newMarkupType);

        const originalPrice = parseFloat(product.price) || 0;
        const currentMarkupValue = parseFloat(markupValue) || 0;

        if (newMarkupType === 'amount') {
            setFinalPrice(originalPrice + currentMarkupValue);
        } else if (newMarkupType === 'percent') {
            setFinalPrice(originalPrice + (originalPrice * (currentMarkupValue / 100)));
        }
    };

    return (
        <div className="priceMarkupRow">
            <div>
                <label className="label">Price</label>
                <input type="text" value={product.price} className="input" readOnly />
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
                />
            </div>
        </div>
    );
};

export default PriceMarkup;
