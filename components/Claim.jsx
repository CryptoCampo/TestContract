import React, { useState } from 'react';

export default function Claim({ claim }) {
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

  const handleClaim = () => {
    claim(form.tokenIDs);
  }

  return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
          <h3>CLAIM</h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="tokenIDs">TokenIDs:</label>
                <input
                    type="text"
                    id="tokenIDs"
                    name="tokenIDs"
                    value={form.tokenIDs}
                    onChange={handleChange}
                />
                <br />
                <button onClick={handleClaim}>Claim</button>                
            </form>        
        </div>
    )
}
