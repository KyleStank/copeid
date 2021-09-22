export interface IEntity<TId = string> {
  id: TId | undefined;

  ["id"]: TId | undefined;
  [key: string]: any | undefined;
}
