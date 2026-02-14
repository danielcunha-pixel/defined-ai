import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface DocMeta {
  title: string;
  description: string;
  slug: string;
  section: string;
}

export interface Doc {
  meta: DocMeta;
  content: string;
}

export function getDocBySlug(section: string, slug: string): Doc | null {
  const filePath = path.join(contentDirectory, section, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      title: data.title || slug,
      description: data.description || "",
      slug,
      section,
    },
    content,
  };
}

export function getAllDocs(section: string): DocMeta[] {
  const dirPath = path.join(contentDirectory, section);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fileContent = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title || slug,
      description: data.description || "",
      slug,
      section,
    };
  });
}

export function getDocContent(filePath: string): Doc | null {
  const fullPath = path.join(contentDirectory, filePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);
  const slug = path.basename(filePath, ".mdx");
  const section = path.dirname(filePath);

  return {
    meta: {
      title: data.title || slug,
      description: data.description || "",
      slug,
      section,
    },
    content,
  };
}

// Generate search index from all MDX files
export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  section: string;
  headings: string[];
  body: string;
}

export function generateSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const sections = ["components", "foundations"];

  for (const section of sections) {
    const docs = getAllDocs(section);
    for (const doc of docs) {
      const fullDoc = getDocBySlug(section, doc.slug);
      if (!fullDoc) continue;

      // Extract headings from MDX content
      const headingRegex = /^#{1,6}\s+(.+)$/gm;
      const headings: string[] = [];
      let match;
      while ((match = headingRegex.exec(fullDoc.content)) !== null) {
        headings.push(match[1]);
      }

      // Strip MDX/JSX for body text
      const body = fullDoc.content
        .replace(/<[^>]+>/g, "")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/^#{1,6}\s+.+$/gm, "")
        .replace(/\n{2,}/g, "\n")
        .trim()
        .substring(0, 500);

      entries.push({
        title: doc.title,
        description: doc.description,
        href: `/${section}/${doc.slug}`,
        section,
        headings,
        body,
      });
    }
  }

  return entries;
}
