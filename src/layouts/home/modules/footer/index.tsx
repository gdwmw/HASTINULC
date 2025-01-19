import Link from "next/link";
import { FC, ReactElement } from "react";

export const Footer: FC = (): ReactElement => (
  <footer className="mt-24 flex w-full justify-between bg-rose-300 px-10 py-5 text-xs text-white">
    <section>
      <p>&copy; 2025 Hastinulc Makeup Art, All rights reserved.</p>
    </section>

    <section>
      <ul className="flex gap-5">
        <li>
          <Link href={""}>Terms of Service</Link>
        </li>
        <li>
          <Link href={""}>Privacy Policy</Link>
        </li>
        <li>
          <Link href={""}>Manage Cookies</Link>
        </li>
      </ul>
    </section>
  </footer>
);
