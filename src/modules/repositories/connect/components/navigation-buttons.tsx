import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  currentStep: number;
  isLastStep: boolean;
  canProceed: boolean;
  isConnecting: boolean;
  onBack: () => void;
  onNext: () => void;
  onConnect: () => void;
}

export const NavigationButtons = ({
  currentStep,
  isLastStep,
  canProceed,
  isConnecting,
  onBack,
  onNext,
  onConnect,
}: Props) => {
  const backLabel = currentStep === 1 ? "Cancel" : "Back";

  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isConnecting}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {backLabel}
      </Button>

      {!isLastStep ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={!canProceed || isConnecting}
          className="gradient-primary text-primary-foreground"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onConnect}
          disabled={isConnecting}
          className="gradient-primary text-primary-foreground min-w-37.5"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Connect Repository
            </>
          )}
        </Button>
      )}
    </div>
  );
};
