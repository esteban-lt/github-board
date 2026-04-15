import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { synchronizeRepositoryAction } from '../actions/synchronize-repository-action';

export const useSynchronizeRepository = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => synchronizeRepositoryAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repositories'] });
      toast.success('Repository synchronized successfully', { position: 'top-right' });
    },
    onError: () => {
      toast.error('Error synchronizing repository', { position: 'top-right' });
    },
  });
}
