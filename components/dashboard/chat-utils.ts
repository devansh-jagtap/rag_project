import type { Source } from "@/types/chat";

export function dedupeSources(sources: Source[] = []) {
  return Array.from(
    sources
      .reduce((sourceMap, source) => {
        if (!source.title || sourceMap.has(source.title)) return sourceMap;
        sourceMap.set(source.title, source);
        return sourceMap;
      }, new Map<string, Source>())
      .values(),
  );
}
