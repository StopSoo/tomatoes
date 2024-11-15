'use client';

import { TomatoTipDataType } from '@/types/tomatoTips';
import TomatoTipItem from '@/containers/magazine/TomatoTipItem';
import { useEffect, useState } from 'react';
import { fetchThreeTomatoTips } from '@/lib/fetchTomatoTip';
import GridSlideView from '@/components/ui/grid/GridSlideView';

const CurrentHighlights = () => {
  const [tips, setTips] = useState<TomatoTipDataType[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await fetchThreeTomatoTips();

      if (error) {
        console.error('Error fetching tips:', error);
        return;
      }

      if (data) {
        setTips(data);
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="gap-4 mb-[69px] mt-[28px] flex items-center md:mb-[120px] md:mt-[40px] md:items-start">
        {tips.length > 0 && ( 
          <GridSlideView<TomatoTipDataType>
            items={tips}
            GridItem={TomatoTipItem}
            slideColumnStyle="web3mobile3"
            slideGapStyle="slideGapStyle1"
          />
        )}
      </div>
    </div>
  );
};

export default CurrentHighlights;