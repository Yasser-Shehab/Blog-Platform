export const createClient = jest.fn(() => ({
  auth: {
    signInWithPassword: jest.fn(),
  },
}));
