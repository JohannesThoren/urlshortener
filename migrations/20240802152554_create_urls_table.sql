-- Add migration script here
create table if not exists urls (
    id text not null,
    url text not null,
    clicks int not null,
    created datetime not null
)