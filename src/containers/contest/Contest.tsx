import ActivityContestItem from '@/components/ui/grid/ActivityContestItem';
import Pagination from '@/components/ui/pagination/Pagination';
import NoFilterResult from '@/components/common/noFilterResult';
import { Suspense } from 'react';

interface ContestProps {
  contests: ActivityContestData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}

export default function Contest({ contests, pagination }: ContestProps) {
  if (contests.length === 0) {
    return <NoFilterResult />;
  }

  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <div className="px-7 md:px-[88px]">
          <Pagination
            items={contests}
            GridItem={ActivityContestItem}
            columnStyle="web4mobile2"
            gapStyle="gapStyle2"
            pagination={pagination}
          />
        </div>
      </Suspense>
    </>
  );
}
