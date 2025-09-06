import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, GmailIcon, LinkedInIcon, XIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/iadithyana/", icon: LinkedInIcon },
    { name: "GitHub", url: "https://github.com/AdithyanA2005/", icon: GitHubIcon },
    { name: "Gmail", url: "mailto:deepaadithyan56@gmail.com", icon: GmailIcon },
    { name: "X", url: "https://x.com/iadithyana/", icon: XIcon },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/images/adithyan.png"
              alt="Portrait of Adithyan A"
              width={56}
              height={56}
              className="ring-border h-14 w-14 rounded-full object-cover ring-2"
            />
            <div className="space-y-1">
              <p className="text-foreground text-sm font-medium">
                CoderCodes - <i>By Adithyan A</i>
              </p>
              <p className="text-muted-foreground text-xs">© {year} Adithyan A. All rights reserved.</p>
            </div>
          </div>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-4">
              {socials?.map((social) => (
                <li key={social.name}>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-primary focus-visible:ring-ring inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2"
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.icon />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="bg-muted/60 border-t">
        <div className="mx-auto w-full max-w-5xl px-4 py-3">
          <p className="text-foreground text-center text-sm">
            {"Developed by "}
            <Link
              href="https://adithyana.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary font-mono underline underline-offset-4"
              aria-label="Visit Adithyan A portfolio"
            >
              {"<Adithyan A/>"}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
