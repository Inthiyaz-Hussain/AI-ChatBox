export async function streamResponse(
  text: string,
  onChunk: (value: string) => void,
  speed = 15,
): Promise<void> {
  let current = "";

  for (const char of text) {
    current += char;
    onChunk(current);

    await new Promise((resolve) => setTimeout(resolve, speed));
  }
}
