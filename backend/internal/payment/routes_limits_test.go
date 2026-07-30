package payment

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/DouDOU-start/airgate-epay/backend/internal/payment/provider"
)

func TestHandleListMethodsReturnsRechargeLimits(t *testing.T) {
	p := &Plugin{svc: &Service{
		registry:  provider.NewRegistry(),
		minAmount: 50,
		maxAmount: 10000,
	}}
	recorder := httptest.NewRecorder()

	p.handleListMethods(recorder, httptest.NewRequest(http.MethodGet, "/user/methods", nil))

	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
	var got struct {
		Configured bool    `json:"configured"`
		MinAmount  float64 `json:"min_amount"`
		MaxAmount  float64 `json:"max_amount"`
	}
	if err := json.NewDecoder(recorder.Body).Decode(&got); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if !got.Configured {
		t.Fatal("configured = false, want true")
	}
	if got.MinAmount != 50 {
		t.Fatalf("min_amount = %v, want 50", got.MinAmount)
	}
	if got.MaxAmount != 10000 {
		t.Fatalf("max_amount = %v, want 10000", got.MaxAmount)
	}
}

func TestHandleListMethodsReturnsDefaultLimitsWhenUnconfigured(t *testing.T) {
	recorder := httptest.NewRecorder()

	new(Plugin).handleListMethods(recorder, httptest.NewRequest(http.MethodGet, "/user/methods", nil))

	var got struct {
		Configured bool    `json:"configured"`
		MinAmount  float64 `json:"min_amount"`
		MaxAmount  float64 `json:"max_amount"`
	}
	if err := json.NewDecoder(recorder.Body).Decode(&got); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if got.Configured {
		t.Fatal("configured = true, want false")
	}
	if got.MinAmount != 1 || got.MaxAmount != 10000 {
		t.Fatalf("limits = %v..%v, want 1..10000", got.MinAmount, got.MaxAmount)
	}
}
