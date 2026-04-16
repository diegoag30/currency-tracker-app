interface ErrorAlertProps {
  message?: string
}

/**
 * Standardised error banner used across all dashboard pages when a data
 * fetch fails. Renders a DaisyUI alert-error so the style is consistent
 * regardless of which page or SWR call produced the error.
 */
export default function ErrorAlert({ message = 'Failed to load data.' }: ErrorAlertProps) {
  return (
    <div role="alert" className="alert alert-error mt-4">
      <span>{message}</span>
    </div>
  )
}
