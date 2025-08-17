import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full border px-2 py-2 rounded"/>
        <input required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full border px-2 py-2 rounded"/>
        <input required type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} placeholder="Password" className="w-full border px-2 py-2 rounded"/>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Create account</button>
      </form>
    </div>
  );
}
