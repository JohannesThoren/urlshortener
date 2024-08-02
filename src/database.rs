use anyhow::Result;
use chrono::{self};
use nanoid::nanoid;
use sqlx::SqlitePool;

use crate::models::url::Url;

pub async fn insert_new_url(url: String, pool: &SqlitePool) -> Result<String> {
    let id = nanoid!(4);
    let datetime = chrono::offset::Local::now();

    let _ = sqlx::query("insert into urls (id, url, clicks, created) values ($1, $2, $3, $4)")
        .bind(id.clone())
        .bind(url.clone())
        .bind(0)
        .bind(datetime.to_string())
        .execute(pool)
        .await;

    Ok(id)
}

pub async fn get_url_from_id(id: String, pool: &SqlitePool) -> Result<Url> {
    let res = sqlx::query_as!(Url, "select *  from urls where id = $1", id)
        .fetch_one(pool)
        .await?;
    Ok(res)
}

pub async fn increment_clicks(id: String, pool: &SqlitePool) -> Result<()> {
    sqlx::query("update urls set clicks=clicks+1 where id = $1")
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}
