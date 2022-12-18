import { describe, expect, it } from 'vitest';
import { BaseEntity } from './base-entity';
import { validate } from 'uuid';

describe('BaseEntity', () => {
  it('should create a base entity with default fields', () => {
    const baseEntity = new BaseEntity({});

    expect(baseEntity).toBeInstanceOf(BaseEntity);
    expect(validate(baseEntity.id)).toBe(true);
    expect(baseEntity.createdAt).toEqual(expect.any(Date));
    expect(baseEntity.updatedAt).toEqual(expect.any(Date));
  });

  it('should create a base entity with existing data', () => {
    const date = new Date(2022, 12, 18);

    const baseEntity = new BaseEntity(
      {
        createdAt: date,
        updatedAt: date,
      },
      'example-id',
    );

    expect(baseEntity).toBeInstanceOf(BaseEntity);
    expect(baseEntity.id).toEqual('example-id');
    expect(baseEntity.createdAt).toEqual(date);
    expect(baseEntity.updatedAt).toEqual(date);
  });
});
