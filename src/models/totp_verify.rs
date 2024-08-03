use rocket::serde::Serialize;
use sqlx::FromRow;

#[derive(FromForm, Debug, FromRow, Clone, Serialize)]
pub struct TOTPVerify {
    pub email: String,
    pub code: String,
    pub secret: String
}