import React, { useState } from 'react';

export default function Trade({ trade, approve }) {
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

  const handleTrade = () => {
    trade(form.tokenID);
  }

  const handleApprove = () => {
    approve();
  }

  return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
          <h3>TRADE</h3>
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
                <button onClick={handleApprove}>Approve</button>                
                <button onClick={handleTrade}>Trade</button>                
            </form>        
        </div>
    )
}
