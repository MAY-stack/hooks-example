import './App.css';
import './exam.css';

//중괄호를 써서 import 하는 것은
//보내는 쪽에서 중괄호를 써서 export {} 이런식으로 보낸 것임
import { useEffect, useState, useRef, useContext, useMemo } from 'react';

import { createContext } from 'react';
//createContext 저장소를 만들어주는 함수

/* 1. useState */
/* 2. useEffect
  어떠한 컴포넌트가 마운트(화면에 첫 랜더링), 
  업데이트(재랜더링), 언마운트(화면에서 사라짐)
  될 때 특정한 코드(명령어)를 처리해 주는 함수*/
/* 3. useRef
  Ref Object를 티런하는 Hook 함수, 리턴 된 Ref 값은 컴포넌트의 전생애 기간 동안 값이 유지됨
  새로 랜더링 되더라도 값이 보존.
  예) const ref = useRef(value) --> Ref Object {current:value} 리턴되며, 
      ref.current = 'hello'와 같은 방법으로 값을 바꿀 수 있음
      
  state변화 -> 렌더링 -> 컴포넌트 내부 변수 초기화 시킴, 
       vs
  Ref의 변화 -> 렌더링 발생 X -> 값 유지 됨

  => 따라서 렌더링이 되더라도 초기화 하면 안되는 값 저장 시 유용.
     
    (리액트 고유 문법↓)
    DOM요소에 접근할 때 엘리먼트 내에 ref 속성을 만들고, 이 속성 값을 이용해서 접근이 가능 함. 
    기존의 id나 name을 통해 접근하는 방법도 사용 가능 함, but 리액트에서는 ref 속성 사용방법 권장
    고유한 id 값 생성해야 하는 등 복잡성 문제로..
      
*/

/* 4. useContext : Redux 또는 Redux Toolkit이 많이 사용됨. 데이터 공유 함수.
  Context로 공유한 데이터를 받아오는 역할을 하는 함수
*/

/* 5. useMemo : Memoization 기능을 수행
    **Memoization : 반복된 계산을 매번 다시 수행 하는 것이 아니라 캐싱해 놓은 결과를 불러 내어서
                    재사용하는 최적화 기법

   useMemo 함수의 두번째 인자인 의존성 배열(dependency array)의 값이 변경될 때만, 
  첫번째 인자인 콜백함수를 실행시키고, 실행이 안됐을 경우는 기존 보관 중인 콜백함수의 결과"값"을 리턴

  useEffect 함수의 두번째 인자에 객체가 있는 경우에 발생하는 문제를 userMemo함수는 해결할 방법이 있기 때문에
  useEffect 함수를 대신해서 useMemo가 사용되는 경우가 있음.
*/

/* 6. useCallback : useMemo처럼 Memoization 기능을 수행하는 함수이나,
      useMemo와 달리 콜백함수 자체의 주소를 Memorization하고 리턴함
*/

const App = () => {
  return (
    <div>
      <h1> 1. useState Example</h1>
      <h2> exam1</h2>
      <Exam1 />
      <h2> exam2</h2>
      <Exam2 />

      <h1> 2. useEffect Example</h1>
      <h2> exam3</h2>
      <Exam3 />
      <h2> exam4</h2>
      <Exam4 />

      <h1> 3. Ref Example</h1>
      <h2> exam5</h2>
      <Exam5 />
      <h2> exam6</h2>
      <Exam6 />

      <h1> useContext Example</h1>
      <h2> Exam7 </h2>
      {/* <Exam7/> */}

      <h1>useMemo Example</h1>
      <h2>Exam8</h2>
      <Exam8/>

    </div>
  )
}

const Exam1 = () => {

  const [time, setTime] = useState(1);

  const handleClick = () => {
    let newTime;

    // newTime = time + 1;
    // if (newTime > 12) {
    //   newTime = 1;
    // }

    if (time >= 12) newTime = 1;
    else newTime = time + 1;

    setTime(newTime);
  }

  return (
    <div>
      <span> Current Time is {time}</span>
      <button onClick={handleClick}>Change Time</button>
    </div>
  )

}

const Exam2 = () => {
  const [names, setNames] = useState(['김철수', '김민수']);
  const [input, setInput] = useState('');

  const hadleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleClick = () => { //불변성
    // ... : 자바스크립트 스프레드(전개) 연산자
    setNames((prevState) => { return [input, ...prevState] });
    setInput('');
    //위와 같이 생성해 두면 새로운 객체를 생성하는 과정을 생략하고
    //추가해서 만들어줌..? ES6 부터 적용 된 문법    
  }

  return (
    <div>
      <input type="text" value={input} onChange={hadleInputChange}></input>
      <button onClick={handleClick}>CLICK!</button>
      {/* map 함수는 자동으로 for 문으로 실행시켜서 인덱스와 값을 인자로 받아오는 것임*/}
      {names.map((name, idx) => { 
        return <p key={idx}>{name}</p>
      })}
    </div>
  );

}

const Exam3 = () => {

  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  const handleCountClick = () => {
    setCount(count + 1);
  }

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  /**useEffect의 두가지(세가지) 유형**/
  /*랜더링 발생 시 시 마다 콜백함수 실행 */
  useEffect(() => { console.log('1랜더링 발생 시 마다 콜백함수 실행')});
  
  /*첫번재 랜더링 및 두번째 인자에 대한 변화가 있을 때만 콜백함수 실행
    두번째 인자 공백일 시 첫 랜더링 시만 실행*/
  useEffect(() => {console.log('2마운트 시 마다 콜백함수 실행')}, []);
  //두번째 인자로 들어가는 배열 : 의존성 배열(Dependency Array)
  
  /*첫 랜더링시와 count(두번째 인자)에 대한 변화가 있을 때만 콜백함수 실행*/
  useEffect(() => {console.log('3첫 랜더링 시 및 두번째 인자 변화 시 마다 콜백함수 실행')}, [count]);

  return (
    <div>
      <button onClick={handleCountClick}> CLICK</button>
      <span>The count is {count}</span><br/>
      <input type='text' value={name} onChange={handleInputChange} placeholder='put in your name'/><br />
      <span>The name is {name} </span>
    </div>
  );

}

const Exam4 = () => {

  const [showTimer, setShowTimer] = useState(false);

  let btn_name;

  if (showTimer) btn_name = "Timer STOP";
  else btn_name = "Timer START";
   
  return (
    <div>
      {showTimer && <Timer />}
      {/*showTimer가 참이면 <Timer /> 컴포넌트를 실행 한다.*/}

      <button onClick={()=>{setShowTimer(!showTimer)}}>{btn_name}</button>
    </div>
  );
}

const Timer = () => {

  useEffect(() => { 
    const Timer = setInterval(() => {
      console.log('the timer is working...');
    }, 1000);
    return () => {
      clearInterval(Timer); //setInterval은 중단 할 때 clear를 해줘야 함
      console.log('Timer stopped');
    }
  }, []);
  
  return (
    <div>
      <span>Start Timer, Look at the Console.</span>
    </div>

  );

}

const Exam5 = () => {
  const [count, setCount] = useState(1);
  const countRef = useRef(1);
  //countRef가 {current:1} 객체를 참조
  //참조형 변수에는 주소가 담기는 것
  const renderCount = useRef(1);

  let countVar = 0;

  const incareseCountState = () => {
    setCount(count + 1);
  }

  const incareseCountVar = () => {
    countVar = countVar + 1;

    console.log("var = " + countVar)
  }

  const incareseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log("ref = " + countRef.current)
  }

  useEffect(() => { //랜더링 할때 마다

    //리액트는 처음 랜더링 시 검사를 위해서 두번 랜더링 함
    renderCount.current = renderCount.current + 1;
    console.log("exam5 " + renderCount.current + " 번째 랜더링");
  })

  return (
    <div>
      <p> State: {count} </p>
      <p> Ref: {countRef.current} </p>
      <p> Var: {countVar} </p>

      <button onClick={incareseCountState}>State increse</button>
      <button onClick={incareseCountRef}>Ref increse</button>
      <button onClick={incareseCountVar}>Var increse</button>
    </div>
  );

}

const Exam6 = () => {
  
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    //처음 랜더링 될 때 input 쪽에 focus() 되도록 함
  },[]);


  const login = () => {
    alert(`Hello? ${inputRef.current.value}, sir`); //백틱 사용 ` : 탬플리트 표현법
    inputRef.current.value = '';
    inputRef.current.focus();
  }

  return (
    <div>
      {/*ref 속성 추가로 useRef에서 인자를 선택 할수 있게 함*/}
      <input type="text" placeholder='put your name' ref={inputRef}/>
      <button onClick={login}>Login</button>
    </div>
  );
}

//useContext 예제
// const Exam7 = () => {

//   const [isDark, setIsDark] = useState(false);
//   return(
//     <div>
//       <UserContext.Provider value={'marisol'}> {/*Provider로 저장소의 영향이 미치는 컴포넌트를 둘러 쌈*/}
//         <ThemeContext.Provider value={{isDark, setIsDark}}>
//           <Page/>
//         </ThemeContext.Provider>
//       </UserContext.Provider>
//     </div>
//   );

// }

// //저장소 생성
// const ThemeContext = createContext(null);
// const UserContext = createContext(null)

// const Page = ({isDark, setIsDark}) => {

//   return (
//     <div>
//       <Header />
//       <Content />
//       <Footer />
//     </div>
//   );

// }

// const Header = () => {
//   const { isDark } = UserContext(ThemeContext);  //저장소에 보관 된 값을 가져옴
//   const user = UserContext(UserContext);  //저장소에 보관 된 값을 가져옴
//   return (
//     <div>
//       <header className='header'
//         style={{
//           backgroundColor: isDark? 'balck' : 'lightgray',
//           color: isDark? 'white' : 'black'
//         }}>
//         <h1>어서 오세요. {user}</h1>

//       </header>
//     </div>
//   );
// }

// const Content = () => {
//   const { isDark } = useContext(ThemeContext);
//   const user = useContext(UserContext);

//   <div className='Content'
//     style={{
//       backgroundColor: isDark? 'balck' : 'lightgray',
//       color: isDark ? 'white' : 'black'
//     }}
//  > </div>
// }  
// const Footer = () => {
//   const { isDark, setIsDark } = useContext(ThemeContext);
//   return (
//     <div>
//       <footer className='footer'
//         style={{
//           backtroundColor: isDark? 'black':'lightgary'
//         }}>
//        <button className='button' onClick={() => setIsDark(!isDark)}>Dark Mode</button>
//       </footer>
//     </div>
//   );
// }


//useMemo 예제
const Exam8 = () => {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  
  //const hardSum = hardCalculator(hardNumber);
  const hardSum = useMemo(() => { return hardCalculator(hardNumber) }, { hardNumber });
  //hardNumber가 변경 될 때만 콜백함수가 실행되고,
  //변경이 일어나지 않으면 그 전에 가지고 있던 hardSum 값을 재 사용
  const easySum = easyCalculator(easyNumber);

  return (
    <div>
      <h2>짜증나는 계산기</h2>
      <input type='number' value={hardNumber} onChange={(e) => setHardNumber(parseInt(e.target.value))} />
                                                                          {/*e.target.value 는 String 임*/}
      <span>+10000 = {hardSum}</span>
      <hr/>
      <h2> 조금 덜 짜증나는 계산기</h2>

      <input type='number' value={easyNumber} onChange={(e) => setEasyNumber(parseInt(e.target.value))} />
      <span> + 10000 = {easySum} </span>
    </div>
  )
}

const hardCalculator = (number) => {

  console.log('짜증나는 계산기 랜더링');
  for (let i = 0; i < 999999999; i++) { };
  return number + 10000;

}

const easyCalculator = (number) => {

  console.log('조금 덜 짜증나는 계산기 랜더링');
  return number + 10000;

}

export default App;