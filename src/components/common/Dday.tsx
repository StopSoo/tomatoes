import Image from 'next/image';

interface DdayProps {
  type: 'active' | 'completed' | 'upcoming';
  day?: number;
  color?: 'red' | 'yellow' | 'green';
}

const baseTagStyle =
  'w-[70px] h-[30px] md:w-[80px] md:h-[33px] p-1 rounded-[999px] justify-center items-center gap-1.5 inline-flex';
const baseTextStyle = 'text-xs sm:text-xs md:text-xs lg:text-sm font-medium leading-[20px]';

const tagStyles = {
  active: {
    red: `${baseTagStyle} bg-point-red-100`,
    yellow: `${baseTagStyle} bg-sub-yellow-100`,
    green: `${baseTagStyle} bg-point-green-100`,
  },
  completed: `${baseTagStyle} bg-sub-gray-100`,
  upcoming: `${baseTagStyle} bg-point-green-100`,
};

const textStyles = {
  active: {
    red: `${baseTextStyle} text-point-red-500`,
    yellow: `${baseTextStyle} text-sub-yellow-500`,
    green: `${baseTextStyle} text-point-green-500`,
  },
  completed: `${baseTextStyle} text-sub-gray-400`,
  upcoming: `${baseTextStyle} text-point-green-500`,
};

export default function Dday({ type, day, color }: DdayProps) {
  if (type === 'active' && color) {
    return (
      <div className={tagStyles.active[color]}>
        <Image
          src={`/assets/common/Plain_${color}_t.svg`}
          alt="Icon"
          width={20}
          height={21}
          className={`min-h-[10px] min-w-[9px]`}
        />
        <p className={textStyles.active[color]}>D-{day}</p>
      </div>
    );
  } else if (type === 'completed') {
    return (
      <div className={tagStyles['completed']}>
        <Image
          src="/assets/common/Plain_gray_t.svg"
          alt="Icon"
          width={20}
          height={21}
          className={`min-h-[17px] min-w-[16px]`}
        />
        <p className={textStyles['completed']}>마감</p>
      </div>
    );
  } else {
    return (
      <div className={tagStyles['upcoming']}>
        <Image
          src="/assets/common/Plain_green_t.svg"
          alt="Icon"
          width={20}
          height={21}
          className={`min-h-[17px] min-w-[16px]`}
        />
        <p className={textStyles['upcoming']}>예정</p>
      </div>
    );
  }
}
