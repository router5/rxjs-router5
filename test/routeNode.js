import { expect } from 'chai';
import { spy } from 'sinon';
import { state1, state2, state3, initialisePlugin, router } from './_helpers';

const nestedA = { name: 'a', path: '/a' };
const nestedAB = { name: 'a.b', path: '/a/b' };
const nestedAC = { name: 'a.c', path: '/a/c' };

describe('routeNode', () => {
    it('should see route updates for the root node', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete: spy() };

        router.rx.routeNode('').subscribe(listener);

        plugin.onTransitionStart(state1, null);
        plugin.onTransitionSuccess(state1, null);

        expect(listener.next).to.have.been.calledWith(state1);

        plugin.onTransitionStart(state2, state1);
        plugin.onTransitionSuccess(state2, state1);


        expect(listener.next).to.have.been.calledWith(state2);

        plugin.onTransitionStart(state3, state2);
        plugin.onTransitionSuccess(state3, state2);

        expect(listener.next).to.have.been.calledWith(state3);

        plugin.onStop();

        expect(listener.complete).to.have.been.called;
    });

    it('should work with nested routes', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete() {} };

        router.rx.routeNode('a').subscribe(listener);

        plugin.onTransitionStart(nestedA, null);
        plugin.onTransitionSuccess(nestedA, null);

        plugin.onTransitionStart(nestedAB, nestedA);
        plugin.onTransitionSuccess(nestedAB, nestedA);

        expect(listener.next).to.have.been.calledWith(nestedAB);

        plugin.onTransitionStart(nestedAC, nestedAB);
        plugin.onTransitionSuccess(nestedAC, nestedAB);

        expect(listener.next).to.have.been.calledWith(nestedAC);

        plugin.onStop();
    });
});
