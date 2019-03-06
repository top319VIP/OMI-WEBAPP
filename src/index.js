import { render } from 'omi'
import store from './store/admin-store'
import './assets/index.css'
import './elements/app'

render(<my-app />, '#root', store)
