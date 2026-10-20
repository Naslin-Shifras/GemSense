import React, { useState } from 'react';
import { gemOptions } from '../../data/gemData';

const PredictionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: gemOptions.types[0],
    color: gemOptions.colors[0],
    clarity: gemOptions.clarities[0],
    carat: '',
    cut: gemOptions.cuts[0],
    treatment: gemOptions.treatments[0],
    sellerPrice: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validate = () => {
    const e = {};
    if (!formData.carat || parseFloat(formData.carat) <= 0) {
      e.carat = 'Carat weight must be greater than 0';
    }
    if (formData.sellerPrice && parseFloat(formData.sellerPrice) < 0) {
      e.sellerPrice = 'Price cannot be negative';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  const SelectField = ({ label, name, options }) => (
    <div className="space-y-1.5">
      <label className="text-xs text-brand-muted block">{label}</label>
      <select name={name} value={formData[name]} onChange={handleChange} className="input-field appearance-none cursor-pointer">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="card p-7 rounded-2xl">
      <h2 className="text-xl font-bold mb-6">Enter Gemstone Details</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField label="Gem Type" name="type" options={gemOptions.types} />
          <SelectField label="Colour" name="color" options={gemOptions.colors} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField label="Clarity" name="clarity" options={gemOptions.clarities} />
          <div className="space-y-1.5">
            <label className="text-xs text-brand-muted block">Carat Weight</label>
            <input
              type="number" name="carat" value={formData.carat} onChange={handleChange}
              step="0.01" placeholder="e.g. 2.50"
              className={`input-field ${errors.carat ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.carat && <p className="text-xs text-red-400">{errors.carat}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField label="Cut Quality" name="cut" options={gemOptions.cuts} />
          <SelectField label="Treatment Status" name="treatment" options={gemOptions.treatments} />
        </div>

        <div className="pt-4 border-t border-brand-border space-y-1.5">
          <label className="text-xs text-brand-muted block">
            Quoted Seller Price (Optional, LKR)
          </label>
          <input
            type="number" name="sellerPrice" value={formData.sellerPrice} onChange={handleChange}
            placeholder="e.g. 450000"
            className={`input-field ${errors.sellerPrice ? 'border-red-500' : ''}`}
          />
          <p className="text-[10px] text-brand-muted">Enter this to compare the quoted price against the AI prediction.</p>
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-primary w-full py-3.5 text-base">
            Predict Market Value
          </button>
          <p className="text-center text-[10px] text-brand-muted mt-3">
            Powered by Naslin Shifras• Sri Lankan Market Dataset
          </p>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;
