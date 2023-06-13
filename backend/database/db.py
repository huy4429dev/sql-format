import psycopg2
from psycopg2 import DatabaseError
from decouple import config



def get_connection():
    try:
        print('Connecting to the PostgreSQL database...')

        return psycopg2.connect(
            host=config('PGSQL_HOST'),
            database=config('PGSQL_DB'),
            user=config('PGSQL_USER'),
            password=config('PGSQL_PASSWORD'),
            port=config('PGSQL_POST')
        )
    except DatabaseError as ex:
        print("Connection false")
        raise ex


def get_connection_v2():
    try:
        print('Connecting to the PostgreSQL database...')

        return psycopg2.connect(
            host=config('PGSQL_HOST_DB2'),
            database=config('PGSQL_DB_DB2'),
            user=config('PGSQL_USER_DB2'),
            password=config('PGSQL_PASSWORD_DB2'),
            port=config('PGSQL_POST_DB2')
        )
    except DatabaseError as ex:
        print("Connection false")
        raise ex