"use client";

interface FormButtonsProps {
  step: number;
  totalSteps: number;
  isRefValid: boolean;
  isLoading: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function FormButtons({
  step,
  totalSteps,
  isRefValid,
  isLoading,
  onBack,
  onNext,
  onSubmit,
}: FormButtonsProps) {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNext();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit();
  };

  return (
    <div className="flex gap-6 mt-8">
      {step >= 1 && (
        <button
          type="button"
          className="cursor-pointer px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold border border-gray-300 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleBack}
          disabled={isLoading}
        >
          Back
        </button>
      )}
      {step < totalSteps - 1 ? (
        <button
          type="button"
          className="cursor-pointer px-6 py-2 bg-purple-900/75 text-white rounded-lg font-semibold shadow hover:bg-purple-700/60 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={!isRefValid || isLoading}
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      ) : (
        <button
          type="button"
          className="cursor-pointer px-6 py-2 bg-purple-900/75 text-white rounded-lg font-semibold shadow hover:bg-purple-700/60 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={!isRefValid || isLoading}
        >
          {isLoading ? "Submitting..." : "Save"}
        </button>
      )}
    </div>
  );
}
