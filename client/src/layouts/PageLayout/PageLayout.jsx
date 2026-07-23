function PageLayout({ children, className = "" }) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div
        className={`
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          px-6
          md:px-10
          lg:px-14
          xl:px-20
          ${className}
        `}
      >
        {children}
      </div>
    </main>
  );
}

export default PageLayout;