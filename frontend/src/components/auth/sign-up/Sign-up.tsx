import React, { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log('Registering user:', formData);
  };

  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center font-sans px-4">
      <div className="w-full max-w-md bg-[#161616] border border-[#262626] rounded-xl p-8 shadow-2xl">
        
        {/* Hierarchy: Clear, dominant header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Create account</h2>
          <p className="text-sm text-zinc-400 mt-2">Get started with your free account today.</p>
        </header>

        {/* Proximity: Grouped inputs with consistent vertical rhythm */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
              required
            />
          </div>

          {/* Contrast: High contrast off-white button pops instantly */}
          <button
            type="submit"
            className="w-full bg-[#f4f4f5] hover:bg-white text-[#101010] font-semibold py-2 px-4 rounded-lg mt-2 transition-colors duration-200 shadow-sm"
          >
            Sign Up
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-sm text-zinc-400">
            Already have an account?{' '}
            <a href="/signin" className="text-white hover:underline font-medium">
              Log in
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}