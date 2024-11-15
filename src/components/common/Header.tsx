'use client';

import Navigation from '../ui/navigation/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  const handleSearch = (keyword: string) => {
    window.location.href = `/search?query=${encodeURIComponent(keyword)}`;
  };

  return (
    <header className="flex w-full items-center justify-between px-7 py-4 shadow lg:px-[88px] lg:py-[22px]">
      <Link href="/" className="mr-8 shrink-0">
        <Image
          src="/assets/common/PC_logo_text (1).svg"
          width={160}
          height={30}
          alt="tomatoes desktop logo"
          className="hidden md:block"
        />

        <Image
          src="/assets/common/MO_logo_text.svg"
          width={76}
          height={17}
          alt="tomatoes mobile logo"
          className="block md:hidden"
        />
      </Link>

      <Navigation />
      <SearchBar placeholder="검색어를 입력해주세요" onSearch={handleSearch} />
    </header>
  );
}
