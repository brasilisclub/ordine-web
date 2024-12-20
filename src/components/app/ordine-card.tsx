import React from "react";

interface OrdineCardProps {
  table: number;
  status: boolean;
  onSelect?: () => void;
  ariaLabel?: string;
}

const OrdineCard: React.FC<OrdineCardProps> = ({
  table,
  status,
  onSelect,
  ariaLabel = `Table ${table} - ${status ? "Available" : "Unavailable"}`,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect?.();
    }
  };

  return (
    <article
      role="button"
      tabIndex={status ? 0 : -1}
      onClick={status ? onSelect : undefined}
      onKeyDown={status ? handleKeyDown : undefined}
      aria-label={ariaLabel}
      aria-disabled={!status}
      className={`
        w-full h-full aspect-[2/3]
        flex items-center justify-center
        rounded-lg
        transition-colors duration-200
        ${
          status
            ? "bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 cursor-pointer"
            : "bg-red-900 cursor-not-allowed"
        }
      `}
    >
      <h2
        className="text-white text-6xl font-medium select-none"
        aria-hidden="true"
      >
        {table}
      </h2>
      <span className="sr-only">
        {status ? "Available" : "Unavailable"} - Table {table}
      </span>
    </article>
  );
};

export default OrdineCard;
