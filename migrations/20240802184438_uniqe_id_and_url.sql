
ALTER TABLE
    urls RENAME TO old_urls;

create table if not exists urls (
    id text not null unique,
    url text not null unique,
    clicks int not null,
    created datetime not null
);

INSERT INTO
    urls
SELECT
    *
FROM
    old_urls;
drop table old_urls;

