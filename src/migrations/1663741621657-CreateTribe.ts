import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTribe1663741621657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tribe',
        columns: [
          {
            name: 'id_tribe',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_organization',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'char(50)',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tribe',
      new TableForeignKey({
        name: 'FK_TRIBE_ORGANIZATION',
        columnNames: ['id_organization'],
        referencedTableName: 'organization',
        referencedColumnNames: ['id_organization'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tribe', 'FK_TRIBE_ORGANIZATION');
    await queryRunner.dropTable('tribe');
  }
}
