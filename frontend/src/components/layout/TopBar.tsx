import { UserMenu } from './UserMenu';

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between gap-4 border-b border-outline-variant bg-surface px-6 md:px-10">
      <h1 className="truncate font-headline-md text-[20px] leading-[28px] font-bold tracking-[-0.01em] text-on-surface md:text-[24px] md:leading-[32px]">
        {title}
      </h1>
      <UserMenu />
    </header>
  );
}
