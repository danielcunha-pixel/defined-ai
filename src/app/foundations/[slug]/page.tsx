import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocs } from "@/lib/mdx";
import { MdxRenderer } from "@/components/docs/MdxRenderer";
import { TypographySpecimen } from "@/components/docs/TypographySpecimen";
import { IconGallery } from "@/components/docs/IconGallery";

export async function generateStaticParams() {
  const docs = getAllDocs("foundations");
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug("foundations", slug);
  if (!doc) return {};
  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function FoundationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug("foundations", slug);

  if (!doc) {
    notFound();
  }

  return (
    <article>
      {/* Page header */}
      <div className="mb-8 border-b border-grey-10 pb-6">
        <div className="mb-2 inline-block rounded-full bg-blue-10 px-2.5 py-0.5 ds-text-body-sm font-medium text-blue-70">
          Foundation
        </div>
        <h1 className="ds-text-heading-xl font-semibold text-grey-100 mb-2">
          {doc.meta.title}
        </h1>
        <p className="ds-text-body-lg font-regular text-grey-60">
          {doc.meta.description}
        </p>
      </div>

      {/* MDX intro content */}
      <MdxRenderer source={doc.content} />

      {/* Slug-specific visual content */}
      {slug === "typography" && (
        <div className="mt-10">
          <TypographySpecimen />
        </div>
      )}
      {slug === "icons" && (
        <div className="mt-10">
          <IconGallery />
        </div>
      )}
    </article>
  );
}
