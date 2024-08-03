use sqlx::SqlitePool;
use anyhow::Result;
use nanoid::nanoid;

pub async fn insert_user(secret: String, email: String, pool: &SqlitePool) -> Result<()> {
    let id = nanoid!(21);
    sqlx::query!("insert into admins (id, secret, email) values ($1, $2, $3)", id , secret, email)
        .execute(pool)
        .await?;

    Ok(())
}

