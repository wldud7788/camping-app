import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import Providers from "@/utils/providers/providers";
import { UserStoreProvider } from "@/utils/providers/userStoreProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "불멍스팟 - 초보 캠퍼를 위한 캠핑 가이드 및 모임 플랫폼",
  description:
    "초보 캠퍼를 위한 캠핑 가이드를 제공하며, 캠핑 모임을 생성할 수 있는 편리한 앱입니다. 지역별 캠핑장 검색과 해당 지역의 날씨 정보를 확인하여 완벽한 캠핑 계획을 세워보세요!",
    openGraph: {
      title: "불멍스팟 - 초보 캠퍼를 위한 캠핑 가이드 및 모임 플랫폼",
      description: "초보 캠퍼를 위한 캠핑 가이드를 제공하며, 캠핑 모임을 생성할 수 있는 편리한 앱입니다. 지역별 캠핑장 검색과 해당 지역의 날씨 정보를 확인하여 완벽한 캠핑 계획을 세워보세요!",
    },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user }
  } = await createClient().auth.getUser();
  return (
    <html lang="en"  
     className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
      {/* zustand provider */}
      <UserStoreProvider isUser={!!user}>
        {/* tanstack provider */}
        <Providers>
          <main className="min-h-screen flex flex-col items-center pt-28">
            {children}
          </main>
        </Providers>
        </UserStoreProvider>
      </body>
    </html>
  );
}
