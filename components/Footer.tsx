import { company } from "@/data/site-content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <span className="text-sm font-medium text-gray-dim">
          {company.name.toUpperCase()}
        </span>
        <span className="text-xs text-gray-dim">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
