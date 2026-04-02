import { metadata } from "./layout";
import robots from "./robots";
import sitemap from "./sitemap";

describe("metadata exports", () => {
  it("exposes the expected site metadata", () => {
    expect(metadata.title).toBe("10XAI | AI Operating Systems For SMBs");
    expect(metadata.description).toContain("small and mid-sized businesses");
    expect(metadata.openGraph?.url).toBe("https://10xai.us");
  });

  it("returns the expected robots configuration", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://10xai.us/sitemap.xml",
      host: "https://10xai.us",
    });
  });

  it("returns the expected sitemap entry", () => {
    const result = sitemap();

    expect(result).toHaveLength(2);
    expect(result[0]?.url).toBe("https://10xai.us");
    expect(result[0]?.changeFrequency).toBe("weekly");
    expect(result[0]?.priority).toBe(1);
    expect(result[0]?.lastModified).toBeInstanceOf(Date);
    expect(result[1]?.url).toBe("https://10xai.us/book");
    expect(result[1]?.priority).toBe(0.8);
  });
});
