# 공연을 예매 웹 사이트 구현

- [배포 웹사이트 링크](https://www.yooseungyeop.shop/)

- [API 명세서](https://www.notion.so/Plus-API-2a99dee8f1c44ee48aae0b8ad02ca359)

- [ERD](https://drawsql.app/teams/ysy-1/diagrams/pluspersonal)
***
  
## 📢 개요
- 목표: 타입스크립트를 이용하여 온라인 공연 예매 서비스를 구현
- Nest.js 환경에서 필수 기능 구현
- 서비스를 개발하면서 타입스크립트의 특징을 최대한 활용
- 모든 데이터 구조와 함수에는 적절한 타입 정의를 적용
- 에러 처리는 적절하게
 
  ![화면 캡처 2024-07-08 102931](https://github.com/seungyeopyoo/node-shimhwa/assets/166491440/cb1f5ded-1343-4aa2-908e-9ea996aa4b49)
  
***
### 폴더 구조
```markdown
src
 ┣ auth
 ┃ ┣ auth.controller.spec.ts
 ┃ ┣ auth.controller.ts
 ┃ ┣ auth.module.ts
 ┃ ┗ jwt.strategy.ts
 ┣ concert
 ┃ ┣ dto
 ┃ ┃ ┣ create-concert.dto.ts
 ┃ ┃ ┗ get-concert.dto.ts
 ┃ ┣ entities
 ┃ ┃ ┗ concert.entity.ts
 ┃ ┣ types
 ┃ ┃ ┣ concertCategory.type.ts
 ┃ ┃ ┗ concertLocation.type.ts
 ┃ ┣ concert.controller.spec.ts
 ┃ ┣ concert.controller.ts
 ┃ ┣ concert.module.ts
 ┃ ┣ concert.service.spec.ts
 ┃ ┗ concert.service.ts
 ┣ concert_date
 ┃ ┣ dto
 ┃ ┃ ┣ create-concert_date.dto.ts
 ┃ ┃ ┗ update-concert_date.dto.ts
 ┃ ┣ entities
 ┃ ┃ ┗ concert_date.entity.ts
 ┃ ┣ concert_date.controller.spec.ts
 ┃ ┣ concert_date.controller.ts
 ┃ ┣ concert_date.module.ts
 ┃ ┣ concert_date.service.spec.ts
 ┃ ┗ concert_date.service.ts
 ┣ reservation
 ┃ ┣ dto
 ┃ ┃ ┣ create-reservation.dto.ts
 ┃ ┃ ┗ update-reservation.dto.ts
 ┃ ┣ entities
 ┃ ┃ ┗ reservation.entity.ts
 ┃ ┣ reservation.controller.spec.ts
 ┃ ┣ reservation.controller.ts
 ┃ ┣ reservation.module.ts
 ┃ ┣ reservation.service.spec.ts
 ┃ ┗ reservation.service.ts
 ┣ user
 ┃ ┣ dto
 ┃ ┃ ┣ create-user.dto.ts
 ┃ ┃ ┗ login.dto.ts
 ┃ ┣ entities
 ┃ ┃ ┗ user.entity.ts
 ┃ ┣ types
 ┃ ┃ ┗ userRole.type.ts
 ┃ ┣ user.controller.spec.ts
 ┃ ┣ user.controller.ts
 ┃ ┣ user.module.ts
 ┃ ┣ user.service.spec.ts
 ┃ ┗ user.service.ts
 ┣ utils
 ┃ ┗ userInfo.decorator.ts
 ┣ app.controller.spec.ts
 ┣ app.controller.ts
 ┣ app.module.ts
 ┣ app.service.ts
 ┗ main.ts
.env
.eslintrc.js
.gitignore
.prettierrc
package-lock.json
package.json
nest-cli.json
tsconfig.build.json
tsconfig.json
README.md
```
***

## ✨ 사용 기술
  ![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=TypeScript&logoColor=blue)
  ![Nest.js](https://img.shields.io/badge/Nest.Js-000000?style=for-the-badge&logo=Nestjs&logoColor=red)
  ![TypeORM](https://img.shields.io/badge/TypeORM-000000?style=for-the-badge&logo=TYPEORM&logoColor=orange)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
  
## 📃 참고 자료 
- [Nest.js Docs](https://docs.nestjs.com/) 
- [TypeScript handbook](https://joshua1988.github.io/ts/intro.html)
***
