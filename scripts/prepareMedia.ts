import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { containWithin } from "./mediaLayout";

const root = process.cwd();
const sourceDirectory = join(root, "assets", "media", "source");
const supplementaryDirectory = join(
  root,
  "assets",
  "media",
  "supplementary",
);
const publicDirectory = join(root, "public", "media");

type ResponsiveOptions = {
  source: string;
  output: string;
  widths: number[];
  trim?: boolean;
};

async function ensureParent(path: string) {
  await mkdir(dirname(path), { recursive: true });
}

async function writeResponsive({
  source,
  output,
  widths,
  trim = false,
}: ResponsiveOptions) {
  await Promise.all(
    widths.flatMap((width) => {
      const base = sharp(source, { failOn: "none" }).rotate();
      const prepared = trim ? base.trim() : base;
      const resized = prepared.resize({
        width,
        withoutEnlargement: true,
      });
      return [
        (async () => {
          const path = join(
            publicDirectory,
            `${output}-${width}.webp`,
          );
          await ensureParent(path);
          await resized.clone().webp({ quality: 82 }).toFile(path);
        })(),
        (async () => {
          const path = join(
            publicDirectory,
            `${output}-${width}.avif`,
          );
          await ensureParent(path);
          await resized.clone().avif({ quality: 55 }).toFile(path);
        })(),
      ];
    }),
  );
}

async function writeAudienceCrop(
  source: string,
  output: string,
  width: number,
  height: number,
) {
  await Promise.all(
    (["webp", "avif"] as const).map(async (format) => {
      const path = join(
        publicDirectory,
        `${output}-${width}x${height}.${format}`,
      );
      await ensureParent(path);
      const image = sharp(source, { failOn: "none" })
        .rotate()
        .resize(width, height, {
          fit: "cover",
          position: sharp.strategy.attention,
        });
      if (format === "webp") {
        await image.webp({ quality: 84 }).toFile(path);
      } else {
        await image.avif({ quality: 58 }).toFile(path);
      }
    }),
  );
}

async function writeOpenGraph() {
  const width = 1200;
  const height = 630;
  const texture = join(
    supplementaryDirectory,
    "cinematic-aperture-texture.png",
  );
  const cutout = join(
    supplementaryDirectory,
    "damon-hero-cutout.png",
  );
  const output = join(publicDirectory, "social", "damon-v3-og.jpg");
  await ensureParent(output);

  const portraitSize = containWithin({
    sourceWidth: 1365,
    sourceHeight: 2048,
    maxWidth: 515,
    maxHeight: 615,
  });
  const portrait = await sharp(cutout)
    .resize({
      width: portraitSize.width,
      height: portraitSize.height,
      fit: "contain",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();
  const text = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .label { fill: #8c9299; font: 700 20px Arial, sans-serif; letter-spacing: 4px; }
      .title { fill: #f4f0e8; font: 900 88px Arial Narrow, Arial, sans-serif; letter-spacing: -2px; }
      .accent { fill: #2d6bff; }
      .name { fill: #f4f0e8; font: 600 28px Arial, sans-serif; }
    </style>
    <text x="72" y="102" class="label">MOTIVATIONAL SPEAKER · ENTREPRENEUR · VISUAL STORYTELLER</text>
    <text x="68" y="260" class="title">DESTINED TO</text>
    <text x="68" y="350" class="title accent">VENTURE.</text>
    <text x="72" y="430" class="name">DAMON J. YOUNG JR.</text>
  </svg>`);

  await sharp(texture)
    .resize(width, height, { fit: "cover" })
    .composite([
      {
        input: portrait,
        left: width - portraitSize.width,
        top: height - portraitSize.height,
      },
      { input: text, left: 0, top: 0 },
    ])
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toFile(output);
}

async function prepareMedia() {
  await rm(publicDirectory, { recursive: true, force: true });
  await mkdir(publicDirectory, { recursive: true });

  const responsiveJobs: ResponsiveOptions[] = [
    {
      source: join(supplementaryDirectory, "damon-hero-cutout.png"),
      output: "damon/damon-hero-cutout",
      widths: [480, 768, 1100],
    },
    {
      source: join(sourceDirectory, "md-002-damon-camera-outdoors.jpg"),
      output: "damon/damon-camera-outdoors",
      widths: [720, 1200, 1800],
    },
    {
      source: join(
        sourceDirectory,
        "md-003-damon-photographing-athlete.jpg",
      ),
      output: "damon/damon-photographing-athlete",
      widths: [640, 1000, 1500],
    },
    {
      source: join(
        supplementaryDirectory,
        "cinematic-aperture-texture.png",
      ),
      output: "textures/cinematic-aperture",
      widths: [960, 1600, 2400],
    },
    {
      source: join(
        supplementaryDirectory,
        "film-light-leak-texture.png",
      ),
      output: "textures/film-light-leak",
      widths: [960, 1600, 2400],
    },
    {
      source: join(sourceDirectory, "md-006-dtv-camera-mark.png"),
      output: "logos/dtv-camera-mark",
      widths: [64, 128, 256],
      trim: true,
    },
    {
      source: join(sourceDirectory, "md-007-dtv-studio-white.png"),
      output: "logos/dtv-studio-white",
      widths: [180, 360],
      trim: true,
    },
    {
      source: join(sourceDirectory, "md-008-dtv-studio-black.png"),
      output: "logos/dtv-studio-black",
      widths: [180, 360],
      trim: true,
    },
  ];

  const portfolioSources = [
    ["md-004-graduate-library.jpg", "graduate-library"],
    ["md-005-athlete-green-smoke.png", "athlete-green-smoke"],
    ["md-009-creative-group-black-suits.jpg", "group-black-suits"],
    ["md-010-creative-yellow-pages.jpg", "creative-yellow-pages"],
    ["md-011-creative-overhead-pages.jpg", "creative-overhead-pages"],
    ["md-012-athlete-red-smoke.jpg", "athlete-red-smoke"],
    ["md-013-graduate-cap-portrait.jpg", "graduate-cap"],
    ["md-014-graduate-red-vehicle.jpg", "graduate-red-vehicle"],
    ["md-015-portrait-red-stage.jpg", "portrait-red-stage"],
    ["md-016-portrait-red-roses.jpg", "portrait-red-roses"],
    ["md-017-fashion-black-leather.jpg", "fashion-black-leather"],
    ["md-018-event-bride-guests.jpg", "event-bride-guests"],
    ["md-019-sports-media-day-montage.jpg", "sports-media-day"],
  ] as const;

  await Promise.all([
    ...responsiveJobs.map(writeResponsive),
    ...portfolioSources.map(([filename, output]) =>
      writeResponsive({
        source: join(sourceDirectory, filename),
        output: `portfolio/${output}`,
        widths: [720, 1400],
      }),
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-004-graduate-library.jpg"),
      "portfolio/audience-schools",
      1200,
      800,
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-005-athlete-green-smoke.png"),
      "portfolio/audience-athletes",
      1200,
      800,
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-010-creative-yellow-pages.jpg"),
      "portfolio/audience-creatives",
      1200,
      800,
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-009-creative-group-black-suits.jpg"),
      "portfolio/audience-organizations",
      1200,
      800,
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-004-graduate-library.jpg"),
      "portfolio/audience-schools-mobile",
      720,
      900,
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-005-athlete-green-smoke.png"),
      "portfolio/audience-athletes-mobile",
      720,
      900,
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-010-creative-yellow-pages.jpg"),
      "portfolio/audience-creatives-mobile",
      720,
      900,
    ),
    writeAudienceCrop(
      join(sourceDirectory, "md-009-creative-group-black-suits.jpg"),
      "portfolio/audience-organizations-mobile",
      720,
      900,
    ),
    writeOpenGraph(),
  ]);

  const originalCutout = join(
    publicDirectory,
    "damon",
    "damon-hero-cutout.png",
  );
  await ensureParent(originalCutout);
  await cp(
    join(supplementaryDirectory, "damon-hero-cutout.png"),
    originalCutout,
  );
}

await prepareMedia();
