import { signInAction } from "@/app/actions";
import { createClient } from "@/lib/__mocks__/supabase"; // Mock Supabase

jest.mock("@/lib/supabase"); // Mock Supabase
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe("signInAction", () => {
  let supabaseMock: any;

  beforeEach(() => {
    supabaseMock = {
      auth: {
        signInWithPassword: jest.fn(),
      },
    };
    (createClient as jest.Mock).mockReturnValue(supabaseMock);
  });

  it("should redirect to /protected on successful login", async () => {
    supabaseMock.auth.signInWithPassword.mockResolvedValueOnce({ error: null });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");

    const result = await signInAction(formData);
    expect(result).toEqual(expect.objectContaining({ status: 302, headers: expect.anything() }));
  });

  it("should return an error message on failed login", async () => {
    supabaseMock.auth.signInWithPassword.mockResolvedValueOnce({
      error: { message: "Invalid credentials" },
    });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "wrongpassword");

    const result = await signInAction(formData);
    expect(result).toEqual(expect.stringContaining("/sign-in"));
  });
});
