import type React from "react";

interface Props {
  title: string;
  description?: string;
  actions?: React.ReactElement;
}

export const Header = ({ title, description, actions }: Props) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>

      <div>
        {actions}
      </div>
    </div>
  );
}
