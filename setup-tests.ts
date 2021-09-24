import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'jest-canvas-mock'

configure({ adapter: new Adapter() })
