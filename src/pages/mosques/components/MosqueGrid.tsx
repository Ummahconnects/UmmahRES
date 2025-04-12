
import React from "react";
import MosqueCard, { MosqueProps } from "@/components/MosqueCard";

interface MosqueGridProps {
  mosques: MosqueProps[];
}

const MosqueGrid = ({ mosques }: MosqueGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {mosques.map((mosque) => (
        <MosqueCard key={mosque.id} {...mosque} />
      ))}
    </div>
  );
};

export default MosqueGrid;
