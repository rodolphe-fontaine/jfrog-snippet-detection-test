// AI-STYLE REWRITE — same control flow as common Go retry/backoff patterns
// (e.g. cenkalti/backoff, hashicorp/go-retryablehttp) with renamed symbols.
package retry

import (
	"context"
	"errors"
	"time"
)

type Policy struct {
	BaseDelay time.Duration
	MaxDelay  time.Duration
	MaxTries  int
}

func WithExponentialBackoff(ctx context.Context, pol Policy, work func() error) error {
	if pol.BaseDelay <= 0 {
		pol.BaseDelay = 100 * time.Millisecond
	}
	if pol.MaxTries <= 0 {
		pol.MaxTries = 5
	}

	delay := pol.BaseDelay
	var lastErr error

	for attempt := 1; attempt <= pol.MaxTries; attempt++ {
		if err := ctx.Err(); err != nil {
			return err
		}

		lastErr = work()
		if lastErr == nil {
			return nil
		}

		if attempt == pol.MaxTries {
			break
		}

		timer := time.NewTimer(delay)
		select {
		case <-ctx.Done():
			timer.Stop()
			return ctx.Err()
		case <-timer.C:
		}

		delay *= 2
		if pol.MaxDelay > 0 && delay > pol.MaxDelay {
			delay = pol.MaxDelay
		}
	}

	return errors.Join(errors.New("retry budget exhausted"), lastErr)
}
