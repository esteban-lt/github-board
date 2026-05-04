import type React from "react";

interface Props {
  title: string;
  titleSlot?: React.ReactElement;
  description?: string;
  actions?: React.ReactElement;
}

export const Header = ({ title, titleSlot, description, actions }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-2">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{title}</h1>
          {titleSlot}
        </div>
        <p className="text-sm">{description}</p>
      </div>

      <div className="flex gap-2">
        {actions}
      </div>
    </div>
  );
}
