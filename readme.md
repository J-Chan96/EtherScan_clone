<!-- geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "\" --http.api "admin,miner,net,txpool,web3,personal,eth" --syncmode full --networkid 7722 --port 30300 --allow-insecure-unlock -->

geth --datadir node init ./juchan\_/juchan.json
geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "\*" \
--http.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 7722 --allow-insecure-unlock --unlock "0,1" --password "./node/password"

geth attach http://127.0.0.1:9000

personal.sendTransaction(
{
from: eth.coinbase,
to:"0x4019cef0734782f1adf3119fa0c208e2d8bf6f84",
value:web3.toWei(50,"ether")
},
"1234"
)

personal.newAccount('1234')

personal.sendTransaction(
{
from: "0x577bf8bc56b26a00e21a57b999421e002a8f5979",
to:"0x4019cef0734782f1adf3119fa0c208e2d8bf6f84",
value:web3.toWei(10,"ether")
},
"1234"
)

UTC-[]-account-lasdasdd 암호화 양방향(복호화)

personal 은 keystore에 있는 아이들을 관리해주는 method이다.

# Geth 실행, attach

- ingoo = 1
  username = "ingoo"

1. bytecode = "0x... 우리가 .bin 만들었던 내용을 넣자 /220711 앞에 0x를 붙히고 써야함
2. abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getText","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

인제 우리가 트랜잭션을 보낼 때 from, data를 보내주면된다.

txObject = {
from:eth.coinbase,
data:bytecode
}

eth.sendTransaction(txObject)
tx해시값 : "0x2477a68607b7a1611d7f26c48b36876756cab1f5d39fea5afd38072ab79db8dd"

트랜잭션 내용 조회 : eth.getTransaction(트랜잭션해시)

eth.getTransaction("0x2477a68607b7a1611d7f26c48b36876756cab1f5d39fea5afd38072ab79db8dd")

eth.getTransactionReceipt("0x2477a68607b7a1611d7f26c48b36876756cab1f5d39fea5afd38072ab79db8dd")

- CA가 새로 생김 contractAddress
  0x72b77e3cbed16d37beef0baf25bbe0d141df1922

# EOA, CA

CA :
스마트컨트랙트가 생겼을 때 나오는 계정 -> like Primary Key...?

이놈을 사용해서 돈을 보낼수도 있음

배포를 한 트랜잭션의 내용에 관련된 키값 -> 함수의 내용이 관련된 트랜잭션을 가져오고싶을 때 CA를 쓰면된다.

Hello Wolrd 컨트랙트의 고유한 키값이라고 생각.

EOA : 우리가 흔히 돈을 보낼때 썼던 계정을 EOA라고 말한다.

eth.contract(abi)
-> 데이터를 받아올 형태를 지정해줌 -> abi

contract = eth.contract(abi) // Object -> eth 객체에서 abi 속성값이 추가됨 그리고 at, getData, new 객체도 생성됨

instance = contract.at(CA) // at -> 해당 컨트랙트의 primary key값에 접근하겠다

instance = contract.at("0x72b77e3cbed16d37beef0baf25bbe0d141df1922")

instance.getText({from:eth.coinbase})
instance.getText.call()

트랜잭션이 발동이 되었을때 컨트랙트의 있는 class 내용들이 new로 인해 객체가 생성이된다. 생성이된 객체는 블록이 생성될때 트랜잭션에 들어간다.
여기서 생성되는 컨트랙트는 인스턴스가 하나밖에 생성이 안된다. 하나의 트랜잭션 안에서 하나의 컨트랙트는 하나의 인스턴스만 생성한다.

.bin
.abi

업그레이드 버전

contract = eth.contract(abi)
instance = contract.new(txObject) // transaction 배포

instance.getText.call()
instance.setText('asdf')

1. 솔리디티 코드 재작성
2. 컴파일 다시 작업
3. abi 변수와, bytecoe 변수 재설정
4. txObject 만들기
5. contract 변수 만들고
6. instance 변수 만들기
7. miner.start(4), miner.stop()
8. instance 변수 확인
   8.1 setText 함수와, getText 함수 확인하기
9. instance.getText.call() 확인해보기
10. instance.setText('hello ingoo',{from:eth.coinbase})
11. txpool 확인해보기
12. miner.start(1), miner.stop()
13. instance.getText.call() 확인해보기

이러한 복잡한 과정을 처리해주는

1. 프레임워크
2. Remix IDE 온라인 편집기
