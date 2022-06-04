import React, { useState } from 'react';

export default function Buy({ buy, approve }) {
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

  const handleBuy = () => {
    buy(form.amount, form.value);
  }

  const handleApprove = () => {
    approve();
  }

  return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
          <h3>BUY</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor="value">Value:</label>
                <input
                    type="text"
                    id="value"
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                />
                <br />
                <button onClick={handleApprove}>Approve</button>                
                <button onClick={handleBuy}>Buy</button>                
            </form>        
        </div>
    )
}
