import chai from 'chai';
import rxPlugin from '../modules';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

export const router = {
    getState: () => null
};

export const state1 = { name: 'route1', path: '/route1' };
export const state2 = { name: 'route2', path: '/route2' };
export const state3 = { name: 'route3', path: '/route3' };

export const initialisePlugin = () => {
    return rxPlugin()(router);
};
