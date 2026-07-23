function PageWrapper({ children }) {
  return (
    <main className="min-h-screen bg-white">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-6
          sm:px-6
          md:px-8
          lg:px-10
          xl:px-12
        "
      >
        {children}
      </div>
    </main>
  );
}

export default PageWrapper;