import type { Metadata } from "next";
import ContentLayout from "../ContentLayout";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact — PosSize",
  description: "Get in touch with the PosSize team with questions, feedback, or correction requests.",
};

const EMAIL = "hello@possize.com";

export default function Page() {
  return (
    <ContentLayout title="Contact">
      <p>
        We&apos;d love to hear from you. Whether you found a bug in a calculator, want to suggest a new tool, spotted an
        error in our content, or have a partnership inquiry — get in touch.
      </p>

      <h2>Email</h2>
      <p>
        <a
          href={`mailto:${EMAIL}`}
          className="font-mono"
          style={{ color: "var(--accent)" }}
        >
          {EMAIL}
        </a>
      </p>
      <p>We aim to reply within a few business days.</p>

      <h2>What to include</h2>
      <ul>
        <li>For a calculator issue: which tool, the inputs you used, and what you expected.</li>
        <li>For content corrections: the page and the specific line or figure.</li>
        <li>For partnerships or advertising: a short description of your proposal.</li>
      </ul>
    </ContentLayout>
  );
}
