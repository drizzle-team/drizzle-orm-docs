export default (html: string): string => {
  // Добавляем rel="nofollow" и target="_blank" для внешних ссылок, если их нет
  const externalLinkPattern =
    /<a\s+(?![^>]*\brel=["']nofollow["'])([^>]*\bhref=["']https?:\/\/(?!(orm\.drizzle\.team|drizzle\.team)[^"']*)[^"']+["'][^>]*)>/gi;

  return (
    html
      .replace(externalLinkPattern, '<a $1 rel="nofollow">')
      // Добавляем target="_blank" для всех ссылок, если его нет
      .replace(/<a(?![^>]*\btarget=["'][^"']*["'])/gi, '<a target="_blank"')
  );
};
