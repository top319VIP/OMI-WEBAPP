import { define, WeElement } from 'omi'
import logo from './logo.svg'
import style from './_index.css'
import '../app-intro'
import 'omiu/input'
import 'omiu/button'

define('my-app', class extends WeElement {
  static observe = true;

  data = { name: 'Omio' }

  clickHandler = () => {
    this.store.rename()

    this.data.name = 'Omio by Tencent'
    Http.get('/api/intention/H5ManageController/carModes', res=>{
      console.log(res)
    })
    Http.post('/api/authentication/partical/queryAllParticles', res=>{
      console.log(res)
    })

  }

  installed() {
    Http.setRequestHeader({"Authorization": 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ4bSIsIm5hbWUiOiLnhormoqYiLCJ1c2VySWQiOiI4NDEiLCJ0ZWxQaG9uZSI6IjEyMzQ1Njc4OTAiLCJyZW1hcmsiOiIiLCJkZWFsZXJDb2RlIjoiMDAwMDAiLCJkZWFsZXJOYW1lIjoi5bm_5rG95Liw55Sw5rG96L2m5pyJ6ZmQ5YWs5Y-4IiwidXNlck5hbWUiOiLnhormoqYiLCJraWNrT3V0IjpmYWxzZSwiZXhwIjoxNTczMDQxMTc4fQ.pH7iVdBkgH9B9OJdJMnPo3BC0b8p5co929dmXdzDfe4ooQQtKXqBA_YCvuAtfzpVGzsNPkjWEFy4fCHEZg2yWHFiBGiM5dqMB9sZly4KgJAEOy1EXlTtr0mnhzg5oHY3tMyQoylgh1zDReJxYYb7oJO03T4-nWIV83CYxt4LmZs'})
  }

  css() {
    return style
  }

  render(props, data) {
    return (
      <div class="app">
        <header class="app-header">
          <img
            src={logo}
            onClick={this.clickHandler}
            class="app-logo"
            alt="logo"
          />
          <h1 class="app-title">Welcome to {data.name}</h1>
          <div>{this.store.name}</div>
        </header>
        <app-intro/>
        <o-input style="width:200px;" placeholder="Enter your name" />
        <o-button onClick={this.onClick}>按钮</o-button>
      </div>
    )
  }
})
