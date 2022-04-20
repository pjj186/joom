# Joom

nodejs, Express, WebRTC, Websockets 을 사용하여 화상 통화 소프트웨어 Zoom 클론코딩.

# Use

## Express

## Pug

- Pug는 템플릿 엔진입니다. HTML의 정적인 단점을 개선하여 반복문, 조건문, 변수 등을 사용할 수 있고 동적인 페이지 작성이 가능합니다.

## WebRTC

## Websockets (ws: a Node.js WebSocket library)

- Node.js에서 WebSocket을 사용할 수 있게 해주는 라이브러리 입니다.

## SocketIO

- 실시간 기능을 쉽게 만들 수 있게 해주는 "프레임워크"
- 실시간, 양방향, event 기반의 통신을 가능하게 해줍니다.
- websocket보다 탄력성이 뛰어납니다. 이 의미는 SocketIO가 websocket을 이용한 연결에 실패를 해도, socketIO는 다른 방법을 찾을거라는 의미입니다.
- SocketIO는 기본적으로 websocket을 이용하지만, websocket 연결을 할 수 없는 경우 HTTP long polling을 사용합니다. (신뢰성)

# Dependencies

- nodemon : 자바 스크립트 파일들이 수정 될 때 마다 서버를 껐다 켰다 하며 확인해야하는데, nodemon을 이용하면 이 번거로움에서 해방시켜줍니다.
- babel : babel은 ES6+ 버전 이상의 자바스크립트나 JSX, 타입스크립트 코드를 하위 버전의 자바스크립트 코드로 변환 시켜 IE나 다른 브라우저에서 동작할 수 있도록 하는 역할을 합니다.
