import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const BackButton = () => {

    const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="text-gray-500 flex items-center gap-2 font-semibold text-lg my-6 bg-transparent border-none p-0 focus:outline-none"
    >
      <ArrowLeft />
      <span>Back</span>
    </button>
  );
}

export default BackButton