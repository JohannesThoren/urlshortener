-- Add migration script here
create table if not exists admins (id text not null, secret text not null, email text not null)
