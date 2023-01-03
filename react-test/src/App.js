import logo from './logo.svg';
import './App.css';
console.log(1/0)
console.log(Object.is(0,0));
console.log('————————————————————————————————————————————————');
// ————————————————————————————————————————————————
// 看这是基本的calss
class Greeter{
  greeting = '';
  constructor(mes){
    this.greeting = mes
  }
  greet(){
    return 'hello,' + this.greet
  }
}
let greeter = new Greeter('world')
console.log(greeter);
console.log('————————————————————————————————————————————————');
// ————————————————————————————————————————————————
// 哝，我在这放了个基类也叫超类
class Animal{
  move(number=0){
    console.log(`Animal moved ${number}m.`);
  }
}
// 这个是派生类（子类）派生自Animal
class Dog extends Animal{
  bark(){
    console.log('Woof Woof!');
  }
}
const dog = new Dog()
dog.bark()
dog.move(10)
dog.bark()
console.log('————————————————————————————————————————————————');
// ————————————————————————————————————————————————
// 稍微微复杂一点的class animal
class Animal1{
  name = '';
  constructor(theName){
    this.name = theName
  }
  move(number = 0){
    console.log(`${this.name} moved ${number}m.`);
  }
}
class Snake extends Animal1{
  // 派生类的构造函数必须调用super，它会执行基类的构造函数
  constructor(name){
    super(name)
  }
  move(number = 5){
    console.log('slithering...');
    super.move(number)
  }
}
class Horse extends Animal1{
  constructor(name){
    super(name)
  }
  move(number = 45){
    console.log('galloping...');
    super.move(number)
  }
}
let sam = new Snake('Sammy the Python')
let tom = new Horse('Tommy the Palomino')
sam.move()
tom.move(34)
// ————————————————————————————————————————————————
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
