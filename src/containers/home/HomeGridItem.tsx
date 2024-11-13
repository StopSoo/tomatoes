'use client';
import Image from 'next/image';
import Dday from '@/components/common/Dday';
import Link from 'next/link';

export default function HomeGridItem({ item }: ContestActivityListProps) {
  const {
    id,
    title,
    d_day,
    start_date,
    end_date,
    main_category,
    thumbnail_url,
  } = item;
  const en_main_category = main_category === '공모전' ? 'contest' : 'activity';

  return (
    <Link href={`${en_main_category}/${id}`} className="relative block">
      <div className="block w-full justify-center sm:hidden">
        <div className="absolute ml-[5%] mt-4 rounded-full bg-sub-gray-500 p-2 text-xs font-normal text-white md:text-lg md:font-medium">
          {main_category}
        </div>
        <Image
          src={thumbnail_url}
          alt={title}
          width={152}
          height={200}
          className="h-[200px] w-full rounded-[20px] border border-sub-gray-100 object-cover"
        />
      </div>

      <div className="hidden w-full justify-center sm:block">
        <div className="absolute ml-5 mt-5 rounded-full bg-sub-gray-500 p-2 text-xs font-normal text-white md:text-base md:font-medium">
          {main_category}
        </div>
        <Image
          src={thumbnail_url}
          alt={title}
          width={300}
          height={360}
          className="h-[360px] w-full rounded-[20px] border border-sub-gray-100 object-cover"
        />
      </div>

      <div className="mt-2 md:mt-4">
        <h2 className="mb-4 line-clamp-2 h-10 overflow-hidden text-sm font-semibold md:h-[50px] md:text-base md:font-semibold lg:text-lg">
          {title}
        </h2>

        <div className="flex items-center justify-between gap-1.5">
          {d_day < 0 ? (
            <Dday type="completed" />
          ) : (
            <Dday
              type="active"
              day={d_day}
              color={d_day <= 7 ? 'red' : d_day <= 31 ? 'yellow' : 'green'}
            />
          )}
          <p className="text-xs font-normal text-sub-gray-300 sm:text-sm md:text-sm md:font-medium lg:text-sm xl:text-base">
            <span className="inline xl:hidden">{`~ ${end_date}`}</span>
            <span className="hidden xl:inline">{`${start_date} ~ ${end_date}`}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
