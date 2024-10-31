import ActivityContestItem from '@/components/ui/grid/ActivityContestItem';
import Pagination from '@/components/ui/pagination/Pagination';
import { Suspense } from 'react';

interface ActivityProps {
  activitiesContests: ContestActivityData[];
}

export default function Activity({ activitiesContests }: ActivityProps) {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <div className="px-7 md:px-[88px]">
          <Pagination
            contents={activitiesContests}
            GridItem={ActivityContestItem}
            webItemPerPage={16}
            mobileItemPerPage={10}
            columnStyle="web4mobile2"
            gapStyle="gapStyle2"
          />
        </div>
      </Suspense>
    </>
  );
}