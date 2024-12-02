export default function OnboardingSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, name: 'Application' },
    { id: 2, name: 'Terms & Conditions' },
    { id: 3, name: 'Confirmation' }
  ]

  return (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`relative ${
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
            }`}>
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                {stepIdx !== steps.length - 1 && (
                  <div className={`h-0.5 w-full ${
                    step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
              <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                step.id < currentStep
                  ? 'bg-blue-600'
                  : step.id === currentStep
                  ? 'bg-blue-600'
                  : 'bg-gray-200'
              }`}>
                <span className={`text-sm font-medium ${
                  step.id <= currentStep ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.id}
                </span>
              </div>
              <span className="absolute -bottom-6 w-max text-sm font-medium text-gray-500">
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
