import { chaptersVtt, films, getFilm } from '@/lib/catalog';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return films.filter((film) => film.chapters.length).map((film) => ({ slug: film.slug }));
}

/** WebVTT `kind="chapters"` track for a film, generated from the catalog. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film?.chapters.length) return new Response('Not found', { status: 404 });

  return new Response(chaptersVtt(film), {
    headers: { 'Content-Type': 'text/vtt; charset=utf-8' },
  });
}
