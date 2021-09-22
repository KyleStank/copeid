export interface IEntityQuery {
  id: string[] | undefined;
  include: string[] | undefined;
  orderBy: string[] | undefined;
  orderByDescending: string[] | undefined;
}
