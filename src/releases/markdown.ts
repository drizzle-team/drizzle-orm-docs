function convertProse(source: string): string {
  return source
    .replace(/^import[ \t].+$/gm, "")
    .replace(/^[ \t]*<\/?Section>[ \t]*$/gm, "")
    .replace(
      /<(Npm|Npx)>\s*([\s\S]*?)\s*<\/\1>/g,
      (_, component: string, body: string) => {
        const command = component === "Npm" ? "npm i" : "npx";
        const commands = body
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => `${command} ${line.replaceAll("—", "--")}`);

        return `\n\`\`\`shell\n${commands.join("\n")}\n\`\`\`\n`;
      },
    );
}

function convertUnfencedContent(source: string): string {
  const inlineCode = /(`+)[\s\S]*?\1(?!`)/g;
  let result = "";
  let offset = 0;

  for (const match of source.matchAll(inlineCode)) {
    result += convertProse(source.slice(offset, match.index)) + match[0];
    offset = match.index + match[0].length;
  }

  return result + convertProse(source.slice(offset));
}

/** Converts the releases's Section, Npm, and Npx components without changing code examples. */
export function toReleaseMarkdownBody(source: string): string {
  let fence = "";
  let prose = "";
  let result = "";

  for (const line of source.split(/(?<=\n)/)) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);

    if (fence) {
      result += line;

      if (
        marker &&
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length &&
        line.slice(marker[0].length).trim() === ""
      ) {
        fence = "";
      }
    } else if (marker) {
      result += convertUnfencedContent(prose) + line;
      prose = "";
      fence = marker[1];
    } else {
      prose += line;
    }
  }

  return (result + convertUnfencedContent(prose)).trim();
}
