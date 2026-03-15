interface Props {
  title: string;
  description?: string;
  actions?: any;
}

export const Header = ({ title, description, actions }: Props) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-xl font-medium">{title}</h1>
        <p>{description}</p>
      </div>

      <div>
        {actions}
      </div>
    </div>
  );
}
