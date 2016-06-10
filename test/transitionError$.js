import { expect } from 'chai';
import { spy } from 'sinon';
import { state1, state2, initialisePlugin, router } from './_helpers';

const error = 'error';

describe('transitionError$', () => {
    it('should push new values to transitionError$ on transitionError events', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete: spy() };

        router.rx.transitionError$.subscribe(listener);
        plugin.onTransitionStart(state1, null);
        plugin.onTransitionError(state1, null, error);

        expect(listener.next).to.have.been.calledTwice;
        expect(listener.next).to.have.been.calledWith(null);
        expect(listener.next).to.have.been.calledWith(error);

        plugin.onStop();

        expect(listener.complete).to.have.been.called;
    });

    it('should become null on a new transition start event', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete() {} };

        router.rx.transitionError$.subscribe(listener);
        plugin.onTransitionStart(state1, null);
        plugin.onTransitionError(state1, null, error);
        plugin.onTransitionStart(state2, null);

        expect(listener.next).to.have.been.calledThrice;
        expect(listener.next).to.have.been.calledWith(null);
        expect(listener.next).to.have.been.calledWith(error);
        expect(listener.next).to.have.been.calledWith(null);

        plugin.onStop();
    });
});
