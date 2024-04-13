import AxiosMockAdapter from 'axios-mock-adapter';
import axios from '../utils/axios';

const mock = new AxiosMockAdapter(axios, {
  delayResponse: 0,
  onNoMatch: 'throwException'
});
export default mock;
