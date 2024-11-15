import ContestBanner from '@/containers/home/ContestBanner';
import MainSlider from '@/containers/home/MainSlider';
import Image from 'next/image';
import ContestCardSlider from '@/containers/home/ContestCardSlider';
import ActivityCardSlider from '@/containers/home/ActivityCardSlider';
import { AiOutlineRight } from 'react-icons/ai';
import Link from 'next/link';
import BestPickGridView from './BestPickGridView';
import RecoActivityGridView from './RecoActivityGridView';
import CurrentHighlights from '@/containers/magazine/CurrentHighlights';
import MoMainSlider from './MoMainSlider';

export default function Home() {
  return (
    <>
      <div className="hidden md:block"><MainSlider /></div>
      <div className="block md:hidden"><MoMainSlider /></div>
      <ContestBanner />

      <section className="px-[28px] md:px-[88px]">
        <p className="mt-10 font-recipe text-[26px] font-normal leading-[48px] text-point-red-500 md:text-[32px]">
          BEST PICK
        </p>
        <section className="my-5 flex flex-col">
          <BestPickGridView />
        </section>
      </section>

      <section className="px-[28px] md:px-[88px] mt-10 flex items-center">
        <p className="font-recipe text-[26px] font-normal leading-[48px] md:text-[32px]">
          토마토들 <span className="text-point-red-500">추천 활동</span>
        </p>
        <Image
          src={`/assets/homePage/PC_recommendationMark_t.svg`}
          alt="banner"
          width={80}
          height={82}
          className="ml-2"
        />
      </section>
      <section className="px-[28px] md:px-[88px] my-5 flex flex-col">
        <RecoActivityGridView />
      </section>

      <section className="px-[28px] md:px-[88px] mt-10">
        <div className="flex flex-row justify-between">
          <p className="font-recipe text-[26px] font-normal leading-[48px] md:text-[32px]">
            공모전
          </p>
          <Link
            href={'/contest'}
            className="flex flex-row items-center gap-1"
          >
            더보기
            <AiOutlineRight />
          </Link>
        </div>
        <ContestCardSlider />
      </section>

      <section className="px-[28px] md:px-[88px] mt-10">
        <div className="flex flex-row justify-between">
          <p className="font-recipe text-[26px] font-normal leading-[48px] md:text-[32px]">
            대외활동
          </p>
          <Link
            href={'/activity'}
            className="flex flex-row items-center gap-1"
          >
            더보기
            <AiOutlineRight />
          </Link>
        </div>
        <ActivityCardSlider />
      </section>

      <section className="px-[28px] md:px-[88px] mt-10">
        <div className="flex flex-row justify-between">
          <p className="font-recipe text-[26px] font-normal leading-[48px] md:text-[32px]">
            매거진
          </p>
          <Link
            href={'/magazine'}
            className="flex flex-row items-center gap-1"
          >
            더보기
            <AiOutlineRight />
          </Link>
        </div>
        <CurrentHighlights />
      </section>
    </>
  );
}