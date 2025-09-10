"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../buttons/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-2xl  rounded-2xl bg-white "
      >
        {/* Close button */}
        <div className=" p-4 border-b-2 border-b-[#ccc]">
          <h1 className="font-semibold ">Preview</h1>
          <Button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 "
          >
            <X size={20} color="black" />
          </Button>
        </div>
        <div className="max-h-[90vh] overflow-y-auto no-scrollbar p-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
