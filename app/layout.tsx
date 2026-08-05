import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const DEFAULT_HOST = "localhost:3000";
const HOST_PATTERN = /^[a-z0-9.-]+(:\d{1,5})?$/i;

function safeHost(value: string | null): string | null {
  if (!value) return null;
  const host = value.split(",")[0].trim();
  return HOST_PATTERN.test(host) ? host : null;
}

function safeProtocol(value: string | null, host: string): "http" | "https" {
  const protocol = value?.split(",")[0].trim().toLowerCase();
  if (protocol === "http" || protocol === "https") return protocol;
  return host.startsWith("localhost") ? "http" : "https";
}

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host =
    safeHost(headerList.get("x-forwarded-host")) ??
    safeHost(headerList.get("host")) ??
    DEFAULT_HOST;
  const protocol = safeProtocol(headerList.get("x-forwarded-proto"), host);
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: "Atlas del gesto — Lenguaje corporal en Peaky Blinders",
    description:
      "Archivo visual de miradas, posturas, voces y distancias que caracterizan a los personajes a lo largo de seis temporadas.",
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      title: "Atlas del gesto",
      description: "El cuerpo también cuenta la historia.",
      type: "website",
      images: [{ url: socialImage, width: 1736, height: 909, alt: "Atlas del gesto" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Atlas del gesto",
      description: "El cuerpo también cuenta la historia.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
