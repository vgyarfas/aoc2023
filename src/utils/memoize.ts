export const memoize = <T extends (...args: any) => any>(callback: T, resolver?: (...args: Parameters<T>) => T) => {
  var cache = {};

  var memoized = function() {
    var args = Array.prototype.slice.call(arguments); // to simplify JSON.stringify
    var key = resolver ? resolver.apply(this, args) : JSON.stringify(args);

    if (!(key in cache)) {
      cache[key] = callback.apply(this, args);
    }

    return cache[key];
  };

  (memoized as any).cache = cache;

  return memoized;
}