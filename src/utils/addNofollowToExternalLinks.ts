export default (html: string): string => {
  const externalLinkPattern =
    /<a\s+(?![^>]*\brel=["']nofollow["'])([^>]*\bhref=["']https?:\/\/[^"']+["'][^>]*)>/gi;
  return html.replace(externalLinkPattern, '<a $1 rel="nofollow">');
};
