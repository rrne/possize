import type { Metadata } from "next";
import ContentLayout from "../ContentLayout";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy" },
  title: "Privacy Policy — PosSize",
  description:
    "How PosSize handles data, cookies and third-party advertising. All calculations run locally in your browser.",
};

export default function Page() {
  return (
    <ContentLayout title="Privacy Policy" updated="June 26, 2026">
      <p>
        PosSize (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website at possize.com. This Privacy
        Policy explains what information is collected when you use our trading calculators and how it is used. By using
        the site you agree to the practices described here.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        <strong>Calculator inputs.</strong> Every calculation on PosSize runs entirely in your browser. The numbers you
        type into our calculators (account balance, prices, risk, etc.) are never transmitted to or stored on our
        servers. We have no access to them.
      </p>
      <p>
        <strong>We do not require accounts.</strong> PosSize has no signup, no login, and we do not ask for your name,
        email, or any personal identifier to use the tools.
      </p>

      <h2>2. Cookies and analytics</h2>
      <p>
        We use <strong>Cloudflare Web Analytics</strong>, a privacy-first analytics tool that measures aggregate traffic
        (page views, referrers, country) without using cookies and without fingerprinting individual visitors.
      </p>
      <p>
        We also serve ads through <strong>Google AdSense</strong>. Third-party vendors, including Google, use cookies to
        serve ads based on your prior visits to this and other websites.
      </p>

      <h2>3. Google AdSense &amp; third-party advertising</h2>
      <ul>
        <li>
          Google, as a third-party vendor, uses cookies to serve ads on this site. Google&apos;s use of advertising
          cookies enables it and its partners to serve ads to you based on your visit to this and/or other sites.
        </li>
        <li>
          You may opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          You can also opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            www.aboutads.info
          </a>
          .
        </li>
      </ul>

      <h2>4. Affiliate links</h2>
      <p>
        Some links on PosSize may be affiliate links to third-party brokers or services. If you open an account or make
        a purchase through these links, we may earn a commission at no extra cost to you. This does not influence the
        impartiality of our calculators or content.
      </p>

      <h2>5. Children&apos;s privacy</h2>
      <p>
        PosSize is not directed to children under 13, and we do not knowingly collect personal information from
        children.
      </p>

      <h2>6. Your consent &amp; changes</h2>
      <p>
        By using PosSize, you consent to this Privacy Policy. We may update it from time to time; changes are posted on
        this page with a new &quot;last updated&quot; date.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about this policy? Reach us via our <a href="/contact">contact page</a>.
      </p>
    </ContentLayout>
  );
}
