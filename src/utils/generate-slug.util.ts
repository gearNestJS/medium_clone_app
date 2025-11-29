import slugify from 'slugify';

export function generateSlug(title: string): string {
  return (
    slugify(title, { lower: true }) +
    '-' +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  );
}
