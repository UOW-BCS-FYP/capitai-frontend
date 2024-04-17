import AxiosMockAdapter from 'axios-mock-adapter';
import axios from '../utils/axios';

const mock = new AxiosMockAdapter(axios, {
  delayResponse: 1000,
  onNoMatch: 'throwException'
});
export default mock;
