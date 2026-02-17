import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Step } from '../interfaces/step';

interface Props {
  steps: Step[];
  currentStep: number;
}

export const StepsProgress = ({ steps, currentStep }: Props) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    currentStep > step.number
                      ? "border-success bg-success text-success-foreground"
                      : currentStep === step.number
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 bg-background text-muted-foreground"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-16 sm:w-24 lg:w-32 transition-colors ${
                    currentStep > step.number ? "bg-success" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
