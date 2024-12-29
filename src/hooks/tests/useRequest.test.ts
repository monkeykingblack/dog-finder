import { act, renderHook, waitFor } from "@testing-library/react";
import { expect } from "vitest";

import useRequest from "../useRequest";

const TEST_DATA = {
  id: "BkIEhN3pG",
  url: "",
  width: 912,
  height: 1024,
  mime_type: "image/jpeg",
  breeds: [
    {
      id: 10,
      name: "American Bulldog",
    },
  ],
  categories: [],
  breed_ids: "10",
};

describe("useRequest", () => {
  it("Data returned should equal to TEST_DATA", async () => {
    const request = () => new Promise((resolve) => resolve(TEST_DATA));
    const { result } = renderHook(() =>
      useRequest(request, { immediate: false }),
    );

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    act(() => {
      result.current.run();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual(TEST_DATA);
      expect(result.current.loading).toBe(false);
    });
  });
});
