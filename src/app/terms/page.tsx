import type { Metadata } from "next";
import ContentLayout from "../ContentLayout";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Use — PosSize",
  description:
    "The terms governing your use of PosSize trading calculators. Tools are provided for educational purposes only.",
};

export default function Page() {
  return (
    <ContentLayout title="Terms of Use" updated="June 26, 2026">
      <p>
        These Terms of Use govern your access to and use of possize.com (the &quot;Site&quot;). By using the Site you
        agree to these terms. If you do not agree, please do not use the Site.
      </p>

      <h2>1. Educational use only</h2>
      <p>
        PosSize provides free calculators and informational content for educational purposes. Nothing on the Site
        constitutes financial, investment, tax, or legal advice, or a recommendation to buy or sell any security,
        currency, or other financial instrument. See our <a href="/disclaimer">Risk Disclaimer</a> for details.
      </p>

      <h2>2. No warranty</h2>
      <p>
        The Site and its calculators are provided &quot;as is&quot; without warranties of any kind, express or implied.
        While we strive for accuracy, we do not guarantee that any calculation, formula, or content is error-free,
        complete, or suitable for your situation. You are responsible for verifying any result before relying on it.
      </p>

      <h2>3. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, PosSize and its operators are not liable for any loss or damage —
        including trading losses — arising from your use of, or reliance on, the Site or its calculators.
      </p>

      <h2>4. Acceptable use</h2>
      <p>
        You agree not to misuse the Site, including attempting to disrupt it, scrape it at scale, reverse-engineer it,
        or use it for any unlawful purpose.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The Site&apos;s design, text, and original content are the property of PosSize. You may use the calculators
        freely for personal trading decisions but may not republish the content as your own.
      </p>

      <h2>6. Third-party links &amp; ads</h2>
      <p>
        The Site displays third-party advertising and may contain affiliate links. We are not responsible for the
        content, products, or practices of third-party sites.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may revise these terms at any time. Continued use of the Site after changes constitutes acceptance of the
        updated terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions? Visit our <a href="/contact">contact page</a>.
      </p>
    </ContentLayout>
  );
}
