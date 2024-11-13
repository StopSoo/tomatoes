'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Dday from '@/components/common/Dday';
import { formatViewCount } from '@/utils/format';
import Link from 'next/link';
import { useDetailUrl } from '@/utils/url';

const ThumbnailImage = ({
  url,
  title,
  isMobile,
}: {
  url: string;
  title: string;
  isMobile: boolean;
}) => (
  <div
    className={`relative overflow-hidden rounded-[20px] border border-sub-gray-100 ${
      isMobile
        ? 'aspect-[3/4] w-full sm:hidden'
        : 'hidden aspect-[5/6] w-full sm:block'
    }`}
  >
    <Image src={url} alt={title} fill={true} className="object-cover" />
  </div>
);

export default function ActivityContestItem({
  item,
}: ActivityContestItemProps) {
  const { id, title, company, d_day, view_count, thumbnail_url } = item;

  const pathname = usePathname();
  const category = pathname.split('/')[1];

  const detailUrl = useDetailUrl(id, category);

  return (
    <Link href={detailUrl} className="flex w-full flex-col">
      <ThumbnailImage url={thumbnail_url} title={title} isMobile={true} />
      <ThumbnailImage url={thumbnail_url} title={title} isMobile={false} />

      <div className="mt-2 flex w-full flex-1 flex-col justify-between md:mt-4">
        <h2 className="line-clamp-2 text-base font-semibold md:text-xl">
          {title}
        </h2>

        <div>
          <p className="mb-2 line-clamp-1 text-sm font-normal text-sub-gray-400 md:text-xl md:font-medium">
            {company}
          </p>

          <div className="flex items-center gap-1.5">
            {d_day < 0 ? (
              <Dday type="completed" />
            ) : (
              <Dday
                type="active"
                day={d_day}
                color={d_day <= 7 ? 'red' : d_day <= 31 ? 'yellow' : 'green'}
              />
            )}
            <p className="text-xs font-normal text-sub-gray-300 sm:text-sm md:text-base md:font-medium">
              조회 {formatViewCount(view_count)}회
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
