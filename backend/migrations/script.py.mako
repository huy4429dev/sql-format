"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
import os
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    ${upgrades if upgrades else "pass"}


def downgrade():
    ${downgrades if downgrades else "pass"}

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
