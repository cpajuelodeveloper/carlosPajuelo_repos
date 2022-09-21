import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMetrics1663742947069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'metrics',
        columns: [
          {
            name: 'id_repository',
            type: 'int',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'coverage',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'bugs',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'vulnerabilities',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'hotspot',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'code_smells',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'metrics',
      new TableForeignKey({
        name: 'FK_METRICS_REPOSITORY',
        columnNames: ['id_repository'],
        referencedTableName: 'repository',
        referencedColumnNames: ['id_repository'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('metrics', 'FK_METRICS_REPOSITORY');
    await queryRunner.dropTable('metrics');
  }
}
