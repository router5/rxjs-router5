import { expect } from 'chai';
import { spy } from 'sinon';
import { state1, state2, state3, initialisePlugin, router } from './_helpers';

describe('route$', () => {
    it('should push new values to route$ on transitionSuccess events', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete: spy() };

        router.rx.route$.subscribe(listener);

        expect(listener.next).to.have.been.calledWith(null);

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

    it('should not push new values to route$ on transitionError events', () => {
        const plugin = initialisePlugin();
        const listener = { next: spy(), error() {}, complete() {} };

        router.rx.route$.subscribe(listener);
        plugin.onTransitionStart(state1, null);
        plugin.onTransitionError(state1, null, 'error');

        expect(listener.next).to.have.been.calledOnce;
        expect(listener.next).to.have.been.calledWith(null);

        plugin.onStop();
    });
});
