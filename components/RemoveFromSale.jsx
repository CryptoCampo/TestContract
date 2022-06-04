import React, { useState } from 'react';

export default function RemoveFromSale({ removeFromSale }) {
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

  const handleRemoveFromSale = () => {
    removeFromSale(form.tokenID);
  }

  return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
          <h3>REMOVE FROM SALE</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="tokenID">TokenID:</label>
                <input
                    type="text"
                    id="tokenID"
                    name="tokenID"
                    value={form.tokenID}
                    onChange={handleChange}
                />
                <br />
                <button onClick={handleRemoveFromSale}>Remove From Sale</button>                
            </form>        
        </div>
    )
}
