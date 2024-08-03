use anyhow::Result;
use chrono::{self};
use nanoid::nanoid;
use sqlx::SqlitePool;

use crate::models::url::Url;

pub async fn insert_new_url(url: String, pool: &SqlitePool) -> Result<String, String> {
    let id = nanoid!(6);
    let datetime = chrono::offset::Local::now().to_string();

    let query_result = sqlx::query("INSERT INTO urls (id, url, clicks, created) VALUES ($1, $2, $3, $4)")
        .bind(&id)
        .bind(&url)
        .bind(0)
        .bind(&datetime)
        .execute(pool)
        .await;

    match query_result {
        Ok(_) => Ok(id),
        Err(_) => {
            if let Ok(r) = get_id_from_url(url, pool).await {
                return Ok(r.id);
            }
            if let Ok(r) = get_url_from_id(id, pool).await {
                return Ok(r.id);
            }
            Err("Contact page admin and tell them that insert_new_url has failed".to_string())
        }
    }
}


pub async fn get_url_from_id(id: String, pool: &SqlitePool) -> Result<Url> {
    let res = sqlx::query_as!(Url, "select *  from urls where id = $1", id)
        .fetch_one(pool)
        .await?;
    Ok(res)
}

pub async fn get_id_from_url(url: String, pool: &SqlitePool) -> Result<Url> {
    let res = sqlx::query_as!(Url, "select *  from urls where url = $1", url)
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
