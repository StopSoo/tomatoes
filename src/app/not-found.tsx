'use client';

import Image from 'next/image';

export default function NotFound() {
  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back(); 

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center bg-white px-4 py-10">
      <div className="mb-4 flex items-center justify-center">
        <Image
          src="/assets/common/PC_404_t.svg"
          alt="404 이미지 PC"
          width={241}
          height={118}
          className="mx-auto hidden md:block"
        />
        <Image
          src="/assets/common/MO_404_t.svg"
          alt="404 이미지 MO"
          width={141}
          height={72}
          className="mx-auto block md:hidden"
        />
      </div>

      <p className="mt-4 text-center text-lg font-semibold text-sub-gray-500 md:text-2xl">
        요청하신 페이지를 찾을 수 없습니다.
      </p>

      <div
        className="mt-8 flex h-[43px] w-[168px] cursor-pointer items-center justify-center rounded-md bg-point-red-500 px-[36px] py-[12px] text-xl font-medium text-white md:px-[24px] md:py-[10px] md:text-base"
        onClick={goBack}
      >
        돌아가기
      </div>
    </div>
  );
}
