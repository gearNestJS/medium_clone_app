import slug from 'slug';

export function generateSlug(title: string): string {
  return (
    slug(title, { lower: true, replacement: '-', trim: true }) +
    '-' +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  );
}
