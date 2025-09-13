// Bussin: EventBus, Evented, StaticEvented
// Implements event bus and evented patterns for JS apps

// EventBus implementation
export class EventBus {
  constructor() {
    this.listeners = {};
  }
  on(type, handler) {
    if (!this.listeners[type]) this.listeners[type] = new Set();
    this.listeners[type].add(handler);
  }
  off(type, handler) {
    if (this.listeners[type]) this.listeners[type].delete(handler);
  }
  emit(type, data) {
    if (this.listeners[type]) {
      for (const handler of this.listeners[type]) handler(data);
    }
  }
}

// Evented implementation
export class Evented {
  constructor(eventTypes) {
    this.listeners = {};
    eventTypes.forEach((type) => (this.listeners[type] = new Set()));
    this.scopes = new Map();
  }
  emit(type, data) {
    if (type in this.listeners) {
      this.listeners[type].forEach((handler) => handler(data));
    }
  }
  on(type, handler, scope) {
    if (type in this.listeners) {
      this.listeners[type].add(handler);
      if (scope) {
        if (!this.scopes.has(scope)) this.scopes.set(scope, []);
        this.scopes.get(scope).push([type, handler]);
      }
    }
  }
  off(type, handler) {
    if (type in this.listeners) {
      this.listeners[type].delete(handler);
    }
  }
  scopeOff(scope) {
    if (this.scopes.has(scope)) {
      this.scopes.get(scope).forEach(([type, handler]) => {
        this.off(type, handler);
      });
      this.scopes.delete(scope);
    }
  }
}

// StaticEvented implementation
export function StaticEvented(eventTypes) {
  const listeners = {};
  eventTypes.forEach((type) => (listeners[type] = new Set()));
  const scopes = new Map();
  return class {
    static emit(type, data) {
      if (type in listeners) {
        listeners[type].forEach((handler) => handler(data));
      }
    }
    static on(type, handler, scope) {
      if (type in listeners) {
        listeners[type].add(handler);
        if (scope) {
          if (!scopes.has(scope)) scopes.set(scope, []);
          scopes.get(scope).push([type, handler]);
        }
      }
    }
    static off(type, handler) {
      if (type in listeners) {
        listeners[type].delete(handler);
      }
    }
    static scopeOff(scope) {
      if (scopes.has(scope)) {
        scopes.get(scope).forEach(([type, handler]) => {
          this.off(type, handler);
        });
        scopes.delete(scope);
      }
    }
  };
}
