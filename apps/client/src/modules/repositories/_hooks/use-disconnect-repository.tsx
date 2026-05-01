import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { disconnectRepositoryAction } from '../_actions/disconnect-repository-action';

export const useDisconnectRepository = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => disconnectRepositoryAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repositories'] });
      toast.success('Repository disconnected successfully', { position: 'top-right' });
    },
    onError: () => {
      toast.error('Error disconnecting repository', { position: 'top-right' });
    },
  });
}
