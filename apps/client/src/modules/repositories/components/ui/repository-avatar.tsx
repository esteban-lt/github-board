interface Props {
  avatarUrl: string;
  name: string;
}

export const RepositoryAvatar = ({ avatarUrl, name }: Props) => {

  return (
    <img 
      src={avatarUrl} 
      alt={name} 
      className="size-8 rounded-md border shrink-0" 
    />
  );
}
