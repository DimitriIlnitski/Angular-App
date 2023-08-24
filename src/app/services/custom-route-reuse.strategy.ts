import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private routeStore = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;
    if (path) {
      return !!path && ['courses', 'courses/new'].includes(path);
    } else {
      return false;
    }
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const path = route.routeConfig?.path;
    if (path) {
      this.routeStore.set(path, handle);
    }
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;
    if (path) {
      return (
        !!path &&
        ['courses', 'courses/new'].includes(path) &&
        !!this.routeStore.get(path)
      );
    } else {
      return false;
    }
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const path = route.routeConfig?.path;
    if (path) {
      const result = this.routeStore.get(path);
      if (result) {
        return result;
      } else {
        return {};
      }
    } else {
      return {} as DetachedRouteHandle;
    }
  }
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
