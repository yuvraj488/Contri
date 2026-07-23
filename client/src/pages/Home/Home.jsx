import PageWrapper from "../../components/layout/PageWrapper";

function Home() {
  return (
    <PageWrapper>
      <div className="rounded-xl border border-black p-8">
        <h1 className="text-4xl font-bold">
          React Router Working ✅
        </h1>

        <p className="mt-4">
          This page confirms that routing and PageWrapper are working together.
        </p>
      </div>
    </PageWrapper>
  );
}

export default Home;