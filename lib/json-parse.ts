export function ParseJSON(str: string) {
  try {
    if (!str) return;

    const parsedContent = JSON.parse(str);

    return parsedContent[0]?.content[0]?.text;
  } catch (error) {
    console.log(error);
  }
}
