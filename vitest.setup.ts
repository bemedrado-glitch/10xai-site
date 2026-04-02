import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) =>
    React.createElement("img", { alt, src, ...props }),
}));

vi.mock("next/font/google", () => {
  const mockFont = () => ({
    className: "",
    variable: "",
    style: { fontFamily: "MockFont" },
  });

  return {
    IBM_Plex_Mono: mockFont,
    Plus_Jakarta_Sans: mockFont,
    Space_Grotesk: mockFont,
  };
});
