import { describe, it, expect } from "vitest";
import authReducer, { defaultAuthState, setAuth } from "../authSlice";

describe("authSlice", () => {
  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(
      defaultAuthState
    );
  });

  it("should handle setAuth", () => {
    const initialState = { ...defaultAuthState };
    const newAuthState = true;

    const newState = authReducer(initialState, setAuth(newAuthState));

    expect(newState.authState).toBe(newAuthState);
  });
});
