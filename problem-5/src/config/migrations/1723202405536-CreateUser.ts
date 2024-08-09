import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableIndex,
} from 'typeorm';

export class CreateUser1723202405536 implements MigrationInterface {
  private readonly tableName = 'user';

  private readonly columns: TableColumn[] = [
    new TableColumn({
      name: 'id',
      isPrimary: true,
      isGenerated: true,
      type: 'int4',
    }),
    new TableColumn({
      name: 'email',
      type: 'varchar',
      length: '64',
      isNullable: false,
      isUnique: true,
    }),
    new TableColumn({
      name: 'password',
      type: 'varchar',
      length: '100',
      isNullable: false,
    }),
  ];

  private indices: TableIndex[] = [
    new TableIndex({
      name: 'user_email_idx',
      isUnique: true,
      columnNames: ['email'],
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: this.columns,
        indices: this.indices,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
