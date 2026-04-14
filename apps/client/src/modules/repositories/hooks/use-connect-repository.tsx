import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { connectRepositoryAction } from '../actions/connect-repository-action';

export const useConnectRepository = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (githubRepoId: number) => connectRepositoryAction(githubRepoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repositories'] });
      toast.success('Repository connected successfully', {
        position: 'top-right',
      });
    },
    onError: () => {
      toast.error('Error connecting repository', {
        position: 'top-right',
      });
    },
  });
}
