import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRepository1663742571923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'repository',
        columns: [
          {
            name: 'id_repository',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_tribe',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'char(50)',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'char(1)',
            isNullable: false,
          },
          {
            name: 'create_time',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'char(1)',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'repository',
      new TableForeignKey({
        name: 'FK_REPOSITORY_TRIBE',
        columnNames: ['id_tribe'],
        referencedTableName: 'tribe',
        referencedColumnNames: ['id_tribe'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('repository', 'FK_REPOSITORY_TRIBE');
    await queryRunner.dropTable('repository');
  }
}
