"use client";

interface StepperProps {
  steps: { label: string }[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function Stepper({
  steps,
  currentStep,
  onStepClick,
}: StepperProps) {
  return (
    <div className="flex mb-8 border-b border-gray-200">
      {steps.map((s, i) => (
        <div
          key={s.label}
          className={`px-4 py-2 cursor-pointer border-b-6 transition-colors duration-200 ${
            i === currentStep
              ? "border-purple-900/75 text-gray-800/80 font-medium"
              : "border-transparent text-gray-400 hover:text-purple-800/80"
          }`}
          onClick={() => onStepClick(i)}
        >
          {s.label}
        </div>
      ))}
    </div>
  );
}
