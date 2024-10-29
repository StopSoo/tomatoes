// 구 데이터 타입
type ActivityContestDetailsProps = {
  title: string;
  organization: string;
  dDay: string;
  receptionPeriod: string; // 접수 기간
  category: '대외활동' | '공모전'; // 카테고리 추가
  viewCount: string; // 조회수 추가
  imageUrl: string;
  detailUrl: string;
};

// 전체 데이터 타입
type ActivityContestDataType = {
  id: number;
  title: string; // varchar
  company: string; // varchar, nullable
  view_count: number; // integer, nullable (변환 후 숫자로 처리)
  thumbnail_url: string; // text, nullable
  start_date: string; // date in ISO format ("YYYY-MM-DD")
  end_date: string; // date in ISO format ("YYYY-MM-DD")
  award_info: string; // text, nullable
  dominant_color: string; // char(7) (e.g., "#FFFFFF"), nullable
  description: string; // text, nullable
  main_category: '공모전' | '대외활동'; // varchar, limited to values "공모전" or "대외활동"
  homepage_url: string; // text, nullable
  registration_date: string; // date in ISO format ("YYYY-MM-DD")
  d_day: number; // 디데이 (숫자)

  // 옵셔널 값
  field?: string | null;
  activity?: string | null;
  host?: string | null;
  duration?: string | null;
  region?: string | null;
  department?: string | null;
  prize_amount?: string | null;
  prize_benefit?: string | null;
  target?: string | null;
  organizer?: string | null;
};

type ActivityContestListProps = {
  item: ActivityContestDetailProps;
};
