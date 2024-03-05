export default defineEventHandler(async (event) => {
  if (
    event.path.startsWith('/api/signup') ||
    event.path.startsWith('/api/signin')
  ) {
    const { email, password } = await readBody<{
      email: string;
      password: string;
    }>(event);

    setCookie(event, 'credentials', JSON.stringify({ email, password }), {
      maxAge: 365 * 24,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  }
});
