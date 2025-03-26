export default function ErrorPage() {
  return (
    <main className="min-h-screen-minus-20 w-full grid place-content-center p-2">
      <h1 className="text-4xl text-white text-center mb-4">
        Authentication Error
      </h1>
      <p className="text-white text-center">
        There was a problem signing in with Google. Please try again or contact
        support if the issue persists.
      </p>
    </main>
  );
}
