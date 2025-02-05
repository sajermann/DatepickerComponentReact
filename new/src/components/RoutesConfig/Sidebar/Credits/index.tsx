import { Icons } from '~/components/Icons';

export function Credits() {
  return (
    <main className="border rounded-2xl p-5 text-sm flex flex-col gap-2">
      <p>🛠 by Bruno Sajermann</p>
      <div className="flex gap-2 items-center justify-center">
        <a
          className="hover:opacity-70 transition-opacity duration-300"
          href="https://www.linkedin.com/in/devbrunosajermann/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-9 h-9">
            <Icons nameIcon="linkedin" />
          </div>
        </a>
        <a
          className="hover:opacity-70 transition-opacity duration-300"
          href="https://github.com/sajermann"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-9 h-9">
            <Icons nameIcon="github" />
          </div>
        </a>
      </div>
    </main>
  );
}
