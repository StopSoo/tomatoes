import requests
import os
from io import BytesIO
from PIL import Image
from colorthief import ColorThief
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
import time
import json

# 기본 URL 설정
base_url = "https://www.campuspick.com"

# 크롤링한 데이터를 모아두는 리스트
contest_content = []
activity_content = []

# 캠퍼스픽 공모전 페이지 url
contest_url = "https://www.campuspick.com/contest"
activity_url = "https://www.campuspick.com/activity"
url_list = [(contest_url, contest_content), (activity_url, activity_content)]

# ChromeDriver 실행
try:
    driver = webdriver.Chrome()
except Exception as e:
    print("Error starting Chrome:", e)
    exit(1)

# 수집할 최대 게시물 개수
max_items = 100

# 이미지에서 주요 색상을 추출하는 함수
def get_image_dominant_color(image_url):
    try:
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))
        color_thief = ColorThief(BytesIO(response.content))
        dominant_color = color_thief.get_color(quality=1)

        # RGB를 헥사코드로 변환
        hex_color = '#{:02x}{:02x}{:02x}'.format(dominant_color[0], dominant_color[1], dominant_color[2])
        return hex_color
    except Exception as e:
        print(f"이미지에서 색상 추출 중 오류 발생: {e}")
        return None

# 페이지에서 데이터를 크롤링하는 함수
def crawl_page(url, data_list):
    driver.get(url)
    time.sleep(3)  # 페이지가 완전히 로드되도록 대기
    total_collected = 0  # 현재까지 수집된 총 게시물 개수
    last_height = driver.execute_script("return document.body.scrollHeight")  # 초기 페이지 높이

    while total_collected < max_items:
        # 스크롤을 내려 추가 데이터를 로드
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)  # 스크롤 후 데이터 로드 대기

        # 데이터 로드 여부 확인
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            print("더 이상 로드할 게시물이 없습니다.")
            break
        last_height = new_height

        # 새로 로드된 항목들만 처리
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.XPATH, '//*[@class="list"]/*[@class="item"]'))
            )
            lis = driver.find_elements(By.XPATH, '//*[@class="list"]/*[@class="item"]')
        except TimeoutException:
            print(f"로드 시간 초과로 데이터가 불완전할 수 있습니다: {url}")
            break

        for li in lis[total_collected:]:
            if total_collected >= max_items:
                break  # 필요한 데이터 개수만큼 수집 완료

            retries = 3
            while retries > 0:
                try:
                    # 웹 요소들이 현재 DOM에서 유효한지 확인
                    driver.implicitly_wait(5)
                    keywords = li.find_elements(By.XPATH, './/*[@class="badges"]/span')
                    keyword_str = ",".join([keyword.text for keyword in keywords])
                    title = li.find_element(By.XPATH, './/h2').text
                    company = li.find_element(By.XPATH, './/*[@class="company"]').text
                    view_count = li.find_element(By.XPATH, './/*[@class="viewcount"]').text
                    thumbnail_url = li.find_element(By.XPATH, './/figure').get_attribute("data-image")
                    detail_link = li.find_element(By.XPATH, './/a[@href]').get_attribute("href")

                    if detail_link.startswith("/"):
                        detail_link = base_url + detail_link

                    # 상세 페이지로 이동
                    driver.get(detail_link)
                    time.sleep(3)

                    # 접수 기간 가져오기
                    try:
                        reception_period_section = driver.find_element(By.XPATH, '//h2[text()="접수 기간"]/following-sibling::p[@class="indent"]')
                        reception_period = reception_period_section.text
                    except:
                        reception_period = "접수 기간 정보 없음"

                    # 시상 정보 가져오기
                    try:
                        award_info_sections = driver.find_elements(By.XPATH, '//h2[text()="시상"]/following-sibling::p[@class="indent"]')
                        award_info_list = [award_info.text for award_info in award_info_sections]
                        award_info = " / ".join(award_info_list)
                    except:
                        award_info = "시상 정보 없음"

                    # 이미지의 주요 색상 추출
                    dominant_color = get_image_dominant_color(thumbnail_url)

                    # 리스트로 돌아가기
                    driver.back()
                    time.sleep(3)

                    results = {
                        "keywords": keyword_str,           
                        "title": title,                    
                        "company": company,                
                        "view_count": view_count,          
                        "thumbnail_url": thumbnail_url,    
                        "reception_period": reception_period,
                        "award_info": award_info,
                        "dominant_color": dominant_color   
                    }

                    data_list.append(results)
                    print(f"추가된 게시물: {title}")
                    total_collected += 1
                    break  # 성공적으로 데이터를 가져오면 루프 종료

                except StaleElementReferenceException:
                    retries -= 1
                    print(f"크롤링 재시도중... ({3 - retries} / 3)")
                    time.sleep(1)

                except Exception as e:
                    print(f"게시물 정보를 가져오는 중 오류 발생: {e}")
                    break

# 각 URL에 대해 크롤링 수행
for url, content_list in url_list:
    crawl_page(url, content_list)

driver.quit()

# 데이터를 저장하기 직전에 데이터 확인
# print("최종 contest_content 데이터:", contest_content)
# print("최종 activity_content 데이터:", activity_content)

# JSON 파일로 저장하는 함수
def save_to_json(data, filename):
    folder_path = "scripts"
    os.makedirs(folder_path, exist_ok=True)
    file_path = os.path.join(folder_path, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"Data saved to {file_path}.")

# 데이터 저장
save_to_json(contest_content, "contest_1027.json")
save_to_json(activity_content, "activity_1027.json")
