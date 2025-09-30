import React from 'react';
import "@/styles/components.css";


interface ColorItem {
  name: string;
  color: string;
  lightColor: string;
}

interface ColorShowcaseProps {
  className?: string;
}

export function ColorShowcase({ className = '' }: ColorShowcaseProps) {
  const colorPalettes = [
    {
      name: 'رنگ‌های اصلی',
      colors: [
        { name: 'آبی-سبز اولیه', color: '#65bcb6', lightColor: '#e7f6f3' },
        { name: 'نارنجی-کرمی ثانویه', color: '#e19f87', lightColor: '#f4e9e3' },
        { name: 'کورال سوم', color: '#c98a78', lightColor: '#f7ede8' }
      ]
    },
    {
      name: 'هلویی گرم',
      colors: [
        { name: 'Peach 1', color: '#FAEAE4', lightColor: '#FAEAE4' },
        { name: 'Peach 6', color: '#E9936E', lightColor: '#F7D7CA' },
        { name: 'Peach 10', color: '#8F392D', lightColor: '#F4C4B0' }
      ]
    },
    {
      name: 'فیروزه‌ای آرام',
      colors: [
        { name: 'Turquoise 1', color: '#E8FAFA', lightColor: '#E8FAFA' },
        { name: 'Turquoise 6', color: '#4CC3C3', lightColor: '#CCF4F4' },
        { name: 'Turquoise 10', color: '#103B3B', lightColor: '#B0EEEE' }
      ]
    },
    {
      name: 'سبز نعنایی تازه',
      colors: [
        { name: 'Mint 1', color: '#FFFFFF', lightColor: '#FFFFFF' },
        { name: 'Mint 6', color: '#E6F5F2', lightColor: '#F8FDFC' },
        { name: 'Mint 10', color: '#82A6A6', lightColor: '#F1FAF8' }
      ]
    }
  ];

  return null;
}