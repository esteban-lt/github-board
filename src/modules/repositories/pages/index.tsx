import { Header } from "@/components/app-pages/header";
import { Actions } from "../components/actions";

const Index = () => {
  return (
    <Header 
      title="Repositories"
      description="Manage and monitor your connected GitHub repositories"
      actions={<Actions />}
    />
  );
}

export default Index;
