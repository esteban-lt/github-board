import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Actions = () => {
  return (
    <div>
      <Button>
        <Link to="/repositories/connect">Connect repository</Link>
      </Button>
    </div>
  );
}
