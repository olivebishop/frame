import { FrameExperience } from '@/components/showcase/frame-experience';
import { Intro, SiteFooter, SiteHeader } from '@/components/showcase/site';

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#watch">
        Skip to player
      </a>
      <SiteHeader />
      <main id="top">
        <Intro />
        <FrameExperience />
      </main>
      <SiteFooter />
    </>
  );
}
