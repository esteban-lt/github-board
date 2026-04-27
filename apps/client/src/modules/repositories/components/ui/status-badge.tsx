import { Badge } from "@/components/ui/badge";

interface Props {
  status: boolean;
}

export const StatusBadge = ({ status }: Props) => {

  return (
    <Badge
      variant="outline"
      className={`text-xs gap-1 ${status ? "text-green-600 border-green-200 bg-green-50" : "text-red-600 border-red-200 bg-red-50"}`}
    >
      <span className={`size-1.5 rounded-full ${status ? "bg-green-500" : "bg-red-500"}`} />
      {status ? "active" : "inactive"}
    </Badge>
  );
}
