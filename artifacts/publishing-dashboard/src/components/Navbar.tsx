import React from "react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <header className="sticky top-0 z-[100] h-[58px] bg-[#0C0C0C] border-b-[3px] border-[#0C0C0C] flex items-center px-6">
      <Link href="/" className="flex items-center gap-1 font-display text-2xl tracking-widest cursor-pointer">
        <span className="text-[#FAF7EE]">BIOMINUTE</span>
        <span className="text-[#C94A00]">.</span>
        <span className="text-[#0D9970]">SHORTS</span>
      </Link>
      <nav className="ml-10 flex gap-6">
        <Link href="/">
          <span className="text-white hover:text-[#C94A00] font-sans font-medium text-sm uppercase cursor-pointer transition-colors">
            Dashboard
          </span>
        </Link>
      </nav>
      <div className="ml-auto flex items-center">
        <div className="bg-[#FAF7EE] text-[#0C0C0C] font-mono text-xs font-bold px-3 py-1 border-2 border-[#FAF7EE] shadow-[3px_3px_0_#C94A00] rotate-2">
          CREATOR MODE
        </div>
      </div>
    </header>
  );
}
