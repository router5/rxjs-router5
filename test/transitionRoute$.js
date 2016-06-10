import { expect } from 'chai';
import { spy } from 'sinon';
import { state1, initialisePlugin, router } from './_helpers';

describe('transitionRoute$', () => {
    it('should push new values to transitionRoute$ on transitionStart events', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete: spy() };

        router.rx.transitionRoute$.subscribe(listener);
        plugin.onTransitionStart(state1, null);

        expect(listener.next).to.have.been.calledTwice;
        expect(listener.next).to.have.been.calledWith(null);
        expect(listener.next).to.have.been.calledWith(state1);

        plugin.onStop();

        expect(listener.complete).to.have.been.called;
    });

    it('should become null on a transition success', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete: spy() };

        router.rx.transitionRoute$.subscribe(listener);
        plugin.onTransitionStart(state1, null);
        plugin.onTransitionSuccess(state1, null);

        expect(listener.next).to.have.been.calledThrice;
        expect(listener.next).to.have.been.calledWith(null);
        expect(listener.next).to.have.been.calledWith(state1);
        expect(listener.next).to.have.been.calledWith(null);

        plugin.onStop();
    });

    it('should become null on a transition error', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete() {} };

        router.rx.transitionRoute$.subscribe(listener);
        plugin.onTransitionStart(state1, null);
        plugin.onTransitionError(state1, null);

        expect(listener.next).to.have.been.calledThrice;
        expect(listener.next).to.have.been.calledWith(null);
        expect(listener.next).to.have.been.calledWith(state1);
        expect(listener.next).to.have.been.calledWith(null);

        plugin.onStop();
    });
});
