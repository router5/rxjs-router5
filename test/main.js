import { expect } from 'chai';
import { Observable } from 'rxjs';
import { initialisePlugin, router } from './_helpers';

describe('rxPlugin', () => {
    before(() => {
        initialisePlugin();
    });

    it('should initialise observables', () => {
        expect(router.rx).to.exist;
    });

    it('should expose a route$ observable', () => {
        expect(router.rx.route$).to.be.instanceof(Observable);
    });

    it('should expose a routeNode observable factory', () => {
        expect(router.rx.routeNode('')).to.be.instanceof(Observable);
    });

    it('should expose a transitionError$ observable', () => {
        expect(router.rx.transitionError$).to.be.instanceof(Observable);
    });

    it('should expose a transitionRoute$ observable', () => {
        expect(router.rx.transitionRoute$).to.be.instanceof(Observable);
    });
});
