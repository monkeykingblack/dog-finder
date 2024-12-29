import type { Mock } from "vitest";

import { act, renderHook } from "@testing-library/react";
import { useDrag } from "@use-gesture/react";

import useSwipe from "../useSwipe";

vi.mock("@use-gesture/react", () => ({
  useDrag: vi.fn(),
}));

describe("useSwipe", () => {
  let mockOnUp: Mock;
  let mockOnDown: Mock;
  let mockOnLeft: Mock;
  let mockOnRight: Mock;

  beforeEach(() => {
    mockOnUp = vi.fn();
    mockOnDown = vi.fn();
    mockOnLeft = vi.fn();
    mockOnRight = vi.fn();

    vi.resetAllMocks();
  });

  it("should call onLeft when swipe left is detected", () => {
    const mockBind = vi.fn();
    (useDrag as Mock).mockImplementation(() => {
      return mockBind;
    });

    renderHook(() =>
      useSwipe({
        onLeft: mockOnLeft,
      }),
    );

    // Simulate a left swipe
    const mockHandler = (useDrag as Mock).mock.calls[0][0];
    act(() => {
      mockHandler({ last: true, vxvy: [-0.4, 0] }); // vx < -threshold
    });

    expect(mockOnLeft).toHaveBeenCalled();
    expect(mockOnLeft).toHaveBeenCalledTimes(1);
  });

  it("should call onRight when swipe right is detected", () => {
    const mockBind = vi.fn();
    (useDrag as Mock).mockImplementation(() => {
      return mockBind;
    });

    renderHook(() =>
      useSwipe({
        onRight: mockOnRight,
      }),
    );

    // Simulate a right swipe
    const mockHandler = (useDrag as Mock).mock.calls[0][0];
    act(() => {
      mockHandler({ last: true, vxvy: [0.4, 0] }); // vx > threshold
    });

    expect(mockOnRight).toHaveBeenCalled();
    expect(mockOnRight).toHaveBeenCalledTimes(1);
  });

  it("should not trigger any actions if the swipe is below the threshold", () => {
    const mockBind = vi.fn();
    (useDrag as Mock).mockImplementation(() => {
      return mockBind;
    });

    renderHook(() =>
      useSwipe({
        onUp: mockOnUp,
        onDown: mockOnDown,
        onLeft: mockOnLeft,
        onRight: mockOnRight,
      }),
    );

    // Simulate a swipe below the threshold
    const mockHandler = (useDrag as Mock).mock.calls[0][0];
    act(() => {
      mockHandler({ last: true, vxvy: [0.1, 0.1] }); // vx, vy < threshold
    });

    expect(mockOnUp).not.toHaveBeenCalled();
    expect(mockOnDown).not.toHaveBeenCalled();
    expect(mockOnLeft).not.toHaveBeenCalled();
    expect(mockOnRight).not.toHaveBeenCalled();
  });
});
