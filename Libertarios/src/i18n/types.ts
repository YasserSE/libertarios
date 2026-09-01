/** Diccionario parcial: cualquier rama puede faltar y caer al castellano. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
