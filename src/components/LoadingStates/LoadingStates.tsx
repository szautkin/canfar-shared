// LoadingStates components for use throughout the application
// These components use the CSS animations defined in loading-states.css

// Types are available in LoadingStatesProps if needed

// Import the loading states CSS
import '@/styles/loading-states.css';

export function LoadingStates() {
  // Component implementation will be handled by the implementation file
  return null;
}

// Skeleton components
export function SkeletonTextField({
  size = 'medium',
  className = '',
  ...props
}) {
  const sizeClass = {
    small: 'skeleton-textfield-sm',
    medium: 'skeleton-textfield',
    large: 'skeleton-textfield-lg',
  }[size];

  return (
    <div
      className={`skeleton skeleton-wave ${sizeClass} ${className}`}
      {...props}
    />
  );
}

export function SkeletonSelect({ size = 'medium', className = '', ...props }) {
  const sizeClass = {
    small: 'skeleton-textfield-sm',
    medium: 'skeleton-textfield',
    large: 'skeleton-textfield-lg',
  }[size];

  return (
    <div
      className={`skeleton skeleton-wave skeleton-select ${sizeClass} ${className}`}
      {...props}
    />
  );
}

export function SkeletonButton({
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props
}) {
  const sizeClass = {
    small: 'skeleton-button-sm',
    medium: 'skeleton-button',
    large: 'skeleton-button-lg',
  }[size];

  const widthClass = fullWidth ? 'skeleton-button-full' : '';

  return (
    <div
      className={`skeleton skeleton-pulse ${sizeClass} ${widthClass} ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard({ className = '', ...props }) {
  return (
    <div className={`skeleton-card ${className}`} {...props}>
      <div className="skeleton skeleton-wave skeleton-card-header" />
      <div className="skeleton skeleton-wave skeleton-card-content" />
      <div className="skeleton skeleton-wave skeleton-card-content" />
      <div className="skeleton skeleton-wave skeleton-card-content" />
    </div>
  );
}

export function SkeletonTableRow({ columns = 4, className = '', ...props }) {
  return (
    <div className={`skeleton-table-row ${className}`} {...props}>
      {Array.from({ length: columns }).map((_, index) => (
        <div
          key={index}
          className="skeleton skeleton-wave skeleton-table-cell"
        />
      ))}
    </div>
  );
}

export function SkeletonText({
  variant = 'body',
  width = '100%',
  className = '',
  ...props
}) {
  const variantClass = {
    body: 'skeleton-text',
    small: 'skeleton-text-sm',
    large: 'skeleton-text-lg',
    heading: 'skeleton-heading',
  }[variant];

  return (
    <div
      className={`skeleton skeleton-wave ${variantClass} ${className}`}
      style={{ width }}
      {...props}
    />
  );
}

export function SkeletonAvatar({ size = 'medium', className = '', ...props }) {
  const sizeClass = {
    small: 'skeleton-avatar-sm',
    medium: 'skeleton-avatar',
    large: 'skeleton-avatar-lg',
  }[size];

  return (
    <div
      className={`skeleton skeleton-pulse ${sizeClass} ${className}`}
      {...props}
    />
  );
}

// Progress components
export function CircularProgress({
  size = 40,
  thickness = 3.6,
  className = '',
  ...props
}) {
  const radius = (size - thickness) / 2;

  return (
    <div
      className={`circular-progress ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="circular-progress-svg" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="circular-progress-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
}

export function LinearProgress({
  variant = 'indeterminate',
  value = 0,
  className = '',
  ...props
}) {
  const isIndeterminate = variant === 'indeterminate';

  return (
    <div
      className={`linear-progress ${isIndeterminate ? 'linear-progress-indeterminate' : ''} ${className}`}
      {...props}
    >
      <div
        className="linear-progress-bar"
        style={!isIndeterminate ? { width: `${value}%` } : undefined}
      />
    </div>
  );
}

// Loading overlay components
export function LoadingOverlay({
  open = true,
  light = false,
  message = 'Loading...',
  className = '',
  children,
  ...props
}: {
  open?: boolean;
  light?: boolean;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className={`loading-overlay ${light ? 'loading-overlay-light' : ''} ${className}`}
      {...props}
    >
      <div className="loading-overlay-content">
        <CircularProgress size={48} />
        {message && <div>{message}</div>}
        {children}
      </div>
    </div>
  );
}

export function ComponentLoadingOverlay({
  loading = true,
  className = '',
  children,
  ...props
}: {
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!loading) return null;

  return (
    <div className={`loading-overlay-component ${className}`} {...props}>
      <CircularProgress size={32} />
      {children}
    </div>
  );
}

// Inline loading
export function InlineLoading({
  loading = true,
  size = 16,
  text = 'Loading',
  className = '',
  ...props
}) {
  if (!loading) return null;

  return (
    <span className={`loading-inline ${className}`} {...props}>
      <CircularProgress size={size} className="loading-inline-spinner" />
      {text && <span>{text}</span>}
    </span>
  );
}

// Loading dots
export function LoadingDots({ className = '', ...props }) {
  return (
    <span className={`loading-dots ${className}`} {...props}>
      <span className="loading-dot" />
      <span className="loading-dot" />
      <span className="loading-dot" />
    </span>
  );
}

// Form submission loading states
export function FormSubmissionOverlay({
  submitting = false,
  message = 'Submitting...',
  progress = undefined,
  onCancel,
  className = '',
  ...props
}: {
  submitting?: boolean;
  message?: string;
  progress?: number;
  onCancel?: () => void;
  className?: string;
}) {
  if (!submitting) return null;

  return (
    <div className={`form-submission-overlay ${className}`} {...props}>
      <div className="form-submission-content">
        {progress !== undefined ? (
          <div className="form-submission-progress">
            <LinearProgress variant="determinate" value={progress} />
            <span className="form-submission-progress-text">{progress}%</span>
          </div>
        ) : (
          <CircularProgress size={40} />
        )}
        <div className="form-submission-message">{message}</div>
        {onCancel && (
          <button
            className="form-submission-cancel loading-cancel-button"
            onClick={onCancel}
            aria-label="Cancel submission"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// Data fetching states
export function DataFetchingState({
  loading = true,
  error = null,
  retry,
  children,
  className = '',
  ...props
}: {
  loading?: boolean;
  error?: string | null;
  retry?: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  if (!loading && !error) return null;

  return (
    <div className={`data-fetching-state ${className}`} {...props}>
      {loading && !error && (
        <div className="data-fetching-loading">
          <CircularProgress size={48} />
          <div>Loading data...</div>
        </div>
      )}
      {error && (
        <div className="data-fetching-error">
          <div className="data-fetching-error-icon">⚠️</div>
          <div className="data-fetching-error-message">{error}</div>
          {retry && (
            <button className="data-fetching-retry" onClick={retry}>
              Retry
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Navigation transition loading
export function NavigationProgress({
  isNavigating = false,
  className = '',
  ...props
}) {
  if (!isNavigating) return null;

  return (
    <div className={`navigation-progress ${className}`} {...props}>
      <LinearProgress
        variant="indeterminate"
        className="navigation-progress-bar"
      />
    </div>
  );
}

// Lazy loading states
export function LazyLoadBoundary({
  loading = true,
  error = null,
  fallback,
  children,
  className = '',
  ...props
}: {
  loading?: boolean;
  error?: Error | null;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  if (error) {
    return (
      <div className={`lazy-load-error ${className}`} {...props}>
        <div>Failed to load component</div>
        <div className="lazy-load-error-details">{error.message}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`lazy-load-boundary ${className}`} {...props}>
        {fallback || <CircularProgress size={40} />}
      </div>
    );
  }

  return <>{children}</>;
}

// Staggered list loading
export function StaggeredListSkeleton({
  count = 5,
  delay = 100,
  className = '',
  ...props
}) {
  return (
    <div className={`staggered-list-skeleton ${className}`} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="staggered-list-item skeleton skeleton-wave"
          style={{
            animationDelay: `${index * delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

// Image loading placeholder
export function ImageLoadingSkeleton({
  aspectRatio = '16/9',
  className = '',
  ...props
}) {
  return (
    <div
      className={`image-loading-skeleton skeleton skeleton-wave ${className}`}
      style={{ aspectRatio }}
      {...props}
    >
      <div className="image-loading-icon">🖼️</div>
    </div>
  );
}

// Search loading state
export function SearchLoadingState({
  searching = false,
  resultsCount = 0,
  className = '',
  ...props
}) {
  if (!searching) return null;

  return (
    <div className={`search-loading-state ${className}`} {...props}>
      <InlineLoading size={16} text="Searching" />
      {resultsCount > 0 && (
        <span className="search-results-count">
          {resultsCount} results found...
        </span>
      )}
    </div>
  );
}

// Upload progress
export function UploadProgress({
  uploading = false,
  progress = 0,
  fileName,
  onCancel,
  className = '',
  ...props
}: {
  uploading?: boolean;
  progress?: number;
  fileName?: string;
  onCancel?: () => void;
  className?: string;
}) {
  if (!uploading) return null;

  return (
    <div className={`upload-progress ${className}`} {...props}>
      <div className="upload-progress-header">
        <span className="upload-file-name">{fileName || 'Uploading...'}</span>
        {onCancel && (
          <button
            className="upload-cancel-button"
            onClick={onCancel}
            aria-label="Cancel upload"
          >
            ✕
          </button>
        )}
      </div>
      <LinearProgress variant="determinate" value={progress} />
      <div className="upload-progress-info">
        <span>{progress}%</span>
        <span>{progress < 100 ? 'Uploading...' : 'Complete'}</span>
      </div>
    </div>
  );
}

// Success state component
export function SuccessState({
  show = false,
  message = 'Success!',
  description,
  onClose,
  autoHideDuration = 3000, // eslint-disable-line @typescript-eslint/no-unused-vars
  className = '',
  ...props
}: {
  show?: boolean;
  message?: string;
  description?: string;
  onClose?: () => void;
  autoHideDuration?: number | null;
  className?: string;
}) {
  if (!show) return null;

  // Auto-hide logic would be implemented in the implementation file
  return (
    <div className={`success-state ${className}`} {...props}>
      <div className="success-icon">✓</div>
      <div className="success-content">
        <div className="success-message">{message}</div>
        {description && (
          <div className="success-description">{description}</div>
        )}
      </div>
      {onClose && (
        <button
          className="success-close"
          onClick={onClose}
          aria-label="Close success message"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// Error state component
export function ErrorState({
  show = false,
  error,
  onRetry,
  onDismiss,
  className = '',
  ...props
}: {
  show?: boolean;
  error?: { title?: string; message?: string; code?: string };
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}) {
  if (!show || !error) return null;

  return (
    <div className={`error-state ${className}`} {...props}>
      <div className="error-icon">⚠</div>
      <div className="error-content">
        <div className="error-title">{error.title || 'Error occurred'}</div>
        {error.message && <div className="error-message">{error.message}</div>}
        {error.code && (
          <div className="error-code">Error code: {error.code}</div>
        )}
      </div>
      <div className="error-actions">
        {onRetry && (
          <button className="error-retry" onClick={onRetry}>
            Retry
          </button>
        )}
        {onDismiss && (
          <button className="error-dismiss" onClick={onDismiss}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

// Loading state with timeout
export function LoadingTimeout({
  loading = true,
  timeout = 10000, // eslint-disable-line @typescript-eslint/no-unused-vars
  onTimeout, // eslint-disable-line @typescript-eslint/no-unused-vars
  timeoutMessage = 'This is taking longer than expected...',
  className = '',
  children,
  ...props
}: {
  loading?: boolean;
  timeout?: number;
  onTimeout?: () => void;
  timeoutMessage?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  // Timeout logic would be implemented in the implementation file
  if (!loading) return null;

  return (
    <div className={`loading-timeout ${className}`} {...props}>
      <CircularProgress size={40} />
      <div className="loading-timeout-message">{timeoutMessage}</div>
      {children}
    </div>
  );
}

// Progress with status messages
export function ProgressWithStatus({
  progress = 0,
  status,
  stages,
  className = '',
  ...props
}: {
  progress?: number;
  status?: string;
  stages?: Array<{ label: string; value: number }>;
  className?: string;
}) {
  return (
    <div className={`progress-with-status ${className}`} {...props}>
      <LinearProgress variant="determinate" value={progress} />
      <div className="progress-status">
        {status && <div className="progress-status-text">{status}</div>}
        <div className="progress-percentage">{progress}%</div>
      </div>
      {stages && (
        <div className="progress-stages">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`progress-stage ${progress >= stage.value ? 'complete' : ''}`}
            >
              <div className="progress-stage-marker" />
              <div className="progress-stage-label">{stage.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Optimistic update indicator
export function OptimisticUpdate({
  updating = false,
  message = 'Saving...',
  className = '',
  ...props
}) {
  if (!updating) return null;

  return (
    <div className={`optimistic-update ${className}`} {...props}>
      <CircularProgress size={14} className="optimistic-update-spinner" />
      <span className="optimistic-update-message">{message}</span>
    </div>
  );
}
