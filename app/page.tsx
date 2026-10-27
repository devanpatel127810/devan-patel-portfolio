import Nav from "@/components/Nav";
import Film from "@/components/motion/Film";
import Details from "@/components/Details";
import ProgressRail from "@/components/motion/ProgressRail";
import KeyboardShortcuts from "@/components/motion/KeyboardShortcuts";
import { profile } from "@/lib/data";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Forward Deployed Engineer",
  worksFor: { "@type": "Organization", name: "Deloitte" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  email: `mailto:${profile.email}`,
  url: "https://devan-patel-portfolio.vercel.app",
  sameAs: [profile.linkedin, profile.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Texas A&M University" },
};

/**
 * DRONE FILM page (rebuild, Oct 26): one continuous flight (Film)
 * followed by the complete plain-flow record (Details). The nav
 * anchors (#garage … #contact) land on the details sections; the
 * rail flies the drone between film shots.
 */
export default function Home() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <KeyboardShortcuts />
      <Nav />
      <ProgressRail />
      <Film />
      <Details />
    </main>
  );
}
