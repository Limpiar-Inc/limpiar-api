type Builder<T> = {
  [P in keyof T]: (value: T[P]) => Builder<T>;
} & { build: () => T };

function builder<T>(template: T = {} as T): Builder<T> {
  const proxy = new Proxy(
    {},
    {
      get(target, propKey) {
        if (propKey === 'build') {
          return () => Object.assign({}, template);
        }
        return (value: any = undefined) => {
          if (value !== undefined) {
            template[propKey] = value;
          }
          return proxy;
        };
      },
    },
  );

  return proxy as Builder<T>;
}

export { builder, Builder };
