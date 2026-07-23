import PageLayout from "../PageLayout/PageLayout";
import { Card, Logo } from "../../components/ui";

function AuthLayout({
  children,
  title = "Money mess, made easy.",
}) {
  return (
    <PageLayout className="flex min-h-screen">

      {/* Left Section */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-center pl-8 xl:pl-12">

        <Logo size="lg" />

        <h1 className="mt-10 text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--text)]">
          TRACK.
          <br />
          SPLIT.
          <br />
          SETTLE.
        </h1>

        <p className="mt-6 max-w-md text-lg leading-8 text-gray-500">
          {title}
        </p>

        {/* Doodle comes here later */}

      </section>

      {/* Right Section */}
      <section className="flex w-full lg:w-1/2 items-center justify-center py-12">

        <Card className="w-full max-w-md">
          {children}
        </Card>

      </section>

    </PageLayout>
  );
}

export default AuthLayout;