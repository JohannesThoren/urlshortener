use chrono::NaiveDateTime;
use serde::Serialize;
use sqlx::prelude::FromRow;

#[derive(Debug, FromRow, Clone, Serialize)]
pub struct Url {
    pub id: String,
    pub url: String,
    pub clicks: i64,
    pub created: NaiveDateTime,
}
