import React from "react";

export const CardInfo = React.memo(
  ({ label, description }: { label: string; description?: string }) => {
    return (
      <>
        <p className="font-bold">{label}</p>
        <p className="text-sm">{description}</p>
      </>
    );
  },
);
