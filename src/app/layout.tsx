import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Dialog from "@/components/Dialog";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        template: "%s | LGJT.XYZ",
        default: "LGJT.XYZ",
    },
    description: "A open source url shortener tool with no ads",
    authors: [
        { name: "Johannes Thorén", url: "https://github.com/JohannesThoren" },
    ],
    keywords: [
        "url",
        "short url",
        "url shortener",
        "lgjt",
        "Johannes Thorén",
        "no ads",
    ],
    openGraph: {
        title: {
            template: "%s | LGJT.XYZ",
            default: "LGJT.XYZ",
        },
        description: "A open source url shortener tool with no ads",
    },
    robots: "index, follow",
    twitter: {
        title: {
            template: "%s | LGJT.XYZ",
            default: "LGJT.XYZ",
        },
        description: "A open source url shortener tool with no ads",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-stone-900 bg-stone-100 flex flex-grow h-screen flex-col`}
            >
                <main className="grid items-center justify-items-center h-full overflow-auto dark:bg-stone-900 bg-stone-100 w-full p-5">
                    {children}
                </main>
                <footer className="p-2 flex justify-between">
                    <p>Copyright &copy; 2024 Johannes Thorén</p>
                    <div className="flex justify-between [&>*]:mx-1">
                        <Dialog button={<button>About</button>}>
                            <>
                                <h2 className="text-2xl">About</h2>
                                <p>
                                    This is a url shortener made only for fun.
                                    It is open source and all code can be found
                                    on my (Johannes Thorén) github page. Due to
                                    it being in active development, all data and
                                    links may be deleted or replaced.
                                </p>
                                <h2 className="text-2xl">Malicious link</h2>
                                <p>
                                    This Url shortener is not moderated actively
                                    but feel free to contact me if you get sent
                                    of find a malicious link. Contact info can
                                    be found{" "}
                                    <a
                                        className="text-blue-500 underline"
                                        href="http://lgjt.xyz/contact"
                                    >
                                        Here
                                    </a>
                                </p>
                            </>
                        </Dialog>
                        <Link
                            className="dark:text-stone-700 text-stone-300"
                            href={"/admin"}
                        >
                            Admin Page
                        </Link>
                    </div>
                </footer>
            </body>
        </html>
    );
}
