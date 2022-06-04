import React, { useState } from 'react';

export default function PutOnSale({ putOnSale }) {
    const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePutOnSale = () => {
    putOnSale(form.tokenID, form.price);
  }

  return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
          <h3>PUT ON SALE</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="tokenID">TokenID:</label>
                <input
                    type="text"
                    id="tokenID"
                    name="tokenID"
                    value={form.tokenID}
                    onChange={handleChange}
                />
            <label htmlFor="price">Price:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                />
                <br />
                <button onClick={handlePutOnSale}>Put on Sale</button>                
            </form>        
        </div>
    )
}
