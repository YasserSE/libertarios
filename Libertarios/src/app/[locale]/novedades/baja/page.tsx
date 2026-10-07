import type { Metadata } from "next";
import { NewsletterTokenPage } from "../NewsletterTokenPage";
import { tokenPageMetadata } from "../metadata";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return tokenPageMetadata(locale, "unsubscribe");
}

export default async function BajaPage({ params, searchParams }: Props) {
  const { locale } = await params;
  return <NewsletterTokenPage locale={locale} kind="unsubscribe" searchParams={await searchParams} />;
}
