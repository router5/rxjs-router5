import Rx from 'rxjs';
import transitionPath from 'router5.transition-path';

export const pluginName = 'RX_PLUGIN';

function rxPluginFactory() {
    function rxPlugin(router) {
        let observer;

        const dispatch = (type, isError) => (toState, fromState, error) => {
            if (observer) {
                const routerEvt = { type, toState, fromState };

                observer.next(isError ? { ...routerEvt, error } : routerEvt);
            }
        };

        let pluginMethods = {
            onStop: () => observer.complete(),
            onTransitionSuccess: dispatch('transitionSuccess'),
            onTransitionError: dispatch('transitionError', true),
            onTransitionStart: dispatch('transitionStart'),
            onTransitionCancel: dispatch('transitionCancel'),
        };

        // Events observable
        const transitionEvents$ = Rx.Observable.create((o) => {
            observer = o;
        }).publish().refCount();

        // Transition Route
        const transitionRoute$ = transitionEvents$
            .map(_ => _.type === 'transitionStart' ? _.toState : null)
            .startWith(null);

        // Error
        const transitionError$ = transitionEvents$
            .filter(_ => _.type )
            .map(_ => _.type === 'transitionError' ? _.error : null)
            .startWith(null)
            .distinctUntilChanged();

        // Route with intersection
        const routeState$ = transitionEvents$
            .filter(_ => _.type === 'transitionSuccess' && _.toState !== null)
            .map(({ toState, fromState }) => {
                const { intersection } =  transitionPath(toState, fromState);
                return { intersection, route: toState };
            })
            .startWith({ intersection: '', route: router.getState() });

        // Create a route observable
        const route$ = routeState$.map(({ route }) => route);

        // Create a route node observable
        const routeNode = (node) =>
            routeState$
                .filter(({ intersection }) => intersection === node)
                .map(({ route }) => route)
                .startWith(router.getState());

        // Expose observables
        router.rx = {
            route$,
            routeNode,
            transitionError$,
            transitionRoute$
        };

        return pluginMethods;
    }

    rxPlugin.pluginName = pluginName;

    return rxPlugin;
};


export default rxPluginFactory;
