import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol =
    headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
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
