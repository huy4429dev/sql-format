"""empty message

Revision ID: 0277cfddb613
Revises: 
Create Date: 2023-05-03 21:45:57.548222

"""
from alembic import op
import sqlalchemy as sa
import os


# revision identifiers, used by Alembic.
revision = '0277cfddb613'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('files',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('log',
    sa.Column('log_id', sa.UUID(), nullable=False),
    sa.Column('table', sa.String(), nullable=True),
    sa.Column('record_id', sa.UUID(), nullable=True),
    sa.Column('action', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('created_by', sa.UUID(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('updated_by', sa.UUID(), nullable=True),
    sa.PrimaryKeyConstraint('log_id'),
    sa.UniqueConstraint('log_id')
    )
    op.create_table('recipe',
    sa.Column('recipe_id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('version', sa.String(), nullable=True),
    sa.Column('enabled', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('recipe_id'),
    sa.UniqueConstraint('recipe_id')
    )
    op.create_table('template',
    sa.Column('template_id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('sql_template', sa.Text(), nullable=True),
    sa.Column('definition', sa.JSON(), nullable=True),
    sa.Column('warehouse_type', sa.Text(), nullable=True),
    sa.Column('version', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('source_type', sa.String(), nullable=True),
    sa.Column('report_type', sa.String(), nullable=True),
    sa.Column('source_platform_type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('template_id'),
    sa.UniqueConstraint('template_id')
    )
    op.create_table('users',
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.Column('enabled', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('recipe_template',
    sa.Column('recipe_id', sa.UUID(), nullable=False),
    sa.Column('template_id', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.recipe_id'], ),
    sa.ForeignKeyConstraint(['template_id'], ['template.template_id'], ),
    sa.PrimaryKeyConstraint('recipe_id', 'template_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipe_template')
    op.drop_table('users')
    op.drop_table('template')
    op.drop_table('recipe')
    op.drop_table('log')
    op.drop_table('files')
    # ### end Alembic commands ###

def delete_migration(revision):
    # Step 1: Delete the migration script file
    filename = f'migrations/versions/{revision}.py'
    try:
        os.remove(filename)
        print(f'Successfully deleted {filename}')
    except OSError:
        print(f'Failed to delete {filename}')

    # Step 2: Remove the corresponding entry from the alembic_version table
    result = db.engine.execute(f"DELETE FROM alembic_version WHERE version_num = '{revision}'")
    if result.rowcount == 1:
        print(f'Successfully removed revision {revision} from alembic_version table')
    else:
        print(f'Failed to remove revision {revision} from alembic_version table')

    # Step 3: Stamp the current revision to the latest revision
    result = migrate.stamp()
    if result:
        print('Successfully stamped current revision to the latest revision')
    else:
        print('Failed to stamp current revision to the latest revision')
